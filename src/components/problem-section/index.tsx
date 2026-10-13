import { Title, Description } from '@components';
import { ProblemSectionProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function ProblemSection({ id, title, description, cards, className }: ProblemSectionProps) {
  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <Title className={styles.title}>{title}</Title>
          <Description className={styles.description}>{description}</Description>
        </div>
        <ul className={styles.cards}>
          {cards.map((card, index) => (
            <li key={index} className={styles.card}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ProblemSection;
