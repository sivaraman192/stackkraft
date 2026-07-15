import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, Server, Cpu, Database, Award, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import GlassCard from '../components/GlassCard';
import SEO from '../components/SEO';
import { API_URL } from '../context/AuthContext';
import { getBreadcrumbSchema } from '../utils/schemaHelper';

const Portfolio = () => {
 const [projects, setProjects] = useState([]);
 const [loading, setLoading] = useState(true);
 const [activeFilter, setActiveFilter] = useState('All');
 const [selectedProject, setSelectedProject] = useState(null);

 const fallbackProjects = [
  {
   _id: "fb-1",
   title: "Community Event Platform",
   description: "An interactive, real-time platform built for community organizers to launch local events, register volunteers, and track attendance via automated systems.",
   techStack: ["React", "Node", "MongoDB", "Express", "Tailwind", "Socket.io"],
   features: [
    "AI-Powered Smart Recommendations for events based on interests",
    "QR Code Attendance scanning for volunteers and guests",
    "Comprehensive Volunteer Management pipelines",
    "Real-Time Chat support via Socket.io",
    "Analytics Dashboard with interactive graphs"
   ],
   category: "Business",
   githubUrl: "https://github.com/sivaraman192/events",
   liveUrl: "https://events-loch.onrender.com",
   imageUrl: "/images/portfolio_events.png"
  },
  {
   _id: "fb-2",
   title: "HealthSync Clinic Suite",
   description: "A secure medical clinic management suite built to coordinate patient booking pipelines, medical histories, and digital prescriptions.",
   techStack: ["React", "Node", "MongoDB", "Express", "Tailwind"],
   features: [
    "Dynamic patient appointment booking schedule",
    "Secure digital prescription and medical record storage",
    "Role-based control (Doctors, Nurses, Receptionists)",
    "Database synchronization for encrypted clinical charts"
   ],
   category: "Healthcare",
   githubUrl: "https://github.com/sivaraman192/healthsync",
   liveUrl: "https://healthsync-2026.netlify.app/",
   imageUrl: "/images/portfolio_healthsync.png"
  },
  {
   _id: "fb-3",
   title: "AI Resume Build",
   description: "An AI-powered resume builder that helps user create professional ATS-friendly  resumes with live preview, customizable templates, PDF export, and intelligent content suggestions.",
   techStack: ["React", "Node", "MongoDB", "Express", "Tailwind", "Stripe","Gemini AI"],
   features: [
    "AI-powered resume content generation",
    "ATS-friendly resume templates",
    "Live resume preview and editing",
    "One-click PDF download and export"
   ],
   category: "AI Application",
   githubUrl: "https://github.com/sivaraman192/Ai-Resume-build-",
   liveUrl: "https://ai-resume-build-orpin.vercel.app",
   imageUrl: "/images/portfolio_trendzone.png"
  },
  {
   _id: "fb-4",
   title: "Job portal",
   description: "A modern job portal platform that connects job seekers with employers through intelligent job listings, profile management, resume uploads, and seamless application tracking.",
   techStack: ["React", "Node", "MongoDB", "Express", "Tailwind", "Vite","JWt Authentication"],
   features: [
     "Job search with advanced filtering",
  "Resume upload and profile management",
  "Employer dashboard for posting jobs",
  "Application tracking and status updates"
   ],
   category: "job Portal Application",
   githubUrl: "https://github.com/sivaraman192/careerconnect",
   liveUrl: "https://careerprotal.netlify.app/",
   imageUrl: "/images/portfolio_resumeforge.png"
  },
  {
   _id: "fb-5",
   title: "Flower Shop Online",
   description: "A boutique floral arrangement store showcasing product collections, delivery schedules, and client reviews.",
   techStack: ["HTML5", "CSS3", "JavaScript", "Tailwind", "EmailJS"],
   features: [
    "Vibrant visual galleries with lazy loading",
    "Secure checkout form intakes",
    "Instant delivery schedule selectors",
    "WhatsApp float integration"
   ],
   category: "Ecommerce",
   githubUrl: "https://github.com/beastsiva37-prog/flower",
   liveUrl: "https://mk-muthusamy-flower-shop.netlify.app",
   imageUrl: "/images/portfolio_flowershop.png"
  },
  {
   _id: "fb-6",
   title: "Personal Portfolio v1",
   description: "A premium modern developer portfolio site designed to present technical competencies, workflows, and contact pipelines.",
   techStack: ["React", "Tailwind", "Framer Motion", "Lucide"],
   features: [
    "Modern dark theme glassmorphic UI",
    "Interactive console terminal widget",
    "Optimized speed load score metrics"
   ],
   category: "Portfolio",
   githubUrl: "https://github.com/sivaraman192/Portfolio",
   liveUrl: "https://profolio-siva.netlify.app/",
   imageUrl: "/images/portfolio_personal.png"
  }
 ];

 useEffect(() => {
  const fetchProjects = async () => {
   try {
    const res = await axios.get(`${API_URL}/projects`);
    if (res.data && res.data.length > 0) {
     setProjects(res.data);
    } else {
     setProjects(fallbackProjects);
     seedBackendProjects();
    }
   } catch (err) {
    console.error("Failed to load projects from backend API, using fallback data:", err);
    setProjects(fallbackProjects);
   } finally {
    setLoading(false);
   }
  };
  
  const seedBackendProjects = async () => {
   try {
    for (const p of fallbackProjects) {
     const item = { ...p };
     delete item._id; 
     await axios.post(`${API_URL}/projects`, item);
    }
   } catch (e) {
    // quiet catch
   }
  };

  fetchProjects();
 }, []);

 const filterCategories = ['All', 'Business', 'Healthcare', 'Ecommerce', 'Portfolio'];

 const filteredProjects = activeFilter === 'All' 
  ? projects 
  : projects.filter(p => p.category === activeFilter);

 return (
  <div className="relative overflow-hidden min-h-screen pt-28 pb-20 text-white bg-[#050505] transition-colors duration-300">
   <SEO 
    title="Portfolio"
    description="Explore the software development work, applications, and React projects built by StackKraft."
    url="/portfolio"
    schema={getBreadcrumbSchema([{ name: 'Portfolio', path: '/portfolio' }])}
   />

   {/* Pulsing Neon Background Orbs */}
   <div className="absolute top-[-50px] left-[-50px] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] animate-pulse pointer-events-none -z-10" />
   <div className="absolute bottom-[10%] right-[-50px] w-[500px] h-[500px] bg-red-800/10 rounded-full blur-[140px] animate-pulse pointer-events-none -z-10" />

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
    
    {/* Page Hero Header */}
    <div className="text-center space-y-4 max-w-3xl mx-auto bg-black transition-colors duration-300/30 p-8 rounded-3xl border border-slate-150 backdrop-blur-xl relative">
     <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
      <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
      <span>Showcase Portfolio</span>
     </div>
     <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
      Our <span className="text-gradient">Portfolio</span>
     </h1>
     <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
      Explore our recent projects built with modern technologies. We construct robust architectures using React, Node, Express, MongoDB, and Tailwind.
     </p>
    </div>

    {/* Animated Filter Controls */}
    <div className="flex flex-wrap justify-center gap-2.5">
     {filterCategories.map((cat) => (
      <button
       key={cat}
       onClick={() => setActiveFilter(cat)}
       className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
        activeFilter === cat 
         ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-500/25' 
         : 'bg-neutral-900 border-neutral-850 text-slate-400 hover:text-white hover:border-neutral-750'
       }`}
      >
       {cat}
      </button>
     ))}
    </div>

    {/* Projects Grid */}
    {loading ? (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((n) => (
       <div key={n} className="h-96 rounded-2xl bg-neutral-950 border-slate-200 animate-pulse border border-neutral-900" />
      ))}
     </div>
    ) : (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
      <AnimatePresence mode="popLayout">
       {filteredProjects.map((project, idx) => (
        <motion.div
         key={project._id || idx}
         layout
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         exit={{ opacity: 0, scale: 0.95 }}
         transition={{ duration: 0.4 }}
         className="flex"
        >
         {/* Premium Tilt & Glow Card */}
         <motion.div
          whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
          className="group relative flex flex-col justify-between w-full h-full rounded-2xl bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 border border-red-500/10 hover:border-red-500/30 p-5 shadow-2xl backdrop-blur-md overflow-hidden"
         >
          {/* Hover Gradient Border Glow */}
          <div className="absolute -inset-px bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0 opacity-0 group-hover:opacity-100 rounded-2xl blur-sm transition-opacity duration-500 -z-10" />

          <div className="space-y-4">
           {/* Image Zoom container */}
           <div className="aspect-[16/10] bg-neutral-950 border-slate-200 rounded-xl border border-neutral-850 flex items-center justify-center overflow-hidden relative">
            {project.imageUrl ? (
             <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
             />
            ) : (
             <div className="flex flex-col items-center gap-2.5 p-4">
              <span className="text-[10px] bg-red-600/10 text-red-500 border border-red-500/20 px-3 py-1 rounded-full uppercase tracking-widest font-extrabold font-display">
               {project.category || 'Web Application'}
              </span>
             </div>
            )}
            <div className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest bg-black transition-colors duration-300/80 backdrop-blur-md text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full">
             {project.category}
            </div>
           </div>

           {/* Info */}
           <div className="space-y-2">
            <h3 className="text-base font-bold text-white font-display leading-snug tracking-wide group-hover:text-red-400 transition-colors">
             {project.title}
            </h3>
            <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-light font-sans">
             {project.description}
            </p>
           </div>

           {/* Tech badges */}
           <div className="flex flex-wrap gap-1.5 pt-2">
            {project.techStack?.map((tech, tIdx) => (
             <span key={tIdx} className="text-[9px] bg-neutral-950 border-slate-200 text-slate-300 border border-neutral-800 px-2.5 py-1 rounded-md font-sans">
              {tech}
             </span>
            ))}
           </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-slate-900/60 pt-4 mt-6 grid grid-cols-3 gap-2.5 items-center">
           <button
            onClick={() => setSelectedProject(project)}
            className="text-[10px] font-bold uppercase tracking-wider text-slate-350 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 py-2.5 rounded-full border border-neutral-800 transition-colors text-center cursor-pointer"
           >
            Details
           </button>

           {project.githubUrl && (
            <a 
             href={project.githubUrl} 
             target="_blank" 
             rel="noreferrer" 
             className="text-[10px] font-bold uppercase tracking-wider text-slate-350 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 py-2.5 rounded-full border border-neutral-800 transition-colors flex items-center justify-center gap-1.5 text-center"
            >
             <FaGithub className="w-3.5 h-3.5" />
             Code
            </a>
           )}

           {project.liveUrl && (
            <a 
             href={project.liveUrl} 
             target="_blank" 
             rel="noreferrer" 
             className="text-[10px] font-bold uppercase tracking-wider text-white btn-premium py-2.5 rounded-full transition-colors flex items-center justify-center gap-1 text-center"
            >
             Live
             <ExternalLink className="w-3 h-3" />
            </a>
           )}
          </div>
         </motion.div>
        </motion.div>
       ))}
      </AnimatePresence>
     </div>
    )}

    {/* Call To Action Section */}
    <div className="pt-16 border-t border-neutral-900/60">
     <div className="rounded-3xl border border-red-500/10 bg-gradient-to-b from-neutral-950 to-black p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Ready to Start?</h2>
      <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
       Let's build something amazing together. Reach out for a free consultation call.
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

    {/* Project Technical Detail Modal */}
    <AnimatePresence>
     {selectedProject && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
       <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedProject(null)}
        className="absolute inset-0 bg-black transition-colors duration-300/85 backdrop-blur-md"
       />
       
       <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl glassmorphism rounded-2xl border border-red-500/20 max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative bg-black transition-colors duration-300 text-left z-10"
       >
        {/* Close Button */}
        <button 
         onClick={() => setSelectedProject(null)}
         className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 hover:bg-neutral-900 rounded-full cursor-pointer"
        >
         <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="space-y-3">
         <span className="text-[9px] bg-red-650/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full font-extrabold uppercase tracking-wider font-display">
          {selectedProject.category}
         </span>
         <h2 className="text-xl sm:text-2xl font-bold text-white font-display leading-tight">{selectedProject.title}</h2>
         <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">{selectedProject.description}</p>
        </div>

        {/* Key Features */}
        {selectedProject.features && selectedProject.features.length > 0 && (
         <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-wider text-white font-extrabold font-display flex items-center gap-1.5">
           <Award className="w-4 h-4 text-red-500" />
           Key Features & Case Deliverables
          </h3>
          <ul className="space-y-2 text-xs text-slate-350">
           {selectedProject.features.map((feature, fIdx) => (
            <li key={fIdx} className="bg-red-950/5 border border-red-950/10 rounded-xl p-3 flex items-start gap-2.5">
             <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
             <span>{feature}</span>
            </li>
           ))}
          </ul>
         </div>
        )}

        {/* Technical Stack detail */}
        <div className="space-y-2.5">
         <h3 className="text-xs uppercase tracking-wider text-white font-extrabold font-display flex items-center gap-1.5">
          <Cpu className="w-4 h-4 text-red-500" />
          Technology Stack
         </h3>
         <div className="flex flex-wrap gap-2">
          {selectedProject.techStack?.map((tech, tIdx) => (
           <span key={tIdx} className="text-[10px] bg-neutral-900 border border-neutral-850 text-slate-300 px-3 py-1.5 rounded-full font-semibold">
            {tech}
           </span>
          ))}
         </div>
        </div>

        {/* Modal footer links */}
        <div className="flex gap-4 pt-4 border-t border-slate-900/60">
         {selectedProject.githubUrl && (
          <a
           href={selectedProject.githubUrl}
           target="_blank"
           rel="noreferrer"
           className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-850 hover:border-neutral-750 hover:bg-neutral-800 text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
          >
           <FaGithub className="w-4.5 h-4.5" />
           View Code
          </a>
         )}
         {selectedProject.liveUrl && (
          <a
           href={selectedProject.liveUrl}
           target="_blank"
           rel="noreferrer"
           className="flex-1 flex items-center justify-center gap-2 btn-premium py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
          >
           <ExternalLink className="w-4.5 h-4.5" />
           Live Demo
          </a>
         )}
        </div>
       </motion.div>
      </div>
     )}
    </AnimatePresence>
   </div>
  </div>
 );
};

export default Portfolio;
