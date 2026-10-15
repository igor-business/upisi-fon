import { Button } from '@mantine/core';
import { Title } from '@components';
import { ProcessSectionProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function ProcessSection({
  id,
  eyebrow,
  title,
  steps,
  actionLabel,
  onAction,
  className,
}: ProcessSectionProps) {
  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <Title className={styles.title}>{title}</Title>
        </div>
        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={index} className={styles.step}>
              <div className={styles.marker}>
                <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className={styles.text}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <Button size="lg" className={styles.action} onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    </section>
  );
}

export default ProcessSection;
