import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, SegmentedControl } from '@mantine/core';
import { Title } from '@components';
import { AppConstants } from '@constants';
import { PricingSectionProps, PricingTier, ProductId } from '@/types/common';
import { formatPrice } from '@/utils/price';
import clsx from 'clsx';
import styles from './index.module.css';

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function PricingSection({ id, onSelect, onSummerSchool, className }: PricingSectionProps) {
  const { t } = useTranslation();
  const [tiers, setTiers] = useState<Record<ProductId, PricingTier>>({
    mockExams: 'individual',
    summerSchool: 'individual',
    fullPrep: 'individual',
  });

  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <Title className={styles.title}>{t('pricing.title')}</Title>
          <p className={styles.description}>{t('pricing.description')}</p>
        </div>

        <ul className={styles.cards}>
          {AppConstants.PRICING_CARD_ORDER.map((productId) => {
            const product = AppConstants.PRODUCTS[productId];
            const availableTiers = AppConstants.TIER_ORDER.filter(
              (tier) => product.prices[tier] !== undefined,
            );
            const tier = tiers[productId];
            const price = product.prices[tier] ?? product.prices.individual;
            const saving = product.prices.individual - price;
            const name = t(`pricing.products.${productId}.name`);

            return (
              <li
                key={productId}
                className={clsx(styles.card, product.recommended && styles.recommended)}
              >
                {product.recommended && (
                  <span className={styles.badge}>{t('pricing.recommended')}</span>
                )}

                <div className={styles.cardHeader}>
                  <h3 className={styles.name}>{name}</h3>
                  <p className={styles.cardDescription}>
                    {t(`pricing.products.${productId}.description`)}
                  </p>
                </div>

                <div className={styles.tierControl}>
                  {availableTiers.length > 1 ? (
                    <SegmentedControl
                      fullWidth
                      radius="md"
                      color="pink"
                      aria-label={t('pricing.tiersLabel', { product: name })}
                      value={tier}
                      onChange={(value) =>
                        setTiers((current) => ({ ...current, [productId]: value as PricingTier }))
                      }
                      data={availableTiers.map((value) => ({
                        value,
                        label: t(`pricing.tiers.${value}`),
                      }))}
                      classNames={{
                        root: styles.segmentRoot,
                        label: styles.segmentLabel,
                      }}
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
                  {saving > 0 && (
                    <p className={styles.saving}>
                      {t('pricing.saving', { amount: formatPrice(saving) })}
                    </p>
                  )}
                </div>

                <ul className={styles.features}>
                  {AppConstants.PRODUCT_FEATURES.map((feature) => {
                    const isIncluded = product.features.includes(feature);
                    return (
                      <li
                        key={feature}
                        className={clsx(styles.feature, !isIncluded && styles.excluded)}
                      >
                        <span className={isIncluded ? styles.check : styles.cross}>
                          {isIncluded ? <CheckIcon /> : <CrossIcon />}
                        </span>
                        <span className={styles.srOnly}>
                          {t(isIncluded ? 'pricing.included' : 'pricing.notIncluded')}{' '}
                        </span>
                        <span>
                          {t(`pricing.features.${feature}`)}
                          {productId === 'fullPrep' &&
                            (feature === 'mockExams' || feature === 'summerSchool') && (
                              <span className={styles.standalonePrice}>
                                {' '}
                                {t('pricing.standalonePrice', {
                                  amount: formatPrice(AppConstants.PRODUCTS[feature].prices.individual),
                                })}
                              </span>
                            )}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <Button
                  size="md"
                  fullWidth
                  className={styles.action}
                  onClick={() => onSelect(productId, tier)}
                >
                  {t(`pricing.products.${productId}.action`)}
                </Button>
              </li>
            );
          })}
        </ul>

        <div className={styles.summer}>
          <div className={styles.summerText}>
            <h3 className={styles.summerTitle}>{t('pricing.summerStrip.title')}</h3>
            <p className={styles.summerDescription}>
              {t('pricing.summerStrip.description', {
                price: formatPrice(AppConstants.PRODUCTS.summerSchool.prices.individual),
              })}
            </p>
          </div>
          <Button variant="outline" size="md" className={styles.summerAction} onClick={onSummerSchool}>
            {t('pricing.summerStrip.action')}
          </Button>
        </div>

      </div>
    </section>
  );
}

export default PricingSection;
