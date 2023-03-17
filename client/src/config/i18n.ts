import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../assets/locales/en';
import ta from '../assets/locales/ta';

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  resources: { en, ta }
});

export default i18n;
