import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogIn, LayoutDashboard, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/about', label: 'About' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
      scrolled 
        ? 'h-16 bg-[#050505]/80 backdrop-blur-md border-red-500/10 shadow-lg shadow-black/5' 
        : 'h-20 bg-transparent border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="group select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg py-1 px-1.5" 
            aria-label="StackKraft Home"
          >
            <Logo variant="main" className="w-[42px] h-[42px] lg:w-[52px] lg:h-[52px]" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-1.5 text-xs uppercase tracking-widest font-semibold transition-colors duration-250 hover:text-red-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 rounded px-1 ${
                    isActive ? 'text-red-500' : 'text-slate-400'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavLine" 
                        className="absolute bottom-0 left-1 right-1 h-0.5 bg-red-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Dashboard shortcut if Admin logged in */}
            {isAuthenticated && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 bg-red-600/10 text-red-500 hover:bg-red-600/20 px-3.5 py-1.5 rounded-lg text-[10px] font-semibold tracking-wider uppercase border border-red-500/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Link>
            )}

            {/* CTA Button: Get Free Quote */}
            <Link
              to="/contact?quote=true"
              className="btn-premium px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-500/10 hover:shadow-red-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-neutral-900 text-slate-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-t border-red-500/10 bg-[#050505]/95 backdrop-blur-lg overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                      isActive 
                        ? 'text-red-500 bg-red-500/5' 
                        : 'text-slate-350 hover:text-red-500 hover:bg-red-500/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="pt-4 border-t border-red-950/20 flex flex-col gap-3">
                <Link
                  to="/contact?quote=true"
                  onClick={() => setIsOpen(false)}
                  className="btn-premium py-3 text-center text-xs font-bold uppercase tracking-wider"
                >
                  Get Free Quote
                </Link>

                {isAuthenticated ? (
                  <div className="flex gap-2">
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600/10 text-red-500 border border-red-500/25 py-2.5 rounded-xl text-xs font-bold uppercase"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="p-2.5 bg-red-600/10 text-red-500 border border-red-500/20 rounded-xl cursor-pointer"
                      aria-label="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 text-slate-400 hover:text-white py-2 text-xs font-semibold uppercase"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    Admin Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
