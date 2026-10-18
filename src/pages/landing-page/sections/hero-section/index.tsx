import type { ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import { OutlineIcon, useOrderDialog } from '@components';
import { FOUNDING_YEAR, IMAGES, IMAGE_SIZES, SECTION_IDS } from '@constants';
import { scrollToSection } from '@/utils/scroll';
import styles from './index.module.css';

/** Statistics under the hero, in display order (texts: hero.stats.<key>). */
const STATS = ['experience', 'students', 'enrolled', 'budget'] as const;

type Stat = (typeof STATS)[number];

const STAT_ICONS: Record<Stat, ReactNode> = {
  // Clock
  experience: (
    <OutlineIcon size={26} strokeWidth={1.8}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </OutlineIcon>
  ),
  // People
  students: (
    <OutlineIcon size={26} strokeWidth={1.8}>
      <circle cx="9" cy="8.5" r="3.25" />
      <path d="M2.75 19c.4-3.2 2.8-5 6.25-5s5.85 1.8 6.25 5" />
      <path d="M15.5 5.5a3.1 3.1 0 0 1 0 6" />
      <path d="M17.5 14.3c2 .5 3.4 2 3.75 4.7" />
    </OutlineIcon>
  ),
  // Graduation cap
  enrolled: (
    <OutlineIcon size={26} strokeWidth={1.8}>
      <path d="m2.5 9.5 9.5-4.5 9.5 4.5-9.5 4.5z" />
      <path d="M6.5 11.8v4.2c0 1.3 2.5 2.7 5.5 2.7s5.5-1.4 5.5-2.7v-4.2" />
      <path d="M21.5 9.5v5" />
    </OutlineIcon>
  ),
  // Medal with a check (state-funded place)
  budget: (
    <OutlineIcon size={26} strokeWidth={1.8}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m9.6 9 1.7 1.7 3.1-3.3" />
      <path d="m8.6 13.6-1.4 6.9L12 18l4.8 2.5-1.4-6.9" />
    </OutlineIcon>
  ),
};

/** Top of the landing page: headline, calls to action, illustration and key statistics. */
export function HeroSection() {
  const { t } = useTranslation();
  const { openOrder } = useOrderDialog();
  // Computed on every render, so the number never goes stale.
  const yearsOfExperience = new Date().getFullYear() - FOUNDING_YEAR;

  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <div className={styles.content}>
          <div className={styles.copy}>
            <h1 className={styles.title}>
              <Trans i18nKey="hero.title" components={{ 1: <mark className={styles.titleHighlight} /> }} />
            </h1>
            <p className={styles.description}>{t('hero.description')}</p>
            <div className={styles.actions}>
              <Button size="lg" className={styles.action} onClick={() => openOrder('fullPrep')}>
                {t('hero.primaryAction')}
              </Button>
              <Button
                size="lg"
                variant="default"
                className={styles.action}
                onClick={() => scrollToSection(SECTION_IDS.lessons)}
              >
                {t('hero.secondaryAction')}
              </Button>
            </div>
            <div className={styles.partner}>
              <img
                src={IMAGES.binaryBioskop}
                alt=""
                width={IMAGE_SIZES.binaryBioskop.width}
                height={IMAGE_SIZES.binaryBioskop.height}
                className={styles.partnerLogo}
              />
              <p className={styles.partnerText}>
                <span className={styles.partnerCaption}>{t('hero.partner.caption')}</span>
                <span className={styles.partnerName}>{t('hero.partner.name')}</span>
              </p>
            </div>
          </div>
          <div className={styles.visual}>
            <img
              src={IMAGES.hero}
              alt={t('hero.imageAlt')}
              width={IMAGE_SIZES.hero.width}
              height={IMAGE_SIZES.hero.height}
              fetchPriority="high"
              className={styles.heroImage}
            />
          </div>
        </div>

        <svg className={styles.wave} viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M0 58C240 98 480 98 720 58S1200 18 1440 58V90H0Z" />
          <path className={styles.waveEdge} d="M0 58C240 98 480 98 720 58S1200 18 1440 58" />
        </svg>
      </div>

      <dl className={styles.stats}>
        {STATS.map((stat) => (
          <div key={stat} className={styles.stat}>
            <span className={styles.statIcon} data-stat={stat} aria-hidden="true">
              {STAT_ICONS[stat]}
            </span>
            <div className={styles.statText}>
              {/* `count` picks the Serbian plural form where the value has one ("12 godina" / "22 godine"). */}
              <dt className={styles.statValue}>{t(`hero.stats.${stat}.value`, { count: yearsOfExperience })}</dt>
              <dd className={styles.statLabel}>{t(`hero.stats.${stat}.label`)}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
