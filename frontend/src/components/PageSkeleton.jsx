import React from 'react';

const PageSkeleton = () => {
 return (
  <div className="min-h-screen bg-[#050505] text-white pt-24 px-4 sm:px-6 lg:px-8 space-y-12">
   {/* Hero Skeleton */}
   <div className="max-w-4xl mx-auto space-y-6 text-center animate-pulse">
    <div className="h-4 w-32 bg-neutral-850 rounded-full mx-auto" />
    <div className="h-12 sm:h-16 w-3/4 bg-neutral-800 rounded-2xl mx-auto" />
    <div className="h-6 w-1/2 bg-neutral-850 rounded-lg mx-auto" />
    <div className="h-10 w-40 bg-indigo-950/40 border border-indigo-500/10 rounded-full mx-auto mt-4" />
   </div>

   {/* Grid Skeleton */}
   <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
    {[1, 2, 3].map((i) => (
     <div key={i} className="p-6 bg-neutral-900/40 border border-neutral-800/40 rounded-2xl space-y-4 animate-pulse">
      <div className="w-12 h-12 bg-neutral-800 rounded-xl" />
      <div className="h-6 w-2/3 bg-neutral-800 rounded-md" />
      <div className="space-y-2">
       <div className="h-4 w-full bg-neutral-850 rounded-sm" />
       <div className="h-4 w-5/6 bg-neutral-850 rounded-sm" />
       <div className="h-4 w-4/5 bg-neutral-850 rounded-sm" />
      </div>
      <div className="pt-2">
       <div className="h-4 w-24 bg-neutral-800 rounded-sm" />
      </div>
     </div>
    ))}
   </div>

   {/* Dynamic Content Line Skeleton */}
   <div className="max-w-4xl mx-auto py-12 space-y-4 animate-pulse">
    <div className="h-8 w-48 bg-neutral-800 rounded-lg" />
    <div className="h-4 w-full bg-neutral-850 rounded-sm" />
    <div className="h-4 w-full bg-neutral-850 rounded-sm" />
    <div className="h-4 w-3/4 bg-neutral-850 rounded-sm" />
   </div>
  </div>
 );
};

export default PageSkeleton;
