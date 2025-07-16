import { Button, Card, Col, Empty, Row, Spin } from 'antd';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { colVariants, sectionVariants } from '../../animations/VariantContext';
import type { Product } from '../../types/Product';

const { Meta } = Card;

export default function FeaturedCoursesSection() {
  const [courses, setCourses] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Product[]>('https://686f86bd91e85fac42a17168.mockapi.io/api/v1/products')
      .then(res => {
        const items = res.data
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 4);
        setCourses(items);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.section
      className="bg-green-50 py-16 section-featured"
      initial="hidden"
      whileInView="showUp"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center text-green-800">
          Featured Courses
        </h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        ) : courses.length === 0 ? (
          <Empty description="No featured courses" className="py-12" />
        ) : (
          <Row gutter={[16, 16]}>
            {courses.map((p, i) => (
              <Col key={p.id} xs={24} sm={12} md={12} lg={6}>
                <motion.div custom={i} initial="hidden" viewport={{ once: true }} variants={colVariants} whileInView="show">
                  <Card
                    hoverable
                    className="h-full rounded-lg overflow-hidden"
                    cover={
                      <img
                        alt={p.title}
                        src={p.image}
                        className="h-40 w-full object-cover "
                      />
                    }
                  >
                    <Meta
                      title={<div className="font-semibold">{p.title}</div>}
                      description={
                        <p className="mt-2 text-gray-600 line-clamp-2">{p.description}</p>
                      }
                    />
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-green-600 font-bold">
                        {p.price.toLocaleString()} VND
                      </span>
                      <Link to={`/products`}>
                        <Button type="link" size="small">
                          Details →
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}

        {!loading && courses.length > 0 && (
          <div className="mt-8 text-center">
            <Link to="/products">
              <Button type="primary" size="large">
                View All Courses
              </Button>
            </Link>
          </div>
        )}
      </div>
    </motion.section>
  );
}
