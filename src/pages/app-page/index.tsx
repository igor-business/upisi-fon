import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import { PageContainer, Title, Description } from '@components';
import { AppConstants, RouteConstants } from '@constants';
import styles from './index.module.css';

export function AppPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <img
            src={AppConstants.IMAGES.logo}
            alt={t('appName')}
            className={styles.logo}
          />
          <Button variant="default" onClick={() => navigate(RouteConstants.ROUTES.HOME)}>
            {t('auth.logout')}
          </Button>
        </div>
      </header>
      <main className={styles.main}>
        <PageContainer>
          <Title order={1}>{t('app.title')}</Title>
          <Description>{t('tagline')}</Description>
        </PageContainer>
      </main>
    </div>
  );
}

export default AppPage;
