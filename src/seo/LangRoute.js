import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Seo from './Seo';

// La langue est déterminée par l'URL (/, /en, /es) : c'est elle qui fait foi.
const LangRoute = ({ lang, page, children }) => {
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n, lang]);

  return (
    <>
      <Seo page={page} lang={lang} />
      {children}
    </>
  );
};

export default LangRoute;
