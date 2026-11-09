import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationFR from './locales/fr.json';
import translationEN from './locales/en.json';
import translationES from './locales/es.json';

const resources = {
  fr: { translation: translationFR },
  en: { translation: translationEN },
  es: { translation: translationES }
};

// La langue est déterminée par l'URL : / (fr), /en, /es
const getLangFromPath = () => {
  if (typeof window === 'undefined') return 'fr';
  const match = window.location.pathname.match(/^\/(en|es)(\/|$)/);
  return match ? match[1] : 'fr';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getLangFromPath(),
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en', 'es'],
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;