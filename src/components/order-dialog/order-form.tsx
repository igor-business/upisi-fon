import { useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Button, SegmentedControl, TextInput } from '@mantine/core';
import { TIER_STUDENT_LIMITS } from '@constants';
import { submitOrder } from '@/services/order';
import type { OrderStudent, PricingTier } from '@/types';
import { formatPrice, getAvailableTiers, getPrice } from '@/utils/pricing';
import { CheckIcon, CloseIcon, PlusIcon } from '../icons';
import type { OrderSelection } from './context';
import { STUDENT_FIELDS, validateStudents, type StudentErrors, type StudentField } from './validate-students';
import styles from './index.module.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface StudentForm extends OrderStudent {
  /** Stable key for React lists and input ids. */
  key: number;
}

/** Autocomplete hints and input types of the student fields. */
const FIELD_INPUTS: Record<StudentField, { autoComplete: string; type?: string; inputMode?: 'tel' | 'email' }> = {
  name: { autoComplete: 'name' },
  phone: { autoComplete: 'tel', type: 'tel', inputMode: 'tel' },
  email: { autoComplete: 'email', type: 'email', inputMode: 'email' },
};

const getInputId = (studentKey: number, field: StudentField) => `student-${studentKey}-${field}`;

interface OrderFormProps {
  selection: OrderSelection;
  /** Called when the user closes the confirmation after sending. */
  onDone: () => void;
}

