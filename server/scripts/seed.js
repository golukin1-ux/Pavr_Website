require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Product  = require('../models/Product');
const BlogPost = require('../models/BlogPost');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pavr_website';

const products = [
  // ─── Battery Components (real products from old website) ─────────────────

  {
    name: 'N100 Battery Container (410×204×172 mm)',
    slug: 'n100-battery-container-410x204x172',
    description: 'Standard N100 battery container manufactured from high-grade polypropylene. Designed for industrial and automotive lead-acid batteries, offering excellent chemical resistance and structural rigidity.',
    category: 'battery-components',
    specifications: new Map([
      ['Dimensions', '410 × 204 × 172 mm'],
      ['Model', 'N100'],
      ['Material', 'Polypropylene (PP)'],
      ['Application', 'Lead-acid battery housing'],
      ['Chemical Resistance', 'Acid & alkali resistant'],
      ['MOQ', '500 pcs'],
    ]),
    featured: true,
  },
  {
    name: 'N100 Jumbo Battery Container',
    slug: 'n100-jumbo-battery-container',
    description: 'Heavy-duty jumbo variant of the N100 battery container for large-capacity industrial battery applications. Injection moulded for tight dimensional consistency and leak-free fitment.',
    category: 'battery-components',
    specifications: new Map([
      ['Model', 'N100 Jumbo'],
      ['Material', 'Polypropylene (PP)'],
      ['Application', 'Industrial lead-acid batteries'],
      ['Feature', 'Heavy-duty, leak-free construction'],
      ['MOQ', '500 pcs'],
    ]),
    featured: true,
  },
  {
    name: 'Battery Mudrest Flap (170×70×25 mm)',
    slug: 'battery-mudrest-flap-170x70x25',
    description: 'Durable and unbreakable plastic battery mudrest flap used to secure and insulate battery bases inside battery trays. Precision injection moulded from impact-resistant plastic.',
    category: 'battery-components',
    specifications: new Map([
      ['Dimensions', '170 × 70 × 25 mm'],
      ['Material', 'Impact-resistant Plastic (PP)'],
      ['Feature', 'Durable & unbreakable'],
      ['Application', 'Battery tray base insulation'],
      ['MOQ', '1000 pcs'],
    ]),
    featured: false,
  },
  {
    name: 'Battery Separator (170×50×1.5 mm)',
    slug: 'battery-separator-170x50x15',
    description: 'High-quality thin plastic separator designed to electrically isolate individual cells within a battery pack. Prevents short circuits and extends battery life.',
    category: 'battery-components',
    specifications: new Map([
      ['Dimensions', '170 × 50 × 1.5 mm'],
      ['Material', 'High-quality Plastic'],
      ['Application', 'Cell isolation in battery packs'],
      ['Feature', 'Electrically insulating, lightweight'],
      ['MOQ', '2000 pcs'],
    ]),
    featured: false,
  },
  {
    name: 'Battery Side Packing (210×168×11.2 mm)',
    slug: 'battery-side-packing-210x168x112',
    description: 'Precision-moulded plastic side packing component that fits between battery cells and the outer casing, providing cushioning, alignment, and vibration damping in automotive battery assemblies.',
    category: 'battery-components',
    specifications: new Map([
      ['Dimensions', '210 × 168 × 11.2 mm'],
      ['Material', 'Durable Plastic (PP)'],
      ['Application', 'Automotive battery side insulation'],
      ['Feature', 'Vibration damping, precise fit'],
      ['MOQ', '500 pcs'],
    ]),
    featured: true,
  },
  {
    name: 'Battery Side Packing (240×163×18.5 mm)',
    slug: 'battery-side-packing-240x163x185',
    description: 'Larger profile battery side packing for heavy-duty and truck battery applications. Provides structural support and electrical isolation between adjacent cells and the battery housing.',
    category: 'battery-components',
    specifications: new Map([
      ['Dimensions', '240 × 163 × 18.5 mm'],
      ['Material', 'Durable Plastic (PP)'],
      ['Application', 'Truck & heavy-duty battery assemblies'],
      ['Feature', 'High structural strength'],
      ['MOQ', '500 pcs'],
    ]),
    featured: false,
  },
  {
    name: 'Battery Terminal Protector (Red & Black)',
    slug: 'battery-terminal-protector-red-black',
    description: 'Colour-coded terminal protector covers for positive (red) and negative (black) battery terminals. Prevents accidental short circuits, corrosion ingress, and mechanical damage during transport and installation.',
    category: 'battery-components',
    specifications: new Map([
      ['Colors', 'Red (positive) & Black (negative)'],
      ['Material', 'Flexible Plastic / PP'],
      ['Application', 'Automotive & industrial batteries'],
      ['Feature', 'Anti-short-circuit, corrosion protection'],
      ['MOQ', '2000 pcs (1000 per colour)'],
    ]),
    featured: true,
  },
  {
    name: 'Vent Plug – 22×2 mm (ABS, Powder Coated)',
    slug: 'vent-plug-22x2mm',
    description: 'Compact ABS plastic vent plug for lead-acid battery cells. Allows controlled off-gassing during charging while preventing electrolyte splash. Powder-coated finish for chemical durability.',
    category: 'battery-components',
    specifications: new Map([
      ['Dimensions', '22 × 2 mm'],
      ['Material', 'ABS Plastic'],
      ['Surface Finish', 'Powder Coated'],
      ['Application', 'Lead-acid battery cell venting'],
      ['Feature', 'Splash-proof, chemical resistant'],
      ['MOQ', '5000 pcs'],
    ]),
    featured: false,
  },
  {
    name: 'Vent Plug – 30×2 mm (ABS, Yellow)',
    slug: 'vent-plug-30x2mm-yellow',
    description: 'Larger ABS vent plug in distinctive yellow for easy identification on battery maintenance. Provides reliable pressure relief and gas venting for industrial lead-acid battery cells.',
    category: 'battery-components',
    specifications: new Map([
      ['Dimensions', '30 × 2 mm'],
      ['Material', 'ABS Plastic'],
      ['Color', 'Yellow'],
      ['Application', 'Industrial lead-acid battery venting'],
      ['Feature', 'Easy identification, pressure relief'],
      ['MOQ', '5000 pcs'],
    ]),
    featured: false,
  },

  // ─── Injection Moulded Parts ─────────────────────────────────────────────

  {
    name: 'Automotive Interior Trim Panel',
    slug: 'automotive-interior-trim-panel',
    description: 'High-precision ABS+PC blend interior trim panels with Class-A surface finish for passenger vehicle cabins.',
    category: 'injection-molded-parts',
    specifications: new Map([
      ['Material', 'ABS + PC Blend'],
      ['Surface Finish', 'Class A (Ra 0.4 μm)'],
      ['Tonnage', '500 Ton press'],
      ['Tolerance', '±0.05 mm'],
    ]),
    featured: true,
  },
  {
    name: 'PP Enclosure Housing',
    slug: 'pp-enclosure-housing',
    description: 'Polypropylene enclosure housings for electronic devices, available with EMI shielding and IP rating options.',
    category: 'injection-molded-parts',
    specifications: new Map([
      ['Material', 'PP / PP+GF30'],
      ['Wall Thickness', '1.5 mm – 4 mm'],
      ['Colors', 'Custom (RAL matched)'],
      ['Certifications', 'RoHS Compliant'],
    ]),
    featured: false,
  },
  {
    name: 'Custom Plastic Injection Moulded Part',
    slug: 'custom-plastic-injection-moulded-part',
    description: 'Bespoke injection moulded plastic components produced to customer drawings. Materials include PP, ABS, PC, POM, Nylon, and glass-filled variants. Full DFM review provided before tooling.',
    category: 'injection-molded-parts',
    specifications: new Map([
      ['Materials', 'PP, ABS, PC, POM, PA66, GF variants'],
      ['Tolerance', '±0.05 mm standard'],
      ['Press Range', '80 T – 1250 T'],
      ['Surface Finish', 'Textured / Polished / Painted'],
      ['Lead Time', '3–6 weeks post tool approval'],
    ]),
    featured: true,
  },

  // ─── Molds & Tooling ─────────────────────────────────────────────────────

  {
    name: 'Multi-Cavity Hot Runner Mold (8-Cavity)',
    slug: 'multi-cavity-hot-runner-mold-8-cavity',
    description: '8-cavity hot runner injection mold for high-volume consumer plastic parts. P20 steel base with hardened H13 inserts, Synventive hot runner nozzles.',
    category: 'molds-and-tooling',
    specifications: new Map([
      ['Cavity Count', '8 Cavity'],
      ['Steel Grade', 'P20 / H13 inserts'],
      ['Runner System', 'Hot Runner (Synventive)'],
      ['Mold Life', '1,000,000+ shots'],
      ['Lead Time', '6–10 weeks'],
    ]),
    featured: true,
  },
  {
    name: '2-Plate Cold Runner Prototype Mold',
    slug: '2-plate-cold-runner-prototype-mold',
    description: 'Rapid prototype tooling for design validation. Aluminium or soft-steel options with fast 2–3 week lead time for first samples.',
    category: 'molds-and-tooling',
    specifications: new Map([
      ['Type', '2-Plate Cold Runner'],
      ['Tooling Material', 'Aluminium 7075 / NAK80'],
      ['Lead Time', '2–3 weeks'],
      ['Shot Life', '5,000 – 50,000'],
    ]),
    featured: false,
  },
  {
    name: 'Battery Component Injection Mold',
    slug: 'battery-component-injection-mold',
    description: 'Purpose-built injection molds for battery containers, side packing, vent plugs, separators, and terminal protectors. Designed for polypropylene and ABS with acid-resistant steel finishes.',
    category: 'molds-and-tooling',
    specifications: new Map([
      ['Application', 'Battery containers, separators, vent plugs'],
      ['Steel Grade', 'P20 / 718H (corrosion treated)'],
      ['Material Compatibility', 'PP, ABS'],
      ['Cavity Count', '1 to 4 cavity'],
      ['Lead Time', '4–8 weeks'],
    ]),
    featured: true,
  },

  // ─── Precision Components ────────────────────────────────────────────────

  {
    name: 'CNC Machined Aluminium Bracket',
    slug: 'cnc-machined-aluminum-bracket',
    description: 'High-tolerance CNC machined 6061-T6 aluminium structural brackets for defence and industrial sub-assemblies.',
    category: 'precision-components',
    specifications: new Map([
      ['Material', 'Aluminium 6061-T6'],
      ['Tolerance', '±0.01 mm'],
      ['Surface', 'Hard Anodize / Chromate'],
      ['Certification', 'AS9100 quality standard'],
    ]),
    featured: false,
  },
  {
    name: 'Stainless Steel Precision Shaft',
    slug: 'stainless-steel-precision-shaft',
    description: 'Ground and polished SS304/316 precision shafts for pump, motor, and actuator assemblies.',
    category: 'precision-components',
    specifications: new Map([
      ['Material', 'SS304 / SS316'],
      ['Diameter Range', '5 mm – 100 mm'],
      ['Surface Finish', 'Ra 0.2 μm (ground)'],
      ['Hardness', 'HRC 58–62 (optional nitriding)'],
    ]),
    featured: true,
  },
];

