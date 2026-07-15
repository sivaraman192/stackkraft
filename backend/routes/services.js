const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');

// Seed services on boot if empty
const seedServices = async () => {
  try {
    const count = await Service.countDocuments();
    if (count === 0) {
      const defaultServices = [
        {
          title: "Website Development",
          description: "Full-scale customized corporate and personal website solutions tailored to scale business growth and capture targeted leads.",
          benefits: ["SEO optimized markup", "Highly responsive layouts", "Lightning fast load times"],
          technologies: ["HTML5", "CSS3", "JavaScript", "Vite", "React"],
          pricing: "Starting at ₹15,000 / $250",
          iconName: "Globe",
          order: 1
        },
        {
          title: "Frontend Development",
          description: "Clean, performant UI implementation using state-of-the-art architectures and pixel-perfect responsiveness.",
          benefits: ["Premium transitions and micro-interactions", "Modular components", "Cross-browser compatibility"],
          technologies: ["React", "Vue", "Tailwind CSS", "Framer Motion"],
          pricing: "Starting at ₹10,000 / $180",
          iconName: "Layout",
          order: 2
        },
        {
          title: "Full Stack Development",
          description: "Robust end-to-end applications utilizing standard server scripts, caching systems, and highly scalable databases.",
          benefits: ["Secure APIs and authentication", "Scalable database schemas", "Complete hosting setup"],
          technologies: ["Node.js", "Express", "MongoDB", "MySQL", "React"],
          pricing: "Starting at ₹30,000 / $500",
          iconName: "Database",
          order: 3
        },
        {
          title: "React Development",
          description: "Advanced dynamic single-page applications optimized for smooth client routing, user state, and performance.",
          benefits: ["Virtual DOM performance optimization", "Redux/Context state patterns", "Reusable custom hooks"],
          technologies: ["React.js", "React Router", "Redux", "Axios"],
          pricing: "Starting at ₹12,000 / $200",
          iconName: "Cpu",
          order: 4
        },
        {
          title: "Portfolio Website",
          description: "Interactive visual portfolios showcasing professional achievements, career history, and project galleries with wow-factor.",
          benefits: ["Stunning dark/light mode grids", "Dynamic CV downloads", "WhatsApp and Contact triggers"],
          technologies: ["React", "Tailwind CSS", "Framer Motion"],
          pricing: "Starting at ₹8,000 / $120",
          iconName: "User",
          order: 5
        },
        {
          title: "E-Commerce Website",
          description: "Scalable online stores featuring clean checkout systems, robust inventory tables, and high-security payment gateways.",
          benefits: ["Smooth cart operations", "Product analytics tracking", "Admin order management dashboard"],
          technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
          pricing: "Starting at ₹40,000 / $650",
          iconName: "ShoppingBag",
          order: 6
        },
        {
          title: "Business Website",
          description: "Corporate platforms created to communicate product capabilities, brand authority, and customer feedback loops.",
          benefits: ["Lead capturing forms", "Blog systems", "Google Analytics dashboards"],
          technologies: ["React", "Express", "Tailwind CSS", "SEO tools"],
          pricing: "Starting at ₹20,000 / $350",
          iconName: "Briefcase",
          order: 7
        },
        {
          title: "Admin Dashboard",
          description: "Dynamic internal management panels built to display core database metrics, capture leads, and update content live.",
          benefits: ["Detailed Recharts analytics", "Role security configuration", "CSV statistics exporting"],
          technologies: ["React", "Tailwind CSS", "Express", "Recharts"],
          pricing: "Starting at ₹25,000 / $400",
          iconName: "Sliders",
          order: 8
        },
        {
          title: "UI/UX Design",
          description: "Interactive Figma prototyping and low/high-fidelity styling setups aligning brand requirements to maximum usability.",
          benefits: ["Modern visual layouts", "Interactive mockup files", "Intuitive user flows"],
          technologies: ["Figma", "Adobe XD", "Tailwind design systems"],
          pricing: "Starting at ₹10,000 / $180",
          iconName: "Framer",
          order: 9
        },
        {
          title: "Website Maintenance",
          description: "Proactive site maintenance including security audits, package upgrades, speed audits, and content updates.",
          benefits: ["Weekly automated backups", "Instant security patching", "Page speed checkups"],
          technologies: ["Git", "Node.js", "Server configurations"],
          pricing: "Starting at ₹5,000 / $80 per month",
          iconName: "Wrench",
          order: 10
        }
      ];
      await Service.insertMany(defaultServices);
      console.log("Seeded default StackKraft services successfully.");
    }
  } catch (err) {
    console.error(`Error seeding services: ${err.message}`);
  }
};

seedServices();

// @route   GET /api/services
// @desc    Get all services
// @access  Public
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/services
// @desc    Create a service
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, description, benefits, technologies, pricing, iconName, order } = req.body;
  try {
    const newService = new Service({
      title,
      description,
      benefits,
      technologies,
      pricing,
      iconName,
      order
    });
    const service = await newService.save();
    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/services/:id
// @desc    Update a service
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, description, benefits, technologies, pricing, iconName, order } = req.body;
  try {
    let service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (benefits !== undefined) service.benefits = benefits;
    if (technologies !== undefined) service.technologies = technologies;
    if (pricing !== undefined) service.pricing = pricing;
    if (iconName !== undefined) service.iconName = iconName;
    if (order !== undefined) service.order = order;

    await service.save();
    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete a service
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
