const Product = require('../models/Product');
const BlogPost = require('../models/BlogPost');

const products = [

  // ─── Battery Containers & Lids ───────────────────────────────────────────

  {
    name: 'Battery Container',
    slug: 'battery-container',
    description: 'Injection-moulded polypropylene battery containers for lead-acid battery assemblies. Available in standard and heavy-duty jumbo variants with acid-resistant construction and leak-free fitment.',
    category: 'battery-components',
    specifications: { 'Material': 'Polypropylene (PP)', 'Construction': 'Injection moulded, leak-free', 'Chemical Resistance': 'Acid & alkali resistant', 'MOQ': '500 pcs' },
    variants: ['IT-500', 'N100 Standard', 'N100 Jumbo'],
    featured: true,
  },
  {
    name: 'Battery Lid',
    slug: 'battery-lid',
    description: 'Precision-moulded polypropylene lids for lead-acid battery containers. Designed for a secure, vibration-resistant fit across standard battery models.',
    category: 'battery-components',
    specifications: { 'Material': 'Polypropylene (PP)', 'Construction': 'Injection moulded', 'Fit': 'Precision fit, vibration resistant', 'MOQ': '500 pcs' },
    variants: ['IT-500 Lid', 'N100 Lid'],
    featured: true,
  },

  // ─── Grid Bars ───────────────────────────────────────────────────────────

  {
    name: 'Bottom Bar',
    slug: 'bottom-bar',
    description: 'Injection-moulded plastic bottom bars for lead-acid battery grid plate assemblies. Available across a wide range of spine counts and cross-section dimensions to suit various battery configurations.',
    category: 'battery-components',
    specifications: { 'Material': 'Polypropylene (PP)', 'Application': 'Battery grid plate assembly', 'Process': 'Injection moulded' },
    variants: [
      '15 Spine · 3mm (Slurry)',
      '15 Spine · 8.1×2.5mm',
      '18 Spine · 3mm (T-Gel)',
      '18 Spine · 3.5mm (Slurry)',
      '18 Spine · 3.7mm (Slurry)',
      '18 Spine · 8.1×2.5mm',
      '18 Spine · 8.1×2.7mm',
      '19 Spine · 7.3mm',
      '19 Spine · 7.3×9.2mm',
      '19 Spine · 7.4×2.1mm (Slurry)',
      '20 Spine · 6.2×7.3mm',
      '20 Spine · 6.3×1.8mm',
      '20 Spine · 6.3×1.9mm',
      '20 Spine · 6.3×2.1mm',
      '21 Spine · 2.1mm',
      '21 Spine · 6.3×2.1mm',
      '21 Spine · 6.3×2.3mm (Slurry)',
      '22 Spine · 6.2×7.2mm (Brown)',
      '22 Spine · 6.2×7.6mm',
      '22 Spine · 6.3×7.3mm',
    ],
    featured: true,
  },
  {
    name: 'Top Bar',
    slug: 'top-bar',
    description: 'Injection-moulded top bars for battery grid plate assemblies. Paired with bottom bars to form the complete grid frame structure in lead-acid battery manufacturing.',
    category: 'battery-components',
    specifications: { 'Material': 'Polypropylene (PP)', 'Application': 'Battery grid plate top frame', 'Process': 'Injection moulded' },
    variants: [
      '18 Spine · 8.1×2.5mm',
      '20 Spine · 6.3×2.1mm',
      '20 Spine · 6.3×7.3mm',
      '21 Spine · 6.2×7.6mm',
    ],
    featured: false,
  },
  {
    name: 'Semi Top Bar',
    slug: 'semi-top-bar',
    description: 'Semi-top bars used in battery grid assemblies where partial top coverage is required. Manufactured to tight dimensional tolerances for consistent fitment.',
    category: 'battery-components',
    specifications: { 'Material': 'Polypropylene (PP)', 'Application': 'Battery grid partial top frame', 'Process': 'Injection moulded' },
    variants: [
      '18 Spine · 8.1×2.5mm',
      '19 Spine · 7.3mm',
      '21 Spine · 6.3×2.1mm',
    ],
    featured: false,
  },
  {
    name: 'Top Cap',
    slug: 'top-cap',
    description: 'Top cap component for battery grid plate assemblies. Injection moulded for dimensional consistency and structural rigidity.',
    category: 'battery-components',
    specifications: { 'Material': 'Polypropylene (PP)', 'Application': 'Battery grid cap', 'Process': 'Injection moulded' },
    variants: ['20 Spine · 6.3×2.1mm'],
    featured: false,
  },

  // ─── Internal Battery Components ─────────────────────────────────────────

  {
    name: 'Mudrest (Battery Mudrest Flap)',
    slug: 'mudrest-battery-flap',
    description: 'Durable injection-moulded plastic mudrest flaps used to insulate and secure the base of battery cells within the tray. Impact-resistant and dimensionally stable under load.',
    category: 'battery-components',
    specifications: { 'Material': 'Impact-resistant PP', 'Application': 'Battery tray base insulation', 'Feature': 'Durable, unbreakable', 'MOQ': '1000 pcs' },
    variants: ['170×70×15mm', '170×70×25mm', '173×64×35mm', '186×70×25mm'],
    featured: false,
  },
  {
    name: 'Separator Safeguard',
    slug: 'separator-safeguard',
    description: 'Precision-moulded plastic separator safeguards for electrically isolating cells within a battery pack. Prevents short circuits and extends battery service life.',
    category: 'battery-components',
    specifications: { 'Material': 'High-quality plastic', 'Application': 'Cell isolation, short-circuit prevention', 'Feature': 'Electrically insulating, lightweight', 'MOQ': '2000 pcs' },
    variants: ['146×55×1.5mm', '170×50×1.5mm', '170×64×7mm'],
    featured: false,
  },
  {
    name: 'Side Packing',
    slug: 'side-packing',
    description: 'Precision-moulded side packing components that fit between battery cells and the outer casing, providing cushioning, alignment, and vibration damping in automotive battery assemblies.',
    category: 'battery-components',
    specifications: { 'Material': 'Durable PP', 'Application': 'Battery side insulation, vibration damping', 'Feature': 'Precise fit, cushioning', 'MOQ': '500 pcs' },
    variants: ['150×115×14mm', '240×163×18.5mm', '245×162×2.5mm'],
    featured: true,
  },
  {
    name: 'Bottom Buffer',
    slug: 'bottom-buffer',
    description: 'Injection-moulded bottom buffer component for lead-acid battery assemblies, providing a protective and cushioning base layer within the battery tray.',
    category: 'battery-components',
    specifications: { 'Material': 'PP', 'Application': 'Battery tray base protection', 'Process': 'Injection moulded' },
    variants: ['156×56×5mm'],
    featured: false,
  },

  // ─── Vent & Plug Components ───────────────────────────────────────────────

  {
    name: 'Vent Plug',
    slug: 'vent-plug',
    description: 'High-precision injection-moulded vent plugs for lead-acid battery cells. Designed to safely release gases during charging while preventing electrolyte spillage. Available across M16 to M30 thread sizes in multiple design configurations.',
    category: 'battery-components',
    specifications: { 'Material': 'Acid-resistant PP / ABS', 'Thread Sizes': 'M16×2P, M22, M30', 'Application': 'Battery cell gas venting', 'MOQ': '1000 pcs' },
    variants: [
      'M16×2P',
      'M22',
      'M22 Bobbin',
      'M22 Star Type (Dummy)',
      'M22 Tranc Cone',
      'M30 Dummy',
      'M30 Dummy (High Thread)',
      'M30 Dummy (Single Hole)',
      'M30 Long Buffel',
      'M30 Tetra Edge',
      'M30 Tranc Cone',
    ],
    featured: true,
  },
  {
    name: 'Mist Eliminator',
    slug: 'mist-eliminator',
    description: 'Injection-moulded mist eliminator caps for battery vent openings. Traps acid mist and aerosols during charging cycles, preventing corrosion of surrounding components.',
    category: 'battery-components',
    specifications: { 'Material': 'Acid-resistant PP', 'Thread Sizes': 'M14, M18, M22, M30, MF4', 'Application': 'Battery acid mist containment', 'MOQ': '1000 pcs' },
    variants: ['M14', 'M18', 'M22', 'M30 (Threaded)', 'M30 (Without Thread)', 'MF4'],
    featured: false,
  },
  {
    name: 'Star Plug',
    slug: 'star-plug',
    description: 'Injection-moulded star plugs for battery venting applications. Designed with a star-pattern valve mechanism for controlled gas release. Available in standard and bobbin variants.',
    category: 'battery-components',
    specifications: { 'Material': 'Acid-resistant PP', 'Thread Size': 'M30', 'Application': 'Battery cell controlled venting', 'MOQ': '1000 pcs' },
    variants: ['M30 Star Plug', 'M30 Star Plug Bobbin'],
    featured: false,
  },
  {
    name: 'Filling Plug',
    slug: 'filling-plug',
    description: 'Injection-moulded filling plug for battery electrolyte maintenance access. Provides a secure, acid-resistant seal with easy removal for topping up.',
    category: 'battery-components',
    specifications: { 'Material': 'Acid-resistant PP', 'Thread Size': 'M18', 'Application': 'Battery electrolyte fill point' },
    variants: ['M18'],
    featured: false,
  },
  {
    name: 'Vent Cap',
    slug: 'vent-cap',
    description: 'Protective vent cap for battery cells. Seals the vent opening while allowing controlled gas escape during battery operation.',
    category: 'battery-components',
    specifications: { 'Material': 'Acid-resistant PP', 'Application': 'Battery cell vent sealing' },
    variants: ['Standard'],
    featured: false,
  },
  {
    name: 'M30 Long Buffel Bobbin',
    slug: 'm30-long-buffel-bobbin',
    description: 'Bobbin insert component for M30 Long Buffel vent plug assemblies. Manufactured to close tolerances for consistent assembly fitment.',
    category: 'battery-components',
    specifications: { 'Thread Size': 'M30', 'Application': 'Vent plug bobbin insert' },
    variants: ['Standard'],
    featured: false,
  },

  // ─── Terminal & Protection Components ────────────────────────────────────

  {
    name: 'Terminal Protector',
    slug: 'terminal-protector',
    description: 'Injection-moulded terminal protectors for battery terminals. Prevents accidental short circuits and mechanical damage to positive and negative terminals during handling and installation.',
    category: 'battery-components',
    specifications: { 'Material': 'PP / ABS', 'Application': 'Battery terminal protection', 'MOQ': '1000 pcs' },
    variants: ['ER Type', 'T-Gel Type'],
    featured: false,
  },
  {
    name: 'Terminal Cap',
    slug: 'terminal-cap',
    description: 'Protective cap for battery terminals, providing insulation and mechanical protection during storage, transport, and installation.',
    category: 'battery-components',
    specifications: { 'Material': 'PP', 'Application': 'Battery terminal insulation' },
    variants: ['Standard'],
    featured: false,
  },

  // ─── Handles ─────────────────────────────────────────────────────────────

  {
    name: 'Battery Handle',
    slug: 'battery-handle',
    description: 'Ergonomic injection-moulded handles for lead-acid battery assemblies. Provides a secure grip for safe handling and transportation of batteries across standard battery models.',
    category: 'battery-components',
    specifications: { 'Material': 'Impact-resistant PP', 'Application': 'Battery handling & transport', 'Feature': 'Ergonomic grip, high load capacity' },
    variants: ['N50/70', 'N100', 'NS40'],
    featured: false,
  },

  // ─── Miscellaneous ────────────────────────────────────────────────────────

  {
    name: 'Rubber Nozzle',
    slug: 'rubber-nozzle',
    description: 'Moulded rubber nozzle for battery fluid-related applications. Provides a flexible, sealed connection point resistant to acid and heat.',
    category: 'battery-components',
    specifications: { 'Material': 'Acid-resistant rubber', 'Application': 'Battery fluid transfer' },
    variants: ['Standard'],
    featured: false,
  },
  {
    name: 'Gurmut Washer',
    slug: 'gurmut-washer',
    description: 'Precision-moulded gurmut washer for battery assembly use. Provides a reliable seal and mechanical buffer at terminal connection points.',
    category: 'battery-components',
    specifications: { 'Application': 'Battery terminal sealing' },
    variants: ['Standard'],
    featured: false,
  },
];

