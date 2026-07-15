const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

// Helper to seed default admin
const seedDefaultAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultUsername = process.env.ADMIN_USERNAME || 'sivaraman';
      const defaultPassword = process.env.ADMIN_PASSWORD || 'StackKraft2026!';
      const defaultEmail = process.env.ADMIN_EMAIL || 'sivaraman.official13@gmail.com';
      
      const newAdmin = new Admin({
        username: defaultUsername,
        password: defaultPassword,
        email: defaultEmail
      });
      await newAdmin.save();
      console.log(`Default admin account seeded successfully:`);
      console.log(`Username: ${defaultUsername}`);
      console.log(`Password: ${defaultPassword}`);
      console.log(`Email: ${defaultEmail}`);
    }
  } catch (err) {
    console.error(`Error seeding default admin: ${err.message}`);
  }
};

// Seed default admin immediately when route is imported
seedDefaultAdmin();

// @route   POST /api/auth/login
// @desc    Authenticate Admin & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check for admin
    let admin = await Admin.findOne({ username });
    if (!admin) {
      // Allow login via email as well
      admin = await Admin.findOne({ email: username });
    }

    if (!admin) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Create JWT Payload
    const payload = {
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email
      }
    };

    // Sign Token
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'stackkraft_super_secret_key_123',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          admin: {
            id: admin.id,
            username: admin.username,
            email: admin.email
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/auth/me
// @desc    Get current admin user details
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
