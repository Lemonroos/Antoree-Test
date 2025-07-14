
// const partners = ['logo1','logo2','logo3','logo4'];

// export default function PartnersSection() {
//   return (
//     <section className="py-16 section-partners">
//       <div className="container mx-auto text-center">
//         <h2 className="text-2xl font-semibold mb-8">Trusted By</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
//           {partners.map((logo, i) => (
//             <img key={i} src={`/${logo}.png`} alt={`Partner ${i}`} className="mx-auto h-12" />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



// import React from 'react';
import { motion } from 'framer-motion';
import { sectionVariants } from '../../animations/FrameMotVariants';

const partners = ['logo1', 'logo2', 'logo3', 'logo4'];

export default function PartnersSection() {
  return (
    <motion.section
      className="py-16 section-partners"
      initial={'hidden'}
      whileInView={'showUp'}
      viewport={{ once: false }}
      variants={sectionVariants}
      
    //   viewport={{ once: true }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-8">Trusted By</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
          {partners.map((logo, i) => (
            <motion.img
              key={i}
              src={`/${logo}.png`}
              alt={`Partner ${i}`}
              className="mx-auto h-12 filter grayscale hover:grayscale-0 transition-filter"
              initial={{ scale: 0.8, opacity: 0 }}
              viewport={{ once: true }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 * i }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