const blogPosts = [
  {
    title: 'DFM Best Practices for Injection Moulded Parts',
    slug: 'dfm-best-practices-injection-molded-parts',
    excerpt: 'Design for Manufacturability (DFM) principles that reduce tooling costs and cycle times in injection moulding.',
    content: `<h2>What is DFM?</h2><p>Design for Manufacturability (DFM) is the practice of designing parts in a way that makes them easier and cheaper to manufacture.</p>`,
    category: 'injection-molding',
    author: 'Pavr Engineering Team',
    tags: ['DFM', 'injection molding', 'design', 'tooling'],
    featured: true,
    publishedAt: new Date('2026-03-15'),
  },
  {
    title: 'Understanding Battery Management Systems for EV Applications',
    slug: 'understanding-bms-ev-applications',
    excerpt: 'A technical overview of BMS architecture, cell balancing strategies, and safety features for electric vehicle battery packs.',
    content: `<h2>What is a Battery Management System?</h2><p>A BMS monitors and manages a rechargeable battery pack to ensure safe operation and maximum performance.</p>`,
    category: 'battery-tech',
    author: 'Pavr Battery Team',
    tags: ['BMS', 'EV', 'battery', 'lithium-ion'],
    featured: true,
    publishedAt: new Date('2026-02-28'),
  },
  {
    title: 'IATF 16949 Certification: What It Means for Automotive Suppliers',
    slug: 'iatf-16949-certification-automotive-suppliers',
    excerpt: 'How IATF 16949 certification demonstrates quality commitment and opens doors to global automotive OEMs.',
    content: `<h2>What is IATF 16949?</h2><p>IATF 16949 is the international quality management standard for the automotive supply chain.</p>`,
    category: 'industry-news',
    author: 'Pavr Quality Team',
    tags: ['IATF 16949', 'ISO', 'automotive', 'quality'],
    featured: false,
    publishedAt: new Date('2026-01-20'),
  },
];

async function seed() {
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);
  } else {
    console.log(`Products already seeded (${productCount} docs), skipping`);
  }

  const blogCount = await BlogPost.countDocuments();
  if (blogCount === 0) {
    await BlogPost.insertMany(blogPosts);
    console.log(`Seeded ${blogPosts.length} blog posts`);
  } else {
    console.log(`BlogPosts already seeded (${blogCount} docs), skipping`);
  }
}

module.exports = seed;
