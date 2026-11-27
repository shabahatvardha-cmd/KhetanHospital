import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * 🏥 FEATURED SURGICAL SERVICES SHOWCASE (POLPHARMA BIOTECH THEME)
 * 
 * - Frosted glassmorphism on deep midnight biotech backdrop
 * - Dynamic color theming per service with glowing SVG contour loops
 * - Outlined program tag + filled CTA button
 * - Editorial headline & clinical narrative
 * - Squircle image frame with multi-layered debossed bevels
 * - Floating capsule navigation with dots + circle buttons
 */
export const FEATURED_SERVICES = [
  {
    id: 'robotic-knee-surgery',
    code: 'SURGERY 01',
    category: 'KNEE ARTHROPLASTY',
    heading: 'Robotic Knee Replacement',
    description: 'Sub-millimeter optical navigation ensuring exact 0.5mm implant alignment, preserving healthy bone and ligaments, and enabling rapid mobility within 24 hours.',
    route: '/services/robotic-knee-surgery',
    image: '/images/surgeries/robotic-knee.jpg',
    theme: {
      accent: '#38bdf8', // Neon Sky Blue
      accentHover: '#0284c7',
      accentLight: '#082f49',
      textAccent: 'text-sky-400',
      borderAccent: 'border-sky-500',
      bgAccent: 'bg-sky-500',
      shadowAccent: 'shadow-[0_10px_35px_rgba(56,189,248,0.25)]',
      gradient: 'from-sky-500/10 via-sky-500/5 to-transparent',
    }
  },
  {
    id: 'knee-replacement',
    code: 'SURGERY 02',
    category: 'JOINT RECONSTRUCTION',
    heading: 'Total Knee Replacement',
    description: 'Advanced kinematic joint reconstruction using 20+ year longevity implants engineered to eliminate chronic osteoarthritis pain and restore natural knee flexion.',
    route: '/services/knee-replacement',
    image: '/images/surgeries/knee-replacement.jpg',
    theme: {
      accent: '#fbbf24', // Warm Amber Gold
      accentHover: '#d97706',
      accentLight: '#451a03',
      textAccent: 'text-amber-400',
      borderAccent: 'border-amber-500',
      bgAccent: 'bg-amber-500',
      shadowAccent: 'shadow-[0_10px_35px_rgba(251,191,36,0.25)]',
      gradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
    }
  },
  {
    id: 'hip-replacement',
    code: 'SURGERY 03',
    category: 'HIP ARTHROPLASTY',
    heading: 'Total Hip Replacement',
    description: 'Muscle-sparing tissue-preserving arthroplasty with low-friction ceramic bearings, restoring smooth pain-free gait and lifelong joint mobility.',
    route: '/services/hip-replacement',
    image: '/images/surgeries/hip-replacement.jpg',
    theme: {
      accent: '#34d399', // Emerald Neon
      accentHover: '#059669',
      accentLight: '#064e3b',
      textAccent: 'text-emerald-400',
      borderAccent: 'border-emerald-500',
      bgAccent: 'bg-emerald-500',
      shadowAccent: 'shadow-[0_10px_35px_rgba(52,211,153,0.25)]',
      gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
    }
  },
  {
    id: 'shoulder-replacement',
    code: 'SURGERY 04',
    category: 'SHOULDER ARTHROSCOPY',
    heading: 'Shoulder Arthroscopy & Repair',
    description: 'Minimally invasive keyhole repair for rotator cuff tears and anatomical/reverse shoulder replacement for complete overhead reach restoration.',
    route: '/services/shoulder-replacement',
    image: '/images/surgeries/shoulder-surgery.jpg',
    theme: {
      accent: '#a78bfa', // Royal Violet
      accentHover: '#7c3aed',
      accentLight: '#2e1065',
      textAccent: 'text-purple-400',
      borderAccent: 'border-purple-500',
      bgAccent: 'bg-purple-500',
      shadowAccent: 'shadow-[0_10px_35px_rgba(167,139,250,0.25)]',
      gradient: 'from-purple-500/10 via-purple-500/5 to-transparent',
    }
  },
  {
    id: 'acl-surgery',
    code: 'SURGERY 05',
    category: 'SPORTS MEDICINE',
    heading: 'ACL & Sports Arthroscopy',
    description: 'Anatomic keyhole cruciate ligament repair and biological meniscus preservation following Olympic Committee return-to-sport protocols.',
    route: '/services/acl-surgery',
    image: '/images/surgeries/acl-surgery.jpg',
    theme: {
      accent: '#22d3ee', // Cyan / Electric Turquoise
      accentHover: '#0891b2',
      accentLight: '#164e63',
      textAccent: 'text-cyan-400',
      borderAccent: 'border-cyan-500',
      bgAccent: 'bg-cyan-500',
      shadowAccent: 'shadow-[0_10px_35px_rgba(34,211,238,0.25)]',
      gradient: 'from-cyan-500/10 via-cyan-500/5 to-transparent',
    }
  },
  {
    id: 'spine-surgery',
    code: 'SURGERY 06',
    category: 'SPINE SPECIALTY',
    heading: 'Spine & Lumbar Decompression',
    description: 'Targeted neurological decompression and micro-endoscopic discectomy for disc herniation, sciatica relief, and spine stability.',
    route: '/services/spine-surgery',
    image: '/images/surgeries/spine-surgery.jpg',
    theme: {
      accent: '#fb7185', // Rose / Crimson
      accentHover: '#e11d48',
      accentLight: '#4c0519',
      textAccent: 'text-rose-400',
      borderAccent: 'border-rose-500',
      bgAccent: 'bg-rose-500',
      shadowAccent: 'shadow-[0_10px_35px_rgba(251,113,133,0.25)]',
      gradient: 'from-rose-500/10 via-rose-500/5 to-transparent',
    }
  },
  {
    id: 'trauma-surgery',
    code: 'SURGERY 07',
    category: 'TRAUMA & EMERGENCY',
    heading: 'Complex Trauma & Fracture Care',
    description: '24/7 emergency polytrauma stabilization, anatomical locking plate fixation, and delicate multi-fragment limb reconstruction.',
    route: '/services/trauma-surgery',
    image: '/images/surgeries/trauma-surgery.jpg',
    theme: {
      accent: '#60a5fa', // Cobalt Blue
      accentHover: '#1d4ed8',
      accentLight: '#1e3a8a',
      textAccent: 'text-blue-400',
      borderAccent: 'border-blue-500',
      bgAccent: 'bg-blue-500',
      shadowAccent: 'shadow-[0_10px_35px_rgba(96,165,250,0.25)]',
      gradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
    }
  }
];

