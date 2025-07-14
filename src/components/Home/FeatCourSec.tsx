// import { Row, Col, Card, Button } from 'antd';

// export default function FeaturedCoursesSection() {
//   return (
//     <section className="bg-green-50 py-16 section-featured">
//       <div className="container mx-auto">
//         <h2 className="text-2xl font-semibold mb-6">Featured Courses</h2>
//         <Row gutter={[16, 16]}>
//           {[1,2,3,4].map(i => (
//             <Col key={i} xs={24} sm={12} md={6}>
//               <Card
//                 hoverable
//                 cover={<img alt={`Course ${i}`} src={`/course-${i}.jpg`} />}
//               >
//                 <Card.Meta
//                   title={`Course Title ${i}`}
//                   description="Short description here"
//                 />
//                 <Button type="link" className="mt-4 p-0">Find More Teachers →</Button>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </section>
//   );
// }


import { Row, Col, Card, Button } from 'antd';
import { motion } from 'framer-motion';
import { sectionVariants } from '../../animations/FrameMotVariants';

const courses = [1, 2, 3, 4];

export default function FeaturedCoursesSection() {
  return (
    <motion.section
      className="bg-green-50 py-16 section-featured"
      initial={'hidden'}
      whileInView={'showUp'}
      viewport={{ once: false }}
      variants={sectionVariants}
    >
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Featured Courses</h2>
        <Row gutter={[16, 16]}>
          {courses.map((i) => (
            <Col key={i} xs={24} sm={12} md={6} >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3,delay: 0.2 * i   }}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
              >

                <Card hoverable cover={<img alt={`Course ${i}`} src={`/course-${i}.jpg`} />}>
                  <Card.Meta title={`Course Title ${i}`} description="Short description here" />
                  <Button type="link" className="mt-4 p-0">
                    Find More Teachers →
                  </Button>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </motion.section>
  );
}
