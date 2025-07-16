import { Card, Col, Row, Typography } from 'antd';
import { motion } from 'framer-motion';
import type { Product } from '../../types/Product';
import ProductCard from './ProductCard';

const { Title, Text } = Typography;

interface SuggestionSectionProps {
  suggestions: Product[] | null;
  loading: boolean;
  error: string | null;
  onCardClick: (p: Product) => void;
  onUpdateProduct: (u: Product) => void;
}

export default function SuggestionSection({
  suggestions,
  loading,
  onCardClick,
  onUpdateProduct,
}: SuggestionSectionProps) {
  return (
    <motion.section
      className="mb-8 p-6 bg-green-50 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Title level={3} className="text-center mb-6">
        Gợi ý cho bạn
      </Title>

      
      {loading ? (
        <Row gutter={[16, 16]}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <Col key={idx} xs={24} sm={12} md={8} lg={6}>
              <Card
                loading={loading}
                className="h-72 rounded-lg"
              />
            </Col>
          ))}
        </Row>
      ) : suggestions && suggestions.length > 0 ? (
        <>
          <Text className="block text-center text-gray-600 mb-4">
            Có {suggestions.length} gợi ý phù hợp với lựa chọn của bạn
          </Text>
          <Row gutter={[16, 16]}>
            {suggestions.map((p) => (
              <Col key={p.id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard
                  product={p}
                  onClick={onCardClick}
                  onUpdate={onUpdateProduct}
                />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div className="text-center ">
          <Text type="secondary">Chưa có gợi ý nào</Text>
        </div>
      )}
    </motion.section>
  );
}
