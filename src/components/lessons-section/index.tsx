import { useState } from 'react';
import { Modal } from '@mantine/core';
import { Title, Description } from '@components';
import { LessonsSectionProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function LessonsSection({
  id,
  eyebrow,
  title,
  description,
  lessons,
  getPlayLabel,
  closeLabel,
  className,
}: LessonsSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeLesson = activeIndex !== null ? lessons[activeIndex] : null;

  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <Title className={styles.title}>{title}</Title>
          <Description className={styles.description}>{description}</Description>
        </div>

        <ul className={styles.cards}>
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
                    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
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
      </div>

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
    </section>
  );
}

export default LessonsSection;
