const Product  = require('../models/Product');
const BlogPost = require('../models/BlogPost');

const products = [
  // Battery Components
  {
    name: 'Li-Ion 18650 Battery Pack Assembly',
    slug: 'li-ion-18650-battery-pack',
    description: 'High-capacity 18650 lithium-ion battery pack with integrated BMS for EV and energy storage applications.',
    category: 'battery-components',
    specifications: new Map([
      ['Cell Type', '18650 Cylindrical'],
      ['Nominal Voltage', '48V'],
      ['Capacity', '20Ah – 100Ah (custom)'],
      ['BMS Protection', 'Overcharge, Overdischarge, Short Circuit'],
      ['Operating Temp', '-20°C to 60°C'],
      ['IP Rating', 'IP65'],
    ]),
    featured: true,
  },
  {
    name: 'Prismatic LiFePO4 Module',
    slug: 'prismatic-lifepo4-module',
    description: 'Safe and thermally stable prismatic lithium iron phosphate modules for solar storage and telecom backup.',
    category: 'battery-components',
    specifications: new Map([
      ['Chemistry', 'LiFePO4'],
      ['Cycle Life', '2000+ cycles'],
      ['Voltage', '3.2V per cell'],
      ['Safety', 'UL2580 compliant'],
    ]),
    featured: false,
  },
  {
    name: 'Battery Management System (BMS) – 16S',
    slug: 'bms-16s-battery-management-system',
    description: 'Custom 16-series BMS with CAN communication, SOC estimation, and cell balancing for industrial battery packs.',
    category: 'battery-components',
    specifications: new Map([
      ['Series Configuration', '16S (48V system)'],
      ['Max Continuous Current', '200A'],
      ['Communication', 'CAN 2.0B / UART'],
      ['Balancing', 'Active & Passive'],
    ]),
    featured: true,
  },
  // Injection Molded Parts
  {
    name: 'Automotive Interior Trim Panel',
    slug: 'automotive-interior-trim-panel',
    description: 'High-precision ABS+PC blend interior trim panels with Class-A surface finish for passenger vehicle cabins.',
    category: 'injection-molded-parts',
    specifications: new Map([
      ['Material', 'ABS + PC Blend'],
      ['Surface Finish', 'Class A (Ra 0.4 μm)'],
      ['Tonnage', '500 Ton press'],
      ['Tolerance', '±0.05mm'],
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
      ['Wall Thickness', '1.5mm – 4mm'],
      ['Colors', 'Custom (RAL matched)'],
      ['Certifications', 'RoHS Compliant'],
    ]),
    featured: false,
  },
  {
    name: 'Medical Grade Syringe Component',
    slug: 'medical-grade-syringe-component',
    description: 'FDA-grade polypropylene syringe barrels and plungers manufactured in ISO Class 7 cleanroom conditions.',
    category: 'injection-molded-parts',
    specifications: new Map([
      ['Material', 'Medical Grade PP'],
      ['Environment', 'ISO Class 7 Cleanroom'],
      ['Sterilization', 'EtO / Gamma compatible'],
      ['Standard', 'ISO 13485'],
    ]),
    featured: true,
  },
  // Molds & Tooling
  {
    name: 'Multi-Cavity Hot Runner Mold (8-cavity)',
    slug: 'multi-cavity-hot-runner-mold-8-cavity',
    description: '8-cavity hot runner injection mold for high-volume consumer plastic parts, P20 steel with hardened inserts.',
    category: 'molds-and-tooling',
    specifications: new Map([
      ['Cavity Count', '8 Cavity'],
      ['Steel Grade', 'P20 / H13 inserts'],
      ['Runner System', 'Hot Runner (Synventive nozzles)'],
      ['Mold Life', '1,000,000+ shots'],
      ['Lead Time', '6–10 weeks'],
    ]),
    featured: true,
  },
  {
    name: '2-Plate Cold Runner Prototype Mold',
    slug: '2-plate-cold-runner-prototype-mold',
    description: 'Rapid prototype tooling for design validation. Aluminium or soft steel options, fast 2–3 week lead time.',
    category: 'molds-and-tooling',
    specifications: new Map([
      ['Type', '2-Plate Cold Runner'],
      ['Tooling Material', 'Aluminium 7075 / NAK80'],
      ['Lead Time', '2–3 weeks'],
      ['Shots', '5,000 – 50,000'],
    ]),
    featured: false,
  },
  {
    name: 'Insert Mold for Overmolding',
    slug: 'insert-mold-for-overmolding',
    description: 'Precision insert molds for rubber-over-plastic and metal-insert overmolding used in automotive sealing.',
    category: 'molds-and-tooling',
    specifications: new Map([
      ['Process', 'Insert Molding / Overmolding'],
      ['Materials', 'TPE over PP, TPU over ABS'],
      ['Insert Type', 'Metal, Threaded brass inserts'],
    ]),
    featured: false,
  },
  // Precision Components
  {
    name: 'CNC Machined Aluminum Bracket',
    slug: 'cnc-machined-aluminum-bracket',
    description: 'High-tolerance CNC machined 6061-T6 aluminum structural brackets for defense and aerospace sub-assemblies.',
    category: 'precision-components',
    specifications: new Map([
      ['Material', 'Aluminium 6061-T6'],
      ['Tolerance', '±0.01mm'],
      ['Surface', 'Hard Anodize / Chromate'],
      ['Certifications', 'AS9100 quality standard'],
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
      ['Diameter Range', '5mm – 100mm'],
      ['Surface Finish', 'Ra 0.2 μm (ground)'],
      ['Hardness', 'HRC 58-62 (optional nitriding)'],
    ]),
    featured: true,
  },
  {
    name: 'Plastic Gear Assembly',
    slug: 'plastic-gear-assembly',
    description: 'Acetal (POM) and Nylon precision gear assemblies for low-noise, low-friction applications in appliances.',
    category: 'precision-components',
    specifications: new Map([
      ['Material', 'POM (Delrin) / PA66'],
      ['Module', '0.5 – 3.0'],
      ['Pressure Angle', '20°'],
      ['Tolerance Grade', 'DIN 6'],
    ]),
    featured: false,
  },
];

const blogPosts = [
  {
    title: 'DFM Best Practices for Injection Molded Parts',
    slug: 'dfm-best-practices-injection-molded-parts',
    excerpt: 'Design for Manufacturability (DFM) principles that reduce tooling costs and cycle times in injection molding.',
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

module.exports = async function seedDatabase() {
  await Product.deleteMany({});
  await BlogPost.deleteMany({});
  await Product.insertMany(products);
  await BlogPost.insertMany(blogPosts);
  console.log(`Seeded ${products.length} products and ${blogPosts.length} blog posts`);
};
