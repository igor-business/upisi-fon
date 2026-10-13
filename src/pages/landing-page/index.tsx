import { useTranslation } from 'react-i18next';
import { Hero, LandingSection, ScrollToTop } from '@components';
import { AppConstants } from '@constants';
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
      {AppConstants.LANDING_SECTIONS.map((section) => (
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
