import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowUpRight, Award, Play, Sparkles, ShieldCheck, Activity } from 'lucide-react';
import { clinicInfo } from '../../data/clinicContent';
import { doctorImages } from '../../data/imageConfig';
import { WaveGradientText } from '../motion/WaveGradientText';

/**
 * 🏥 SECTION 1 — DOCTOR-FOCUSED HERO (POLPHARMA BIOLOGICS BIOTECH THEME)
 * 
 * Deep midnight biotech atmosphere, laser telemetry orbit rings,
 * Swiss statement typography: "Sub-millimeter precision isn't discovered. It's engineered."
 * authentic hospital photography of Dr. Vatsal Khetan, and frosted glass benchmark tiles.
 */
export const HomeDoctorHero = ({ onBookClick, onWatchReelsClick }) => {
  const scrollToCarousel = () => {
    document.getElementById('explore-carousel')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-60px)] lg:h-[calc(100vh-60px)] bg-gradient-to-b from-[#030712] via-[#051329] to-[#030712] flex flex-col justify-between pt-2 sm:pt-4 pb-2 select-none overflow-hidden text-white">
      {/* Ambient Radial Glowing Light Fields */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[140px] -z-10" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[130px] -z-10" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      {/* Main Content Area */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

          {/* Left Column: Doctor Identity & Expressive Statement Typography (7 Cols) */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">

            {/* Biotech Technical Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10.5px] font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Purvanchal Robotic Standards &bull; UK Governed</span>
            </div>

            {/* Polpharma Statement Headline */}
            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight-editorial uppercase leading-[0.95] text-white">
                <WaveGradientText words={["Dr.", "Vatsal", "Khetan"]} />
              </div>

              {/* Degrees and Fellowships in Monospace Technical Chips */}
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

            {/* Signature Polpharma Biotech Subtitle */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 max-w-xl">
              <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed font-light">
                <span className="font-semibold text-white">"Sub-millimeter precision isn't discovered. It's engineered."</span> Bringing UK Royal College surgical governance, sub-millimeter robotic precision, and dedicated arthroscopic sports rehabilitation directly to Gorakhpur and Eastern Uttar Pradesh.
              </p>
            </div>

            {/* Action Triggers — High-Voltage Biotech Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {onWatchReelsClick && (
                <button
                  type="button"
                  onClick={onWatchReelsClick}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 text-xs sm:text-sm font-black tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <Play className="w-4 h-4 text-slate-950 fill-current" />
                  <span>Doctor's Introduction</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              )}

              <button
                onClick={scrollToCarousel}
                className="px-6 py-3 rounded-full border border-white/20 bg-white/[0.05] backdrop-blur-md text-white text-xs sm:text-sm font-semibold hover:border-cyan-400/60 hover:bg-white/[0.1] shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Explore Specialties</span>
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Doctor Portrait Photo with Laser Telemetry Orbit Rings (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-xs sm:max-w-sm flex items-center justify-center"
            >
              {/* 1. Ambient Pulsing Medical Aura Halo */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.35, 0.65, 0.35],
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-6 sm:-inset-8 bg-gradient-to-tr from-cyan-500/25 via-sky-400/30 to-blue-600/25 rounded-full blur-3xl -z-10 pointer-events-none"
              />

              {/* 2. Rotating Robotic Surgical Precision Orbit Ring (Clockwise) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 34,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-8 sm:-inset-10 -z-10 pointer-events-none flex items-center justify-center opacity-60 sm:opacity-75"
              >
                <svg viewBox="0 0 400 400" className="w-full h-full text-cyan-400/50">
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 8"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="194"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    strokeOpacity="0.5"
                  />
                  <circle cx="200" cy="20" r="3.5" fill="#38bdf8" />
                  <circle cx="380" cy="200" r="3.5" fill="#38bdf8" />
                  <circle cx="200" cy="380" r="3.5" fill="#38bdf8" />
                  <circle cx="20" cy="200" r="3.5" fill="#38bdf8" />
                </svg>
              </motion.div>

              {/* 3. Outer Counter-Rotating Calibration Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 46,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-10 sm:-inset-12 -z-10 pointer-events-none flex items-center justify-center opacity-40"
              >
                <svg viewBox="0 0 440 440" className="w-full h-full text-teal-400/40">
                  <circle
                    cx="220"
                    cy="220"
                    r="210"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="2 12"
                  />
                </svg>
              </motion.div>

              {/* 4. Doctor Authentic Cutout with Continuous Breathing Motion */}
              <div className="relative flex flex-col items-center">
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                    scale: [1, 1.015, 1],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex items-end justify-center"
                >
                  <img
                    src={doctorImages.hero}
                    alt="Dr. Vatsal Khetan — Robotic Knee & Orthopaedic Surgeon"
                    className="w-auto h-auto max-h-[260px] sm:max-h-[290px] lg:max-h-[310px] object-contain drop-shadow-[0_20px_35px_rgba(0,188,212,0.35)] select-none pointer-events-none"
                    loading="eager"
                  />
                </motion.div>

                {/* 5. Floating FRCS Accreditation Badge in Frosted Glass */}
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
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

        {/* Polpharma 4-Column Frosted Glass Benchmark Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
        >
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 transition-colors space-y-0.5">
            <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {clinicInfo.stats.experienceYears}
            </div>
            <div className="text-[10.5px] font-bold text-cyan-300 uppercase tracking-wide">
              Clinical Experience
            </div>
            <div className="text-[9.5px] text-slate-400 font-light">
              UK Fellowship &amp; NHS Trained
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 transition-colors space-y-0.5">
            <div className="text-xl sm:text-2xl font-black text-cyan-400 tracking-tight">
              {clinicInfo.stats.kneeReplacements}
            </div>
            <div className="text-[10.5px] font-bold text-cyan-300 uppercase tracking-wide">
              Robotic Knee Surgeries
            </div>
            <div className="text-[9.5px] text-slate-400 font-light">
              Sub-Millimeter Precision
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 transition-colors space-y-0.5">
            <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {clinicInfo.stats.surgeries}
            </div>
            <div className="text-[10.5px] font-bold text-cyan-300 uppercase tracking-wide">
              Procedures Completed
            </div>
            <div className="text-[9.5px] text-slate-400 font-light">
              Trauma &amp; Joint Care
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-emerald-400/50 transition-colors space-y-0.5">
            <div className="text-xl sm:text-2xl font-black text-emerald-400 tracking-tight">
              100%
            </div>
            <div className="text-[10.5px] font-bold text-emerald-300 uppercase tracking-wide">
              UK Governance
            </div>
            <div className="text-[9.5px] text-slate-400 font-light">
              Sterility &amp; Rapid Mobility
            </div>
          </div>
        </motion.div>
      </div>

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
