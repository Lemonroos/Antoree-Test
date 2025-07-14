// import { Carousel } from 'antd';

// export default function TestimonialsSection() {
//   return (
//     <section className="bg-green-50 py-16 section-testimonials">
//       <div className="container mx-auto">
//         <h2 className="text-2xl font-semibold mb-6 text-center">What Our Students Say</h2>
//         <Carousel autoplay dotPosition="bottom">
//           {[1,2,3].map(i => (
//             <div key={i} className="px-8">
//               <div className="bg-white p-8 rounded-lg shadow mx-auto max-w-xl">
//                 <p className="italic mb-4">
//                   “This course changed the way I learn languages. Highly recommend!”
//                 </p>
//                 <div className="font-bold">User {i}</div>
//                 <div className="text-sm text-gray-600">⭐⭐⭐⭐⭐</div>
//               </div>
//             </div>
//           ))}
//         </Carousel>
//       </div>
//     </section>
//   );
// }


// import React from 'react';
import { Carousel } from 'antd';
import { motion } from 'framer-motion';

export default function ReviewSection() {
  return (
    <motion.section
      className="bg-green-50 py-16 section-testimonials"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">What Our Students Say</h2>
        <Carousel autoplay dotPosition="bottom" arrows dots={true}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="px-8">
              <motion.div
                className="bg-white p-8 rounded-lg shadow mx-auto max-w-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 * i }}
              >
                <p className="italic mb-4">
                  “This course changed the way I learn languages. Highly recommend!”
                </p>
                <div className="font-bold">User {i}</div>
                <div className="text-sm text-gray-600">⭐⭐⭐⭐⭐</div>
              </motion.div>
            </div>
          ))}
        </Carousel>
      </div>
    </motion.section>
  );
}