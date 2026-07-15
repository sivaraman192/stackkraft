import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import GlassCard from '../components/GlassCard';

const NotFound = () => {
 return (
  <div className="relative overflow-hidden min-h-screen flex items-center justify-center py-24 text-white">
   <SEO 
    title="404 - Page Not Found"
    description="The page you are looking for does not exist on StackKraft. Go back to our home page to see our services, portfolio, and pricing."
    url="/404"
   />

   {/* Background Orbs */}
   <div className="glow-orb w-[300px] h-[300px] bg-red-650/10 bg-red-500/10 top-[20%] left-[20%] animate-pulse-glow" />
   <div className="glow-orb w-[300px] h-[300px] bg-red-800/10 bottom-[20%] right-[20%] animate-pulse-glow" />

   <div className="max-w-md w-full px-4 relative z-10 text-center">
    <motion.div
     initial={{ opacity: 0, scale: 0.95 }}
     animate={{ opacity: 1, scale: 1 }}
     transition={{ duration: 0.5 }}
    >
     <GlassCard className="p-8 sm:p-12 border-red-500/10 space-y-6">
      <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-500 font-extrabold text-3xl font-display">
       404
      </div>
      
      <h1 className="text-2xl font-bold font-display text-white">Page Not Found</h1>
      
      <p className="text-xs text-slate-400 leading-relaxed">
       The address you entered may be incorrect, or the page has been moved or deleted.
      </p>

      <div className="pt-4 flex flex-col gap-3">
       <Link 
        to="/" 
        className="btn-premium px-5 py-3 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
       >
        <Home className="w-4 h-4" />
        Go to Home
       </Link>
       
       <button 
        onClick={() => window.history.back()}
        className="flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-2 cursor-pointer"
       >
        <ArrowLeft className="w-3.5 h-3.5" />
        Go Back
       </button>
      </div>
     </GlassCard>
    </motion.div>
   </div>
  </div>
 );
};

export default NotFound;
