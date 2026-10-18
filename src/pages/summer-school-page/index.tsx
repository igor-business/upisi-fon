import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import { CheckIcon, PageHeader, Section, useOrderDialog } from '@components';
import { PRODUCTS, SECTION_IDS } from '@constants';
import { formatPrice } from '@/utils/pricing';
import styles from './index.module.css';

/** Summer School: what it is, what it offers and its price. */
export function SummerSchoolPage() {
  const { t } = useTranslation();
  const { openOrder } = useOrderDialog();

  return (
    <div className={styles.page}>
      <PageHeader
        backLabel={t('summerSchoolPage.back')}
        backTo={SECTION_IDS.pricing}
        title={t('summerSchoolPage.title')}
        className={styles.header}
      />

      <Section tone="dark" contentClassName={styles.about}>
        <h2 className={styles.heading}>{t('summerSchoolPage.aboutTitle')}</h2>
        <div className={styles.aboutText}>
          {t('summerSchoolPage.about', { returnObjects: true }).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section>
        <div className={styles.offer}>
          <h2 className={styles.heading}>{t('summerSchoolPage.offerTitle')}</h2>
          <ul className={styles.groups}>
            {t('summerSchoolPage.groups', { returnObjects: true }).map((group, index) => (
              <li key={group.title} className={styles.group}>
                <span className={styles.groupNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className={styles.groupTitle}>{group.title}</h3>
                <ul className={styles.items}>
                  {group.items.map((item) => (
                    <li key={item} className={styles.item}>
                      <CheckIcon size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="tinted" contentClassName={styles.cta}>
        <div className={styles.ctaText}>
          <p className={styles.priceLabel}>{t('summerSchoolPage.priceLabel')}</p>
          <p className={styles.price}>
            {formatPrice(PRODUCTS.summerSchool.prices.individual)}{' '}
            <span className={styles.currency}>{t('pricing.currency')}</span>
          </p>
          <p className={styles.priceNote}>{t('summerSchoolPage.priceNote')}</p>
        </div>
        <Button size="lg" className={styles.ctaAction} onClick={() => openOrder('summerSchool')}>
          {t('summerSchoolPage.action')}
        </Button>
      </Section>
    </div>
  );
}
