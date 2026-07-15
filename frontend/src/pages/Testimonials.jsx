import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Quote, User, Sparkles } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import GlassCard from '../components/GlassCard';
import SEO from '../components/SEO';
import { API_URL } from '../context/AuthContext';
import { getBreadcrumbSchema } from '../utils/schemaHelper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
 const [reviews, setReviews] = useState([]);
 const [loading, setLoading] = useState(true);

 const fallbackReviews = [
  {
   _id: "ts-1",
   clientName: "Alex Johnson",
   role: "Founder & CEO",
   company: "TrendZone Store",
   comment: "StackKraft built our e-commerce platform from scratch. Their understanding of React 19 and Node.js backend optimization helped us double our sales throughput. Highly recommended!",
   rating: 5,
   image: "/images/avatar_alex.png"
  },
  {
   _id: "ts-2",
   clientName: "Dr. Sarah Patel",
   role: "CTO",
   company: "HealthSync Platforms",
   comment: "The animations on our new clinic dashboard are incredibly smooth. StackKraft implemented a futuristic glassmorphic UI that our patients and staff absolutely love. Outstanding engineering!",
   rating: 5,
   image: "/images/avatar_sarah.png"
  },
  {
   _id: "ts-3",
   clientName: "David Miller",
   role: "Lead Coordinator",
   company: "EventSync Networks",
   comment: "We needed a high-performance site built for quick volunteer registration. StackKraft achieved incredible page load speeds and complete SEO setups. The search traffic went up by 150%.",
   rating: 5,
   image: "/images/avatar_david.png"
  }
 ];

 useEffect(() => {
  const fetchReviews = async () => {
   try {
    const res = await axios.get(`${API_URL}/testimonials`);
    if (res.data && res.data.length > 0) {
     setReviews(res.data);
    } else {
     setReviews(fallbackReviews);
    }
   } catch (err) {
    console.error("Failed to load reviews from API, using fallback:", err);
    setReviews(fallbackReviews);
   } finally {
    setLoading(false);
   }
  };
  fetchReviews();
 }, []);

 const renderStars = (rating) => {
  return Array.from({ length: 5 }).map((_, idx) => (
   <Star 
    key={idx} 
    className={`w-4 h-4 shrink-0 ${idx < rating ? 'text-red-500 fill-red-500 animate-pulse' : 'text-neutral-800'}`} 
   />
  ));
 };

 return (
  <div className="relative overflow-hidden min-h-screen pt-28 pb-20 text-white bg-[#050505] transition-colors duration-300">
   <SEO 
    title="Client Reviews"
    description="Read what our clients say about StackKraft. Professional reviews from founders, tech advisors, and leads."
    url="/testimonials"
    schema={getBreadcrumbSchema([{ name: 'Testimonials', path: '/testimonials' }])}
   />

   {/* Pulsing Background Neon Orbs */}
   <div className="absolute top-[-50px] left-[-50px] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] animate-pulse pointer-events-none -z-10" />
   <div className="absolute bottom-[10%] right-[-50px] w-[500px] h-[500px] bg-red-800/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
    
    {/* Page Hero Header */}
    <div className="text-center space-y-4 max-w-3xl mx-auto bg-black transition-colors duration-300/30 p-8 rounded-3xl border border-slate-150 backdrop-blur-xl relative">
     <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
      <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
      <span>Success Stories</span>
     </div>
     <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
      Client <span className="text-gradient">Feedback</span>
     </h1>
     <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
      Read the success stories and testimonials from founders, CTOs, and product directors who partnered with StackKraft to build their modern platforms.
     </p>
    </div>

    {/* Featured Slider Showcase */}
    {loading ? (
     <div className="w-full max-w-3xl mx-auto h-[350px] bg-neutral-950 border-slate-200 animate-pulse rounded-2xl border border-neutral-900" />
    ) : (
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
       {reviews.map((item, idx) => (
        <SwiperSlide key={idx} className="h-auto">
         <GlassCard className="p-8 sm:p-12 border border-red-500/10 text-center space-y-6 bg-black transition-colors duration-300/40 shadow-xl rounded-2xl flex flex-col justify-between h-full relative">
          <Quote className="w-16 h-16 text-red-500/5 absolute top-6 left-6" />
          
          <div className="flex justify-center gap-1.5">
           {renderStars(item.rating)}
          </div>
          
          <p className="text-sm sm:text-lg text-slate-300 italic leading-relaxed font-sans max-w-2xl mx-auto">
           "{item.comment}"
          </p>

          <div className="flex items-center justify-center gap-3.5 pt-4 border-t border-neutral-900/60 max-w-xs mx-auto">
           {item.image ? (
            <img 
             src={item.image} 
             alt={item.clientName} 
             className="w-11 h-11 rounded-full object-cover border border-red-500/20 shrink-0 shadow-lg"
            />
           ) : (
            <div className="w-11 h-11 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center shrink-0">
             <User className="w-5 h-5" />
            </div>
           )}
           <div className="text-left leading-tight">
            <div className="text-xs sm:text-sm font-bold text-white">
             {item.clientName}
            </div>
            <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
             {item.role} {item.company ? `at ${item.company}` : ""}
            </span>
           </div>
          </div>
         </GlassCard>
        </SwiperSlide>
       ))}
      </Swiper>
     </div>
    )}

    {/* Directory Grid */}
    <div className="space-y-8">
     <h2 className="text-xl sm:text-2xl font-bold font-display text-white text-center">Verified Reviews Directory</h2>
     
     {loading ? (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {[1, 2, 3].map((n) => (
        <div key={n} className="h-52 rounded-2xl bg-neutral-950 border-slate-200 animate-pulse border border-neutral-900" />
       ))}
      </div>
     ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
       {reviews.map((review, idx) => (
        <GlassCard 
         key={review._id || idx}
         className="flex flex-col justify-between h-full border-red-500/10 hover:border-red-500/25 relative p-6 bg-black transition-colors duration-300/30 rounded-2xl transition-all hover:translate-y-[-4px]"
        >
         <Quote className="w-8 h-8 text-red-500/10 absolute top-4 right-4" />

         <div className="space-y-4">
          <div className="flex gap-1">
           {renderStars(review.rating)}
          </div>

          <p className="text-xs text-slate-350 leading-relaxed font-light italic font-sans">
           "{review.comment}"
          </p>
         </div>

         <div className="border-t border-slate-900 pt-4 mt-6 flex items-center gap-3">
          {review.image ? (
           <img 
            src={review.image} 
            alt={review.clientName} 
            className="w-9 h-9 rounded-full object-cover border border-red-500/20 shrink-0"
           />
          ) : (
           <div className="w-9 h-9 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center shrink-0">
            <User className="w-4 h-4" />
           </div>
          )}
          <div>
           <h4 className="text-xs font-bold text-white tracking-wide font-display">{review.clientName}</h4>
           <p className="text-[10px] text-slate-500">
            {review.role} {review.company ? `at ${review.company}` : ''}
           </p>
          </div>
         </div>
        </GlassCard>
       ))}
      </div>
     )}
    </div>

    {/* Call To Action Section */}
    <div className="pt-8 border-t border-neutral-900/60">
     <div className="rounded-3xl border border-red-500/10 bg-gradient-to-b from-neutral-950 to-black p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Ready to Start?</h2>
      <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
       Let's build something amazing together. Contact us for a custom project quote.
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

export default Testimonials;
