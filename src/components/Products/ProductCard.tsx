// // import { Card, Button } from 'antd';
// // import { motion, useReducedMotion, type Variants } from 'framer-motion';
// // import type { Product } from '../../types/Product';
// // const cardVariant: Variants = {
// //   hidden: { opacity: 0, y: 10 },
// //   show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
// // };



// // type Props = { product: Product; onClick?: (p: Product) => void };

// // export default function ProductCard({ product, onClick }: Props) {
// //   const reduce = useReducedMotion();
// //   return (
// //     <motion.div
// //       variants={cardVariant}
// //       whileHover={reduce ? {} : { scale: 1.03 }}
// //       className="h-full"
// //     >
// //       <Card
// //         hoverable
// //         cover={<img src={product.image} alt={product.title} className="h-40 object-cover" />}
// //         onClick={() => onClick && onClick(product)}
// //       >
// //         <Card.Meta
// //           title={product.title}
// //           description={<span className="text-green-600 font-semibold">{product.price.toLocaleString()} VND</span>}
// //         />
// //         <p className="mt-2 text-sm text-gray-600 truncate">{product.description}</p>
// //         <Button type="link" className="mt-2 p-0" onClick={() => onClick && onClick(product)}>
// //           View Details
// //         </Button>
// //       </Card>
// //     </motion.div>
// //   );
// // }



// // import React from 'react';
// import { Card, Button, notification } from 'antd';
// import { motion, useReducedMotion, type Variants } from 'framer-motion';
// import { HeartOutlined, HeartFilled } from '@ant-design/icons';
// import axios from 'axios';
// import type { Product } from '../../types/Product';

// const cardVariant: Variants = {
//   hidden: { opacity: 0, y: 10 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
// };

// type Props = {
//   product: Product;
//   onClick?: (p: Product) => void;
// };

// export default function ProductCard({ product, onClick}: Props) {
//   const reduce = useReducedMotion();

//   // handleFavorite toggles favorite status
//   const handleToggle = async () => {
//     const newState = !product.isFavorite;
//     try {
//       await axios.put(`https://686f86bd91e85fac42a17168.mockapi.io/api/v1/products/${product.id}`, {
//         ...product,
//         isFavorite: newState
//       });
//       onToggleFavorite(product.id, newState);
//       notification.success({
//         message: newState ? 'Added to Favorites' : 'Removed from Favorites',
//         description: `${product.title} has been ${newState ? 'added to' : 'removed from'} your favorites.`,
//         placement: 'topRight'
//       });
//     } catch {
//       notification.error({
//         message: 'Action failed',
//         description: 'Unable to update favorite status. Please try again.',
//         placement: 'topRight'
//       });
//     }
//   };

//   return (
//     <motion.div
//       key={product.id}
//       variants={cardVariant}
//       whileHover={reduce ? {} : { scale: 1.03 }}
//       className="h-full relative cursor-pointer"
//       onClick={() => onClick && onClick(product)}
//     >
//       <Button
//         type="text"
//         onClick={e => { e.stopPropagation(); handleToggle(); }}
//         icon={product.isFavorite ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
//         className="absolute top-2 right-2 z-10"
//       />
//       <Card
//         hoverable
//         cover={<img src={product.image} alt={product.title} className="h-40 object-cover" />}
//       >
//         <Card.Meta
//           title={product.title}
//           description={<span className="text-green-600 font-semibold">{product.price.toLocaleString()} VND</span>}
//         />
//         <p className="mt-2 text-sm text-gray-600 truncate">{product.description}</p>
//       </Card>
//     </motion.div>
//   );
// }


import { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import axios from 'axios';
import type { Product } from '../../types/Product';
import { useAppNotification } from '../../contexts/NotificationContext';

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

type Props = {
  product: Product;
  onClick?: (p: Product) => void;
  onUpdate?: (updated: Product) => void;
};


export default function ProductCard({ product, onClick, onUpdate }: Props) {
  const reduce = useReducedMotion();
  const [isFav, setIsFav] = useState(product.isFavorite);
  const notify = useAppNotification();

useEffect(() => {
    setIsFav(product.isFavorite);
  }, [product.isFavorite]);


  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = !isFav;

    try {
      await axios.put(
        `https://686f86bd91e85fac42a17168.mockapi.io/api/v1/products/${product.id}`,
        { ...product, isFavorite: updated }
      );
      setIsFav(updated);
      // onUpdate?.(product.id,isFavorite:  updated);
      onUpdate?.({ ...product, isFavorite: updated });

      notify.success({
        message: updated ? 'Added to Favorites' : 'Removed from Favorites',
        description: `${product.title} has been ${updated ? 'added to' : 'removed from'} your favorites.`,
        placement: 'topRight',
      });
    } catch {
      notify.error({
        message: 'Error',
        description: 'Could not update favorite status.',
        placement: 'topRight',
      });
    }
  };

  return (
    <motion.div
      key={product.id}
      variants={cardVariant}
      whileHover={reduce ? {} : { scale: 1.03 }}
      className="h-full relative cursor-pointer"
      onClick={() => onClick?.(product)}
    >
      <Button
        type="text"
        onClick={handleToggle}
        icon={isFav ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
        className="absolute top-2 right-2 z-10"
      />
      <Card
        hoverable
        cover={<img src={product.image} alt={product.title} className="h-40 object-cover" />}
      >
        <Card.Meta
          title={product.title}
          description={<span className="text-green-600 font-semibold">{product.price.toLocaleString()} VND</span>}
        />
        <p className="mt-2 text-sm text-gray-600 truncate">{product.description}</p>
      </Card>
    </motion.div>
  );
}
