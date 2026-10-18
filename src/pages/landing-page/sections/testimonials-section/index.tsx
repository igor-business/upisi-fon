import { useTranslation } from 'react-i18next';
import { Section, Title } from '@components';
import { SECTION_IDS } from '@constants';
import styles from './index.module.css';

/** What former students say about the preparation. */
export function TestimonialsSection() {
  const { t } = useTranslation();

  return (
    <Section id={SECTION_IDS.results} tone="dark" contentClassName={styles.content}>
      <Title className={styles.title}>{t('testimonials.title')}</Title>

      <ul className={styles.cards}>
        {t('testimonials.items', { returnObjects: true }).map((item) => (
          <li key={item.name} className={styles.card}>
            <blockquote className={styles.quote}>„{item.quote}”</blockquote>
            <div>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.meta}>{item.meta}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
