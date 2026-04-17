const rateLimit = require('express-rate-limit');

// 5 submissions per 15 min per IP — tight enough to stop spammers, loose enough for legit retries
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many submissions. Please try again in 15 minutes.',
  },
});

// Sane global limit for all API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

module.exports = { contactLimiter, apiLimiter };
