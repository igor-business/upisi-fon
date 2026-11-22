import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { Description, Section, Title } from '@components';
import { IMAGES, IMAGE_SIZES, ROUTES } from '@constants';
import styles from './index.module.css';

/** Shown for every address that does not match a page, inside the usual header and footer. */
export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <Section className={styles.section} contentClassName={styles.content}>
      <div className={styles.copy}>
        <p className={styles.code}>{t('notFound.code')}</p>
        <Title order={1}>{t('notFound.title')}</Title>
        <Description>{t('notFound.description')}</Description>
        <div className={styles.actions}>
          <Button component={Link} to={ROUTES.HOME} size="lg">
            {t('notFound.home')}
          </Button>
          <Button component={Link} to={ROUTES.LESSONS} size="lg" variant="default">
            {t('notFound.lessons')}
          </Button>
        </div>
      </div>
      <img
        src={IMAGES.hero}
        alt=""
        width={IMAGE_SIZES.hero.width}
        height={IMAGE_SIZES.hero.height}
        className={styles.image}
      />
    </Section>
  );
}
