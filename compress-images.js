#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

// Configuration de compression
const CONFIG = {
  jpeg: {
    quality: 85,
    progressive: true,
    mozjpeg: true
  },
  png: {
    quality: 90,
    progressive: true,
    compressionLevel: 8
  },
  webp: {
    quality: 85,
    effort: 6
  },
  // Tailles pour responsive
  sizes: [400, 800, 1200, 1600],
  // Dossiers à traiter
  inputDir: './public/images',
  outputDir: './public/images/optimized',
  // Extensions supportées
  extensions: ['jpg', 'jpeg', 'png', 'webp']
};

// Créer le dossier de sortie s'il n'existe pas
function createOutputDir() {
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
}

// Obtenir la taille du fichier en Ko
function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024);
}

// Compresser une image
async function compressImage(inputPath, outputPath, options = {}) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`🔄 Compression: ${path.basename(inputPath)} (${metadata.width}x${metadata.height})`);
    
    let pipeline = image;
    
    // Redimensionner si nécessaire
    if (options.width && metadata.width > options.width) {
      pipeline = pipeline.resize(options.width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // Appliquer la compression selon le format
    const ext = path.extname(outputPath).toLowerCase();
    
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        pipeline = pipeline.jpeg(CONFIG.jpeg);
        break;
      case '.png':
        pipeline = pipeline.png({
          quality: CONFIG.png.quality,
          compressionLevel: CONFIG.png.compressionLevel,
          progressive: CONFIG.png.progressive
        });
        break;
      case '.webp':
        pipeline = pipeline.webp(CONFIG.webp);
        break;
    }
    
    await pipeline.toFile(outputPath);
    
    // Statistiques
    const originalSize = getFileSizeInKB(inputPath);
    const compressedSize = getFileSizeInKB(outputPath);
    const savings = Math.round((1 - compressedSize / originalSize) * 100);
    
    console.log(`✅ ${path.basename(inputPath)} → ${compressedSize}Ko (${savings}% économisé)`);
    
    return { originalSize, compressedSize, savings };
  } catch (error) {
    console.error(`❌ Erreur lors de la compression de ${inputPath}:`, error.message);
    return null;
  }
}

// Générer des versions responsives
async function generateResponsiveVersions(inputPath, baseName, ext) {
  const versions = [];
  
  for (const width of CONFIG.sizes) {
    const outputName = `${baseName}-${width}w${ext}`;
    const outputPath = path.join(CONFIG.outputDir, outputName);
    
    const result = await compressImage(inputPath, outputPath, { width });
    if (result) {
      versions.push({ width, ...result });
    }
  }
  
  return versions;
}

// Générer une version WebP
async function generateWebP(inputPath, baseName) {
  const outputPath = path.join(CONFIG.outputDir, `${baseName}.webp`);
  return await compressImage(inputPath, outputPath);
}

// Traiter toutes les images
async function processAllImages() {
  console.log('🚀 Démarrage de la compression des images...\n');
  
  createOutputDir();
  
  // Trouver toutes les images
  const pattern = `${CONFIG.inputDir}/**/*.{${CONFIG.extensions.join(',')}}`;
  const imageFiles = glob.sync(pattern, { nocase: true });
  
  if (imageFiles.length === 0) {
    console.log('❌ Aucune image trouvée dans', CONFIG.inputDir);
    return;
  }
  
  console.log(`📁 ${imageFiles.length} images trouvées\n`);
  
  let totalStats = {
    processed: 0,
    originalSize: 0,
    compressedSize: 0,
    errors: 0
  };
  
  for (const imagePath of imageFiles) {
    const fileName = path.basename(imagePath, path.extname(imagePath));
    const ext = path.extname(imagePath).toLowerCase();
    
    console.log(`\n📸 Traitement: ${path.basename(imagePath)}`);
    
    try {
      // Version originale compressée
      const originalOutputPath = path.join(CONFIG.outputDir, path.basename(imagePath));
      const originalResult = await compressImage(imagePath, originalOutputPath);
      
      if (originalResult) {
        totalStats.originalSize += originalResult.originalSize;
        totalStats.compressedSize += originalResult.compressedSize;
        totalStats.processed++;
        
        // Versions responsives
        await generateResponsiveVersions(imagePath, fileName, ext);
        
        // Version WebP si ce n'est pas déjà du WebP
        if (ext !== '.webp') {
          await generateWebP(imagePath, fileName);
        }
      }
    } catch (error) {
      console.error(`❌ Erreur lors du traitement de ${imagePath}:`, error.message);
      totalStats.errors++;
    }
  }
  
  // Statistiques finales
  console.log('\n' + '='.repeat(50));
  console.log('📊 STATISTIQUES FINALES');
  console.log('='.repeat(50));
  console.log(`Images traitées: ${totalStats.processed}`);
  console.log(`Erreurs: ${totalStats.errors}`);
  console.log(`Taille originale: ${totalStats.originalSize} Ko`);
  console.log(`Taille compressée: ${totalStats.compressedSize} Ko`);
  console.log(`Économie totale: ${Math.round((1 - totalStats.compressedSize / totalStats.originalSize) * 100)}%`);
  console.log('\n✨ Compression terminée!');
  console.log(`📁 Images optimisées sauvegardées dans: ${CONFIG.outputDir}`);
}

// Exécuter le script
if (require.main === module) {
  processAllImages().catch(console.error);
}

module.exports = { processAllImages, compressImage };