/** Application form: tier switch, contact details of every student, promo code and the total. */
export function OrderForm({ selection, onDone }: OrderFormProps) {
  const { t } = useTranslation();
  const { product } = selection;
  const availableTiers = getAvailableTiers(product);
  const nextKey = useRef(0);

  const [tier, setTier] = useState<PricingTier>(
    availableTiers.includes(selection.tier) ? selection.tier : 'individual',
  );
  const limits = TIER_STUDENT_LIMITS[tier];

  const createStudent = (): StudentForm => ({ key: nextKey.current++, name: '', phone: '', email: '' });

  const [students, setStudents] = useState<StudentForm[]>(() => Array.from({ length: limits.min }, createStudent));
  const [promoCode, setPromoCode] = useState('');
  const [errors, setErrors] = useState<Record<number, StudentErrors>>({});
  const [status, setStatus] = useState<Status>('idle');

  const pricePerStudent = getPrice(product, tier);
  const total = pricePerStudent * students.length;

  const changeTier = (nextTier: PricingTier) => {
    const nextLimits = TIER_STUDENT_LIMITS[nextTier];
    setTier(nextTier);
    setErrors({});
    setStudents((current) => {
      const kept = current.slice(0, nextLimits.max);
      const missing = Math.max(0, nextLimits.min - kept.length);
      return [...kept, ...Array.from({ length: missing }, createStudent)];
    });
  };

  const updateStudent = (key: number, field: StudentField, value: string) => {
    setStudents((current) => current.map((student) => (student.key === key ? { ...student, [field]: value } : student)));
    // Typing into a field clears its error.
    setErrors((current) => {
      if (!current[key]?.[field]) {
        return current;
      }
      const { [field]: _cleared, ...rest } = current[key];
      return { ...current, [key]: rest };
    });
  };

  const addStudent = () => setStudents((current) => [...current, createStudent()]);

  const removeStudent = (key: number) => {
    setStudents((current) => current.filter((student) => student.key !== key));
    setErrors(({ [key]: _removed, ...rest }) => rest);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateStudents(students);
    setErrors(validationErrors);

    const firstInvalid = students.find((student) => validationErrors[student.key]);
    if (firstInvalid) {
      const field = STUDENT_FIELDS.find((name) => validationErrors[firstInvalid.key]?.[name]);
      if (field) {
        document.getElementById(getInputId(firstInvalid.key, field))?.focus();
      }
      return;
    }

    setStatus('submitting');
    try {
      await submitOrder({
        product,
        tier,
        pricePerStudent,
        total,
        students: students.map(({ name, phone, email }) => ({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
        })),
        promoCode: promoCode.trim() || undefined,
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon} aria-hidden="true">
          <CheckIcon size={36} />
        </span>
        <h2 className={styles.successTitle}>{t('order.success.title')}</h2>
        <p className={styles.successText}>{t('order.success.description')}</p>
        <Button size="md" onClick={onDone}>
          {t('order.success.close')}
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label={t('order.formTitle')}>
      <div>
        <p className={styles.label} id="order-tier-label">
          {t('order.tierLabel')}
        </p>
        {availableTiers.length > 1 ? (
          <SegmentedControl
            fullWidth
            withItemsBorders={false}
            radius="md"
            size="md"
            color="pink"
            aria-labelledby="order-tier-label"
            value={tier}
            onChange={(value) => changeTier(value as PricingTier)}
            data={availableTiers.map((value) => ({ value, label: t(`pricing.tiers.${value}`) }))}
          />
        ) : (
          <p className={styles.individualOnly}>{t('pricing.individualOnly')}</p>
        )}
      </div>

      <div className={styles.students}>
        {students.map((student, index) => {
          const studentErrors = errors[student.key] ?? {};
          const number = index + 1;
          return (
            <fieldset key={student.key} className={styles.student}>
              <legend className={styles.studentHeader}>
                <span className={styles.studentNumber} aria-hidden="true">
                  {number}
                </span>
                <span className={styles.studentTitle}>
                  {tier === 'individual' ? t('order.individualHeading') : t('order.studentHeading', { number })}
                </span>
                {index >= limits.min && (
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    className={styles.remove}
                    aria-label={t('order.removeStudent', { number })}
                    onClick={() => removeStudent(student.key)}
                  >
                    <CloseIcon size={16} />
                  </ActionIcon>
                )}
              </legend>
              <div className={styles.fields}>
                {STUDENT_FIELDS.map((field) => {
                  const { autoComplete, ...input } = FIELD_INPUTS[field];
                  const error = studentErrors[field];
                  return (
                    <TextInput
                      key={field}
                      id={getInputId(student.key, field)}
                      {...input}
                      label={t(`order.fields.${field}`)}
                      // Only the first student is usually the person filling in the form.
                      autoComplete={index === 0 ? autoComplete : 'off'}
                      withAsterisk
                      value={student[field]}
                      error={error && t(error)}
                      onChange={(event) => updateStudent(student.key, field, event.currentTarget.value)}
                    />
                  );
                })}
              </div>
            </fieldset>
          );
        })}

        {students.length < limits.max
          ? tier !== 'individual' && (
              <button type="button" className={styles.addStudent} onClick={addStudent}>
                <span className={styles.addIcon} aria-hidden="true">
                  <PlusIcon size={16} />
                </span>
                {t('order.addStudent')}
              </button>
            )
          : tier === 'group3' && (
              <p className={styles.maxNote}>
                {t('order.maxStudents')}{' '}
                <button type="button" className={styles.linkButton} onClick={() => changeTier('group5')}>
                  {t('order.switchToGroup5')}
                </button>
              </p>
            )}
      </div>

      <TextInput
        label={t('order.fields.promo')}
        autoComplete="off"
        value={promoCode}
        onChange={(event) => setPromoCode(event.currentTarget.value)}
      />

      <dl className={styles.totals}>
        <div>
          <dt>{t('order.pricePerStudent')}</dt>
          <dd>
            {formatPrice(pricePerStudent)} {t('pricing.currency')}
          </dd>
        </div>
        <div>
          <dt>{t('order.studentsCount')}</dt>
          <dd>{students.length}</dd>
        </div>
        <div className={styles.totalRow}>
          <dt>{t('order.total')}</dt>
          <dd aria-live="polite">
            {formatPrice(total)} {t('pricing.currency')}
          </dd>
        </div>
      </dl>

      <p className={styles.paymentNote}>{t('order.paymentNote')}</p>

      {status === 'error' && (
        <p className={styles.submitError} role="alert">
          {t('order.errors.submit')}
        </p>
      )}

      <Button type="submit" size="lg" fullWidth loading={status === 'submitting'}>
        {t('order.submit')}
      </Button>
    </form>
  );
}
