import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@constants';
import type { ScrollToSectionState } from '@/types';
import { Description } from '../description';
import { ArrowLeftIcon } from '../icons';
import { Section } from '../section';
import { Title } from '../title';
import clsx from 'clsx';
import styles from './index.module.css';

export interface PageHeaderProps {
  /** Label of the link back to the landing page. */
  backLabel: string;
  /** Landing page section the back link returns to. */
  backTo: string;
  title: ReactNode;
  description?: ReactNode;
  /** Class of the content wrapper (e.g. to change the spacing). */
  className?: string;
}

/** Top of a subpage: a link back to the landing page, the page title and an optional description. */
export function PageHeader({ backLabel, backTo, title, description, className }: PageHeaderProps) {
  return (
    <Section contentClassName={clsx(styles.content, className)}>
      <Link
        to={ROUTES.HOME}
        state={{ scrollTo: backTo } satisfies ScrollToSectionState}
        className={styles.back}
      >
        <ArrowLeftIcon size={16} />
        {backLabel}
      </Link>
      <Title order={1}>{title}</Title>
      {description && <Description className={styles.description}>{description}</Description>}
    </Section>
  );
}
