import { useTranslation } from 'react-i18next';
import { Title, Description, PageContainer } from '@components';

export function HomePage() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Title>{t('home.title')}</Title>
      <Description>{t('home.description')}</Description>
    </PageContainer>
  );
}

export default HomePage;
