// import { useState } from 'react';
// import { Row, Col } from 'antd';
// import { motion, type Variants } from 'framer-motion';
// import ProductCard from './ProductCard';
// import ProductModal from '../Modals/ProductModal';

// import type { Product } from '../../types/Product';

// interface Props {
//     products: Product[];
//     // onToggleFavorite: (id: string, newState: boolean) => void;
//   }


// const listContainer: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

// export default function ProductList({ products }: Props) {
//     const [selected, setSelected] = useState<Product | null>(null);



//     return (
//         <>
//             <motion.div initial="hidden" animate="show" variants={listContainer}>
//                 <Row gutter={[16, 16]}>
//                     {products.map(p => (
//                         <Col key={p.id} xs={24} sm={12} lg={8}>
//                             <ProductCard
//                                 product={p}
//                                 onClick={setSelected}
//                                 // onToggleFavorite={onToggleFavorite}
//                             />
//                         </Col>
//                     ))}
//                 </Row>
//             </motion.div>
//             {/* <ProductModal visible={!!selected} product={selected || undefined} onClose={() => setSelected(null)} /> */}
//             {/* <ProductModal
//                 visible={!!selected}
//                 product={selected ? { ...selected, longDescription: '', rating: 0, reviewsCount: 0 } : undefined}
//                 onClose={() => setSelected(null)}
//             /> */}
//             <ProductModal
//                 visible={!!selected}
//                 product={selected ? { ...selected, title: selected.title, description: selected.description, rating: selected.rating, reviewsCount: selected.reviewsCount } : undefined}
//                 onClose={() => setSelected(null)}
//                 // onToggleFavorite={onToggleFavorite}
//             />
//         </>
//     );
// }

import { Col, Row } from 'antd';
import { motion, type Variants } from 'framer-motion';
import type { Product } from '../../types/Product';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
  onClick: (product: Product) => void;
  onUpdateProduct: (updated: Product) => void; // <- callback to update shared state
}

const listContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function ProductList({ products, onClick, onUpdateProduct }: Props) {
  // const [selected, setSelected] = useState<Product | null>(null);

  return (
    <>
      <motion.div initial="hidden" animate="show" variants={listContainer}>
        <Row gutter={[16, 16]}>
          {products.map((p) => (
            <Col key={p.id} xs={24} sm={12} lg={8}>
              <ProductCard product={p} onClick={onClick} onUpdate={onUpdateProduct} />
            </Col>
          ))}
        </Row>
      </motion.div>

      {/* ✅ Pass selected as-is, no need for manual merging */}

    </>
  );
}
