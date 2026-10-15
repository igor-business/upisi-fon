import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import { Description, Title } from '@components';
import { useGoToSection } from '@/hooks/use-go-to-section';
import { AppConstants, RouteConstants } from '@constants';
import { ScrollToSectionState } from '@/types/common';
import { formatPrice } from '@/utils/price';
import styles from './index.module.css';

const GROUP_ITEM_COUNTS = [3, 3, 4] as const;

export function SummerSchoolPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToSection = useGoToSection();

  const requestSummerSchool = () => {
    const params = new URLSearchParams({
      program: AppConstants.PRODUCT_SLUGS.summerSchool,
      nacin: AppConstants.TIER_SLUGS.individual,
    });
    navigate(`${RouteConstants.ROUTES.PURCHASE}?${params.toString()}`);
  };

  return (
    <div className={styles.page}>
      <section className={styles.intro}>
        <div className={styles.introContent}>
          <Link
            to={RouteConstants.ROUTES.HOME}
            state={{ scrollTo: AppConstants.SECTION_IDS.pricing } satisfies ScrollToSectionState}
            className={styles.back}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5" />
              <path d="m11 6-6 6 6 6" />
            </svg>
            {t('summerSchoolPage.back')}
          </Link>
          <Title order={1} className={styles.title}>
            {t('summerSchoolPage.title')}
          </Title>
          <p className={styles.subtitle}>{t('summerSchoolPage.subtitle')}</p>
          <Description className={styles.description}>
            {t('summerSchoolPage.description')}
          </Description>
        </div>
      </section>

      <section className={styles.about}>
        <div className={styles.aboutContent}>
          <h2 className={styles.heading}>{t('summerSchoolPage.aboutTitle')}</h2>
          <div className={styles.aboutText}>
            <p>{t('summerSchoolPage.about.1')}</p>
            <p>{t('summerSchoolPage.about.2')}</p>
          </div>
        </div>
      </section>

      <section className={styles.offer}>
        <div className={styles.offerContent}>
          <h2 className={styles.heading}>{t('summerSchoolPage.offerTitle')}</h2>
          <ul className={styles.groups}>
            {GROUP_ITEM_COUNTS.map((count, groupIndex) => (
              <li key={groupIndex} className={styles.group}>
                <h3 className={styles.groupTitle}>
                  {t(`summerSchoolPage.groups.${groupIndex + 1}.title`)}
                </h3>
                <ul className={styles.items}>
                  {Array.from({ length: count }, (_, i) => (
                    <li key={i} className={styles.item}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m5 12.5 4.5 4.5L19 7.5" />
                      </svg>
                      <span>{t(`summerSchoolPage.groups.${groupIndex + 1}.items.${i + 1}`)}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <div className={styles.ctaText}>
            <p className={styles.priceLabel}>{t('summerSchoolPage.priceLabel')}</p>
            <p className={styles.price}>
              {formatPrice(AppConstants.PRODUCTS.summerSchool.prices.individual)}{' '}
              <span className={styles.currency}>{t('pricing.currency')}</span>
            </p>
            <p className={styles.priceNote}>{t('summerSchoolPage.priceNote')}</p>
          </div>
          <Button size="lg" className={styles.ctaAction} onClick={requestSummerSchool}>
            {t('summerSchoolPage.action')}
          </Button>
        </div>
        <div className={styles.questions}>
          <p>{t('summerSchoolPage.questionsTitle')}</p>
          <button
            type="button"
            className={styles.questionsLink}
            onClick={() => goToSection(AppConstants.SECTION_IDS.contact)}
          >
            {t('summerSchoolPage.questionsAction')}
          </button>
        </div>
      </section>
    </div>
  );
}

export default SummerSchoolPage;
