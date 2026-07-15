import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import GlassCard from '../components/GlassCard';
import { getBreadcrumbSchema } from '../utils/schemaHelper';

const FAQ = () => {
 const [activeIdx, setActiveIdx] = useState(null);

 const faqData = [
  {
   category: "General Queries",
   items: [
    {
     q: "What is StackKraft?",
     a: "StackKraft is a premium full-stack software agency that builds modern, custom digital experiences. We design, develop, and optimize high-performing landing pages, portfolios, administrative dashboards, e-commerce applications, and complex enterprise software solutions."
    },
    {
     q: "Who founded StackKraft and where are you located?",
     a: "StackKraft was founded by Sivaraman M, a CSE B.E. graduate and expert full-stack developer. We are based in Jayankondam, Ariyalur, Tamil Nadu, India, and operate remotely to serve startups, businesses, and international brands globally."
    },
    {
     q: "How does the communication process work during a project?",
     a: "We maintain 100% transparency. We set up shared Slack/Discord channels, schedule bi-weekly sprint reviews, and provide real-time access to progress via live git repositories and staging web servers."
    }
   ]
  },
  {
   category: "Development & Stack",
   items: [
    {
     q: "What technologies do you specialize in?",
     a: "Our core stack is the MERN stack (MongoDB, Express.js, React, Node.js). We build our frontends with React 19, Tailwind CSS, Vite, and Framer Motion. We also build enterprise integrations using Node.js, Mongoose, and third-party databases."
    },
    {
     q: "Are the websites you build mobile responsive and optimized for SEO?",
     a: "Absolutely. Responsive design is a core standard for us, not an upgrade. Every website is built with mobile-first Tailwind guidelines, semantic HTML structures, metadata tags via react-helmet-async, schema markups, and Lighthouse speed audits targeting 95%+ scores."
    },
    {
     q: "Do you integrate third-party payment gateways?",
     a: "Yes, we integrate Stripe, PayPal, Razorpay, and other local or international payment gateways depending on your business requirements, ensuring secure, SSL-encrypted payment flows."
    }
   ]
  },
  {
   category: "Timeline & Pricing",
   items: [
    {
     q: "How long does a website take to build?",
     a: "Timeline depends on scope: \n• Landing page/Portfolio: 5 to 7 business days.\n• Standard Business Website: 10 to 15 business days.\n• Custom E-commerce / Admin Dashboard: 3 to 5 weeks."
    },
    {
     q: "What is your pricing model?",
     a: "We offer both fixed-price packages and custom project quotes. Our packages include: \n• Starter (Portfolios & Local landing pages): from ₹15,000 / $250\n• Professional (Dynamic CMS & database integration): from ₹30,000 / $500\n• Enterprise (Full e-commerce, custom panels): custom quoting."
    },
    {
     q: "Do you offer post-launch maintenance?",
     a: "Yes, we offer ongoing monthly maintenance and support packages. This covers software package updates, security patching, hosting renewals, SEO health monitoring, and minor content additions."
    }
   ]
  }
 ];

 // Flattened items for easy indexing/toggling
 const allItems = faqData.reduce((acc, cat) => [...acc, ...cat.items], []);

 const toggleFAQ = (globalIndex) => {
  setActiveIdx(activeIdx === globalIndex ? null : globalIndex);
 };

 let globalCounter = 0;

 return (
  <div className="relative overflow-hidden min-h-screen py-24 text-white">
   <SEO 
    title="FAQ"
    description="Find answers to frequently asked questions about StackKraft's software services, tech stack, timelines, pricing models, and agency location."
    url="/faq"
    schema={getBreadcrumbSchema([{ name: 'FAQ', path: '/faq' }])}
   />

   {/* Decorative Glow Orbs */}
   <div className="glow-orb w-[300px] h-[300px] bg-red-600/5 top-[15%] right-[-50px] animate-pulse-glow" />
   <div className="glow-orb w-[400px] h-[400px] bg-red-800/5 bottom-[10%] left-[-100px] animate-pulse-glow" />

   <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
     <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
      Got Questions?
     </div>
     <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display">
      Frequently Asked <span className="text-gradient">Questions</span>
     </h1>
     <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
      Everything you need to know about partnering with StackKraft. If your query isn't listed, feel free to reach out.
     </p>
    </div>

    {/* FAQs Accordion */}
    <div className="space-y-12">
     {faqData.map((category, catIdx) => (
      <div key={catIdx} className="space-y-4">
       <h2 className="text-sm font-extrabold tracking-widest text-red-500 uppercase font-display border-b border-red-900/25 pb-2">
        {category.category}
       </h2>
       <div className="space-y-3">
        {category.items.map((item) => {
         const currentIndex = globalCounter++;
         const isOpen = activeIdx === currentIndex;

         return (
          <motion.div 
           key={currentIndex}
           initial={{ opacity: 0, y: 15 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.4 }}
          >
           <GlassCard className={`border-red-500/10 hover:border-red-600/20 transition-all ${isOpen ? 'bg-red-950/5 border-red-500/20' : ''}`}>
            <button
             onClick={() => toggleFAQ(currentIndex)}
             className="w-full flex items-center justify-between text-left p-5 focus:outline-none cursor-pointer"
            >
             <span className="text-sm sm:text-base font-semibold text-white flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-red-500 shrink-0" />
              {item.q}
             </span>
             <ChevronDown className={`w-4 h-4 text-red-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
             {isOpen && (
              <motion.div
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: 'auto', opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="overflow-hidden"
              >
               <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed whitespace-pre-line border-t border-slate-900/50 pt-4">
                {item.a}
               </div>
              </motion.div>
             )}
            </AnimatePresence>
           </GlassCard>
          </motion.div>
         );
        })}
       </div>
      </div>
     ))}
    </div>

    {/* CTA */}
    <div className="text-center mt-20 p-8 border border-red-500/10 rounded-2xl glassmorphism space-y-4">
     <h3 className="text-lg font-bold font-display">Still have unanswered questions?</h3>
     <p className="text-xs text-slate-400 max-w-sm mx-auto">
      Get in touch with us directly. We are happy to walk you through our strategies and workflow.
     </p>
     <div className="pt-2">
      <a href="/contact" className="btn-premium px-6 py-2.5 text-xs font-bold uppercase">
       Contact Team
       <ArrowRight className="w-3.5 h-3.5" />
      </a>
     </div>
    </div>
   </div>
  </div>
 );
};

export default FAQ;