const blogPosts = [
  {
    title: 'DFM Best Practices for Injection Molded Parts',
    slug: 'dfm-best-practices-injection-molded-parts',
    excerpt: 'Design for Manufacturability (DFM) principles that reduce tooling costs and cycle times in injection molding. Learn how proper wall thickness, draft angles, and gate placement can save time and money.',
    content: `<h2>What is DFM?</h2>
<p>Design for Manufacturability (DFM) is the practice of designing parts in a way that makes them easier and cheaper to manufacture. In injection molding, this means considering wall thickness, draft angles, undercuts, and gate placement during the design phase.</p>
<h2>Key DFM Principles</h2>
<h3>1. Uniform Wall Thickness</h3>
<p>Maintain consistent wall thickness throughout the part (typically 1.5mm–4mm for most thermoplastics). Variations cause uneven cooling, leading to sink marks, warpage, and internal stresses.</p>
<h3>2. Draft Angles</h3>
<p>Add 1°–2° draft angle on all vertical walls to allow easy ejection from the mold. Without draft, parts stick to the tool and get damaged during ejection.</p>
<h3>3. Avoid Undercuts</h3>
<p>Undercuts require side actions (lifters/sliders) that add tooling cost and complexity. Where possible, redesign features to eliminate undercuts.</p>
<h3>4. Rib and Gusset Design</h3>
<p>Use ribs instead of thick walls for structural strength. Rib thickness should be 50–60% of adjacent wall thickness to prevent sink marks.</p>
<h2>Conclusion</h2>
<p>Early DFM review with your manufacturer can reduce tooling costs by 20–40% and shorten lead times significantly. Partner with Pavr for a free DFM review on your next project.</p>`,
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
    content: `<h2>What is a Battery Management System?</h2>
<p>A Battery Management System (BMS) is the electronic control unit that monitors and manages a rechargeable battery pack. It ensures safe operation, maximizes performance, and extends battery life.</p>
<h2>Core BMS Functions</h2>
<h3>Cell Monitoring</h3>
<p>The BMS continuously monitors individual cell voltages, temperatures, and state of charge (SOC). Out-of-balance cells reduce overall pack capacity and can cause premature failure.</p>
<h3>Cell Balancing</h3>
<p>Two balancing methods exist: passive balancing (dissipates excess energy as heat) and active balancing (transfers energy between cells). Active balancing is more efficient but costlier.</p>
<h3>Protection Features</h3>
<p>A robust BMS protects against overcharge, over-discharge, overcurrent, short circuit, and thermal runaway — critical for EV safety standards.</p>
<h2>Pavr's BMS Solutions</h2>
<p>Our 16S BMS supports up to 200A continuous current with CAN 2.0B communication for seamless integration with vehicle controllers. Contact us for custom configurations.</p>`,
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
    content: `<h2>What is IATF 16949?</h2>
<p>IATF 16949 is the international quality management standard for the automotive supply chain, replacing the older ISO/TS 16949. It is required by most Tier-1 automotive OEMs worldwide.</p>
<h2>Why It Matters</h2>
<p>Certification to IATF 16949 demonstrates that a supplier has robust quality management systems, continuous improvement processes, and defect prevention strategies in place — not just defect detection.</p>
<h2>Key Requirements</h2>
<ul>
<li>Production Part Approval Process (PPAP)</li>
<li>Advanced Product Quality Planning (APQP)</li>
<li>Failure Mode and Effects Analysis (FMEA)</li>
<li>Statistical Process Control (SPC)</li>
<li>Measurement System Analysis (MSA)</li>
</ul>
<h2>Pavr's Commitment to Quality</h2>
<p>Pavr maintains rigorous quality systems aligned with IATF 16949 requirements, ensuring our automotive customers receive components that meet the highest standards every time.</p>`,
    category: 'industry-news',
    author: 'Pavr Quality Team',
    tags: ['IATF 16949', 'ISO', 'automotive', 'quality'],
    featured: false,
    publishedAt: new Date('2026-01-20'),
  },
  {
    title: 'Pavr Expands Battery Component Line for Solar Storage Market',
    slug: 'pavr-expands-battery-solar-storage',
    excerpt: 'Pavr Tools and Technologies announces expansion into LiFePO4 battery modules targeting the growing solar storage sector in India.',
    content: `<h2>Expanding Into Solar Storage</h2>
<p>Pavr Tools and Technologies Pvt Ltd is proud to announce the expansion of our battery component manufacturing line to include LiFePO4 (Lithium Iron Phosphate) modules specifically designed for solar energy storage applications.</p>
<h2>Why LiFePO4 for Solar?</h2>
<p>LiFePO4 chemistry offers superior cycle life (2000+ cycles), excellent thermal stability, and inherent safety — making it the preferred choice for stationary energy storage systems, rooftop solar installations, and backup power solutions.</p>
<h2>New Product Range</h2>
<p>Our new range includes 5kWh, 10kWh, and 20kWh modular battery systems compatible with all major solar inverter brands. Custom configurations are available for commercial and industrial applications.</p>
<h2>Partnership Opportunities</h2>
<p>We are actively seeking partnerships with solar EPC companies and system integrators. Contact our team to discuss OEM manufacturing arrangements and volume pricing.</p>`,
    category: 'company-news',
    author: 'Pavr Editorial Team',
    tags: ['expansion', 'solar', 'LiFePO4', 'company news'],
    featured: false,
    publishedAt: new Date('2025-12-10'),
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  await Product.deleteMany({});
  await BlogPost.deleteMany({});
  console.log('Cleared existing data');

  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products`);

  await BlogPost.insertMany(blogPosts);
  console.log(`Seeded ${blogPosts.length} blog posts`);

  await mongoose.disconnect();
  console.log('Done. Disconnected from MongoDB.');
}

seed().catch(err => { console.error(err); process.exit(1); });
