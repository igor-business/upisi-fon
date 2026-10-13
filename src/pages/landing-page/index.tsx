import { useTranslation } from 'react-i18next';
import { FeaturesSection, Hero, LandingSection, ProblemSection, ProcessSection, ProgramSection, ScrollToTop, TestimonialsSection } from '@components';
import { AppConstants } from '@constants';
import { scrollToSection } from '@/utils/scroll';
import styles from './index.module.css';

/** Returns [1, 2, ..., count] (used to build numbered translation keys). */
const range = (count: number) => Array.from({ length: count }, (_, i) => i + 1);

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
      <TestimonialsSection
        id="section-4"
        title={t('testimonials.title')}
        stats={range(AppConstants.TESTIMONIALS_STATS_COUNT).map((n) => ({
          value: t(`testimonials.stats.${n}.value`),
          label: t(`testimonials.stats.${n}.label`),
        }))}
        testimonials={range(AppConstants.TESTIMONIALS_COUNT).map((n) => ({
          quote: t(`testimonials.items.${n}.quote`),
          name: t(`testimonials.items.${n}.name`),
          meta: t(`testimonials.items.${n}.meta`),
        }))}
        paginationLabel={t('testimonials.pagination')}
        getPageLabel={(page) => t('testimonials.page', { page })}
      />
      <ProgramSection
        id="section-3"
        eyebrow={t('program.eyebrow')}
        title={t('program.title')}
        description={t('program.description')}
        items={range(AppConstants.PROGRAM_ITEMS_COUNT).map((n) => t(`program.items.${n}`))}
        actionLabel={t('program.action')}
        onAction={() => scrollToSection('section-5')}
        media={
          <img
            src={AppConstants.IMAGES.programSystem}
            alt={t('program.imageAlt')}
            width={AppConstants.PROGRAM_IMAGE_SIZE.width}
            height={AppConstants.PROGRAM_IMAGE_SIZE.height}
            loading="lazy"
          />
        }
      />
      <ProcessSection
        id="section-5"
        eyebrow={t('process.eyebrow')}
        title={t('process.title')}
        steps={range(AppConstants.PROCESS_STEPS_COUNT).map((n) => ({
          title: t(`process.steps.${n}.title`),
          description: t(`process.steps.${n}.description`),
        }))}
      />
      {AppConstants.LANDING_SECTIONS.filter((section) => ![1, 2, 3, 4, 5].includes(section.index)).map((section) => (
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
