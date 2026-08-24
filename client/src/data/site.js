// Single source of truth for identity, contact and SEO data.
// Anything that appears in metadata, structured data or the footer reads
// from here so the site can never disagree with itself.

export const SITE_URL = 'https://pavrtoolsandtechnologiespvtltd.com';

export const site = {
  url: SITE_URL,
  name: 'Pavr Tools & Technologies',
  legalName: 'Pavr Tools and Technologies Pvt Ltd',
  tagline: 'Precision Injection Moulding & Mould Manufacturing',
  founded: '2010',
  description:
    'Manufacturer of injection-moulded plastic components for lead-acid batteries, plus mould design, manufacturing, and repair for industrial OEMs in India.',

  phone: '+91 74287 66242',
  phoneE164: '+917428766242',
  email: 'info@pavrtools.com',
  whatsapp: 'https://wa.me/917428766242',

  address: {
    street: 'Plot No. 12B, Sector 7B, Reliance MET City, Sondhi',
    locality: 'Jhajjar',
    region: 'Haryana',
    postalCode: '124103',
    country: 'IN',
  },
  geo: { lat: 28.504361, lng: 76.782337 },

  // Mon–Sat 08:00–19:00, in schema.org opening-hours form.
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:00',
    closes: '19:00',
  },

  // Shown in the footer only when set. These are statutory identifiers —
  // leave blank rather than display a placeholder.
  cin: '',
  gst: '',

  ogImage: '/og-image.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
};

export const absoluteUrl = (path = '/') =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
