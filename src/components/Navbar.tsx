import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showIcon, setShowIcon] = useState(typeof window !== 'undefined' ? window.location.pathname !== '/' : true);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      if (window.location.pathname === '/') {
        const scrollPos = window.scrollY;
        const heroHeight = window.innerHeight * 2.5;
        const progress = scrollPos / heroHeight;
        
        // Hide navbar logo during the hero logo flight sequence
        setShowIcon(progress >= 0.75);
        setHeaderOpacity(1);
      } else {
        setShowIcon(true);
        setHeaderOpacity(1);
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const navLinks = [
    { name: 'How it Works', href: '/#how-it-works' },
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Documentation', href: '/docs' },
  ];

  return (
    <nav
      style={{ 
        transitionProperty: 'background-color, border-color, padding'
      }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6',
        isScrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
        >
          <Link 
            to="/" 
            className="flex items-center gap-2"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img 
              src="/ariesai-logo.png" 
              alt="Aries AI Logo" 
              className={cn(
                "w-24 h-24 object-contain transition-all duration-300",
                showIcon ? "opacity-100" : "opacity-0"
              )}
              style={{
                visibility: showIcon ? 'visible' : 'hidden'
              }}
            />
            <span 
              className="text-xl font-bold tracking-[0.1em] uppercase transition-all duration-300"
            >
              ARIES AI
            </span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div 
          className="hidden md:flex items-center gap-8"
        >
          {navLinks.map((link) => (
            link.href.startsWith('/') && !link.href.includes('#') ? (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            )
          ))}
        </div>

        <div 
          className="hidden md:flex items-center gap-4"
        >
          <Link to="/login" className="px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-sm font-medium transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
            Start Automating <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              link.href.startsWith('/') && !link.href.includes('#') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-lg font-medium text-white/70 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-white/70 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
            <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
              <Link to="/login" className="w-full py-3 flex justify-center rounded-xl bg-gradient-to-r from-primary to-secondary font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Start Automating
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
