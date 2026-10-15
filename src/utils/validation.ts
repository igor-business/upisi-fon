/** Basic email format check (something@domain.tld). */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Phone number (digits only, optional leading +) once separators are removed. */
export const PHONE_PATTERN = /^\+?\d{6,15}$/;

/** Removes spaces, dashes, slashes, dots and brackets from a phone number. */
export function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-/().]/g, '');
}
