import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import { Description, LessonList, Title } from '@components';
import { AppConstants, RouteConstants } from '@constants';
import { ScrollToSectionState } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function LessonsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const groups = AppConstants.LESSON_GROUPS.map((group) => ({
    group,
    lessons: AppConstants.LESSONS.flatMap((lesson, index) =>
      lesson.group === group
        ? [
            {
              videoId: lesson.id,
              title: t(`lessons.items.${index + 1}.title`),
              duration: t(`lessons.items.${index + 1}.duration`),
            },
          ]
        : [],
    ),
  }));

  return (
    <div className={styles.page}>
      <section className={styles.intro}>
        <div className={styles.introContent}>
          <Link
            to={RouteConstants.ROUTES.HOME}
            state={{ scrollTo: AppConstants.SECTION_IDS.lessons } satisfies ScrollToSectionState}
            className={styles.back}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5" />
              <path d="m11 6-6 6 6 6" />
            </svg>
            {t('lessonsPage.back')}
          </Link>
          <Title order={1} className={styles.title}>
            {t('lessonsPage.title')}
          </Title>
          <Description className={styles.description}>{t('lessonsPage.description')}</Description>
        </div>
      </section>

      {groups.map(({ group, lessons }, index) => (
        <section key={group} className={clsx(styles.group, index % 2 === 1 && styles.groupAlt)}>
          <div className={styles.groupContent}>
            <h2 className={styles.groupTitle}>{t(`lessons.groups.${group}`)}</h2>
            <LessonList
              lessons={lessons}
              getPlayLabel={(title) => t('lessons.play', { title })}
              closeLabel={t('lessons.close')}
            />
          </div>
        </section>
      ))}

      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>{t('lessonsPage.ctaTitle')}</h2>
          <p className={styles.ctaDescription}>{t('lessonsPage.ctaDescription')}</p>
          <Button
            size="lg"
            className={styles.ctaAction}
            onClick={() => navigate(RouteConstants.ROUTES.PURCHASE)}
          >
            {t('lessonsPage.ctaAction')}
          </Button>
        </div>
      </section>
    </div>
  );
}

export default LessonsPage;
