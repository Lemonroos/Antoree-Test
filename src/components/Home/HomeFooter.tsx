
// export default function FooterSection() {
//   return (
//     <footer className="bg-green-700 text-white py-8 section-footer">
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div>
//           <h3 className="font-bold mb-2">English Learning Co.</h3>
//           <p>© {new Date().getFullYear()}</p>
//         </div>
//         <div>
//           <h3 className="font-bold mb-2">Contact</h3>
//           <p>support@example.com</p>
//         </div>
//         <div>
//           <h3 className="font-bold mb-2">Follow Us</h3>
//           <div className="flex space-x-4">
//             <a href="#" aria-label="Twitter">🐦</a>
//             <a href="#" aria-label="Facebook">📘</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }



// import React from 'react';
// import { motion } from 'framer-motion';

export default function FooterSection() {
  return (
    <>
    {/* <motion.footer
      className="bg-green-700 text-white py-8 section-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold mb-2">English Learning Co.</h3>
          <p>© {new Date().getFullYear()}</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Contact</h3>
          <p>support@example.com</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Facebook">📘</a>
          </div>
        </div>
      </div>
    </motion.footer> */}
      </>
  );
}