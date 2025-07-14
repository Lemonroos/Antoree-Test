// import { Statistic, Row, Col } from 'antd';

// export default function StatsSection() {
//   return (
//     <section className="bg-white py-16 section-stats">
//       <div className="container mx-auto">
//         <Row gutter={[16, 16]} justify="center">
//           <Col xs={24} sm={8} className="text-center">
//             <Statistic title="Languages" value={15} />
//           </Col>
//           <Col xs={24} sm={8} className="text-center">
//             <Statistic title="Teachers" value={1200} />
//           </Col>
//           <Col xs={24} sm={8} className="text-center">
//             <Statistic title="Students" value={50000} />
//           </Col>
//         </Row>
//       </div>
//     </section>
//   );
// }


// [⚠️ Suspicious Content] import React from 'react';
import { Statistic, Row, Col } from 'antd';
import { motion } from 'framer-motion';
import { sectionVariants } from '../../animations/FrameMotVariants';

export default function StatsSection() {
  return (
    <motion.section
      className="bg-white py-16 section-stats"
      initial={'hidden'}
      whileInView={'showUp'}
      viewport={{ once: false }}
      variants={sectionVariants}
    >
      <div className="container mx-auto">
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={8} className="text-center">
            <div

            >
              <Statistic title="Languages" value={15} />
            </div>

          </Col>
          <Col xs={24} sm={8} className="text-center">
            <div>
              <Statistic title="Teachers" value={1200} />
            </div>
          </Col>
          <Col xs={24} sm={8} className="text-center">
            <div
            // initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
            >
              <Statistic title="Students" value={50000} />
            </div>
          </Col>
        </Row>
      </div>
    </motion.section>
  );
}