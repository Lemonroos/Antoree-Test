// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import SearchFilter from '../components/Products/SearchFilter';
// import ProductList from '../components/Products/ProductList';
// import { motion, type Variants, useReducedMotion } from 'framer-motion';
// import type { Product } from '../types/Product';
// import { Button } from 'antd';
// import SuggestionSection from '../components/Products/SuggestionSection';
// import { addToHistory, getHistory } from '../utils/history';
// import ProductModal from '../components/Modals/ProductModal';
// import { getAISuggestionIds } from '../services/AI';



// interface Props {
//   onlyFavorites?: boolean;      // <-- nếu true thì chỉ show favorites
// }

// const pageContainer: Variants = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.2 } }
// };

// export default function ProductPage({ onlyFavorites = false }: Props) {
//   const [data, setData] = useState<Product[]>([]);
//   const [search, setSearch] = useState('');
//   const [sortBy, setSortBy] = useState('createdDesc');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [tagFilter, setTagFilter] = useState<string[]>([]);
//   const [priceFilter, setPriceFilter] = useState('all');
//   const [suggestions, setSuggestions] = useState<Product[] | null>(null);
//   const [loadingSug, setLoadingSug] = useState(false);
//   const [errorSug, setErrorSug] = useState<string | null>(null);
//   // const [selected, setSelected] = useState(false);
//   const [selected, setSelected] = useState<Product | null>(null);
//   const reduce = useReducedMotion();

//   useEffect(() => {
//     axios
//       .get<Product[]>('https://686f86bd91e85fac42a17168.mockapi.io/api/v1/products')
//       .then(res => setData(res.data))
//       .catch(console.error);
//   }, []);

//   // dynamic options
//   const categoryOptions = Array.from(new Set(data.map(p => p.category)));
//   const tagOptions = Array.from(new Set(data.flatMap(p => p.tags)));

//   // update handler (lift state)
//   const handleUpdateProduct = (updated: Product) => {
//     setData(prev =>
//       prev.map(p => p.id === updated.id ? updated : p)
//     );
//   };

//   // initial filter: nếu onlyFavorites, giữ lại chỉ isFavorite===true
//   let filtered = data.filter(p =>
//     (!onlyFavorites || p.isFavorite) &&
//     (!search || p.title.toLowerCase().includes(search)) &&
//     (categoryFilter === 'all' || p.category === categoryFilter) &&
//     (tagFilter.length === 0 || p.tags.some(t => tagFilter.includes(t))) &&
//     (priceFilter === 'all' ||
//       (priceFilter === '<500K' && p.price < 500000) ||
//       (priceFilter === '500K-1M' && p.price >= 500000 && p.price <= 1000000) ||
//       (priceFilter === '>1M' && p.price > 1000000))
//   );
//   // sort
//   filtered.sort((a, b) => {
//     switch (sortBy) {
//       case 'createdAsc': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
//       case 'startAsc': return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
//       case 'alphaAsc': return a.title.localeCompare(b.title);
//       case 'alphaDesc': return b.title.localeCompare(a.title);
//       case 'startDesc': return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
//       case 'createdDesc':
//       default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//     }
//   });


//   // const fetchSuggestions = () => {
//   //   setLoadingSug(true);
//   //   setErrorSug(null);
//   //   try {
//   //     // 1. Favorite IDs
//   //     const favIds = data.filter(p => p.isFavorite).map(p => p.id);

//   //     // 2. History IDs
//   //     const historyIds = getHistory();

//   //     // 3. Tags: ưu tiên tagFilter, nếu trống thì lấy tag của favorites
//   //     let tags = tagFilter;
//   //     if (tags.length === 0 && favIds.length > 0) {
//   //       tags = Array.from(new Set(
//   //         data
//   //           .filter(p => favIds.includes(p.id))
//   //           .flatMap(p => p.tags)
//   //       ));
//   //     }

//   //     // 4. Tạo danh sách ứng viên (loại bỏ đã favorite + đã xem)
//   //     let candidates = filtered.filter(p =>
//   //       !favIds.includes(p.id) && !historyIds.includes(p.id)
//   //     );

//   //     // 5. Ưu tiên share tag
//   //     let sug = candidates.filter(p =>
//   //       tags.some(t => p.tags.includes(t))
//   //     );
//   //     // let sug = candidates.filter(p =>
//   //     //   tags.length > 0 && tags.some(t => p.tags.includes(t))
//   //     // );
//   //     // 6. Nếu chưa đủ 4, bù thêm random
//   //     if (sug.length < 4) {
//   //       const extra = candidates
//   //         .filter(p => !sug.includes(p))
//   //         .slice(0, 4 - sug.length);
//   //       sug = sug.concat(extra);
//   //     }

//   //     // 7. Lấy tối đa 4 đề xuất
//   //     const maxSug = Math.min(4, candidates.length);
//   //     setSuggestions(sug.slice(0, maxSug));

//   //   } catch (e: any) {
//   //     setErrorSug(e.message || 'Không thể lấy gợi ý');
//   //   } finally {
//   //     setLoadingSug(false);
//   //   }
//   // };

//   const handleFetch = () => {
//     // setLoadingSug(true);
//     // setErrorSug(null);
//     fetchSuggestionsAI("");
//   };

