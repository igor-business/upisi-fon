import { useNavigate } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { Button } from '@mantine/core';
import { HeroProps } from '@/types/common';
import { AppConstants, RouteConstants } from '@constants';
import { scrollToSection } from '@/utils/scroll';
import styles from './index.module.css';

export function Hero({
  eyebrow,
  description,
  primaryAction,
  secondaryAction,
  imageAlt,
  className,
}: HeroProps) {
  const navigate = useNavigate();

  return (
    <section className={className}>
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
            <Button
              size="lg"
              className={styles.primaryButton}
              onClick={() => navigate(RouteConstants.ROUTES.APP)}
            >
              {primaryAction}
            </Button>
            <Button
              size="lg"
              variant="default"
              className={styles.secondaryButton}
              onClick={() => scrollToSection('section-1')}
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
      </div>
    </section>
  );
}

export default Hero;
