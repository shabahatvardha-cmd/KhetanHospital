import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ShieldCheck,
  Play,
  ArrowRight,
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';
import { clinicInfo } from '../../data/clinicContent';
import { doctorImages } from '../../data/imageConfig';
import { TiltSpotlightCard } from '../motion/TiltSpotlightCard';
import { AnimatedCounter } from '../motion/AnimatedCounter';
import { WaveGradientText } from '../motion/WaveGradientText';

/**
 * 🎬 HomeDoctorHero (Connected Kinetic Opening)
 * 
 * Strict Doctor Image Rule: Uses authentic original `doctorImages.hero` (/images/dr-vatsal-main.webp).
 * 
 * Choreographed Sequences:
 * 1. ENTRANCE (When page opens):
 *    - Left text (UK badge, name, description, actions) slides in from very left end (x: -100vw).
 *    - Surgical coordinate rings slide in from right side (x: 100vw, delay: 0.35s).
 *    - Doctor's original picture slides in from right side (x: 100vw, delay: 0.55s) and adjusts inside the rings.
 *    - Bottom metrics (12+, 1,500+, 10,000+, 100%) slide up from the bottom (y: 100%, delay: 0.85s).
 * 
 * 2. SCROLL EXIT (When user scrolls down):
 *    - Left text slides back out to the left as scroll increases.
 *    - Rings and Doctor picture slide back out to the right as scroll increases.
 *    - Bottom metrics slide back down to the bottom as scroll increases.
 *    - All elements smoothly return when user scrolls back up.
 */
