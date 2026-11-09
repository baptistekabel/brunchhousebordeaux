/**
 * Génère une page HTML statique par URL (/, /menu, /en, /en/menu, /es, /es/menu)
 * avec les bonnes balises <head> (title, description, canonical, hreflang, Open Graph),
 * ainsi que le sitemap.xml.
 *
 * Google et les réseaux sociaux lisent ainsi des métadonnées propres à chaque page
 * sans avoir à exécuter le JavaScript. La config est partagée avec l'app : src/seo/seo.json
 */
const fs = require('fs');
const path = require('path');
const seo = require('../src/seo/seo.json');

const buildDir = path.join(__dirname, '..', 'build');
const template = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');
const langs = Object.keys(seo.languages);

const localizedPath = (lang, p) => {
  const prefix = seo.languages[lang].prefix;
  if (!prefix) return p;
  return p === '/' ? prefix : `${prefix}${p}`;
};
const absUrl = (lang, p) => `${seo.siteUrl}${localizedPath(lang, p)}`;

const escapeAttr = (str) =>
  str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const replaceOrFail = (html, regex, replacement, label) => {
  if (!regex.test(html)) {
    throw new Error(`Balise introuvable dans index.html : ${label}`);
  }
  return html.replace(regex, replacement);
};

const renderPage = (pageKey, lang) => {
  const page = seo.pages[pageKey];
  const data = page[lang];
  const url = absUrl(lang, page.path);
  const title = escapeAttr(data.title);
  const description = escapeAttr(data.description);

  let html = template;
  html = replaceOrFail(html, /<html lang="[^"]*"/, `<html lang="${lang}"`, 'html lang');
  html = replaceOrFail(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, 'title');
  html = replaceOrFail(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}"/>`, 'description');
  html = replaceOrFail(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}"/>`, 'canonical');
  html = replaceOrFail(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}"/>`, 'og:title');
  html = replaceOrFail(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${description}"/>`, 'og:description');
  html = replaceOrFail(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}"/>`, 'og:url');
  html = replaceOrFail(html, /<meta property="og:locale" content="[^"]*"\s*\/?>/, `<meta property="og:locale" content="${seo.languages[lang].ogLocale}"/>`, 'og:locale');
  html = replaceOrFail(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${title}"/>`, 'twitter:title');
  html = replaceOrFail(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${description}"/>`, 'twitter:description');

  // hreflang : on remplace l'ensemble des liens alternates par ceux de la page
  html = html.replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>/g, '');
  const pageLangs = langs.filter((l) => page[l]);
  const alternates = pageLangs.length < 2 ? '' : pageLangs
    .map((l) => `<link rel="alternate" hreflang="${l}" href="${absUrl(l, page.path)}"/>`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${absUrl('fr', page.path)}"/>`)
    .join('');
  html = html.replace(/(<link rel="canonical" href="[^"]*"\/>)/, `$1${alternates}`);

  return html;
};

const outputs = [];
Object.keys(seo.pages).forEach((pageKey) => {
  langs.filter((lang) => seo.pages[pageKey][lang]).forEach((lang) => {
    const urlPath = localizedPath(lang, seo.pages[pageKey].path);
    const outFile = urlPath === '/'
      ? path.join(buildDir, 'index.html')
      : path.join(buildDir, urlPath.slice(1), 'index.html');
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, renderPage(pageKey, lang));
    outputs.push(urlPath);
  });
});

// Sitemap avec les alternates hreflang
const today = new Date().toISOString().slice(0, 10);
const urls = Object.keys(seo.pages).flatMap((pageKey) => {
  const page = seo.pages[pageKey];
  const pageLangs = langs.filter((l) => page[l]);
  return pageLangs.map((lang) => {
    const links = pageLangs.length < 2 ? '' : pageLangs
      .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absUrl(l, page.path)}"/>`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${absUrl('fr', page.path)}"/>`)
      .join('\n');
    return `  <url>
    <loc>${absUrl(lang, page.path)}</loc>
${links ? links + '\n' : ''}    <lastmod>${today}</lastmod>
    <changefreq>${pageKey === 'menu' ? 'weekly' : pageKey === 'legal' ? 'yearly' : 'monthly'}</changefreq>
    <priority>${pageKey === 'legal' ? '0.2' : pageKey === 'home' ? (lang === 'fr' ? '1.0' : '0.8') : (lang === 'fr' ? '0.9' : '0.7')}</priority>
  </url>`;
  });
});
fs.writeFileSync(
  path.join(buildDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
);

console.log(`✅ Pages SEO générées : ${outputs.join(', ')}`);
console.log('✅ sitemap.xml généré');
