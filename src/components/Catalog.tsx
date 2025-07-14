// // // src/pages/CatalogPage.tsx
// // import { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import SearchFilter from './Products/SearchFilter';
// // import ProductList from './Products/ProductList';
// // import { motion, type Variants, useReducedMotion } from 'framer-motion';
// // import type { Product } from '../types/Product';

// // interface Props {
// //   onlyFavorites?: boolean;      // <-- nếu true thì chỉ show favorites
// // }

// // const pageContainer: Variants = {
// //   hidden: {},
// //   show: { transition: { staggerChildren: 0.2 } }
// // };

// // export default function Catalog({ onlyFavorites=false }: Props) {
// //   const [data, setData] = useState<Product[]>([]);
// //   const [search, setSearch] = useState('');
// //    const [sortBy, setSortBy] = useState('createdDesc');
// //   const [categoryFilter, setCategoryFilter] = useState('all');
// //   const [tagFilter, setTagFilter] = useState<string[]>([]);
// //   const reduce = useReducedMotion();

// //   useEffect(() => {
// //     axios
// //       .get<Product[]>('https://686f86bd91e85fac42a17168.mockapi.io/api/v1/products')
// //       .then(res => setData(res.data))
// //       .catch(console.error);
// //   }, []);

// //   // dynamic options
// //   const categoryOptions = Array.from(new Set(data.map(p => p.category)));
// //   const tagOptions      = Array.from(new Set(data.flatMap(p => p.tags)));

// //   // update handler (lift state)
// //   const handleUpdateProduct = (updated: Product) => {
// //     setData(prev =>
// //       prev.map(p => p.id === updated.id ? updated : p)
// //     );
// //   };

// //   // initial filter: nếu onlyFavorites, giữ lại chỉ isFavorite===true
// //   let filtered = data.filter(p =>
// //     (!onlyFavorites || p.isFavorite) &&                                        // <-- chỉ bỏ line này khác
// //     (!search          || p.title.toLowerCase().includes(search.toLowerCase())) &&
// //     (categoryFilter==='all' || p.category===categoryFilter)                    &&
// //     (tagFilter.length===0    || p.tags.some(t => tagFilter.includes(t)))
// //   );


  
// //   // sort
// //   filtered.sort((a, b) => {
// //     switch (sortBy) {
// //       case 'createdAsc':  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
// //       case 'startAsc':    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
// //       case 'alphaAsc':    return a.title.localeCompare(b.title);
// //       case 'alphaDesc':   return b.title.localeCompare(a.title);
// //       case 'startDesc':   return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
// //       case 'createdDesc':
// //       default:            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
// //     }
// //   });
// // // ngay trước <motion.div>
// // console.log('All products:', data.length, 'After filter:', filtered.length);

// //   return (
    
// //     <motion.div
// //       className="container mx-auto py-12 space-y-8"
// //       initial={reduce ? undefined : 'hidden'}
// //       animate="show"
// //       variants={pageContainer}
// //     >
// //       {/* <h1 className="text-3xl font-semibold">{title}</h1> */}
// //       <SearchFilter
// //         search={search}            onSearch={setSearch}
// //         sortBy={sortBy}            onSortChange={setSortBy}
// //         categoryOptions={categoryOptions}
// //         categoryFilter={categoryFilter} onCategoryChange={setCategoryFilter}
// //         tagOptions={tagOptions}     tagFilter={tagFilter} onTagChange={setTagFilter}
// //       />
// //       <ProductList
// //         products={filtered}
// //         onUpdateProduct={handleUpdateProduct}
// //       />
// //     </motion.div>
// //   );
// // }

// // src/pages/CatalogPage.tsx
// import axios from 'axios';
// import { motion, useReducedMotion, type Variants } from 'framer-motion';
// import { useEffect, useState } from 'react';
// import ProductList from '../components/Products/ProductList';
// import type { Product } from '../types/Product';

// interface Props {
//   title: string;
//   onlyFavorites?: boolean;
// }

// const pageContainer: Variants = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.2 } }
// };

// export default function CatalogPage({ title, onlyFavorites = false }: Props) {
//   const [data, setData] = useState<Product[]>([]);
//   const [search, setSearch] = useState('');
//   const [sortBy, setSortBy] = useState('createdDesc');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [tagFilter, setTagFilter] = useState<string[]>([]);
//   const reduce = useReducedMotion();

//   // 1. Fetch dữ liệu
//   useEffect(() => {
//     axios.get<Product[]>('https://686f86bd91e85fac42a17168.mockapi.io/api/v1/products')
//       .then(res => setData(res.data))
//       .catch(console.error);
//   }, []);

//   // 2. Derive options
//   const categoryOptions = Array.from(new Set(data.map(p => p.category)));
//   const tagOptions      = Array.from(new Set(data.flatMap(p => p.tags)));

//   // 3. Handler để sync favorites
//   const handleUpdateProduct = (updated: Product) => {
//     setData(prev => prev.map(p => p.id === updated.id ? updated : p));
//   };

//   // --- Pipeline: filter & sort ---
//   let filtered = data;

//   // A. Nếu chỉ muốn favorites
//   if (onlyFavorites) {
//     filtered = filtered.filter(p => p.isFavorite);
//   }

//   // B. Search / Category / Tag
//   filtered = filtered.filter(p => {
//     if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
//     if (categoryFilter !== 'all' && p.category !== categoryFilter)      return false;
//     if (tagFilter.length > 0 && !p.tags.some(tag => tagFilter.includes(tag))) return false;
//     return true;
//   });

//   // C. Sort theo lựa chọn
//   filtered.sort((a, b) => {
//     switch (sortBy) {
//       case 'createdAsc':  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
//       case 'startAsc':    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
//       case 'alphaAsc':    return a.title.localeCompare(b.title);
//       case 'startDesc':   return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
//       case 'alphaDesc':   return b.title.localeCompare(a.title);
//       case 'createdDesc':
//       default:            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//     }
//   });

//   console.log(`${title}: total=${data.length}, filtered=${filtered.length}`);

//   return (
//     <motion.div
//       className="container mx-auto py-12 space-y-8"
//       initial={reduce ? undefined : 'hidden'}
//       animate="show"
//       variants={pageContainer}
//     >
//       <h2 className="text-2xl font-semibold">{title}</h2>
//       {/* <SearchFilter
//         search={search} onSearch={setSearch}
//         sortBy={sortBy} onSortChange={setSortBy}
//         categoryOptions={categoryOptions}
//         categoryFilter={categoryFilter} onCategoryChange={setCategoryFilter}
//         tagOptions={tagOptions} tagFilter={tagFilter} onTagChange={setTagFilter}
//       /> */}
//       <ProductList
//         products={filtered}
//         onUpdateProduct={handleUpdateProduct}
//       />
//     </motion.div>
//   );
// }
