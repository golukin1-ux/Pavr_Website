// schema.org graphs. Kept out of components so the same organisation node can
// be referenced by @id from every page rather than duplicated and drifting.
import { site, absoluteUrl } from './site';

export const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

export const organization = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': ORG_ID,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: absoluteUrl('/favicon-512.png'),
  image: absoluteUrl(site.ogImage),
  description: site.description,
  foundingDate: site.founded,
  address: postalAddress,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  telephone: site.phoneE164,
  email: site.email,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: site.openingHours.days,
      opens: site.openingHours.opens,
      closes: site.openingHours.closes,
    },
  ],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'certification',
    name: 'ISO 9001:2015',
  },
  areaServed: { '@type': 'Country', name: 'India' },
  knowsAbout: [
    'Injection moulding',
    'Mould design and manufacturing',
    'Mould repair',
    'Lead-acid battery components',
    'Precision tooling',
  ],
};

export const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: site.url,
  name: site.name,
  publisher: { '@id': ORG_ID },
};

/** Trail of [name, path] pairs, root-first. */
export const breadcrumbs = (trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: absoluteUrl(path),
  })),
});

export const productList = (products) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `${site.name} product catalogue`,
  numberOfItems: products.length,
  itemListElement: products.map((product, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: product.name,
      description: product.description,
      ...(product.images?.[0] && { image: absoluteUrl(product.images[0]) }),
      category: product.category,
      manufacturer: { '@id': ORG_ID },
      ...(product.specifications?.Material && {
        material: product.specifications.Material,
      }),
    },
  })),
});

export const serviceList = (services) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `${site.name} services`,
  itemListElement: services.map((service, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: service.title,
      description: service.description,
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'Country', name: 'India' },
    },
  })),
});

export const article = (post) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.excerpt,
  ...(post.image && { image: absoluteUrl(post.image) }),
  ...(post.publishedAt && { datePublished: post.publishedAt }),
  ...(post.updatedAt && { dateModified: post.updatedAt }),
  author: post.author
    ? { '@type': 'Person', name: post.author }
    : { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
});

export const contactPage = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Contact ${site.name}`,
  mainEntity: { '@id': ORG_ID },
};
