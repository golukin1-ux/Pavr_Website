const router = require('express').Router();
const { body } = require('express-validator');
const { createContact } = require('../controllers/contactController');
const { contactLimiter } = require('../middleware/rateLimiters');

router.post('/', contactLimiter, [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
], createContact);

module.exports = router;
