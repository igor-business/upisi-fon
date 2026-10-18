import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, SegmentedControl } from '@mantine/core';
import { CheckIcon, CloseIcon, Section, Title, useOrderDialog } from '@components';
import { PRICING_CARDS, PRODUCTS, PRODUCT_FEATURES, ROUTES, SECTION_IDS } from '@constants';
import type { PricingTier, ProductFeature, ProductId } from '@/types';
import { formatPrice, getAvailableTiers, getPrice } from '@/utils/pricing';
import clsx from 'clsx';
import styles from './index.module.css';

type PricingCardProduct = (typeof PRICING_CARDS)[number];

/** Whether a feature is also sold as a product of its own. */
const isProduct = (feature: ProductFeature): feature is ProductFeature & ProductId => feature in PRODUCTS;

function PricingCard({ product }: { product: PricingCardProduct }) {
  const { t } = useTranslation();
  const { openOrder } = useOrderDialog();
  const [tier, setTier] = useState<PricingTier>('individual');
  const { features, prices, recommended } = PRODUCTS[product];
  const availableTiers = getAvailableTiers(product);
  const price = getPrice(product, tier);
  const saving = prices.individual - price;
  const name = t(`pricing.products.${product}.name`);

  return (
    <li className={clsx(styles.card, recommended && styles.recommended)}>
      {recommended && <span className={styles.badge}>{t('pricing.recommended')}</span>}

      <div className={styles.cardHeader}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.cardDescription}>{t(`pricing.products.${product}.description`)}</p>
      </div>

      <div className={styles.tierControl}>
        {availableTiers.length > 1 ? (
          <SegmentedControl
            fullWidth
            withItemsBorders={false}
            radius="md"
            color="pink"
            aria-label={t('pricing.tiersLabel', { product: name })}
            value={tier}
            onChange={(value) => setTier(value as PricingTier)}
            data={availableTiers.map((value) => ({ value, label: t(`pricing.tiers.${value}`) }))}
            classNames={{ root: styles.segmentRoot, label: styles.segmentLabel }}
          />
        ) : (
          <p className={styles.individualOnly}>{t('pricing.individualOnly')}</p>
        )}
      </div>

      <div className={styles.priceBlock} aria-live="polite">
        <p className={styles.price}>
          <span className={styles.amount}>{formatPrice(price)}</span>
          <span className={styles.currency}>{t('pricing.currency')}</span>
        </p>
        <p className={styles.tierHint}>{t(`pricing.tierHints.${tier}`)}</p>
        {saving > 0 && <p className={styles.saving}>{t('pricing.saving', { amount: formatPrice(saving) })}</p>}
      </div>

      <ul className={styles.features}>
        {PRODUCT_FEATURES.map((feature) => {
          const isIncluded = features.includes(feature);
          // A bundled feature that is also sold on its own shows its separate price.
          const standalone = isIncluded && feature !== product && isProduct(feature) ? feature : null;
          return (
            <li key={feature} className={clsx(styles.feature, !isIncluded && styles.excluded)}>
              <span className={isIncluded ? styles.check : styles.cross}>
                {isIncluded ? <CheckIcon size={12} strokeWidth={3.5} /> : <CloseIcon size={10} strokeWidth={3.5} />}
              </span>
              <span className={styles.srOnly}>{t(isIncluded ? 'pricing.included' : 'pricing.notIncluded')} </span>
              <span>
                {t(`pricing.features.${feature}`)}
                {standalone && (
                  <span className={styles.standalonePrice}>
                    {' '}
                    {t('pricing.standalonePrice', {
                      amount: formatPrice(PRODUCTS[standalone].prices.individual),
                    })}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      <Button size="md" fullWidth className={styles.action} onClick={() => openOrder(product, tier)}>
        {t(`pricing.products.${product}.action`)}
      </Button>
    </li>
  );
}

/** Pricing cards with a tier switch, plus a strip that leads to the Summer School page. */
export function PricingSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Section id={SECTION_IDS.pricing} tone="tinted" contentClassName={styles.content}>
      <div className={styles.intro}>
        <Title>{t('pricing.title')}</Title>
        <p className={styles.description}>{t('pricing.description')}</p>
      </div>

      <ul className={styles.cards}>
        {PRICING_CARDS.map((product) => (
          <PricingCard key={product} product={product} />
        ))}
      </ul>

      <div className={styles.summer}>
        <div className={styles.summerText}>
          <h3 className={styles.summerTitle}>{t('pricing.summerStrip.title')}</h3>
          <p className={styles.summerDescription}>{t('pricing.summerStrip.description')}</p>
        </div>
        <Button
          variant="outline"
          size="md"
          className={styles.summerAction}
          onClick={() => navigate(ROUTES.SUMMER_SCHOOL)}
        >
          {t('pricing.summerStrip.action')}
        </Button>
      </div>
    </Section>
  );
}
