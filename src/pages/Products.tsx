import axios from 'axios';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import ErrorAlert from '../components/Error/ErrorAlert';
import ProductModal from '../components/Modals/ProductModal';
import ProductList from '../components/Products/ProductList';
import SearchFilter from '../components/Products/SearchFilter';
import SuggestionSection from '../components/Products/SuggestionSection';
import { getAISuggestionIds } from '../services/AI';
import type { Product } from '../types/Product';
import { addToHistory, getHistory } from '../utils/history';

interface ProductPageProps {
  onlyFavorites?: boolean;
}

const pageContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

export default function ProductPage({ onlyFavorites = false }: ProductPageProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdDesc');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState('all');

  const [suggestions, setSuggestions] = useState<Product[] | null>(null);
  const [loadingSug, setLoadingSug] = useState(false);
  const [errorSug, setErrorSug] = useState<string | null>(null);

  const [selected, setSelected] = useState<Product | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [lastPrompt, setLastPrompt] = useState<string>('');
  const [showAI, setShowAI] = useState(false);
  const [aiLoading, setAILoading] = useState(false);

  const reduce = useReducedMotion();

  useEffect(() => {
    axios
      .get<Product[]>('https://686f86bd91e85fac42a17168.mockapi.io/api/v1/products')
      .then(res => setData(res.data))
      .catch(err => {
        setFetchError(err.message || 'Không thể tải sản phẩm.');
      }).finally(() => setLoading(false));
  }, []);

  const handleUpdateProduct = (updated: Product) => {
    setData(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };
  const handleSelect = (p: Product) => {
    addToHistory(p.id);
    setSelected(p);
  };

  const filtered = data
    .filter(p => (!onlyFavorites || p.isFavorite))
    .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()))
    .filter(p => categoryFilter === 'all' || p.category === categoryFilter)
    .filter(p => tagFilter.length === 0 || p.tags.some(t => tagFilter.includes(t)))
    .filter(p =>
      priceFilter === 'all' ||
      (priceFilter === '<500K' && p.price < 500000) ||
      (priceFilter === '500K-1M' && p.price >= 500000 && p.price <= 1000000) ||
      (priceFilter === '>1M' && p.price > 1000000)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'createdAsc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'startAsc':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'alphaAsc':
          return a.title.localeCompare(b.title);
        case 'alphaDesc':
          return b.title.localeCompare(a.title);
        case 'startDesc':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'createdDesc':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const fetchSuggestionsAI = async (userPrompt: string) => {
    setLastPrompt(userPrompt);
    const favIds = data.filter(p => p.isFavorite).map(p => p.id);
    const historyIds = getHistory();
    let candidates = data.filter(p => !favIds.includes(p.id) && !historyIds.includes(p.id));
    if (tagFilter.length) {
      candidates = candidates.filter(p => p.tags.some(t => tagFilter.includes(t)));
    }


    setLoadingSug(true);
    setAILoading(true);
    setErrorSug(null);

    try {
      const ids = await getAISuggestionIds(
        userPrompt,
        data,
        favIds,
        historyIds,
        tagFilter
      );
      // 4.2 fetch chi tiết
      const arr = await Promise.all(
        ids.map(id =>
          axios
            .get<Product>(
              `https://686f86bd91e85fac42a17168.mockapi.io/api/v1/products/${id}`
            )
            .then(r => r.data)
        )
      );
      setSuggestions(arr);
    } catch (e: any) {
      setErrorSug(e.message || 'Không thể lấy gợi ý từ AI.');
    } finally {
      setLoadingSug(false);
      setAILoading(false);
    }
  };

  return (
    <motion.div
      className="container mx-auto py-12 space-y-8"
      initial={reduce ? undefined : 'hidden'}
      animate="show"
      variants={pageContainer}
    >
      <SearchFilter
        search={search} onSearch={setSearch}
        sortBy={sortBy} onSortChange={setSortBy}
        categoryOptions={Array.from(new Set(data.map(p => p.category)))}
        categoryFilter={categoryFilter} onCategoryChange={setCategoryFilter}
        tagOptions={Array.from(new Set(data.flatMap(p => p.tags)))}
        tagFilter={tagFilter} onTagChange={setTagFilter}
        priceFilter={priceFilter} onPriceChange={setPriceFilter}
        onAISubmit={fetchSuggestionsAI}
        loading={loading}
        aiLoading={aiLoading}
        showAI={showAI} onToggleAI={() => setShowAI(prev => !prev)}
        onFavorite={onlyFavorites}
      />


      {!onlyFavorites && (
        <div className=''>
          <SuggestionSection
            suggestions={suggestions}
            loading={loadingSug}
            error={errorSug}
            onCardClick={handleSelect}
            onUpdateProduct={handleUpdateProduct}
          />
          <ErrorAlert
            error={errorSug}
            onRetry={() => fetchSuggestionsAI(lastPrompt)}
            context={<small>Vui lòng kiểm tra kết nối hoặc thử query khác.</small>}
          />
        </div>
      )}




      <ProductList
        loading={loading}
        products={filtered}
        onClick={handleSelect}
        onUpdateProduct={handleUpdateProduct}
      />
      <ErrorAlert error={fetchError} onRetry={() => setFetchError(null)} />


      {selected && (
        <ProductModal
          visible
          product={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdateProduct}
        />
      )}
    </motion.div>
  );
}
