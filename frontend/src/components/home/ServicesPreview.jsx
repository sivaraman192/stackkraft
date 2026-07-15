import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
 ArrowRight, Layout, Sparkles, Award, Code, Database, RefreshCw 
} from 'lucide-react';
import GlassCard from '../GlassCard';

const ServicesPreview = () => {
 const servicesList = [
  {
   title: "Business Websites",
   desc: "Complete corporate sites engineered with customized layouts, service filters, maps, and SEO optimizations.",
   icon: <Layout className="w-6 h-6 text-red-500" />,
   path: "/services"
  },
  {
   title: "Landing Pages",
   desc: "High-conversion single page frameworks designed for product campaigns, startups, and marketing funnels.",
   icon: <Sparkles className="w-6 h-6 text-red-500" />,
   path: "/services"
  },
  {
   title: "Portfolio Websites",
   desc: "Creative, interactive personal portfolios with smooth custom scroll indicators, dark themes, and contact channels.",
   icon: <Award className="w-6 h-6 text-red-500" />,
   path: "/services"
  },
  {
   title: "React Development",
   desc: "Single Page Apps (SPAs) built with React 19, custom hooks, context management, and fast component loads.",
   icon: <Code className="w-6 h-6 text-red-500" />,
   path: "/services"
  },
  {
   title: "Full Stack Development",
   desc: "Bespoke SaaS platforms, custom dashboards, database schemas, JWT authentication, and Express REST APIs.",
   icon: <Database className="w-6 h-6 text-red-500" />,
   path: "/services"
  },
  {
   title: "Website Maintenance",
   desc: "Continuous performance audits, SEO improvements, software security patches, and hosting configuration support.",
   icon: <RefreshCw className="w-6 h-6 text-red-500" />,
   path: "/services"
  }
 ];

 return (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
   {/* Background radial glow */}
   <div className="absolute top-[20%] left-[50%] -translate-x-[50%] -z-10 bg-red-600/5 blur-3xl w-[600px] h-[300px] rounded-full pointer-events-none" />

   {/* Header */}
   <div className="text-center space-y-4 mb-20">
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
     Our Offerings
    </div>
    <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
     Our Premium Services
    </h2>
    <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed font-sans">
     We deliver state-of-the-art web architectures tailored to capture audiences, drive conversions, and power operations.
    </p>
   </div>

   {/* Service Cards Grid */}
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {servicesList.map((service, idx) => (
     <motion.div
      key={idx}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      className="flex"
     >
      <GlassCard className="flex flex-col h-full justify-between p-8 border border-red-500/10 hover:border-red-650/40 hover:shadow-[0_0_25px_rgba(220,38,38,0.1)] transition-all duration-300 group hover:translate-y-[-4px] w-full text-left bg-neutral-950/70">
       <div className="space-y-4">
        {/* Icon wrapper with hover scaling */}
        <div className="w-12 h-12 rounded-xl bg-red-600/10 text-red-500 border border-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
         {service.icon}
        </div>
        <h3 className="text-lg font-bold text-white font-display">
         {service.title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
         {service.desc}
        </p>
       </div>

       {/* Action link */}
       <Link 
        to={service.path} 
        className="text-xs font-bold text-red-500 flex items-center gap-1.5 mt-6 hover:text-red-400 transition-colors group-hover:gap-2.5 duration-200"
       >
        <span>Learn More</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
       </Link>
      </GlassCard>
     </motion.div>
    ))}
   </div>
  </section>
 );
};

export default ServicesPreview;