//   const fetchSuggestionsAI = async (prompt: string) => {
//     setLoadingSug(true);
//     setErrorSug(null);
//     try {
//       const ids = await getAISuggestionIds(prompt || "");   // nếu prompt rỗng, bạn có thể fallback rule‑based
//       const proms = ids.map(id =>
//         axios.get<Product>(`https://…/products/${id}`).then(r => r.data)
//       );
//       const arr = await Promise.all(proms);
//       setSuggestions(arr);
//     } catch (e: any) {
//       setErrorSug(e.message || "AI gợi ý thất bại");
//     } finally {
//       setLoadingSug(false);
//     }
//   };

//   const handleSelect = (p: Product) => {
//     addToHistory(p.id);
//     setSelected(p);
//   };



//   // ngay trước <motion.div>
//   console.log('All products:', data.length, 'After filter:', filtered.length);



//   return (

//     <motion.div
//       className="container mx-auto py-12 space-y-8"
//       initial={reduce ? undefined : 'hidden'}
//       animate="show"
//       variants={pageContainer}
//     >
//       {/* <h1 className="text-3xl font-semibold">{title}</h1> */}
//       {/* <SearchFilter
//         search={search} onSearch={setSearch}
//         sortBy={sortBy} onSortChange={setSortBy}
//         categoryOptions={categoryOptions}
//         categoryFilter={categoryFilter} onCategoryChange={setCategoryFilter}
//         tagOptions={tagOptions} tagFilter={tagFilter} onTagChange={setTagFilter}
//       /> */}

//       {!onlyFavorites && (
//         <>
//           <Button type="primary" onClick={handleFetch} loading={loadingSug}>
//             Gợi ý sản phẩm phù hợp
//           </Button>
//           <SuggestionSection
//             suggestions={suggestions}
//             loading={loadingSug}
//             error={errorSug}
//             onFetch={handleFetch}
//             onCardClick={handleSelect}
//             onUpdateProduct={handleUpdateProduct}
//           />
//         </>
//       )}


//       <SearchFilter
//         search={search} onSearch={setSearch}
//         sortBy={sortBy} onSortChange={setSortBy}
//         categoryOptions={categoryOptions}
//         categoryFilter={categoryFilter} onCategoryChange={setCategoryFilter}
//         tagOptions={tagOptions} tagFilter={tagFilter} onTagChange={setTagFilter}
//         priceFilter={priceFilter} onPriceChange={setPriceFilter}
//       />

//       <ProductList
//         products={filtered}
//         onClick={handleSelect}
//         onUpdateProduct={handleUpdateProduct}
//       />
//       {selected && (
//         <ProductModal
//           visible={true}
//           product={selected}
//           onClose={() => setSelected(null)}
//           onUpdate={handleUpdateProduct}
//         />
//       )}
//     </motion.div>
//   );
// }




import axios from 'axios';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
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

  const reduce = useReducedMotion();

  // 1. Fetch products
  useEffect(() => {
    axios
      .get<Product[]>('https://686f86bd91e85fac42a17168.mockapi.io/api/v1/products')
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  // 2. Helpers
  const handleUpdateProduct = (updated: Product) => {
    setData(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };
  const handleSelect = (p: Product) => {
    addToHistory(p.id);
    setSelected(p);
  };

  // 3. Filter & sort pipeline
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

  // 4. AI Suggestions
  const fetchSuggestionsAI = async (userPrompt: string) => {
    // setErrorSug(null);
    const favIds = data.filter(p => p.isFavorite).map(p => p.id);
    const historyIds = getHistory();
    let candidates = data.filter(p => !favIds.includes(p.id) && !historyIds.includes(p.id));
    if (tagFilter.length) {
      candidates = candidates.filter(p => p.tags.some(t => tagFilter.includes(t)));
    }

    // const normalized = userPrompt.toLowerCase();
    // const hasMatch = candidates.some(p =>
    //   p.title.toLowerCase().includes(normalized) ||
    //   p.tags.some(tag => tag.toLowerCase().includes(normalized))
    // );

    // if (!hasMatch) {
    //   // Nếu không match gì, bỏ qua AI luôn
    //   setSuggestions([]);
    //   return;
    // }
    setLoadingSug(true);
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
    } catch (err: any) {
      setErrorSug(err.message || 'AI gợi ý thất bại');
    } finally {
      setLoadingSug(false);
    }
  };

  return (
    <motion.div
      className="container mx-auto py-12 space-y-8"
      initial={reduce ? undefined : 'hidden'}
      animate="show"
      variants={pageContainer}
    >
      {/* AI Suggestion button & section */}
      {!onlyFavorites && (
        <>
          <SuggestionSection
            suggestions={suggestions}
            loading={loadingSug}
            error={errorSug}
            onFetch={fetchSuggestionsAI}
            onCardClick={handleSelect}
            onUpdateProduct={handleUpdateProduct}
          />
        </>
      )}

      {/* Search & Filters */}
      <SearchFilter
        search={search} onSearch={setSearch}
        sortBy={sortBy} onSortChange={setSortBy}
        categoryOptions={Array.from(new Set(data.map(p => p.category)))}
        categoryFilter={categoryFilter} onCategoryChange={setCategoryFilter}
        tagOptions={Array.from(new Set(data.flatMap(p => p.tags)))}
        tagFilter={tagFilter} onTagChange={setTagFilter}
        priceFilter={priceFilter} onPriceChange={setPriceFilter}
      />

      {/* Main Product List */}
      <ProductList
        products={filtered}
        onClick={handleSelect}
        onUpdateProduct={handleUpdateProduct}
      />

      {/* Shared Product Modal */}
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
