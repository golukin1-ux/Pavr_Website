const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = 'c:/Users/Abhishek/Desktop/Pavr website/pictures/ezgif-7673cc22f59478f2-jpg';
const OUT_DIR = path.join(__dirname, '..', 'public', 'hero-frames');
const TARGET_FRAMES = 90;

const VARIANTS = [
  { suffix: '',        width: 1600, height: 900, quality: 78 },
  { suffix: '-mobile', width: 800,  height: 450, quality: 70 },
];

async function main() {
  const all = fs.readdirSync(SOURCE_DIR)
    .filter(f => /\.jpg$/i.test(f))
    .sort();
  console.log(`Source: ${all.length} frames`);

  const step = all.length / TARGET_FRAMES;
  const picks = Array.from({ length: TARGET_FRAMES }, (_, i) => all[Math.floor(i * step)]);

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const totals = Object.fromEntries(VARIANTS.map(v => [v.suffix || 'desktop', 0]));

  for (let i = 0; i < picks.length; i++) {
    const src = path.join(SOURCE_DIR, picks[i]);
    const num = String(i + 1).padStart(3, '0');

    for (const v of VARIANTS) {
      const out = path.join(OUT_DIR, `frame_${num}${v.suffix}.webp`);
      await sharp(src)
        .resize(v.width, v.height, { fit: 'cover', position: 'center' })
        .webp({ quality: v.quality, effort: 5 })
        .toFile(out);
      totals[v.suffix || 'desktop'] += fs.statSync(out).size;
    }

    if ((i + 1) % 15 === 0) console.log(`  ${i + 1}/${picks.length}`);
  }

  console.log('\nDone.');
  for (const [k, v] of Object.entries(totals)) {
    console.log(`  ${k}: ${(v / 1024 / 1024).toFixed(2)} MB`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
