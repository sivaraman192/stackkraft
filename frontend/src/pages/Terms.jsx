import React from 'react';
import SEO from '../components/SEO';
import GlassCard from '../components/GlassCard';
import { getBreadcrumbSchema } from '../utils/schemaHelper';

const Terms = () => {
 return (
  <div className="relative overflow-hidden min-h-screen py-24 text-white">
   <SEO 
    title="Terms of Service"
    description="Read the Terms and Conditions of StackKraft. Terms covering project estimates, milestone payments, and source code ownership."
    url="/terms"
    schema={getBreadcrumbSchema([{ name: 'Terms & Conditions', path: '/terms' }])}
   />

   <div className="glow-orb w-[300px] h-[300px] bg-red-650/5 bg-red-500/5 bottom-[10%] right-[-50px] animate-pulse-glow" />

   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
    <div className="text-center space-y-4">
     <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
      Terms & <span className="text-gradient">Conditions</span>
     </h1>
     <p className="text-xs sm:text-sm text-slate-400">Last updated: July 8, 2026</p>
    </div>

    <GlassCard className="p-8 sm:p-12 border-red-500/10 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
     <section className="space-y-3">
      <h2 className="text-lg font-bold text-white font-display border-b border-red-950/20 pb-2">1. Scope of Work</h2>
      <p>
       StackKraft Technologies provides custom website design, React frontend engineering, custom API development, and software maintenance services. The specific features, page counts, deliverables, and timelines will be defined in the individual Project Proposal and signed agreement.
      </p>
     </section>

     <section className="space-y-3">
      <h2 className="text-lg font-bold text-white font-display border-b border-red-950/20 pb-2">2. Payment Milestones</h2>
      <p>
       Projects are executed under milestone payments, typically structured as follows:
      </p>
      <ul className="list-disc pl-5 space-y-1.5">
       <li>An initial upfront deposit (25% to 50%) to initiate wireframing and design sprints.</li>
       <li>Progressive milestone payments upon code verification and staging deployment.</li>
       <li>A final launch payment (balance) before the source repositories and DNS domains are transferred.</li>
      </ul>
     </section>

     <section className="space-y-3">
      <h2 className="text-lg font-bold text-white font-display border-b border-red-950/20 pb-2">3. Source Code Ownership</h2>
      <p>
       Unless otherwise agreed, the ownership and intellectual property of the custom software code developed for clients will be transferred to the client upon receipt of the final complete payment. StackKraft retains the right to use boilerplate scripts, non-proprietary code elements, and libraries developed during the course of the project in future builds.
      </p>
     </section>

     <section className="space-y-3">
      <h2 className="text-lg font-bold text-white font-display border-b border-red-950/20 pb-2">4. Client Reviews & Feedback</h2>
      <p>
       Clients are expected to provide timely feedback and revisions during active design and development sprints. Delays in communication extending past 10 business days without notice may result in timeline extensions and rescheduling of delivery cycles.
      </p>
     </section>

     <section className="space-y-3">
      <h2 className="text-lg font-bold text-white font-display border-b border-red-950/20 pb-2">5. Limitation of Liability</h2>
      <p>
       StackKraft Technologies is not liable for business losses, downtime, or performance drops stemming from hosting server failures (e.g., AWS, Vercel, Render), third-party API changes, or client database mismanagement post-handoff.
      </p>
     </section>

     <section className="space-y-3">
      <h2 className="text-lg font-bold text-white font-display border-b border-red-950/20 pb-2">6. Goverment & Jurisdiction</h2>
      <p>
       These Terms & Conditions are governed by the laws of Tamil Nadu, India. Any disputes arising out of contracts signed with StackKraft will be subject to the exclusive jurisdiction of the courts located in Ariyalur/Tamil Nadu.
      </p>
     </section>
    </GlassCard>
   </div>
  </div>
 );
};

export default Terms;
