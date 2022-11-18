import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEN from '../constants/i18n/en/translation.json';
import translationRU from '../constants/i18n/ru/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: translationEN,
      },
      ru: {
        translation: translationRU,
      },
    },
  });

export default i18n;
