const express = require('express');
const router = express.Router();
const axios = require('axios');

const fallbackResponses = {
  greetings: "Welcome to StackKraft 👋\n\nI am your digital engineering assistant. How can I help you build or optimize your next web platform today?",
  price: "Website pricing at StackKraft depends on the project scope and complexity:\n\n• **Starter Landing Pages**: Begin around ₹15,000 / $250.\n• **Business Websites**: Begin around ₹30,000 / $500.\n• **Enterprise Apps & Portals**: Custom quotes based on specifications.\n\nWould you like a free custom quotation for your project?",
  portfolio: "We have built some outstanding projects at StackKraft, including:\n\n1. **EventSync**: Community event collaboration platform with AI recommendations, QR attendance, and socket chat.\n2. **HealthSync**: Clinic management suite built with Spring Boot, MySQL, and Google Cloud.\n3. **TrendZone**: Premium e-commerce web platform.\n4. **BookCircle**: Azure SQL integrated library service.\n\nWould you like to view our full Portfolio page?",
  services: "StackKraft offers premium software engineering services, including:\n\n• **Custom Web Development** (MERN, React, Node.js)\n• **SaaS Dashboards & Admin Panels**\n• **E-commerce & Booking Systems**\n• **Healthcare Software**\n• **Deployment, Hosting, & SEO Optimization**\n\nWhich service can we assist you with?",
  contact: "You can reach the StackKraft team directly through these channels:\n\n• **Email**: sivaraman.official13@gmail.com\n• **Phone**: +91 9342913781\n• **WhatsApp**: https://wa.me/919342913781\n\nWould you like me to schedule a meeting with our founder, Sivaraman?",
  founder: "StackKraft was founded by Sivaraman M, a Full Stack Developer with a B.E. in Computer Science and Engineering. He operates from Jayankondam, Ariyalur, Tamil Nadu. He has extensive skills in React.js, Node.js, MongoDB, Azure, and Spring Boot.",
  tech: "Yes, we specialize in modern technologies like the **MERN Stack** (MongoDB, Express, React, Node.js) along with Tailwind CSS v4, Azure, and cloud deployments."
};

const systemPrompt = `You are the official AI assistant representing StackKraft, a premium Full Stack Web Development Agency.
Company Name: StackKraft
Founder: Sivaraman
Role: Full Stack Web Development Agency
Services: Business Website, Portfolio Website, Healthcare Software, Dashboard, Admin Panel, React Development, Node.js Development, MERN Stack, Ecommerce, Booking Systems, Landing Pages, Custom Software, Deployment, Hosting.
Pricing:
- Starter websites begin around ₹15,000.
- Business websites begin around ₹30,000.
- Enterprise projects require custom quotation.

Behavioral Guidelines:
1. Always answer professionally, politely, and keep responses relatively concise.
2. Stay focused on StackKraft services.
3. If someone asks unrelated questions, politely answer and redirect them back toward StackKraft services whenever appropriate.
4. If you cannot confidently answer a question, respond with:
"I'm not completely sure. Would you like to contact the StackKraft team directly?"
Then list the following details:
- Email: sivaraman.official13@gmail.com
- Phone: +91 9342913781
- WhatsApp: https://wa.me/919342913781`;

// Helper function to match keywords for fallback routing
const getLocalFallback = (message) => {
  const msgLower = (message || '').toLowerCase();
  if (msgLower.includes('hello') || msgLower.includes('hi') || msgLower.includes('hey')) {
    return fallbackResponses.greetings;
  }
  if (msgLower.includes('pricing') || msgLower.includes('cost') || msgLower.includes('price') || msgLower.includes('how much')) {
    return fallbackResponses.price;
  }
  if (msgLower.includes('portfolio') || msgLower.includes('project') || msgLower.includes('work') || msgLower.includes('example')) {
    return fallbackResponses.portfolio;
  }
  if (msgLower.includes('service') || msgLower.includes('what do you do') || msgLower.includes('capabilities')) {
    return fallbackResponses.services;
  }
  if (msgLower.includes('contact') || msgLower.includes('phone') || msgLower.includes('email') || msgLower.includes('whatsapp') || msgLower.includes('reach')) {
    return fallbackResponses.contact;
  }
  if (msgLower.includes('founder') || msgLower.includes('sivaraman') || msgLower.includes('who is')) {
    return fallbackResponses.founder;
  }
  if (msgLower.includes('react') || msgLower.includes('node') || msgLower.includes('mongodb') || msgLower.includes('express') || msgLower.includes('mern') || msgLower.includes('tailwind')) {
    return fallbackResponses.tech;
  }
  return `I'm not completely sure. Would you like to contact the StackKraft team directly?\n\n• Email: sivaraman.official13@gmail.com\n• Phone: +91 9342913781\n• WhatsApp: https://wa.me/919342913781`;
};

// @route   POST /api/chat
// @desc    Process a chat message using Google Gemini API or local fallback
// @access  Public
router.post('/', async (req, res) => {
  const { message, history } = req.body;

  // Validation
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message field is required and must be a non-empty string.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = 'gemini-1.5-flash';

  if (!apiKey) {
    console.warn('WARNING: GEMINI_API_KEY is not configured in server/.env. Routing query to local fallback engine.');
    const fallbackReply = getLocalFallback(message);
    return res.status(200).json({ reply: fallbackReply });
  }

  // Format conversational history for Gemini payload
  const contents = [];
  if (history && Array.isArray(history)) {
    history.forEach(h => {
      contents.push({
        role: h.sender === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }]
      });
    });
  }

  // Append the current user query
  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });

  const payload = {
    contents,
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    }
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      timeout: 8000 // 8-second timeout config
    });

    const candidates = response.data?.candidates;
    if (candidates && candidates.length > 0) {
      const reply = candidates[0].content?.parts[0]?.text;
      if (reply) {
        return res.json({ reply });
      }
    }
    throw new Error('Google Gemini API returned an empty candidate list.');
  } catch (error) {
    // Detailed error logging on the server console
    console.error('========================================================');
    console.error('GEMINI API INTEGRATION FAILURE DETECTED');
    console.error(`Timestamp: ${new Date().toISOString()}`);
    console.error(`Request URL: ${url.replace(apiKey, 'HIDDEN_API_KEY')}`);
    console.error(`Model Name: ${modelName}`);
    console.error(`Request Payload: ${JSON.stringify(payload, null, 2)}`);
    
    if (error.response) {
      console.error(`HTTP Status Code: ${error.response.status}`);
      console.error(`Error Headers: ${JSON.stringify(error.response.headers, null, 2)}`);
      console.error(`Error Body: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
      console.error(`Error Message: ${error.message}`);
    }
    console.error(`Stack Trace: ${error.stack}`);
    console.error('========================================================');

    // Smooth UI recovery: fall back to keyword-based response instead of returning 500 or 404
    const fallbackReply = getLocalFallback(message);
    return res.status(200).json({ reply: fallbackReply });
  }
});

module.exports = router;
