import { BookOutlined, HeartOutlined, TagsOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { colVariants, sectionVariants } from '../../animations/VariantContext';
import type { Product } from '../../types/Product';


export default function StatsSection() {
  const [data, setData] = useState<Product[]>([]);
  useEffect(() => {
    axios.get<Product[]>('https://686f86bd91e85fac42a17168.mockapi.io/api/v1/products')
      .then(r => setData(r.data))
      .catch(console.error);
  }, []);

  const categoryCount = Array.from(new Set(data.map(p => p.category))).length;
  const totalProducts = data.length;
  const totalFavorites = data.filter(p => p.isFavorite).length;
  const historyCount = Number(localStorage.getItem('history')?.split(',').length ?? 0);

  const stats = [
    { title: 'Categories', value: categoryCount, icon: <TagsOutlined /> },
    { title: 'Courses/Services', value: totalProducts, icon: <BookOutlined /> },
    { title: 'Favorites', value: totalFavorites, icon: <HeartOutlined /> },
    { title: 'Visits', value: historyCount, icon: <UsergroupAddOutlined /> },
  ];

  return (
    <motion.section
      className="bg-white py-16"
      initial="hidden"
      whileInView="showUp"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4">
        <Row gutter={[24, 24]} justify="center">
          {stats.map((stat, i) => (
            <Col key={stat.title} xs={24} sm={12} md={8} lg={6}>
              <motion.div custom={i} initial="hidden" viewport={{ once: true }} variants={colVariants} whileInView="show">
                <Card
                  className="rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                // bodyStyle={{ padding: '1.5rem' }}
                >
                  <div className="text-green-600 mb-4 text-4xl">{stat.icon}</div>
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    valueStyle={{ fontSize: '2.5rem', fontWeight: 600 }}
                  />
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </motion.section>
  );
}
