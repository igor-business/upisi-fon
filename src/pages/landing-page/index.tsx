import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import {
  AboutSection,
  ContactSection,
  FaqSection,
  Hero,
  LessonsSection,
  PricingSection,
  ProcessSection,
  ProgramSection,
  ScrollToTop,
  TestimonialsSection,
} from '@components';
import { AppConstants, RouteConstants } from '@constants';
import { PricingTier, ProductId, ScrollToSectionState } from '@/types/common';
import { scrollToSection } from '@/utils/scroll';
import styles from './index.module.css';

const { SECTION_IDS } = AppConstants;

/** Returns [1, 2, ..., count] (used to build numbered translation keys). */
const range = (count: number) => Array.from({ length: count }, (_, i) => i + 1);

export function LandingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const openPurchase = (product: ProductId, tier: PricingTier = 'individual') => {
    const params = new URLSearchParams({
      program: AppConstants.PRODUCT_SLUGS[product],
      nacin: AppConstants.TIER_SLUGS[tier],
    });
    navigate(`${RouteConstants.ROUTES.PURCHASE}?${params.toString()}`);
  };

  // Coming back from the purchase page: scroll to the requested section (e.g. pricing).
  useEffect(() => {
    const target = (location.state as ScrollToSectionState | null)?.scrollTo;
    if (!target) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.state]);

  return (
    <div className={styles.page}>
      <Hero
        eyebrow={t('hero.eyebrow')}
        description={t('hero.description')}
        primaryAction={t('hero.primaryAction')}
        onPrimaryAction={() => openPurchase('fullPrep')}
        secondaryAction={t('hero.secondaryAction')}
        onSecondaryAction={() => scrollToSection(SECTION_IDS.lessons)}
        stats={range(AppConstants.HERO_STATS_COUNT).map((n) => ({
          value: t(`hero.stats.${n}.value`),
          label: t(`hero.stats.${n}.label`),
        }))}
        imageAlt={t('hero.imageAlt')}
      />
      <ProgramSection
        id={SECTION_IDS.program}
        title={<Trans i18nKey="program.title" components={{ 1: <mark className={styles.highlight} /> }} />}
        description={t('program.description')}
        cards={range(AppConstants.PROGRAM_CARDS_COUNT).map((n) => ({
          media: (
            <img
              src={AppConstants.PROGRAM_CARD_IMAGES[n - 1]}
              alt=""
              width={AppConstants.PROGRAM_CARD_IMAGE_SIZE.width}
              height={AppConstants.PROGRAM_CARD_IMAGE_SIZE.height}
              loading="lazy"
            />
          ),
          title: t(`program.cards.${n}.title`),
          items: range(AppConstants.PROGRAM_CARD_ITEMS_COUNT).map((m) =>
            t(`program.cards.${n}.items.${m}`),
          ),
        }))}
        actionLabel={t('program.action')}
        onAction={() => scrollToSection(SECTION_IDS.process)}
      />
      <ProcessSection
        id={SECTION_IDS.process}
        eyebrow={t('process.eyebrow')}
        title={t('process.title')}
        steps={range(AppConstants.PROCESS_STEPS_COUNT).map((n) => ({
          title: t(`process.steps.${n}.title`),
          description: t(`process.steps.${n}.description`),
        }))}
        actionLabel={t('process.action')}
        onAction={() => openPurchase('fullPrep')}
      />
      <LessonsSection
        id={SECTION_IDS.lessons}
        title={t('lessons.title')}
        description={t('lessons.description')}
        lessons={AppConstants.FEATURED_LESSONS.map((n) => ({
          videoId: AppConstants.LESSONS[n - 1].id,
          title: t(`lessons.items.${n}.title`),
          duration: t(`lessons.items.${n}.duration`),
        }))}
        getPlayLabel={(title) => t('lessons.play', { title })}
        closeLabel={t('lessons.close')}
        actionLabel={t('lessons.action')}
        onAction={() => navigate(RouteConstants.ROUTES.LESSONS)}
      />
      <AboutSection
        id={SECTION_IDS.about}
        title={t('about.title')}
        description={t('about.description')}
        members={(['teacher', 'founder'] as const).map((key) => ({
          name: t(`about.members.${key}.name`),
          role: t(`about.members.${key}.role`),
          description: t(`about.members.${key}.description`),
          photo: (
            <img
              src={AppConstants.IMAGES[key]}
              alt={t(`about.members.${key}.photoAlt`)}
              width={AppConstants.MEMBER_PHOTO_SIZE}
              height={AppConstants.MEMBER_PHOTO_SIZE}
              loading="lazy"
            />
          ),
        }))}
        partner={{
          logo: (
            <img
              src={AppConstants.IMAGES.binaryBioskop}
              alt={t('about.partner.logoAlt')}
              width={AppConstants.BINARY_BIOSKOP_LOGO_SIZE.width}
              height={AppConstants.BINARY_BIOSKOP_LOGO_SIZE.height}
              loading="lazy"
            />
          ),
          title: t('about.partner.title'),
          description: t('about.partner.description'),
          actionLabel: t('about.partner.action'),
          actionHref: AppConstants.BINARY_BIOSKOP_URL,
        }}
      />
      <TestimonialsSection
        id={SECTION_IDS.results}
        title={t('testimonials.title')}
        testimonials={range(AppConstants.TESTIMONIALS_COUNT).map((n) => ({
          quote: t(`testimonials.items.${n}.quote`),
          name: t(`testimonials.items.${n}.name`),
          meta: t(`testimonials.items.${n}.meta`),
        }))}
      />
      <PricingSection
        id={SECTION_IDS.pricing}
        onSelect={openPurchase}
        onSummerSchool={() => navigate(RouteConstants.ROUTES.SUMMER_SCHOOL)}
      />
      <FaqSection
        id={SECTION_IDS.faq}
        eyebrow={t('faq.eyebrow')}
        title={t('faq.title')}
        items={range(AppConstants.FAQ_ITEMS_COUNT).map((n) => ({
          question: t(`faq.items.${n}.question`),
          answer: t(`faq.items.${n}.answer`),
        }))}
      />
      <ContactSection id={SECTION_IDS.contact} onAction={() => openPurchase('fullPrep')} />
      <ScrollToTop />
    </div>
  );
}

export default LandingPage;
