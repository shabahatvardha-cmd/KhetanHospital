import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FeaturedServicesShowcase } from './FeaturedServicesShowcase';

/**
 * 🏥 SECTION 2 — FEATURED SURGICAL SERVICES SHOWCASE
 * Inspired by reference design: dynamic per-service color palette, squircle framing,
 * flowing vector contour loops, and floating capsule navigation.
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
      className="relative w-full min-h-[calc(100vh-60px)] lg:h-[calc(100vh-60px)] flex flex-col justify-between items-center py-2 sm:py-4 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-200/90 select-none overflow-hidden"
    >
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center shrink-0 space-y-1 pt-1">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#08284d] tracking-tight-editorial uppercase leading-none">
          Featured Surgical Services
        </h2>

        <p className="text-[11px] sm:text-xs text-slate-500 max-w-lg mx-auto font-light leading-snug">
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
          className="p-1 text-slate-400 hover:text-sky-600 transition-colors cursor-pointer group"
        >
          <ChevronDown className="w-5 h-5 animate-bounce text-slate-400 group-hover:text-sky-600" />
        </button>
      </div>
    </section>
  );
};

export default HomeCarouselSection;
