import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Shield, Zap, Sparkles, HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import SEO from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/schemaHelper';

const FAQItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left text-sm sm:text-base font-bold text-white font-display py-2 cursor-pointer focus:outline-none group"
      >
        <span className="group-hover:text-[#E50914] transition-colors">{q}</span>
        <ChevronDown className={`w-4 h-4 text-[#E50914] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-xs sm:text-sm text-slate-400 font-light font-sans pt-2 pb-4 leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$250",
      description: "Perfect for landing pages, personal portfolios, and local business websites.",
      features: [
        "1 Responsive Landing Page",
        "Modern React.js or HTML/CSS",
        "Mobile & Tablet Responsive",
        "Contact Form",
        "WhatsApp Integration",
        "Basic SEO Optimization",
        "Cross-Browser Compatibility",
        "7 Days Delivery",
        "1 Month Free Support"
      ],
      cta: "Get Started",
      popular: false,
      color: "border-white/5 hover:border-[#E50914]/30",
      buttonStyle: "bg-black border border-[#E50914] text-[#E50914] hover:bg-[#E50914] hover:text-white hover:shadow-[0_0_15px_rgba(229,9,20,0.3)]",
      icon: Zap,
      gradient: "from-[#E50914]/5 to-transparent"
    },
    {
      name: "Professional",
      price: "$500",
      description: "Ideal for startups, business websites, dashboards, and custom web applications.",
      features: [
        "Up to 5 Responsive Pages",
        "Modern React.js Application",
        "Contact Forms",
        "Basic Admin Dashboard",
        "API Integration",
        "Speed Optimization",
        "Deployment Assistance",
        "Advanced SEO",
        "15 Days Delivery",
        "3 Months Free Support"
      ],
      cta: "Choose Professional",
      popular: true,
      color: "border-[#E50914]/40 ring-1 ring-[#E50914]/25 shadow-[0_0_30px_rgba(229,9,20,0.18)]",
      buttonStyle: "bg-[#E50914] text-white hover:bg-[#c40811] hover:shadow-[0_0_20px_rgba(229,9,20,0.4)]",
      icon: Sparkles,
      gradient: "from-[#E50914]/10 to-transparent"
    },
    {
      name: "Enterprise",
      price: "Custom Quote",
      description: "Built for large businesses, SaaS platforms, admin systems, and enterprise applications.",
      features: [
        "Custom React Application",
        "Node.js + Express Backend",
        "MongoDB Database",
        "Payment Gateway Integration",
        "Advanced Admin Dashboard",
        "Analytics Dashboard",
        "Deployment & Server Configuration",
        "Flexible Delivery Timeline",
        "6 Months Priority Support"
      ],
      cta: "Contact Sales",
      popular: false,
      color: "border-white/5 hover:border-[#E50914]/30",
      buttonStyle: "bg-transparent border border-[#E50914]/50 text-slate-200 hover:border-[#E50914] hover:bg-[#E50914] hover:text-white hover:shadow-[0_0_15px_rgba(229,9,20,0.3)]",
      icon: Shield,
      gradient: "from-[#E50914]/5 to-transparent"
    }
  ];

  const comparisonFeatures = [
    { name: "Responsive Design", starter: true, professional: true, enterprise: true },
    { name: "Modern React.js", starter: "React / HTML", professional: true, enterprise: true },
    { name: "Backend Development", starter: false, professional: false, enterprise: "Node.js & Express" },
    { name: "Database Integration", starter: false, professional: false, enterprise: "MongoDB" },
    { name: "Payment Gateway", starter: false, professional: false, enterprise: "Stripe / Razorpay" },
    { name: "Admin Dashboard", starter: false, professional: "Basic CMS", enterprise: "Advanced Panel" },
    { name: "SEO Optimization", starter: "Basic Meta Tags", professional: "Advanced Optimization", enterprise: "Full Audit & Optimization" },
    { name: "Deployment Support", starter: "Basic setup", professional: "Staging + Production", enterprise: "Continuous Integration & Deployment" },
    { name: "Support Period", starter: "1 Month Free Support", professional: "3 Months Free Support", enterprise: "6 Months Priority Support" }
  ];

  const faqs = [
    {
      q: "How long does development take?",
      a: "Personal portfolios and single-page landing pages are completed within 7 to 10 days. Multi-page dynamic platforms typically require 15 to 20 days. Custom database-backed enterprise applications run in iterative 2-week sprints based on feature complexity."
    },
    {
      q: "Which technologies do you use?",
      a: "We specialize in the MERN ecosystem: Modern React.js, Node.js, Express, and MongoDB. We also leverage Tailwind CSS for styling, Vite for builds, Framer Motion for premium micro-animations, and modern cloud deployment configurations."
    },
    {
      q: "Do you provide hosting?",
      a: "We configure staging environments for all client projects. For final launch, we help set up hosting on production servers (such as Vercel, Netlify, Render, or VPS clouds) and hook up custom domains with SSL certifications."
    },
    {
      q: "Do you provide support?",
      a: "Yes. Every project includes a free warranty period (Starter: 1 Month, Professional: 3 Months, Enterprise: 6 Months Priority Support) covering core bug-fixing, page loading speed checkups, and minor textual adjustments."
    },
    {
      q: "How can I contact you?",
      a: "You can submit our project questionnaire on the Contact page, send an email directly to sivaraman.official13@gmail.com, or initiate a chat via our WhatsApp floats (+91 93429 13781) for rapid replies."
    },
    {
      q: "Can you redesign existing websites?",
      a: "Absolutely. We can rebuild your legacy systems into modern React architectures, upgrading layouts to custom responsive structures, implementing SEO tags, and drastically improving load times."
    }
  ];

  return (
    <div className="relative overflow-hidden min-h-screen pt-28 pb-20 text-white bg-[#050505] transition-colors duration-305 duration-300">
      <SEO 
        title="Pricing Plans"
        description="Choose a pricing plan that fits your business. We offer starter portfolios, professional CMS tools, and enterprise e-commerce portals."
        url="/pricing"
        schema={getBreadcrumbSchema([{ name: 'Pricing', path: '/pricing' }])}
      />

      {/* Pulsing Neon Red Background Orbs */}
      <div className="absolute top-[-50px] left-[-50px] w-[500px] h-[500px] bg-[#E50914]/5 rounded-full blur-[140px] animate-pulse pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-50px] w-[500px] h-[500px] bg-[#E50914]/5 rounded-full blur-[140px] animate-pulse pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        
        {/* Page Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto bg-neutral-950/40 backdrop-blur-xl p-8 rounded-[20px] border border-white/5 shadow-2xl relative">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E50914]/10 border border-[#E50914]/20 text-xs font-semibold text-[#E50914]">
            <Sparkles className="w-3.5 h-3.5 text-[#E50914] animate-pulse" />
            <span>Investment Plans</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
            Transparent <span className="text-[#E50914]">Pricing</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            No hidden costs. Choose a plan that matches your structural requirements or request an individual customized quote.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch text-left">
          {plans.map((plan, idx) => (
            <GlassCard 
              key={idx} 
              delay={idx * 0.1} 
              className={`flex flex-col justify-between h-full relative p-8 bg-neutral-950/40 backdrop-blur-xl border ${plan.color} rounded-[20px] transition-all duration-300 hover:-translate-y-1.5 shadow-2xl overflow-hidden group`}
              hoverEffect={true}
            >
              {/* Decorative inner glow */}
              <div className={`absolute -inset-px bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

              {plan.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#E50914] to-[#b0070f] text-white text-[9px] uppercase tracking-widest font-extrabold px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(229,9,20,0.3)]">
                  MOST POPULAR
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E50914]/10 to-transparent text-[#E50914] flex items-center justify-center border border-[#E50914]/20 shadow-md">
                    <plan.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-display uppercase tracking-wider">{plan.name}</h3>
                    <p className="text-[10px] text-slate-405 text-slate-400 font-light mt-0.5">{plan.name === 'Enterprise' ? 'Enterprise Solution' : 'Fixed Scope'}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-light leading-relaxed">{plan.description}</p>

                <div className="py-4 border-b border-white/5">
                  {plan.name === 'Enterprise' ? (
                    <span className="text-3xl font-extrabold text-[#E50914] font-display">
                      Custom Quote
                    </span>
                  ) : (
                    <div className="flex items-baseline">
                      <span className="text-4xl font-extrabold text-white font-display">{plan.price}</span>
                      <span className="text-slate-500 text-xs font-semibold ml-1.5">USD</span>
                    </div>
                  )}
                </div>

                {/* Features checklist */}
                <ul className="space-y-3.5 pt-2">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs text-slate-350 font-sans font-light">
                      <Check className="w-4.5 h-4.5 text-[#E50914] shrink-0 mt-0.5 bg-[#E50914]/10 p-0.5 rounded-full border border-[#E50914]/20" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to={`/contact?plan=${encodeURIComponent(plan.name.toLowerCase())}`}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${plan.buttonStyle}`}
                >
                  {plan.cta}
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="space-y-6 pt-10 text-left">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Plan Feature Comparison</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">Compare plan details side by side to choose the best solution for your project.</p>
          </div>
          
          <div className="overflow-x-auto rounded-[20px] border border-white/5 bg-neutral-950/30 backdrop-blur-xl shadow-2xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/5 bg-neutral-950/60 text-slate-400 uppercase tracking-widest font-display">
                  <th className="p-5 font-bold">Features</th>
                  <th className="p-5 font-bold text-slate-300">Starter</th>
                  <th className="p-5 font-bold text-[#E50914]">Professional</th>
                  <th className="p-5 font-bold text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-350 font-sans">
                {comparisonFeatures.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-5 font-medium text-white">{item.name}</td>
                    
                    <td className="p-5">
                      {typeof item.starter === 'boolean' 
                        ? (item.starter ? <Check className="w-4.5 h-4.5 text-[#E50914] bg-[#E50914]/10 p-0.5 rounded-full border border-[#E50914]/20" /> : <X className="w-4 h-4 text-slate-700" />)
                        : <span className="text-slate-350 text-slate-300 font-medium">{item.starter}</span>}
                    </td>

                    <td className="p-5">
                      {typeof item.professional === 'boolean' 
                        ? (item.professional ? <Check className="w-4.5 h-4.5 text-[#E50914] bg-[#E50914]/10 p-0.5 rounded-full border border-[#E50914]/20" /> : <X className="w-4 h-4 text-slate-700" />)
                        : <span className="text-slate-350 text-[#E50914] font-medium">{item.professional}</span>}
                    </td>

                    <td className="p-5">
                      {typeof item.enterprise === 'boolean' 
                        ? (item.enterprise ? <Check className="w-4.5 h-4.5 text-[#E50914] bg-[#E50914]/10 p-0.5 rounded-full border border-[#E50914]/20" /> : <X className="w-4 h-4 text-slate-700" />)
                        : <span className="text-white font-bold">{item.enterprise}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto space-y-8 pt-10 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center font-display">Frequently Asked Questions</h2>
          <div className="glassmorphism p-6 sm:p-8 rounded-[20px] border border-white/5 bg-neutral-950/40 backdrop-blur-xl shadow-2xl">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>

        {/* Audit Callout Card */}
        <GlassCard className="p-8 border border-white/5 bg-neutral-950/40 max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-left sm:text-center rounded-[20px] shadow-2xl relative overflow-hidden group">
          <div className={`absolute -inset-px bg-gradient-to-r from-[#E50914]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
          <div className="space-y-1 text-left sm:text-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Not sure which plan to select?</h3>
            <p className="text-xs text-slate-400 font-sans font-light">Request a free technical website analysis audit or layout advice session.</p>
          </div>
          <Link to="/contact?custom=true" className="px-6 py-3 bg-[#E50914] hover:bg-[#c40811] text-white font-bold text-xs uppercase tracking-wider shrink-0 rounded-xl transition-all shadow-md shadow-[#E50914]/15 active:scale-[0.98]">
            Get Free Consultation
          </Link>
        </GlassCard>

      </div>
    </div>
  );
};

export default Pricing;
