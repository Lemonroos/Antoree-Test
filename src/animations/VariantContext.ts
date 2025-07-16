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
    hidden: { opacity: 0, transition: { duration: 0 } },
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


export const heroVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.2 * i, duration: 0.8 }
    })
};

export const colVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: i => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
    })
};


export const rowVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    show: i => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
    })
};