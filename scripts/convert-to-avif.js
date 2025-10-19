import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const inputFiles = [
  'public/assets/slider-image-1.jpg',
  'public/assets/slider-image-2.jpg'
];

const quality = 50;

async function convertToAvif(inputPath) {
  const fullInputPath = join(projectRoot, inputPath);
  const outputPath = fullInputPath.replace('.jpg', '.avif');
  
  try {
    const inputStats = statSync(fullInputPath);
    const inputSizeKB = (inputStats.size / 1024).toFixed(2);
    
    console.log(`\nConverting: ${inputPath}`);
    console.log(`Original size: ${inputSizeKB} KB`);
    
    await sharp(fullInputPath)
      .avif({ quality })
      .toFile(outputPath);
    
    const outputStats = statSync(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(2);
    const reduction = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(2);
    
    console.log(`AVIF size: ${outputSizeKB} KB`);
    console.log(`Size reduction: ${reduction}%`);
    console.log(`✓ Saved to: ${outputPath}`);
    
    return {
      input: inputPath,
      inputSize: inputSizeKB,
      outputSize: outputSizeKB,
      reduction
    };
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error.message);
    throw error;
  }
}

async function main() {
  console.log('=== AVIF Conversion Script ===');
  console.log(`Quality setting: ${quality}`);
  console.log(`Converting ${inputFiles.length} images...\n`);
  
  const results = [];
  
  for (const inputFile of inputFiles) {
    const result = await convertToAvif(inputFile);
    results.push(result);
  }
  
  console.log('\n=== Conversion Summary ===');
  results.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.input}`);
    console.log(`   Original: ${result.inputSize} KB → AVIF: ${result.outputSize} KB`);
    console.log(`   Reduction: ${result.reduction}%`);
  });
  
  const totalInputSize = results.reduce((sum, r) => sum + parseFloat(r.inputSize), 0).toFixed(2);
  const totalOutputSize = results.reduce((sum, r) => sum + parseFloat(r.outputSize), 0).toFixed(2);
  const totalReduction = (((totalInputSize - totalOutputSize) / totalInputSize) * 100).toFixed(2);
  
  console.log(`\nTotal: ${totalInputSize} KB → ${totalOutputSize} KB (${totalReduction}% reduction)`);
  console.log('\n✓ All conversions complete!');
}

main().catch(error => {
  console.error('Conversion failed:', error);
  process.exit(1);
});
