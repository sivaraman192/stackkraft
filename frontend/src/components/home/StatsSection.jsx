import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const CountUpComponent = CountUp.default || CountUp;

const StatsSection = () => {
  const stats = [
    {
      id: 'projects',
      value: 5,
      suffix: '+',
      subtitle: 'Projects Built',
      description: 'Personal, academic, and portfolio projects showcasing modern web development skills.'
    },
    {
      id: 'responsive',
      value: 100,
      suffix: '%',
      subtitle: 'Responsive Websites',
      description: 'Every website is fully responsive and optimized for desktop, tablet, and mobile devices.'
    },
    {
      id: 'support',
      value: 24,
      suffix: '/7',
      subtitle: 'Support',
      description: 'Quick responses, continuous support, and timely project updates for every client.'
    },
    {
      id: 'remote',
      isText: true,
      text: 'Remote',
      subtitle: 'Worldwide Service',
      description: 'Providing professional web development services remotely for clients across India and worldwide.'
    }
  ];

  return (
    <section className="py-16 relative z-10 bg-red-950/5 border-b border-red-950/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="text-center space-y-2.5 p-6 rounded-2xl bg-neutral-950/20 border border-red-950/5 hover:-translate-y-1.5 hover:shadow-[0_0_15px_rgba(239,68,68,0.05)] transition-all duration-300 group relative"
          >
            {/* Subtle background glow for stats numbers */}
            <div className="absolute inset-0 -z-10 bg-red-600/5 blur-xl w-16 h-16 rounded-full mx-auto group-hover:scale-125 transition-transform" />
            
            <div className="text-3xl sm:text-5xl font-extrabold text-red-500 font-display flex items-center justify-center">
              {stat.isText ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  viewport={{ once: true }}
                >
                  {stat.text}
                </motion.span>
              ) : (
                <>
                  <CountUpComponent 
                    end={stat.value} 
                    duration={2.5} 
                    enableScrollSpy 
                    scrollSpyOnce 
                  />
                  <span>{stat.suffix}</span>
                </>
              )}
            </div>
            
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-350 font-bold font-sans">
              {stat.subtitle}
            </div>

            <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-[250px] mx-auto">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
