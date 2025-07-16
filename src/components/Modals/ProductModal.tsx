import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Flex, Modal, Rate, Tag, Typography } from 'antd';
import axios from 'axios';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { sectionVariants } from '../../animations/VariantContext';
import { useAppNotification } from '../../contexts/NotificationContext';
import type { Product } from '../../types/Product';

const { Title, Paragraph, Text } = Typography;

interface Props {
  visible: boolean;
  product?: Product;
  onClose: () => void;
  onUpdate?: (updated: Product) => void;
}

export default function ProductModal({ visible, product, onClose, onUpdate }: Props) {
  const [isFav, setIsFav] = useState(product?.isFavorite ?? false);
  const notify = useAppNotification();

  useEffect(() => {
    if (product) setIsFav(product.isFavorite);
  }, [product]);

  const handleToggleFavorite = async () => {
    if (!product) return;
    const updated = !isFav;
    try {
      const res = await axios.put<Product>(
        `https://686f86bd91e85fac42a17168.mockapi.io/api/v1/products/${product.id}`,
        { ...product, isFavorite: updated }
      );
      setIsFav(updated);
      onUpdate?.(res.data);
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

  if (!product) return null;

  return (
    <Modal
      open={visible}
      title={<Title level={4} className="mb-0">{product.title}</Title>}
      onCancel={onClose}
      width={700}
      footer={null}
      className='p-4'
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={sectionVariants}
      >



        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="relative overflow-hidden rounded-lg shadow">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 md:h-60 object-cover "
            />
          </div>
        </Col>
        <div className="my-4 flex flex-wrap gap-2">
          <Tag color="green" className="font-semibold capitalize">{product.category}</Tag>
          {product.tags.map(tag => (
            <Tag key={tag} color="blue" className="capitalize">{tag}</Tag>
          ))}
        </div>

        <Col xs={24} sm={24} md={24} lg={24}>
          <Text className="text-3xl font-bold text-green-600">
            {product.price.toLocaleString()} VND
          </Text>

          <div className="mt-2 flex items-center">
            <Rate allowHalf disabled defaultValue={product.rating} />
            <Text className="ml-2 text-gray-600">({product.reviewsCount} reviews)</Text>
          </div>

          <Divider />

          <Paragraph className="text-gray-700">{product.description}</Paragraph>

          <div className="mt-4 space-y-1 text-sm text-gray-600">
            <div><Text strong>Created:</Text> {moment(product.createdAt).format('DD/MM/YYYY')}</div>
            <Flex align="center" justify='space-between' >
              <div><Text strong>Start:</Text> {moment(product.startDate).format('DD/MM/YYYY')}</div>
              <div><Text strong>End:</Text> {moment(product.endDate).format('DD/MM/YYYY')}</div>
            </Flex>
          </div>

          <div className="mt-6 flex space-x-3">
            <Button
              type="primary"
              icon={isFav ? <HeartFilled /> : <HeartOutlined />}
              onClick={handleToggleFavorite}
            >
              {isFav ? 'Remove Favorite' : 'Add to Favorites'}
            </Button>
          </div>
        </Col>
        {/* </Row> */}
      </motion.div>
    </Modal>
  );
}
