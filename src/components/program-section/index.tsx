import { Button } from '@mantine/core';
import { Title, Description } from '@components';
import { ProgramSectionProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function ProgramSection({
  id,
  eyebrow,
  title,
  description,
  items,
  actionLabel,
  onAction,
  media,
  className,
}: ProgramSectionProps) {
  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <Title className={styles.title}>{title}</Title>
          <Description className={styles.description}>{description}</Description>
          <ul className={styles.list}>
            {items.map((item, index) => (
              <li key={index} className={styles.item}>
                <span className={styles.check} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Button size="lg" className={styles.action} onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
        <div className={styles.media}>{media ?? <div className={styles.placeholder} aria-hidden="true" />}</div>
      </div>
    </section>
  );
}

export default ProgramSection;