export const HomeDoctorHero = ({ onBookClick, onWatchReelsClick }) => {
  const heroRef = useRef(null);

  // Scroll progression tied strictly to this Hero viewport
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // ── Scroll Exit Transforms (moves items back to their sides as user scrolls down) ──
  const leftScrollX = useTransform(scrollYProgress, [0, 0.75], [0, -600]);
  const leftScrollOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const ringsScrollX = useTransform(scrollYProgress, [0, 0.75], [0, 650]);
  const ringsScrollOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const photoScrollX = useTransform(scrollYProgress, [0, 0.75], [0, 700]);
  const photoScrollOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const bottomScrollY = useTransform(scrollYProgress, [0, 0.75], [0, 320]);
  const bottomScrollOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const scrollToNext = () => {
    document.getElementById('hospital-marquee-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[calc(100vh-60px)] lg:h-[calc(100vh-60px)] bg-[#030712] text-[#F8FAFC] flex flex-col justify-between pt-3 sm:pt-6 pb-2 select-none overflow-hidden font-sans border-b border-white/10"
    >
      {/* ── AMBIENT SCIENTIFIC LIGHTING & MICRO-GRID BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#38BDF8]/15 blur-[160px] -z-10" />
        <div className="absolute bottom-1/3 left-1/5 w-[420px] h-[420px] rounded-full bg-[#08284D]/40 blur-[150px] -z-10" />
        <div className="absolute top-1/2 left-1/3 w-[380px] h-[380px] rounded-full bg-[#10B981]/10 blur-[170px] -z-10" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

          {/* ═════════════════════════════════════════════════════════════════
              LEFT COLUMN: UK ACCREDITATION, DOCTOR IDENTITY & EDITORIAL TEXT
              • Entrance: Slides in from VERY LEFT end (-100vw)
              • Scroll Exit: Slides back to the left (-600px)
          ═════════════════════════════════════════════════════════════════ */}
          <motion.div
            style={{ x: leftScrollX, opacity: leftScrollOpacity }}
            className="lg:col-span-7 space-y-3 sm:space-y-4"
          >
            <motion.div
              initial={{ x: '-100vw', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="space-y-3 sm:space-y-4"
            >
              {/* UK Royal College Specialty Ribbon */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-[10.5px] sm:text-xs font-mono text-cyan-300 shadow-sm shadow-cyan-950/50">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-semibold tracking-wider uppercase">
                  ROYAL COLLEGE OF SURGEONS (EDINBURGH) • UK NHS FELLOWSHIP
                </span>
              </div>

              {/* Doctor Name & Editorial Statement */}
              <div className="space-y-1 sm:space-y-1.5">
                <div className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]">
                  <WaveGradientText words={["Dr.", "Vatsal", "Khetan"]} />
                </div>

                {/* Verified Medical Degrees & Fellowships */}
                <p className="text-[11px] sm:text-xs font-mono text-slate-300 tracking-tight leading-relaxed pt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-white font-semibold">MBBS</span>
                  <span className="text-slate-600">&bull;</span>
                  <span className="text-white font-semibold">MS (Ortho)</span>
                  <span className="text-slate-600">&bull;</span>
                  <span className="text-white font-semibold">MRCS</span>
                  <span className="text-slate-600">&bull;</span>
                  <span className="font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                    FRCS (Edinburgh)
                  </span>
                  <span className="text-slate-600">&bull;</span>
                  <span className="font-bold text-sky-300">M.Ch Knee (UK)</span>
                  <span className="text-slate-600">&bull;</span>
                  <span className="text-emerald-400 font-semibold">IOC Dip Sports Med (Switzerland)</span>
                </p>
              </div>

              {/* Concise Narrative Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light max-w-xl">
                Bringing UK Royal College surgical governance, sub-millimeter robotic precision, and dedicated arthroscopic joint restoration directly to Gorakhpur and Eastern Uttar Pradesh.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onBookClick && onBookClick()}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>Book Priority Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {onWatchReelsClick && (
                  <button
                    type="button"
                    onClick={onWatchReelsClick}
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                    <span>Doctor's Introduction</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* ═════════════════════════════════════════════════════════════════
              RIGHT COLUMN: SURGICAL RINGS & ORIGINAL DOCTOR PHOTO CUTOUT
              • Rings Entrance: Slides in from VERY RIGHT side (+100vw, delay 0.35s)
              • Photo Entrance: Slides in from VERY RIGHT side (+100vw, delay 0.55s)
              • STRICT ASSET: Preserves original `doctorImages.hero` (/images/dr-vatsal-main.webp)
              • Scroll Exit: Both slide back out to the right (+650px / +700px)
          ═════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 relative flex justify-center items-center min-h-[290px] sm:min-h-[360px] lg:min-h-[390px]">
            
            {/* 1. SURGICAL OPTICAL RINGS (Slides in first from right) */}
            <motion.div
              style={{ x: ringsScrollX, opacity: ringsScrollOpacity }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <motion.div
                initial={{ x: '100vw', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                className="relative w-[300px] sm:w-[380px] lg:w-[410px] h-[300px] sm:h-[380px] lg:h-[410px] flex items-center justify-center"
              >
                {/* Outer Rotating Calibration Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <svg viewBox="0 0 400 400" className="w-full h-full text-cyan-500/35">
                    <circle cx="200" cy="200" r="185" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" />
                    <circle cx="200" cy="200" r="195" fill="none" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" />
                    <circle cx="200" cy="15" r="3.5" fill="#38bdf8" />
                    <circle cx="385" cy="200" r="3.5" fill="#38bdf8" />
                    <circle cx="200" cy="385" r="3.5" fill="#38bdf8" />
                    <circle cx="15" cy="200" r="3.5" fill="#38bdf8" />
                  </svg>
                </motion.div>

                {/* Inner Counter-Rotating Target Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-6 flex items-center justify-center"
                >
                  <svg viewBox="0 0 350 350" className="w-full h-full text-teal-400/30">
                    <circle cx="175" cy="175" r="160" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 10" />
                    <circle cx="175" cy="15" r="2.5" fill="#10b981" />
                    <circle cx="335" cy="175" r="2.5" fill="#10b981" />
                  </svg>
                </motion.div>

                {/* Ambient Center Glow */}
                <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-cyan-500/25 to-teal-500/20 blur-2xl -z-10" />
              </motion.div>
            </motion.div>

            {/* 2. DOCTOR ORIGINAL PHOTO CUTOUT & FRCS BADGE (Slides in after rings from right, then adjusts) */}
            <motion.div
              style={{ x: photoScrollX, opacity: photoScrollOpacity }}
              className="relative z-10 flex flex-col items-center justify-end"
            >
              <motion.div
                initial={{ x: '100vw', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
                className="relative flex flex-col items-center"
              >
                {/* Doctor Portrait Image (EXACT ORIGINAL: doctorImages.hero) with Soft Organic Breathing */}
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    scale: [1, 1.015, 1],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative flex items-end justify-center"
                >
                  <img
                    src={doctorImages.hero}
                    alt="Dr. Vatsal Khetan — FRCS Edinburgh, M.Ch Knee UK"
                    className="w-auto h-auto max-h-[260px] sm:max-h-[300px] lg:max-h-[330px] object-contain drop-shadow-[0_20px_35px_rgba(56,189,248,0.25)] select-none pointer-events-none"
                    loading="eager"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            BOTTOM PART: 4 CLINICAL BENCHMARK METRIC CARDS
            (12+, 1,500+, 10,000+, 100%)
            • Entrance: Slides UP from bottom (y: 100%, delay: 0.85s)
            • Scroll Exit: Slides back DOWN to bottom (y: +320px)
        ═════════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{ y: bottomScrollY, opacity: bottomScrollOpacity }}
          className="mt-3 sm:mt-5 pt-2.5 sm:pt-3.5 border-t border-white/10"
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4"
          >
            {/* Metric 1: 12+ Experience */}
            <TiltSpotlightCard
              maxTilt={5}
              spotlightColor="rgba(56, 189, 248, 0.20)"
              className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-cyan-400/50 transition-colors"
            >
              <div className="text-lg sm:text-2xl font-black text-white font-mono tracking-tight">
                <AnimatedCounter value="12+" />
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-cyan-300 uppercase tracking-wide">
                Clinical Experience
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 font-light">
                UK Fellowship &amp; NHS Trained
              </div>
            </TiltSpotlightCard>

            {/* Metric 2: 1,500+ Knee Replacements */}
            <TiltSpotlightCard
              maxTilt={5}
              spotlightColor="rgba(56, 189, 248, 0.20)"
              className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-cyan-400/50 transition-colors"
            >
              <div className="text-lg sm:text-2xl font-black text-cyan-300 font-mono tracking-tight">
                <AnimatedCounter value="1,500+" />
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-slate-200 uppercase tracking-wide">
                Knee Replacements
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 font-light">
                Robotic &amp; Kinematic Alignment
              </div>
            </TiltSpotlightCard>

            {/* Metric 3: 10,000+ Surgeries */}
            <TiltSpotlightCard
              maxTilt={5}
              spotlightColor="rgba(56, 189, 248, 0.20)"
              className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-cyan-400/50 transition-colors"
            >
              <div className="text-lg sm:text-2xl font-black text-white font-mono tracking-tight">
                <AnimatedCounter value="10,000+" />
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-cyan-300 uppercase tracking-wide">
                Surgeries Completed
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 font-light">
                Joints, Spine &amp; Complex Trauma
              </div>
            </TiltSpotlightCard>

            {/* Metric 4: 100% UK Surgical Governance */}
            <TiltSpotlightCard
              maxTilt={5}
              spotlightColor="rgba(16, 185, 129, 0.22)"
              borderColor="rgba(16, 185, 129, 0.4)"
              className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-emerald-400/50 transition-colors"
            >
              <div className="text-lg sm:text-2xl font-black text-emerald-400 font-mono tracking-tight">
                <AnimatedCounter value="100%" />
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-slate-200 uppercase tracking-wide">
                UK Surgical Governance
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 font-light">
                Sterility &amp; 24-Hour Ambulation
              </div>
            </TiltSpotlightCard>
          </motion.div>
        </motion.div>

      </div>

      {/* ── SUBTLE DOWNWARD HINT ── */}
      <div className="w-full flex justify-center pt-1 pb-1 shrink-0 z-10">
        <button
          onClick={scrollToNext}
          aria-label="Scroll to Next Section"
          className="p-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer group"
        >
          <ChevronDown className="w-5 h-5 animate-bounce text-slate-400 group-hover:text-cyan-400" />
        </button>
      </div>
    </section>
  );
};

export default HomeDoctorHero;
