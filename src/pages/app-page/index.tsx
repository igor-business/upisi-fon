import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import { Description, Section, Title } from '@components';
import { IMAGES, ROUTES } from '@constants';
import styles from './index.module.css';

/** Placeholder for the signed-in part of the site. */
export function AppPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <img src={IMAGES.logo} alt={t('appName')} className={styles.logo} />
          <Button variant="default" onClick={() => navigate(ROUTES.HOME)}>
            {t('auth.logout')}
          </Button>
        </div>
      </header>
      <main className={styles.main}>
        <Section contentClassName={styles.content}>
          <Title order={1}>{t('app.title')}</Title>
          <Description>{t('tagline')}</Description>
        </Section>
      </main>
    </div>
  );
}
