import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './index.module.css';

export interface DescriptionProps {
  children: ReactNode;
  className?: string;
}

/** Muted introductory text under a title. */
export function Description({ children, className }: DescriptionProps) {
  return <p className={clsx(styles.description, className)}>{children}</p>;
}
