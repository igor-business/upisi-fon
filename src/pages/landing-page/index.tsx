import { useTranslation } from 'react-i18next';
import { SHOW_FAQ } from '@constants';
import { usePageMeta } from '@/hooks';
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
  const { t } = useTranslation();
  usePageMeta({ title: t('meta.home.title'), description: t('meta.home.description') });

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
    </div>
  );
}
