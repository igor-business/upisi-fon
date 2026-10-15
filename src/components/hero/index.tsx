import { Trans } from 'react-i18next';
import { Button } from '@mantine/core';
import { HeroProps } from '@/types/common';
import { AppConstants } from '@constants';
import clsx from 'clsx';
import styles from './index.module.css';

export function Hero({
  eyebrow,
  description,
  primaryAction,
  onPrimaryAction,
  secondaryAction,
  onSecondaryAction,
  stats,
  imageAlt,
  className,
}: HeroProps) {
  return (
    <section className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>
            <Trans
              i18nKey="hero.title"
              components={{ 1: <mark className={styles.titleHighlight} /> }}
            />
          </h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.actions}>
            <Button size="lg" className={styles.primaryButton} onClick={onPrimaryAction}>
              {primaryAction}
            </Button>
            <Button
              size="lg"
              variant="default"
              className={styles.secondaryButton}
              onClick={onSecondaryAction}
            >
              {secondaryAction}
            </Button>
          </div>
        </div>
        <div className={styles.visual}>
          <img
            src={AppConstants.IMAGES.hero}
            alt={imageAlt}
            width={AppConstants.HERO_IMAGE_SIZE.width}
            height={AppConstants.HERO_IMAGE_SIZE.height}
            fetchPriority="high"
            className={styles.heroImage}
          />
        </div>
        <dl className={styles.stats}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.stat}>
              <dt className={styles.statValue}>{stat.value}</dt>
              <dd className={styles.statLabel}>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default Hero;
