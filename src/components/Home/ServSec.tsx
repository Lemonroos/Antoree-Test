// import { Row, Col } from 'antd';

// const services = [
//   {icon: '🎧', title: 'Podcasts', desc: 'Learn on the go'},
//   {icon: '📝', title: 'Quizzes', desc: 'Test your skills'},
//   {icon: '💬', title: '1‑on‑1 Tutoring', desc: 'Personalized lessons'},
// ];

// export default function ServicesSection() {
//   return (
//     <section className="py-16 section-services">
//       <div className="container mx-auto">
//         <h2 className="text-2xl font-semibold mb-8">Our Services</h2>
//         <Row gutter={[24, 24]}>
//           {services.map((svc, i) => (
//             <Col key={i} xs={24} sm={12} md={8}>
//               <div className="bg-white p-6 rounded-lg shadow text-center">
//                 <div className="text-4xl mb-4">{svc.icon}</div>
//                 <h3 className="font-semibold mb-2">{svc.title}</h3>
//                 <p>{svc.desc}</p>
//               </div>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </section>
//   );
// }


// import React from 'react';
import { Row, Col } from 'antd';
import { motion } from 'framer-motion';
import { sectionVariants } from '../../animations/FrameMotVariants';

const services = [
  { icon: '🎧', title: 'Podcasts', desc: 'Learn on the go' },
  { icon: '📝', title: 'Quizzes', desc: 'Test your skills' },
  { icon: '💬', title: '1‑on‑1 Tutoring', desc: 'Personalized lessons' },
];

export default function ServicesSection() {
  return (
    <motion.section
      className="py-16 section-services"
      initial={'hidden'}
      whileInView={'showUp'}
      viewport={{ once: false }}
      variants={sectionVariants}
    >
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-8">Our Services</h2>
        <Row gutter={[24, 24]}>
          {services.map((svc, i) => (
            <Col key={i} xs={24} sm={12} md={8}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * i + 0.2 }}
                className="bg-white p-6 rounded-lg shadow text-center"
              >
                <div className="text-4xl mb-4">{svc.icon}</div>
                <h3 className="font-semibold mb-2">{svc.title}</h3>
                <p>{svc.desc}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </motion.section>
  );
}