import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './index.module.css';

export interface TitleProps {
  children: ReactNode;
  /** Heading level: 1 for the page title, 2 (default) for section titles, 3 for smaller headings. */
  order?: 1 | 2 | 3;
  className?: string;
}

/** Page or section title in the shared heading style. */
export function Title({ children, order = 2, className }: TitleProps) {
  const Heading = `h${order}` as const;
  return (
    <Heading className={clsx(styles.title, className)} data-order={order}>
      {children}
    </Heading>
  );
}

/** Part of a title in the brand color, e.g. the final period (used through <Trans components>). */
export function TitleAccent({ children }: { children?: ReactNode }) {
  return <span className={styles.accent}>{children}</span>;
}
