import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle2, XCircle, ChevronDown, User, MessageSquare, Briefcase, Clock, Sparkles } from 'lucide-react';
import { FaWhatsapp, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import SEO from '../components/SEO';
import { API_URL } from '../context/AuthContext';
import { getBreadcrumbSchema } from '../utils/schemaHelper';

const Contact = () => {
 const [searchParams] = useSearchParams();
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  company: '',
  budget: '15k-30k',
  projectType: 'landing-page',
  timeline: '1-3-months',
  message: ''
 });
 const [submitting, setSubmitting] = useState(false);
 const [toasts, setToasts] = useState([]);
 const formRef = useRef();

 const addToast = (type, message) => {
  const id = Date.now();
  setToasts(prev => [...prev, { id, type, message }]);
  setTimeout(() => {
   setToasts(prev => prev.filter(t => t.id !== id));
  }, 5000);
 };

 useEffect(() => {
  const serviceParam = searchParams.get('service');
  const planParam = searchParams.get('plan');
  const quoteParam = searchParams.get('quote');
  
  if (serviceParam) {
   setFormData(prev => ({ 
    ...prev, 
    projectType: serviceParam.toLowerCase().replace(/ /g, '-'),
    message: `Hi, I am interested in inquiring about the "${serviceParam}" service.` 
   }));
  } else if (planParam) {
   setFormData(prev => ({ 
    ...prev, 
    budget: planParam === 'starter' ? '15k-30k' : planParam === 'professional' ? '30k-60k' : '60k+',
    projectType: planParam === 'starter' ? 'landing-page' : planParam === 'professional' ? 'business-website' : 'full-stack',
    message: `Hi, I am interested in inquiring about the "${planParam}" plan.` 
   }));
  } else if (quoteParam) {
   setFormData(prev => ({ 
    ...prev, 
    message: `Hi StackKraft, I would like to request a custom development quote for my project.`
   }));
  }
 }, [searchParams]);

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Validations
  if (!formData.name.trim()) {
   addToast('error', 'Full Name is required.');
   return;
  }
  if (!formData.email.trim()) {
   addToast('error', 'Email Address is required.');
   return;
  }
  if (!validateEmail(formData.email)) {
   addToast('error', 'Please enter a valid email address.');
   return;
  }
  if (!formData.message.trim()) {
   addToast('error', 'Message description is required.');
   return;
  }

  setSubmitting(true);

  try {
   // 1. Submit to backend API leads database
   await axios.post(`${API_URL}/contact`, {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    message: `[Company: ${formData.company || 'N/A'} | Budget: ${formData.budget} | Type: ${formData.projectType} | Timeline: ${formData.timeline}] ${formData.message}`,
    serviceRequired: formData.projectType
   });

   // 2. EmailJS submission (using clean environment configuration)
   const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
   const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
   const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

   if (serviceId && templateId && publicKey) {
    await emailjs.sendForm(
     serviceId,
     templateId,
     formRef.current,
     publicKey
    );
   } else {
    console.warn("EmailJS credentials missing. Lead saved to backend database only.");
   }

   addToast('success', 'Message sent successfully! Sivaraman will contact you shortly.');
   
   // Reset form
   setFormData({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '15k-30k',
    projectType: 'landing-page',
    timeline: '1-3-months',
    message: ''
   });
  } catch (err) {
   console.error("Contact form error:", err);
   addToast('error', err.response?.data?.message || 'Submission failed. Please try again.');
  } finally {
   setSubmitting(false);
  }
 };

 return (
  <div className="relative overflow-hidden min-h-screen pt-28 pb-20 text-white bg-[#050505] transition-colors duration-300">
   <SEO 
    title="Contact Us"
    description="Get in touch with StackKraft. Submit our project intake form for premium React website architectures."
    url="/contact"
    schema={getBreadcrumbSchema([{ name: 'Contact', path: '/contact' }])}
   />

   {/* Custom Toast Notification Center */}
   <div className="fixed top-6 right-6 z-[1000] flex flex-col gap-3 pointer-events-none">
    <AnimatePresence>
     {toasts.map(toast => (
      <motion.div
       key={toast.id}
       initial={{ opacity: 0, x: 50, scale: 0.9 }}
       animate={{ opacity: 1, x: 0, scale: 1 }}
       exit={{ opacity: 0, x: 50, scale: 0.9 }}
       className={`pointer-events-auto p-4 rounded-xl border shadow-2xl flex items-center gap-3 backdrop-blur-md ${
        toast.type === 'success' 
         ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-400' 
         : 'bg-red-950/90 border-red-500/30 text-red-450 text-red-400'
       }`}
      >
       {toast.type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
       ) : (
        <XCircle className="w-5 h-5 text-red-500 shrink-0" />
       )}
       <span className="text-xs font-semibold">{toast.message}</span>
      </motion.div>
     ))}
    </AnimatePresence>
   </div>

   {/* Decorative Glow Orbs */}
   <div className="absolute top-[-50px] left-[-50px] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] animate-pulse pointer-events-none -z-10" />
   <div className="absolute bottom-[10%] right-[-50px] w-[500px] h-[500px] bg-red-800/10 rounded-full blur-[140px] animate-pulse pointer-events-none -z-10" />

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
    
    {/* Page Hero Header */}
    <div className="text-center space-y-4 max-w-3xl mx-auto bg-black transition-colors duration-300/30 p-8 rounded-3xl border border-slate-150 backdrop-blur-xl relative">
     <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
      <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
      <span>Connect With Us</span>
     </div>
     <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
      Contact <span className="text-gradient">StackKraft</span>
     </h1>
     <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
      Let's discuss your next project. Fill out the project questionnaire below to receive layout audits, estimates, and delivery sprints.
     </p>
    </div>

    {/* Contact Page Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
     
     {/* Left Info Column */}
     <div className="lg:col-span-5 flex flex-col justify-start gap-6 h-auto min-h-fit">
      <GlassCard className="p-8 border border-red-500/10 space-y-8 h-auto bg-black transition-colors duration-300/40 shadow-2xl rounded-2xl">
       <div>
        <h3 className="text-base font-bold text-white font-display uppercase tracking-wider">Agency Information</h3>
        <p className="text-xs text-slate-400 mt-1">Direct communication lines with our founding team.</p>
       </div>

       <div className="space-y-6 text-xs text-slate-350">
        <a href="mailto:sivaraman.official13@gmail.com" className="flex items-center gap-3.5 hover:text-white transition-colors group">
         <div className="w-9 h-9 rounded-xl bg-red-500/10 group-hover:bg-red-650/20 text-red-500 border border-red-500/20 flex items-center justify-center shrink-0 transition-colors">
          <Mail className="w-4 h-4" />
         </div>
         <div>
          <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold font-display">Email Address</div>
          <div className="font-semibold text-white font-sans">sivaraman.official13@gmail.com</div>
         </div>
        </a>

        <a href="tel:+919342913781" className="flex items-center gap-3.5 hover:text-white transition-colors group">
         <div className="w-9 h-9 rounded-xl bg-red-500/10 group-hover:bg-red-650/20 text-red-500 border border-red-500/20 flex items-center justify-center shrink-0 transition-colors">
          <Phone className="w-4 h-4" />
         </div>
         <div>
          <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold font-display">Phone Number</div>
          <div className="font-semibold text-white font-sans">+91 93429 13781</div>
         </div>
        </a>

        <div className="flex items-center gap-3.5 group">
         <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center shrink-0">
          <MapPin className="w-4 h-4" />
         </div>
         <div>
          <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold font-display">Agency Location</div>
          <div className="font-semibold text-white font-sans">Jayankondam, Ariyalur, Tamil Nadu, India</div>
         </div>
        </div>

        <div className="flex items-center gap-3.5 group">
         <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center shrink-0">
          <Clock className="w-4 h-4" />
         </div>
         <div>
          <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold font-display">Working Hours</div>
          <div className="font-semibold text-white font-sans">Monday - Saturday: 9:00 AM - 7:00 PM (IST)</div>
         </div>
        </div>
       </div>

       {/* Direct WhatsApp Call Action & Social Links */}
       <div className="space-y-4 pt-4 border-t border-slate-900/60">
        <a
         href="https://wa.me/919342913781"
         target="_blank"
         rel="noreferrer"
         className="w-full bg-emerald-600 hover:bg-emerald-550 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
        >
         <FaWhatsapp className="w-4.5 h-4.5 animate-pulse" />
         Quick Chat on WhatsApp
        </a>

        <div className="flex justify-center gap-4 text-slate-400 pt-2">
         <a href="https://github.com/sivaraman192" target="_blank" rel="noreferrer" className="p-3 bg-neutral-900 hover:bg-red-650/15 hover:text-white rounded-xl border border-neutral-850 transition-all" title="GitHub">
          <FaGithub className="w-4.5 h-4.5" />
         </a>
         <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 bg-neutral-900 hover:bg-red-650/15 hover:text-white rounded-xl border border-neutral-850 transition-all" title="LinkedIn">
          <FaLinkedin className="w-4.5 h-4.5" />
         </a>
         <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-3 bg-neutral-900 hover:bg-red-650/15 hover:text-white rounded-xl border border-neutral-850 transition-all" title="Instagram">
          <FaInstagram className="w-4.5 h-4.5" />
         </a>
        </div>
       </div>
      </GlassCard>
     </div>

     {/* Right Form Column */}
     <div className="lg:col-span-7" id="contact-form">
      <GlassCard className="p-8 pb-5 mb-0 border border-red-500/10 h-auto min-h-fit flex flex-col justify-start bg-black transition-colors duration-300/40 shadow-2xl rounded-2xl">
       <div>
        <h3 className="text-base font-bold text-white font-display uppercase tracking-wider">Project Intake Form</h3>
        <p className="text-xs text-slate-400 mt-1">Brief us on your software goals for a free layout audit.</p>
       </div>

       <form onSubmit={handleSubmit} ref={formRef} className="space-y-4 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         <div className="space-y-1">
          <label className="text-[9px] uppercase text-gray-400 font-bold tracking-wider font-display">Full Name *</label>
          <div className="relative">
           <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-neutral-900 border border-neutral-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500 font-sans"
            placeholder="e.g. Sivaraman"
           />
           <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
         </div>
         
         <div className="space-y-1">
          <label className="text-[9px] uppercase text-gray-400 font-bold tracking-wider font-display">Email Address *</label>
          <div className="relative">
           <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-neutral-900 border border-neutral-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500 font-sans"
            placeholder="name@company.com"
           />
           <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
         </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         <div className="space-y-1">
          <label className="text-[9px] uppercase text-gray-400 font-bold tracking-wider font-display">Phone Number</label>
          <div className="relative">
           <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-neutral-900 border border-neutral-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500 font-sans"
            placeholder="+91 XXXXX XXXXX"
           />
           <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
         </div>
         
         <div className="space-y-1">
          <label className="text-[9px] uppercase text-gray-400 font-bold tracking-wider font-display">Company / Brand Name</label>
          <div className="relative">
           <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full bg-neutral-900 border border-neutral-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500 font-sans"
            placeholder="Brand / Company name"
           />
           <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
         </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
         <div className="space-y-1">
          <label className="text-[9px] uppercase text-gray-400 font-bold tracking-wider font-display">Project Type</label>
          <div className="relative">
           <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full bg-neutral-900 border border-neutral-850 rounded-xl pl-4 pr-10 py-2.5 text-xs text-white appearance-none focus:outline-none focus:border-red-500 cursor-pointer font-sans"
           >
            <option value="landing-page">Landing Page</option>
            <option value="business-website">Business Website</option>
            <option value="portfolio">Portfolio Design</option>
            <option value="react-app">React SPA</option>
            <option value="full-stack">Full-Stack Application</option>
            <option value="maintenance">Website Maintenance</option>
           </select>
           <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>
         </div>

         <div className="space-y-1">
          <label className="text-[9px] uppercase text-gray-400 font-bold tracking-wider font-display">Estimated Budget</label>
          <div className="relative">
           <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full bg-neutral-900 border border-neutral-850 rounded-xl pl-4 pr-10 py-2.5 text-xs text-white appearance-none focus:outline-none focus:border-red-500 cursor-pointer font-sans"
           >
            <option value="15k-30k">₹15,000 - ₹30,000 / $250 - $500</option>
            <option value="30k-60k">₹30,000 - ₹60,000 / $500 - $1,000</option>
            <option value="60k+">₹60,000+ / $1,000+</option>
           </select>
           <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>
         </div>

         <div className="space-y-1">
          <label className="text-[9px] uppercase text-gray-400 font-bold tracking-wider font-display">Timeline Sprint</label>
          <div className="relative">
           <select
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full bg-neutral-900 border border-neutral-850 rounded-xl pl-4 pr-10 py-2.5 text-xs text-white appearance-none focus:outline-none focus:border-red-500 cursor-pointer font-sans"
           >
            <option value="under-1-month">&lt; 1 Month</option>
            <option value="1-3-months">1 - 3 Months</option>
            <option value="3-months-plus">3+ Months</option>
           </select>
           <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>
         </div>
        </div>

        <div className="space-y-1">
         <label className="text-[9px] uppercase text-gray-400 font-bold tracking-wider font-display">Message & Specifications *</label>
         <textarea
          name="message"
          required
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-neutral-900 border border-neutral-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 resize-none font-sans"
          placeholder="Briefly outline your website specifications, goals, or design requirements..."
         />
        </div>

        <button
         type="submit"
         disabled={submitting}
         className="w-full btn-premium py-3.5 text-xs uppercase tracking-wider font-bold shadow-lg shadow-red-500/20 cursor-pointer active:scale-[0.98] disabled:bg-neutral-800 disabled:shadow-none flex items-center justify-center gap-2"
        >
         <Send className="w-3.5 h-3.5" />
         {submitting ? 'Sending Request...' : 'Send Message'}
        </button>
       </form>
      </GlassCard>
     </div>
    </div>
   </div>

    {/* Full Width Google Map Section Wrapper */}
    <div className="relative z-10" style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '80px 40px' }}>
     <div className="space-y-8 pt-8 border-t border-red-950/15">
      {/* Heading */}
      <div className="text-center space-y-3">
       <h3 className="font-display uppercase tracking-wider text-white flex items-center justify-center gap-2" style={{ fontSize: '42px', fontWeight: 800, textAlign: 'center' }}>
        OUR LOCATION
       </h3>
       <p style={{ fontSize: '18px', color: '#ef4444', textAlign: 'center', fontWeight: 600 }}>
        Remote Web Development Company
       </p>
       <p className="font-sans" style={{ fontSize: '17px', color: '#bdbdbd', textAlign: 'center', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
        Serving Clients Across India & Worldwide
       </p>
      </div>

      {/* Map Card */}
      <div className="rounded-[18px] overflow-hidden shadow-2xl relative bg-black" style={{ height: '450px', width: '100%', border: '1px solid rgba(255,255,255,0.08)' }}>
       <iframe
        title="StackKraft Headquarters Location Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1956.8447307864074!2d79.37183851716102!3d11.21059633190044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab2bd0bf008761%3A0x5bec3a94f596a7bd!2sState%20Bank%20Colony!5e0!3m2!1sen!2sin!4v1784108956726!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(80%)' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
       />
      </div>

      {/* Four Responsive Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       {/* Card 1 */}
       <GlassCard className="p-6 border border-red-500/10 bg-black transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] rounded-2xl flex flex-col gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center text-lg font-bold">
         📍
        </div>
        <div className="text-left space-y-1">
         <h5 className="font-bold text-white uppercase tracking-wider text-[10px] text-slate-400 font-display">Location</h5>
         <p className="text-xs text-slate-300 leading-relaxed font-sans">
          State Bank Colony<br />
          Jayankondam<br />
          Ariyalur District<br />
          Tamil Nadu
         </p>
        </div>
       </GlassCard>

       {/* Card 2 */}
       <GlassCard className="p-6 border border-red-500/10 bg-black transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] rounded-2xl flex flex-col gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center text-lg font-bold">
         🕒
        </div>
        <div className="text-left space-y-1">
         <h5 className="font-bold text-white uppercase tracking-wider text-[10px] text-slate-400 font-display">Business Hours</h5>
         <p className="text-xs text-slate-300 leading-relaxed font-sans font-semibold">
          Monday – Saturday
         </p>
         <p className="text-xs text-slate-400 font-sans">
          9:00 AM – 7:00 PM IST
         </p>
        </div>
       </GlassCard>

       {/* Card 3 */}
       <GlassCard className="p-6 border border-red-500/10 bg-black transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] rounded-2xl flex flex-col gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center text-lg font-bold">
         📧
        </div>
        <div className="text-left space-y-1">
         <h5 className="font-bold text-white uppercase tracking-wider text-[10px] text-slate-400 font-display">Email</h5>
         <a href="mailto:contact@stackkraft.in" className="text-xs text-slate-300 hover:text-red-500 font-sans font-semibold break-all transition-colors block">
          contact@stackkraft.in
         </a>
        </div>
       </GlassCard>

       {/* Card 4 */}
       <GlassCard className="p-6 border border-red-500/10 bg-black transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] rounded-2xl flex flex-col gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center text-lg font-bold">
         📞
        </div>
        <div className="text-left space-y-1">
         <h5 className="font-bold text-white uppercase tracking-wider text-[10px] text-slate-400 font-display">Phone</h5>
         <a href="tel:+919342913781" className="text-xs text-slate-300 hover:text-red-500 font-sans font-semibold transition-colors block">
          +91 93429 13781
         </a>
        </div>
       </GlassCard>
      </div>

      {/* Get Directions Action Button below cards */}
      <div className="flex justify-center pt-2">
       <a
        href="https://www.google.com/maps/dir/?api=1&destination=11.210596,79.371838"
        target="_blank"
        rel="noreferrer"
        className="w-full sm:w-auto px-10 py-4 bg-red-650 hover:bg-red-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-500/20 active:scale-[0.98] cursor-pointer"
       >
        Get Directions
       </a>
      </div>
     </div>
    </div>

   </div>
  );
};

export default Contact;
