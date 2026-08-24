// Builds the 1200x630 social-share card from the brand mark.
// Run with: node scripts/generate-og-image.cjs
//
// Requires IBM Plex Sans to be visible to fontconfig (librsvg renders the text).
// If Plex is missing the card still builds, just in the fallback sans face.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUB = path.join(__dirname, '..', 'public');
const W = 1200;
const H = 630;

const NAVY   = '#051228';
const COPPER = '#C45D2C';
const CREAM  = '#F7F6E7';
const MUTED  = '#8A857D';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const card = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M0 40L40 0H20L0 20M40 40V20L20 40"
            fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="0.5"/>
    </pattern>
    <radialGradient id="glow" cx="82%" cy="22%" r="55%">
      <stop offset="0%"   stop-color="${COPPER}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${COPPER}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${NAVY}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Left rule, echoing the hero's copper accent -->
  <rect x="0" y="0" width="6" height="${H}" fill="${COPPER}"/>

  <g font-family="IBM Plex Sans, DejaVu Sans, sans-serif">
    <!-- Wordmark -->
    <text x="96" y="128" fill="${CREAM}" font-size="38" font-weight="700"
          letter-spacing="1.5">PAVR</text>
    <text x="232" y="128" fill="${CREAM}" fill-opacity="0.60" font-size="19"
          font-weight="500">Tools &amp; Technologies</text>

    <!-- Headline -->
    <text x="96" y="292" fill="#FFFFFF" font-size="60" font-weight="600" letter-spacing="-1.3">Precision injection moulding</text>
    <text x="96" y="366" fill="#FFFFFF" font-size="60" font-weight="600" letter-spacing="-1.3">&amp; <tspan fill="${COPPER}">mould manufacturing</tspan></text>

    <rect x="96" y="412" width="88" height="4" fill="${COPPER}"/>

    <!-- Supporting line -->
    <text x="96" y="474" fill="${MUTED}" font-size="23" font-weight="400">${esc(
      'Battery components, tooling and moulded parts — built in-house.',
    )}</text>

    <!-- Footer strip -->
    <text x="96" y="553" fill="${CREAM}" fill-opacity="0.55" font-size="16"
          font-weight="500" letter-spacing="2.4">${esc(
            'ISO 9001:2015   ·   EST. 2010   ·   JHAJJAR, HARYANA, INDIA',
          )}</text>
  </g>
</svg>`;

(async () => {
  const mark = await sharp(path.join(PUB, 'logo-dark.svg'), { density: 600 })
    .resize({ height: 132 })
    .png()
    .toBuffer();

  const out = path.join(PUB, 'og-image.jpg');
  await sharp(Buffer.from(card), { density: 96 })
    .composite([{ input: mark, top: 62, left: 1004 }])
    .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
    .toFile(out);

  const { size } = fs.statSync(out);
  console.log(`  og-image.jpg  ${W}x${H}  ${(size / 1024).toFixed(1)}kB`);
})();
