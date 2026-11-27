import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Orbit, Layers } from 'lucide-react';
import { FeaturedServicesShowcase } from './FeaturedServicesShowcase';
import { PerspectiveCarousel3D } from '../3d/PerspectiveCarousel3D';

/**
 * 🏥 SCENE 3 — SURGICAL SERVICES INTERACTIVE STAGE
 * 
 * An interactive clinical stage rather than a basic card grid.
 * Default view is the grand editorial showcase with telemetry and procedure parameters.
 * Progressive enhancement toggle allows viewing in 3D circular track.
 */
export const HomeCarouselSection = ({ onNextClick }) => {
  const [viewMode, setViewMode] = useState('showcase'); // 'showcase' | 'carousel3d'

  const scrollToNext = () => {
    if (onNextClick) {
      onNextClick();
    } else {
      document.getElementById('hospital-intro')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="explore-carousel"
      className="relative w-full min-h-[calc(100vh-60px)] lg:h-[calc(100vh-60px)] flex flex-col justify-between items-center py-4 sm:py-6 bg-[#030712] border-t border-white/10 select-none overflow-hidden text-white"
    >
      {/* Living Ambient Lighting Field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-cyan-500 blur-[170px] -z-10"
        />
      </div>

      {/* Top Header & Interactive View Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center shrink-0 space-y-2 pt-1 relative z-10">
        <div className="inline-flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Surgeries 01 &ndash; 07</span>
          </div>

          {/* 3D Perspective Mode Switcher Pill */}
          <div className="inline-flex items-center p-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono font-bold">
            <button
              onClick={() => setViewMode('showcase')}
              className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'showcase'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Showcase Stage</span>
            </button>
            <button
              onClick={() => setViewMode('carousel3d')}
              className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'carousel3d'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Orbit className="w-3 h-3" />
              <span>3D Circular</span>
            </button>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight uppercase leading-none">
          Featured Surgical Services
        </h2>

        <p className="text-[11px] sm:text-xs text-slate-400 max-w-lg mx-auto font-light leading-snug">
          Explore advanced robotic joint replacement, complex arthroscopy, and spine care led by Dr. Vatsal Khetan.
        </p>
      </div>

      {/* Featured Services Showcase Stage / 3D Track */}
      <div className="relative w-full max-w-6xl mx-auto my-auto px-2 sm:px-4 z-10">
        {viewMode === 'showcase' ? (
          <FeaturedServicesShowcase />
        ) : (
          <PerspectiveCarousel3D />
        )}
      </div>

      {/* Scroll Down Indicator */}
      <div className="w-full flex justify-center pt-1 pb-1 shrink-0 z-10">
        <button
          onClick={scrollToNext}
          aria-label="Scroll to Hospital Introduction"
          className="p-1 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer group"
        >
          <ChevronDown className="w-5 h-5 animate-bounce text-slate-500 group-hover:text-cyan-400" />
        </button>
      </div>
    </section>
  );
};

export default HomeCarouselSection;
