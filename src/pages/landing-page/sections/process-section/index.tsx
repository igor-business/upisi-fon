import { Fragment, type ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, Description, OutlineIcon, Section, Title, TitleAccent } from '@components';
import { ROUTES, SECTION_IDS } from '@constants';
import clsx from 'clsx';
import styles from './index.module.css';

/**
 * Steps grouped by phase, in display order: everything before the entrance exam, then Summer
 * School after enrolling, which gets its own label and look (texts: process.steps.<step>).
 */
const PHASES = [
  { key: 'before', steps: ['apply', 'agree', 'payment', 'access', 'learn', 'practice', 'ready'] },
  { key: 'after', steps: ['summerSchool'] },
] as const;

type Step = (typeof PHASES)[number]['steps'][number];

/** Number of the first step of each phase (steps are numbered continuously across phases). */
const PHASE_OFFSETS = PHASES.map((_, index) =>
  PHASES.slice(0, index).reduce((count, phase) => count + phase.steps.length, 0),
);

const STEP_ICONS: Record<Step, ReactNode> = {
  // Document with a pencil
  apply: (
    <OutlineIcon size={28} strokeWidth={1.8}>
      <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
      <path d="M13 3v5h5" />
      <path d="M13 3l5 5v2" />
      <path d="M8.5 12h4M8.5 15.5h2.5" />
      <path d="m19.5 13.5 1.5 1.5-5 5-2.2.7.7-2.2z" />
    </OutlineIcon>
  ),
  // Phone
  agree: (
    <OutlineIcon size={28} strokeWidth={1.8}>
      <path d="M5 4h3.5l1.8 4.5-2.2 1.4a11 11 0 0 0 5 5l1.4-2.2L19 14.5V18a2 2 0 0 1-2 2A13 13 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </OutlineIcon>
  ),
  // Payment card
  payment: (
    <OutlineIcon size={28} strokeWidth={1.8}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <path d="M2.5 10h19" />
      <path d="M6.5 14.5h4" />
    </OutlineIcon>
  ),
  // Stack of books
  access: (
    <OutlineIcon size={28} strokeWidth={1.8}>
      <path d="M4 17.5 12 21l8-3.5" />
      <path d="M4 13l8 3.5 8-3.5" />
      <path d="M12 3 4 6.5 12 10l8-3.5z" />
      <path d="M4 6.5V13M20 6.5V13" />
    </OutlineIcon>
  ),
  // Laptop with a play button
  learn: (
    <OutlineIcon size={28} strokeWidth={1.8}>
      <rect x="4.5" y="5" width="15" height="11" rx="1.5" />
      <path d="M2.5 19h19" />
      <path d="m10.5 8.5 4 2.5-4 2.5z" />
    </OutlineIcon>
  ),
  // Check in a circle
  practice: (
    <OutlineIcon size={28} strokeWidth={1.8}>
      <circle cx="12" cy="12" r="9" />
      <path d="m7.8 12.4 3 3 5.4-6" />
    </OutlineIcon>
  ),
  // Graduation cap
  ready: (
    <OutlineIcon size={28} strokeWidth={1.8}>
      <path d="m2.5 9.5 9.5-5 9.5 5-9.5 5z" />
      <path d="M6.5 12v4.5c0 1.2 2.5 2.5 5.5 2.5s5.5-1.3 5.5-2.5V12" />
      <path d="M21.5 9.5V15" />
    </OutlineIcon>
  ),
  // Sun (Summer School)
  summerSchool: (
    <OutlineIcon size={28} strokeWidth={1.8}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </OutlineIcon>
  ),
};

/** Graduation cap shown in the "after enrolling" label. */
const AFTER_PHASE_ICON = (
  <OutlineIcon size={16} strokeWidth={2}>
    <path d="m2.5 9.5 9.5-5 9.5 5-9.5 5z" />
    <path d="M6.5 12v4.5c0 1.2 2.5 2.5 5.5 2.5s5.5-1.3 5.5-2.5V12" />
  </OutlineIcon>
);

/** "How it works": the steps from applying to the entrance exam (plus Summer School after it), as a vertical timeline. */
export function ProcessSection() {
  const { t } = useTranslation();

  return (
    <Section id={SECTION_IDS.process} contentClassName={styles.content}>
      <div className={styles.intro}>
        <Title className={styles.title}>
          <Trans i18nKey="process.title" components={{ 1: <TitleAccent /> }} />
        </Title>
        <Description className={styles.description}>{t('process.description')}</Description>
      </div>

      {/*
        A vertical line with numbered circles; the cards alternate left and right of it. A label on
        the line marks the start of the steps after enrolling, which get their own (dashed, dark) look.
      */}
      <div className={styles.timeline}>
        {PHASES.map((phase, phaseIndex) => (
          <Fragment key={phase.key}>
            {phase.key === 'after' && (
              <p className={styles.phase} data-phase={phase.key}>
                <span className={styles.phaseLabel}>
                  {AFTER_PHASE_ICON}
                  {t('process.afterEnrolling')}
                </span>
              </p>
            )}
            <ol className={styles.steps} data-phase={phase.key} start={PHASE_OFFSETS[phaseIndex] + 1}>
              {phase.steps.map((step: Step, stepIndex) => {
                const index = PHASE_OFFSETS[phaseIndex] + stepIndex;
                return (
                  <li key={step} className={clsx(styles.step, index % 2 === 0 ? styles.left : styles.right)}>
                    <div className={styles.card}>
                      <span className={styles.icon} aria-hidden="true">
                        {STEP_ICONS[step]}
                      </span>
                      <div className={styles.text}>
                        <h3 className={styles.stepTitle}>{t(`process.steps.${step}.title`)}</h3>
                        <p className={styles.stepDescription}>{t(`process.steps.${step}.description`)}</p>
                        {step === 'summerSchool' && (
                          <Link to={ROUTES.SUMMER_SCHOOL} className={styles.more}>
                            {t('process.summerSchoolLink')}
                            <ArrowRightIcon size={16} />
                          </Link>
                        )}
                      </div>
                    </div>
                    <span className={styles.connector} aria-hidden="true" />
                    <span className={styles.number} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </li>
                );
              })}
            </ol>
          </Fragment>
        ))}
      </div>
    </Section>
  );
}
