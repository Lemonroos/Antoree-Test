import { Col, Empty, Pagination, Row, Spin } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sectionVariants } from '../../animations/VariantContext';
import type { Product } from '../../types/Product';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
  loading: boolean;
  onClick: (p: Product) => void;
  onUpdateProduct: (updated: Product) => void;
}


export default function ProductListWithPagination({
  products,
  loading,
  onClick,
  onUpdateProduct,
}: Props) {
  const pageSize = 6;                // items per page
  const [page, setPage] = useState(1);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  // reset to first page whenever products array changes
  useEffect(() => {
    setPage(1);
  }, [products]);

  // compute current page slice
  useEffect(() => {
    const start = (page - 1) * pageSize;
    setVisibleProducts(products.slice(start, start + pageSize));
  }, [page, products]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return <Empty description="Không có sản phẩm nào" className="py-12" />;
  }

  return (
    <>
      <motion.div
        className="space-y-6"
        viewport={{ once: true }}
        initial="hidden"
        animate="show"
        variants={sectionVariants}
      >
        <Row gutter={[16, 16]}>
          {visibleProducts.map(p => (
            // <Col key={p.id} xs={24} sm={12} lg={8}>
            //   <motion.div >
            //     <ProductCard
            //       product={p}
            //       onClick={onClick}
            //       onUpdate={onUpdateProduct}
            //     />
            //   </motion.div>
            // </Col>
            <Col key={p.id} xs={24} sm={12} lg={8}>
              <ProductCard product={p} onClick={onClick} onUpdate={onUpdateProduct} />
            </Col>
          ))}
        </Row>
      </motion.div>

      <div className="flex justify-center py-6">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={products.length}
          onChange={p => setPage(p)}
          showSizeChanger={false}
        />
      </div>
    </>
  );
}
