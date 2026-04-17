/**
 * One-time migration: patch image URLs into existing products and blog posts.
 * Run with: node scripts/add-images.js
 */
const db = require('../db/database');

const productImages = {
  'n100-battery-container-410x204x172':
    'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80',
  'n100-jumbo-battery-container':
    'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80',
  'battery-mudrest-flap-170x70x25':
    'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&auto=format&fit=crop&q=80',
  'battery-separator-170x50x15':
    'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&auto=format&fit=crop&q=80',
  'battery-side-packing-210x168x112':
    'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&auto=format&fit=crop&q=80',
  'battery-side-packing-240x163x185':
    'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&auto=format&fit=crop&q=80',
  'battery-terminal-protector-red-black':
    'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80',
  'vent-plug-22x2mm':
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80',
  'vent-plug-30x2mm-yellow':
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80',
  'automotive-interior-trim-panel':
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop&q=80',
  'pp-enclosure-housing':
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop&q=80',
  'custom-plastic-injection-moulded-part':
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop&q=80',
  'multi-cavity-hot-runner-mold-8-cavity':
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80',
  '2-plate-cold-runner-prototype-mold':
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80',
  'battery-component-injection-mold':
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80',
  'cnc-machined-aluminum-bracket':
    'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&auto=format&fit=crop&q=80',
  'stainless-steel-precision-shaft':
    'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&auto=format&fit=crop&q=80',
};

const blogImages = {
  'understanding-battery-container-manufacturing':
    'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80',
  'why-mold-maintenance-matters':
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80',
  'from-avr-to-pavr-our-journey':
    'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&auto=format&fit=crop&q=80',
};

const updateProduct = db.prepare('UPDATE products SET image = ? WHERE slug = ?');
const updateBlog    = db.prepare('UPDATE blog_posts SET image = ? WHERE slug = ?');

let updated = 0;
for (const [slug, url] of Object.entries(productImages)) {
  const r = updateProduct.run(url, slug);
  updated += r.changes;
}
console.log(`Updated ${updated} products`);

updated = 0;
for (const [slug, url] of Object.entries(blogImages)) {
  const r = updateBlog.run(url, slug);
  updated += r.changes;
}
console.log(`Updated ${updated} blog posts`);

console.log('Done.');
