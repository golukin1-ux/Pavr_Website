const BlogPost = require('../models/BlogPost');

function toPost(p) {
  return {
    id: p._id.toString(),
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category,
    author: p.author,
    tags: p.tags || [],
    image: p.image,
    featured: !!p.featured,
    publishedAt: p.publishedAt,
    createdAt: p.createdAt,
  };
}

exports.listPosts = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 9 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const filter = {};
    if (category) filter.category = category;

    const [total, posts] = await Promise.all([
      BlogPost.countDocuments(filter),
      BlogPost.find(filter)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
    ]);

    res.json({ success: true, data: posts.map(toPost), total, page: pageNum, limit: limitNum });
  } catch (err) {
    next(err);
  }
};

exports.getPostBySlug = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug }).lean();
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: toPost(post) });
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, slug, excerpt, content, category, author, tags, image, featured } = req.body;

    const post = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
      category,
      author: author || 'Pavr Editorial Team',
      tags: tags || [],
      image: image || undefined,
      featured: !!featured,
    });

    res.status(201).json({ success: true, data: toPost(post.toObject()) });
  } catch (err) {
    next(err);
  }
};
