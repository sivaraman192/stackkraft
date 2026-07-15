import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Gauge, Globe2, Layers, Cpu, Server } from 'lucide-react';
import GlassCard from '../GlassCard';

const FeatureSection = () => {
 const features = [
  {
   title: "Enterprise Web Security",
   desc: "Every deployment is secured with automated HTTPS routing, JWT token storage, and sanitized input validation protocols to guard against vulnerability threats.",
   icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
   gridSpan: "md:col-span-2",
   badge: "Security"
  },
  {
   title: "Extreme Optimization",
   desc: "We target a perfect 100 Lighthouse performance rating by utilizing lazy loading, optimized code splitting, and lightweight component models.",
   icon: <Gauge className="w-6 h-6 text-red-500" />,
   gridSpan: "md:col-span-1",
   badge: "Performance"
  },
  {
   title: "Global CDN Edge Hosting",
   desc: "Deployments are scaled globally through modern CDNs (Vercel, Netlify, or AWS Edge), guaranteeing instant page loads regardless of geolocation.",
   icon: <Globe2 className="w-6 h-6 text-red-500" />,
   gridSpan: "md:col-span-1",
   badge: "Cloud"
  },
  {
   title: "Scalable Microservices",
   desc: "Our full-stack platforms are modularized using Express REST API services, allowing you to easily scale functional blocks, databases, and microservices independently.",
   icon: <Layers className="w-6 h-6 text-red-500" />,
   gridSpan: "md:col-span-2",
   badge: "Architecture"
  }
 ];

 return (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
   {/* Background glowing decorations */}
   <div className="absolute bottom-[10%] left-[10%] -z-10 bg-red-650/5 blur-3xl w-[400px] h-[300px] rounded-full pointer-events-none" />

   {/* Section Header */}
   <div className="text-center space-y-4 mb-20">
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
     Core Engineering
    </div>
    <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
     Architected for Modern Demand
    </h2>
    <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed font-sans">
     We combine cutting-edge technology protocols to build high-performance products that grow businesses.
    </p>
   </div>

   {/* Asymmetric Vercel-style Grid */}
   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {features.map((feat, idx) => (
     <motion.div
      key={idx}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className={`${feat.gridSpan} flex`}
     >
      <GlassCard className="p-8 border border-red-500/10 hover:border-red-650/30 hover:shadow-[0_0_30px_rgba(220,38,38,0.06)] bg-neutral-950/60 transition-all duration-300 w-full text-left flex flex-col justify-between items-start group">
       <div className="space-y-6 w-full">
        {/* Header elements */}
        <div className="flex justify-between items-start w-full">
         <div className="w-12 h-12 rounded-xl bg-red-600/10 text-red-500 border border-red-500/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          {feat.icon}
         </div>
         <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase border border-neutral-850 px-2 py-0.5 rounded">
          {feat.badge}
         </span>
        </div>

        {/* Text blocks */}
        <div className="space-y-2">
         <h3 className="text-lg font-bold text-white font-display">
          {feat.title}
         </h3>
         <p className="text-xs text-slate-400 leading-relaxed font-sans">
          {feat.desc}
         </p>
        </div>
       </div>

       {/* Decorative design highlight */}
       <div className="mt-8 pt-4 w-full border-t border-neutral-850 flex items-center gap-2 text-slate-500 text-[10px] uppercase tracking-widest font-mono select-none">
        <Cpu className="w-3.5 h-3.5 text-red-500 animate-pulse" />
        <span>Standard Protocol Enabled</span>
       </div>
      </GlassCard>
     </motion.div>
    ))}
   </div>
  </section>
 );
};

export default FeatureSection;
