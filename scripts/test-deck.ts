import { generateDeck } from '../src/services/aiGenerator.js';
import { exportToPPTX } from '../src/services/pptxExporter.js';
import fs from 'fs';

async function main() {
  console.log('Testing generateDeck with Gemini 3.8 Flash via 9router tunnel...');
  const deck = await generateDeck({
    topic: 'Kecerdasan Buatan untuk Transformasi Bisnis Indonesia 2026',
    slideCount: 5,
    theme: 'dark_modern',
    language: 'id'
  });

  console.log('\n--- Deck Generated Successfully ---');
  console.log('Title:', deck.title);
  console.log('Description:', deck.description);
  console.log('Slides count:', deck.slides.length);
  deck.slides.forEach(s => {
    console.log(`[Slide ${s.slideNumber}] (${s.layout}) ${s.title}`);
  });

  console.log('\nTesting exportToPPTX...');
  const buffer = await exportToPPTX(deck);
  console.log(`PPTX Buffer generated: ${buffer.length} bytes (${(buffer.length / 1024).toFixed(1)} KB)`);

  const testFile = 'test_presentation.pptx';
  fs.writeFileSync(testFile, buffer);
  console.log(`Saved test presentation to: ${testFile}`);
  console.log('End-to-End Test PASSED!');
}

main().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
