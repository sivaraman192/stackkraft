const express = require('express');
const router = express.Router();
const JobApplication = require('../models/JobApplication');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const path = require('path');

// @route   POST /api/careers/apply
// @desc    Submit job/internship application
// @access  Public
router.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    const { jobTitle, fullName, email, phone, coverLetter } = req.body;

    if (!jobTitle || !fullName || !email || !phone) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload your resume (.pdf, .doc, or .docx)' });
    }

    // Relative path or absolute path for resume access
    // We store the filename, and serve the directory statically in server.js
    const resumePath = `/uploads/${req.file.filename}`;

    const newApplication = new JobApplication({
      jobTitle,
      fullName,
      email,
      phone,
      resumePath,
      coverLetter: coverLetter || ''
    });

    await newApplication.save();

    console.log(`[CAREERS] New application submitted for: ${jobTitle} by ${fullName}`);
    res.status(201).json({ message: 'Your application has been submitted successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message || 'Server Error' });
  }
});

// @route   GET /api/careers/applications
// @desc    Get all applications
// @access  Private
router.get('/applications', auth, async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/careers/applications/:id
// @desc    Update application status
// @access  Private
router.put('/applications/:id', auth, async (req, res) => {
  try {
    let application = await JobApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    application.status = req.body.status || 'reviewed';
    await application.save();
    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/careers/applications/:id
// @desc    Delete an application
// @access  Private
router.delete('/applications/:id', auth, async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    await JobApplication.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
