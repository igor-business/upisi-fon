import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import { LessonList, PageHeader, Section, useOrderDialog } from '@components';
import { LESSONS, LESSON_GROUPS, SECTION_IDS } from '@constants';
import styles from './index.module.css';

/** All free lessons, grouped by topic. */
export function LessonsPage() {
  const { t } = useTranslation();
  const { openOrder } = useOrderDialog();

  return (
    <div className={styles.page}>
      <PageHeader
        backLabel={t('lessonsPage.back')}
        backTo={SECTION_IDS.lessons}
        title={t('lessonsPage.title')}
        description={t('lessonsPage.description', { count: LESSONS.length })}
      />

      {LESSON_GROUPS.map((group, index) => (
        // Groups alternate between a pink and a white background, starting with pink.
        <Section key={group} tone={index % 2 === 0 ? 'tinted' : 'light'} contentClassName={styles.group}>
          <h2 className={styles.groupTitle}>{t(`lessons.groups.${group}`)}</h2>
          <LessonList lessons={LESSONS.filter((lesson) => lesson.group === group)} />
        </Section>
      ))}

      <Section tone="dark" contentClassName={styles.cta}>
        <h2 className={styles.ctaTitle}>{t('lessonsPage.ctaTitle')}</h2>
        <p className={styles.ctaDescription}>{t('lessonsPage.ctaDescription')}</p>
        <Button size="lg" className={styles.ctaAction} onClick={() => openOrder('fullPrep')}>
          {t('lessonsPage.ctaAction')}
        </Button>
      </Section>
    </div>
  );
}
