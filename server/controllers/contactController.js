const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendContactNotification } = require('../services/emailService');

exports.createContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, phone, company, service, message } = req.body;

    const contact = await Contact.create({
      name: name?.trim(),
      email: email?.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      company: company?.trim() || undefined,
      service: service || 'general-inquiry',
      message,
    });

    // Send email notification (don't block the response)
    sendContactNotification(contact).catch((err) => {
      console.error('Email notification failed:', err.message);
    });

    res.status(201).json({
      success: true,
      data: {
        id: contact._id.toString(),
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        service: contact.service,
        message: contact.message,
        status: contact.status,
        createdAt: contact.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};
