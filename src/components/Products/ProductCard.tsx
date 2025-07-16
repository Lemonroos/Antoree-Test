import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Card, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppNotification } from '../../contexts/NotificationContext';
import type { Product } from '../../types/Product';

const { Meta } = Card;
const { Text } = Typography;


type Props = {
  product: Product;
  onClick?: (p: Product) => void;
  onUpdate?: (u: Product) => void;
};

export default function ProductCard({ product, onClick, onUpdate }: Props) {
  const [isFav, setIsFav] = useState(product.isFavorite);
  const notify = useAppNotification();

  useEffect(() => {
    setIsFav(product.isFavorite);
  }, [product.isFavorite]);

  const toggleFav = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updated = !isFav;
      const res = await axios.put<Product>(
        `https://686f86bd91e85fac42a17168.mockapi.io/api/v1/products/${product.id}`,
        { ...product, isFavorite: updated }
      );
      setIsFav(updated);
      onUpdate?.(res.data);
      notify.success({
        message: updated ? 'Đã thêm vào yêu thích' : 'Đã bỏ yêu thích',
        description: `${product.title} đã ${updated ? 'được thêm vào' : 'bỏ khỏi'} danh sách yêu thích.`,
        placement: 'topRight',
      });
    } catch {
      notify.error({
        message: 'Lỗi',
        description: 'Không thể cập nhật trạng thái yêu thích.',
        placement: 'topRight',
      });
    }
  };

  return (
    <Card
      hoverable
      cover={<img alt={product.title} src={product.image} className='w-full h-48 object-cover p-4' />}
      onClick={() => onClick?.(product)}
    >
      <Meta
        title={<Text strong className="text-lg ">{product.title}</Text>}
        description={
          <div>
            <Text className="text-green-600 font-semibold">
              {product.price.toLocaleString()} VND
            </Text>
            <p className="mt-2 text-gray-600 text-sm line-clamp-2">
              {product.description}
            </p>
            <Button
              type="primary"
              className='my-2'
              icon={isFav ? <HeartFilled /> : <HeartOutlined />}
              onClick={toggleFav}
            >
            </Button>
          </div>
        }
      />

    </Card>
  );
}
