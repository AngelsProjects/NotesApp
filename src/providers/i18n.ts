import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import resources from '../constants/i18n';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources,
    fallbackLng: 'en',
    debug      : false,
    ns         : ['translations'],
    defaultNS  : 'translations',

    keySeparator : false,
    interpolation: {
      escapeValue    : false,
      formatSeparator: ','
    },

    react: {
      wait       : true,
      useSuspense: false
    }
  });

export default i18n;
