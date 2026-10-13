import { useTranslation } from 'react-i18next';
import { FeaturesSection, Hero, LandingSection, ProblemSection, ScrollToTop } from '@components';
import { AppConstants } from '@constants';
import { scrollToSection } from '@/utils/scroll';
import styles from './index.module.css';

export function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <Hero
        eyebrow={t('hero.eyebrow')}
        description={t('hero.description')}
        primaryAction={t('hero.primaryAction')}
        secondaryAction={t('hero.secondaryAction')}
        imageAlt={t('hero.imageAlt')}
      />
      <ProblemSection
        id="section-1"
        title={t('problem.title')}
        description={t('problem.description')}
        cards={[1, 2, 3].map((n) => ({
          title: t(`problem.cards.${n}.title`),
          description: t(`problem.cards.${n}.description`),
        }))}
      />
      <FeaturesSection
        id="section-2"
        title={t('features.title')}
        cards={[1, 2, 3, 4].map((n) => ({
          title: t(`features.cards.${n}.title`),
          description: t(`features.cards.${n}.description`),
        }))}
        actionLabel={t('features.action')}
        onAction={() => scrollToSection('section-3')}
      />
      {AppConstants.LANDING_SECTIONS.filter((section) => section.index > 2).map((section) => (
        <LandingSection
          key={section.id}
          id={section.id}
          title={t(`landing.section.${section.index}.title`)}
          description={t(`landing.section.${section.index}.description`)}
        />
      ))}
      <ScrollToTop />
    </div>
  );
}

export default LandingPage;
