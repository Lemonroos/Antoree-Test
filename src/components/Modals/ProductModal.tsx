// // import { Modal, Rate } from 'antd';
// // import type { ProductDetail } from '../../types/Product';

// // type Props = {
// //   visible: boolean;
// //   product?: ProductDetail;
// //   onClose: () => void;
// // };

// // export default function ProductModal({ visible, product, onClose }: Props) {
// //   return (
// //     <Modal visible={visible} title={product?.name} footer={null} onCancel={onClose} width={700}>
// //       {product ? (
// //         <div>
// //           <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
// //           <div className="mb-4">
// //             <Rate disabled defaultValue={product.rating} /> ({product.reviewsCount} reviews)
// //           </div>
// //           <p className="mb-4 text-lg text-green-600 font-semibold">{product.price.toLocaleString()} VND</p>
// //           <p>{product.longDescription}</p>
// //         </div>
// //       ) : null}
// //     </Modal>
// //   );
// // }

// import { Modal, Rate, Tag, Divider } from 'antd';
// import { motion } from 'framer-motion';
// import { sectionVariants } from '../../animations/FrameMotVariants';
// import type { Product } from '../../types/Product';
// import moment from 'moment';
// interface Props {
//   visible: boolean;
//   product?: Product;
//   onClose: () => void;
// }

// export default function ProductModal({ visible, product, onClose }: Props) {
//   return (
//     <Modal
//       open={visible}
//       title={product?.title}
//       footer={null}
//       onCancel={onClose}
//       width={700}
//     //   bodyStyle={{ padding: 0 }}
//     >
//       <motion.div
//         className="p-6"
//         initial="hidden"
//         animate="show"
//         variants={sectionVariants}
//       >
//         {/* Image */}
//         <img
//           src={product?.image}
//           alt={product?.title}
//           className="w-full h-64 object-cover rounded-t-lg"
//         />

//         {/* Basic Info */}
//         <div className="mt-4">
//           <Rate
//             allowHalf
//             disabled
//             defaultValue={product?.rating ?? 0}
//           />
//           <span className="ml-2 text-gray-600">
//             ({product?.reviewsCount} reviews)
//           </span>
//         </div>
//         <Divider />

//         {/* Price */}
//         <div className="text-2xl font-bold text-green-600">
//           {product?.price.toLocaleString()} VND
//         </div>

//         {/* Description */}
//         <p className="mt-4 text-gray-700">
//           {product?.description}
//         </p>

//         {/* Dates */}
//         <div className="mt-4 space-y-1 text-sm text-gray-600">
//           <div><strong>Created:</strong> {moment(product?.createdAt).format('DD/MM/YYYY')}</div>
//           <div><strong>Start:</strong> {moment(product?.startDate ?? '').format('DD/MM/YYYY')}</div>
//           <div><strong>End:</strong> {moment(product?.endDate ?? '').format('DD/MM/YYYY')}</div>
//         </div>
//         <Divider />

//         {/* Category & Tags */}
//         <div className="flex flex-wrap gap-2">
//           <Tag color="green">{product?.category}</Tag>
//           {product?.tags.map(tag => (
//             <Tag key={tag} color="blue">
//               {tag}
//             </Tag>
//           ))}
//         </div>
//       </motion.div>
//     </Modal>
//   );
// }

import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Divider, Modal, Rate, Tag } from 'antd';
import axios from 'axios';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { sectionVariants } from '../../animations/FrameMotVariants';
import type { Product } from '../../types/Product';

import { useAppNotification } from '../../contexts/NotificationContext';

interface Props {
  visible: boolean;
  product?: Product;
  onClose: () => void;
  onUpdate?: (updated: Product) => void;
}

export default function ProductModal({ visible, product, onClose, onUpdate}: Props) {
  const [isFav, setIsFav] = useState(product?.isFavorite ?? false);
  const notify = useAppNotification();

  useEffect(() => {
    if (product) setIsFav(product.isFavorite);
  }, [product]);

  const handleToggleFavorite = async () => {
    if (!product) return;
    const updated = !isFav;

    try {
      await axios.put(
        `https://686f86bd91e85fac42a17168.mockapi.io/api/v1/products/${product.id}`,
        { ...product, isFavorite: updated }
      );
      setIsFav(updated);
      notify.success({
        message: updated ? 'Added to Favorites' : 'Removed from Favorites',
        description: `${product.title} has been ${updated ? 'added to' : 'removed from'} your favorites.`,
        placement: 'topRight',
      });
       onUpdate?.({ ...product, isFavorite: updated });

    } catch {
      notify.error({
        message: 'Error',
        description: 'Could not update favorite status.',
        placement: 'topRight',
      });
    }
  };

  if (!product) return null;

  return (
    <Modal
      open={visible}
      title={product.title}
      onCancel={onClose}
      width={720}
      footer={null}
    >
      <motion.div
        className="p-6"
        initial="hidden"
        animate="show"
        variants={sectionVariants}
      >
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <Button
            type="text"
            icon={isFav ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
            onClick={handleToggleFavorite}
            className="absolute top-4 right-4 text-xl"
          />
        </div>

        <div className="mt-4 flex items-center">
          <Rate allowHalf disabled defaultValue={product.rating} />
          <span className="ml-2 text-gray-600">({product.reviewsCount} reviews)</span>
        </div>
        <Divider />

        <div className="text-2xl font-bold text-green-600">
          {product.price.toLocaleString()} VND
        </div>

        <p className="mt-4 text-gray-700">{product.description}</p>

        <div className="mt-4 space-y-1 text-sm text-gray-600">
          <div><strong>Created:</strong> {moment(product.createdAt).format('DD/MM/YYYY')}</div>
          <div><strong>Start:</strong> {moment(product.startDate).format('DD/MM/YYYY')}</div>
          <div><strong>End:</strong> {moment(product.endDate).format('DD/MM/YYYY')}</div>
        </div>
        <Divider />

        <div className="flex flex-wrap gap-2">
          <Tag color="green">{product.category}</Tag>
          {product.tags.map(tag => (
            <Tag key={tag} color="blue">{tag}</Tag>
          ))}
        </div>
      </motion.div>
    </Modal>
  );
}
