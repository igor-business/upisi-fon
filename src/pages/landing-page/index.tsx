import { ScrollToTop } from '@components';
import { useScrollToRequestedSection } from '@/hooks';
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
  useScrollToRequestedSection();

  return (
    <div className={styles.page}>
      <HeroSection />
      <ProgramSection />
      <ProcessSection />
      <LessonsSection />
      <AboutSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <ScrollToTop />
    </div>
  );
}
