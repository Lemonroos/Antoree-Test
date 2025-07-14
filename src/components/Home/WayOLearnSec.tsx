// import { Row, Col } from 'antd';

// const modes = [
//   {icon:'💻', label:'Live Classes'},
//   {icon:'🎙️', label:'Podcasts'},
//   {icon:'⚡', label:'Flashcards'},
// ];

// export default function LearningModesSection() {
//   return (
//     <section className="bg-white py-16 section-modes">
//       <div className="container mx-auto">
//         <h2 className="text-2xl font-semibold mb-8">Learning Modes</h2>
//         <Row gutter={[24,24]}>
//           {modes.map((m,i) => (
//             <Col key={i} xs={24} sm={12} md={8}>
//               <div className="flex items-center p-4 bg-green-50 rounded-lg">
//                 <span className="text-3xl mr-4">{m.icon}</span>
//                 <span className="font-medium">{m.label}</span>
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

const modes = [
  { icon: '💻', label: 'Live Classes' },
  { icon: '🎙️', label: 'Podcasts' },
  { icon: '⚡', label: 'Flashcards' },
];

export default function LearningModesSection() {
  return (
    <motion.section
      className="bg-white py-16 section-modes"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-8">Learning Modes</h2>
        <Row gutter={[24, 24]}>
          {modes.map((m, i) => (
            <Col key={i} xs={24} sm={12} md={8}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 * i }}
                className="flex items-center p-4 bg-green-50 rounded-lg"
              >
                <span className="text-3xl mr-4">{m.icon}</span>
                <span className="font-medium">{m.label}</span>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </motion.section>
  );
}
