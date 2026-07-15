import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
 Zap, Search, Laptop, Sparkles, Code2, CircleDollarSign, ArrowRight 
} from 'lucide-react';
import GlassCard from '../GlassCard';

const WhyChooseUs = () => {
 const chooseReasons = [
  { 
   title: "Fast Delivery", 
   desc: "Agile sprints and rapid code deployments to meet your strict launch goals.", 
   icon: <Zap className="w-5 h-5 text-red-500" /> 
  },
  { 
   title: "SEO Friendly", 
   desc: "Structured semantic tags, fast rendering speeds, and schema setups.", 
   icon: <Search className="w-5 h-5 text-red-500" /> 
  },
  { 
   title: "Responsive Layouts", 
   desc: "Fluid layouts built with custom breakpoint rules tested on mobile, tablet, and desktop.", 
   icon: <Laptop className="w-5 h-5 text-red-500" /> 
  },
  { 
   title: "Modern UI", 
   desc: "Pixel-perfect glassmorphism, dynamic transitions, and modern aesthetics.", 
   icon: <Sparkles className="w-5 h-5 text-red-500" /> 
  },
  { 
   title: "Clean Code", 
   desc: "Readable, component-driven React code structure that's easy to maintain and scale.", 
   icon: <Code2 className="w-5 h-5 text-red-500" /> 
  },
  { 
   title: "Affordable Pricing", 
   desc: "Fair packages and transparent project costs with no hidden hosting charges.", 
   icon: <CircleDollarSign className="w-5 h-5 text-red-500" /> 
  }
 ];

 return (
  <section className="bg-neutral-950/80 border-y border-red-950/20 py-24 relative z-10">
   {/* Decorative glows */}
   <div className="absolute right-[5%] top-[10%] -z-10 bg-red-600/5 blur-3xl w-[300px] h-[300px] rounded-full pointer-events-none" />

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
    {/* Left Side Content */}
    <div className="lg:col-span-5 space-y-6 text-left">
     <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
      Why Partner With Us
     </div>
     <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
      Digital Solutions <br />
      <span className="text-gradient">Engineered to Rank</span>
     </h2>
     <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
      We design custom interfaces with clean, performance-optimized, and search-aligned code structures. Every project we launch balances beautiful visuals with actual commercial conversion results.
     </p>
     <div className="pt-2">
      <Link 
       to="/about" 
       className="btn-premium px-6 py-3 text-xs uppercase tracking-wider font-bold"
      >
       Learn About Us
       <ArrowRight className="w-3.5 h-3.5" />
      </Link>
     </div>
    </div>

    {/* Right Side Cards Grid */}
    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
     {chooseReasons.map((reason, idx) => (
      <motion.div
       key={idx}
       initial={{ opacity: 0, scale: 0.95 }}
       whileInView={{ opacity: 1, scale: 1 }}
       viewport={{ once: true }}
       transition={{ duration: 0.4, delay: idx * 0.05 }}
       className="flex"
      >
       <GlassCard className="p-6 border border-red-500/5 hover:border-red-650/20 hover:shadow-[0_0_20px_rgba(220,38,38,0.05)] transition-all duration-300 text-left space-y-3.5 bg-neutral-950/40 w-full flex flex-col justify-start">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
         {reason.icon}
        </div>
        <div>
         <h4 className="text-sm font-bold text-white font-display">
          {reason.title}
         </h4>
         <p className="text-[11px] text-slate-400 leading-relaxed font-sans mt-1.5">
          {reason.desc}
         </p>
        </div>
       </GlassCard>
      </motion.div>
     ))}
    </div>
   </div>
  </section>
 );
};

export default WhyChooseUs;
