import seo from './seo.json';

export const SUPPORTED_LANGS = Object.keys(seo.languages);

// Préfixe d'URL pour une langue ('' pour le français, '/en', '/es')
export const langPrefix = (lang) => seo.languages[lang]?.prefix ?? '';

// Construit un chemin localisé : localizedPath('en', '/menu') -> '/en/menu'
export const localizedPath = (lang, path = '/') => {
  const prefix = langPrefix(lang);
  if (!prefix) return path;
  return path === '/' ? prefix : `${prefix}${path}`;
};

// Retire le préfixe de langue d'un chemin : '/en/menu' -> '/menu'
export const stripLangPrefix = (pathname) => {
  const match = pathname.match(/^\/(en|es)(\/.*)?$/);
  if (!match) return pathname || '/';
  return match[2] || '/';
};
