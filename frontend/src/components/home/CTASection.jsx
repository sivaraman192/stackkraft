import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
 return (
  <section className="relative overflow-hidden py-28 z-10 border-t border-red-950/20 bg-neutral-950/30">
   {/* Background glow orbs */}
   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.06)_0%,transparent_60%)] pointer-events-none" />
   <div className="glow-orb w-[450px] h-[450px] bg-red-600/10 top-[20%] left-[50%] -translate-x-[50%] -translate-y-[50%] animate-pulse-glow" style={{ filter: 'blur(130px)' }} />

   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-20">
    {/* Subtitle tag */}
    <motion.div
     initial={{ opacity: 0, scale: 0.95 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-650/10 border border-red-500/20 text-xs font-semibold text-red-400"
    >
     <Sparkles className="w-3.5 h-3.5 text-red-500" />
     <span>Launch Your Venture</span>
    </motion.div>

    {/* Title */}
    <motion.h2
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5, delay: 0.1 }}
     className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] font-display text-white"
    >
     Let's Build Your <br />
     <span className="text-gradient">Next Project</span>
    </motion.h2>

    {/* Subtitle */}
    <motion.p
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5, delay: 0.2 }}
     className="text-slate-400 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed font-sans"
    >
     Partner with StackKraft to turn your startup ideas and product definitions into production-ready, high-performance digital systems.
    </motion.p>

    {/* Actions */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5, delay: 0.3 }}
     className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2.5"
    >
     <Link 
      to="/contact" 
      className="btn-premium px-8 py-3.5 text-xs uppercase tracking-wider font-bold w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98] transition-transform"
     >
      Start Today
      <ArrowRight className="w-4 h-4" />
     </Link>
     <Link 
      to="/contact?quote=true" 
      className="flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 hover:border-red-500/30 text-slate-350 hover:text-white font-semibold px-8 py-3.5 rounded-full transition-all text-xs uppercase tracking-wider w-full sm:w-auto"
     >
      Contact Us
     </Link>
    </motion.div>
   </div>
  </section>
 );
};

export default CTASection;
