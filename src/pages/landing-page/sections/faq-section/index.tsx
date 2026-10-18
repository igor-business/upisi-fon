import { useTranslation } from 'react-i18next';
import { Accordion } from '@mantine/core';
import { Section, Title } from '@components';
import { SECTION_IDS } from '@constants';
import styles from './index.module.css';

/** Frequently asked questions as an accordion. */
export function FaqSection() {
  const { t } = useTranslation();

  return (
    <Section id={SECTION_IDS.faq} contentClassName={styles.content}>
      <div className={styles.intro}>
        <Title>{t('faq.title')}</Title>
        <p className={styles.note}>{t('faq.note')}</p>
      </div>

      <Accordion
        chevronPosition="right"
        radius="lg"
        classNames={{ root: styles.accordion, item: styles.item, content: styles.answer }}
      >
        {t('faq.items', { returnObjects: true }).map((item) => (
          <Accordion.Item key={item.question} value={item.question}>
            <Accordion.Control>{item.question}</Accordion.Control>
            <Accordion.Panel>{item.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Section>
  );
}
