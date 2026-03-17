import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowRight, Play, Sparkles, BarChart3, Share2, Facebook, Twitter, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import NetworkBackground from './NetworkBackground';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [windowSize, setWindowSize] = useState({ 
    width: typeof document !== 'undefined' ? document.documentElement.clientWidth : 1280, 
    height: typeof window !== 'undefined' ? window.innerHeight : 800 
  });

  useEffect(() => {
    const handleResize = () => setWindowSize({ 
      width: document.documentElement.clientWidth, 
      height: window.innerHeight 
    });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate exact starting position of the navbar logo
  // Navbar has px-6 (24px padding). Inner container is max-w-7xl (1280px).
  const navbarLogoX = Math.max(24, (windowSize.width - 1280) / 2) + 16; // +16 for half of 32px width
  const navbarLogoY = 32; // Exact center Y of navbar logo (16px padding + 16px half height)

  // Center of screen is windowSize.width / 2
  const startX = navbarLogoX - windowSize.width / 2;
  const startY = navbarLogoY - windowSize.height / 2;

  // Animation values
  const logoX = useTransform(smoothProgress, [0, 0.15, 0.3, 0.5, 0.95, 1], [startX, startX, 0, 0, startX, startX]);
  const logoY = useTransform(smoothProgress, [0, 0.15, 0.3, 0.5, 0.95, 1], [startY, startY, 0, 0, startY, startY]);
  const logoScale = useTransform(smoothProgress, [0, 0.15, 0.3, 0.5, 0.95, 1], [1, 1, 1.5625, 1.5625, 0.5, 0.5]);
  const logoOpacity = useTransform(smoothProgress, [0, 0.95, 1], [1, 1, 0]);
  
  const centralCircleOpacity = useTransform(smoothProgress, [0, 0.05, 0.15, 0.5, 0.6], [0, 0, 1, 1, 0]);
  const centralCircleScale = useTransform(smoothProgress, [0, 0.05, 0.15, 0.5, 0.6], [0.5, 0.5, 1, 1, 0.5]);
  
  const platformsOpacity = useTransform(smoothProgress, [0, 0.05, 0.15, 0.5, 0.6], [0, 0, 1, 1, 0]);
  const platformsRotate = useTransform(smoothProgress, [0, 1], [0, 360]); // One full revolution
  const dashOffset = useTransform(smoothProgress, [0, 1], [0, -500]); // Flows towards platforms on scroll

  const platforms = [
    { icon: Twitter, angle: 180, radius: 180 }, // Orbit 1 (1 platform)
    { icon: Instagram, angle: 60, radius: 300 }, // Orbit 2
    { icon: Linkedin, angle: 240, radius: 300 }, // Orbit 2
    { icon: Facebook, angle: 0, radius: 420 },   // Orbit 3
    { icon: Youtube, angle: 120, radius: 420 },  // Orbit 3
    { icon: MessageCircle, angle: 300, radius: 420 }, // Orbit 3
  ];

  return (
    <section ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-animate">
        {/* Network Background */}
        <NetworkBackground />
        
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100 - Math.random() * 100],
                  x: [0, (Math.random() - 0.5) * 50],
                  opacity: [0, 0.8, 0],
                  scale: [0, Math.random() * 1.5 + 0.5, 0]
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-reflection relative">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-white/80">Next-Gen Marketing Intelligence</span>
            </div>
          </motion.div>

          <motion.h1
            style={{ 
              opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]),
              y: useTransform(smoothProgress, [0, 0.05], [0, -20])
            }}
            className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold tracking-tight mb-8 leading-[1.1]"
          >
            Turn Your Marketing Into an <br />
            <span className="text-gradient">Autonomous Growth Engine</span>
          </motion.h1>

          <motion.p
            style={{ 
              opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]),
              y: useTransform(smoothProgress, [0, 0.05], [0, -20])
            }}
            className="max-w-2xl mx-auto text-[1rem] text-white/60 mb-12"
          >
            Aries AI analyzes markets, generates content, and automatically publishes across all social media platforms. Experience the future of marketing execution.
          </motion.p>

          <motion.div
            style={{ 
              opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]),
              y: useTransform(smoothProgress, [0, 0.05], [0, -20])
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-xl shadow-primary/20 hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Start Automating <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Play className="w-5 h-5 fill-current" /> See Demo
            </button>
          </motion.div>

          {/* Animation Layer */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Orbit Lines */}
            <motion.div 
              style={{ opacity: platformsOpacity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {[180, 300, 420].map((r, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full border border-white/5"
                  style={{ width: r * 2, height: r * 2 }}
                />
              ))}
            </motion.div>

            {/* Central Circle */}
            <motion.div
              style={{
                opacity: centralCircleOpacity,
                scale: centralCircleScale,
              }}
              className="w-40 h-40 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="w-28 h-28 rounded-full border border-primary/20 animate-pulse" />
            </motion.div>

            {/* Connection Lines (Centralized) */}
            <svg 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-visible" 
              width="1000" 
              height="1000" 
              viewBox="-500 -500 1000 1000"
            >
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0.1" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {platforms.map((platform, i) => {
                const baseAngle = platform.angle;
                const platformRadius = useTransform(smoothProgress, [0, 0.05, 0.15, 0.75, 0.85], [0, 0, platform.radius, platform.radius, 0]);
                
                // Start line from edge of central logo (radius 25px for 50px logo)
                const startRadius = 25;
                // Stop line at icon edge (radius - 40px since container is 80px wide)
                const lineTargetRadius = Math.max(startRadius, platform.radius - 40);

                const lineStart = 0.3 + i * 0.015;
                const lineEnd = 0.35 + i * 0.015;
                
                const lineCurrentRadius = useTransform(
                  smoothProgress, 
                  [lineStart, lineEnd, 0.5, 0.6], 
                  [startRadius, lineTargetRadius, lineTargetRadius, startRadius]
                );

                const lineOpacity = useTransform(
                  smoothProgress, 
                  [lineStart, lineStart + 0.01, 0.5, 0.6], 
                  [0, 0.8, 0.8, 0]
                );

                const x1 = useTransform(platformsRotate, (rot) => {
                  const angleRad = ((baseAngle + (rot as number)) * Math.PI) / 180;
                  return Math.cos(angleRad) * startRadius;
                });
                const y1 = useTransform(platformsRotate, (rot) => {
                  const angleRad = ((baseAngle + (rot as number)) * Math.PI) / 180;
                  return Math.sin(angleRad) * startRadius;
                });

                const x2 = useTransform([lineCurrentRadius, platformsRotate], ([r, rot]) => {
                  const angleRad = ((baseAngle + (rot as number)) * Math.PI) / 180;
                  return Math.cos(angleRad) * (r as number);
                });
                const y2 = useTransform([lineCurrentRadius, platformsRotate], ([r, rot]) => {
                  const angleRad = ((baseAngle + (rot as number)) * Math.PI) / 180;
                  return Math.sin(angleRad) * (r as number);
                });

                return (
                  <g key={i}>
                    {/* Animated data flow line */}
                    <motion.line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="url(#line-gradient)"
                      strokeWidth="3"
                      strokeDasharray="15 30"
                      filter="url(#glow)"
                      animate={{ strokeDashoffset: [45, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      style={{ opacity: lineOpacity }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Platforms */}
            <motion.div
              style={{
                opacity: platformsOpacity,
              }}
              className="absolute w-full h-full flex items-center justify-center"
            >
              {platforms.map((platform, i) => {
                const baseAngle = platform.angle;
                const platformRadius = useTransform(smoothProgress, [0, 0.05, 0.15, 0.5, 0.6], [0, 0, platform.radius, platform.radius, 0]);
                
                const x = useTransform([platformRadius, platformsRotate], ([r, rot]) => {
                  const angleRad = ((baseAngle + (rot as number)) * Math.PI) / 180;
                  return Math.cos(angleRad) * (r as number);
                });
                const y = useTransform([platformRadius, platformsRotate], ([r, rot]) => {
                  const angleRad = ((baseAngle + (rot as number)) * Math.PI) / 180;
                  return Math.sin(angleRad) * (r as number);
                });

                return (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      x,
                      y,
                      scale: useTransform(platformRadius, [0, platform.radius], [0, 1]),
                    }}
                    className="relative"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl shadow-white/5 relative z-10">
                      <platform.icon className="w-10 h-10 text-white" />
                    </div>
                    {/* Platform Pulse */}
                    <motion.div 
                      className="absolute inset-0 rounded-full border-2 border-secondary/30"
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeOut" }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Moving Logo */}
            <motion.div
              style={{
                x: logoX,
                y: logoY,
                scale: logoScale,
                opacity: logoOpacity,
                position: 'fixed',
                top: '50%',
                left: '50%',
                marginTop: '-16px',
                marginLeft: '-16px',
              }}
              className="z-[60]"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20 border border-white/20 relative z-10">
                  A
                </div>
                {/* Central Pulse */}
                <motion.div 
                  className="absolute inset-0 rounded-lg border-2 border-primary/50"
                  animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Cards (Initial State) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none max-w-[1400px] mx-auto">
          <motion.div
            style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[50%] left-8 xl:left-12 mt-24 glass-reflection p-5 rounded-2xl w-64 text-left glow-purple pointer-events-auto"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/20 rounded-lg">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold text-white">Analytics</span>
            </div>
            <p className="text-sm font-medium text-white/80">+24% Growth this week</p>
          </motion.div>

          <motion.div
            style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}
            animate={{ y: [15, -15, 15] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[65%] right-4 xl:right-8 glass-reflection p-5 rounded-2xl w-[250px] flex flex-col justify-center text-left glow-purple pointer-events-auto"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-secondary/20 rounded-lg">
                <Share2 className="w-5 h-5 text-secondary" />
              </div>
              <span className="font-semibold text-white">Auto-Post</span>
            </div>
            <p className="text-sm font-medium text-white/80">X, LinkedIn, Insta, etc.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
