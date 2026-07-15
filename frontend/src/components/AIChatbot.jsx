import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MessageSquare, X, Send, Bot, User, RefreshCw, Sparkles, ExternalLink } from 'lucide-react';
import { API_URL } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatbot = () => {
 const [isOpen, setIsOpen] = useState(false);
 const [messages, setMessages] = useState([
  {
   id: 1,
   sender: 'bot',
   text: "Welcome to StackKraft 👋\n\nI am your digital engineering assistant. How can I help you build or optimize your next web platform today?",
   timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
 ]);
 const [inputText, setInputText] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [errorState, setErrorState] = useState(null); // stores error message or null

 const chatEndRef = useRef(null);
 const navigate = useNavigate();

 useEffect(() => {
  if (chatEndRef.current) {
   chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
 }, [messages, isLoading, errorState]);

 const handleSendMessage = async (textToSend) => {
  const text = textToSend || inputText;
  if (!text.trim()) return;

  setErrorState(null);

  // Append user message
  const userMsg = {
   id: Date.now(),
   sender: 'user',
   text,
   timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  
  setMessages(prev => [...prev, userMsg]);
  setInputText('');
  setIsLoading(true);

  // Format chat history (excluding the first welcome message and any errors) for backend context memory
  const history = messages
   .filter(m => m.id !== 1)
   .map(m => ({
    sender: m.sender,
    text: m.text
   }));

  try {
   const res = await axios.post(`${API_URL}/chat`, {
    message: text,
    history
   });
   
   const botMsg = {
    id: Date.now() + 1,
    sender: 'bot',
    text: res.data.reply,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
   };
   setMessages(prev => [...prev, botMsg]);
  } catch (err) {
   console.error('Chatbot API communication failure:', err);
   const errMsg = err.response?.data?.reply || "I'm having trouble connecting to my services. Would you like to contact the StackKraft team directly?";
   setErrorState({
    message: errMsg,
    retryText: text
   });
  } finally {
   setIsLoading(false);
  }
 };

 const handleQuickAction = (action) => {
  if (action === 'View Portfolio') {
   navigate('/portfolio');
   setIsOpen(false);
  } else if (action === 'Our Services') {
   navigate('/services');
   setIsOpen(false);
  } else if (action === 'Pricing') {
   navigate('/pricing');
   setIsOpen(false);
  } else if (action === 'Book Meeting' || action === 'Free Quote') {
   navigate('/contact?quote=true');
   setIsOpen(false);
  } else if (action === 'Contact') {
   navigate('/contact');
   setIsOpen(false);
  }
 };

 const quickActions = [
  { label: 'View Portfolio', action: 'View Portfolio' },
  { label: 'Our Services', action: 'Our Services' },
  { label: 'Pricing Plans', action: 'Pricing' },
  { label: 'Get Free Quote', action: 'Free Quote' },
  { label: 'Contact Team', action: 'Contact' }
 ];

 return (
  <div className="fixed bottom-6 right-6 z-[999] font-sans">
   {/* Floating Toggle Button */}
   {!isOpen && (
    <button
     onClick={() => setIsOpen(true)}
     className="flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-red-650 to-red-500 hover:from-red-600 hover:to-red-400 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 relative group cursor-pointer border border-red-500/10"
     aria-label="Open StackKraft Assistant"
    >
     <Bot className="w-6 h-6 animate-pulse" />
     <span className="absolute right-16 bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
      AI Assistant
     </span>
     <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-50 animate-pulse" />
    </button>
   )}

   {/* Expanded Chat window */}
   <AnimatePresence>
    {isOpen && (
     <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 20 }}
      transition={{ type: "spring", duration: 0.35 }}
      className="w-[340px] h-[500px] sm:w-[380px] sm:h-[540px] rounded-2xl bg-white [#0c0c0f] border border-red-500/15 shadow-2xl flex flex-col overflow-hidden"
     >
      {/* Header */}
      <div className="bg-slate-100/70 border-b border-neutral-800/80 px-4 py-3 flex items-center justify-between">
       <div className="flex items-center gap-2.5">
        <div className="w-8.5 h-8.5 rounded-full bg-red-500/10 flex items-center justify-center relative">
         <Bot className="w-5 h-5 text-red-500 animate-pulse" />
         <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white [#0c0c0f]" />
        </div>
        <div className="text-left">
         <h4 className="text-xs font-bold text-white tracking-wide">StackKraft Engine</h4>
         <div className="flex items-center gap-1.5">
          <span className="text-[9px] text-slate-400">Powered by Gemini AI</span>
         </div>
        </div>
       </div>
       <button 
        onClick={() => setIsOpen(false)}
        className="text-slate-400 hover:text-slate-800 :text-white p-1 hover:bg-slate-200/50 :bg-neutral-800 rounded-lg transition-colors cursor-pointer"
        aria-label="Close Chatbot Window"
       >
        <X className="w-5 h-5" />
       </button>
      </div>

      {/* Messages body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 ">
       
       {/* Welcome Screen Cards & Quick Links */}
       <div className="space-y-3.5 mb-6 text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-550/10 border border-red-500/20 text-[10px] font-bold text-red-650 ">
         <Sparkles className="w-3 h-3 text-red-500 animate-pulse" />
         Quick Directory Link
        </div>
        <div className="grid grid-cols-2 gap-2">
         {quickActions.map((item, idx) => (
          <button
           key={idx}
           onClick={() => handleQuickAction(item.action)}
           className="flex items-center justify-between px-3 py-2 bg-white border border-slate-200/60 hover:border-red-500/20 rounded-xl text-[10px] font-semibold text-slate-300 hover:text-red-500 :text-red-500 transition-all text-left shadow-sm cursor-pointer active:scale-[0.98]"
          >
           {item.label}
           <ExternalLink className="w-3 h-3" />
          </button>
         ))}
        </div>
       </div>

       {/* Chat Thread */}
       {messages.map((msg) => (
        <div 
         key={msg.id} 
         className={`flex gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
        >
         <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs shadow-sm ${
          msg.sender === 'user' ? 'bg-red-500 text-white' : 'bg-neutral-900 text-red-500 border border-slate-250/20 '
         }`}>
          {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
         </div>
         
         <div className="space-y-1">
          <div className={`rounded-2xl p-3.5 text-xs leading-relaxed ${
           msg.sender === 'user' 
            ? 'bg-red-600 text-white rounded-tr-none shadow-md shadow-red-500/5' 
            : 'bg-white border border-slate-200/80 text-slate-200 rounded-tl-none shadow-sm whitespace-pre-line'
          }`}>
           {msg.text}
          </div>
          <span className="text-[8px] text-slate-400 block px-1 text-left">
           {msg.timestamp}
          </span>
         </div>
        </div>
       ))}

       {/* Thinking / Loading indicator */}
       {isLoading && (
        <div className="flex gap-2.5 max-w-[85%]">
         <div className="w-7 h-7 rounded-full bg-neutral-900 text-red-500 flex items-center justify-center shrink-0 border border-slate-200/20 ">
          <Bot className="w-4 h-4" />
         </div>
         <div className="bg-white border border-neutral-850 rounded-2xl p-3.5 text-xs text-slate-400 rounded-tl-none flex items-center gap-1.5 shadow-sm">
          Thinking
          <span className="flex gap-0.5">
           <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
           <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
           <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
         </div>
        </div>
       )}

       {/* Error Callbacks */}
       {errorState && (
        <div className="flex gap-2.5 max-w-[85%]">
         <div className="w-7 h-7 rounded-full bg-neutral-900 text-red-500 flex items-center justify-center shrink-0 border border-slate-200/20 ">
          <Bot className="w-4 h-4" />
         </div>
         <div className="space-y-2">
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3.5 text-xs text-rose-700 rounded-tl-none shadow-sm whitespace-pre-line">
           {errorState.message}
          </div>
          <button
           onClick={() => handleSendMessage(errorState.retryText)}
           className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all active:scale-[0.98] w-fit shadow-lg shadow-red-500/10"
          >
           <RefreshCw className="w-3 h-3" />
           Retry Inquiry
          </button>
         </div>
        </div>
       )}
       <div ref={chatEndRef} />
      </div>

      {/* Input Footer */}
      <div className="p-3 border-t border-neutral-800 bg-[#08080a] flex items-center gap-2">
       <input
        type="text"
        placeholder="Ask me something about StackKraft..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        disabled={isLoading}
        className="flex-1 bg-transparent text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-0 disabled:opacity-50"
       />
       <button
        onClick={() => handleSendMessage()}
        disabled={isLoading || !inputText.trim()}
        className="bg-red-650 hover:bg-red-500 disabled:bg-slate-200 :bg-neutral-900 text-white disabled:text-slate-400 p-1.5 rounded-lg transition-all cursor-pointer"
        aria-label="Send message to assistant"
       >
        <Send className="w-3.5 h-3.5" />
       </button>
      </div>
     </motion.div>
    )}
   </AnimatePresence>
  </div>
 );
};

export default AIChatbot;
