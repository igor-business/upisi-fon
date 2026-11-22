import { ScrollToTop } from '@components';
import { SHOW_FAQ } from '@constants';
import {
  AboutSection,
  FaqSection,
  HeroSection,
  LessonsSection,
  PricingSection,
  ProcessSection,
  ProgramSection,
  TestimonialsSection,
} from './sections';
import styles from './index.module.css';

export function LandingPage() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <ProgramSection />
      <ProcessSection />
      <LessonsSection />
      <AboutSection />
      <TestimonialsSection />
      <PricingSection />
      {SHOW_FAQ && <FaqSection />}
      <ScrollToTop />
    </div>
  );
}
