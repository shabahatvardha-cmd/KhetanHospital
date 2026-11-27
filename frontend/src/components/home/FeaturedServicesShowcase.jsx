import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Activity, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const FEATURED_SERVICES = [
  {
    id: 'robotic-knee-surgery',
    code: 'SURGERY 01',
    category: 'KNEE ARTHROPLASTY',
    heading: 'Robotic Knee Replacement',
    description: 'Sub-millimeter optical CT navigation ensuring exact 0.5mm implant alignment, preserving healthy collateral ligaments, and enabling rapid unassisted walking within 24 hours.',
    route: '/services/robotic-knee-surgery',
    image: '/images/surgeries/robotic-knee.webp',
    telemetry: '0.5mm Precision • 3D CT Planning',
    badges: ['±0.5mm Precision', 'Ligament Sparing', '24h Rapid Walking'],
    theme: {
      accent: '#38bdf8',
      textAccent: 'text-sky-400',
      borderAccent: 'border-sky-500',
      bgAccent: 'bg-sky-500',
    }
  },
  {
    id: 'knee-replacement',
    code: 'SURGERY 02',
    category: 'JOINT RECONSTRUCTION',
    heading: 'Total Knee Replacement',
    description: 'Kinematic joint reconstruction using modern 20+ year longevity implants engineered to eliminate chronic osteoarthritis pain and restore natural knee flexion.',
    route: '/services/knee-replacement',
    image: '/images/surgeries/knee-replacement.webp',
    telemetry: 'Kinematic Alignment • 30-Year Wear',
    badges: ['High Flexion Bearings', 'Pain Eradication', 'Kinematic Alignment'],
    theme: {
      accent: '#fbbf24',
      textAccent: 'text-amber-400',
      borderAccent: 'border-amber-500',
      bgAccent: 'bg-amber-500',
    }
  },
  {
    id: 'hip-replacement',
    code: 'SURGERY 03',
    category: 'HIP ARTHROPLASTY',
    heading: 'Total Hip Replacement',
    description: 'Muscle-sparing tissue-preserving arthroplasty with low-friction ceramic bearings, restoring smooth pain-free gait and lifelong joint mobility.',
    route: '/services/hip-replacement',
    image: '/images/surgeries/hip-replacement.webp',
    telemetry: 'Direct Anterior Approach • Ceramic Pivot',
    badges: ['Ceramic Bearing', 'Muscle-Sparing', 'Lifelong Stability'],
    theme: {
      accent: '#34d399',
      textAccent: 'text-emerald-400',
      borderAccent: 'border-emerald-500',
      bgAccent: 'bg-emerald-500',
    }
  },
  {
    id: 'shoulder-replacement',
    code: 'SURGERY 04',
    category: 'SHOULDER ARTHROSCOPY',
    heading: 'Shoulder Arthroscopy & Repair',
    description: 'Minimally invasive keyhole repair for rotator cuff tears and anatomical/reverse shoulder replacement for complete overhead reach restoration.',
    route: '/services/shoulder-replacement',
    image: '/images/surgeries/shoulder-surgery.webp',
    telemetry: 'Sub-Acromial Decompression • Keyhole Anchor',
    badges: ['Rotator Cuff Repair', 'Keyhole Arthroscopy', 'Overhead Reach'],
    theme: {
      accent: '#a78bfa',
      textAccent: 'text-purple-400',
      borderAccent: 'border-purple-500',
      bgAccent: 'bg-purple-500',
    }
  },
  {
    id: 'acl-surgery',
    code: 'SURGERY 05',
    category: 'SPORTS MEDICINE',
    heading: 'ACL & Sports Arthroscopy',
    description: 'Anatomic keyhole cruciate ligament repair and biological meniscus preservation following Olympic Committee return-to-sport protocols.',
    route: '/services/acl-surgery',
    image: '/images/surgeries/acl-surgery.webp',
    telemetry: 'J-Arch Landmark • IOC Switzerland Standard',
    badges: ['IOC Protocols', 'Hamstring Autograft', 'Return-to-Play'],
    theme: {
      accent: '#22d3ee',
      textAccent: 'text-cyan-400',
      borderAccent: 'border-cyan-500',
      bgAccent: 'bg-cyan-500',
    }
  },
  {
    id: 'spine-surgery',
    code: 'SURGERY 06',
    category: 'SPINE SPECIALTY',
    heading: 'Spine & Lumbar Decompression',
    description: 'Targeted neurological decompression and micro-endoscopic discectomy for disc herniation, sciatica relief, and spine stability.',
    route: '/services/spine-surgery',
    image: '/images/surgeries/spine-surgery.webp',
    telemetry: 'Micro-Endoscopic • Nerve Sparing',
    badges: ['Sciatica Relief', 'Micro-Decompression', 'Disc Stabilization'],
    theme: {
      accent: '#fb7185',
      textAccent: 'text-rose-400',
      borderAccent: 'border-rose-500',
      bgAccent: 'bg-rose-500',
    }
  },
  {
    id: 'trauma-surgery',
    code: 'SURGERY 07',
    category: 'TRAUMA & EMERGENCY',
    heading: 'Complex Trauma & Fracture Care',
    description: '24/7 emergency polytrauma stabilization, anatomical locking plate fixation, and delicate multi-fragment limb reconstruction.',
    route: '/services/trauma-surgery',
    image: '/images/surgeries/trauma-surgery.webp',
    telemetry: '24/7 Trauma Unit • Anatomical MIPO',
    badges: ['24/7 Emergency Care', 'Anatomical Plating', 'Polytrauma Unit'],
    theme: {
      accent: '#60a5fa',
      textAccent: 'text-blue-400',
      borderAccent: 'border-blue-500',
      bgAccent: 'bg-blue-500',
    }
  }
];

