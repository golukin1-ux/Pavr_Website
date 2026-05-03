// One-off: convert all jpg/jpeg in public/ to webp, resize huge ones, write a manifest of dimensions.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC = path.resolve(__dirname, '..', 'public');
const QUALITY = 80;

const targets = [
  { dir: path.join(PUBLIC, 'photos', 'products'), maxWidth: 900 },
  { dir: path.join(PUBLIC, 'photos', 'injection-molding'), maxWidth: 1600 },
  { dir: path.join(PUBLIC, 'photos', 'mold-manufacturing'), maxWidth: 1600 },
  { dir: path.join(PUBLIC, 'photos', 'mold-repair'), maxWidth: 1600 },
  { dir: path.join(PUBLIC, 'photos', 'battery-components'), maxWidth: 1600 },
  { dir: PUBLIC, maxWidth: 1920, files: ['photos/solutions-hero-bg.jpg'] },
  { dir: path.join(PUBLIC, 'images'), maxWidth: 1600 },
];

const dims = {};

async function convertFile(file, maxWidth) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;
  const out = file.replace(/\.(jpe?g|png)$/i, '.webp');

  let pipeline = sharp(file);
  const meta = await pipeline.metadata();
  if (meta.width && meta.width > maxWidth) pipeline = pipeline.resize({ width: maxWidth });

  await pipeline.webp({ quality: QUALITY }).toFile(out);

  const finalMeta = await sharp(out).metadata();
  const rel = path.relative(PUBLIC, out).replace(/\\/g, '/');
  dims['/' + rel] = { width: finalMeta.width, height: finalMeta.height };

  const beforeKB = (fs.statSync(file).size / 1024).toFixed(0);
  const afterKB = (fs.statSync(out).size / 1024).toFixed(0);
  console.log(`  ${path.basename(file)}: ${beforeKB}KB -> ${afterKB}KB (${finalMeta.width}x${finalMeta.height})`);
}

async function processDir(target) {
  if (target.files) {
    for (const f of target.files) {
      const full = path.join(PUBLIC, f);
      if (fs.existsSync(full)) {
        console.log(`\n${f}`);
        await convertFile(full, target.maxWidth);
      }
    }
    return;
  }
  if (!fs.existsSync(target.dir)) return;
  console.log(`\n[${path.relative(PUBLIC, target.dir).replace(/\\/g, '/')}]`);
  const entries = fs.readdirSync(target.dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isFile()) await convertFile(path.join(target.dir, e.name), target.maxWidth);
    else if (e.isDirectory()) await processDir({ dir: path.join(target.dir, e.name), maxWidth: target.maxWidth });
  }
}

(async () => {
  for (const t of targets) await processDir(t);
  fs.writeFileSync(
    path.join(__dirname, 'image-dimensions.json'),
    JSON.stringify(dims, null, 2)
  );
  console.log(`\nWrote ${Object.keys(dims).length} entries to scripts/image-dimensions.json`);
})();
