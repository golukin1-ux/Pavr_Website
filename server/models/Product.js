const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, required: true },
  category:    {
    type: String,
    enum: ['battery-components', 'injection-molded-parts', 'molds-and-tooling', 'precision-components'],
    required: true,
    index: true,
  },
  specifications: { type: Map, of: String },
  variants:       [{ type: String }],
  image:          { type: String },
  featured:       { type: Boolean, default: false, index: true },
  createdAt:      { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
