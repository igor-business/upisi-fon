import { Button } from '@mantine/core';
import { Title, Description, LessonList } from '@components';
import { LessonsSectionProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function LessonsSection({
  id,
  title,
  description,
  lessons,
  getPlayLabel,
  closeLabel,
  actionLabel,
  onAction,
  className,
}: LessonsSectionProps) {
  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <Title className={styles.title}>{title}</Title>
          <Description className={styles.description}>{description}</Description>
        </div>

        <LessonList lessons={lessons} getPlayLabel={getPlayLabel} closeLabel={closeLabel} />

        <Button size="lg" variant="default" className={styles.action} onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    </section>
  );
}

export default LessonsSection;
