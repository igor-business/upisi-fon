import { Button } from '@mantine/core';
import { Title } from '@components';
import { FeaturesSectionProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function FeaturesSection({
  id,
  title,
  cards,
  actionLabel,
  onAction,
  className,
}: FeaturesSectionProps) {
  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <Title className={styles.title}>{title}</Title>
        <ul className={styles.cards}>
          {cards.map((card, index) => (
            <li key={index} className={styles.card}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
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

export default FeaturesSection;
