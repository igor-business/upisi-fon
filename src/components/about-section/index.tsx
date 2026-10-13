import { Button } from '@mantine/core';
import { Title, Description } from '@components';
import { AboutSectionProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function AboutSection({
  id,
  eyebrow,
  title,
  description,
  actionLabel,
  onAction,
  media,
  partnerLogo,
  stats,
  className,
}: AboutSectionProps) {
  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <Title className={styles.title}>{title}</Title>
            <Description className={styles.description}>{description}</Description>
            <Button size="lg" className={styles.action} onClick={onAction}>
              {actionLabel}
            </Button>
          </div>
          <div className={styles.media}>
            {media ?? <div className={styles.placeholder} aria-hidden="true" />}
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.logo}>{partnerLogo}</div>
          <dl className={styles.stats}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.stat}>
                <dt className={styles.statValue}>{stat.value}</dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
