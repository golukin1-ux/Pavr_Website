const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  email:   { type: String, required: true, lowercase: true, trim: true },
  phone:   { type: String, trim: true },
  company: { type: String, trim: true },
  service: {
    type: String,
    enum: ['injection-molding', 'mold-manufacturing', 'mold-repair', 'battery-components', 'general-inquiry'],
    default: 'general-inquiry',
  },
  message: { type: String, required: true },
  status:  { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contact', contactSchema);
