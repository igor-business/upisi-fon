import { FormEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ActionIcon, Button, SegmentedControl, TextInput } from '@mantine/core';
import { AppConstants, RouteConstants } from '@constants';
import { OrderStudent, PricingTier, ProductId, ScrollToSectionState } from '@/types/common';
import { submitOrder } from '@/services/order';
import { formatPrice } from '@/utils/price';
import { EMAIL_PATTERN, PHONE_PATTERN, normalizePhone } from '@/utils/validation';
import clsx from 'clsx';
import styles from './index.module.css';

type Field = keyof OrderStudent;

interface StudentForm extends OrderStudent {
  /** Stable key for React lists and input ids. */
  key: number;
}

type StudentErrors = Partial<Record<Field, string>>;

type Status = 'idle' | 'submitting' | 'success' | 'error';

const range = (count: number) => Array.from({ length: count }, (_, i) => i + 1);

/** Reads the product from the URL (?program=...), falling back to the full preparation. */
function parseProduct(slug: string | null): ProductId {
  const match = (Object.keys(AppConstants.PRODUCT_SLUGS) as ProductId[]).find(
    (id) => AppConstants.PRODUCT_SLUGS[id] === slug,
  );
  return match ?? 'fullPrep';
}

/** Reads the tier from the URL (?nacin=...), falling back to individual if the product lacks it. */
function parseTier(slug: string | null, product: ProductId): PricingTier {
  const match = AppConstants.TIER_ORDER.find((tier) => AppConstants.TIER_SLUGS[tier] === slug);
  return match && AppConstants.PRODUCTS[product].prices[match] !== undefined ? match : 'individual';
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function PurchasePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const nextKey = useRef(0);

  const product = parseProduct(searchParams.get('program'));
  const tier = parseTier(searchParams.get('nacin'), product);
  const config = AppConstants.PRODUCTS[product];
  const availableTiers = AppConstants.TIER_ORDER.filter((value) => config.prices[value] !== undefined);
  const limits = AppConstants.TIER_STUDENT_LIMITS[tier];

  const createStudent = (): StudentForm => ({ key: nextKey.current++, name: '', phone: '', email: '' });

  const [students, setStudents] = useState<StudentForm[]>(() =>
    Array.from({ length: limits.min }, createStudent),
  );
  const [promoCode, setPromoCode] = useState('');
  const [errors, setErrors] = useState<Record<number, StudentErrors>>({});
  const [status, setStatus] = useState<Status>('idle');

  const pricePerPerson = config.prices[tier] ?? config.prices.individual;
  const total = pricePerPerson * students.length;
  const productName = t(`pricing.products.${product}.name`);

  // The page is opened from the middle of the landing page, so always start at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Keep the number of students within the limits of the selected tier.
  useEffect(() => {
    setStudents((current) => {
      if (current.length >= limits.min && current.length <= limits.max) {
        return current;
      }
      const trimmed = current.slice(0, limits.max);
      const missing = Math.max(0, limits.min - trimmed.length);
      return [...trimmed, ...Array.from({ length: missing }, createStudent)];
    });
    // createStudent only reads a ref, so it is safe to leave it out.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limits.min, limits.max]);

  const updateSelection = (nextProduct: ProductId, nextTier: PricingTier) => {
    const validTier =
      AppConstants.PRODUCTS[nextProduct].prices[nextTier] !== undefined ? nextTier : 'individual';
    setSearchParams(
      { program: AppConstants.PRODUCT_SLUGS[nextProduct], nacin: AppConstants.TIER_SLUGS[validTier] },
      { replace: true },
    );
    setErrors({});
  };

  const backToPricing = () =>
    navigate(RouteConstants.ROUTES.HOME, {
      state: { scrollTo: AppConstants.PRICING_SECTION_ID } satisfies ScrollToSectionState,
    });

  const updateStudent = (key: number, field: Field, value: string) => {
    setStudents((current) => current.map((s) => (s.key === key ? { ...s, [field]: value } : s)));
    setErrors((current) => {
      if (!current[key]?.[field]) return current;
      const next = { ...current, [key]: { ...current[key] } };
      delete next[key][field];
      return next;
    });
  };

  const addStudent = () => setStudents((current) => [...current, createStudent()]);

  const removeStudent = (key: number) => {
    setStudents((current) => current.filter((s) => s.key !== key));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const validate = (): Record<number, StudentErrors> => {
    const result: Record<number, StudentErrors> = {};
    const seenEmails = new Set<string>();

    for (const student of students) {
      const studentErrors: StudentErrors = {};
      const phone = normalizePhone(student.phone);
      const email = student.email.trim().toLowerCase();

      if (student.name.trim().split(/\s+/).filter(Boolean).length < 2) {
        studentErrors.name = t('purchase.errors.name');
      }
      if (!PHONE_PATTERN.test(phone)) {
        studentErrors.phone = t('purchase.errors.phone');
      }
      if (!EMAIL_PATTERN.test(email)) {
        studentErrors.email = t('purchase.errors.email');
      } else if (seenEmails.has(email)) {
        studentErrors.email = t('purchase.errors.emailDuplicate');
      }
      seenEmails.add(email);

      if (Object.keys(studentErrors).length > 0) {
        result[student.key] = studentErrors;
      }
    }
    return result;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    const firstInvalid = students.find((s) => validationErrors[s.key]);
    if (firstInvalid) {
      const field = (['name', 'phone', 'email'] as const).find(
        (f) => validationErrors[firstInvalid.key]?.[f],
      );
      document.getElementById(`student-${firstInvalid.key}-${field}`)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      await submitOrder({
        product,
        tier,
        pricePerPerson,
        total,
        students: students.map(({ name, phone, email }) => ({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
        })),
        promoCode: promoCode.trim() || undefined,
      });
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to={RouteConstants.ROUTES.HOME} aria-label={t('purchase.page.homeLink')}>
            <img src={AppConstants.IMAGES.logo} alt={t('appName')} className={styles.logo} />
          </Link>
          <button type="button" className={styles.backLink} onClick={backToPricing}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5" />
              <path d="m11 6-6 6 6 6" />
            </svg>
            {t('purchase.page.back')}
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {status === 'success' ? (
          <div className={styles.success} role="status">
            <span className={styles.successIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            <h1 className={styles.successTitle}>{t('purchase.success.title')}</h1>
            <p className={styles.successText}>{t('purchase.success.description')}</p>
            <Button
              size="lg"
              className={styles.submit}
              onClick={() => navigate(RouteConstants.ROUTES.HOME)}
            >
              {t('purchase.success.action')}
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.intro}>
              <p className={styles.eyebrow}>{t('purchase.page.eyebrow')}</p>
              <h1 className={styles.title}>{t('purchase.page.title')}</h1>
              <p className={styles.description}>{t('purchase.page.description')}</p>
            </div>

            <div className={styles.layout}>
              {/* ---------- Order summary ---------- */}
              <aside className={styles.summary} aria-label={t('purchase.summaryTitle')}>
                <h2 className={styles.summaryTitle}>{t('purchase.summaryTitle')}</h2>

                <fieldset className={styles.products}>
                  <legend className={styles.label}>{t('purchase.programLabel')}</legend>
                  {[...AppConstants.PRODUCT_ORDER].reverse().map((id) => (
                    <label
                      key={id}
                      className={clsx(styles.productOption, id === product && styles.productActive)}
                    >
                      <input
                        type="radio"
                        name="product"
                        className={styles.radio}
                        checked={id === product}
                        onChange={() => updateSelection(id, tier)}
                      />
                      <span className={styles.productName}>
                        {t(`pricing.products.${id}.name`)}
                        {AppConstants.PRODUCTS[id].recommended && (
                          <span className={styles.recommendedTag}>{t('pricing.recommended')}</span>
                        )}
                      </span>
                      <span className={styles.productPrice}>
                        {t('purchase.from', {
                          price: formatPrice(
                            Math.min(
                              ...Object.values(AppConstants.PRODUCTS[id].prices).filter(
                                (v): v is number => v !== undefined,
                              ),
                            ),
                          ),
                        })}
                      </span>
                    </label>
                  ))}
                </fieldset>

                <div className={styles.tierField}>
                  <p className={styles.label} id="purchase-tier-label">
                    {t('purchase.tierLabel')}
                  </p>
                  {availableTiers.length > 1 ? (
                    <SegmentedControl
                      fullWidth
                      radius="md"
                      color="pink"
                      aria-labelledby="purchase-tier-label"
                      value={tier}
                      onChange={(value) => updateSelection(product, value as PricingTier)}
                      data={availableTiers.map((value) => ({
                        value,
                        label: t(`pricing.tiers.${value}`),
                      }))}
                    />
                  ) : (
                    <p className={styles.individualOnly}>{t('pricing.individualOnly')}</p>
                  )}
                  <p className={styles.tierHint}>{t(`pricing.tierHints.${tier}`)}</p>
                </div>

                <div className={styles.includes}>
                  <p className={styles.label}>{t('purchase.includes')}</p>
                  <ul className={styles.includesList}>
                    {product === 'summerSchool'
                      ? range(AppConstants.SUMMER_SCHOOL_HIGHLIGHTS_COUNT).map((n) => (
                          <li key={n}>
                            <span className={styles.check}>
                              <CheckIcon />
                            </span>
                            {t(`pricing.summerSchool.${n}.title`)}
                          </li>
                        ))
                      : config.features.map((feature) => (
                          <li key={feature}>
                            <span className={styles.check}>
                              <CheckIcon />
                            </span>
                            {t(`pricing.features.${feature}`)}
                          </li>
                        ))}
                  </ul>
                </div>

                <dl className={styles.totals}>
                  <div>
                    <dt>{t('purchase.pricePerPerson')}</dt>
                    <dd>
                      {formatPrice(pricePerPerson)} {t('pricing.currency')}
                    </dd>
                  </div>
                  <div>
                    <dt>{t('purchase.studentsCount')}</dt>
                    <dd>{students.length}</dd>
                  </div>
                  <div className={styles.totalRow}>
                    <dt>{t('purchase.total')}</dt>
                    <dd aria-live="polite">
                      {formatPrice(total)} {t('pricing.currency')}
                    </dd>
                  </div>
                </dl>
              </aside>

              {/* ---------- Form ---------- */}
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
                aria-label={t('purchase.formTitle')}
              >
                <h2 className={styles.formTitle}>
                  {t('purchase.formTitle')} – {productName}
                </h2>

                <div className={styles.students}>
                  {students.map((student, index) => {
                    const studentErrors = errors[student.key] ?? {};
                    const removable = index >= limits.min;
                    return (
                      <fieldset key={student.key} className={styles.student}>
                        <legend className={styles.studentHeader}>
                          <span className={styles.studentNumber} aria-hidden="true">
                            {index + 1}
                          </span>
                          <span className={styles.studentTitle}>
                            {tier === 'individual'
                              ? t('purchase.individualHeading')
                              : t('purchase.studentHeading', { number: index + 1 })}
                          </span>
                          {removable && (
                            <ActionIcon
                              variant="subtle"
                              color="gray"
                              className={styles.remove}
                              aria-label={t('purchase.removeStudent', { number: index + 1 })}
                              onClick={() => removeStudent(student.key)}
                            >
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                                <path d="M6 6l12 12M18 6 6 18" />
                              </svg>
                            </ActionIcon>
                          )}
                        </legend>
                        <div className={styles.fields}>
                          <TextInput
                            id={`student-${student.key}-name`}
                            className={styles.fullWidth}
                            size="md"
                            label={t('purchase.fields.name')}
                            placeholder={t('purchase.placeholders.name')}
                            autoComplete={index === 0 ? 'name' : 'off'}
                            withAsterisk
                            value={student.name}
                            error={studentErrors.name}
                            onChange={(e) => updateStudent(student.key, 'name', e.currentTarget.value)}
                          />
                          <TextInput
                            id={`student-${student.key}-phone`}
                            type="tel"
                            inputMode="tel"
                            size="md"
                            label={t('purchase.fields.phone')}
                            placeholder={t('purchase.placeholders.phone')}
                            autoComplete={index === 0 ? 'tel' : 'off'}
                            withAsterisk
                            value={student.phone}
                            error={studentErrors.phone}
                            onChange={(e) => updateStudent(student.key, 'phone', e.currentTarget.value)}
                          />
                          <TextInput
                            id={`student-${student.key}-email`}
                            type="email"
                            inputMode="email"
                            size="md"
                            label={t('purchase.fields.email')}
                            placeholder={t('purchase.placeholders.email')}
                            autoComplete={index === 0 ? 'email' : 'off'}
                            withAsterisk
                            value={student.email}
                            error={studentErrors.email}
                            onChange={(e) => updateStudent(student.key, 'email', e.currentTarget.value)}
                          />
                        </div>
                      </fieldset>
                    );
                  })}

                  {students.length < limits.max ? (
                    tier !== 'individual' && (
                      <button type="button" className={styles.addStudent} onClick={addStudent}>
                        <span className={styles.addIcon} aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                        {t('purchase.addStudent')}
                      </button>
                    )
                  ) : (
                    tier === 'group3' && (
                      <p className={styles.maxNote}>
                        {t('purchase.maxStudents')}{' '}
                        <button
                          type="button"
                          className={styles.linkButton}
                          onClick={() => updateSelection(product, 'group5')}
                        >
                          {t('purchase.switchToGroup5')}
                        </button>
                      </p>
                    )
                  )}
                </div>

                <TextInput
                  size="md"
                  label={t('purchase.fields.promo')}
                  description={t('purchase.promoHint')}
                  placeholder={t('purchase.placeholders.promo')}
                  autoComplete="off"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.currentTarget.value)}
                />

                <p className={styles.paymentNote}>{t('purchase.paymentNote')}</p>

                {status === 'error' && (
                  <p className={styles.submitError} role="alert">
                    {t('purchase.errors.submit')}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  className={styles.submit}
                  loading={status === 'submitting'}
                >
                  {t('purchase.submit')} · {formatPrice(total)} {t('pricing.currency')}
                </Button>
              </form>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default PurchasePage;
