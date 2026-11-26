import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, ArrowUpRight, Award } from 'lucide-react';
import { clinicInfo } from '../../data/clinicContent';
import { doctorImages } from '../../data/imageConfig';
import { WaveGradientText } from '../motion/WaveGradientText';

/**
 * 🏥 SECTION 1 — DOCTOR-FOCUSED HERO (Screen View Size Calibrated)
 * Fits 100% inside calc(100vh - 60px) on all desktop & laptop screens.
 */
export const HomeDoctorHero = ({ onBookClick }) => {
  const scrollToCarousel = () => {
    document.getElementById('explore-carousel')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-60px)] lg:h-[calc(100vh-60px)] bg-gradient-to-b from-[#fbfbfc] via-white to-slate-50 flex flex-col justify-between pt-2 sm:pt-4 pb-2 select-none overflow-hidden">
      {/* Ambient Lighting & Micro-Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-sky-200/30 blur-3xl -z-10" />
        <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-blue-100/40 blur-3xl -z-10" />
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#08284d_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Main Content Area */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

          {/* Left Column: Doctor Identity & Expressive Typography (7 Cols) */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">

            {/* Oversized Name with Colourful Gradient & Continuous Wave Motion */}
            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight-editorial uppercase leading-[0.95]">
                <WaveGradientText words={["Dr.", "Vatsal", "Khetan"]} />
              </div>

              {/* Degrees and Fellowships - Perfectly Formatted Without Hanging Words */}
              <p className="text-[10.5px] sm:text-xs font-mono font-medium text-slate-600 tracking-tight sm:tracking-normal leading-relaxed pt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-slate-800 font-semibold">MBBS</span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-slate-800 font-semibold">MS (Ortho)</span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-slate-800 font-semibold">MRCS</span>
                <span className="text-slate-300">&bull;</span>
                <span className="font-bold text-[#08284d] bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">FRCS (Edinburgh)</span>
                <span className="text-slate-300">&bull;</span>
                <span className="font-bold text-sky-800">M.Ch Knee (UK)</span>
                <span className="text-slate-300">&bull;</span>
                <span className="whitespace-nowrap font-semibold text-emerald-800">IOC Dip Sports Med (Switzerland)</span>
              </p>
            </div>

            {/* Editorial Headline Statement - Clean High-Impact Accent Without Web Underline */}
            <h2 className="text-base sm:text-xl lg:text-[22px] font-extrabold text-slate-900 tracking-tight leading-snug">
              Pioneering <span className="text-sky-600 font-black">Sub-Millimeter Robotic Joint Excellence</span> &amp; Advanced Orthopaedic Care in Gorakhpur
            </h2>

            {/* Concise Supporting Narrative */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light max-w-xl">
              Bringing UK Royal College surgical governance, sub-millimeter robotic precision, and dedicated arthroscopic sports rehabilitation directly to Gorakhpur and Eastern Uttar Pradesh.
            </p>

            {/* Action Triggers - Balanced & Sleek */}
            <div className="flex flex-wrap items-center gap-3 pt-1.5">
              <button
                onClick={onBookClick}
                className="px-6 py-3 rounded-full bg-[#08284d] text-white text-xs sm:text-sm font-bold tracking-wide hover:bg-sky-600 hover:shadow-xl hover:shadow-sky-600/20 transition-all duration-300 flex items-center gap-2 group cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4 text-sky-300" />
                <span>Book Priority Consultation</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={scrollToCarousel}
                className="px-6 py-3 rounded-full border border-slate-300/90 bg-white text-slate-700 text-xs sm:text-sm font-semibold hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50 shadow-2xs transition-all cursor-pointer"
              >
                Explore Specialties
              </button>
            </div>
          </div>

          {/* Right Column: Doctor Portrait Photo with Robotic Orbit Ring & Floating Motion (5 Cols) */}
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
                  scale: [1, 1.14, 1],
                  opacity: [0.35, 0.65, 0.35],
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-6 sm:-inset-8 bg-gradient-to-tr from-sky-400/25 via-cyan-300/35 to-blue-500/20 rounded-full blur-3xl -z-10 pointer-events-none"
              />

              {/* 2. Rotating Robotic Surgical Precision Orbit Ring (Clockwise) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 34,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-8 sm:-inset-10 -z-10 pointer-events-none flex items-center justify-center opacity-45 sm:opacity-55"
              >
                <svg viewBox="0 0 400 400" className="w-full h-full text-sky-600/40">
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
                  <circle cx="200" cy="20" r="3" fill="#0284c7" />
                  <circle cx="380" cy="200" r="3" fill="#0284c7" />
                  <circle cx="200" cy="380" r="3" fill="#0284c7" />
                  <circle cx="20" cy="200" r="3" fill="#0284c7" />
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
                className="absolute -inset-10 sm:-inset-12 -z-10 pointer-events-none flex items-center justify-center opacity-30"
              >
                <svg viewBox="0 0 440 440" className="w-full h-full text-cyan-600/40">
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
                    className="w-auto h-auto max-h-[260px] sm:max-h-[290px] lg:max-h-[310px] object-contain drop-shadow-[0_20px_35px_rgba(8,40,77,0.3)] select-none pointer-events-none"
                    loading="eager"
                  />
                </motion.div>

                {/* 5. Floating FRCS Accreditation Badge */}
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
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[92%] sm:w-[88%] p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl flex items-center gap-2.5 z-20"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-[#00bcd4] flex items-center justify-center text-white font-black text-xs shadow-sm shrink-0">
                    FRCS
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-black text-slate-900 leading-tight truncate">
                      Dr. Vatsal Khetan
                    </span>
                    <span className="text-[10px] text-sky-700 font-bold leading-tight truncate">
                      Royal College Fellow (Edinburgh) &bull; M.Ch (UK)
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Polpharma-Style 4-Column Clinical Benchmark Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-200/80 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6"
        >
          <div className="space-y-0.5">
            <div className="text-xl sm:text-2xl font-extrabold text-[#08284d] tracking-tight">
              {clinicInfo.stats.experienceYears}
            </div>
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
              Clinical Experience
            </div>
            <div className="text-[10px] text-slate-500 font-light">
              UK Fellowship &amp; NHS Trained
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-xl sm:text-2xl font-extrabold text-sky-600 tracking-tight">
              {clinicInfo.stats.kneeReplacements}
            </div>
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
              Robotic Knee Surgeries
            </div>
            <div className="text-[10px] text-slate-500 font-light">
              Sub-Millimeter Precision
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-xl sm:text-2xl font-extrabold text-[#08284d] tracking-tight">
              {clinicInfo.stats.surgeries}
            </div>
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
              Procedures Completed
            </div>
            <div className="text-[10px] text-slate-500 font-light">
              Trauma &amp; Joint Care
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 tracking-tight">
              100%
            </div>
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
              UK Governance
            </div>
            <div className="text-[10px] text-slate-500 font-light">
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
          className="p-1 text-slate-400 hover:text-sky-600 transition-colors cursor-pointer group"
        >
          <ChevronDown className="w-5 h-5 animate-bounce text-slate-400 group-hover:text-sky-600" />
        </button>
      </div>
    </section>
  );
};

export default HomeDoctorHero;
