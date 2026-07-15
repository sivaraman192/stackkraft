import React from 'react';
import { motion } from 'framer-motion';
import { Search, Layout, Code, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import GlassCard from '../components/GlassCard';
import { getBreadcrumbSchema } from '../utils/schemaHelper';

const Process = () => {
 const steps = [
  {
   number: "01",
   title: "Discovery & Strategy",
   icon: <Search className="w-6 h-6 text-red-500" />,
   tagline: "Research & Scope Definition",
   desc: "Every successful project begins with understanding. We deep dive into your business goals, target audience, and functional requirements. We analyze competitors and define a precise product scope and technical architecture.",
   deliverables: ["Product Requirements Document (PRD)", "Technical Architecture Plan", "Project Timeline & Milestones"]
  },
  {
   number: "02",
   title: "UI/UX Design & Prototyping",
   icon: <Layout className="w-6 h-6 text-red-500" />,
   tagline: "Vibrant & Interactive Mockups",
   desc: "We craft custom, high-fidelity UI/UX design mockups tailored to your brand identity. Using modern design systems, we build layouts that prioritize user flows, aesthetic appeal, and micro-interactions for a premium feel.",
   deliverables: ["Figma Interactive Prototypes", "Custom Design System & Style Guide", "Responsive Layout Mockups"]
  },
  {
   number: "03",
   title: "Premium Agile Development",
   icon: <Code className="w-6 h-6 text-red-500" />,
   tagline: "Clean, Performant Codebases",
   desc: "Our engineering phase turns layouts into functional digital experiences. We write clean, modular React components, styled with Tailwind CSS, built with Vite, and integrated with robust Node.js/Mongoose backend APIs.",
   deliverables: ["Clean Git Code Repository", "Optimized Database Schemas", "Staging Server Deployment"]
  },
  {
   number: "04",
   title: "Launch & Optimization",
   icon: <Rocket className="w-6 h-6 text-red-500" />,
   tagline: "Zero-Downtime Deployment",
   desc: "We conduct extensive testing, SEO configuration, and speed optimizations before going live. The final product is deployed to production-ready hosts like Vercel and Render, ensuring sub-second loads and maximum uptime.",
   deliverables: ["Lighthouse Performance Audit (95%+)", "Complete SEO Meta Config", "Production Launch & Handoff"]
  }
 ];

 return (
  <div className="relative overflow-hidden min-h-screen py-24 text-white">
   <SEO 
    title="Our Process"
    description="Explore StackKraft's 4-step software development methodology. From Discovery and UX Design to Agile Development and Launch."
    url="/process"
    schema={getBreadcrumbSchema([{ name: 'Process', path: '/process' }])}
   />

   {/* Decorative Glow Orbs */}
   <div className="glow-orb w-[400px] h-[400px] bg-red-600/10 top-[20%] left-[-100px] animate-pulse-glow" />
   <div className="glow-orb w-[500px] h-[500px] bg-red-800/10 bottom-[20%] right-[-100px] animate-pulse-glow" />

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
     <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400"
     >
      How We Work
     </motion.div>
     <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display"
     >
      Our Development <span className="text-gradient">Process</span>
     </motion.h1>
     <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-sm sm:text-base text-slate-400 leading-relaxed"
     >
      We combine strategic research, modern design ethics, and robust software engineering to deliver digital products that scale.
     </motion.p>
    </div>

    {/* Timeline Layout */}
    <div className="relative border-l border-red-900/30 max-w-4xl mx-auto pl-8 sm:pl-12 space-y-16 py-4">
     {steps.map((step, idx) => (
      <motion.div
       key={idx}
       initial={{ opacity: 0, x: -30 }}
       whileInView={{ opacity: 1, x: 0 }}
       viewport={{ once: true, margin: "-100px" }}
       transition={{ duration: 0.6, delay: idx * 0.15 }}
       className="relative"
      >
       {/* Timeline dot */}
       <div className="absolute left-[-47px] sm:left-[-61px] top-2.5 w-8 h-8 rounded-full bg-black transition-colors duration-300 border-2 border-red-600 flex items-center justify-center shadow-lg shadow-red-600/20 z-20">
        <span className="text-[10px] font-bold text-red-500 font-display">{step.number}</span>
       </div>

       <GlassCard className="p-8 border-red-500/10 hover:border-red-600/20 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
         <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center">
           {step.icon}
          </div>
          <div>
           <span className="text-[10px] uppercase font-bold tracking-wider text-red-500">{step.tagline}</span>
           <h3 className="text-xl font-bold font-display text-white">{step.title}</h3>
          </div>
         </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
         {step.desc}
        </p>

        {/* Deliverables List */}
        <div className="border-t border-slate-900 pt-6">
         <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
          Key Deliverables:
         </h4>
         <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {step.deliverables.map((del, dIdx) => (
           <li key={dIdx} className="text-xs text-slate-400 bg-red-650/5 border border-slate-150 px-3 py-2 rounded-lg flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-650 bg-red-500 shrink-0" />
            {del}
           </li>
          ))}
         </ul>
        </div>
       </GlassCard>
      </motion.div>
     ))}
    </div>

    {/* CTA */}
    <motion.div
     initial={{ opacity: 0, scale: 0.95 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="max-w-3xl mx-auto text-center mt-24 p-10 border border-red-500/10 rounded-2xl glassmorphism space-y-6"
    >
     <h2 className="text-xl sm:text-2xl font-bold font-display">Ready to Build Your Project?</h2>
     <p className="text-xs text-slate-400">
      Let's translate your vision into a scalable, high-performance web solution with our structured workflow.
     </p>
     <div className="pt-2">
      <motion.a
       whileHover={{ scale: 1.03 }}
       whileTap={{ scale: 0.97 }}
       href="/contact"
       className="btn-premium px-8 py-3.5 text-xs font-bold uppercase"
      >
       Get Free Consultation
       <ArrowRight className="w-4 h-4" />
      </motion.a>
     </div>
    </motion.div>
   </div>
  </div>
 );
};

export default Process;
