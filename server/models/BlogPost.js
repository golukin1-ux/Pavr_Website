const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  excerpt:     { type: String, required: true, maxlength: 500 },
  content:     { type: String, required: true },
  category:    {
    type: String,
    enum: ['injection-molding', 'battery-tech', 'manufacturing', 'industry-news', 'company-news'],
    required: true,
  },
  author:      { type: String, default: 'Pavr Editorial Team' },
  tags:        [String],
  image:       { type: String },
  featured:    { type: Boolean, default: false },
  publishedAt: { type: Date, default: Date.now },
  createdAt:   { type: Date, default: Date.now },
});

blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ category: 1, publishedAt: -1 });

module.exports = mongoose.model('BlogPost', blogPostSchema);
