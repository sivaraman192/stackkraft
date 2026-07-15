import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
 ChevronDown, HelpCircle, Mail, Phone, MapPin, Send, MessageSquare 
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';

// Import Reusable Layout Components
import SEO from '../components/SEO';
import GlassCard from '../components/GlassCard';
import { getOrganizationSchema, getWebSiteSchema, getLocalBusinessSchema, getServiceSchema } from '../utils/schemaHelper';

// Import Section Sub-components
import HeroSection from '../components/home/HeroSection';
import TechStrip from '../components/home/TechStrip';
import StatsSection from '../components/home/StatsSection';
import AboutPreview from '../components/home/AboutPreview';
import ServicesPreview from '../components/home/ServicesPreview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import FeatureSection from '../components/home/FeatureSection';
import PortfolioPreview from '../components/home/PortfolioPreview';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

const Home = () => {
 const [faqOpen, setFaqOpen] = useState(null);
 const [contactData, setContactData] = useState({
  name: '', email: '', phone: '', budget: '15k-30k', projectType: 'landing-page', message: ''
 });
 const [status, setStatus] = useState({ type: '', message: '' });
 const [loadingSubmit, setLoadingSubmit] = useState(false);
 const formRef = useRef();

 const handleContactChange = (e) => {
  setContactData({ ...contactData, [e.target.name]: e.target.value });
 };

 const handleContactSubmit = async (e) => {
  e.preventDefault();
  setLoadingSubmit(true);
  setStatus({ type: '', message: '' });

  try {
   // 1. Submit to local Express API
   await axios.post(`${API_URL}/contact`, {
    name: contactData.name,
    email: contactData.email,
    phone: contactData.phone,
    message: `[Budget: ${contactData.budget} | Type: ${contactData.projectType}] ${contactData.message}`,
    serviceRequired: contactData.projectType
   });

   // 2. EmailJS send (if credentials are set in environment)
   if (
    import.meta.env.VITE_EMAILJS_SERVICE_ID && 
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID && 
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
   ) {
    await emailjs.sendForm(
     import.meta.env.VITE_EMAILJS_SERVICE_ID,
     import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
     formRef.current,
     import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
   }

   setStatus({ 
    type: 'success', 
    message: 'Inquiry submitted successfully! Our lead engineer will contact you shortly.' 
   });
   setContactData({ name: '', email: '', phone: '', budget: '15k-30k', projectType: 'landing-page', message: '' });
  } catch (err) {
   console.error("Submission error:", err);
   setStatus({ 
    type: 'error', 
    message: err.response?.data?.message || 'Failed to submit form. Please contact founder directly.' 
   });
  } finally {
   setLoadingSubmit(false);
  }
 };

 const faqs = [
  {
   q: "What types of websites do you develop?",
   a: "We design and build custom landing pages, portfolios, administrative dashboards, e-commerce stores, and custom business portals. We specialize in using React.js, Tailwind CSS, Node.js, and MongoDB."
  },
  {
   q: "Do you integrate custom animations?",
   a: "Yes. We use Framer Motion and custom CSS animation keyframes to create beautiful scroll-triggered visuals, floating mockups, and micro-interactive hover glows."
  },
  {
   q: "How long does a website take to build?",
   a: "A standard landing page or portfolio takes 5 to 7 business days. A full-scale e-commerce web platform or custom admin dashboard takes 2 to 4 weeks depending on the functional requirements."
  },
  {
   q: "Do you configure SEO (Search Engine Optimization)?",
   a: "Yes. Every website we build includes semantic HTML, custom meta titles and descriptions, sitemaps, and speed optimizations, targeting high-ranking keywords."
  }
 ];

 return (
  <div className="relative overflow-hidden min-h-screen text-white bg-[#050505] transition-colors duration-300 font-sans selection:bg-red-655 selection:bg-red-600 selection:text-white">
   {/* Search Engine Optimization */}
   <SEO 
    title="Home"
    description="Premium Website Development & Digital Experiences by StackKraft. High-performance React, Express, MongoDB, and Framer Motion."
    url="/"
    schema={[
     getOrganizationSchema(),
     getWebSiteSchema(),
     getLocalBusinessSchema(),
     getServiceSchema()
    ]}
   />

   {/* Hero Header Section */}
   <HeroSection />

   {/* Infinite Scrolling Logos Marquee */}
   <TechStrip />

   {/* Animated CountUp Stats Block */}
   <StatsSection />

   {/* About Preview Section */}
   <AboutPreview />

   {/* Services Showcase Cards */}
   <ServicesPreview />

   {/* Why Choose StackKraft Grid */}
   <WhyChooseUs />

   {/* Core Engineering Features */}
   <FeatureSection />

   {/* Selected Portfolio Cards Showcase */}
   <PortfolioPreview />

   {/* Testimonials Slider */}
   <TestimonialsSection />

   {/* Accordion FAQs Section */}
   <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-left">
    <h2 className="text-2xl sm:text-4xl font-bold font-display text-white text-center mb-16">
     Frequently Asked Questions
    </h2>
    <div className="space-y-3.5">
     {faqs.map((faq, idx) => {
      const isOpen = faqOpen === idx;
      return (
       <div key={idx} className="border-b border-red-950/20 pb-3">
        <button
         onClick={() => setFaqOpen(isOpen ? null : idx)}
         className="w-full flex items-center justify-between text-left py-4 focus:outline-none hover:text-red-500 transition-colors cursor-pointer"
        >
         <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2.5">
          <HelpCircle className="w-4 h-4 text-red-500 shrink-0" />
          {faq.q}
         </span>
         <ChevronDown className={`w-4 h-4 text-red-550 text-red-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence initial={false}>
         {isOpen && (
          <motion.div
           initial={{ height: 0, opacity: 0 }}
           animate={{ height: 'auto', opacity: 1 }}
           exit={{ height: 0, opacity: 0 }}
           transition={{ duration: 0.25, ease: 'easeInOut' }}
           className="overflow-hidden"
          >
           <p className="text-[11px] sm:text-xs text-slate-400 mt-1 pb-3 leading-relaxed font-sans">
            {faq.a}
           </p>
          </motion.div>
         )}
        </AnimatePresence>
       </div>
      );
     })}
    </div>
   </section>

   {/* Contact Section */}
   <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-left border-t border-red-950/10" id="contact-form">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
     
     {/* Info Details Column */}
     <div className="lg:col-span-5 space-y-8 text-left">
      <div className="space-y-4">
       <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
        Contact Details
       </div>
       <h2 className="text-3xl sm:text-4xl font-bold font-display text-white leading-tight">
        Let's Engineer <br />
        Something Amazing
       </h2>
       <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
        Connect with our team to initiate sprint timelines, claim a free page-load speed audit, or align project budgets.
       </p>
      </div>

      {/* Direct Contacts Grid */}
      <div className="space-y-4">
       <GlassCard className="p-5 border border-slate-150 flex items-center gap-4 bg-white/40 border-slate-200 border-slate-200 ">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
         <Mail className="w-4.5 h-4.5" />
        </div>
        <div>
         <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Inquiry</div>
         <a href="mailto:sivaraman.official13@gmail.com" className="text-xs font-bold text-white hover:text-red-500 transition-colors">
          sivaraman.official13@gmail.com
         </a>
        </div>
       </GlassCard>

       <GlassCard className="p-5 border border-slate-150 flex items-center gap-4 bg-white/40 border-slate-200 border-slate-200 ">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
         <Phone className="w-4.5 h-4.5" />
        </div>
        <div>
         <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Call Directly</div>
         <a href="tel:+919342913781" className="text-xs font-bold text-white hover:text-red-500 transition-colors">
          +91 9342913781
         </a>
        </div>
       </GlassCard>

       <GlassCard className="p-5 border border-slate-150 flex items-center gap-4 bg-white/40 border-slate-200 border-slate-200 ">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
         <MapPin className="w-4.5 h-4.5" />
        </div>
        <div>
         <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Headquarters</div>
         <span className="text-xs font-bold text-white">
          Jayankondam, Ariyalur, Tamil Nadu, India
         </span>
        </div>
       </GlassCard>
      </div>

      {/* Direct WhatsApp Action */}
      <div className="flex gap-4">
       <a 
        href="https://wa.me/919342913781" 
        target="_blank" 
        rel="noreferrer" 
        className="bg-emerald-600 hover:bg-emerald-550 text-white font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 w-full transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20"
       >
        <FaWhatsapp className="w-4.5 h-4.5" />
        Chat on WhatsApp
       </a>
      </div>
     </div>

     {/* Form and Map Column */}
     <div className="lg:col-span-7 space-y-8">
      <GlassCard className="p-8 sm:p-10 border border-red-500/10 bg-white/70 border-slate-200 border-slate-200 ">
       <h3 className="text-lg font-bold font-display text-white mb-6 text-left flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-red-500" />
        Start Your Project Sprint
       </h3>
       
       <form onSubmit={handleContactSubmit} ref={formRef} className="space-y-4 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 font-sans">Full Name</label>
          <input 
           type="text" 
           name="name" 
           required 
           value={contactData.name} 
           onChange={handleContactChange}
           placeholder="Your Name"
           className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-neutral-900 transition-colors"
          />
         </div>
         <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 font-sans">Email Address</label>
          <input 
           type="email" 
           name="email" 
           required 
           value={contactData.email} 
           onChange={handleContactChange}
           placeholder="name@company.com"
           className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-neutral-900 transition-colors"
          />
         </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 font-sans">Phone Number (Optional)</label>
          <input 
           type="text" 
           name="phone" 
           value={contactData.phone} 
           onChange={handleContactChange}
           placeholder="+91 XXXXX XXXXX"
           className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-neutral-900 transition-colors"
          />
         </div>
         <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 font-sans">Estimated Budget</label>
          <select 
           name="budget" 
           value={contactData.budget} 
           onChange={handleContactChange}
           className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 focus:bg-neutral-900 transition-colors"
          >
           <option value="15k-30k">₹15,000 - ₹30,000 / $250 - $500</option>
           <option value="30k-60k">₹30,000 - ₹60,000 / $500 - $1,000</option>
           <option value="60k+">₹60,000+ / $1,000+</option>
          </select>
         </div>
        </div>

        <div className="space-y-1.5">
         <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 font-sans">Project Type</label>
         <select 
          name="projectType" 
          value={contactData.projectType}
          onChange={handleContactChange}
          className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 focus:bg-neutral-900 transition-colors"
         >
          <option value="landing-page">Landing Page</option>
          <option value="business-website">Business Website</option>
          <option value="portfolio">Portfolio Design</option>
          <option value="react-app">React Single Page App</option>
          <option value="full-stack">Full-Stack Application</option>
          <option value="maintenance">Website Maintenance</option>
         </select>
        </div>

        <div className="space-y-1.5">
         <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 font-sans">Project Requirements</label>
         <textarea 
          name="message" 
          required 
          rows={4} 
          value={contactData.message} 
          onChange={handleContactChange}
          placeholder="Briefly describe what you are looking to build..."
          className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-neutral-900 transition-colors resize-none"
         />
        </div>

        {status.message && (
         <p className={`text-xs ${status.type === 'success' ? 'text-emerald-450 text-emerald-400' : 'text-rose-450 text-red-550 text-red-500'}`}>
          {status.message}
         </p>
        )}

        <button
         type="submit"
         disabled={loadingSubmit}
         className="w-full btn-premium py-3.5 text-xs uppercase tracking-wider font-bold shadow-lg shadow-red-500/20 cursor-pointer active:scale-[0.98] disabled:bg-neutral-800"
        >
         {loadingSubmit ? 'Submitting Inquiry...' : 'Submit Inquiry'}
        </button>
       </form>
      </GlassCard>


      {/* Google Maps Section Wrapped in Glassmorphism Card */}
      <GlassCard className="p-6 border border-red-500/10 bg-black transition-colors duration-300/40 shadow-2xl rounded-2xl space-y-6">
       <div className="space-y-2 text-left">
        <h4 className="text-base font-bold text-white font-display flex items-center gap-1.5">
         <span>📍</span> StackKraft
        </h4>
        <p className="text-xs text-red-550 text-red-500 font-semibold uppercase tracking-wider">
         Remote Web Development Company
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
         Serving Clients Across India and Worldwide
        </p>
       </div>

       <div className="rounded-2xl overflow-hidden border border-red-500/10 shadow-lg relative bg-black" style={{ height: '400px' }}>
        <iframe
         title="StackKraft Headquarters Location Map"
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1956.8447307864074!2d79.37183851716102!3d11.21059633190044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab2bd0bf008761%3A0x5bec3a94f596a7bd!2sState%20Bank%20Colony!5e0!3m2!1sen!2sin!4v1784108956726!5m2!1sen!2sin"
         width="100%"
         height="100%"
         style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(80%)', borderRadius: '16px' }}
         allowFullScreen=""
         loading="lazy"
         referrerPolicy="strict-origin-when-cross-origin"
        />
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-left">
        <div className="space-y-1">
         <h5 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Location:</h5>
         <p className="text-slate-350 leading-relaxed font-sans font-sans">
          State Bank Colony,<br />
          Jayankondam, Ariyalur District,<br />
          Tamil Nadu, India
         </p>
        </div>
        <div className="space-y-1">
         <h5 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Business Hours:</h5>
         <p className="text-slate-350 leading-relaxed font-sans font-sans">
          Monday – Saturday<br />
          9:00 AM – 7:00 PM IST
         </p>
        </div>
       </div>

       <div className="flex flex-col sm:flex-row gap-3">
        <a
         href="https://www.google.com/maps/dir/?api=1&destination=11.210596,79.371838"
         target="_blank"
         rel="noreferrer"
         className="flex-1 bg-red-650 hover:bg-red-500 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-red-500/20 active:scale-[0.98] cursor-pointer"
        >
         Get Directions
        </a>
        <button
         type="button"
         onClick={() => {
          const element = document.getElementById('contact-form');
          if (element) {
           element.scrollIntoView({ behavior: 'smooth' });
          }
         }}
         className="flex-1 bg-neutral-900 hover:bg-neutral-850 text-white border border-neutral-850 font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
        >
         Contact Us
        </button>
       </div>
      </GlassCard>
     </div>
    </div>
   </section>

   {/* Call To Action banner */}
   <CTASection />
  </div>
 );
};

export default Home;
