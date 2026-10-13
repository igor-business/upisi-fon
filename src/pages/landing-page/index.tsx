import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AboutSection,
  CtaSection,
  FaqSection,
  FeaturesSection,
  Hero,
  LessonsSection,
  MentorSection,
  PricingSection,
  ProblemSection,
  ProcessSection,
  ProgramSection,
  ScrollToTop,
  TestimonialsSection,
} from '@components';
import { AppConstants, RouteConstants } from '@constants';
import { scrollToSection } from '@/utils/scroll';
import styles from './index.module.css';

/** Returns [1, 2, ..., count] (used to build numbered translation keys). */
const range = (count: number) => Array.from({ length: count }, (_, i) => i + 1);

export function LandingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToApp = () => navigate(RouteConstants.ROUTES.APP);

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
      <LessonsSection
        id="section-6"
        eyebrow={t('lessons.eyebrow')}
        title={t('lessons.title')}
        description={t('lessons.description')}
        lessons={AppConstants.LESSON_VIDEO_IDS.map((videoId, i) => ({
          videoId,
          title: t(`lessons.items.${i + 1}.title`),
          duration: t(`lessons.items.${i + 1}.duration`),
        }))}
        getPlayLabel={(title) => t('lessons.play', { title })}
        closeLabel={t('lessons.close')}
      />
      <AboutSection
        id="section-7"
        eyebrow={t('about.eyebrow')}
        title={t('about.title')}
        description={t('about.description')}
        actionLabel={t('about.action')}
        onAction={() => scrollToSection('section-7')}
        partnerLogo={
          <img
            src={AppConstants.IMAGES.binaryBioskop}
            alt={t('about.partnerLogoAlt')}
            width={AppConstants.BINARY_BIOSKOP_LOGO_SIZE.width}
            height={AppConstants.BINARY_BIOSKOP_LOGO_SIZE.height}
            loading="lazy"
          />
        }
        stats={range(AppConstants.ABOUT_STATS_COUNT).map((n) => ({
          value: t(`about.stats.${n}.value`),
          label: t(`about.stats.${n}.label`),
        }))}
      />
      <MentorSection
        id="section-8"
        eyebrow={t('mentor.eyebrow')}
        title={t('mentor.title')}
        description={t('mentor.description')}
        items={range(AppConstants.MENTOR_ITEMS_COUNT).map((n) => ({
          title: t(`mentor.items.${n}.title`),
          description: t(`mentor.items.${n}.description`),
        }))}
        actionLabel={t('mentor.action')}
        onAction={() => scrollToSection('section-10')}
      />
      <PricingSection
        id="section-9"
        eyebrow={t('pricing.eyebrow')}
        title={t('pricing.title')}
        badge={t('pricing.badge')}
        plans={AppConstants.PRICING_PLANS.map((plan) => ({
          name: t(`pricing.plans.${plan.index}.name`),
          description: t(`pricing.plans.${plan.index}.description`),
          price: t(`pricing.plans.${plan.index}.price`),
          priceNote: t(`pricing.plans.${plan.index}.priceNote`),
          saving: plan.hasSaving ? t(`pricing.plans.${plan.index}.saving`) : undefined,
          highlighted: plan.highlighted,
          features: range(AppConstants.PRICING_FEATURES_COUNT).map((n) =>
            t(`pricing.features.${n}`),
          ),
          actionLabel: t(`pricing.plans.${plan.index}.action`),
          onAction: goToApp,
        }))}
        note={t('pricing.note')}
      />
      <FaqSection
        id="section-10"
        eyebrow={t('faq.eyebrow')}
        title={t('faq.title')}
        items={range(AppConstants.FAQ_ITEMS_COUNT).map((n) => ({
          question: t(`faq.items.${n}.question`),
          answer: t(`faq.items.${n}.answer`),
        }))}
      />
      <CtaSection
        id="section-11"
        title={t('cta.title')}
        description={t('cta.description')}
        actionLabel={t('cta.action')}
        onAction={goToApp}
      />
      <ScrollToTop />
    </div>
  );
}

export default LandingPage;
