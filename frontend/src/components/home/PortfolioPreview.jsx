import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';
import GlassCard from '../GlassCard';

const PortfolioPreview = () => {
 const projects = [
  {
   title: "HealthSync",
   category: "Medical Analytics Dashboard",
   image: "/images/portfolio_healthsync.png",
   technologies: ["React 19", "Recharts", "Node.js", "Express", "MongoDB"],
   detailsPath: "/portfolio",
   githubUrl: "https://github.com/sivaraman192",
   demoUrl: "https://stackkraft.com"
  },
  {
   title: "Community Event Platform",
   category: "Social Booking Hub",
   image: "/images/portfolio_events.png",
   technologies: ["React", "Express", "MongoDB", "Tailwind CSS"],
   detailsPath: "/portfolio",
   githubUrl: "https://github.com/sivaraman192",
   demoUrl: "https://stackkraft.com"
  },
  {
   title: "ResumeForge",
   category: "Interactive Builder SaaS",
   image: "/images/portfolio_resumeforge.png",
   technologies: ["React 19", "Framer Motion", "Tailwind CSS"],
   detailsPath: "/portfolio",
   githubUrl: "https://github.com/sivaraman192",
   demoUrl: "https://stackkraft.com"
  },
  {
   title: "TrendZone",
   category: "Luxury E-Commerce Store",
   image: "/images/portfolio_trendzone.png",
   technologies: ["React", "Stripe API", "Node.js", "Express", "MongoDB"],
   detailsPath: "/portfolio",
   githubUrl: "https://github.com/sivaraman192",
   demoUrl: "https://stackkraft.com"
  },
  {
   title: "Flower Shop",
   category: "Luxury Boutique Florist",
   image: "/images/portfolio_flowershop.png",
   technologies: ["React", "Tailwind CSS", "Framer Motion", "EmailJS"],
   detailsPath: "/portfolio",
   githubUrl: "https://github.com/sivaraman192",
   demoUrl: "https://stackkraft.com"
  }
 ];

 return (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-left">
   {/* Background glow orb */}
   <div className="absolute top-[30%] right-[-100px] -z-10 bg-red-800/5 blur-3xl w-[500px] h-[500px] rounded-full pointer-events-none" />

   {/* Section Header */}
   <div className="text-center space-y-4 mb-20">
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
     Our Showcase
    </div>
    <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
     Selected Portfolio Work
    </h2>
    <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed font-sans text-center">
     Explore the high-performance digital systems and premium interfaces we have engineered for clients worldwide.
    </p>
   </div>

   {/* Grid Layout of Portfolio Cards */}
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {projects.map((project, idx) => (
     <motion.div
      key={idx}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.08 }}
      className="flex"
     >
      <GlassCard className="flex flex-col h-full overflow-hidden border border-red-500/10 hover:border-red-650/30 transition-all duration-300 w-full group bg-neutral-950/70 shadow-lg rounded-2xl">
       
       {/* Image Frame Wrapper */}
       <div className="relative overflow-hidden aspect-[1.6/1] border-b border-red-950/20 bg-neutral-950">
        <img 
         src={project.image} 
         alt={project.title} 
         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
        />
        
        {/* Hover overlay for quick action buttons */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
         <a 
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="p-3 bg-neutral-900 border border-neutral-800 hover:border-red-500/50 hover:bg-neutral-800 text-white rounded-full transition-all hover:scale-115"
          title="View GitHub"
         >
          <FaGithub className="w-5 h-5" />
         </a>
         <a 
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-full transition-all hover:scale-115 shadow-lg shadow-red-600/30"
          title="Live Demo"
         >
          <FaExternalLinkAlt className="w-4 h-4" />
         </a>
        </div>
       </div>

       {/* Text Information block */}
       <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
         <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          {project.category}
         </div>
         <h3 className="text-base sm:text-lg font-bold text-white font-display group-hover:text-red-500 transition-colors">
          {project.title}
         </h3>
        </div>

        {/* Technology Badges */}
        <div className="flex flex-wrap gap-1.5">
         {project.technologies.map((tech, tIdx) => (
          <span 
           key={tIdx} 
           className="text-[9px] bg-neutral-900 border border-neutral-850 px-2 py-0.5 rounded-md text-slate-400 font-semibold"
          >
           {tech}
          </span>
         ))}
        </div>

        {/* Footer details link */}
        <div className="pt-2 border-t border-neutral-850 flex items-center justify-between">
         <Link 
          to={project.detailsPath}
          className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors group-hover:text-red-500"
         >
          <FaInfoCircle className="w-3.5 h-3.5" />
          <span>View Details</span>
         </Link>

         <div className="flex items-center gap-3 md:hidden">
          {/* Mobile visible fallbacks for icon triggers */}
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
           <FaGithub className="w-4 h-4" />
          </a>
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-red-500 hover:text-red-400 transition-colors">
           <FaExternalLinkAlt className="w-3.5 h-3.5" />
          </a>
         </div>
        </div>
       </div>
      </GlassCard>
     </motion.div>
    ))}
   </div>

   <div className="text-center mt-12">
    <Link 
     to="/portfolio" 
     className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 hover:border-red-500/30 text-slate-300 hover:text-white font-semibold px-8 py-3.5 rounded-full transition-all text-xs uppercase tracking-wider"
    >
     Explore Full Portfolio
    </Link>
   </div>
  </section>
 );
};

export default PortfolioPreview;
