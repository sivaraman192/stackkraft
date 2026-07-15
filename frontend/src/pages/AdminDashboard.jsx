import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
 AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { useAuth, API_URL } from '../context/AuthContext';
import { 
 LayoutDashboard, FolderKanban, BookOpen, Layers, MessageSquare, 
 Mail, Users, Briefcase, Eye, Trash2, Edit3, Plus, LogOut, Check, X, 
 ShieldAlert, Settings, Download, Upload, Send, HelpCircle, EyeOff
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SEO from '../components/SEO';
import { toast, Toaster } from 'react-hot-toast';

// Custom Image Uploader Component
const ImageUploader = ({ onUploadSuccess, currentUrl, folder = 'stackkraft/portfolio', token }) => {
 const [uploading, setUploading] = useState(false);
 const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  setUploading(true);
  const formData = new FormData();
  formData.append('image', file);
  formData.append('folder', folder);

  try {
   const res = await axios.post(`${API_URL}/upload/single`, formData, {
    headers: {
     'Content-Type': 'multipart/form-data',
     Authorization: `Bearer ${token}`
    }
   });
   onUploadSuccess(res.data.url);
   toast.success('Image uploaded to Cloudinary!');
  } catch (err) {
   console.error(err);
   toast.error('Image upload failed');
  } finally {
   setUploading(false);
  }
 };

 return (
  <div className="space-y-2 border border-red-500/5 bg-slate-100 p-4 rounded-xl border border-slate-200 ">
   <div className="flex items-center gap-3">
    <input 
     type="file" 
     accept="image/*"
     onChange={handleFileChange}
     className="hidden" 
     id={`upload-${folder}`}
    />
    <label 
     htmlFor={`upload-${folder}`}
     className="bg-slate-200 hover:bg-slate-300 :bg-neutral-850 border border-slate-300 text-slate-700 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-all inline-flex items-center gap-1.5"
    >
     <Upload className="w-3.5 h-3.5" />
     {uploading ? 'Uploading...' : 'Upload Image'}
    </label>
    {currentUrl && (
     <span className="text-[10px] text-emerald-400 font-semibold truncate max-w-[200px]">
      File Uploaded successfully
     </span>
    )}
   </div>
   {currentUrl && (
    <div className="w-28 h-18 rounded-lg overflow-hidden border border-red-500/20 relative group mt-2">
     <img src={currentUrl} alt="Preview" className="w-full h-full object-cover" />
    </div>
   )}
  </div>
 );
};

