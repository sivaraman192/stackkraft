import React from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, GraduationCap, MapPin, Target, Compass, Award, Calendar, Heart, Shield, Terminal, Zap, Clock, Sparkles, User, Briefcase, Eye } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import GlassCard from '../components/GlassCard';
import SEO from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/schemaHelper';

const About = () => {
 const values = [
  {
   icon: <Zap className="w-5 h-5 text-red-500" />,
   title: "Innovation",
   desc: "Leveraging cutting-edge technologies like React 19, Framer Motion, and Tailwind to build modern web ecosystems."
  },
  {
   icon: <Award className="w-5 h-5 text-red-500" />,
   title: "Quality",
   desc: "Writing clean, modular components, implementing strict typing, and optimizing databases for rapid loading."
  },
  {
   icon: <Shield className="w-5 h-5 text-red-500" />,
   title: "Transparency",
   desc: "Providing clear communication pipelines, honest budget quoting, and open repository collaborations."
  },
  {
   icon: <Heart className="w-5 h-5 text-red-500" />,
   title: "Support",
   desc: "Delivering continuous updates, maintenance checkups, responsive feedback, and post-launch debugging."
  },
  {
   icon: <Clock className="w-5 h-5 text-red-500" />,
   title: "Fast Delivery",
   desc: "Adhering to strict schedules, avoiding project bloat, and publishing production assets rapidly."
  }
 ];

 const pillars = [
  {
   title: "Who We Are",
   icon: <User className="w-6 h-6 text-red-500" />,
   content: "StackKraft is an independent software development and design agency specializing in premium web applications. We bridge the gap between architectural programming standards and conversion-driven design aesthetics."
  },
  {
   title: "What We Build",
   icon: <Briefcase className="w-6 h-6 text-red-500" />,
   content: "We engineer performant business platforms, high-speed single-page applications, custom content management systems, robust Node.js backends, and responsive UI portfolios optimized for search engine visibility."
  },
  {
   title: "Why Clients Choose Us",
   icon: <Sparkles className="w-6 h-6 text-red-500" />,
   content: "Startups and enterprises choose us because we avoid generic templates, respect launch deadlines, implement state-of-the-art interactive micro-animations, and provide transparent repository access throughout the lifecycle."
  }
 ];

 const milestones = [
  {
   year: "2022",
   title: "First Lines of Code",
   desc: "Founder Sivaraman M began building bespoke frontend projects and backend routing endpoints."
  },
  {
   year: "2024",
   title: "B.E. CSE Graduation",
   desc: "Graduated with a Bachelor of Engineering in Computer Science and Engineering, laying deep mathematical foundations in data models, networks, and distributed systems."
  },
  {
   year: "2025",
   title: "StackKraft Inception",
   desc: "Launched StackKraft to offer premium, full-stack website development solutions worldwide."
  },
  {
   year: "2026",
   title: "Production Scale",
   desc: "Deploying high-fidelity SaaS platforms, e-commerce networks, database dashboards, and interactive UI systems."
  }
 ];

 const founderSkills = ["React", "Node", "MongoDB", "JavaScript", "HTML", "CSS"];

 return (
  <div className="relative overflow-hidden min-h-screen pt-28 pb-20 text-white bg-[#050505] transition-colors duration-300">
   <SEO 
    title="About Us"
    description="Learn about the founder Sivaraman M and the journey of StackKraft. Delivering bespoke website development."
    url="/about"
    schema={getBreadcrumbSchema([{ name: 'About Us', path: '/about' }])}
   />

   {/* Pulsing Neon Background Orbs */}
   <div className="absolute top-[-50px] left-[-50px] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] animate-pulse pointer-events-none -z-10" />
   <div className="absolute bottom-[20%] right-[-50px] w-[500px] h-[500px] bg-red-800/10 rounded-full blur-[140px] animate-pulse pointer-events-none -z-10" />

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 relative z-10">
    
    {/* Page Hero Header */}
    <div className="text-center space-y-4 max-w-3xl mx-auto bg-black transition-colors duration-300/30 p-8 rounded-3xl border border-slate-150 backdrop-blur-xl relative">
     <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
      <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
      <span>Company Story</span>
     </div>
     <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
      About <span className="text-gradient">StackKraft</span>
     </h1>
     <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
      StackKraft is a software development agency built to bring high-performance web products, sleek dark interfaces, and robust server frameworks to companies aiming to stand out.
     </p>
    </div>

    {/* Core Pillars: Who We Are, What We Build, Why Choose Us */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
     {pillars.map((pillar, idx) => (
      <motion.div
       key={idx}
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.5, delay: idx * 0.1 }}
       className="flex"
      >
       <GlassCard className="p-8 border border-red-500/10 hover:border-red-500/25 flex flex-col gap-4 bg-black transition-colors duration-300/40 rounded-2xl w-full">
        <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center">
         {pillar.icon}
        </div>
        <h3 className="text-lg font-bold font-display text-white">{pillar.title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed font-light font-sans">{pillar.content}</p>
       </GlassCard>
      </motion.div>
     ))}
    </div>

    {/* Mission & Vision & Our Goal */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
     <GlassCard className="p-8 border-red-500/10 space-y-4 bg-black transition-colors duration-300/20">
      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500">
       <Target className="w-5 h-5" />
      </div>
      <h3 className="text-base font-bold text-white font-display">Our Mission</h3>
      <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
       To build modern, high-speed web apps that help businesses stand out online, making clean backend code and high-performance layouts standard for every startup.
      </p>
     </GlassCard>

     <GlassCard className="p-8 border-red-500/10 space-y-4 bg-black transition-colors duration-300/20">
      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500">
       <Compass className="w-5 h-5" />
      </div>
      <h3 className="text-base font-bold text-white font-display">Our Vision</h3>
      <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
       To grow StackKraft into a globally trusted hub for full-stack engineering, delivering premium digital assets and clean React architectures.
      </p>
     </GlassCard>

     <GlassCard className="p-8 border-red-500/10 space-y-4 bg-black transition-colors duration-300/20">
      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500">
       <Eye className="w-5 h-5" />
      </div>
      <h3 className="text-base font-bold text-white font-display">Our Goal</h3>
      <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
       To ensure 100% responsive, SEO-ready codebases with zero bloat, allowing organizations to operate rapidly across all client viewports.
      </p>
     </GlassCard>
    </div>

    {/* Founder Card */}
    <div className="space-y-8 text-left">
     <h2 className="text-2xl sm:text-3xl font-bold font-display text-white text-center">Meet the Founder</h2>
     <div 
      className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-10 items-center"
      style={{ 
       background: 'linear-gradient(135deg, #111111, #1a1a1a)', 
       backdropFilter: 'blur(18px)', 
       border: '1px solid rgba(255,255,255,0.08)', 
       boxShadow: '0 15px 45px rgba(255,0,0,0.12)' 
      }}
     >
      {/* Pulsing neon corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Profile Avatar Graphic */}
      <div className="shrink-0 relative">
       <div 
        className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl flex items-center justify-center text-white text-3xl font-extrabold font-display relative z-10 select-none"
        style={{ 
         backgroundColor: '#1a1a1a', 
         border: '1px solid rgba(255,59,59,0.5)' 
        }}
       >
        SK
       </div>
       <div className="absolute -inset-1 bg-red-500/20 rounded-2xl blur-md -z-10 animate-pulse" />
      </div>

      {/* Bio */}
      <div className="flex-1 space-y-5 text-left">
       <div className="space-y-1">
        <h3 className="text-xl sm:text-2xl font-bold text-white font-display">Sivaraman M</h3>
        <p className="text-xs font-semibold text-[#ff3b3b] uppercase tracking-widest flex items-center gap-1.5">
         <Terminal className="w-3.5 h-3.5" />
         Founder & Full Stack Developer
        </p>
       </div>

       <p className="text-xs sm:text-sm text-[#d1d5db] leading-relaxed font-sans font-light">
        Graduated with a Bachelor of Engineering in Computer Science (B.E. CSE), Sivaraman founded StackKraft to deliver premium full-stack services. Operating from Tamil Nadu, India, he is skilled in architecting modular components, optimizing MERN stack databases, and setting up highly responsive frontend systems.
       </p>

       {/* Skills badges */}
       <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-widest text-[#9ca3af] font-bold">Primary Stack:</span>
        <div className="flex flex-wrap gap-2">
         {founderSkills.map((skill, sIdx) => (
          <span 
           key={sIdx} 
           className="text-[10px] font-bold px-3.5 py-1.5 rounded-lg font-sans"
           style={{ 
            backgroundColor: '#1f1f1f', 
            color: '#ffffff', 
            border: '1px solid rgba(255,255,255,0.08)' 
           }}
          >
           {skill}
          </span>
         ))}
        </div>
       </div>

       {/* Action socials */}
       <div className="flex items-center gap-6 pt-2 border-t border-white/5 text-xs">
        <a href="https://github.com/sivaraman192" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-white hover:text-[#ff3b3b] hover:underline transition-colors">
         <FaGithub className="w-4 h-4" />
         GitHub
        </a>
        <a href="mailto:sivaraman.official13@gmail.com" className="flex items-center gap-1 text-white hover:text-[#ff3b3b] hover:underline transition-colors">
         <BookOpen className="w-4 h-4" />
         Email Founder
        </a>
       </div>
      </div>
     </div>
    </div>

    {/* Our Values Section */}
    <div className="space-y-12 text-left">
     <div className="text-center space-y-2">
      <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Our Values</h2>
      <p className="text-xs text-slate-400 max-w-sm mx-auto">
       Our core developer principles guiding every digital creation.
      </p>
     </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {values.map((v, idx) => (
       <GlassCard key={idx} className="p-6 space-y-4 border border-slate-150 hover:border-red-500/20 bg-black transition-colors duration-300/30 rounded-2xl flex flex-col justify-between">
        <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-900 shrink-0">
         {v.icon}
        </div>
        <div className="space-y-2">
         <h4 className="text-xs sm:text-sm font-bold text-white font-display tracking-wide">{v.title}</h4>
         <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">{v.desc}</p>
        </div>
       </GlassCard>
      ))}
     </div>
    </div>

    {/* Company Journey / Timeline */}
    <div className="space-y-12 text-left">
     <div className="text-center space-y-2">
      <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Our Timeline</h2>
      <p className="text-xs text-slate-400 max-w-sm mx-auto">
       The engineering path of Sivaraman's skills and the startup launch of StackKraft.
      </p>
     </div>

     <div className="relative border-l border-red-500/20 max-w-xl mx-auto pl-6 sm:pl-8 space-y-8 py-2">
      {milestones.map((m, idx) => (
       <motion.div
        key={idx}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: idx * 0.1 }}
        className="relative"
       >
        {/* Timeline node dot */}
        <div className="absolute left-[-35px] sm:left-[-43px] top-1.5 w-4.5 h-4.5 rounded-full bg-slate-950 border-2 border-red-500 flex items-center justify-center">
         <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
        </div>

        <div className="space-y-1">
         <span className="text-xs font-bold text-red-400 font-display flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {m.year}
         </span>
         <h4 className="text-sm font-bold text-white font-display">{m.title}</h4>
         <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">{m.desc}</p>
        </div>
       </motion.div>
      ))}
     </div>
    </div>

    {/* CTA section */}
    <div className="pt-8 border-t border-neutral-900/60">
     <div className="rounded-3xl border border-red-500/10 bg-gradient-to-b from-neutral-950 to-black p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Let's Build Together</h2>
      <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
       Have a custom project concept or website feature you need engineered? Reach out today for a free budget quote.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xs sm:max-w-none mx-auto pt-2">
       <a 
        href="/contact" 
        className="btn-premium px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-red-500/20 text-center"
       >
        Contact Us
       </a>
       <a 
        href="/contact?quote=true" 
        className="bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-red-500/20 text-slate-300 hover:text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all text-center"
       >
        Get Quote
       </a>
      </div>
     </div>
    </div>

   </div>
  </div>
 );
};

export default About;
