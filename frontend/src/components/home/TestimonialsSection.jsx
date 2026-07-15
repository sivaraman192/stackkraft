import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Star } from 'lucide-react';
import GlassCard from '../GlassCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
 const testimonials = [
  {
   name: "Alex Johnson",
   role: "Founder, TrendZone",
   rating: 5,
   content: "StackKraft delivered an exceptional e-commerce platform. The React 19 interface runs incredibly fast, and our conversion rate has doubled since the launch. Their engineering standard is top notch.",
   image: "/images/avatar_alex.png"
  },
  {
   name: "Dr. Sarah Patel",
   role: "CTO, HealthSync Platform",
   rating: 5,
   content: "The custom dashboard designed by StackKraft is a masterclass in modern UI design. The glassmorphism cards and smooth Framer Motion micro-animations look extremely premium.",
   image: "/images/avatar_sarah.png"
  },
  {
   name: "David Miller",
   role: "CEO, EventSync",
   rating: 5,
   content: "We hired StackKraft to rebuild our event planner site. The team delivered clean code structure and rapid deployment schedules. Sivaraman is an absolute wizard with React and Express.",
   image: "/images/avatar_david.png"
  }
 ];

 return (
  <section className="bg-neutral-950/50 border-y border-red-950/20 py-24 relative z-10 overflow-hidden">
   {/* Background decorations */}
   <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] -z-10 bg-red-600/5 blur-3xl w-[500px] h-[300px] rounded-full pointer-events-none" />

   <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
    {/* Header */}
    <div className="space-y-4">
     <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
      Reviews
     </div>
     <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
      Client Success Stories
     </h2>
     <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed font-sans">
      Read how StackKraft helps enterprises design and build premium systems.
     </p>
    </div>

    {/* Swiper Slider */}
    <div className="w-full max-w-3xl mx-auto">
     <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ 
       clickable: true,
       bulletActiveClass: 'bg-red-500!',
       bulletClass: 'inline-block w-2.5 h-2.5 rounded-full bg-neutral-800 mx-1.5 cursor-pointer transition-all duration-300'
      }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      spaceBetween={30}
      slidesPerView={1}
      className="w-full pb-14"
     >
      {testimonials.map((item, idx) => (
       <SwiperSlide key={idx} className="h-auto">
        <GlassCard className="p-8 sm:p-12 border border-red-500/10 text-center space-y-6 bg-black/40 shadow-xl rounded-2xl flex flex-col justify-between h-full">
         {/* Rating Stars */}
         <div className="flex justify-center gap-1.5">
          {[...Array(item.rating)].map((_, rIdx) => (
           <Star key={rIdx} className="w-4.5 h-4.5 fill-red-500 text-red-500 shrink-0" />
          ))}
         </div>
         
         {/* Quote block */}
         <p className="text-xs sm:text-base text-slate-350 italic leading-relaxed font-sans max-w-2xl mx-auto">
          "{item.content}"
         </p>

         {/* Client Portrait Info */}
         <div className="flex items-center justify-center gap-3.5 pt-4 border-t border-neutral-900/60 max-w-xs mx-auto">
          <img 
           src={item.image} 
           alt={item.name} 
           className="w-11 h-11 rounded-full object-cover border border-red-500/20 shrink-0 shadow-lg"
          />
          <div className="text-left leading-tight">
           <div className="text-xs sm:text-sm font-bold text-white">
            {item.name}
           </div>
           <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
            {item.role}
           </span>
          </div>
         </div>
        </GlassCard>
       </SwiperSlide>
      ))}
     </Swiper>
    </div>
   </div>
  </section>
 );
};

export default TestimonialsSection;
