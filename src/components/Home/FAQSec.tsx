import { Collapse, Typography } from 'antd';
import { motion } from 'framer-motion';
import { rowVariants, sectionVariants } from '../../animations/VariantContext';

const { Title } = Typography;
const { Panel } = Collapse;

const faqs = [
    {
        q: 'How do I start?',
        a: 'Click “Start Now” on the homepage, fill out your details and you’re ready to go!',
    },
    {
        q: 'What languages are available?',
        a: 'We offer over 150 languages, from popular ones like English, Spanish, Chinese to niche dialects.',
    },
    {
        q: 'How does pricing work?',
        a: 'Pay per lesson—no monthly subscription. You only pay for the classes you take.',
    },
];




export default function FAQSection() {
    return (
        <motion.section
            className="  py-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={sectionVariants}
        >
            <div className="container mx-auto px-4 max-w-2xl">
                <Title level={3} className="text-center ">
                    Frequently Asked Questions
                </Title>

                {faqs.map((item, i) => (

                    <motion.div key={i} variants={rowVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className='my-5 '>
                        <Collapse
                            accordion
                            expandIconPosition="end"
                            bordered={false}
                            className="bg-white rounded-lg mb-4 shadow"
                        >
                            <Panel key={i}
                                header={item.q}
                                className="border-none rounded-lg"
                            >
                                <p className="p-4 text-gray-700 text">{item.a}</p>
                            </Panel>
                        </Collapse>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
