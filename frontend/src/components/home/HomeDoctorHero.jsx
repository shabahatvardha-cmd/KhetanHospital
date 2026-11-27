import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowUpRight, Award, Play } from 'lucide-react';
import { clinicInfo } from '../../data/clinicContent';
import { doctorImages } from '../../data/imageConfig';
import { WaveGradientText } from '../motion/WaveGradientText';
import { AnimatedCounter } from '../motion/AnimatedCounter';
import { TiltSpotlightCard } from '../motion/TiltSpotlightCard';

/**
 * 🏥 SCENE 1 — CINEMATIC DOCTOR HERO (EDITORIAL MEDICAL COVER)
 * 
 * Features:
 * - High-contrast editorial typography paired with Polpharma statement headline.
 * - Layered authentic cutout photography of Dr. Vatsal Khetan with restrained surgical telemetry.
 * - Scroll-linked depth: photo and typography shift with scroll progress as the user moves to Scene 2.
 * - 4 Frosted glass benchmark tiles with spring-physics 3D tilt and live dynamic counting numbers.
 */
export const HomeDoctorHero = ({ onBookClick, onWatchReelsClick }) => {
  const heroRef = useRef(null);

  // Scroll progression within the hero viewport
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Scroll-linked transformations
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.85, 0.4]);

  const scrollToCarousel = () => {
    document.getElementById('explore-carousel')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[calc(100vh-60px)] lg:h-[calc(100vh-60px)] flex flex-col justify-between pt-2 sm:pt-4 pb-2 select-none overflow-hidden text-[#F8FAFC]"
    >
      {/* Restrained Surgical Coordinate Crosshairs (Subtle Precision Backdrop) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="w-full h-full opacity-15" viewBox="0 0 1200 800" fill="none">
          <line x1="600" y1="40" x2="600" y2="760" stroke="#38BDF8" strokeWidth="0.75" strokeDasharray="4 8" />
          <line x1="100" y1="400" x2="1100" y2="400" stroke="#38BDF8" strokeWidth="0.75" strokeDasharray="4 8" />
          <circle cx="600" cy="400" r="180" stroke="#38BDF8" strokeWidth="0.5" strokeDasharray="2 12" />
          <circle cx="600" cy="400" r="320" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.4" />
        </svg>
      </div>

      {/* Main Content Area */}
      <motion.div
        style={{ opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

          {/* Left Column: Doctor Identity & Expressive Statement Typography (7 Cols) */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-3 sm:space-y-4"
          >
            {/* Precision Standard Monospace Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10.5px] font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Purvanchal Robotic Standards &bull; UK Governed</span>
            </div>

            {/* Doctor's Name & Editorial Statement */}
            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight-editorial uppercase leading-[0.95] text-white">
                <WaveGradientText words={["Dr.", "Vatsal", "Khetan"]} />
              </div>

              {/* Verified Degrees in Monospace Technical Chips */}
              <p className="text-[10.5px] sm:text-xs font-mono font-medium text-slate-300 tracking-tight sm:tracking-normal leading-relaxed pt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-white font-semibold">MBBS</span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-white font-semibold">MS (Ortho)</span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-white font-semibold">MRCS</span>
                <span className="text-slate-500">&bull;</span>
                <span className="font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/80">
                  FRCS (Edinburgh)
                </span>
                <span className="text-slate-500">&bull;</span>
                <span className="font-bold text-sky-300 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/80">
                  M.Ch Knee (UK)
                </span>
                <span className="text-slate-500">&bull;</span>
                <span className="whitespace-nowrap font-semibold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80">
                  IOC Dip Sports Med (Switzerland)
                </span>
              </p>
            </div>

            {/* Statement Proposition */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 max-w-xl">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                <span className="font-semibold text-white">"Sub-millimeter precision isn't discovered. It's engineered."</span> Bringing UK Royal College surgical governance, sub-millimeter robotic precision, and dedicated arthroscopic sports rehabilitation directly to Gorakhpur and Eastern Uttar Pradesh.
              </p>
            </div>

            {/* Action Triggers — High-Voltage Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {onWatchReelsClick && (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={onWatchReelsClick}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 text-xs sm:text-sm font-black tracking-wide shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <Play className="w-4 h-4 text-slate-950 fill-current" />
                  <span>Doctor's Introduction</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToCarousel}
                className="px-6 py-3 rounded-full border border-white/20 bg-white/[0.05] backdrop-blur-md text-white text-xs sm:text-sm font-semibold hover:border-cyan-400/60 hover:bg-white/[0.1] shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Explore Specialties</span>
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Layered Doctor Cutout Photography with Scroll-Linked Parallax (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-xs sm:max-w-sm flex items-center justify-center will-change-transform"
            >
              {/* Layer 1: Ambient Medical Aura Bloom */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.35, 0.65, 0.35],
                }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-6 sm:-inset-8 bg-gradient-to-tr from-cyan-500/25 via-sky-400/30 to-blue-600/25 rounded-full blur-3xl -z-10 pointer-events-none"
              />

              {/* Layer 2: Rotating Robotic Optical Calibration Ring (Clockwise) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 sm:-inset-10 -z-10 pointer-events-none flex items-center justify-center opacity-60 sm:opacity-75"
              >
                <svg viewBox="0 0 400 400" className="w-full h-full text-cyan-400/50">
                  <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" />
                  <circle cx="200" cy="200" r="194" fill="none" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
                  <circle cx="200" cy="20" r="3.5" fill="#38bdf8" />
                  <circle cx="380" cy="200" r="3.5" fill="#38bdf8" />
                  <circle cx="200" cy="380" r="3.5" fill="#38bdf8" />
                  <circle cx="20" cy="200" r="3.5" fill="#38bdf8" />
                </svg>
              </motion.div>

              {/* Layer 3: Counter-Rotating Fine Alignment Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-10 sm:-inset-12 -z-10 pointer-events-none flex items-center justify-center opacity-40"
              >
                <svg viewBox="0 0 440 440" className="w-full h-full text-teal-400/40">
                  <circle cx="220" cy="220" r="210" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 12" />
                </svg>
              </motion.div>

              {/* Layer 4: Doctor Authentic Cutout with Continuous Breathing Motion */}
              <div className="relative flex flex-col items-center">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.018, 1],
                  }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex items-end justify-center"
                >
                  <img
                    src={doctorImages.hero}
                    alt="Dr. Vatsal Khetan — Senior Robotic Knee & Orthopaedic Surgeon"
                    className="w-auto h-auto max-h-[260px] sm:max-h-[290px] lg:max-h-[310px] object-contain drop-shadow-[0_20px_40px_rgba(0,188,212,0.4)] select-none pointer-events-none"
                    loading="eager"
                  />
                </motion.div>

                {/* Layer 5: Floating FRCS Accreditation Badge with Independent Float */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[94%] sm:w-[90%] p-2.5 rounded-2xl bg-[#051329]/90 backdrop-blur-xl border border-cyan-500/40 shadow-2xl flex items-center gap-2.5 z-20"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-sky-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shrink-0">
                    FRCS
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-black text-white leading-tight truncate">
                      Dr. Vatsal Khetan
                    </span>
                    <span className="text-[10px] text-cyan-300 font-bold leading-tight truncate">
                      Royal College Fellow (Edinburgh) &bull; M.Ch (UK)
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 4 Frosted Glass Benchmark Metrics Strip with 3D Tilt & Animated Counters */}
        <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <TiltSpotlightCard
            delay={0.1}
            maxTilt={6}
            spotlightColor="rgba(56, 189, 248, 0.16)"
            borderColor="rgba(56, 189, 248, 0.4)"
            className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 transition-colors"
          >
            <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
              <AnimatedCounter value={clinicInfo.stats.experienceYears} />
            </div>
            <div className="text-[10.5px] font-bold text-cyan-300 uppercase tracking-wide">
              Clinical Experience
            </div>
            <div className="text-[9.5px] text-slate-400 font-light">
              UK Fellowship &amp; NHS Trained
            </div>
          </TiltSpotlightCard>

          <TiltSpotlightCard
            delay={0.2}
            maxTilt={6}
            spotlightColor="rgba(56, 189, 248, 0.22)"
            borderColor="rgba(56, 189, 248, 0.5)"
            className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 transition-colors"
          >
            <div className="text-xl sm:text-2xl font-black text-cyan-400 tracking-tight">
              <AnimatedCounter value={clinicInfo.stats.kneeReplacements} />
            </div>
            <div className="text-[10.5px] font-bold text-cyan-300 uppercase tracking-wide">
              Robotic Knee Surgeries
            </div>
            <div className="text-[9.5px] text-slate-400 font-light">
              Sub-Millimeter Precision
            </div>
          </TiltSpotlightCard>

          <TiltSpotlightCard
            delay={0.3}
            maxTilt={6}
            spotlightColor="rgba(56, 189, 248, 0.16)"
            borderColor="rgba(56, 189, 248, 0.4)"
            className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 transition-colors"
          >
            <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
              <AnimatedCounter value={clinicInfo.stats.surgeries} />
            </div>
            <div className="text-[10.5px] font-bold text-cyan-300 uppercase tracking-wide">
              Procedures Completed
            </div>
            <div className="text-[9.5px] text-slate-400 font-light">
              Trauma &amp; Joint Care
            </div>
          </TiltSpotlightCard>

          <TiltSpotlightCard
            delay={0.4}
            maxTilt={6}
            spotlightColor="rgba(52, 211, 153, 0.22)"
            borderColor="rgba(52, 211, 153, 0.5)"
            className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-emerald-400/50 transition-colors"
          >
            <div className="text-xl sm:text-2xl font-black text-emerald-400 tracking-tight">
              <AnimatedCounter value="100%" />
            </div>
            <div className="text-[10.5px] font-bold text-emerald-300 uppercase tracking-wide">
              UK Governance
            </div>
            <div className="text-[9.5px] text-slate-400 font-light">
              Sterility &amp; Rapid Mobility
            </div>
          </TiltSpotlightCard>
        </div>
      </motion.div>

      {/* Pure Scroll Down Indicator */}
      <div className="w-full flex justify-center pt-1 pb-1 shrink-0 z-10">
        <button
          onClick={scrollToCarousel}
          aria-label="Scroll to Navigation Carousel"
          className="p-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer group"
        >
          <ChevronDown className="w-5 h-5 animate-bounce text-slate-400 group-hover:text-cyan-400" />
        </button>
      </div>
    </section>
  );
};

export default HomeDoctorHero;
