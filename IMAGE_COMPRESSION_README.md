# 📸 Guide de Compression d'Images

Ce script automatise la compression et l'optimisation de toutes les images de votre projet.

## 🚀 Installation

```bash
# Installer les dépendances nécessaires
npm install sharp glob --save-dev
```

## 💻 Utilisation

### Méthode 1: Via npm script (recommandée)
```bash
npm run compress-images
```

### Méthode 2: Directement via Node.js
```bash
node compress-images.js
```

## 📁 Structure des dossiers

```
public/
├── images/                    # Vos images originales
│   ├── atelierBrunch.jpg     # Exemple
│   ├── menu/
│   │   └── burgerhouse.jpeg
│   └── ...
└── images/optimized/          # Images compressées (généré automatiquement)
    ├── atelierBrunch.jpg     # Version optimisée
    ├── atelierBrunch-400w.jpg # Version responsive 400px
    ├── atelierBrunch-800w.jpg # Version responsive 800px
    ├── atelierBrunch.webp    # Version WebP
    └── ...
```

## ⚙️ Configuration

Le script génère automatiquement :

### 📐 **Versions responsives**
- 400px de large (mobile)
- 800px de large (tablette)
- 1200px de large (desktop)
- 1600px de large (haute résolution)

### 🗜️ **Formats optimisés**
- **JPEG**: Qualité 85%, compression progressive
- **PNG**: Qualité 90%, compression niveau 8
- **WebP**: Qualité 85% (format moderne)

### 📊 **Économies typiques**
- **JPEG**: 40-60% de réduction
- **PNG**: 20-40% de réduction
- **WebP**: 50-70% de réduction

## 🔧 Personnalisation

Pour modifier la configuration, éditez le fichier `compress-images.js` :

```javascript
const CONFIG = {
  jpeg: {
    quality: 85,        // Qualité JPEG (0-100)
    progressive: true   // Chargement progressif
  },
  png: {
    quality: 90,        // Qualité PNG (0-100)
    compressionLevel: 8 // Niveau de compression (0-9)
  },
  webp: {
    quality: 85,        // Qualité WebP (0-100)
    effort: 6          // Effort de compression (0-6)
  },
  sizes: [400, 800, 1200, 1600], // Tailles responsives
  inputDir: './public/images',     // Dossier source
  outputDir: './public/images/optimized' // Dossier de sortie
};
```

## 🌐 Utilisation dans votre code

### Images responsives avec srcset
```jsx
<img 
  src="/images/optimized/atelierBrunch.jpg"
  srcSet="
    /images/optimized/atelierBrunch-400w.jpg 400w,
    /images/optimized/atelierBrunch-800w.jpg 800w,
    /images/optimized/atelierBrunch-1200w.jpg 1200w
  "
  sizes="(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px"
  alt="Atelier Brunch"
  loading="lazy"
/>
```

### Support WebP avec fallback
```jsx
<picture>
  <source 
    srcSet="/images/optimized/atelierBrunch.webp" 
    type="image/webp" 
  />
  <img 
    src="/images/optimized/atelierBrunch.jpg" 
    alt="Atelier Brunch"
    loading="lazy"
  />
</picture>
```

## 🐛 Dépannage

### Erreur "Module not found: sharp"
```bash
npm install sharp --save-dev
```

### Erreur "Permission denied"
```bash
chmod +x compress-images.js
```

### Images non trouvées
- Vérifiez que vos images sont dans `public/images/`
- Extensions supportées : `.jpg`, `.jpeg`, `.png`, `.webp`

## 📈 Avantages

✅ **Performance** : Images 40-70% plus légères  
✅ **SEO** : Temps de chargement amélioré  
✅ **UX** : Navigation plus fluide  
✅ **Responsive** : Tailles adaptées à chaque écran  
✅ **Moderne** : Support WebP pour les navigateurs compatibles  

## 🔄 Workflow recommandé

1. Placez vos nouvelles images dans `public/images/`
2. Lancez `npm run compress-images`
3. Utilisez les images optimisées dans votre code
4. Commit les images optimisées dans votre repo

---

💡 **Conseil** : Lancez la compression après chaque ajout d'images pour maintenir des performances optimales !