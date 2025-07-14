// import { Button } from 'antd';

// export default function HeroSection() {
//   return (
//     <section className="relative bg-green-600 text-white py-20 section-hero">
//       <div className="container mx-auto flex flex-col-reverse md:flex-row items-center">
//         <div className="md:w-1/2 text-center md:text-left">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             Learn Languages, Anywhere
//           </h1>
//           <p className="mb-6 text-lg">
//             Join thousands of learners and start speaking today.
//           </p>
//           <Button size="large" type="primary" className="bg-white text-green-600 hover:bg-green-50">
//             Start Now
//           </Button>
//         </div>
//         <div className="md:w-1/2 mb-8 md:mb-0">
//           <img src="/hero-illustration.svg" alt="Hero" className="w-full" />
//         </div>
//       </div>
//     </section>
//   );
// }


// [⚠️ Suspicious Content] import React from 'react';
import { Button } from 'antd';
import { motion, useReducedMotion } from 'framer-motion';
import { sectionVariants } from '../../animations/FrameMotVariants';
// import type{Variants} from "framer-motion"  ;
export default function HeroSection() {
  const reduce = useReducedMotion();
  console.log(reduce);
  return (
    <motion.section
      className="relative bg-green-600 text-white py-20 section-hero"
      initial={'hidden'}
      whileInView={'showUp'}
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            animate={'showLeft'}
            variants={sectionVariants}
          >
            Learn Languages, Anywhere
          </motion.h1>
          <motion.p
            className="mb-6 text-lg"
            initial={'hidden'}
            animate={'showLeft'}
            variants={sectionVariants}
          >
            Join thousands of learners and start speaking today.
          </motion.p>
          <motion.div
            initial={'hidden'}
            animate={'showLeft'}
            variants={sectionVariants}
          >
            <Button size="large" type="primary" className="bg-white text-green-600 hover:bg-green-50">
              Start Now
            </Button>
          </motion.div>
        </div>
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          initial={'hidden'}
          animate={'showRight'}
          variants={sectionVariants}
        >
          <img src="/hero-illustration.svg" alt="Hero" className="w-full" />
        </motion.div>
      </div>
    </motion.section>
  );
}