import { useEffect } from 'react';
import seo from './seo.json';
import { localizedPath, SUPPORTED_LANGS } from './lang';

const setMeta = (selector, attr, key, content) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setLink = (selector, attrs) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('link');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
};

/**
 * Met à jour les balises <head> lors de la navigation côté client.
 * Les mêmes balises sont générées en HTML statique au build (scripts/generate-seo-pages.js),
 * pour que Google et les réseaux sociaux les voient sans exécuter le JavaScript.
 */
const Seo = ({ page, lang }) => {
  useEffect(() => {
    const data = seo.pages[page]?.[lang];
    if (!data) return;
    const path = seo.pages[page].path;
    const url = `${seo.siteUrl}${localizedPath(lang, path)}`;

    document.documentElement.lang = lang;
    document.title = data.title;
    setMeta('meta[name="description"]', 'name', 'description', data.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', data.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', data.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', seo.languages[lang].ogLocale);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', data.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', data.description);
    setLink('link[rel="canonical"]', { rel: 'canonical', href: url });

    const pageLangs = SUPPORTED_LANGS.filter((l) => seo.pages[page][l]);
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    if (pageLangs.length < 2) return;
    pageLangs.forEach((l) => {
      setLink(`link[rel="alternate"][hreflang="${l}"]`, {
        rel: 'alternate',
        hreflang: l,
        href: `${seo.siteUrl}${localizedPath(l, path)}`
      });
    });
    setLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${seo.siteUrl}${localizedPath('fr', path)}`
    });
  }, [page, lang]);

  return null;
};

export default Seo;
