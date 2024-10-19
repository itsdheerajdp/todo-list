// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './i18n/en.json';
import ta from './i18n/ta.json';
import te from './i18n/te.json';
import hi from './i18n/hi.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ta: {
      translation: ta,
    },
    te: {
      translation: te,
    },
    hi: {
      translation: hi,
    },
  },
  lng: 'en', // default language
  fallbackLng: 'en', // use English if the selected language is not available
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
