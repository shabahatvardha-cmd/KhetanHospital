import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FeaturedServicesShowcase } from './FeaturedServicesShowcase';

/**
 * 🏥 SECTION 2 — FEATURED SURGICAL SERVICES SHOWCASE (POLPHARMA BIOTECH THEME)
 * Dark midnight canvas, dynamic per-service neon contour vector loops,
 * frosted glassmorphism, and floating navigation capsule.
 */
export const HomeCarouselSection = ({ onNextClick }) => {
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
      className="relative w-full min-h-[calc(100vh-60px)] lg:h-[calc(100vh-60px)] flex flex-col justify-between items-center py-2 sm:py-4 bg-[#030712] border-t border-white/10 select-none overflow-hidden text-white"
    >
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center shrink-0 space-y-1.5 pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider">
          <span>Surgeries 01 &ndash; 07</span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight-editorial uppercase leading-none">
          Featured Surgical Services
        </h2>

        <p className="text-[11px] sm:text-xs text-slate-400 max-w-lg mx-auto font-light leading-snug">
          Explore advanced robotic joint replacement, complex arthroscopy, and spine care led by Dr. Vatsal Khetan.
        </p>
      </div>

      {/* Featured Services Showcase Stage */}
      <div className="relative w-full max-w-6xl mx-auto my-auto px-2 sm:px-4">
        <FeaturedServicesShowcase />
      </div>

      {/* Scroll Down Indicator */}
      <div className="w-full flex justify-center pt-1 pb-1 shrink-0">
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
