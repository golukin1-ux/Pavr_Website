const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUB = path.join(__dirname, '..', 'public');
const SVG = fs.readFileSync(path.join(PUB, 'favicon.svg'));

const SIZES = [
  { name: 'favicon-16.png',       size: 16 },
  { name: 'favicon-32.png',       size: 32 },
  { name: 'favicon-48.png',       size: 48 },
  { name: 'favicon-192.png',      size: 192 },
  { name: 'favicon-512.png',      size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon.png',          size: 64 },
];

(async () => {
  for (const s of SIZES) {
    await sharp(SVG, { density: 600 })
      .resize(s.size, s.size)
      .png({ compressionLevel: 9 })
      .toFile(path.join(PUB, s.name));
    const bytes = fs.statSync(path.join(PUB, s.name)).size;
    console.log(`  ${s.name}  ${s.size}x${s.size}  ${bytes}b`);
  }
})();
