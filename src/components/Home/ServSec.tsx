import { Card, Col, Row, Typography } from 'antd';
import { motion } from 'framer-motion';
import { colVariants, sectionVariants } from '../../animations/VariantContext';

const { Title, Paragraph } = Typography;

const services = [
  { icon: '📚', title: 'E‑Books & Guides', desc: 'Tài liệu toàn diện, học mọi lúc' },
  { icon: '🗣️', title: 'Live Tutoring', desc: 'Kết nối trực tiếp với giáo viên' },
  { icon: '🎧', title: 'Podcasts', desc: 'Học tiếng Anh qua âm thanh' },
  { icon: '📝', title: 'Interactive Quizzes', desc: 'Kiểm tra và củng cố kiến thức' },
];

export default function ServicesSection() {
  return (
    <motion.section
      className="section-services bg-white py-16"
      initial="hidden"
      whileInView="showUp"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4">
        <Title level={2} className="text-center mb-8">
          Our Services
        </Title>

        <Row gutter={[24, 24]}>
          {services.map((svc, i) => (
            <Col key={i} xs={24} sm={12} lg={6}>
              <motion.div custom={i} initial="hidden" viewport={{ once: true }} variants={colVariants} whileInView="show">
                <Card
                  hoverable
                  className="flex flex-col items-center text-center p-6 h-full rounded-lg shadow-sm"
                >
                  <div className="text-5xl mb-4">{svc.icon}</div>
                  <Title level={4} className="mb-2">
                    {svc.title}
                  </Title>
                  <Paragraph className="text-gray-600 mb-0">
                    {svc.desc}
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </motion.section>
  );
}
