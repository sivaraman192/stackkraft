import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, FileText, Send, CheckCircle2, User, Mail, Phone, Upload } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SEO from '../components/SEO';
import { API_URL } from '../context/AuthContext';
import { getBreadcrumbSchema } from '../utils/schemaHelper';

const Careers = () => {
 const [selectedJob, setSelectedJob] = useState(null);
 const [formData, setFormData] = useState({
  fullName: '',
  email: '',
  phone: '',
  coverLetter: ''
 });
 const [resumeFile, setResumeFile] = useState(null);
 const [submitting, setSubmitting] = useState(false);
 const [status, setStatus] = useState({ type: '', message: '' });

 const jobs = [
  {
   id: "j-1",
   title: "Frontend Developer (React.js) Intern",
   type: "Internship (3-6 Months)",
   location: "Remote / Tamil Nadu",
   description: "Looking for an enthusiastic engineering student or graduate to compile reusable React components, style responsive mockups using Tailwind CSS, and handle Framer Motion animations.",
   skills: ["React.js", "JavaScript (ES6)", "Tailwind CSS", "Git version control"]
  },
  {
   id: "j-2",
   title: "Full Stack Developer",
   type: "Contract / Freelance",
   location: "Remote",
   description: "Build Node.js/Express.js backend services, design Mongoose schemas, deploy MongoDB setups, and integrate APIs with client frontend dashboards.",
   skills: ["Node.js", "Express.js", "MongoDB", "React", "REST API Development"]
  }
 ];

 const handleInputChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleFileChange = (e) => {
  setResumeFile(e.target.files[0]);
 };

 const handleApplySubmit = async (e) => {
  e.preventDefault();
  if (!resumeFile) {
   setStatus({ type: 'error', message: 'Please upload your resume file (.pdf, .doc, or .docx)' });
   return;
  }

  setSubmitting(true);
  setStatus({ type: '', message: '' });

  const submissionData = new FormData();
  submissionData.append('jobTitle', selectedJob.title);
  submissionData.append('fullName', formData.fullName);
  submissionData.append('email', formData.email);
  submissionData.append('phone', formData.phone);
  submissionData.append('coverLetter', formData.coverLetter);
  submissionData.append('resume', resumeFile);

  try {
   const res = await axios.post(`${API_URL}/careers/apply`, submissionData, {
    headers: {
     'Content-Type': 'multipart/form-data'
    }
   });
   setStatus({ type: 'success', message: res.data.message });
   setFormData({ fullName: '', email: '', phone: '', coverLetter: '' });
   setResumeFile(null);
   setTimeout(() => {
    setSelectedJob(null);
    setStatus({ type: '', message: '' });
   }, 3000);
  } catch (err) {
   setStatus({
    type: 'error',
    message: err.response?.data?.message || 'Application failed. Verify format and try again.'
   });
  } finally {
   setSubmitting(false);
  }
 };

 return (
  <div className="relative overflow-hidden min-h-screen py-24 text-white">
   <SEO 
    title="Careers"
    description="Join StackKraft. Explore junior frontend developer internships, contract full-stack developer roles, and apply online."
    url="/careers"
    schema={getBreadcrumbSchema([{ name: 'Careers', path: '/careers' }])}
   />

   <div className="glow-orb w-[300px] h-[300px] bg-red-650/5 bg-red-500/5 top-[20%] left-[-50px] animate-pulse-glow" />
   <div className="glow-orb w-[300px] h-[300px] bg-red-800/5 bottom-[20%] right-[-50px] animate-pulse-glow" />

   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10 text-left">
    
    {/* Header */}
    <div className="text-center space-y-4 max-w-3xl mx-auto">
     <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
      Careers
     </div>
     <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
      Join the <span className="text-gradient">Team</span>
     </h1>
     <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
      StackKraft is growing. We seek passionate developers to build high-performance web solutions. Check our active roles below.
     </p>
    </div>

    {/* Listings */}
    <div className="space-y-6">
     {jobs.map((job) => (
      <GlassCard key={job.id} className="p-6 sm:p-8 space-y-4 border-red-500/10 hover:border-red-500/25 transition-all">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
         <h3 className="text-base sm:text-lg font-bold text-white font-display">{job.title}</h3>
         <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1">
           <Briefcase className="w-3.5 h-3.5 text-red-500" />
           {job.type}
          </span>
          <span className="flex items-center gap-1">
           <MapPin className="w-3.5 h-3.5 text-red-500" />
           {job.location}
          </span>
         </div>
        </div>
        
        <button
         onClick={() => setSelectedJob(job)}
         className="bg-red-650 bg-red-500 hover:bg-red-600 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer text-center"
        >
         Apply Now
        </button>
       </div>

       <p className="text-xs text-slate-350 leading-relaxed font-light">{job.description}</p>
       
       <div className="space-y-1.5 pt-2">
        <h4 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Preferred Stack</h4>
        <div className="flex flex-wrap gap-1.5">
         {job.skills.map((skill, sIdx) => (
          <span key={sIdx} className="text-[9px] bg-neutral-900 border border-neutral-850 text-red-400 px-2.5 py-0.5 rounded">
           {skill}
          </span>
         ))}
        </div>
       </div>
      </GlassCard>
     ))}
    </div>

    {/* Application Intake Modal */}
    <AnimatePresence>
     {selectedJob && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
       <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
         setSelectedJob(null);
         setStatus({ type: '', message: '' });
        }}
        className="absolute inset-0 bg-black transition-colors duration-300/85 backdrop-blur-sm"
       />

       <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="w-full max-w-lg glassmorphism rounded-2xl border border-red-500/20 max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative text-left bg-black transition-colors duration-300 z-10"
       >
        {/* Close */}
        <button
         onClick={() => {
          setSelectedJob(null);
          setStatus({ type: '', message: '' });
         }}
         className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 hover:bg-neutral-900 rounded-full cursor-pointer"
        >
         Close
        </button>

        <div className="space-y-2">
         <span className="text-[9px] uppercase tracking-widest text-red-500 font-bold bg-red-500/5 px-3 py-1 border border-red-500/10 rounded-full">
          Intake Application
         </span>
         <h3 className="text-lg font-bold text-white font-display leading-tight">{selectedJob.title}</h3>
        </div>

        {/* Status messages */}
        {status.type === 'success' ? (
         <div className="text-center p-6 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h4 className="text-sm font-bold text-white">Application Received</h4>
          <p className="text-xs text-slate-400 leading-normal">{status.message}</p>
         </div>
        ) : (
         <form onSubmit={handleApplySubmit} className="space-y-4">
          <div className="space-y-1">
           <label className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Full Name</label>
           <div className="relative">
            <input
             type="text"
             name="fullName"
             required
             value={formData.fullName}
             onChange={handleInputChange}
             className="w-full bg-neutral-900 border border-neutral-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
             placeholder="Your Name"
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
           </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div className="space-y-1">
            <label className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Email Address</label>
            <div className="relative">
             <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-neutral-900 border border-neutral-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
              placeholder="mail@example.com"
             />
             <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
           </div>
           <div className="space-y-1">
            <label className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Phone Number</label>
            <div className="relative">
             <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-neutral-900 border border-neutral-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
              placeholder="+91 XXXXX XXXXX"
             />
             <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
           </div>
          </div>

          <div className="space-y-1">
           <label className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Cover Letter / Note</label>
           <textarea
            name="coverLetter"
            rows="3"
            value={formData.coverLetter}
            onChange={handleInputChange}
            className="w-full bg-neutral-900 border border-neutral-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 resize-none"
            placeholder="Explain briefly why you would like to collaborate with StackKraft..."
           />
          </div>

          {/* Resume selection file input */}
          <div className="space-y-1">
           <label className="text-[10px] uppercase text-gray-400 font-bold tracking-wider block">Resume (.pdf, .doc, .docx)</label>
           <div className="border-2 border-dashed border-neutral-850 hover:border-red-500/40 rounded-xl p-6 text-center cursor-pointer relative group transition-colors bg-neutral-950 border-slate-200 ">
            <input
             type="file"
             accept=".pdf,.doc,.docx"
             required
             onChange={handleFileChange}
             className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <Upload className="w-8 h-8 text-slate-500 group-hover:text-red-500 mx-auto mb-2 transition-colors" />
            <span className="text-xs text-slate-400 group-hover:text-white font-medium block">
             {resumeFile ? resumeFile.name : 'Select Resume File'}
            </span>
            <span className="text-[10px] text-slate-600 block mt-1">Maximum size 5MB</span>
           </div>
          </div>

          {status.type === 'error' && (
           <p className="text-xs text-red-500">{status.message}</p>
          )}

          <div className="flex gap-4 pt-2">
           <button
            type="submit"
            disabled={submitting}
            className="w-full btn-premium py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-red-500/20 active:scale-[0.98]"
           >
            <Send className="w-3.5 h-3.5" />
            {submitting ? 'Submitting...' : 'Send Application'}
           </button>
          </div>
         </form>
        )}
       </motion.div>
      </div>
     )}
    </AnimatePresence>

   </div>
  </div>
 );
};

export default Careers;
