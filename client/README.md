# Pavr Tools & Technologies — client

React 19 + Vite marketing site for Pavr Tools and Technologies Pvt Ltd.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173, proxies /api to localhost:5000
npm run build    # production bundle into dist/
npm run preview  # serve the built bundle
npm run lint
```

The Express/MongoDB API lives in `../server`. In development Vite proxies
`/api` to `localhost:5000`; in production set `VITE_API_URL` to the backend's
public URL (see `.env.example`).

## Layout

```
src/
  components/    layout, home sections, products, contact, ui, seo
  data/          site identity, structured data, products, services, partners…
  pages/         one component per route, lazy-loaded in App.jsx
public/          images, hero frames, client logos, favicons, og-image
scripts/         one-off asset generation (see below)
```

`src/data/site.js` is the single source of truth for identity and contact
details. The footer and every schema.org node read from it, so contact
information can't drift between pages.

## Metadata

`src/components/seo/Seo.jsx` sets title, description, canonical, Open Graph,
Twitter card and JSON-LD per route, deriving URLs from the current path.

`index.html` carries a duplicate static set of those tags because social
crawlers (WhatsApp, LinkedIn, Facebook, Slack) don't execute JavaScript and
would otherwise see no preview at all. React 19 hoists the app's own tags into
`<head>` but appends rather than replaces, so anything marked
`data-default-meta` is removed by `src/main.jsx` after mount — leaving a
JS-capable client with exactly one of each tag.

If you add a route, add it to `public/sitemap.xml` too.

## Asset scripts

Run from this directory; each writes into `public/`.

```bash
node scripts/generate-og-image.cjs   # 1200x630 social share card
node scripts/generate-favicons.cjs   # favicon + PWA icon set from favicon.svg
node scripts/convert-images.cjs      # source images -> responsive WebP
node scripts/extract-hero-frames.cjs # hero scrub frames from source video
```

`generate-og-image.cjs` renders text with IBM Plex Sans via fontconfig. If the
font isn't installed system-wide the card still builds, just in a fallback face.

## Conventions

- Colours come from the Tailwind tokens in `tailwind.config.js`; the palette and
  design rationale are documented in `../.impeccable.md`.
- Body text on light surfaces uses `stone-500` and accents use `copper-600`.
  The lighter `stone-400` / `copper-500` are for dark sections only — they fail
  WCAG AA contrast on light backgrounds.
- Run `npm run lint` before committing; it should be clean.