export const FeaturedServicesShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const total = FEATURED_SERVICES.length;
  const navigate = useNavigate();

  const currentService = FEATURED_SERVICES[currentIndex];
  const { theme } = currentService;

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handleSelect = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Frosted Glass Showcase Container */}
      <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#071326]/85 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden p-4 sm:p-6 lg:p-7 transition-all duration-700">
        
        {/* Dynamic Ambient Background Vector Glow matching active service */}
        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-50"
          style={{
            background: `radial-gradient(circle at 75% 50%, ${theme.accent}25 0%, transparent 65%)`
          }}
        />

        {/* Dynamic Flowing Organic Vector Contour Lines in Neon Accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 600"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M -50 450 C 200 480 350 200 600 220 C 780 240 880 120 1050 180"
              stroke={theme.accent}
              strokeWidth="1.75"
              strokeDasharray="8 6"
              strokeOpacity="0.5"
              className="transition-colors duration-700"
            />
            <path
              d="M 450 -50 C 580 80 820 40 850 250 C 880 440 680 550 500 580 C 380 600 220 540 120 400"
              stroke={theme.accent}
              strokeWidth="2"
              strokeOpacity="0.5"
              className="transition-colors duration-700"
            />
            <path
              d="M 520 60 C 650 30 780 120 800 280 C 820 420 720 500 620 480"
              stroke={theme.accent}
              strokeWidth="1.5"
              strokeOpacity="0.35"
              className="transition-colors duration-700"
            />
          </svg>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[340px]">
          
          {/* Left Column: Category Badge + CTA Button + Title + Paragraph + Floating Controls */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-3 sm:space-y-4">
            
            {/* Action Trigger & Tag */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">
                {currentService.code} &bull; {currentService.category}
              </span>

              <Link
                to={currentService.route}
                className="px-4 py-1.5 rounded-full text-slate-950 text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 transition-all duration-300 shadow-lg hover:scale-105 group cursor-pointer"
                style={{
                  backgroundColor: theme.accent,
                  boxShadow: `0 4px 15px ${theme.accent}50`
                }}
              >
                <span>View Details</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Main Heading & Narrative with Animated Transition */}
            <div className="space-y-2 py-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight-editorial uppercase leading-[1.08]">
                    {currentService.heading}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-light max-w-xl">
                    {currentService.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Floating Navigation Capsule: Prev Button + Dots + Next Button */}
            <div className="pt-1">
              <div className="inline-flex items-center gap-2.5 p-1 sm:p-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-lg backdrop-blur-md">
                
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous service"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 border border-white/10 shadow-sm flex items-center justify-center text-white hover:text-slate-950 transition-all duration-300 cursor-pointer"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.accent;
                    e.currentTarget.style.color = '#020617';
                    e.currentTarget.style.borderColor = theme.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>

                {/* Pagination Dots */}
                <div className="flex items-center gap-1.5 px-1.5">
                  {FEATURED_SERVICES.map((item, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className="p-1 cursor-pointer transition-all focus:outline-none"
                      >
                        <span
                          className={`block rounded-full transition-all duration-400 ${
                            isActive
                              ? 'w-5 h-2 shadow-sm'
                              : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                          }`}
                          style={{
                            backgroundColor: isActive ? theme.accent : undefined
                          }}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  aria-label="Next service"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 border border-white/10 shadow-sm flex items-center justify-center text-white hover:text-slate-950 transition-all duration-300 cursor-pointer"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.accent;
                    e.currentTarget.style.color = '#020617';
                    e.currentTarget.style.borderColor = theme.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>

              </div>
            </div>

          </div>

          {/* Right Column: Featured Squircle Image with Multi-Layered Debossed Bevel Frames */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-[250px] sm:max-w-[280px] lg:max-w-[300px] aspect-square">
              
              {/* Layer 1: Debossed secondary background bevel frame */}
              <div 
                className="absolute inset-0 rounded-[32px] sm:rounded-[38px] border-2 border-white/10 bg-white/[0.03] shadow-xl transform -rotate-3 scale-[1.03] transition-transform duration-700 -z-10 pointer-events-none"
                style={{
                  borderColor: `${theme.accent}40`
                }}
              />

              {/* Layer 2: Tertiary offset shadow accent */}
              <div 
                className="absolute inset-0 rounded-[32px] sm:rounded-[38px] border border-white/5 bg-black/40 transform rotate-2 scale-[0.98] transition-transform duration-700 -z-20 pointer-events-none"
              />

              {/* Layer 3: Main Squircle Image with Smooth Crossfade Transition */}
              <div 
                className="relative w-full h-full rounded-[28px] sm:rounded-[34px] overflow-hidden border-2 border-white/20 bg-slate-900 shadow-2xl transition-all duration-700 cursor-pointer group"
                onClick={() => navigate(currentService.route)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentService.id}
                    src={currentService.image}
                    alt={currentService.heading}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FeaturedServicesShowcase;
