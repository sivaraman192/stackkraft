const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const Lead = require('../models/Lead');
const ContactMessage = require('../models/ContactMessage');
const JobApplication = require('../models/JobApplication');
const auth = require('../middleware/auth');

// @route   GET /api/analytics/dashboard
// @desc    Get dashboard counts and chart figures
// @access  Private
router.get('/dashboard', auth, async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalBlogs = await Blog.countDocuments();
    const totalServices = await Service.countDocuments();
    const totalTestimonials = await Testimonial.countDocuments();
    const totalLeads = await Lead.countDocuments();
    const totalMessages = await ContactMessage.countDocuments();
    const unreadMessages = await ContactMessage.countDocuments({ status: 'unread' });
    const totalApplications = await JobApplication.countDocuments();

    // Get recent items
    const recentMessages = await ContactMessage.find().sort({ createdAt: -1 }).limit(5);
    const recentApplications = await JobApplication.find().sort({ createdAt: -1 }).limit(5);
    const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);

    // Dynamic Monthly Chart Data (Mocking last 6 months based on actual entries or generic metrics for visualization)
    const chartData = [
      { name: 'Jan', Leads: Math.max(5, Math.round(totalLeads * 0.1)), Messages: Math.max(2, Math.round(totalMessages * 0.15)) },
      { name: 'Feb', Leads: Math.max(8, Math.round(totalLeads * 0.15)), Messages: Math.max(4, Math.round(totalMessages * 0.12)) },
      { name: 'Mar', Leads: Math.max(12, Math.round(totalLeads * 0.22)), Messages: Math.max(7, Math.round(totalMessages * 0.18)) },
      { name: 'Apr', Leads: Math.max(18, Math.round(totalLeads * 0.25)), Messages: Math.max(9, Math.round(totalMessages * 0.2)) },
      { name: 'May', Leads: Math.max(25, Math.round(totalLeads * 0.35)), Messages: Math.max(14, Math.round(totalMessages * 0.25)) },
      { name: 'Jun', Leads: totalLeads, Messages: totalMessages }
    ];

    res.json({
      metrics: {
        totalProjects,
        totalBlogs,
        totalServices,
        totalTestimonials,
        totalLeads,
        totalMessages,
        unreadMessages,
        totalApplications
      },
      recent: {
        messages: recentMessages,
        applications: recentApplications,
        leads: recentLeads
      },
      chartData
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
