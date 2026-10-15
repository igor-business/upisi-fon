import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Textarea, TextInput } from '@mantine/core';
import { Title } from '@components';
import { AppConstants } from '@constants';
import { ContactSectionProps } from '@/types/common';
import { submitContact } from '@/services/contact';
import { EMAIL_PATTERN, PHONE_PATTERN, normalizePhone } from '@/utils/validation';
import clsx from 'clsx';
import styles from './index.module.css';

type Field = 'name' | 'email' | 'phone' | 'message' | 'consent';
type Errors = Partial<Record<Field | 'contact', string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_VALUES = { name: '', email: '', phone: '', message: '' };

export function ContactSection({ id, onAction, className }: ContactSectionProps) {
  const { t } = useTranslation();
  const [values, setValues] = useState(EMPTY_VALUES);
  const [consent, setConsent] = useState(false);
  // Hidden field that real users never fill in; bots usually do.
  const [trap, setTrap] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const setValue = (field: keyof typeof EMPTY_VALUES, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, contact: undefined }));
  };

  const validate = (): Errors => {
    const result: Errors = {};
    const email = values.email.trim();
    const phone = normalizePhone(values.phone);

    if (!values.name.trim()) {
      result.name = t('contact.errors.name');
    }
    if (!email && !phone) {
      result.contact = t('contact.errors.contact');
    }
    if (email && !EMAIL_PATTERN.test(email)) {
      result.email = t('contact.errors.email');
    }
    if (phone && !PHONE_PATTERN.test(phone)) {
      result.phone = t('contact.errors.phone');
    }
    if (values.message.trim().length < AppConstants.CONTACT_MESSAGE_MIN_LENGTH) {
      result.message = t('contact.errors.message', { min: AppConstants.CONTACT_MESSAGE_MIN_LENGTH });
    }
    if (!consent) {
      result.consent = t('contact.errors.consent');
    }
    return result;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    const firstInvalid = (['name', 'email', 'phone', 'message', 'consent'] as const).find(
      (field) => validationErrors[field],
    );
    if (firstInvalid || validationErrors.contact) {
      document.getElementById(`${id}-${firstInvalid ?? 'email'}`)?.focus();
      return;
    }

    // Pretend everything went fine for bots, but do not send anything.
    if (trap) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    try {
      await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(EMPTY_VALUES);
    setConsent(false);
    setErrors({});
    setStatus('idle');
  };

  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <Title className={styles.title}>{t('contact.title')}</Title>
          <p className={styles.description}>{t('contact.description')}</p>
          <Button
            size="lg"
            className={styles.action}
            onClick={onAction}
            rightSection={
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            }
          >
            {t('contact.action')}
          </Button>
        </div>

        <div className={styles.card}>
          {status !== 'success' && <h3 className={styles.cardTitle}>{t('contact.formTitle')}</h3>}
          {status === 'success' ? (
            <div className={styles.success} role="status">
              <span className={styles.successIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              <h3 className={styles.successTitle}>{t('contact.success.title')}</h3>
              <p className={styles.successText}>{t('contact.success.description')}</p>
              <Button variant="default" onClick={reset}>
                {t('contact.success.action')}
              </Button>
            </div>
          ) : (
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
              aria-label={t('contact.formLabel')}
            >
              <TextInput
                id={`${id}-name`}
                size="md"
                label={t('contact.fields.name')}
                placeholder={t('contact.placeholders.name')}
                autoComplete="given-name"
                withAsterisk
                value={values.name}
                error={errors.name}
                onChange={(e) => setValue('name', e.currentTarget.value)}
              />

              <div className={styles.row}>
                <TextInput
                  id={`${id}-email`}
                  type="email"
                  inputMode="email"
                  size="md"
                  label={t('contact.fields.email')}
                  placeholder={t('contact.placeholders.email')}
                  autoComplete="email"
                  value={values.email}
                  error={errors.email}
                  onChange={(e) => setValue('email', e.currentTarget.value)}
                />
                <TextInput
                  id={`${id}-phone`}
                  type="tel"
                  inputMode="tel"
                  size="md"
                  label={t('contact.fields.phone')}
                  placeholder={t('contact.placeholders.phone')}
                  autoComplete="tel"
                  value={values.phone}
                  error={errors.phone}
                  onChange={(e) => setValue('phone', e.currentTarget.value)}
                />
              </div>
              <p className={clsx(styles.hint, errors.contact && styles.hintError)} role={errors.contact ? 'alert' : undefined}>
                {errors.contact ?? t('contact.contactHint')}
              </p>

              <Textarea
                id={`${id}-message`}
                size="md"
                minRows={4}
                autosize
                label={t('contact.fields.message')}
                placeholder={t('contact.placeholders.message')}
                withAsterisk
                value={values.message}
                error={errors.message}
                onChange={(e) => setValue('message', e.currentTarget.value)}
              />

              <div className={styles.trap} aria-hidden="true">
                <label>
                  Website
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={trap}
                    onChange={(e) => setTrap(e.currentTarget.value)}
                  />
                </label>
              </div>

              <Checkbox
                id={`${id}-consent`}
                label={t('contact.consent')}
                checked={consent}
                error={errors.consent}
                onChange={(e) => {
                  setConsent(e.currentTarget.checked);
                  setErrors((current) => ({ ...current, consent: undefined }));
                }}
              />

              {status === 'error' && (
                <p className={styles.submitError} role="alert">
                  {t('contact.errors.submit')}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                fullWidth
                className={styles.submit}
                loading={status === 'submitting'}
              >
                {t('contact.submit')}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
