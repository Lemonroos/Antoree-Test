import { Col, Row, Typography } from 'antd';
import { motion } from 'framer-motion';
import { colVariants, sectionVariants } from '../../animations/VariantContext';

const { Title } = Typography;


const partners = [
  '/partners/logo1.png',
  '/partners/logo2.png',
  '/partners/logo3.png',
  '/partners/logo4.png',
  '/partners/logo5.png',
  '/partners/logo6.png',
];

export default function PartnersSection() {
  return (
    <motion.section
      className="section-partners py-6"
      initial="hidden"
      whileInView="showUp"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 text-center">
        <Title level={3} className="mb-10">Trusted By</Title>

        <Row gutter={[24, 24]} justify="center" align="middle">
          {partners.map((src, idx) => (
            <Col key={idx} xs={12} sm={8} md={6} lg={4}>
              <motion.div
                className="flex justify-center"
                custom={idx} initial="hidden"  viewport={{ once: true }} variants={colVariants} whileInView="show"
              >

                <img
                  src={src}
                  alt={`Partner ${idx + 1}`}
                  className="h-16 object-contain filter grayscale hover:filter-none transition-all duration-300"
                />

              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </motion.section>
  );
}
