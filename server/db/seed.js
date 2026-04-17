const Product = require('../models/Product');
const BlogPost = require('../models/BlogPost');

const products = [
  {
    name: 'N100 Battery Container (410×204×172 mm)',
    slug: 'n100-battery-container-410x204x172',
    description: 'Standard N100 battery container manufactured from high-grade polypropylene. Designed for industrial and automotive lead-acid batteries, offering excellent chemical resistance and structural rigidity.',
    category: 'battery-components',
    specifications: { 'Dimensions': '410 × 204 × 172 mm', 'Model': 'N100', 'Material': 'Polypropylene (PP)', 'Application': 'Lead-acid battery housing', 'Chemical Resistance': 'Acid & alkali resistant', 'MOQ': '500 pcs' },
    featured: true,
  },
  {
    name: 'N100 Jumbo Battery Container',
    slug: 'n100-jumbo-battery-container',
    description: 'Heavy-duty jumbo variant of the N100 battery container for large-capacity industrial battery applications. Injection moulded for tight dimensional consistency and leak-free fitment.',
    category: 'battery-components',
    specifications: { 'Model': 'N100 Jumbo', 'Material': 'Polypropylene (PP)', 'Application': 'Industrial lead-acid batteries', 'Feature': 'Heavy-duty, leak-free construction', 'MOQ': '500 pcs' },
    featured: true,
  },
  {
    name: 'Battery Mudrest Flap (170×70×25 mm)',
    slug: 'battery-mudrest-flap-170x70x25',
    description: 'Durable and unbreakable plastic battery mudrest flap used to secure and insulate battery bases inside battery trays. Precision injection moulded from impact-resistant polypropylene.',
    category: 'battery-components',
    specifications: { 'Dimensions': '170 × 70 × 25 mm', 'Material': 'Impact-resistant PP', 'Feature': 'Durable & unbreakable', 'Application': 'Battery tray base insulation', 'MOQ': '1000 pcs' },
    featured: false,
  },
  {
    name: 'Battery Separator (170×50×1.5 mm)',
    slug: 'battery-separator-170x50x15',
    description: 'High-quality thin plastic separator that electrically isolates individual cells within a battery pack, preventing short circuits and extending battery service life.',
    category: 'battery-components',
    specifications: { 'Dimensions': '170 × 50 × 1.5 mm', 'Material': 'High-quality Plastic (PP)', 'Application': 'Cell isolation in battery packs', 'Feature': 'Electrically insulating, lightweight', 'MOQ': '2000 pcs' },
    featured: false,
  },
  {
    name: 'Battery Side Packing (210×168×11.2 mm)',
    slug: 'battery-side-packing-210x168x112',
    description: 'Precision-moulded plastic side packing that fits between battery cells and the outer casing, providing cushioning, alignment, and vibration damping in automotive battery assemblies.',
    category: 'battery-components',
    specifications: { 'Dimensions': '210 × 168 × 11.2 mm', 'Material': 'Durable Plastic (PP)', 'Application': 'Automotive battery side insulation', 'Feature': 'Vibration damping, precise fit', 'MOQ': '500 pcs' },
    featured: true,
  },
  {
    name: 'Battery Side Packing (240×163×18.5 mm)',
    slug: 'battery-side-packing-240x163x185',
    description: 'Larger profile side packing for heavy-duty and truck battery assemblies. Provides structural support and electrical isolation between adjacent cells and the housing.',
    category: 'battery-components',
    specifications: { 'Dimensions': '240 × 163 × 18.5 mm', 'Material': 'Durable Plastic (PP)', 'Application': 'Truck & heavy-duty battery assemblies', 'Feature': 'High structural strength', 'MOQ': '500 pcs' },
    featured: false,
  },
  {
    name: 'Battery Terminal Protector (Red & Black)',
    slug: 'battery-terminal-protector-red-black',
    description: 'Colour-coded terminal protector covers for positive (red) and negative (black) battery terminals. Prevents accidental short circuits, corrosion, and mechanical damage during transport and installation.',
    category: 'battery-components',
    specifications: { 'Colors': 'Red (positive) & Black (negative)', 'Material': 'Flexible PP', 'Application': 'Automotive & industrial batteries', 'Feature': 'Anti-short-circuit, corrosion protection', 'MOQ': '2000 pcs (1000 per colour)' },
    featured: true,
  },
  {
    name: 'Vent Plug – 22×2 mm',
    slug: 'vent-plug-22x2mm',
    description: 'Compact ABS plastic vent plug for lead-acid battery cells. Allows controlled off-gassing during charging while preventing electrolyte splash. Powder-coated finish for chemical durability.',
    category: 'battery-components',
    specifications: { 'Dimensions': '22 × 2 mm', 'Material': 'ABS Plastic', 'Surface Finish': 'Powder Coated', 'Application': 'Lead-acid battery cell venting', 'Feature': 'Splash-proof, chemical resistant', 'MOQ': '5000 pcs' },
    featured: false,
  },
  {
    name: 'Vent Plug – 30×2 mm (Yellow)',
    slug: 'vent-plug-30x2mm-yellow',
    description: 'Larger ABS vent plug in distinctive yellow for easy identification. Provides reliable pressure relief and gas venting for industrial lead-acid battery cells.',
    category: 'battery-components',
    specifications: { 'Dimensions': '30 × 2 mm', 'Material': 'ABS Plastic', 'Color': 'Yellow', 'Application': 'Industrial lead-acid battery venting', 'Feature': 'Easy identification, pressure relief', 'MOQ': '5000 pcs' },
    featured: false,
  },
];

