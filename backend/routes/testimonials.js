const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

// Seed default testimonials
const seedTestimonials = async () => {
  try {
    const count = await Testimonial.countDocuments();
    if (count === 0) {
      const defaultTestimonials = [
        {
          clientName: "Rajesh Kumar",
          role: "Founder & CEO",
          company: "EcoMart India",
          comment: "StackKraft built our e-commerce platform from scratch. Sivaraman's understanding of React and Node.js backend optimization helped us double our sales throughput. Highly recommended!",
          rating: 5,
          avatarUrl: "",
          isFeatured: true
        },
        {
          clientName: "Sarah Jenkins",
          role: "Marketing Director",
          company: "Apex Global",
          comment: "The animations on our new site are incredibly smooth. Sivaraman implemented a futuristic glassmorphic UI that our clients absolute love. Outstanding frontend engineering!",
          rating: 5,
          avatarUrl: "",
          isFeatured: true
        },
        {
          clientName: "Anand R",
          role: "Tech Advisor",
          company: "Tamil Nadu Startups",
          comment: "We needed a high-performance site that could rank locally in Jayankondam and Ariyalur. Sivaraman achieved incredible page load speeds and complete SEO setups. Our search traffic went up by 150%.",
          rating: 5,
          avatarUrl: "",
          isFeatured: true
        }
      ];
      await Testimonial.insertMany(defaultTestimonials);
      console.log("Seeded default testimonials successfully.");
    }
  } catch (err) {
    console.error(`Error seeding testimonials: ${err.message}`);
  }
};

seedTestimonials();

// @route   GET /api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/testimonials
// @desc    Create a testimonial
// @access  Private
router.post('/', auth, async (req, res) => {
  const { clientName, role, company, comment, rating, avatarUrl, isFeatured } = req.body;
  try {
    const newTestimonial = new Testimonial({
      clientName,
      role,
      company,
      comment,
      rating,
      avatarUrl,
      isFeatured
    });
    const testimonial = await newTestimonial.save();
    res.json(testimonial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/testimonials/:id
// @desc    Update a testimonial
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { clientName, role, company, comment, rating, avatarUrl, isFeatured } = req.body;
  try {
    let testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    if (clientName !== undefined) testimonial.clientName = clientName;
    if (role !== undefined) testimonial.role = role;
    if (company !== undefined) testimonial.company = company;
    if (comment !== undefined) testimonial.comment = comment;
    if (rating !== undefined) testimonial.rating = rating;
    if (avatarUrl !== undefined) testimonial.avatarUrl = avatarUrl;
    if (isFeatured !== undefined) testimonial.isFeatured = isFeatured;

    await testimonial.save();
    res.json(testimonial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete a testimonial
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
