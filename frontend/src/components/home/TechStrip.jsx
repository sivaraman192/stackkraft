import React from 'react';
import { motion } from 'framer-motion';
import { 
 FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaServer, FaEnvira 
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si';

const TechStrip = () => {
 const technologies = [
  { name: 'React 19', icon: <FaReact className="w-5 h-5 text-red-500" /> },
  { name: 'Node.js', icon: <FaNodeJs className="w-5 h-5 text-red-500" /> },
  { name: 'Express.js', icon: <SiExpress className="w-5 h-5 text-red-500" /> },
  { name: 'MongoDB', icon: <SiMongodb className="w-5 h-5 text-red-500" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-5 h-5 text-red-500" /> },
  { name: 'JavaScript', icon: <FaJs className="w-5 h-5 text-red-500" /> },
  { name: 'HTML5', icon: <FaHtml5 className="w-5 h-5 text-red-500" /> },
  { name: 'CSS3', icon: <FaCss3Alt className="w-5 h-5 text-red-500" /> },
 ];

 // Duplicate the list for seamless infinite looping
 const loopList = [...technologies, ...technologies, ...technologies];

 return (
  <section className="border-y border-red-950/20 py-8 bg-neutral-950/30 relative z-10 overflow-hidden w-full select-none">
   <div className="max-w-7xl mx-auto px-4 text-center mb-4">
    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
     Enterprise Technology Ecosystem
    </p>
   </div>

   {/* Infinite Scroll Container */}
   <div className="relative flex w-full overflow-x-hidden">
    {/* Left & Right Fade Overlays */}
    <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-[#050505] to-transparent z-25 pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-[#050505] to-transparent z-25 pointer-events-none" />

    <motion.div
     animate={{ x: [0, -1200] }}
     transition={{
      ease: 'linear',
      duration: 25,
      repeat: Infinity,
     }}
     className="flex gap-16 items-center whitespace-nowrap"
    >
     {loopList.map((tech, idx) => (
      <div
       key={idx}
       className="flex items-center gap-2.5 text-slate-400 hover:text-white text-sm font-semibold transition-colors duration-200 cursor-pointer"
      >
       {tech.icon}
       <span>{tech.name}</span>
      </div>
     ))}
    </motion.div>
   </div>
  </section>
 );
};

export default TechStrip;