const AdminDashboard = () => {
 const { admin, token, login, logout, isAuthenticated, loading } = useAuth();
 
 // Login form states
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [loginError, setLoginError] = useState('');

 // Active tab state
 const [activeTab, setActiveTab] = useState('analytics');

 // DB content states
 const [metrics, setMetrics] = useState({});
 const [chartData, setChartData] = useState([]);
 const [projects, setProjects] = useState([]);
 const [blogs, setBlogs] = useState([]);
 const [services, setServices] = useState([]);
 const [testimonials, setTestimonials] = useState([]);
 const [leads, setLeads] = useState([]);
 const [messages, setMessages] = useState([]);
 const [applications, setApplications] = useState([]);

 // Search & Filters for Messages
 const [msgSearch, setMsgSearch] = useState('');
 const [msgFilter, setMsgFilter] = useState('all');

 // Reply message modal
 const [replyTarget, setReplyTarget] = useState(null);

 // Preview blog split screen view toggle
 const [blogPreviewMode, setBlogPreviewMode] = useState(false);

 // Form edit/create states
 const [projectForm, setProjectForm] = useState({ title: '', description: '', techStack: '', features: '', category: 'Business', order: 0, imageUrl: '' });
 const [blogForm, setBlogForm] = useState({ title: '', summary: '', content: '', category: 'Web Development', tags: '', readTime: '3 min read', status: 'published', imageUrl: '' });
 const [serviceForm, setServiceForm] = useState({ title: '', description: '', benefits: '', technologies: '', pricing: '', iconName: 'Globe', order: 0 });
 const [testimonialForm, setTestimonialForm] = useState({ clientName: '', role: '', company: '', comment: '', rating: 5, isFeatured: true, avatarUrl: '' });

 // Settings Manager State
 const [settings, setSettings] = useState({
  companyName: 'StackKraft Technologies',
  logoUrl: '',
  github: 'https://github.com/sivaraman192',
  linkedin: 'https://linkedin.com',
  instagram: 'https://instagram.com',
  whatsapp: '919342913781',
  metaTitle: 'StackKraft - Premium Software Development Agency',
  metaDescription: 'Custom React & full-stack development. We build high-conversion landing pages, portfolios, and web apps with premium animations.',
  analyticsId: 'G-XXXXXXXXXX',
  email: 'sivaraman.official13@gmail.com',
  phone: '+91 93429 13781',
  location: 'Ariyalur, Tamil Nadu, India'
 });

 const [editingId, setEditingId] = useState(null);

 // Load Settings from localStorage on mount
 useEffect(() => {
  const localSettings = localStorage.getItem('stackkraft_admin_settings');
  if (localSettings) {
   setSettings(JSON.parse(localSettings));
  }
 }, []);

 // Load dashboard data
 useEffect(() => {
  if (isAuthenticated) {
   fetchDashboardData();
  }
 }, [isAuthenticated, activeTab]);

 const fetchDashboardData = async () => {
  try {
   const config = { headers: { Authorization: `Bearer ${token}` } };
   
   // Load Analytics
   const analyticalRes = await axios.get(`${API_URL}/analytics/dashboard`, config);
   setMetrics(analyticalRes.data.metrics || {});
   setChartData(analyticalRes.data.chartData || []);

   // Load specific tabs
   if (activeTab === 'projects') {
    const res = await axios.get(`${API_URL}/projects`, config);
    setProjects(res.data);
   } else if (activeTab === 'blogs') {
    const res = await axios.get(`${API_URL}/blogs?all=true`, config);
    setBlogs(res.data);
   } else if (activeTab === 'services') {
    const res = await axios.get(`${API_URL}/services`, config);
    setServices(res.data);
   } else if (activeTab === 'testimonials') {
    const res = await axios.get(`${API_URL}/testimonials`, config);
    setTestimonials(res.data);
   } else if (activeTab === 'leads') {
    const res = await axios.get(`${API_URL}/leads`, config);
    setLeads(res.data);
   } else if (activeTab === 'messages') {
    const res = await axios.get(`${API_URL}/contact`, config);
    setMessages(res.data);
   } else if (activeTab === 'applications') {
    const res = await axios.get(`${API_URL}/careers/applications`, config);
    setApplications(res.data);
   }
  } catch (err) {
   console.error("Error fetching admin dashboard content:", err);
  }
 };

 const handleLoginSubmit = async (e) => {
  e.preventDefault();
  setLoginError('');
  try {
   await login(username, password);
   toast.success('Admin login authorized');
  } catch (err) {
   setLoginError(err.message || 'Invalid Credentials');
   toast.error('Authentication rejected');
  }
 };

 // CRUD Actions
 const deleteItem = async (route, id) => {
  if (!window.confirm("Are you sure you want to delete this item?")) return;
  try {
   const config = { headers: { Authorization: `Bearer ${token}` } };
   await axios.delete(`${API_URL}/${route}/${id}`, config);
   toast.success('Item deleted successfully');
   fetchDashboardData();
  } catch (err) {
   toast.error("Failed to delete item.");
  }
 };

 // Project CRUD Submit
 const handleProjectSubmit = async (e) => {
  e.preventDefault();
  try {
   const config = { headers: { Authorization: `Bearer ${token}` } };
   const payload = {
    ...projectForm,
    techStack: typeof projectForm.techStack === 'string' 
     ? projectForm.techStack.split(',').map(s => s.trim()).filter(Boolean)
     : projectForm.techStack,
    features: typeof projectForm.features === 'string'
     ? projectForm.features.split('\n').map(s => s.trim()).filter(Boolean)
     : projectForm.features
   };

   if (editingId) {
    await axios.put(`${API_URL}/projects/${editingId}`, payload, config);
    toast.success('Project updated');
    setEditingId(null);
   } else {
    await axios.post(`${API_URL}/projects`, payload, config);
    toast.success('New project created');
   }
   
   setProjectForm({ title: '', description: '', techStack: '', features: '', category: 'Business', order: 0, imageUrl: '' });
   fetchDashboardData();
  } catch (err) {
   toast.error("Failed saving project.");
  }
 };

 // Blog CRUD Submit
 const handleBlogSubmit = async (e) => {
  e.preventDefault();
  try {
   const config = { headers: { Authorization: `Bearer ${token}` } };
   const payload = {
    ...blogForm,
    tags: typeof blogForm.tags === 'string'
     ? blogForm.tags.split(',').map(s => s.trim()).filter(Boolean)
     : blogForm.tags
   };

   if (editingId) {
    await axios.put(`${API_URL}/blogs/${editingId}`, payload, config);
    toast.success('Article updated');
    setEditingId(null);
   } else {
    await axios.post(`${API_URL}/blogs`, payload, config);
    toast.success('New article published');
   }

   setBlogForm({ title: '', summary: '', content: '', category: 'Web Development', tags: '', readTime: '3 min read', status: 'published', imageUrl: '' });
   fetchDashboardData();
  } catch (err) {
   toast.error("Failed saving article.");
  }
 };

 // Service CRUD Submit
 const handleServiceSubmit = async (e) => {
  e.preventDefault();
  try {
   const config = { headers: { Authorization: `Bearer ${token}` } };
   const payload = {
    ...serviceForm,
    benefits: typeof serviceForm.benefits === 'string'
     ? serviceForm.benefits.split(',').map(s => s.trim()).filter(Boolean)
     : serviceForm.benefits,
    technologies: typeof serviceForm.technologies === 'string'
     ? serviceForm.technologies.split(',').map(s => s.trim()).filter(Boolean)
     : serviceForm.technologies
   };

   if (editingId) {
    await axios.put(`${API_URL}/services/${editingId}`, payload, config);
    toast.success('Service updated');
    setEditingId(null);
   } else {
    await axios.post(`${API_URL}/services`, payload, config);
    toast.success('New service added');
   }

   setServiceForm({ title: '', description: '', benefits: '', technologies: '', pricing: '', iconName: 'Globe', order: 0 });
   fetchDashboardData();
  } catch (err) {
   toast.error("Failed saving service.");
  }
 };

 // Testimonial CRUD Submit
 const handleTestimonialSubmit = async (e) => {
  e.preventDefault();
  try {
   const config = { headers: { Authorization: `Bearer ${token}` } };
   if (editingId) {
    await axios.put(`${API_URL}/testimonials/${editingId}`, testimonialForm, config);
    toast.success('Review updated');
    setEditingId(null);
   } else {
    await axios.post(`${API_URL}/testimonials`, testimonialForm, config);
    toast.success('New review added');
   }

   setTestimonialForm({ clientName: '', role: '', company: '', comment: '', rating: 5, isFeatured: true, avatarUrl: '' });
   fetchDashboardData();
  } catch (err) {
   toast.error("Failed saving review.");
  }
 };

 // Mark Message Read
 const toggleMessageStatus = async (id, currentStatus) => {
  try {
   const config = { headers: { Authorization: `Bearer ${token}` } };
   const nextStatus = currentStatus === 'unread' ? 'read' : 'unread';
   await axios.put(`${API_URL}/contact/${id}`, { status: nextStatus }, config);
   fetchDashboardData();
  } catch (err) {
   console.error(err);
  }
 };

 // Update applicant status
 const updateCandidateStatus = async (id, status) => {
  try {
   const config = { headers: { Authorization: `Bearer ${token}` } };
   await axios.put(`${API_URL}/careers/applications/${id}`, { status }, config);
   toast.success(`Applicant status: ${status}`);
   fetchDashboardData();
  } catch (err) {
   console.error(err);
  }
 };

 // Export Subscribers to CSV
 const exportSubscribersCSV = () => {
  if (leads.length === 0) {
   toast.error('No subscribers available to export');
   return;
  }
  const headers = ['Email', 'Source', 'Subscribed Date'];
  const rows = leads.map(l => [
   l.email,
   l.source,
   new Date(l.createdAt).toLocaleDateString()
  ]);
  
  const csvContent = "data:text/csv;charset=utf-8," 
   + [headers.join(',')].concat(rows.map(e => e.join(','))).join('\n');
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `stackkraft_subscribers_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast.success('Subscribers CSV exported!');
 };

 // Reply message form trigger
 const handleReplyMailto = (msg) => {
  const subject = encodeURIComponent(`Re: StackKraft Inquiry regarding ${msg.serviceRequired}`);
  const body = encodeURIComponent(`Hi ${msg.name},\n\nThank you for reaching out to StackKraft Technologies. Regarding your query:\n\n"${msg.message}"\n\n[Your message here]\n\nBest regards,\nSivaraman M\nStackKraft Technologies`);
  window.location.href = `mailto:${msg.email}?subject=${subject}&body=${body}`;
  if (msg.status === 'unread') {
   toggleMessageStatus(msg._id, 'unread');
  }
  toast.success('Mail client template loaded');
 };

 // Settings Save
 const handleSaveSettings = (e) => {
  e.preventDefault();
  localStorage.setItem('stackkraft_admin_settings', JSON.stringify(settings));
  toast.success('General Settings updated!');
 };

 // Filtering messages
 const filteredMessages = messages.filter(msg => {
  const matchesSearch = msg.name.toLowerCase().includes(msgSearch.toLowerCase()) || 
             msg.email.toLowerCase().includes(msgSearch.toLowerCase()) || 
             msg.message.toLowerCase().includes(msgSearch.toLowerCase());
  const matchesFilter = msgFilter === 'all' || msg.status === msgFilter;
  return matchesSearch && matchesFilter;
 });

 if (loading) {
  return (
   <div className="min-h-screen flex items-center justify-center bg-slate-100 text-white transition-colors duration-300 text-xs uppercase tracking-widest font-bold">
    Loading Session Control...
   </div>
  );
 }

 // LOGIN SCREEN
 if (!isAuthenticated) {
  return (
   <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#050505] text-white transition-colors duration-300">
    <SEO title="Admin Login" />
    <Toaster position="top-right" toastOptions={{ style: { background: '#090d16', color: '#fff', border: '1px solid #1f2937' } }} />
    <div className="absolute top-[20%] left-[-50px] w-[350px] h-[350px] bg-red-650/10 rounded-full blur-[100px] animate-pulse" />
    <div className="absolute bottom-[20%] right-[-50px] w-[350px] h-[350px] bg-red-800/10 rounded-full blur-[100px] animate-pulse" />

    <div className="w-full max-w-sm relative z-10">
     <GlassCard className="p-8 space-y-6 border-red-500/15 shadow-2xl">
      <div className="text-center space-y-2">
       <svg className="w-10 h-10 text-red-500 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 75L50 15L85 75H15Z" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
       </svg>
       <h2 className="text-lg font-bold font-display uppercase tracking-widest text-gradient">StackKraft Portal</h2>
       <p className="text-[10px] text-slate-550 ">Security Restricted Access</p>
      </div>

      <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
       <div className="space-y-1">
        <label className="text-[10px] uppercase text-slate-600  font-bold tracking-wider">Username or Email</label>
        <input
         type="text"
         required
         value={username}
         onChange={(e) => setUsername(e.target.value)}
         className="w-full bg-white border border-neutral-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
         placeholder="admin"
        />
       </div>

       <div className="space-y-1">
        <label className="text-[10px] uppercase text-slate-600  font-bold tracking-wider">Password</label>
        <input
         type="password"
         required
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         className="w-full bg-white border border-neutral-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
         placeholder="••••••••••••"
        />
       </div>

       {loginError && (
        <div className="text-[10px] text-red-500 font-semibold flex items-center gap-1.5 pt-1">
         <ShieldAlert className="w-3.5 h-3.5 animate-bounce" />
         {loginError}
        </div>
       )}

       <button
        type="submit"
        className="w-full btn-premium py-3 text-xs uppercase tracking-wider font-bold shadow-lg shadow-red-500/20 active:scale-[0.98] cursor-pointer"
       >
        Log In
       </button>
      </form>
     </GlassCard>
    </div>
   </div>
  );
 }

 // MAIN DASHBOARD CONTROL
 return (
  <div className="min-h-screen bg-[#050505] text-white transition-colors duration-300 pt-24 pb-16">
   <SEO title="Admin Console" />
   <Toaster position="top-right" toastOptions={{ style: { background: '#090d16', color: '#fff', border: '1px solid #1f2937' } }} />
   
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative">
    
    {/* Top Header */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-950/40 border border-slate-200 rounded-2xl p-6 glassmorphism">
     <div className="flex items-center gap-3 text-left">
      <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center text-lg font-bold font-display">
       SK
      </div>
      <div>
       <h1 className="text-sm font-bold font-display uppercase tracking-wider text-gradient">StackKraft Console</h1>
       <p className="text-[10px] text-slate-550 ">Welcome, {admin.username} ({admin.email})</p>
      </div>
     </div>
     
     <button
      onClick={logout}
      className="flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all border border-red-500/20 hover:border-transparent cursor-pointer"
     >
      <LogOut className="w-3.5 h-3.5" />
      Logout Session
     </button>
    </div>

    {/* Dashboard grid panel */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
     
     {/* Left Navigation Sidebar */}
     <div className="lg:col-span-3 space-y-2">
      {[
       { id: 'analytics', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
       { id: 'projects', label: 'Portfolio Manager', icon: <FolderKanban className="w-4 h-4" /> },
       { id: 'blogs', label: 'Blog Manager', icon: <BookOpen className="w-4 h-4" /> },
       { id: 'services', label: 'Services Manager', icon: <Layers className="w-4 h-4" /> },
       { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare className="w-4 h-4" /> },
       { id: 'leads', label: 'Newsletter list', icon: <Users className="w-4 h-4" /> },
       { id: 'messages', label: 'Inquiries Inbox', icon: <Mail className="w-4 h-4" /> },
       { id: 'applications', label: 'Job Applications', icon: <Briefcase className="w-4 h-4" /> },
       { id: 'settings', label: 'Console Settings', icon: <Settings className="w-4 h-4" /> }
      ].map((tab) => (
       <button
        key={tab.id}
        onClick={() => {
         setActiveTab(tab.id);
         setEditingId(null);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all cursor-pointer ${
         activeTab === tab.id
          ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-500/10'
          : 'bg-slate-100 border-slate-200 hover:bg-slate-200 :bg-neutral-850 text-slate-700 '
        }`}
       >
        {tab.icon}
        <span>{tab.label}</span>
       </button>
      ))}
     </div>

     {/* Right Panel Content */}
     <div className="lg:col-span-9">
      
      {/* ANALYTICS TAB */}
      {activeTab === 'analytics' && (
       <div className="space-y-6">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
          { val: metrics.totalProjects, label: 'Projects', color: 'text-red-500' },
          { val: metrics.totalBlogs, label: 'Blogs', color: 'text-red-500' },
          { val: metrics.totalLeads, label: 'Subscribers', color: 'text-red-500' },
          { val: metrics.unreadMessages, label: 'Unread Mail', color: 'text-amber-400' }
         ].map((m, idx) => (
          <GlassCard key={idx} className="p-5 text-center border-red-500/5">
           <div className="text-[9px] text-slate-550  uppercase tracking-widest font-extrabold">{m.label}</div>
           <div className={`text-3xl font-extrabold mt-1 font-display ${m.color}`}>{m.val !== undefined ? m.val : '0'}</div>
          </GlassCard>
         ))}
        </div>

        {/* Animated Recharts area chart */}
        <GlassCard className="p-6 border-red-500/5 space-y-4">
         <div className="text-left">
          <h3 className="text-[10px] uppercase tracking-widest text-slate-650 font-extrabold">Inquiries & Signups Activity</h3>
         </div>
         <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
           <AreaChart data={chartData}>
            <defs>
             <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#DC2626" stopOpacity={0.25}/>
              <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
             </linearGradient>
             <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#991B1B" stopOpacity={0.25}/>
              <stop offset="95%" stopColor="#991B1B" stopOpacity={0}/>
             </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" stroke="var(--muted)" fontSize={9} />
            <YAxis stroke="var(--muted)" fontSize={9} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', fontSize: 10, color: '#fff' }} />
            <Area type="monotone" name="Newsletter Signups" dataKey="Leads" stroke="#DC2626" fillOpacity={1} fill="url(#colorLeads)" />
            <Area type="monotone" name="Contact Inquiries" dataKey="Messages" stroke="#991B1B" fillOpacity={1} fill="url(#colorMessages)" />
           </AreaChart>
          </ResponsiveContainer>
         </div>
        </GlassCard>

        {/* Recent Activity Log */}
        <GlassCard className="p-6 border-red-500/5 text-left space-y-4">
         <h3 className="text-[10px] uppercase tracking-widest text-slate-650 font-extrabold">Console Events Activity</h3>
         <div className="space-y-4">
          {[
           { event: "Admin Auth login established", time: "Just now", icon: <Check className="w-3.5 h-3.5 text-emerald-400" /> },
           { event: `Loaded ${metrics.totalLeads || 0} active email subscribers`, time: "Synchronised", icon: <Check className="w-3.5 h-3.5 text-red-500" /> },
           { event: `Loaded ${metrics.totalProjects || 0} items from Project database`, time: "Synchronised", icon: <Check className="w-3.5 h-3.5 text-red-500" /> }
          ].map((act, index) => (
           <div key={index} className="flex items-center justify-between text-xs border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
             {act.icon}
             <span className="text-slate-700 font-sans font-light">{act.event}</span>
            </div>
            <span className="text-[10px] text-slate-550 ">{act.time}</span>
           </div>
          ))}
         </div>
        </GlassCard>
       </div>
      )}

      {/* PORTFOLIO MANAGER */}
      {activeTab === 'projects' && (
       <div className="space-y-8 text-left">
        {/* Create/Edit Form */}
        <GlassCard className="p-6 border-red-500/10 space-y-4">
         <h3 className="text-xs font-bold text-white uppercase tracking-widest">
          {editingId ? 'Edit Project Config' : 'Create New Portfolio Project'}
         </h3>
         <form onSubmit={handleProjectSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Project Name</label>
            <input
             type="text"
             placeholder="e.g. HealthSync"
             required
             value={projectForm.title}
             onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
            />
           </div>
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Tech Stack (comma separated)</label>
            <input
             type="text"
             placeholder="e.g. React, MongoDB, Express"
             required
             value={projectForm.techStack}
             onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
            />
           </div>
          </div>
          
          <div className="space-y-1">
           <label className="text-[10px] text-slate-400 uppercase font-bold">Short Description</label>
           <textarea
            placeholder="Overview of scope and deliverables"
            required
            rows="2"
            value={projectForm.description}
            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
            className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
           />
          </div>

          <div className="space-y-1">
           <label className="text-[10px] text-slate-400 uppercase font-bold">Key Deliverables / Features (one per line)</label>
           <textarea
            placeholder="Realtime dashboard views&#10;Stripe integrated gateways"
            rows="3"
            value={projectForm.features}
            onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
            className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
           />
          </div>

          {/* Image Uploader widget */}
          <div className="space-y-1">
           <label className="text-[10px] text-slate-400 uppercase font-bold">Project Screen Preview (Cloudinary)</label>
           <ImageUploader 
            token={token} 
            currentUrl={projectForm.imageUrl} 
            onUploadSuccess={(url) => setProjectForm({ ...projectForm, imageUrl: url })} 
            folder="stackkraft/portfolio"
           />
          </div>

          <div className="grid grid-cols-2 gap-4">
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Filter Category</label>
            <select
             value={projectForm.category}
             onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
            >
             <option>Business</option>
             <option>Healthcare</option>
             <option>Dashboard</option>
             <option>Ecommerce</option>
             <option>Portfolio</option>
            </select>
           </div>
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Sort Order ID</label>
            <input
             type="number"
             placeholder="0"
             value={projectForm.order}
             onChange={(e) => setProjectForm({ ...projectForm, order: parseInt(e.target.value) })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
            />
           </div>
          </div>

          <div className="flex gap-2 pt-2">
           <button type="submit" className="bg-red-600 hover:bg-red-500 text-white font-bold px-5 py-2.5 rounded-lg cursor-pointer">
            {editingId ? 'Update Config' : 'Save & Publish'}
           </button>
           {editingId && (
            <button 
             type="button" 
             onClick={() => {
              setEditingId(null);
              setProjectForm({ title: '', description: '', techStack: '', features: '', category: 'Business', order: 0, imageUrl: '' });
             }}
             className="bg-neutral-800 hover:bg-neutral-850 text-slate-650 px-4 py-2.5 rounded-lg cursor-pointer"
            >
             Cancel
            </button>
           )}
          </div>
         </form>
        </GlassCard>

        {/* Portfolio List */}
        <div className="overflow-x-auto rounded-xl border border-red-950/20 glassmorphism">
         <table className="w-full text-left text-xs border-collapse">
          <thead>
           <tr className="border-b border-red-950/20 bg-slate-100 text-slate-600 font-bold uppercase tracking-wide">
            <th className="p-3">Preview</th>
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Tech</th>
            <th className="p-3">Actions</th>
           </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-600 ">
           {projects.map((p) => (
            <tr key={p._id} className="hover:bg-slate-100/80 :bg-red-950/5">
             <td className="p-3">
              <div className="w-12 h-8 rounded border border-neutral-800 overflow-hidden bg-neutral-900">
               {p.imageUrl && <img src={p.imageUrl} alt="preview" className="w-full h-full object-cover" />}
              </div>
             </td>
             <td className="p-3 font-semibold text-white">{p.title}</td>
             <td className="p-3">{p.category || 'Business'}</td>
             <td className="p-3 truncate max-w-[150px]">{p.techStack?.join(', ')}</td>
             <td className="p-3 flex items-center gap-2 mt-1">
              <button
               onClick={() => {
                setEditingId(p._id);
                setProjectForm({
                 title: p.title,
                 description: p.description,
                 techStack: p.techStack?.join(', ') || '',
                 features: p.features?.join('\n') || '',
                 category: p.category || 'Business',
                 order: p.order || 0,
                 imageUrl: p.imageUrl || ''
                });
               }}
               className="p-1.5 text-red-500 hover:text-red-400 cursor-pointer"
               title="Edit config"
              >
               <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteItem('projects', p._id)} className="p-1.5 text-red-400 hover:text-red-300 cursor-pointer" title="Remove project">
               <Trash2 className="w-4 h-4" />
              </button>
             </td>
            </tr>
           ))}
          </tbody>
         </table>
        </div>
       </div>
      )}

      {/* BLOG MANAGER */}
      {activeTab === 'blogs' && (
       <div className="space-y-8 text-left">
        
        {/* Form Controls */}
        <GlassCard className="p-6 border-red-500/10 space-y-4">
         <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest">
           {editingId ? 'Edit Article details' : 'Draft New Article'}
          </h3>
          <button
           type="button"
           onClick={() => setBlogPreviewMode(!blogPreviewMode)}
           className="bg-neutral-900 border border-neutral-850 hover:border-neutral-750 px-3 py-1.5 rounded-lg text-[9px] uppercase tracking-wider font-bold text-slate-400 hover:text-white cursor-pointer"
          >
           {blogPreviewMode ? 'Editor View' : 'Live Preview'}
          </button>
         </div>

         {!blogPreviewMode ? (
          <form onSubmit={handleBlogSubmit} className="space-y-4 text-xs">
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Article Title</label>
            <input
             type="text"
             placeholder="e.g. Building Web Apps with React 19"
             required
             value={blogForm.title}
             onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
            />
           </div>
           
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">SEO summary / Meta Introduction</label>
            <textarea
             placeholder="Brief 1-line description of the post"
             required
             rows="2"
             value={blogForm.summary}
             onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
            />
           </div>

           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Article Content markup (Markdown/HTML supported)</label>
            <textarea
             placeholder="Article content body text goes here..."
             required
             rows="8"
             value={blogForm.content}
             onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20 font-mono leading-relaxed"
            />
           </div>

           {/* Image Upload for blog */}
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Cover image (Cloudinary)</label>
            <ImageUploader 
             token={token} 
             currentUrl={blogForm.imageUrl} 
             onUploadSuccess={(url) => setBlogForm({ ...blogForm, imageUrl: url })} 
             folder="stackkraft/blogs"
            />
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
             <label className="text-[10px] text-slate-400 uppercase font-bold">Category</label>
             <select
              value={blogForm.category}
              onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
              className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
             >
              <option>Web Development</option>
              <option>React</option>
              <option>JavaScript</option>
              <option>Technology</option>
              <option>Business</option>
             </select>
            </div>
            <div className="space-y-1">
             <label className="text-[10px] text-slate-400 uppercase font-bold">Tags (separated by comma)</label>
             <input
              type="text"
              placeholder="e.g. react19, frontend"
              value={blogForm.tags}
              onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
              className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
             />
            </div>
            <div className="space-y-1">
             <label className="text-[10px] text-slate-400 uppercase font-bold">Publication Status</label>
             <select
              value={blogForm.status}
              onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
              className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
             >
              <option value="published">Published</option>
              <option value="draft">Draft / Private</option>
             </select>
            </div>
           </div>

           <div className="flex gap-2 pt-2">
            <button type="submit" className="bg-red-650 bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2.5 rounded-lg cursor-pointer">
             {editingId ? 'Update details' : 'Publish Article'}
            </button>
            {editingId && (
             <button 
              type="button" 
              onClick={() => {
               setEditingId(null);
               setBlogForm({ title: '', summary: '', content: '', category: 'Web Development', tags: '', readTime: '3 min read', status: 'published', imageUrl: '' });
              }}
              className="bg-neutral-800 hover:bg-neutral-850 text-slate-650 px-4 py-2.5 rounded-lg cursor-pointer"
             >
              Cancel
             </button>
            )}
           </div>
          </form>
         ) : (
          /* Live Preview Mode */
          <div className="space-y-4 bg-neutral-950 p-6 rounded-xl border border-neutral-850 max-h-[500px] overflow-y-auto">
           <div className="inline-block text-[9px] uppercase tracking-widest bg-red-600/10 text-red-500 border border-red-500/10 px-3 py-0.5 rounded-full font-bold">
            {blogForm.category}
           </div>
           <h1 className="text-xl sm:text-2xl font-bold text-white font-display leading-tight">{blogForm.title || 'Untitled Article'}</h1>
           <p className="text-xs sm:text-sm text-slate-400 font-light italic border-l-2 border-red-500 pl-3 py-1">
            {blogForm.summary || 'Provide a summary to display metadata descriptions...'}
           </p>
           {blogForm.imageUrl && (
            <div className="w-full h-48 rounded-xl overflow-hidden border border-neutral-900 my-4">
             <img src={blogForm.imageUrl} alt="Cover" className="w-full h-full object-cover" />
            </div>
           )}
           <div className="text-slate-700 font-sans font-light text-xs sm:text-sm space-y-4 pt-2 border-t border-neutral-900 whitespace-pre-wrap leading-relaxed">
            {blogForm.content || 'Start entering contents to render splitscreen live preview...'}
           </div>
          </div>
         )}
        </GlassCard>

        {/* Articles list */}
        <div className="overflow-x-auto rounded-xl border border-red-950/20 glassmorphism">
         <table className="w-full text-left text-xs border-collapse">
          <thead>
           <tr className="border-b border-red-950/20 bg-slate-100 text-slate-600 font-bold uppercase tracking-wide">
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
           </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-600 ">
           {blogs.map((b) => (
            <tr key={b._id} className="hover:bg-slate-100/80 :bg-red-950/5">
             <td className="p-3 font-semibold text-white">{b.title}</td>
             <td className="p-3">{b.category}</td>
             <td className="p-3">
              <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded font-bold ${
               b.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' : 'bg-neutral-800 text-slate-550 '
              }`}>
               {b.status}
              </span>
             </td>
             <td className="p-3 flex items-center gap-2 mt-1">
              <button
               onClick={() => {
                setEditingId(b._id);
                setBlogForm({
                 title: b.title,
                 summary: b.summary,
                 content: b.content,
                 category: b.category,
                 tags: b.tags?.join(', ') || '',
                 readTime: b.readTime || '3 min read',
                 status: b.status || 'published',
                 imageUrl: b.imageUrl || ''
                });
               }}
               className="p-1.5 text-red-500 hover:text-red-400 cursor-pointer"
              >
               <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteItem('blogs', b._id)} className="p-1.5 text-red-400 hover:text-red-300 cursor-pointer">
               <Trash2 className="w-4 h-4" />
              </button>
             </td>
            </tr>
           ))}
          </tbody>
         </table>
        </div>
       </div>
      )}

      {/* SERVICES MANAGER */}
      {activeTab === 'services' && (
       <div className="space-y-8 text-left">
        <GlassCard className="p-6 border-red-500/10 space-y-4">
         <h3 className="text-xs font-bold text-white uppercase tracking-widest">
          {editingId ? 'Edit Service Details' : 'Add New Agency Service'}
         </h3>
         <form onSubmit={handleServiceSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Service Title</label>
            <input
             type="text"
             placeholder="e.g. React Development"
             required
             value={serviceForm.title}
             onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
            />
           </div>
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Pricing Label</label>
            <input
             type="text"
             placeholder="Starting at ₹15,000"
             required
             value={serviceForm.pricing}
             onChange={(e) => setServiceForm({ ...serviceForm, pricing: e.target.value })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
            />
           </div>
          </div>
          
          <div className="space-y-1">
           <label className="text-[10px] text-slate-400 uppercase font-bold">Service Description</label>
           <textarea
            placeholder="Comprehensive summary of features and deliverables"
            required
            rows="2"
            value={serviceForm.description}
            onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
            className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
           />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Benefits (separated by comma)</label>
            <input
             type="text"
             placeholder="e.g. Fast Loading, SEO Optimized"
             value={serviceForm.benefits}
             onChange={(e) => setServiceForm({ ...serviceForm, benefits: e.target.value })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
            />
           </div>
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Technologies (separated by comma)</label>
            <input
             type="text"
             placeholder="e.g. React 19, Tailwind"
             value={serviceForm.technologies}
             onChange={(e) => setServiceForm({ ...serviceForm, technologies: e.target.value })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
            />
           </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Lucide Icon Name</label>
            <input
             type="text"
             placeholder="e.g. Globe, Sliders, Smartphone"
             value={serviceForm.iconName}
             onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
            />
           </div>
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Sort Order</label>
            <input
             type="number"
             placeholder="0"
             value={serviceForm.order}
             onChange={(e) => setServiceForm({ ...serviceForm, order: parseInt(e.target.value) })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
            />
           </div>
          </div>

          <div className="flex gap-2 pt-2">
           <button type="submit" className="bg-red-655 bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2.5 rounded-lg cursor-pointer">
            {editingId ? 'Update Service' : 'Save Service'}
           </button>
          </div>
         </form>
        </GlassCard>

        <div className="overflow-x-auto rounded-xl border border-red-950/20 glassmorphism">
         <table className="w-full text-left text-xs border-collapse">
          <thead>
           <tr className="border-b border-red-950/20 bg-slate-100 text-slate-600 font-bold uppercase tracking-wide">
            <th className="p-3">Title</th>
            <th className="p-3">Pricing</th>
            <th className="p-3">Icon</th>
            <th className="p-3">Actions</th>
           </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-650 ">
           {services.map((s) => (
            <tr key={s._id} className="hover:bg-slate-100/80 :bg-red-950/5">
             <td className="p-3 font-semibold text-white">{s.title}</td>
             <td className="p-3">{s.pricing}</td>
             <td className="p-3">{s.iconName}</td>
             <td className="p-3 flex items-center gap-2">
              <button
               onClick={() => {
                setEditingId(s._id);
                setServiceForm({
                 title: s.title,
                 description: s.description,
                 benefits: s.benefits?.join(', ') || '',
                 technologies: s.technologies?.join(', ') || '',
                 pricing: s.pricing,
                 iconName: s.iconName || 'Globe',
                 order: s.order || 0
                });
               }}
               className="p-1.5 text-red-500 hover:text-red-400 cursor-pointer"
              >
               <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteItem('services', s._id)} className="p-1.5 text-red-400 hover:text-red-300 cursor-pointer">
               <Trash2 className="w-4 h-4" />
              </button>
             </td>
            </tr>
           ))}
          </tbody>
         </table>
        </div>
       </div>
      )}

      {/* TESTIMONIALS */}
      {activeTab === 'testimonials' && (
       <div className="space-y-8 text-left">
        <GlassCard className="p-6 border-red-500/10 space-y-4">
         <h3 className="text-xs font-bold text-white uppercase tracking-widest">
          {editingId ? 'Edit Review Details' : 'Add New Client Review'}
         </h3>
         <form onSubmit={handleTestimonialSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Client Name</label>
            <input
             type="text"
             placeholder="e.g. Sridhar"
             required
             value={testimonialForm.clientName}
             onChange={(e) => setTestimonialForm({ ...testimonialForm, clientName: e.target.value })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
            />
           </div>
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Role</label>
            <input
             type="text"
             placeholder="e.g. CTO"
             value={testimonialForm.role}
             onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
            />
           </div>
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Company Name</label>
            <input
             type="text"
             placeholder="e.g. FinTech Ltd"
             value={testimonialForm.company}
             onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
            />
           </div>
          </div>
          
          <div className="space-y-1">
           <label className="text-[10px] text-slate-400 uppercase font-bold">Review Comment</label>
           <textarea
            placeholder="Feedback regarding the agency outputs..."
            required
            rows="2"
            value={testimonialForm.comment}
            onChange={(e) => setTestimonialForm({ ...testimonialForm, comment: e.target.value })}
            className="w-full bg-neutral-900 border border-neutral-855 rounded-lg px-3 py-2 text-white"
           />
          </div>

          {/* Testimonial avatar uploader */}
          <div className="space-y-1">
           <label className="text-[10px] text-slate-400 uppercase font-bold">Client Avatar (Cloudinary)</label>
           <ImageUploader 
            token={token} 
            currentUrl={testimonialForm.avatarUrl} 
            onUploadSuccess={(url) => setTestimonialForm({ ...testimonialForm, avatarUrl: url })} 
            folder="stackkraft/avatars"
           />
          </div>

          <div className="grid grid-cols-2 gap-4">
           <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Rating Star (1-5)</label>
            <input
             type="number"
             required
             min="1"
             max="5"
             value={testimonialForm.rating}
             onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
             className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
            />
           </div>
           <div className="flex items-center gap-2 pt-4">
            <input
             type="checkbox"
             id="isFeatured"
             checked={testimonialForm.isFeatured}
             onChange={(e) => setTestimonialForm({ ...testimonialForm, isFeatured: e.target.checked })}
             className="w-4 h-4 accent-red-600 rounded bg-neutral-900 border-neutral-850"
            />
            <label htmlFor="isFeatured" className="text-slate-600 font-bold uppercase tracking-widest text-[9px]">Featured on Home</label>
           </div>
          </div>

          <div className="flex gap-2 pt-2">
           <button type="submit" className="bg-red-650 bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2.5 rounded-lg cursor-pointer">
            {editingId ? 'Update Review' : 'Save & Publish'}
           </button>
          </div>
         </form>
        </GlassCard>

        <div className="overflow-x-auto rounded-xl border border-red-950/20 glassmorphism">
         <table className="w-full text-left text-xs border-collapse">
          <thead>
           <tr className="border-b border-red-950/20 bg-slate-100 text-slate-600 font-bold uppercase tracking-wide">
            <th className="p-3">Avatar</th>
            <th className="p-3">Client</th>
            <th className="p-3">Rating</th>
            <th className="p-3">Featured</th>
            <th className="p-3">Actions</th>
           </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-650 ">
           {testimonials.map((t) => (
            <tr key={t._id} className="hover:bg-slate-100/80 :bg-red-950/5">
             <td className="p-3">
              <div className="w-8 h-8 rounded-full border border-neutral-800 overflow-hidden bg-neutral-900">
               {t.avatarUrl && <img src={t.avatarUrl} alt="avatar" className="w-full h-full object-cover" />}
              </div>
             </td>
             <td className="p-3">
              <div className="font-semibold text-white">{t.clientName}</div>
              <div className="text-[10px] text-slate-550 ">{t.role} at {t.company || 'N/A'}</div>
             </td>
             <td className="p-3">{t.rating} / 5</td>
             <td className="p-3">{t.isFeatured ? 'Yes' : 'No'}</td>
             <td className="p-3 flex items-center gap-2 mt-1">
              <button
               onClick={() => {
                setEditingId(t._id);
                setTestimonialForm({
                 clientName: t.clientName,
                 role: t.role || '',
                 company: t.company || '',
                 comment: t.comment,
                 rating: t.rating || 5,
                 isFeatured: t.isFeatured ?? true,
                 avatarUrl: t.avatarUrl || ''
                });
               }}
               className="p-1.5 text-red-500 hover:text-red-400 cursor-pointer"
              >
               <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteItem('testimonials', t._id)} className="p-1.5 text-red-400 hover:text-red-300 cursor-pointer">
               <Trash2 className="w-4 h-4" />
              </button>
             </td>
            </tr>
           ))}
          </tbody>
         </table>
        </div>
       </div>
      )}

      {/* SUBSCRIBERS LIST */}
      {activeTab === 'leads' && (
       <div className="space-y-4 text-left">
        <div className="flex items-center justify-between">
         <h3 className="text-xs uppercase tracking-widest text-slate-400 font-extrabold">Active Newsletter Subscribers</h3>
         <button
          onClick={exportSubscribersCSV}
          className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 text-slate-450 hover:text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all cursor-pointer"
         >
          <Download className="w-3.5 h-3.5" />
          Export CSV
         </button>
        </div>
        <div className="overflow-x-auto rounded-xl border border-red-950/20 glassmorphism">
         <table className="w-full text-left text-xs border-collapse">
          <thead>
           <tr className="border-b border-red-950/20 bg-slate-100 text-slate-600 font-bold uppercase tracking-wide">
            <th className="p-3">Email Address</th>
            <th className="p-3">Source Channel</th>
            <th className="p-3">Subscribed Date</th>
            <th className="p-3">Actions</th>
           </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-600 ">
           {leads.map((l) => (
            <tr key={l._id} className="hover:bg-slate-100/80 :bg-red-950/5">
             <td className="p-3 font-semibold text-white">{l.email}</td>
             <td className="p-3 capitalize">{l.source}</td>
             <td className="p-3">{new Date(l.createdAt).toLocaleDateString()}</td>
             <td className="p-3">
              <button onClick={() => deleteItem('leads', l._id)} className="p-1.5 text-red-400 hover:text-red-300 cursor-pointer">
               <Trash2 className="w-4 h-4" />
              </button>
             </td>
            </tr>
           ))}
          </tbody>
         </table>
        </div>
       </div>
      )}

      {/* INQUIRIES INBOX */}
      {activeTab === 'messages' && (
       <div className="space-y-4 text-left">
        {/* Search & Filter headers */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-neutral-950/40 p-4 rounded-xl border border-neutral-900">
         <input
          type="text"
          placeholder="Search messages name, email, query..."
          value={msgSearch}
          onChange={(e) => setMsgSearch(e.target.value)}
          className="w-full sm:flex-1 bg-neutral-900 border border-neutral-850 rounded-lg px-3 py-2 text-xs text-white"
         />
         <select
          value={msgFilter}
          onChange={(e) => setMsgFilter(e.target.value)}
          className="w-full sm:w-40 bg-neutral-900 border border-neutral-850 rounded-lg px-3 py-2 text-xs text-white"
         >
          <option value="all">All Inquiries</option>
          <option value="unread">Unread Only</option>
          <option value="read">Read Only</option>
         </select>
        </div>

        {filteredMessages.map((msg) => (
         <GlassCard key={msg._id} className={`p-5 text-xs border ${msg.status === 'unread' ? 'border-red-500/30 bg-red-950/5' : 'border-neutral-850'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-3 mb-3">
           <div>
            <div className="flex items-center gap-2">
             <h4 className="font-bold text-white text-sm">{msg.name}</h4>
             <span className={`text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold ${
              msg.status === 'unread' ? 'bg-red-500/20 text-red-500 border border-red-500/20 animate-pulse' : 'bg-neutral-800 text-slate-400'
             }`}>
              {msg.status}
             </span>
            </div>
            <p className="text-[10px] text-slate-550  mt-1">
             Email: {msg.email} | Phone: {msg.phone || 'N/A'}
            </p>
           </div>
           <div className="flex items-center gap-2">
            <button
             onClick={() => toggleMessageStatus(msg._id, msg.status)}
             className="flex items-center gap-1 bg-neutral-900 border border-neutral-855 hover:bg-neutral-800 px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase cursor-pointer"
            >
             {msg.status === 'unread' ? <Eye className="w-3.5 h-3.5 text-red-500" /> : <EyeOff className="w-3.5 h-3.5 text-slate-450" />}
             {msg.status === 'unread' ? 'Mark Read' : 'Mark Unread'}
            </button>
            <button
             onClick={() => handleReplyMailto(msg)}
             className="flex items-center gap-1 bg-red-650/10 hover:bg-red-650 text-red-400 hover:text-white px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase cursor-pointer"
            >
             <Send className="w-3.5 h-3.5" />
             Reply Mail
            </button>
            <button 
             onClick={() => deleteItem('contact', msg._id)} 
             className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
             <Trash2 className="w-3.5 h-3.5" />
            </button>
           </div>
          </div>
          
          <div className="space-y-2">
           <div>
            <span className="text-[9px] text-slate-550  uppercase tracking-widest font-bold block">Service Requested</span>
            <span className="font-semibold text-red-400 capitalize">{msg.serviceRequired.replace(/-/g, ' ')}</span>
           </div>
           <div>
            <span className="text-[9px] text-slate-550  uppercase tracking-widest font-bold block">Message</span>
            <p className="text-slate-650 leading-relaxed font-light bg-neutral-950 p-3 rounded-lg mt-1 whitespace-pre-wrap">{msg.message}</p>
           </div>
          </div>
         </GlassCard>
        ))}
       </div>
      )}

      {/* JOB APPLICATIONS */}
      {activeTab === 'applications' && (
       <div className="overflow-x-auto rounded-xl border border-red-950/20 glassmorphism text-left">
        <table className="w-full text-left text-xs border-collapse">
         <thead>
          <tr className="border-b border-red-950/20 bg-slate-100 text-slate-600 font-bold uppercase tracking-wide">
           <th className="p-3">Applicant</th>
           <th className="p-3">Role</th>
           <th className="p-3">Resume</th>
           <th className="p-3">Status</th>
           <th className="p-3">Actions</th>
          </tr>
         </thead>
         <tbody className="divide-y divide-slate-200 text-slate-300">
          {applications.map((app) => (
           <tr key={app._id} className="hover:bg-slate-100/80 :bg-red-950/5">
            <td className="p-3">
             <div className="font-semibold text-white">{app.fullName}</div>
             <div className="text-[10px] text-slate-550 ">{app.email} | {app.phone}</div>
            </td>
            <td className="p-3 font-medium text-red-500">{app.jobTitle}</td>
            <td className="p-3">
             <a
              href={`${API_URL.replace('/api', '')}${app.resumePath}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-red-500 hover:text-red-400 underline flex items-center gap-1 font-bold"
             >
              <Eye className="w-3.5 h-3.5" />
              Download
             </a>
            </td>
            <td className="p-3">
             <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
              app.status === 'pending' ? 'bg-amber-500/20 text-amber-400' : 
              app.status === 'shortlisted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-900 text-slate-550'
             }`}>
              {app.status}
             </span>
            </td>
            <td className="p-3 flex gap-2">
             <button
              onClick={() => updateCandidateStatus(app._id, 'shortlisted')}
              className="bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
              title="Shortlist Candidate"
             >
              <Check className="w-3.5 h-3.5" />
             </button>
             <button
              onClick={() => updateCandidateStatus(app._id, 'rejected')}
              className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
              title="Reject Candidate"
             >
              <X className="w-3.5 h-3.5" />
             </button>
             <button 
              onClick={() => deleteItem('careers/applications', app._id)} 
              className="p-1 text-slate-450 hover:text-slate-250 cursor-pointer"
             >
              <Trash2 className="w-3.5 h-3.5" />
             </button>
            </td>
           </tr>
          ))}
         </tbody>
        </table>
       </div>
      )}

      {/* CONSOLE SETTINGS MANAGER */}
      {activeTab === 'settings' && (
       <div className="space-y-6 text-left">
        <GlassCard className="p-6 border-red-500/10 space-y-6">
         <h3 className="text-xs font-bold text-white uppercase tracking-widest">
          General Settings Configuration
         </h3>
         
         <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
          {/* General section */}
          <div className="space-y-4">
           <h4 className="text-[10px] text-red-550 font-bold uppercase tracking-widest border-b border-neutral-900 pb-1">
            General Settings
           </h4>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
             <label className="text-[10px] text-slate-600 font-bold uppercase">Company Name</label>
             <input
              type="text"
              value={settings.companyName}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              className="w-full bg-white border border-neutral-850 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-red-500/20"
             />
            </div>
            <div className="space-y-1">
             <label className="text-[10px] text-slate-600 font-bold uppercase">Google Analytics ID</label>
             <input
              type="text"
              value={settings.analyticsId}
              onChange={(e) => setSettings({ ...settings, analyticsId: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-855 rounded-lg px-3 py-2 text-white"
             />
            </div>
           </div>
          </div>

          {/* SEO Settings */}
          <div className="space-y-4">
           <h4 className="text-[10px] text-red-550 font-bold uppercase tracking-widest border-b border-neutral-900 pb-1">
            SEO Metadata Settings
           </h4>
           <div className="space-y-4">
            <div className="space-y-1">
             <label className="text-[10px] text-slate-600 font-bold uppercase">Default Page Title</label>
             <input
              type="text"
              value={settings.metaTitle}
              onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-855 rounded-lg px-3 py-2 text-white"
             />
            </div>
            <div className="space-y-1">
             <label className="text-[10px] text-slate-600 font-bold uppercase">Default Meta Description</label>
             <textarea
              value={settings.metaDescription}
              onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
              rows="2"
              className="w-full bg-neutral-900 border border-neutral-855 rounded-lg px-3 py-2 text-white"
             />
            </div>
           </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
           <h4 className="text-[10px] text-red-550 font-bold uppercase tracking-widest border-b border-neutral-900 pb-1">
            Contact Details
           </h4>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
             <label className="text-[10px] text-slate-600 font-bold uppercase">Email Address</label>
             <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-855 rounded-lg px-3 py-2 text-white"
             />
            </div>
            <div className="space-y-1">
             <label className="text-[10px] text-slate-600 font-bold uppercase">Phone Line</label>
             <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-855 rounded-lg px-3 py-2 text-white"
             />
            </div>
            <div className="space-y-1">
             <label className="text-[10px] text-slate-600 font-bold uppercase">Physical Location</label>
             <input
              type="text"
              value={settings.location}
              onChange={(e) => setSettings({ ...settings, location: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-855 rounded-lg px-3 py-2 text-white"
             />
            </div>
           </div>
          </div>

          {/* Social links */}
          <div className="space-y-4">
           <h4 className="text-[10px] text-red-550 font-bold uppercase tracking-widest border-b border-neutral-900 pb-1">
            Social Networks Integrations
           </h4>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
             <label className="text-[10px] text-slate-600 font-bold uppercase">GitHub Profile URL</label>
             <input
              type="text"
              value={settings.github}
              onChange={(e) => setSettings({ ...settings, github: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-855 rounded-lg px-3 py-2 text-white"
             />
            </div>
            <div className="space-y-1">
             <label className="text-[10px] text-slate-600 font-bold uppercase">LinkedIn URL</label>
             <input
              type="text"
              value={settings.linkedin}
              onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-855 rounded-lg px-3 py-2 text-white"
             />
            </div>
            <div className="space-y-1">
             <label className="text-[10px] text-slate-600 font-bold uppercase">Instagram URL</label>
             <input
              type="text"
              value={settings.instagram}
              onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-855 rounded-lg px-3 py-2 text-white"
             />
            </div>
            <div className="space-y-1">
             <label className="text-[10px] text-slate-600 font-bold uppercase">WhatsApp Number (e.g. 919342913781)</label>
             <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-855 rounded-lg px-3 py-2 text-white"
             />
            </div>
           </div>
          </div>

          <button 
           type="submit" 
           className="bg-red-650 bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2.5 rounded-lg cursor-pointer text-xs uppercase tracking-widest active:scale-[0.98]"
          >
           Save Configuration
          </button>
         </form>
        </GlassCard>
       </div>
      )}

     </div>
    </div>

   </div>
  </div>
 );
};

export default AdminDashboard;
