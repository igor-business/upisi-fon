import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { ArrowRightIcon, Description, LessonList, Section, Title } from '@components';
import { FEATURED_LESSONS, LESSONS, ROUTES, SECTION_IDS } from '@constants';
import styles from './index.module.css';

/** A few free lessons, with a link to the page that has all of them. */
export function LessonsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Section id={SECTION_IDS.lessons} tone="tinted" contentClassName={styles.content}>
      <div className={styles.intro}>
        <Title className={styles.title}>{t('lessons.title')}</Title>
        <Description>{t('lessons.description', { count: LESSONS.length })}</Description>
      </div>

      <LessonList lessons={FEATURED_LESSONS} showGroup />

      <div className={styles.actions}>
        <Button size="lg" rightSection={<ArrowRightIcon size={20} />} onClick={() => navigate(ROUTES.LESSONS)}>
          {t('lessons.action', { count: LESSONS.length })}
        </Button>
      </div>
    </Section>
  );
}
