const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ContactMessage = require('../models/ContactMessage');
const auth = require('../middleware/auth');

// Helper to send email alerts and client auto-replies using Nodemailer
const sendEmailAlert = async (name, email, phone, message, serviceRequired) => {
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587');
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const toEmail = process.env.ADMIN_EMAIL || 'sivaraman.official13@gmail.com';

  if (!smtpUser || !smtpPass) {
    console.log(`[EMAIL SIMULATION] SMTP credentials not set in .env. Logging details:`);
    console.log(`From: ${name} <${email}> (Phone: ${phone || 'N/A'})`);
    console.log(`Subject: New Contact Inquiry regarding "${serviceRequired}"`);
    console.log(`Message: ${message}`);
    console.log(`--------------------------------------------------`);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    // 1. Admin Alert Email (Professional HTML Template)
    const adminMailOptions = {
      from: `"StackKraft Form Intake" <${smtpUser}>`,
      replyTo: email,
      to: toEmail,
      subject: `[Intake Form] ${serviceRequired} - ${name}`,
      text: `New StackKraft Project Intake:\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nService: ${serviceRequired}\nMessage: ${message}`,
      html: `
        <div style="background-color: #0c0c0c; color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #1f2937;">
          <div style="border-bottom: 2px solid #ef4444; padding-bottom: 15px; margin-bottom: 25px; text-align: center;">
            <h2 style="color: #ffffff; font-weight: 800; letter-spacing: 2px; margin: 0;">STACKKRAFT INTAKE</h2>
            <span style="color: #ef4444; font-size: 11px; text-transform: uppercase; font-weight: bold; tracking-widest;">Project Notification Portal</span>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; text-align: left;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #1f2937; color: #9ca3af; width: 35%; font-size: 12px; font-weight: bold;">Client Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #1f2937; color: #ffffff; font-size: 13px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #1f2937; color: #9ca3af; font-size: 12px; font-weight: bold;">Email Address:</td>
              <td style="padding: 10px; border-bottom: 1px solid #1f2937; color: #3b82f6; font-size: 13px;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #1f2937; color: #9ca3af; font-size: 12px; font-weight: bold;">Phone Number:</td>
              <td style="padding: 10px; border-bottom: 1px solid #1f2937; color: #ffffff; font-size: 13px;">${phone || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #1f2937; color: #9ca3af; font-size: 12px; font-weight: bold;">Inquiry Service:</td>
              <td style="padding: 10px; border-bottom: 1px solid #1f2937; color: #ef4444; font-size: 13px; font-weight: bold;">${serviceRequired}</td>
            </tr>
          </table>
          <div style="background-color: #111827; padding: 20px; border-radius: 8px; border: 1px solid #1f2937; margin-bottom: 25px;">
            <h4 style="color: #ffffff; margin-top: 0; margin-bottom: 10px; font-size: 12px; text-transform: uppercase;">Message Details</h4>
            <p style="color: #d1d5db; font-size: 13px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="text-align: center; color: #6b7280; font-size: 10px; border-top: 1px solid #1f2937; padding-top: 15px;">
            Please follow up with this lead within 24 hours.
          </div>
        </div>
      `
    };

    // 2. Client Auto-Reply Email (Professional HTML Template)
    const clientMailOptions = {
      from: `"Sivaraman (StackKraft)" <${smtpUser}>`,
      to: email,
      subject: `Project Inquiry Received - StackKraft`,
      text: `Hello ${name},\n\nThank you for reaching out to StackKraft. We have received your project inquiry regarding "${serviceRequired}".\n\nI will review your requirements and follow up within 24 hours to schedule a consultation call.\n\nBest regards,\nSivaraman M\nFounder, StackKraft`,
      html: `
        <div style="background-color: #0c0c0c; color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #1f2937; text-align: left;">
          <div style="border-bottom: 2px solid #ef4444; padding-bottom: 15px; margin-bottom: 25px; text-align: center;">
            <h2 style="color: #ffffff; font-weight: 800; letter-spacing: 2px; margin: 0;">STACKKRAFT</h2>
            <span style="color: #9ca3af; font-size: 10px; text-transform: uppercase; font-weight: bold; tracking-widest;">Digital Engineering Partner</span>
          </div>
          <p style="font-size: 14px; line-height: 1.6; color: #ffffff;">Hello ${name},</p>
          <p style="font-size: 13px; line-height: 1.6; color: #d1d5db;">
            Thank you for reaching out to StackKraft. We have successfully received your project inquiry regarding the <strong>${serviceRequired}</strong> service.
          </p>
          <p style="font-size: 13px; line-height: 1.6; color: #d1d5db;">
            I will review your requirements, design scope, and budget targets personally. Expect a response or a calendar invite for a brief consultation call within <strong>24 hours</strong>.
          </p>
          
          <div style="background-color: #111827; border: 1px solid #1f2937; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h4 style="color: #ffffff; margin-top: 0; margin-bottom: 8px; font-size: 12px; text-transform: uppercase;">Submission Summary</h4>
            <span style="font-size: 12px; color: #9ca3af;">We recorded your message and will use it to prepare layout mockups for our call.</span>
          </div>

          <p style="font-size: 13px; line-height: 1.6; color: #d1d5db;">
            If you need immediate assistance or want to send more details, feel free to reply to this email directly or message me on <a href="https://wa.me/919342913781" style="color: #10b981; text-decoration: none; font-weight: bold;">WhatsApp</a>.
          </p>
          
          <div style="margin-top: 35px; padding-top: 20px; border-top: 1px solid #1f2937;">
            <p style="font-size: 13px; margin: 0; color: #ffffff; font-weight: bold;">Sivaraman M</p>
            <p style="font-size: 11px; margin: 2px 0 0 0; color: #ef4444; font-weight: bold; text-transform: uppercase;">Founder & Lead Architect, StackKraft</p>
            <p style="font-size: 11px; margin: 4px 0 0 0; color: #6b7280;">Ariyalur, Tamil Nadu, India | <a href="https://github.com/sivaraman192" style="color: #6b7280; text-decoration: underline;">GitHub</a></p>
          </div>
        </div>
      `
    };

    // Send both emails in parallel
    const [adminInfo, clientInfo] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);

    console.log(`[EMAIL SUCCESS] Admin notification: ${adminInfo.messageId} | Auto-reply: ${clientInfo.messageId}`);
  } catch (err) {
    console.error(`[EMAIL ERROR] Failed to send contact emails: ${err.message}`);
  }
};

// @route   POST /api/contact
// @desc    Submit a contact form
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, phone, message, serviceRequired } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required fields' });
  }

  try {
    const newMessage = new ContactMessage({
      name,
      email,
      phone,
      message,
      serviceRequired: serviceRequired || 'General Inquiry'
    });

    await newMessage.save();

    // Trigger Nodemailer mail out
    await sendEmailAlert(name, email, phone, message, serviceRequired || 'General Inquiry');

    res.status(201).json({ message: 'Message submitted successfully. We will contact you shortly!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/contact/:id
// @desc    Update message status (e.g., mark as read/replied)
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let message = await ContactMessage.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    message.status = req.body.status || 'read';
    await message.save();
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete a message
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
