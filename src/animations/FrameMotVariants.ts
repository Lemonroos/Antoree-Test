import type { Variants } from 'framer-motion';
// const delay = 0.2;

export const pageVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          staggerChildren: 0.2,     // tự động delay các section
        }
      },
    exit: { opacity: 0, transition: { duration: 4 } }
};

export const sectionVariants: Variants = {
    hidden: { opacity: 0,transition: { duration: 0 } },
    // delay: { transition:{delay: delay}},
    show: {
        opacity: 1, transition: {
            duration: 1,
        }
    },
    showUp: {
        opacity: 1, y: -20, transition: {
            duration: 1,
        }
    },
    showLeft: {
        opacity: 1, x: -20, transition: {
            duration: 1,
            // when: 'beforeChildren',
            // delayChildren: 0.15,
        }
    },
    showRight: {
        opacity: 1, x: 20, transition: {
            duration: 1,

        }
    },
};