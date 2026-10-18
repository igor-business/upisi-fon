import type { ParseKeys } from 'i18next';
import type { OrderStudent } from '@/types';
import { EMAIL_PATTERN, PHONE_PATTERN, normalizePhone } from '@/utils/validation';

/** Form fields of a student, in the order they are shown. */
export const STUDENT_FIELDS = ['name', 'phone', 'email'] as const satisfies readonly (keyof OrderStudent)[];

export type StudentField = (typeof STUDENT_FIELDS)[number];

/** Translation key of the error message for each invalid field. */
export type StudentErrors = Partial<Record<StudentField, ParseKeys>>;

/**
 * Checks every student (full name, phone number, email address that is not repeated) and returns
 * the errors keyed by the student's key. Students without errors are left out.
 */
export function validateStudents<T extends OrderStudent & { key: number }>(
  students: readonly T[],
): Record<number, StudentErrors> {
  const result: Record<number, StudentErrors> = {};
  const seenEmails = new Set<string>();

  for (const student of students) {
    const errors: StudentErrors = {};
    const email = student.email.trim().toLowerCase();

    if (student.name.trim().split(/\s+/).length < 2) {
      errors.name = 'order.errors.name';
    }
    if (!PHONE_PATTERN.test(normalizePhone(student.phone))) {
      errors.phone = 'order.errors.phone';
    }
    if (!EMAIL_PATTERN.test(email)) {
      errors.email = 'order.errors.email';
    } else if (seenEmails.has(email)) {
      errors.email = 'order.errors.emailDuplicate';
    }
    seenEmails.add(email);

    if (Object.keys(errors).length > 0) {
      result[student.key] = errors;
    }
  }
  return result;
}
