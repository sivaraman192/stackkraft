import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowLeft, AlertOctagon } from 'lucide-react';
import SEO from '../components/SEO';
import GlassCard from '../components/GlassCard';

const ServerError = ({ error }) => {
 const handleReload = () => {
  window.location.reload();
 };

 return (
  <div className="relative overflow-hidden min-h-screen flex items-center justify-center py-24 text-white bg-[#050505] transition-colors duration-300">
   <SEO 
    title="500 - System Server Error"
    description="StackKraft has encountered an unexpected server error. We are investigating the issue. Please reload the page or return back."
   />

   {/* Background Glows */}
   <div className="glow-orb w-[300px] h-[300px] bg-red-600/10 top-[20%] left-[20%] animate-pulse-glow" />
   <div className="glow-orb w-[300px] h-[300px] bg-indigo-600/10 bottom-[20%] right-[20%] animate-pulse-glow" />

   <div className="max-w-md w-full px-4 relative z-10 text-center">
    <motion.div
     initial={{ opacity: 0, scale: 0.95 }}
     animate={{ opacity: 1, scale: 1 }}
     transition={{ duration: 0.5 }}
    >
     <GlassCard className="p-8 sm:p-12 border-red-500/10 space-y-6">
      <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-500">
       <AlertOctagon className="w-10 h-10 animate-bounce" />
      </div>
      
      <h1 className="text-2xl font-bold font-display text-white">System Error (500)</h1>
      
      <p className="text-xs text-slate-400 leading-relaxed">
       We've encountered an unexpected issue while rendering this view. Our engineering team has been notified.
      </p>

      {process.env.NODE_ENV === 'development' && error && (
       <div className="p-3 bg-red-950/20 border border-red-500/10 rounded-xl text-[10px] text-red-400 text-left font-mono overflow-auto max-h-32">
        {error.toString()}
       </div>
      )}

      <div className="pt-4 flex flex-col gap-3">
       <button 
        onClick={handleReload}
        className="btn-premium px-5 py-3 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
       >
        <RefreshCw className="w-4 h-4" />
        Reload Page
       </button>
       
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

export default ServerError;
