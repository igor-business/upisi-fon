import { useState } from 'react';
import { Modal } from '@mantine/core';
import { LessonListProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function LessonList({ lessons, getPlayLabel, closeLabel, className }: LessonListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeLesson = activeIndex !== null ? lessons[activeIndex] : null;

  return (
    <>
      <ul className={clsx(styles.cards, className)}>
        {lessons.map((lesson, index) => (
          <li key={lesson.videoId} className={styles.card}>
            <button
              type="button"
              className={styles.thumbnailButton}
              aria-label={getPlayLabel(lesson.title)}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={`https://i.ytimg.com/vi/${lesson.videoId}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                className={styles.thumbnail}
              />
              <span className={styles.play} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <polygon points="8.3,5 8.3,19 19.3,12" strokeLinejoin="round" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            </button>
            <div className={styles.cardText}>
              <h3 className={styles.cardTitle}>{lesson.title}</h3>
              <p className={styles.duration}>{lesson.duration}</p>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        opened={activeLesson !== null}
        onClose={() => setActiveIndex(null)}
        title={activeLesson?.title}
        size="xl"
        centered
        closeButtonProps={{ 'aria-label': closeLabel }}
      >
        {activeLesson && (
          <div className={styles.player}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeLesson.videoId}?autoplay=1&rel=0`}
              title={activeLesson.title}
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

export default LessonList;
