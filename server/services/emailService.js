const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendContactNotification(contact) {
  const serviceLabels = {
    'injection-molding': 'Injection Molding',
    'mold-manufacturing': 'Mold Manufacturing',
    'mold-repair': 'Mold Repair',
    'battery-components': 'Battery Components',
    'general-inquiry': 'General Inquiry',
  };

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0F2C59; padding: 24px; border-radius: 8px 8px 0 0;">
        <h2 style="color: #F7F6E7; margin: 0;">New Enquiry Received</h2>
      </div>
      <div style="background: #ffffff; padding: 24px; border: 1px solid #E5E0D9; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6B6560; font-weight: 600; width: 120px;">Name</td>
            <td style="padding: 8px 0; color: #1A1917;">${contact.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B6560; font-weight: 600;">Email</td>
            <td style="padding: 8px 0; color: #1A1917;"><a href="mailto:${contact.email}">${contact.email}</a></td>
          </tr>
          ${contact.phone ? `<tr><td style="padding: 8px 0; color: #6B6560; font-weight: 600;">Phone</td><td style="padding: 8px 0; color: #1A1917;"><a href="tel:${contact.phone}">${contact.phone}</a></td></tr>` : ''}
          ${contact.company ? `<tr><td style="padding: 8px 0; color: #6B6560; font-weight: 600;">Company</td><td style="padding: 8px 0; color: #1A1917;">${contact.company}</td></tr>` : ''}
          <tr>
            <td style="padding: 8px 0; color: #6B6560; font-weight: 600;">Service</td>
            <td style="padding: 8px 0; color: #1A1917;">${serviceLabels[contact.service] || contact.service}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #E5E0D9; margin: 16px 0;" />
        <p style="color: #6B6560; font-weight: 600; margin-bottom: 4px;">Message</p>
        <p style="color: #1A1917; line-height: 1.6; white-space: pre-wrap;">${contact.message}</p>
        <hr style="border: none; border-top: 1px solid #E5E0D9; margin: 16px 0;" />
        <p style="color: #8A857D; font-size: 12px;">Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST via pavrtoolsandtechnologiespvtltd.com</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Pavr Website" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: `New Enquiry: ${contact.name} — ${serviceLabels[contact.service] || contact.service}`,
    html,
    replyTo: contact.email,
  });
}

module.exports = { sendContactNotification };
