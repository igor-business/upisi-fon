import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@mantine/core';
import type { Lesson } from '@constants';
import { getVideoEmbedUrl, getVideoThumbnail } from '@/utils/youtube';
import { PlayIcon } from '../icons';
import clsx from 'clsx';
import styles from './index.module.css';

export interface LessonListProps {
  lessons: readonly Lesson[];
  /** Shows the lesson group (e.g. "Uvod") above each title. */
  showGroup?: boolean;
  className?: string;
}

/** Grid of video cards; a card opens its lesson in a video dialog. */
export function LessonList({ lessons, showGroup = false, className }: LessonListProps) {
  const { t } = useTranslation();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const activeTitle = activeLesson ? t(`lessons.titles.${activeLesson.videoId}`) : undefined;

  return (
    <>
      <ul className={clsx(styles.cards, className)}>
        {lessons.map((lesson) => {
          const title = t(`lessons.titles.${lesson.videoId}`);
          return (
            <li key={lesson.videoId} className={styles.card}>
              <button
                type="button"
                className={styles.thumbnailButton}
                aria-label={t('lessons.play', { title })}
                onClick={() => setActiveLesson(lesson)}
              >
                <img src={getVideoThumbnail(lesson.videoId)} alt="" loading="lazy" className={styles.thumbnail} />
                <span className={styles.play} aria-hidden="true">
                  <PlayIcon size={22} />
                </span>
                <span className={styles.duration} aria-hidden="true">
                  {lesson.duration}
                </span>
              </button>
              <div className={styles.cardText}>
                {showGroup && <span className={styles.tag}>{t(`lessons.groups.${lesson.group}`)}</span>}
                <h3 className={styles.cardTitle}>{title}</h3>
              </div>
            </li>
          );
        })}
      </ul>

      <Modal
        opened={activeLesson !== null}
        onClose={() => setActiveLesson(null)}
        title={activeTitle}
        size="xl"
        centered
        closeButtonProps={{ 'aria-label': t('lessons.close') }}
      >
        {activeLesson && (
          <div className={styles.player}>
            <iframe
              src={getVideoEmbedUrl(activeLesson.videoId)}
              title={activeTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.iframe}
            />
          </div>
        )}
      </Modal>
    </>
  );
}
