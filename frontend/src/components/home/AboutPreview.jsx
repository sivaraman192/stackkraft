import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Terminal } from 'lucide-react';
import GlassCard from '../GlassCard';

const AboutPreview = () => {
 const highlights = [
  "Clean & Scalable Code Architecture",
  "Tailored Modern User Experiences",
  "High-Performance API Integrations",
  "Production-Ready Agile Sprints"
 ];

 return (
  <section className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   {/* Decorative background glow */}
   <div className="glow-orb w-[300px] h-[300px] bg-red-650/5 top-[30%] left-[-150px] animate-pulse-glow" style={{ filter: 'blur(100px)' }} />

   <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
    {/* Left side text contents */}
    <div className="lg:col-span-6 space-y-6 text-left">
     <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
      Why StackKraft
     </div>
     
     <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
      We Engineer Performance-Oriented <br />
      <span className="text-gradient">Digital Solutions</span>
     </h2>
     
     <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
      At StackKraft, we bridge the gap between advanced web engineering and premium visual design. We don't believe in generic templates; every website, CMS platform, and admin system we craft is designed from scratch using modern technology architectures.
     </p>

     <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
      By building with React 19, Tailwind CSS, and headless database stacks, we ensure that your digital platform is lightning-fast, secure, fully search-engine optimized, and responsive across every device.
     </p>

     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
      {highlights.map((highlight, idx) => (
       <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-350">
        <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
        <span>{highlight}</span>
       </div>
      ))}
     </div>

     <div className="pt-4">
      <Link 
       to="/about" 
       className="btn-premium px-6 py-3 text-xs uppercase tracking-wider font-bold"
      >
       Learn About Us
       <ArrowRight className="w-3.5 h-3.5" />
      </Link>
     </div>
    </div>

    {/* Right side: Animated code/terminal illustration */}
    <div className="lg:col-span-6 relative">
     <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
     >
      {/* Terminal Window container */}
      <GlassCard className="border border-red-550/15 overflow-hidden shadow-2xl relative max-w-lg mx-auto bg-neutral-950/80">
       {/* Terminal header */}
       <div className="bg-neutral-900/90 px-4 py-3 flex items-center justify-between border-b border-neutral-850">
        <div className="flex items-center gap-1.5">
         <div className="w-2.5 h-2.5 rounded-full bg-red-650 bg-red-600" />
         <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
         <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
        </div>
        <div className="flex items-center gap-1.5 text-[9px] text-slate-500 uppercase tracking-widest font-mono">
         <Terminal className="w-3 h-3 text-red-500" />
         <span>compiler.log</span>
        </div>
        <div className="w-10" />
       </div>

       {/* Terminal interior */}
       <div className="p-6 font-mono text-[10px] sm:text-[11px] text-slate-400 space-y-3.5 text-left leading-normal">
        <div>
         <span className="text-slate-600">$</span> <span className="text-red-500">npm run</span> build:prod
        </div>
        <motion.div
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         transition={{ delay: 0.3 }}
         className="text-slate-500"
        >
         &gt; compiling production package... <br />
         &gt; optimizing bundle for client load speeds...
        </motion.div>

        {/* Animated progress bar */}
        <div className="w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden">
         <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.6 }}
          className="bg-gradient-to-r from-red-650 to-red-500 h-full"
         />
        </div>

        <motion.div
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         transition={{ delay: 2.2 }}
         className="space-y-1.5 text-slate-350"
        >
         <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">✓</span>
          <span>Webpack Bundle Compiled: <span className="text-red-400">142.4 KB</span></span>
         </div>
         <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">✓</span>
          <span>Lighthouse Performance Score: <span className="text-red-400">100/100</span></span>
         </div>
         <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">✓</span>
          <span>Responsive Core Breakers Checked</span>
         </div>
        </motion.div>

        {/* Blinking cursor at output */}
        <div className="flex items-center gap-1 pt-1.5 text-slate-500">
         <span>stackkraft@prod-server ~ %</span>
         <motion.div 
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="w-1.5 h-3.5 bg-red-500"
         />
        </div>
       </div>
      </GlassCard>
     </motion.div>

     {/* Floating badge */}
     <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 2.4, type: 'spring' }}
      className="absolute top-[-15px] right-[-10px] bg-red-600 text-white text-[9px] font-extrabold uppercase px-3 py-1.5 rounded-xl tracking-wider shadow-lg shadow-red-500/20"
     >
      Lighthouse 100%
     </motion.div>
    </div>
   </div>
  </section>
 );
};

export default AboutPreview;
