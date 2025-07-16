import { motion, useReducedMotion } from 'framer-motion';
import { pageVariants } from '../animations/VariantContext';
import FAQSection from '../components/Home/FAQSec';
import FeaturedCoursesSection from '../components/Home/FeatCourSec';
import HeroSection from '../components/Home/HeroSec';
import ReviewSection from '../components/Home/ReviewSec';
import ServicesSection from '../components/Home/ServSec';
import StatsSection from '../components/Home/StatsSec';

export default function Home() {
  const reduceMotion = useReducedMotion();
  console.log(reduceMotion)
  return (
    <motion.div
      initial={'hidden'}
      animate={'show'}
      variants={pageVariants}
      className="space-y-24"
    >
      <HeroSection />
      <StatsSection />
      <FeaturedCoursesSection />
      <ServicesSection />
      <ReviewSection />
      <FAQSection />
    </motion.div>
  );
}