const Product = require('../models/Product');

function toProduct(p) {
  const specs = p.specifications instanceof Map
    ? Object.fromEntries(p.specifications)
    : (p.specifications || {});
  return {
    id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    description: p.description,
    category: p.category,
    specifications: specs,
    image: p.image,
    featured: !!p.featured,
    createdAt: p.createdAt,
  };
}

exports.listProducts = async (req, res, next) => {
  try {
    const { category, featured, page = 1, limit = 12 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const filter = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    const [total, products] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter)
        .sort({ featured: -1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
    ]);

    res.json({ success: true, data: products.map(toProduct), total, page: pageNum, limit: limitNum });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const query = isObjectId ? { $or: [{ _id: id }, { slug: id }] } : { slug: id };
    const product = await Product.findOne(query).lean();
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: toProduct(product) });
  } catch (err) {
    next(err);
  }
};
