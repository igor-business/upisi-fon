import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './index.module.css';

/** Background of a section: white, light pink or dark purple. */
export type SectionTone = 'light' | 'tinted' | 'dark';

export interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  /** Background of the section. */
  tone?: SectionTone;
  /** Class of the inner, width-limited content wrapper. */
  contentClassName?: string;
  /** Decorative elements placed in the full-width band, outside the content wrapper. */
  decoration?: ReactNode;
}

/** A full-width page band with centered, width-limited content and the standard vertical padding. */
export function Section({
  tone = 'light',
  className,
  contentClassName,
  decoration,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={clsx(styles.section, className)} data-tone={tone} {...props}>
      {decoration}
      <div className={clsx(styles.content, contentClassName)}>{children}</div>
    </section>
  );
}
