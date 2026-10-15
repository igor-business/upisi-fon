import { Button } from '@mantine/core';
import { Title } from '@components';
import { ProgramSectionProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function ProgramSection({
  id,
  title,
  description,
  cards,
  actionLabel,
  onAction,
  className,
}: ProgramSectionProps) {
  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <Title className={styles.title}>{title}</Title>
          <p className={styles.description}>{description}</p>
        </div>

        <ul className={styles.cards}>
          {cards.map((card, index) => (
            <li key={index} className={styles.card}>
              <div className={styles.illustration}>{card.media}</div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <ul className={styles.items}>
                {card.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={styles.item}>
                    <span className={styles.check}>
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <Button size="lg" className={styles.action} onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    </section>
  );
}

export default ProgramSection;