const blogPosts = [
  {
    title: 'Understanding Battery Container Manufacturing',
    slug: 'understanding-battery-container-manufacturing',
    excerpt: 'A deep dive into how precision injection molding produces reliable battery containers for automotive and industrial applications.',
    content: 'Battery containers are the backbone of every lead-acid battery assembly. At Pavr Tools & Technologies, we manufacture N100 and jumbo-variant containers from high-grade polypropylene using multi-cavity injection molds.\n\nOur process ensures dimensional consistency within ±0.05 mm, acid resistance, and leak-free fitment — critical requirements for battery manufacturers like Eastman Auto & Power and Livguard Energy.\n\nKey factors in battery container quality:\n- Material grade selection (homopolymer vs copolymer PP)\n- Mold cooling channel design for uniform shrinkage\n- Gate placement to avoid weld lines near stress points\n- Post-mold inspection with CMM verification\n\nWith our relocation to Reliance MET City, Jhajjar, we have expanded capacity to serve higher volumes while maintaining the same quality standards our partners expect.',
    category: 'manufacturing',
    author: 'Pavr Editorial Team',
    tags: ['battery', 'injection-molding', 'manufacturing'],
    featured: true,
  },
  {
    title: 'Why Mold Maintenance Matters for Production Uptime',
    slug: 'why-mold-maintenance-matters',
    excerpt: 'Preventive mold maintenance can save weeks of downtime. Here is how we approach mold repair and servicing.',
    content: 'A single mold failure can halt an entire production line. That is why preventive maintenance is not optional — it is a production strategy.\n\nAt Pavr, our mold repair division handles:\n- Emergency cavity and core welding (24–48 hr turnaround)\n- Hot runner system diagnostics and repair\n- Scheduled preventive maintenance programs\n- Surface re-polishing and texture restoration\n\nWe recommend a maintenance check every 50,000 shots for standard molds, and every 25,000 shots for high-cavity or hot runner tools.\n\nOur in-house CNC, EDM, and wire cutting capabilities mean we can handle most repairs without outsourcing — keeping your lead times short and costs predictable.',
    category: 'manufacturing',
    author: 'Pavr Editorial Team',
    tags: ['mold-repair', 'maintenance', 'production'],
    featured: false,
  },
  {
    title: 'From AVR to Pavr: Our Journey Since 2010',
    slug: 'from-avr-to-pavr-our-journey',
    excerpt: 'How a small mold shop in Gurugram grew into a full-scale manufacturing operation now based in Reliance MET City, Jhajjar.',
    content: 'In 2010, AVR Tools and Technologies opened its doors in Gurugram with a simple mission: build precision injection molds that manufacturers could depend on.\n\nOver the next decade, we expanded into battery component manufacturing, set up a new plant in Sarai Alawardi, and earned the trust of companies like Genus Innovation, Highflow Industries, and Deepak International.\n\nIn 2025, we relocated to Reliance MET City in Jhajjar and officially rebranded as Pavr Tools & Technologies Private Limited. The new facility gives us room to grow — more machines, larger clean-room areas, and dedicated lines for battery component production.\n\nLooking ahead, we are pursuing IATF 16949 certification in 2026 to qualify for global automotive OEM supply chains. The foundation we built as AVR continues to support everything we do as Pavr.',
    category: 'company-news',
    author: 'Pavr Editorial Team',
    tags: ['company', 'history', 'rebrand'],
    featured: true,
  },
];

async function seed() {
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);
  } else {
    console.log(`Products collection already has ${productCount} docs, skipping`);
  }

  const blogCount = await BlogPost.countDocuments();
  if (blogCount === 0) {
    await BlogPost.insertMany(blogPosts);
    console.log(`Seeded ${blogPosts.length} blog posts`);
  } else {
    console.log(`BlogPosts collection already has ${blogCount} docs, skipping`);
  }
}

module.exports = seed;
