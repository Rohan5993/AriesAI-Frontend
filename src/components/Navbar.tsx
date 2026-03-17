import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [showIcon, setShowIcon] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const scrollPos = window.scrollY;
      const heroHeight = window.innerHeight * 2.5;
      const progress = scrollPos / heroHeight;
      setScrollProgress(progress);
      
      if (isHome) {
        // On home page, hide icon at top (Hero logo covers it), show past hero
        setShowIcon(progress > 0.95);
        
        // Fade out header when logo starts moving
        if (progress < 0.10) {
          setHeaderOpacity(1);
        } else if (progress >= 0.10 && progress <= 0.15) {
          setHeaderOpacity(1 - ((progress - 0.10) / 0.05));
        } else if (progress > 0.15 && progress < 0.5) {
          setHeaderOpacity(0);
        } else if (progress >= 0.5 && progress <= 0.95) {
          setHeaderOpacity((progress - 0.5) / 0.45);
        } else {
          setHeaderOpacity(1);
        }
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
    { name: 'Product', href: '#product' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      style={{ 
        transitionProperty: 'background-color, border-color, padding'
      }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6',
        isScrolled && (!isHome || scrollProgress > 0.95) ? 'bg-black/50 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
        >
          <div className={cn(
            "w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20 border border-white/20 transition-opacity duration-300",
            showIcon ? "opacity-100" : "opacity-0"
          )}>
            A
          </div>
          <span 
            className="text-xl font-bold tracking-tight"
            style={{ opacity: isHome ? headerOpacity : 1 }}
          >
            Aries AI
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div 
          className="hidden md:flex items-center gap-8"
          style={{ opacity: headerOpacity, pointerEvents: headerOpacity < 0.5 ? 'none' : 'auto' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div 
          className="hidden md:flex items-center gap-4"
          style={{ opacity: headerOpacity, pointerEvents: headerOpacity < 0.5 ? 'none' : 'auto' }}
        >
          <Link to="/login" className="px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-sm font-medium transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
            Start Automating <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ opacity: headerOpacity, pointerEvents: headerOpacity < 0.5 ? 'none' : 'auto' }}
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
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-white/70 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
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
