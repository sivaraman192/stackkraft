import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
 const [scrollProgress, setScrollProgress] = useState(0);

 useEffect(() => {
  const handleScroll = () => {
   const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
   if (totalHeight === 0) return;
   const progress = (window.scrollY / totalHeight) * 100;
   setScrollProgress(progress);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 return (
  <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] pointer-events-none">
   <div 
    className="h-full bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-400 transition-all duration-75 ease-out"
    style={{ width: `${scrollProgress}%` }}
   />
  </div>
 );
};

export default ScrollProgress;
