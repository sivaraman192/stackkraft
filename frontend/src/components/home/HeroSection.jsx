import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FaReact, FaNodeJs, FaJs, FaServer, FaDatabase } from 'react-icons/fa';

const HeroSection = () => {
 // Mouse position state for premium 3D depth parallax effect
 const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

 useEffect(() => {
  const handleMouseMove = (e) => {
   const { clientX, clientY } = e;
   // Calculate offset from center screen
   const x = (clientX - window.innerWidth / 2) / 45;
   const y = (clientY - window.innerHeight / 2) / 45;
   setMousePos({ x, y });
  };
  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
 }, []);

 // Animation configurations
 const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
   opacity: 1,
   transition: {
    staggerChildren: 0.12,
   },
  },
 };

 const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
   opacity: 1,
   y: 0,
   transition: { type: 'spring', stiffness: 90, damping: 15 },
  },
 };

 return (
  <section className="relative overflow-hidden pt-32 pb-24 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   {/* Background Decorative Glow Orbs */}
   <div className="glow-orb w-[350px] h-[350px] bg-red-500/10 top-[-50px] left-[-50px] animate-pulse-glow" style={{ filter: 'blur(120px)' }} />
   <div className="glow-orb w-[450px] h-[450px] bg-indigo-500/5 bottom-[0px] right-[-50px] animate-pulse-glow" style={{ filter: 'blur(140px)' }} />

   {/* Floating Particle Dots */}
   <div className="absolute inset-0 pointer-events-none z-0">
    {[...Array(6)].map((_, i) => (
     <motion.div
      key={i}
      className="absolute w-1.5 h-1.5 bg-red-500/40 rounded-full"
      style={{
       top: `${15 + i * 12}%`,
       left: `${10 + (i * 17) % 80}%`,
      }}
      animate={{
       y: [0, -15, 0],
       opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
       duration: 4 + (i % 3) * 2,
       repeat: Infinity,
       ease: 'easeInOut',
       delay: i * 0.4,
      }}
     />
    ))}
   </div>

   <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
    {/* Left Side Content */}
    <motion.div 
     variants={containerVariants}
     initial="hidden"
     animate="visible"
     className="lg:col-span-7 space-y-8 text-left"
    >
     {/* Subtitle tag */}
     <motion.div
      variants={itemVariants}
      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-650 "
     >
      <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
      <span>Building Modern Digital Experiences</span>
     </motion.div>

     {/* Heading */}
     <motion.h1
      variants={itemVariants}
      className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] font-display text-white"
     >
      We Build <span className="text-gradient">Modern Digital</span> <br />
      Experiences
     </motion.h1>

     {/* Subheading */}
     <motion.p
      variants={itemVariants}
      className="text-slate-400 text-sm sm:text-lg max-w-xl leading-relaxed font-sans"
     >
      Professional websites and web applications for startups, businesses, and personal brands. We engineer premium, performant, and search-optimized custom web applications.
     </motion.p>

     {/* Call-to-actions */}
     <motion.div
      variants={itemVariants}
      className="flex flex-col sm:flex-row items-center gap-4 pt-2"
     >
      <Link 
       to="/contact" 
       className="btn-premium px-8 py-3.5 text-xs uppercase tracking-wider font-bold w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98] transition-transform"
      >
       Start Project
       <ArrowRight className="w-4 h-4" />
      </Link>
      <Link 
       to="/portfolio" 
       className="flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 hover:bg-slate-200 :bg-neutral-800 hover:border-red-500/30 text-slate-350 hover:text-slate-950 :text-white font-semibold px-8 py-3.5 rounded-full transition-all text-xs uppercase tracking-wider w-full sm:w-auto shadow-md shadow-black/[0.02]"
      >
       View Portfolio
      </Link>
     </motion.div>
    </motion.div>

    {/* Right Side Mockup & Floating Cards */}
    <div className="lg:col-span-5 relative mt-10 lg:mt-0">
     <motion.div
      style={{ x: mousePos.x * 0.6, y: mousePos.y * 0.6 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative z-10 w-full"
     >
      {/* Laptop Frame Mockup with glow border */}
      <div className="glassmorphism p-3 rounded-2xl border border-red-500/10 shadow-2xl relative overflow-hidden bg-white/70 backdrop-blur-md">
       <div className="rounded-xl border border-slate-100 bg-slate-900 overflow-hidden aspect-[1.6/1] flex flex-col relative">
        {/* Mock browser header */}
        <div className="bg-neutral-900 px-4 py-2.5 flex items-center gap-2 border-b border-neutral-850">
         <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
         <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
         <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
         <div className="ml-4 bg-slate-200/50 text-[9px] text-slate-500 px-6 py-0.5 rounded border border-slate-300 select-none font-mono">
          stackkraft.com
         </div>
        </div>
        {/* Mockup screen interior */}
        <div className="flex-1 relative overflow-hidden bg-slate-50 ">
         <img 
          src="/images/hero_laptop.png" 
          alt="StackKraft Dashboard Mockup" 
          className="w-full h-full object-cover opacity-90 "
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
        </div>
       </div>
      </div>
     </motion.div>

     {/* Floating Tech Cards linked to mouse parallax for 3D depth */}
     
     {/* React Card */}
     <motion.div
      style={{ x: mousePos.x * 1.2, y: mousePos.y * 1.2 }}
      animate={{
       y: [0, -10, 0],
       transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
      }}
      className="absolute top-[-25px] right-[-10px] sm:right-[-15px] z-20 glassmorphism px-3.5 py-2.5 rounded-xl border border-slate-200 flex items-center gap-2.5 shadow-xl bg-white/90 backdrop-blur-md"
     >
      <div className="p-1.5 bg-red-500/10 text-red-500 rounded-lg">
       <FaReact className="w-5 h-5 animate-spin" style={{ animationDuration: '12s' }} />
      </div>
      <div className="text-left select-none">
       <div className="text-[10px] font-bold text-white leading-none">React 19</div>
       <span className="text-[8px] text-slate-400">Frontend Engine</span>
      </div>
     </motion.div>

     {/* Node JS Card */}
     <motion.div
      style={{ x: mousePos.x * -0.8, y: mousePos.y * -0.8 }}
      animate={{
       y: [0, -8, 0],
       transition: { duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
      }}
      className="absolute bottom-[-15px] left-[-10px] sm:left-[-20px] z-20 glassmorphism px-3.5 py-2.5 rounded-xl border border-slate-200 flex items-center gap-2.5 shadow-xl bg-white/90 backdrop-blur-md"
     >
      <div className="p-1.5 bg-red-500/10 text-red-500 rounded-lg">
       <FaNodeJs className="w-5 h-5 text-red-500" />
      </div>
      <div className="text-left select-none">
       <div className="text-[10px] font-bold text-white leading-none">Node.js</div>
       <span className="text-[8px] text-slate-400">Backend Server</span>
      </div>
     </motion.div>

     {/* MongoDB Card */}
     <motion.div
      style={{ x: mousePos.x * 1.5, y: mousePos.y * -0.5 }}
      animate={{
       y: [-4, 4, -4],
       transition: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
      }}
      className="absolute bottom-[42%] left-[-35px] hidden sm:flex z-20 glassmorphism px-3 py-2 rounded-xl border border-red-500/15 items-center gap-2 shadow-xl bg-white/90 "
     >
      <div className="p-1 bg-red-500/10 text-red-500 rounded-md">
       <FaDatabase className="w-4 h-4" />
      </div>
      <div className="text-left select-none">
       <div className="text-[9px] font-bold text-white leading-none">MongoDB</div>
       <span className="text-[7px] text-slate-400">Database Schema</span>
      </div>
     </motion.div>

     {/* Express Card */}
     <motion.div
      style={{ x: mousePos.x * -1.2, y: mousePos.y * 1.5 }}
      animate={{
       y: [4, -4, 4],
       transition: { duration: 5.2, repeat: Infinity, ease: 'easeInOut' }
      }}
      className="absolute top-[22%] right-[-25px] hidden sm:flex z-20 glassmorphism px-3 py-2 rounded-xl border border-red-500/15 items-center gap-2 shadow-xl bg-white/90 "
     >
      <div className="p-1 bg-red-500/10 text-red-500 rounded-md">
       <FaServer className="w-4 h-4" />
      </div>
      <div className="text-left select-none">
       <div className="text-[9px] font-bold text-white leading-none">Express</div>
       <span className="text-[7px] text-slate-400">REST API Router</span>
      </div>
     </motion.div>

     {/* JavaScript Card */}
     <motion.div
      style={{ x: mousePos.x * 0.7, y: mousePos.y * 0.9 }}
      animate={{
       y: [0, -10, 0],
       transition: { duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }
      }}
      className="absolute bottom-[10%] right-[-15px] z-20 glassmorphism px-3.5 py-2 rounded-xl border border-slate-200 flex items-center gap-2 shadow-xl bg-white/90 backdrop-blur-md"
     >
      <div className="p-1 bg-red-500/10 text-red-500 rounded-md">
       <FaJs className="w-4 h-4" />
      </div>
      <div className="text-left select-none">
       <div className="text-[9px] font-bold text-white leading-none">JavaScript</div>
       <span className="text-[7px] text-slate-400">Dynamic Scripting</span>
      </div>
     </motion.div>
    </div>
   </div>
  </section>
 );
};

export default HeroSection;
