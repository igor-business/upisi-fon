import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { AppConstants } from '@constants';
import srTranslations from './language/sr';

const sr = { common: srTranslations };

const resources = {
  sr,
};

i18n.use(initReactI18next).init({
  resources: resources,
  lng: AppConstants.DEFAULT_LANGUAGE,
  fallbackLng: 'sr',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
