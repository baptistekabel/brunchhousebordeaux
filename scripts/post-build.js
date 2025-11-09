const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');

console.log('🚀 Post-build optimization pour Render...');

// Vérifier que le répertoire build existe
if (!fs.existsSync(buildDir)) {
  console.error('❌ Répertoire build non trouvé!');
  process.exit(1);
}

// 1. Vérifier et copier _redirects
const redirectsSource = path.join(__dirname, '..', 'public', '_redirects');
const redirectsTarget = path.join(buildDir, '_redirects');

if (fs.existsSync(redirectsSource)) {
  fs.copyFileSync(redirectsSource, redirectsTarget);
  console.log('✅ _redirects copié dans build/');
} else {
  // Créer _redirects si il n'existe pas
  fs.writeFileSync(redirectsTarget, '/* /index.html 200\n');
  console.log('✅ _redirects créé dans build/');
}

// 2. Vérifier et copier 404.html
const notFoundSource = path.join(__dirname, '..', 'public', '404.html');
const notFoundTarget = path.join(buildDir, '404.html');

if (fs.existsSync(notFoundSource)) {
  fs.copyFileSync(notFoundSource, notFoundTarget);
  console.log('✅ 404.html copié dans build/');
} else {
  console.log('⚠️  404.html non trouvé dans public/');
}

// 3. Vérifier et copier debug.html
const debugSource = path.join(__dirname, '..', 'public', 'debug.html');
const debugTarget = path.join(buildDir, 'debug.html');

if (fs.existsSync(debugSource)) {
  fs.copyFileSync(debugSource, debugTarget);
  console.log('✅ debug.html copié dans build/');
}

// 4. Créer un rapport de build
const buildReport = {
  timestamp: new Date().toISOString(),
  files: [],
  size: 0
};

function getFilesRecursively(dir, basePath = '') {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const relativePath = path.join(basePath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      getFilesRecursively(filePath, relativePath);
    } else {
      buildReport.files.push({
        path: relativePath,
        size: stats.size
      });
      buildReport.size += stats.size;
    }
  });
}

getFilesRecursively(buildDir);

fs.writeFileSync(
  path.join(buildDir, 'build-report.json'),
  JSON.stringify(buildReport, null, 2)
);

// 5. Afficher le résumé
console.log('📊 Résumé du build:');
console.log(`   📁 ${buildReport.files.length} fichiers générés`);
console.log(`   📦 Taille totale: ${(buildReport.size / 1024 / 1024).toFixed(2)} MB`);

// 6. Vérifications finales
const requiredFiles = ['index.html', '_redirects', 'static'];
const missingFiles = requiredFiles.filter(file => {
  const filePath = path.join(buildDir, file);
  return !fs.existsSync(filePath);
});

if (missingFiles.length > 0) {
  console.error('❌ Fichiers manquants:', missingFiles);
  process.exit(1);
} else {
  console.log('✅ Tous les fichiers requis sont présents');
  console.log('🎉 Build prêt pour Render!');
}

// 7. Instructions de déploiement
console.log('\n🚀 Configuration Render:');
console.log('   Build Command: npm run build');
console.log('   Publish Directory: build');
console.log('   Environment: Static Site');
console.log('\n📝 URLs de test après déploiement:');
console.log('   - https://votre-app.onrender.com/');
console.log('   - https://votre-app.onrender.com/menu');
console.log('   - https://votre-app.onrender.com/debug.html');
console.log('   - https://votre-app.onrender.com/test-404 (test 404)');