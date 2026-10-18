import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import sr from './language/sr/common.json';

/** Language of the site (the only one for now). */
export const DEFAULT_LANGUAGE = 'sr';

/** Namespace that holds all texts. */
export const DEFAULT_NAMESPACE = 'common';

/** Translation resources; also used to type-check translation keys (see i18next.d.ts). */
export const resources = {
  sr: { [DEFAULT_NAMESPACE]: sr },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  defaultNS: DEFAULT_NAMESPACE,
  // React already escapes values.
  interpolation: { escapeValue: false },
});

export default i18n;
