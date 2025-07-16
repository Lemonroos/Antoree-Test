import { Carousel, Card, Col, Rate, Row, Typography, Grid } from 'antd';
import { motion } from 'framer-motion';
import { sectionVariants } from '../../animations/VariantContext';

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

// Dữ liệu mẫu
const reviews: Review[] = [
  {
    id: 1,
    name: 'Alice Nguyen',
    avatar: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/3.jpg',
    rating: 5,
    comment: 'Khóa học rất chất lượng, giảng viên nhiệt tình và phương pháp dễ hiểu.',
  },
  {
    id: 2,
    name: 'Cindy Pham',
    avatar: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/12.jpg',
    rating: 5,
    comment: 'Môi trường học thoải mái, bài tập phong phú, đáng đồng tiền bát gạo!',
  },
];

export default function ReviewSection() {
  const screens = useBreakpoint();

  const content = (
    <Row gutter={[24, 24]} justify="center">
      {reviews.map((r) => (
        <Col key={r.id} xs={24} sm={12} md={8}>
          <motion.div
            // className="space-y-6"
            initial="hidden"
            whileInView="showUp"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <Card
              hoverable
              className="shadow-sm rounded-lg overflow-hidden"
            >
              <div className="flex items-center mb-4">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <Text strong>{r.name}</Text>
                  <div><Rate disabled defaultValue={r.rating} /></div>
                </div>
              </div>
              <Paragraph className="text-gray-600 mb-0 line-clamp-3">
                “{r.comment}”
              </Paragraph>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  );

  return (
    <motion.section
      className="section-testimonials bg-green-50 py-16"
      initial="hidden"
      whileInView="showUp"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4">
        <Title level={2} className="text-center mb-8">
          What Our Students Say
        </Title>

        {screens.md ? (
          content
        ) : (
          <Carousel
            autoplay
            dots
            arrows={false}
            dotPosition="bottom"
            className="px-4"
          >
            {reviews.map((r) => (
              <div key={r.id} className="px-2">
                <Card
                  hoverable
                  className="mx-auto shadow-sm rounded-lg overflow-hidden"
                  style={{ maxWidth: 300 }}                >
                  <div className="flex items-center mb-4">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <Text strong>{r.name}</Text>
                      <div><Rate disabled defaultValue={r.rating} /></div>
                    </div>
                  </div>
                  <Paragraph className="text-gray-600 mb-0">
                    “{r.comment}”
                  </Paragraph>
                </Card>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </motion.section>
  );
}