export const FeaturedServicesShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = FEATURED_SERVICES.length;
  const navigate = useNavigate();

  const current = FEATURED_SERVICES[currentIndex];
  const { theme } = current;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  return (
    <div
      className="relative w-full max-w-6xl mx-auto px-4 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Grand Visual Stage Container */}
      <div className="relative rounded-3xl bg-[#071326]/90 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-8 lg:p-10 transition-all duration-700">

        {/* Dynamic Vector Curves Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none" preserveAspectRatio="none">
            <motion.path
              animate={{
                d: [
                  "M -50 450 C 200 480 350 200 600 220 C 780 240 880 120 1050 180",
                  "M -50 430 C 220 460 370 220 580 200 C 760 220 900 140 1050 190",
                  "M -50 450 C 200 480 350 200 600 220 C 780 240 880 120 1050 180",
                ]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              stroke={theme.accent}
              strokeWidth="1.5"
              strokeDasharray="6 6"
              strokeOpacity="0.4"
              className="transition-colors duration-700"
            />
          </svg>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">

          {/* Left Column: Clinical Storytelling & Actionable Details (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              {/* Top Code Badge & Telemetry */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">
                  {current.code} &bull; {current.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800/80 text-[10px] font-mono font-semibold">
                  {current.telemetry}
                </span>
              </div>

              {/* Animated Headline & Clinical Narrative */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-2"
                >
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-tight">
                    {current.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-xl">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* 3 Parameter Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {current.badges.map((badge, bIdx) => (
                  <span
                    key={bIdx}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-slate-300 font-mono flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                    <span>{badge}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions & Surgery Navigator Dots */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
              <Link
                to={current.route}
                className="px-5 py-2.5 rounded-full text-slate-950 text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer"
                style={{
                  backgroundColor: theme.accent,
                  boxShadow: `0 4px 18px ${theme.accent}45`
                }}
              >
                <span>Explore Clinical Protocol</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous surgery"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-slate-400">
                  {currentIndex + 1} / {total}
                </span>
                <button
                  onClick={handleNext}
                  aria-label="Next surgery"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Large Cinematic Visual Frame (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div
              onClick={() => navigate(current.route)}
              className="relative aspect-[4/3] w-full max-w-md rounded-2xl overflow-hidden border-2 border-white/15 bg-[#020712] shadow-2xl cursor-pointer group"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.heading}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 select-none"
                  loading="eager"
                />
              </AnimatePresence>

              {/* Overlay Gradient & Telemetry Tag */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300">
                <span className="truncate">{current.heading}</span>
                <span className="text-cyan-400 font-bold shrink-0">View Details &rarr;</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FeaturedServicesShowcase;
