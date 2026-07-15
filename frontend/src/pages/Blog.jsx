import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, User, Clock, ChevronRight, CornerDownLeft, Sparkles, BookOpen, X } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SEO from '../components/SEO';
import { API_URL } from '../context/AuthContext';
import { getBreadcrumbSchema } from '../utils/schemaHelper';

const Blog = () => {
 const [blogs, setBlogs] = useState([]);
 const [loading, setLoading] = useState(true);
 const [searchQuery, setSearchQuery] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('All');
 const [selectedPost, setSelectedPost] = useState(null);

 const fallbackBlogs = [
  {
   _id: "bl-1",
   title: "Building High-Fidelity Glassmorphism Interfaces with Tailwind v4",
   slug: "building-glassmorphic-interfaces-tailwind-v4",
   summary: "Understand the modern CSS-first custom properties of Tailwind v4 to code beautiful, translucent backdrops with hardware-accelerated filters.",
   content: `### Introduction to Tailwind v4

Tailwind CSS v4 is a complete re-write that shifts utility compiling from JS configurations to pure native CSS imports. This architectural shift significantly improves build times and simplifies custom theme setup.

### The Design of Glassmorphism

Glassmorphism relies on layered transparency, background blur filters, and light-reflecting borders. Here is the structural breakdown:
1. **Background**: Low-opacity fill (e.g., \`rgba(13, 13, 13, 0.7)\` for dark mode).
2. **Backdrop Filter**: Apply a heavy blur (\`backdrop-blur-xl\` or \`20px\`) to diffract light behind the container.
3. **Borders**: Extremely slim, low-opacity red/white outline simulating light reflection.

### Coding a Glass Card in Tailwind v4

Using Tailwind CSS v4, we can define custom theme variables directly in our CSS entry file:

\`\`\`css
@theme {
 --color-glass: rgba(13, 13, 13, 0.7);
 --color-glass-border: rgba(220, 38, 38, 0.08);
}
\`\`\`

Then we render it in our React markup:
\`\`\`html
<div className="bg-glass border border-glass-border backdrop-blur-lg rounded-2xl p-6">
 <h3 className="text-white">Futuristic UI Element</h3>
</div>
\`\`\`

### Summary
This approach reduces design bloat and leverages native browser GPU rendering for ultra-smooth scrolls and page transitions.`,
   category: "Web Development",
   tags: ["Tailwind", "CSS", "UIUX"],
   readTime: "4 min read",
   author: "StackKraft Editor",
   createdAt: new Date().toISOString()
  },
  {
   _id: "bl-2",
   title: "Why React 19 is a Game-Changer for Frontend Engineers",
   slug: "why-react-19-is-game-changer",
   summary: "Explore the new compiler setups, Server Components support, and native hooks like useActionState introduced in React 19.",
   content: `### Understanding React Compiler

React 19 introduces the automated Compiler (React Forget), which automatically memoizes component trees under the hood. Developers no longer need to sprinkle \`useMemo\` and \`useCallback\` everywhere to prevent unnecessary re-renders.

### Key New Hooks

1. **useActionState**: Simplifies async form handling, managing pending statuses and validation errors in a unified state.
2. **use**: A new API to resolve Promises or read Context resources dynamically inside loops or conditional blocks.

### Performance Gains
By automating memoization, React 19 cuts render cycles by up to 40% in large component structures, making the UI feel incredibly snappy.`,
   category: "React",
   tags: ["React 19", "Hooks", "JavaScript"],
   readTime: "5 min read",
   author: "StackKraft Editor",
   createdAt: new Date().toISOString()
  },
  {
   _id: "bl-3",
   title: "Mastering Asynchronous Operations in Node.js & Express",
   slug: "mastering-async-operations-node-express",
   summary: "Avoid memory leaks and unhandled promise rejections by structuring Express middleware using modern async-await wrappers.",
   content: `### The Event Loop Dilemma
Express does not natively handle promise errors inside async route controllers. If an error is thrown, the server might hang or crash.

### Writing a Clean Wrapper
We can avoid repetitive try-catch blocks using a utility wrapper:
\`\`\`javascript
const asyncHandler = fn => (req, res, next) => {
 Promise.resolve(fn(req, res, next)).catch(next);
};
\`\`\`
This ensures any rejected promise is sent directly to the Express global error handler.`,
   category: "JavaScript",
   tags: ["NodeJS", "Express", "Backend"],
   readTime: "3 min read",
   author: "StackKraft Editor",
   createdAt: new Date().toISOString()
  },
  {
   _id: "bl-4",
   title: "Local SEO: Ranking Your Software Startup Organically",
   slug: "local-seo-ranking-software-startup",
   summary: "A blueprint to rank web properties on Google Maps and search queries targeting regional keywords.",
   content: `### The Power of Local Keywords
Many small businesses search for regional partners. Ranking for local client keywords drives high-quality leads.

### Key Checklist
1. **Semantic HTML**: Use clean heading structures (\`<h1>\`, \`<h2>\`).
2. **Metadata**: Inject location-specific target keywords in page description metatags.
3. **Sitemap**: Set up Google Search Console with sitemaps and robots files.`,
   category: "Business",
   tags: ["SEO", "Marketing", "Business"],
   readTime: "4 min read",
   author: "StackKraft Editor",
   createdAt: new Date().toISOString()
  }
 ];

 useEffect(() => {
  const fetchBlogs = async () => {
   try {
    const res = await axios.get(`${API_URL}/blogs?all=false`);
    if (res.data && res.data.length > 0) {
     setBlogs(res.data);
    } else {
     setBlogs(fallbackBlogs);
     seedBackendBlogs();
    }
   } catch (err) {
    console.error("Failed to load blog posts, using fallback:", err);
    setBlogs(fallbackBlogs);
   } finally {
    setLoading(false);
   }
  };

  const seedBackendBlogs = async () => {
   try {
    for (const b of fallbackBlogs) {
     const item = { ...b };
     delete item._id;
     await axios.post(`${API_URL}/blogs`, item);
    }
   } catch (e) {
    // Quiet catch
   }
  };

  fetchBlogs();
 }, []);

 const categories = ['All', 'Web Development', 'React', 'JavaScript', 'Technology', 'Business'];

 const filteredBlogs = blogs.filter((blog) => {
  const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesCat = selectedCategory === 'All' || blog.category === selectedCategory;
  return matchesSearch && matchesCat;
 });

 return (
  <div className="relative overflow-hidden min-h-screen py-24 text-white">
   <SEO 
    title="Digital Insights Blog"
    description="Read the latest articles on React.js, Tailwind v4, Node.js REST APIs, and Local SEO from StackKraft."
    url="/blog"
    schema={getBreadcrumbSchema([{ name: 'Blog', path: '/blog' }])}
   />

   {/* Decorative Blur */}
   <div className="glow-orb w-[300px] h-[300px] bg-red-600/5 top-[15%] left-[-50px] animate-pulse-glow" />
   <div className="glow-orb w-[300px] h-[300px] bg-red-800/5 bottom-[15%] right-[-50px] animate-pulse-glow" />

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
    
    {/* Header */}
    <div className="text-center space-y-4 max-w-3xl mx-auto">
     <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-semibold text-red-400">
      Blog
     </div>
     <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
      Digital <span className="text-gradient">Insights</span>
     </h1>
     <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
      Stay updated with web styling strategies, server performance, database setups, and local search rankings.
     </p>
    </div>

    {/* Search & Category Layout */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
     {/* Categories */}
     <div className="flex flex-wrap gap-2.5 order-2 md:order-1 justify-center md:justify-start">
      {categories.map((cat) => (
       <button
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
         selectedCategory === cat
          ? 'bg-red-650 bg-red-500 border-red-500 text-white shadow-md'
          : 'bg-neutral-900 border-neutral-850 text-slate-400 hover:text-white'
        }`}
       >
        {cat}
       </button>
      ))}
     </div>

     {/* Search Input */}
     <div className="relative w-full md:w-80 order-1 md:order-2">
      <input
       type="text"
       placeholder="Search articles..."
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
       className="w-full bg-neutral-900 border border-neutral-850 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
      />
      <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
     </div>
    </div>

    {/* Blog Post Grid */}
    {loading ? (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2].map((n) => (
       <div key={n} className="h-60 rounded-2xl bg-neutral-950 border-slate-200 animate-pulse border border-neutral-900" />
      ))}
     </div>
    ) : (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
      <AnimatePresence mode="popLayout">
       {filteredBlogs.map((blog, idx) => (
        <motion.div
         key={blog._id || idx}
         layout
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, scale: 0.95 }}
         transition={{ duration: 0.4, delay: idx * 0.05 }}
         className="flex font-sans"
        >
         <GlassCard 
          className="flex flex-col justify-between w-full h-full border-red-500/10 hover:border-red-500/25 cursor-pointer p-6 hover:translate-y-[-3px] transition-all"
          onClick={() => setSelectedPost(blog)}
         >
          <div className="space-y-4">
           {/* Meta info */}
           <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
            <span className="text-red-500 bg-red-500/5 border border-red-500/10 px-2 py-0.5 rounded-full font-bold">
             {blog.category}
            </span>
            <span className="flex items-center gap-1">
             <Calendar className="w-3.5 h-3.5 text-red-500" />
             {new Date(blog.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
             <Clock className="w-3.5 h-3.5 text-red-500" />
             {blog.readTime}
            </span>
           </div>

           <h3 className="text-base sm:text-lg font-bold text-white font-display leading-snug hover:text-red-500 transition-colors">
            {blog.title}
           </h3>
           <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-3">
            {blog.summary}
           </p>
          </div>

          <div className="border-t border-slate-900 pt-4 mt-6 flex justify-between items-center text-xs">
           <span className="flex items-center gap-1.5 text-slate-400 font-medium">
            <User className="w-3.5 h-3.5 text-red-500" />
            {blog.author}
           </span>
           <span className="text-red-500 font-semibold flex items-center gap-0.5 group">
            Read Full
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
           </span>
          </div>
         </GlassCard>
        </motion.div>
       ))}
      </AnimatePresence>
     </div>
    )}

    {/* No posts match warning */}
    {!loading && filteredBlogs.length === 0 && (
     <div className="text-center py-12 text-slate-500 text-xs">
      No articles match your search or filter requirements.
     </div>
    )}

    {/* Article Reading Modal */}
    <AnimatePresence>
     {selectedPost && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
       <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedPost(null)}
        className="absolute inset-0 bg-black transition-colors duration-300/85 backdrop-blur-sm"
       />

       <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="w-full max-w-3xl glassmorphism border-red-500/25 max-h-[85vh] overflow-y-auto p-6 sm:p-10 space-y-6 relative bg-black transition-colors duration-300 text-left z-10"
       >
        {/* Close Button */}
        <button
         onClick={() => setSelectedPost(null)}
         className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 hover:bg-neutral-900 rounded-full cursor-pointer"
        >
         <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
         {/* Category pill & date */}
         <div className="flex items-center gap-3 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
          <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-2.5 py-1 rounded-full font-bold">
           {selectedPost.category}
          </span>
          <span className="flex items-center gap-1">
           <Calendar className="w-3.5 h-3.5 text-red-500" />
           {new Date(selectedPost.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
           <Clock className="w-3.5 h-3.5 text-red-500" />
           {selectedPost.readTime}
          </span>
         </div>

         <h2 className="text-xl sm:text-2xl font-bold text-white font-display leading-snug">
          {selectedPost.title}
         </h2>

         <div className="flex items-center gap-2 text-xs text-slate-350">
          <User className="w-4 h-4 text-red-500" />
          <span>Written by {selectedPost.author}</span>
         </div>
        </div>

        {/* Content rendering */}
        <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed font-light space-y-4 border-t border-slate-900 pt-6 whitespace-pre-line">
         {selectedPost.content}
        </div>

        {/* Modal footer */}
        <div className="flex justify-end pt-4 border-t border-slate-900">
         <button
          onClick={() => setSelectedPost(null)}
          className="bg-neutral-900 border border-neutral-850 hover:bg-neutral-850 text-slate-350 hover:text-white py-2 px-6 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
         >
          Close Article
         </button>
        </div>
       </motion.div>
      </div>
     )}
    </AnimatePresence>

   </div>
  </div>
 );
};

export default Blog;
