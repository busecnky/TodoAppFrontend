import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import tr from './locales/tr.json';

const deviceLanguageCode = Localization.getLocales()[0]?.languageCode || 'en';

i18n.use(initReactI18next).init({
  lng: deviceLanguageCode,
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    tr: { translation: tr },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
