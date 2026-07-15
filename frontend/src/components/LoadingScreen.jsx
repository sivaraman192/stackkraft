import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const LoadingScreen = () => {
 const [visible, setVisible] = useState(true);
 const [fade, setFade] = useState(false);

 useEffect(() => {
  let isLoaded = false;
  try {
   isLoaded = sessionStorage.getItem('stackkraft_loaded');
  } catch (e) {
   console.warn("Session storage access warning:", e);
  }

  if (isLoaded) {
   setVisible(false);
   return;
  }

  // Start fade out at 2.0s (animates for 0.8s)
  const fadeTimer = setTimeout(() => {
   setFade(true);
   try {
    sessionStorage.setItem('stackkraft_loaded', 'true');
   } catch (e) {
    console.warn("Session storage save warning:", e);
   }
  }, 2000);

  // Completely unmount at 2.8s
  const removeTimer = setTimeout(() => {
   setVisible(false);
  }, 2800);

  return () => {
   clearTimeout(fadeTimer);
   clearTimeout(removeTimer);
  };
 }, []);

 if (!visible) return null;

 return (
  <div 
   className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-gray-950 text-white transition-all duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
    fade ? 'opacity-0 -translate-y-24 pointer-events-none' : 'opacity-100 translate-y-0'
   }`}
  >
   {/* Ambient Glow */}
   <div className="absolute w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px]" />
   
   <div className="relative flex flex-col items-center">
    {/* Animated Logo Icon */}
    <motion.div
     initial={{ scale: 0.8, opacity: 0 }}
     animate={{ scale: 1, opacity: 1 }}
     transition={{ duration: 1, ease: "easeOut" }}
     className="mb-6"
    >
     <Logo variant="favicon" className="w-16 h-16" />
    </motion.div>

    {/* Logo Text */}
    <motion.h1 
     initial={{ letterSpacing: "10px", opacity: 0 }}
     animate={{ letterSpacing: "3px", opacity: 1 }}
     transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
     className="text-2xl font-bold tracking-widest font-display text-white uppercase text-center"
    >
     STACKKRAFT
    </motion.h1>

    <motion.p
     initial={{ opacity: 0 }}
     animate={{ opacity: 0.6 }}
     transition={{ delay: 0.8 }}
     className="text-xs tracking-wider text-gray-400 mt-2 font-light"
    >
     Building Digital Experiences That Drive Growth
    </motion.p>

    {/* Load bar */}
    <div className="w-[180px] h-[2px] bg-gray-800 rounded-full mt-8 overflow-hidden relative">
     <motion.div 
      initial={{ left: "-100%" }}
      animate={{ left: "100%" }}
      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      className="absolute top-0 bottom-0 w-[50%] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
     />
    </div>
   </div>
  </div>
 );
};

export default LoadingScreen;

