import { Button } from '@mantine/core';
import { Title } from '@components';
import { PricingSectionProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function PricingSection({
  id,
  eyebrow,
  title,
  badge,
  plans,
  note,
  className,
}: PricingSectionProps) {
  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <Title className={styles.title}>{title}</Title>
        </div>

        <ul className={styles.plans}>
          {plans.map((plan, index) => (
            <li
              key={index}
              className={clsx(styles.plan, plan.highlighted && styles.highlighted)}
            >
              {plan.highlighted && <span className={styles.badge}>{badge}</span>}
              <div className={styles.planHeader}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planDescription}>{plan.description}</p>
              </div>
              <div className={styles.priceBlock}>
                <p className={styles.price}>{plan.price}</p>
                <p className={styles.priceNote}>{plan.priceNote}</p>
                {plan.saving && <p className={styles.saving}>{plan.saving}</p>}
              </div>
              <ul className={styles.features}>
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className={styles.feature}>
                    <span className={styles.check} aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 12.5 4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button size="md" fullWidth className={styles.action} onClick={plan.onAction}>
                {plan.actionLabel}
              </Button>
            </li>
          ))}
        </ul>

        <p className={styles.note}>{note}</p>
      </div>
    </section>
  );
}

export default PricingSection;
