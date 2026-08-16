import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { AppConstants } from '@constants';
import enTranslations from './language/en';
import srTranslations from './language/sr';

const sr = { common: srTranslations };
const en = { common: enTranslations };

const resources = {
  sr,
  en,
};

i18n.use(initReactI18next).init({
  resources: resources,
  lng: AppConstants.DEFAULT_LANGUAGE,
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
