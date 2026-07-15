import React from 'react';
import SEO from '../components/SEO';
import GlassCard from '../components/GlassCard';
import { getBreadcrumbSchema } from '../utils/schemaHelper';

const PrivacyPolicy = () => {
 return (
  <div className="relative overflow-hidden min-h-screen py-24 text-white">
   <SEO 
    title="Privacy Policy"
    description="Read the Privacy Policy of StackKraft. Learn how we handle your personal data, project repositories, and web forms."
    url="/privacy"
    schema={getBreadcrumbSchema([{ name: 'Privacy Policy', path: '/privacy' }])}
   />

   <div className="glow-orb w-[300px] h-[300px] bg-red-600/5 top-[10%] left-[-50px] animate-pulse-glow" />

   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
    <div className="text-center space-y-4">
     <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
      Privacy <span className="text-gradient">Policy</span>
     </h1>
     <p className="text-xs sm:text-sm text-slate-400">Last updated: July 8, 2026</p>
    </div>

    <GlassCard className="p-8 sm:p-12 border-red-500/10 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
     <section className="space-y-3">
      <h2 className="text-lg font-bold text-white font-display border-b border-red-950/20 pb-2">1. Information We Collect</h2>
      <p>
       We collect information that you provide directly to us when filling out forms on our website, signing up for our newsletter, submitting job applications, or contacting us through our AI chat assistant. This may include:
      </p>
      <ul className="list-disc pl-5 space-y-1.5">
       <li>Contact details such as name, email address, and phone number.</li>
       <li>Project details, estimated budgets, and project types.</li>
       <li>Resume and professional references for careers applications.</li>
      </ul>
     </section>

     <section className="space-y-3">
      <h2 className="text-lg font-bold text-white font-display border-b border-red-950/20 pb-2">2. How We Use Your Information</h2>
      <p>
       We utilize the collected information to:
      </p>
      <ul className="list-disc pl-5 space-y-1.5">
       <li>Process and respond to your sales inquiries, contact forms, or support requests.</li>
       <li>Send periodic newsletters, updates, and design tips (you may opt-out at any time).</li>
       <li>Evaluate career applications and contact candidates for technical interviews.</li>
       <li>Maintain site security, monitor backend API traffic, and prevent spam.</li>
      </ul>
     </section>

     <section className="space-y-3">
      <h2 className="text-lg font-bold text-white font-display border-b border-red-950/20 pb-2">3. Repository & Data Confidentiality</h2>
      <p>
       For clients partnering with us, all proprietary code bases, Git repositories, architectural maps, database schemas, and commercial agreements are kept strictly confidential. We do not sell or lease project details or intellectual properties to third-party databases.
      </p>
     </section>

     <section className="space-y-3">
      <h2 className="text-lg font-bold text-white font-display border-b border-red-950/20 pb-2">4. Cookies and Analytics</h2>
      <p>
       Our website uses cookies and lightweight local storage mechanisms to store theme selections (light/dark mode status) and admin login tokens. We may also track anonymous visitor statistics to evaluate page performance and SEO keyword efficiency.
      </p>
     </section>

     <section className="space-y-3">
      <h2 className="text-lg font-bold text-white font-display border-b border-red-950/20 pb-2">5. Updates to This Policy</h2>
      <p>
       StackKraft reserves the right to modify this Privacy Policy at any time. Any changes will be posted directly to this page with an updated modification date.
      </p>
     </section>

     <section className="space-y-3">
      <h2 className="text-lg font-bold text-white font-display border-b border-red-950/20 pb-2">6. Contacting Us</h2>
      <p>
       If you have any questions or concerns regarding our privacy policies, feel free to reach out to us at:
      </p>
      <p className="font-semibold text-white">
       Email: sivaraman.official13@gmail.com <br />
       WhatsApp: +91 9342913781
      </p>
     </section>
    </GlassCard>
   </div>
  </div>
 );
};

export default PrivacyPolicy;
