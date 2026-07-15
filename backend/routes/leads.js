const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const auth = require('../middleware/auth');

// @route   POST /api/leads
// @desc    Register a new lead (newsletter signup)
// @access  Public
router.post('/', async (req, res) => {
  const { email, source } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email address is required' });
  }

  try {
    let lead = await Lead.findOne({ email });
    if (lead) {
      if (lead.status === 'unsubscribed') {
        lead.status = 'active';
        await lead.save();
        return res.json({ message: 'Welcome back! You have re-subscribed to our newsletter.' });
      }
      return res.status(400).json({ message: 'This email is already subscribed' });
    }

    lead = new Lead({
      email,
      source: source || 'newsletter'
    });

    await lead.save();
    res.status(201).json({ message: 'Thank you for subscribing to our newsletter!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/leads/unsubscribe
// @desc    Unsubscribe email from newsletter
// @access  Public
router.post('/unsubscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email address is required' });
  }

  try {
    const lead = await Lead.findOne({ email });
    if (!lead) {
      return res.status(404).json({ message: 'Email not found in our records' });
    }

    if (lead.status === 'unsubscribed') {
      return res.status(400).json({ message: 'This email is already unsubscribed' });
    }

    lead.status = 'unsubscribed';
    await lead.save();
    res.json({ message: 'You have been successfully unsubscribed from our newsletter.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/leads
// @desc    Get all leads
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/leads/:id
// @desc    Delete/Unsubscribe a lead
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
