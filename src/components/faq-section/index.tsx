import { Accordion } from '@mantine/core';
import { Title } from '@components';
import { FaqSectionProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function FaqSection({ id, title, items, className }: FaqSectionProps) {
  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <Title className={styles.title}>{title}</Title>
        </div>
        <Accordion
          chevronPosition="right"
          radius="lg"
          classNames={{
            root: styles.accordion,
            item: styles.item,
            control: styles.control,
            label: styles.label,
            content: styles.answer,
          }}
        >
          {items.map((item, index) => (
            <Accordion.Item key={index} value={String(index + 1)}>
              <Accordion.Control>{item.question}</Accordion.Control>
              <Accordion.Panel>{item.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default FaqSection;
