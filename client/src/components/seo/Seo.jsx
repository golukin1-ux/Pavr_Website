import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { site, absoluteUrl } from '../../data/site';

/**
 * Page metadata: title, description, canonical, Open Graph, Twitter card and
 * any JSON-LD the page wants to contribute.
 *
 * Canonical and og:url are derived from the current route, so they stay
 * correct without every page repeating the site URL.
 */
export default function Seo({
  title,
  description = site.description,
  image = site.ogImage,
  type = 'website',
  noindex = false,
  jsonLd,
  children,
}) {
  const { pathname } = useLocation();
  const url = absoluteUrl(pathname);
  const fullTitle = title
    ? `${title} — ${site.name}`
    : `${site.name} — ${site.tagline}`;
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);
  const blocks = [jsonLd].flat().filter(Boolean);

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex
        ? <meta name="robots" content="noindex,follow" />
        : <link rel="canonical" href={url} />}

      {/* Open Graph — WhatsApp, LinkedIn, Slack, Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={String(site.ogImageWidth)} />
      <meta property="og:image:height" content={String(site.ogImageHeight)} />
      <meta property="og:image:alt" content={`${site.name} — ${site.tagline}`} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
      {children}
    </Helmet>
  );
}
