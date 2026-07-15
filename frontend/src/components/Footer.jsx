import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Phone, MapPin, Send, ArrowUp } from 'lucide-react';
import { API_URL } from '../context/AuthContext';
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Logo from './Logo';

const Footer = () => {
 const [email, setEmail] = useState('');
 const [status, setStatus] = useState({ type: '', message: '' });
 const [loading, setLoading] = useState(false);

 const handleSubscribe = async (e) => {
  e.preventDefault();
  if (!email.trim()) return;
  setLoading(true);
  setStatus({ type: '', message: '' });

  try {
   const res = await axios.post(`${API_URL}/leads`, { email, source: 'footer' });
   setStatus({ type: 'success', message: res.data.message });
   setEmail('');
  } catch (err) {
   setStatus({ 
    type: 'error', 
    message: err.response?.data?.message || 'Subscription failed. Please try again.' 
   });
  } finally {
   setLoading(false);
  }
 };

 const scrollToTop = () => {
  window.scrollTo({
   top: 0,
   behavior: 'smooth'
  });
 };

 const links = {
  company: [
   { label: 'About Us', path: '/about' },
   { label: 'Our Process', path: '/process' },
   { label: 'Reviews', path: '/testimonials' },
   { label: 'Careers', path: '/careers' }
  ],
  services: [
   { label: 'Business Website', path: '/services' },
   { label: 'Landing Page', path: '/services' },
   { label: 'Portfolio Website', path: '/services' },
   { label: 'React Development', path: '/services' },
   { label: 'Website Maintenance', path: '/services' },
   { label: 'Full Stack Web App', path: '/services' }
  ],
  resources: [
   { label: 'Blog Posts', path: '/blog' },
   { label: 'Pricing Plans', path: '/pricing' },
   { label: 'Frequently Asked', path: '/faq' },
   { label: 'Contact Support', path: '/contact' }
  ],
  legal: [
   { label: 'Privacy Policy', path: '/privacy' },
   { label: 'Terms & Conditions', path: '/terms' }
  ]
 };

 return (
  <footer className="bg-black text-slate-400 border-t border-red-950/20 mt-auto pt-20 pb-10 transition-colors duration-300">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
    
    {/* Brand & Mission */}
    <div className="lg:col-span-2 space-y-6">
     <Link to="/" className="inline-block" aria-label="StackKraft Home">
      <Logo variant="footer" className="w-8 h-8" />
     </Link>
     <p className="text-xs leading-relaxed max-w-sm text-slate-400">
      StackKraft is a premium software agency engineering custom web platforms, e-commerce stores, and high-performance React architectures. We build modern digital experiences that grow businesses.
     </p>
     <div className="space-y-3 pt-2 text-xs text-slate-400">
      <a href="mailto:sivaraman.official13@gmail.com" className="flex items-center gap-2.5 hover:text-red-500 :text-white transition-colors">
       <Mail className="w-4 h-4 text-red-500" />
       sivaraman.official13@gmail.com
      </a>
      <a href="tel:+919342913781" className="flex items-center gap-2.5 hover:text-red-500 :text-white transition-colors">
       <Phone className="w-4 h-4 text-red-500" />
       +91 9342913781
      </a>
      <span className="flex items-center gap-2.5">
       <MapPin className="w-4 h-4 text-red-500" />
       Jayankondam, Ariyalur, Tamil Nadu, India
      </span>
     </div>
    </div>

    {/* Links Columns */}
    {Object.entries(links).map(([title, itemLinks]) => (
     <div key={title} className="space-y-4 col-span-1">
      <h4 className="text-xs uppercase tracking-widest text-white font-bold font-display">{title}</h4>
      <ul className="space-y-3 text-xs">
       {itemLinks.map((link, idx) => (
        <li key={idx}>
         <Link to={link.path} className="hover:text-red-500 :text-white transition-colors text-slate-400">
          {link.label}
         </Link>
        </li>
       ))}
      </ul>
     </div>
    ))}
   </div>

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-red-950/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
    {/* Newsletter form */}
    <div className="w-full md:w-auto">
     <h5 className="text-xs font-semibold text-white mb-2.5 uppercase tracking-wide font-display">Subscribe to our newsletter</h5>
     <form onSubmit={handleSubscribe} className="flex max-w-sm gap-2">
      <input
       type="email"
       placeholder="Your email address"
       required
       aria-label="Email address for newsletter subscription"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       className="flex-1 bg-white border border-neutral-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
      />
      <button
       type="submit"
       disabled={loading}
       className="bg-red-650 hover:bg-red-500 disabled:bg-red-800 text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
      >
       {loading ? '...' : <Send className="w-3.5 h-3.5" />}
       Join
      </button>
     </form>
     {status.message && (
      <p className={`text-[10px] mt-2 ${status.type === 'success' ? 'text-emerald-500 ' : 'text-red-500 '}`}>
       {status.message}
      </p>
     )}
    </div>

    {/* Copyrights and Social links */}
    <div className="flex flex-col items-center md:items-end gap-4 text-xs">
     <div className="flex gap-4 items-center">
      <a href="https://github.com/sivaraman192" target="_blank" rel="noreferrer" className="p-2.5 bg-neutral-900 hover:bg-red-600/10 text-slate-500 hover:text-slate-900 :text-white rounded-xl transition-all" title="GitHub" aria-label="StackKraft GitHub Profile">
       <FaGithub className="w-4.5 h-4.5" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 bg-neutral-900 hover:bg-red-600/10 text-slate-500 hover:text-red-550 :text-red-500 rounded-xl transition-all" title="LinkedIn" aria-label="StackKraft LinkedIn Profile">
       <FaLinkedin className="w-4.5 h-4.5" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 bg-neutral-900 hover:bg-red-600/10 text-slate-500 hover:text-red-550 :text-red-500 rounded-xl transition-all" title="Instagram" aria-label="StackKraft Instagram Profile">
       <FaInstagram className="w-4.5 h-4.5" />
      </a>
      <a href="https://wa.me/919342913781" target="_blank" rel="noreferrer" className="p-2.5 bg-neutral-900 hover:bg-red-600/10 text-slate-500 hover:text-green-500 rounded-xl transition-all" title="WhatsApp" aria-label="StackKraft WhatsApp Chat">
       <FaWhatsapp className="w-4.5 h-4.5" />
      </a>
      {/* Smooth Back to Top Button */}
      <button
       onClick={scrollToTop}
       className="p-2.5 bg-neutral-900 hover:bg-red-600 text-slate-500 hover:text-white rounded-xl border border-neutral-850 cursor-pointer transition-all active:scale-[0.95]"
       title="Back to Top"
      >
       <ArrowUp className="w-4.5 h-4.5" />
      </button>
     </div>
     <p className="text-[10px] text-slate-400 ">
      &copy; {new Date().getFullYear()} StackKraft. All rights reserved.
     </p>
    </div>
   </div>
  </footer>
 );
};

export default Footer;
