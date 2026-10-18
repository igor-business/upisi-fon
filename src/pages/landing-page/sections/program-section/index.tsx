import { Trans, useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import { ArrowDownIcon, CheckIcon, Section, Title } from '@components';
import { IMAGES, IMAGE_SIZES, SECTION_IDS } from '@constants';
import { scrollToSection } from '@/utils/scroll';
import clsx from 'clsx';
import styles from './index.module.css';

/** Cards of the section in display order (texts: program.cards.<key>). */
const CARDS = [
  { key: 'lessons', image: IMAGES.programLessons },
  { key: 'exams', image: IMAGES.programExams },
  { key: 'mentor', image: IMAGES.programMentor },
] as const;

/** Soft circles in the background (purely visual). */
const DECORATION = (
  <>
    <span className={clsx(styles.decor, styles.dot)} aria-hidden="true" />
    <span className={clsx(styles.decor, styles.bubble)} aria-hidden="true" />
    <span className={clsx(styles.decor, styles.bubbleRight)} aria-hidden="true" />
    <span className={clsx(styles.decor, styles.ring)} aria-hidden="true" />
  </>
);

/** "What you get": the three parts of the preparation. */
export function ProgramSection() {
  const { t } = useTranslation();

  return (
    <Section
      id={SECTION_IDS.program}
      tone="dark"
      className={styles.section}
      contentClassName={styles.content}
      decoration={DECORATION}
    >
      <div className={styles.intro}>
        <Title className={styles.title}>
          <Trans i18nKey="program.title" components={{ 1: <mark className={styles.highlight} /> }} />
        </Title>
        <p className={styles.description}>{t('program.description')}</p>
        <Button
          size="md"
          variant="default"
          className={styles.action}
          rightSection={<ArrowDownIcon size={18} />}
          onClick={() => scrollToSection(SECTION_IDS.process)}
        >
          {t('program.action')}
        </Button>
      </div>

      <ul className={styles.cards}>
        {CARDS.map(({ key, image }) => (
          <li key={key} className={styles.card}>
            <div className={styles.illustration}>
              <img
                src={image}
                alt=""
                width={IMAGE_SIZES.programCard.width}
                height={IMAGE_SIZES.programCard.height}
                loading="lazy"
              />
            </div>
            <h3 className={styles.cardTitle}>{t(`program.cards.${key}.title`)}</h3>
            <ul className={styles.items}>
              {t(`program.cards.${key}.items`, { returnObjects: true }).map((item) => (
                <li key={item} className={styles.item}>
                  <span className={styles.check}>
                    <CheckIcon size={16} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
