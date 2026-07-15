import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', onClick, delay = 0, hoverEffect = true }) => {
 const hoverProps = hoverEffect ? {
  whileHover: { 
   y: -5, 
   boxShadow: "0 20px 40px -15px rgba(99, 102, 241, 0.15)",
   borderColor: "var(--primary)"
  },
  transition: { type: "spring", stiffness: 400, damping: 20 }
 } : {};

 return (
  <motion.div
   initial={{ opacity: 0, y: 20 }}
   whileInView={{ opacity: 1, y: 0 }}
   viewport={{ once: true, margin: "-100px" }}
   transition={{ duration: 0.6, delay }}
   onClick={onClick}
   {...hoverProps}
   className={`glassmorphism rounded-2xl p-6 transition-colors duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
   {children}
  </motion.div>
 );
};

export default GlassCard;
