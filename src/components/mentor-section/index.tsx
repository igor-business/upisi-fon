import { Button } from '@mantine/core';
import { Title, Description } from '@components';
import { MentorSectionProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function MentorSection({
  id,
  eyebrow,
  title,
  description,
  items,
  actionLabel,
  onAction,
  media,
  className,
}: MentorSectionProps) {
  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <Title className={styles.title}>{title}</Title>
          <Description className={styles.description}>{description}</Description>
          <ul className={styles.card}>
            {items.map((item, index) => (
              <li key={index} className={styles.item}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDescription}>{item.description}</p>
              </li>
            ))}
          </ul>
          <Button size="lg" className={styles.action} onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
        <div className={styles.media}>
          {media ?? <div className={styles.placeholder} aria-hidden="true" />}
        </div>
      </div>
    </section>
  );
}

export default MentorSection;
