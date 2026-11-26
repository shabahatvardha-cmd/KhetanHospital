import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { AnimatedWordReveal } from '../motion/AnimatedWordReveal';
import { doctorImages } from '../../data/imageConfig';

/**
 * 🏥 Verified Clinical Pillars with Permanent Color Identities
 */
const INITIAL_PILLARS = [
  {
    id: 'frcs',
    title: 'FRCS Edinburgh',
    desc: 'UK Royal College verified surgical governance and clinical rigor.',
    icon: Award,
    badge: 'Royal College Fellow',
    colorIndex: 0,
  },
  {
    id: 'robotic',
    title: 'Robotic Precision',
    desc: 'Sub-millimeter implant alignment preserving healthy bone and ligaments.',
    icon: Sparkles,
    badge: 'Sub-Millimeter Tech',
    colorIndex: 1,
  },
  {
    id: 'mobility',
    title: 'Rapid Mobility',
    desc: 'Dedicated recovery pathways designed for safe, same-day mobilization.',
    icon: ShieldCheck,
    badge: 'Same-Day Mobilization',
    colorIndex: 2,
  },
];

/**
 * 🎨 3 Premium Color Patterns (Cycles every shuffle, repeats after 3 shuffles)
 */
const COLOR_PATTERNS = [
  // Pattern 0: Sapphire Blue, Royal Indigo, Emerald Health
  [
    {
      cardBg: 'bg-gradient-to-br from-white via-sky-50 to-sky-100/70',
      border: 'border-sky-400',
      shadow: 'shadow-[0_8px_30px_rgba(14,165,233,0.22)]',
      iconBg: 'bg-sky-500 text-white shadow-sky-300',
      tagText: 'text-sky-800',
      accentDot: 'bg-sky-500',
    },
    {
      cardBg: 'bg-gradient-to-br from-white via-indigo-50 to-indigo-100/70',
      border: 'border-indigo-400',
      shadow: 'shadow-[0_8px_30px_rgba(99,102,241,0.22)]',
      iconBg: 'bg-indigo-600 text-white shadow-indigo-300',
      tagText: 'text-indigo-800',
      accentDot: 'bg-indigo-600',
    },
    {
      cardBg: 'bg-gradient-to-br from-white via-emerald-50 to-emerald-100/70',
      border: 'border-emerald-400',
      shadow: 'shadow-[0_8px_30px_rgba(16,185,129,0.22)]',
      iconBg: 'bg-emerald-600 text-white shadow-emerald-300',
      tagText: 'text-emerald-800',
      accentDot: 'bg-emerald-600',
    },
  ],
  // Pattern 1: Royal Purple, Electric Cyan, Warm Amber
  [
    {
      cardBg: 'bg-gradient-to-br from-white via-purple-50 to-purple-100/70',
      border: 'border-purple-400',
      shadow: 'shadow-[0_8px_30px_rgba(168,85,247,0.22)]',
      iconBg: 'bg-purple-600 text-white shadow-purple-300',
      tagText: 'text-purple-800',
      accentDot: 'bg-purple-600',
    },
    {
      cardBg: 'bg-gradient-to-br from-white via-cyan-50 to-cyan-100/70',
      border: 'border-cyan-400',
      shadow: 'shadow-[0_8px_30px_rgba(6,182,212,0.22)]',
      iconBg: 'bg-cyan-600 text-white shadow-cyan-300',
      tagText: 'text-cyan-800',
      accentDot: 'bg-cyan-600',
    },
    {
      cardBg: 'bg-gradient-to-br from-white via-amber-50 to-amber-100/70',
      border: 'border-amber-400',
      shadow: 'shadow-[0_8px_30px_rgba(245,158,11,0.22)]',
      iconBg: 'bg-amber-500 text-white shadow-amber-300',
      tagText: 'text-amber-800',
      accentDot: 'bg-amber-500',
    },
  ],
  // Pattern 2: Rose Coral, Cobalt Blue, Mint Jade
  [
    {
      cardBg: 'bg-gradient-to-br from-white via-rose-50 to-rose-100/70',
      border: 'border-rose-400',
      shadow: 'shadow-[0_8px_30px_rgba(244,63,94,0.22)]',
      iconBg: 'bg-rose-500 text-white shadow-rose-300',
      tagText: 'text-rose-800',
      accentDot: 'bg-rose-500',
    },
    {
      cardBg: 'bg-gradient-to-br from-white via-blue-50 to-blue-100/70',
      border: 'border-blue-500',
      shadow: 'shadow-[0_8px_30px_rgba(59,130,246,0.22)]',
      iconBg: 'bg-blue-600 text-white shadow-blue-300',
      tagText: 'text-blue-800',
      accentDot: 'bg-blue-600',
    },
    {
      cardBg: 'bg-gradient-to-br from-white via-teal-50 to-teal-100/70',
      border: 'border-teal-400',
      shadow: 'shadow-[0_8px_30px_rgba(20,184,166,0.22)]',
      iconBg: 'bg-teal-600 text-white shadow-teal-300',
      tagText: 'text-teal-800',
      accentDot: 'bg-teal-600',
    },
  ],
];

