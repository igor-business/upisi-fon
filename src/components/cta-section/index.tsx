import { Button } from '@mantine/core';
import { CtaSectionProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function CtaSection({
  id,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: CtaSectionProps) {
  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <Button
          size="lg"
          className={styles.action}
          onClick={onAction}
          rightSection={
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          }
        >
          {actionLabel}
        </Button>
      </div>
    </section>
  );
}

export default CtaSection;
