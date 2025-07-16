import { Button, Typography } from 'antd';
import { motion } from 'framer-motion';
import { heroVariants } from '../../animations/VariantContext';
import { Link } from 'react-router';

const { Title, Paragraph } = Typography;


export default function HeroSection() {

  return (
    <section className="relative overflow-hidden px-10 text-white bg-gray-50">

      <div className="relative container mx-auto px-4 py-0 flex flex-col-reverse md:flex-row items-center ">
        <div className="w-full md:w-1/2 py-4">
          <motion.div
            custom={1}
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            variants={heroVariants}
          >
            <Title className="text-3xl sm:text-4xl lg:text-5xl font-extrabold  " style={{ color: '#16a34a' }}>
              Learn Languages,<br /> Anywhere, Anytime
            </Title>
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            variants={heroVariants}
          >
            <Paragraph className="mt-4 text-lg sm:text-xl max-w-md">
              Join thousands of learners worldwide. Interactive lessons, live sessions, and personalized AI recommendations to boost your fluency.
            </Paragraph>
          </motion.div>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            variants={heroVariants}
            className="mt-6 flex flex-wrap gap-4"
          >
            <Link to="/products">
              <Button size="large" type="primary" className="shadow-lg" >
                Start Now
              </Button>
            </Link>

          </motion.div>
        </div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={heroVariants}
          className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center items-center h-full"
        >
          <img
            src={'/Hero2.png'}
            alt="Learning illustration"
            className="w-3xl max-w-sm h-full animate-float "
          />
        </motion.div>
      </div>
    </section>
  );
}