/**
 * ♾️ Continuous Figure-8 (Lemniscate) Motion:
 * Trajectory: Center -> UP -> LEFT -> DOWN -> Center -> UP -> RIGHT -> DOWN -> Center
 */
const FIGURE_8_X = [0, -14, -22, -14, 0, 14, 22, 14, 0];
const FIGURE_8_Y = [0, -18, -4, 18, 0, -18, -4, 18, 0];

/**
 * 🏥 SECTION 3 — HOSPITAL INTRODUCTION & FACILITY
 */
export const HomeIntroSection = forwardRef((props, forwardedRef) => {
  const localRef = useRef(null);
  const sectionRef = forwardedRef || localRef;

  const [pillars, setPillars] = useState(INITIAL_PILLARS);
  const [patternIndex, setPatternIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isInView = useInView(sectionRef, { amount: 0.15 });

  // Shuffle handler: cyclically rotate cards and advance pattern index
  const triggerShuffle = () => {
    setPatternIndex((prev) => (prev + 1) % 3);
    setPillars((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  useEffect(() => {
    if (!isInView || isPaused) return;

    // Slow and gentle shuffle cycle
    const timer = setInterval(() => {
      triggerShuffle();
    }, 5500);

    return () => clearInterval(timer);
  }, [isInView, isPaused]);

  return (
    <section
      id="hospital-intro"
      ref={sectionRef}
      className="relative w-full min-h-[calc(100vh-60px)] lg:h-[calc(100vh-60px)] bg-slate-50 border-t border-slate-200/90 select-none flex flex-col justify-center py-4 sm:py-6 lg:py-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Hospital Mission & 3 Dynamic Shuffling Pillars (7 Cols) */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            
            {/* Large Animated Heading */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#08284d] tracking-tight-editorial uppercase leading-[1.08]">
              <AnimatedWordReveal
                text="Pioneering Orthopaedic & Robotic Joint Excellence in Purvanchal"
                delay={0.1}
                stagger={0.04}
              />
            </h2>

            {/* Narrative description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light max-w-xl">
              Founded by UK-trained specialist <strong className="text-slate-800 font-semibold">Dr. Vatsal Khetan</strong> (FRCS Edinburgh, M.Ch Knee UK), Khetan Hospital brings international joint replacement standards, sub-millimeter robotic precision, and dedicated arthroscopic sports rehabilitation directly to Gorakhpur and Eastern Uttar Pradesh.
            </p>

            {/* 3 Clinical Pillars: Complete Cards Moving in Shape of 8 (Up -> Left -> Down) */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                const theme = COLOR_PATTERNS[patternIndex][pillar.colorIndex];

                return (
                  <motion.div
                    key={pillar.id}
                    layout="position"
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 75,
                        damping: 15,
                        mass: 1.4,
                      },
                    }}
                    className="relative cursor-default"
                  >
                    {/* Inner Card executing continuous, slow Figure-8 motion (Up -> Left -> Down) */}
                    <motion.div
                      animate={{
                        x: FIGURE_8_X,
                        y: FIGURE_8_Y,
                      }}
                      transition={{
                        duration: 10,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: -(index * 3.33),
                      }}
                      whileHover={{ scale: 1.03 }}
                      className={`p-3.5 sm:p-4 rounded-xl border-2 transition-colors duration-700 flex flex-col justify-between ${theme.cardBg} ${theme.border} ${theme.shadow} min-h-[135px]`}
                    >
                      <div>
                        {/* Top icon and pulsing accent dot */}
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-700 ${theme.iconBg} shadow-sm shrink-0`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className={`w-2 h-2 rounded-full transition-all duration-700 ${theme.accentDot} animate-pulse`} />
                        </div>

                        {/* Card Title */}
                        <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#08284d]">
                          {pillar.title}
                        </h3>

                        {/* Card Description */}
                        <p className="text-[11px] text-slate-600 mt-1 leading-snug font-light">
                          {pillar.desc}
                        </p>
                      </div>

                      {/* Bottom Micro-Badge */}
                      <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                        <span className={`text-[9px] font-mono font-bold tracking-wider uppercase transition-colors duration-700 ${theme.tagText}`}>
                          {pillar.badge}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Advanced Modular OT Photograph (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
              <div className="relative h-[220px] sm:h-[250px] lg:h-[280px] w-full overflow-hidden bg-slate-100">
                <img
                  src="/images/backgrounds/modular-ot.jpg"
                  alt="Khetan Hospital Advanced Modular OT"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Floating Doctor Spotlight Card */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/80 shadow-md flex items-center gap-2.5">
                  <img
                    src={doctorImages.hero}
                    alt="Dr. Vatsal Khetan"
                    className="w-9 h-9 rounded-lg object-contain bg-sky-50 border-2 border-sky-500 shadow-sm shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-extrabold text-[#08284d] truncate">
                      Dr. Vatsal Khetan
                    </span>
                    <span className="text-[10px] text-sky-700 font-bold truncate">
                      MBBS, MS, MRCS, FRCS (Edinburgh), M.Ch Knee (UK)
                    </span>
                    <span className="text-[9px] text-slate-500 font-light flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                      <span>Purvanchal Surgical Director</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

HomeIntroSection.displayName = 'HomeIntroSection';

export default HomeIntroSection;
