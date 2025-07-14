



// import React from 'react';
import { Collapse, Space } from 'antd';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
const { Panel } = Collapse;

const faqs = [
    { q: 'How do I start?', a: 'Click "Start Now" and create your account.' },
    { q: 'What languages?', a: 'Over 150 languages available.' },
    { q: 'Pricing?', a: 'Pay per lesson, no subscription.' },
];

// Container variants to stagger children
const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: { delayChildren: 1 }
    }
};

// Item variants for entry and exit
const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }
};

export default function FAQSection() {
    return (
        <motion.section
            className="py-16 section-faq"
            initial="hidden"
            whileInView="show"
            exit="exit"
            variants={containerVariants}
            viewport={{ once: false, amount: 0.2 }}
        >
            <div className="container mx-auto max-w-2xl">
                <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
                <motion.div variants={containerVariants}>
                    <Space direction="vertical" className="w-full">
                        {faqs.map((item, i) => (
                            <motion.div key={i} variants={itemVariants} initial="hidden" animate="show" exit="exit">
                                <Collapse
                                    accordion
                                    expandIconPosition="end"
                                    bordered={false}
                                    className="bg-white rounded-lg mb-4"
                                >
                                    <Panel key={i}
                                        header={item.q}
                                        className="border-none rounded-lg"
                                    >
                                        <p className="p-4 text-gray-700">{item.a}</p>
                                    </Panel>
                                </Collapse>
                            </motion.div>
                        ))}
                    </Space>
                </motion.div>
            </div>
        </motion.section>
    );
}