import { useTranslation } from 'react-i18next';
import { Title, Description, PageContainer } from '@components';

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Title>{t('about.title')}</Title>
      <Description>{t('about.description')}</Description>
    </PageContainer>
  );
}

export default AboutPage;
