import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
 Layout, Sparkles, Award, Code, Database, Wrench, Check, HelpCircle, 
 ArrowRight, X, ChevronDown, Clock, Search, Laptop, ShieldCheck, Cpu, 
 Layers, Globe2, Gauge
} from 'lucide-react';
import { 
 FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaWhatsapp 
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si';
import GlassCard from '../components/GlassCard';
import SEO from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/schemaHelper';

const Services = () => {
 const [selectedService, setSelectedService] = useState(null);
 const [faqOpen, setFaqOpen] = useState(null);

 const servicesList = [
  {
   title: "Business Website",
   desc: "Complete corporate sites engineered with customized layouts, service directories, maps, and SEO optimizations.",
   icon: <Layout className="w-6 h-6 text-red-500" />,
   pricing: "FROM ₹12,000 / $149",
   benefits: [
    "Highly responsive layouts tested on all device viewports",
    "Configured custom domains, DNS routing, and hosting pipelines",
    "Integrated dynamic contact forms and lead captures",
    "Semantic layout elements optimized for Google SEO indexing"
   ],
   technologies: ["React 19", "Tailwind CSS", "Vite", "Node.js"],
   longDesc: "A complete professional solution for businesses looking to build web authority. We build tailored multipage sites with customizable features, blog setups, analytics tracking, and localized search engine optimization to capture clients."
  },
  {
   title: "Landing Page",
   desc: "High-conversion single page frameworks designed for product campaigns, startups, and marketing funnels.",
   icon: <Sparkles className="w-6 h-6 text-red-500" />,
   pricing: "FROM ₹6,000 / $79",
   benefits: [
    "Focused visual flows optimized for maximum conversions",
    "Lightweight codebase achieving sub-second edge loads",
    "EmailJS or direct REST API contact form integrations",
    "Vibrant call-to-action (CTA) buttons with interactive glows"
   ],
   technologies: ["React 19", "Tailwind CSS", "Framer Motion", "Vite"],
   longDesc: "Designed to drive actions. Whether you are running paid Google/Facebook ads or capturing email subscribers for a product pre-launch, our landing pages feature ultra-clean layouts, premium micro-animations, and fast execution speeds."
  },
  {
   title: "Portfolio Website",
   desc: "Creative, interactive personal portfolios with smooth custom scroll indicators, dark themes, and contact channels.",
   icon: <Award className="w-6 h-6 text-red-500" />,
   pricing: "FROM ₹8,000 / $99",
   benefits: [
    "Unique creative design matching your developer/creative voice",
    "Interactive case study galleries with custom filter switches",
    "Embedded social links, GitHub showcases, and PDF resumes",
    "Direct contact channels including WhatsApp float triggers"
   ],
   technologies: ["React 19", "Tailwind CSS", "Framer Motion", "Vite"],
   longDesc: "Establish your professional identity. Ideal for software engineers, designers, architects, and creators who want a premium portfolio with glassmorphism card highlights, customized animations, and a modern dark aesthetic."
  },
  {
   title: "React Development",
   desc: "Single Page Apps (SPAs) built with React 19, custom hooks, context management, and fast component loads.",
   icon: <Code className="w-6 h-6 text-red-500" />,
   pricing: "FROM ₹16,000 / $199",
   benefits: [
    "Highly modular, reusable React component structures",
    "Advanced context and state hook configurations",
    "Fast bundle compiles utilizing Vite builders",
    "Smooth page rendering with react-router-dom transition layers"
   ],
   technologies: ["React 19", "React Router", "Vite", "Tailwind CSS"],
   longDesc: "If you have an existing design or require a custom interface constructed on React 19, we build scalable client-side rendering code. We write optimized, component-focused codebases that fit modern UI/UX specifications."
  },
  {
   title: "Website Maintenance",
   desc: "Continuous performance audits, SEO improvements, software security patches, and hosting configuration support.",
   icon: <Wrench className="w-6 h-6 text-red-500" />,
   pricing: "FROM ₹5,000 / MONTH ($59/month)",
   benefits: [
    "Monthly package audits and software security upgrades",
    "Lightweight content adjustments and image compressions",
    "Light/dark mode visual reviews and broken link fixes",
    "Domain, SSL, and server database health monitoring"
   ],
   technologies: ["Node.js", "Express.js", "MongoDB", "Vercel / AWS"],
   longDesc: "Keep your site running at peak efficiency. We offer proactive maintenance checks to ensure your packages do not fall behind, sitemaps are refreshed, and page load speeds do not drop due to database build-ups."
  },
  {
   title: "Full Stack Web App",
   desc: "Bespoke SaaS platforms, custom dashboards, database schemas, JWT authentication, and Express REST APIs.",
   icon: <Database className="w-6 h-6 text-red-500" />,
   pricing: "FROM ₹32,000 / $399",
   benefits: [
    "Highly secure authentication utilizing JWT and bcrypt encryption",
    "Mongoose schemas with indexes for rapid database queries",
    "Complete admin panels for managing items and leads",
    "Secure file upload controllers utilizing multer middleware"
   ],
   technologies: ["React 19", "Node.js", "Express.js", "MongoDB", "Mongoose"],
   longDesc: "A complete custom product. We engineer server infrastructures from scratch, connecting frontend React applications to backend Node.js APIs. Includes database design, dashboard analytics, email integrations, and role-based access controllers."
  }
 ];

 const processSteps = [
  {
   phase: "01",
   title: "Discovery",
   desc: "We analyze your business targets, research competitor assets, and map out product requirements.",
   icon: <Search className="w-5 h-5 text-red-500" />
  },
  {
   phase: "02",
   title: "Planning",
   desc: "We formulate the sitemap, establish database schemas, and outline sprints and timeline schedules.",
   icon: <Clock className="w-5 h-5 text-red-500" />
  },
  {
   phase: "03",
   title: "Design",
   desc: "We build high-fidelity mockups in Figma, configuring the premium dark styling and glassmorphism elements.",
   icon: <Sparkles className="w-5 h-5 text-red-500" />
  },
  {
   phase: "04",
   title: "Development",
   desc: "Our engineers write component-driven React 19 code, compile endpoints in Node.js, and apply Tailwind v4 styles.",
   icon: <Code className="w-5 h-5 text-red-500" />
  },
  {
   phase: "05",
   title: "Launch",
   desc: "We run Edge CDN checks, verify sitemaps, configure custom domains, and deploy client assets live.",
   icon: <Globe2 className="w-5 h-5 text-red-500" />
  }
 ];

 const technologies = [
  { name: 'React 19', icon: <FaReact className="w-7 h-7 text-red-500" /> },
  { name: 'Node.js', icon: <FaNodeJs className="w-7 h-7 text-red-500" /> },
  { name: 'Express', icon: <SiExpress className="w-7 h-7 text-red-500" /> },
  { name: 'MongoDB', icon: <SiMongodb className="w-7 h-7 text-red-500" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-7 h-7 text-red-500" /> },
  { name: 'JavaScript', icon: <FaJs className="w-7 h-7 text-red-500" /> },
  { name: 'HTML5', icon: <FaHtml5 className="w-7 h-7 text-red-500" /> },
  { name: 'CSS3', icon: <FaCss3Alt className="w-7 h-7 text-red-500" /> }
 ];

 const pricingPackages = [
  {
   title: "Starter Plan",
   price: "₹15,000",
   dollars: "$250",
   desc: "Perfect for personal portfolios, freelancers, and local business landing pages.",
   features: [
    "1 Custom Page Layout",
    "Mobile Responsive Design",
    "Tailwind CSS v4 Styling",
    "Basic SEO Meta Config",
    "Contact Email Intake Form",
    "7 Days Turnaround"
   ]
  },
  {
   title: "Professional Plan",
   price: "₹30,000",
   dollars: "$500",
   desc: "Ideal for growing business startups, dynamic portfolios, and CMS integrations.",
   features: [
    "Up to 5 Pages Layouts",
    "Advanced Glassmorphism UI",
    "Framer Motion Animations",
    "MongoDB / Mongoose CMS Integration",
    "Admin Dashboard Preview",
    "Full SEO Meta Config & Sitemap",
    "15 Days Turnaround"
   ],
   popular: true
  },
  {
   title: "Enterprise Plan",
   price: "Custom",
   dollars: "Custom Quote",
   desc: "Bespoke full-stack web applications, e-commerce networks, and SaaS integrations.",
   features: [
    "Unlimited Custom Page Layouts",
    "Full Stack (React 19 + Express API)",
    "Secure JWT Authentication",
    "Payment Gateway Integration",
    "Advanced Database Schemas",
    "Dedicated Admin Panel CRUD Setup",
    "Priority Maintenance Support"
   ]
  }
 ];

 const faqs = [
  {
   q: "What types of web technologies do you use?",
   a: "We primary develop custom digital applications using the MERN stack (MongoDB, Express.js, React.js, and Node.js). Everything is styled with Tailwind CSS, built with Vite for compilation efficiency, and animated with Framer Motion."
  },
  {
   q: "Can you upgrade my legacy application to React 19?",
   a: "Yes. We specialize in legacy refactoring, updating state systems, migrating projects from legacy webpack configurations to Vite, resolving package conflict issues, and integrating standard hooks."
  },
  {
   q: "What does website maintenance cover?",
   a: "Our monthly maintenance covers regular package audit patches, sitemap refreshes, server log monitoring on Render/AWS, content edits, assets optimizations, and technical search alignment."
  },
  {
   q: "Do you offer custom pricing splits?",
   a: "Yes. For complex full-stack web applications or custom SaaS models, we break down pricing structures into milestones and sprints matching development deliverables."
  },
  {
   q: "How fast can you deliver a landing page?",
   a: "A standard, high-conversion single page landing page or personal portfolio website is typically launched within 5 to 7 business days from target approval."
  }
 ];

 return (
  <div className="relative overflow-hidden min-h-screen text-white bg-[#050505] transition-colors duration-300 selection:bg-red-600 selection:text-white">
   <SEO 
    title="Our Services"
    description="Premium web development and custom digital capabilities by StackKraft. Discover our services, process timeline, pricing, and FAQs."
    url="/services"
    schema={getBreadcrumbSchema([{ name: 'Services', path: '/services' }])}
   />

   {/* Decorative Background Glow Orbs */}
   <div className="glow-orb w-[450px] h-[450px] bg-red-600/10 top-[-50px] right-[-100px] animate-pulse-glow" style={{ filter: 'blur(120px)' }} />
   <div className="glow-orb w-[500px] h-[500px] bg-red-800/10 bottom-[20%] left-[-150px] animate-pulse-glow" style={{ filter: 'blur(140px)' }} />

   {/* Large Hero Header */}
   <section className="relative pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 z-10">
    <motion.div
     initial={{ opacity: 0, y: -10 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5 }}
     className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400"
    >
     <Sparkles className="w-3.5 h-3.5 text-red-500" />
     <span>Our Services</span>
    </motion.div>
    
    <motion.h1
     initial={{ opacity: 0, y: 30 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6, delay: 0.1 }}
     className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] font-display"
    >
     We Engineer <span className="text-gradient">Premium Digital</span> <br />
     Platforms
    </motion.h1>
    
    <motion.p
     initial={{ opacity: 0, y: 30 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6, delay: 0.2 }}
     className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-sans"
    >
     Explore our range of scalable web application development services, optimized from the ground up for load speed performance, modern aesthetics, and seamless user interaction.
    </motion.p>
   </section>

   {/* Service Categories Grid */}
   <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     {servicesList.map((service, idx) => (
      <motion.div
       key={idx}
       initial={{ opacity: 0, y: 30 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.5, delay: idx * 0.08 }}
       className="flex"
      >
       <GlassCard className="flex flex-col justify-between h-full border border-red-500/10 hover:border-red-650/40 hover:shadow-[0_0_25px_rgba(220,38,38,0.08)] p-8 transition-all duration-300 group hover:translate-y-[-4px] w-full text-left bg-neutral-950 border-slate-200 rounded-2xl">
        <div className="space-y-6">
         {/* Top section: Icon and Pricing */}
         <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-red-600/10 text-red-500 border border-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
           {service.icon}
          </div>
          <span className="text-[10px] bg-red-950 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
           {service.pricing}
          </span>
         </div>

         {/* Service Titles */}
         <div className="space-y-2">
          <h3 className="text-lg font-bold text-white font-display group-hover:text-red-500 transition-colors">
           {service.title}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
           {service.desc}
          </p>
         </div>

         {/* Bullet deliverable points preview */}
         <ul className="space-y-2.5 pt-2">
          {service.benefits.slice(0, 3).map((benefit, bIdx) => (
           <li key={bIdx} className="text-[11px] text-slate-350 flex items-start gap-2 leading-relaxed">
            <Check className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
            <span>{benefit}</span>
           </li>
          ))}
         </ul>
        </div>

        {/* Bottom tech badges and buttons */}
        <div className="pt-6 mt-6 border-t border-neutral-900 flex items-center justify-between">
         <div className="flex gap-1.5">
          {service.technologies.slice(0, 2).map((tech, tIdx) => (
           <span key={tIdx} className="text-[9px] bg-neutral-900 border border-neutral-850 px-2 py-0.5 rounded-md text-slate-400 font-semibold">
            {tech}
           </span>
          ))}
         </div>

         <div className="flex gap-2">
          <button 
           onClick={() => setSelectedService(service)}
           className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-white border border-neutral-850 hover:bg-neutral-900 transition-colors cursor-pointer"
          >
           Learn More
          </button>
          <Link
           to={`/contact?service=${encodeURIComponent(service.title.toLowerCase())}`}
           className="btn-premium px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
           Get Started
          </Link>
         </div>
        </div>
       </GlassCard>
      </motion.div>
     ))}
    </div>
   </section>

   {/* Process Section (Timeline) */}
   <section className="bg-white/40 border-slate-200 border-slate-200  border-y border-red-950/20 py-24 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-20">
     <div className="space-y-4">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
       Workflow
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
       Our Development Process
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed font-sans">
       We divide every contract into agile milestone checkpoints, guaranteeing clean deliveries on target timelines.
      </p>
     </div>

     {/* Timeline Process Loop */}
     <div className="relative max-w-4xl mx-auto">
      {/* Desktop timeline line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-950/20 -translate-y-1/2 hidden md:block" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-25">
       {processSteps.map((step, idx) => (
        <motion.div
         key={idx}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.5, delay: idx * 0.1 }}
         className="flex flex-col items-center text-center space-y-4 group"
        >
         {/* Glowing bubble anchor */}
         <div className="w-12 h-12 rounded-full bg-neutral-900 border border-red-500/25 flex items-center justify-center relative z-20 group-hover:border-red-500 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.25)] transition-all duration-300 bg-[#050505] transition-colors duration-300">
          {step.icon}
         </div>

         {/* Step metadata */}
         <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 font-bold block uppercase">
           Phase {step.phase}
          </span>
          <h3 className="text-sm font-bold text-white font-display">
           {step.title}
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans max-w-[180px] mx-auto">
           {step.desc}
          </p>
         </div>
        </motion.div>
       ))}
      </div>
     </div>
    </div>
   </section>

   {/* Technology Section Grid */}
   <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center space-y-16">
    <div className="space-y-4">
     <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
      Ecosystem
     </div>
     <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
      Our Core Technology Stack
     </h2>
     <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed font-sans">
      We write production-ready code with modern technologies, ensuring fast rendering and robust security.
     </p>
    </div>

    {/* Tech Logos Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
     {technologies.map((tech, idx) => (
      <motion.div
       key={idx}
       initial={{ opacity: 0, scale: 0.95 }}
       whileInView={{ opacity: 1, scale: 1 }}
       viewport={{ once: true }}
       transition={{ duration: 0.4, delay: idx * 0.05 }}
       className="flex"
      >
       <GlassCard className="p-6 border border-slate-150 hover:border-red-500/20 flex flex-col items-center justify-center gap-3 w-full bg-white/40 border-slate-200 border-slate-200  hover:shadow-[0_0_15px_rgba(220,38,38,0.04)] transition-all duration-300 group">
        <div className="group-hover:scale-110 transition-transform duration-300">
         {tech.icon}
        </div>
        <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
         {tech.name}
        </span>
       </GlassCard>
      </motion.div>
     ))}
    </div>
   </section>

   {/* Pricing Preview Table */}
   <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-red-950/10 relative z-10 text-center space-y-16">
    <div className="space-y-4">
     <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
      Investment Plans
     </div>
     <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
      Flexible Pricing Packages
     </h2>
     <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed font-sans">
      Clear, upfront investment configurations with dedicated timelines. Select a plan to start your roadmap.
     </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
     {pricingPackages.map((pkg, idx) => (
      <motion.div
       key={idx}
       initial={{ opacity: 0, y: 25 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.5, delay: idx * 0.1 }}
       className="flex"
      >
       <GlassCard className={`flex flex-col justify-between w-full p-8 border border-red-500/10 relative h-full transition-all hover:scale-[1.01] bg-white/70 border-slate-200 border-slate-200 rounded-2xl ${
        pkg.popular ? 'border-red-500/30 bg-red-950/5 shadow-xl shadow-red-650/5' : ''
       }`}>
        {pkg.popular && (
         <span className="absolute top-4 right-4 bg-red-600 text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider">
          Most Popular
         </span>
        )}
        
        <div className="space-y-6 text-left">
         <div>
          <h3 className="text-lg font-bold text-white font-display">{pkg.title}</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed mt-1.5 font-sans">{pkg.desc}</p>
         </div>
         
         <div className="border-b border-red-950/20 pb-6">
          <span className="text-3xl font-extrabold text-white font-display">{pkg.price}</span>
          <span className="text-slate-500 text-xs font-medium ml-1">/ {pkg.dollars}</span>
         </div>
         
         <ul className="space-y-3.5">
          {pkg.features.map((feature, fIdx) => (
           <li key={fIdx} className="text-xs text-slate-350 flex items-center gap-2.5 font-sans">
            <Check className="w-4 h-4 text-red-550 text-red-500 shrink-0" />
            {feature}
           </li>
          ))}
         </ul>
        </div>

        <div className="pt-8">
         <Link
          to={`/contact?plan=${pkg.title.toLowerCase().split(' ')[0]}`}
          className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center transition-all cursor-pointer ${
           pkg.popular 
            ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/20' 
            : 'bg-neutral-900 hover:bg-neutral-800 text-slate-300 hover:text-white border border-neutral-850'
          }`}
         >
          Select Plan
         </Link>
        </div>
       </GlassCard>
      </motion.div>
     ))}
    </div>
   </section>

   {/* FAQ Accordion Section */}
   <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-red-950/10 relative z-10 text-left">
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
         <ChevronDown className={`w-4 h-4 text-red-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
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

   {/* Contact CTA Section */}
   <section className="relative overflow-hidden py-24 z-10 border-t border-red-950/20 bg-neutral-950 border-slate-200 ">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_60%)] pointer-events-none" />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-20">
     <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white leading-tight">
      Need a Custom Website or SaaS App?
     </h2>
     <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed font-sans">
      Submit your requirements to initiate sprint timeline scopes, cost structures, and hosting integrations.
     </p>
     <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
      <Link 
       to="/contact?quote=true" 
       className="btn-premium px-8 py-3 text-xs uppercase tracking-wider font-bold w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98] transition-transform"
      >
       Get Free Quote
       <ArrowRight className="w-3.5 h-3.5" />
      </Link>
      <Link 
       to="/contact" 
       className="flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 hover:border-red-500/30 text-slate-350 hover:text-white font-semibold px-8 py-3 rounded-full transition-all text-xs uppercase tracking-wider w-full sm:w-auto"
      >
       Contact Us
      </Link>
     </div>
    </div>
   </section>

   {/* Details Modal */}
   <AnimatePresence>
    {selectedService && (
     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay */}
      <motion.div 
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       onClick={() => setSelectedService(null)}
       className="absolute inset-0 bg-black transition-colors duration-300/80 backdrop-blur-sm"
      />
      
      {/* Modal Body */}
      <motion.div
       initial={{ opacity: 0, scale: 0.95, y: 20 }}
       animate={{ opacity: 1, scale: 1, y: 0 }}
       exit={{ opacity: 0, scale: 0.95, y: 20 }}
       transition={{ type: 'spring', damping: 25, stiffness: 200 }}
       className="relative max-w-xl w-full glassmorphism border border-red-500/20 rounded-2xl p-6 sm:p-8 bg-[#0d0d0d]/95 z-10 max-h-[85vh] overflow-y-auto shadow-2xl"
      >
       <button 
        onClick={() => setSelectedService(null)}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
       >
        <X className="w-5 h-5" />
       </button>

       <div className="space-y-6 text-left">
        <div className="flex items-center gap-4">
         <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          {selectedService.icon}
         </div>
         <div>
          <h3 className="text-xl font-bold text-white font-display leading-tight">{selectedService.title}</h3>
          <span className="text-[10px] uppercase font-bold tracking-wider text-red-500 mt-1 block font-mono">{selectedService.pricing}</span>
         </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans border-b border-red-950/20 pb-4">
         {selectedService.longDesc}
        </p>

        {/* Features / Key Deliverables */}
        <div className="space-y-3">
         <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">Key Deliverables</h4>
         <ul className="space-y-2">
          {selectedService.benefits.map((benefit, idx) => (
           <li key={idx} className="text-xs text-slate-350 flex items-start gap-2.5 leading-normal font-sans">
            <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{benefit}</span>
           </li>
          ))}
         </ul>
        </div>

        {/* Technologies */}
        <div className="space-y-3 pt-2">
         <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">Technologies Utilized</h4>
         <div className="flex flex-wrap gap-2">
          {selectedService.technologies.map((tech, idx) => (
           <span key={idx} className="text-[10px] bg-red-655/5 bg-red-600/5 border border-red-500/20 px-3 py-1 rounded-full text-slate-300 font-semibold font-sans">
            {tech}
           </span>
          ))}
         </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex gap-3">
         <Link
          to={`/contact?service=${encodeURIComponent(selectedService.title.toLowerCase())}`}
          onClick={() => setSelectedService(null)}
          className="flex-1 btn-premium py-3 text-xs font-bold uppercase tracking-wider text-center"
         >
          Start Project Sprint
         </Link>
         <button
          onClick={() => setSelectedService(null)}
          className="px-6 py-3 border border-neutral-850 hover:bg-neutral-900 rounded-full text-xs text-slate-400 hover:text-white transition-all font-semibold uppercase tracking-wider cursor-pointer"
         >
          Close
         </button>
        </div>
       </div>
      </motion.div>
     </div>
    )}
   </AnimatePresence>
  </div>
 );
};

export default Services;
