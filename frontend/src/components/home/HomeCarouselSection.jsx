import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { FeaturedServicesShowcase } from './FeaturedServicesShowcase';

/**
 * 🏥 SECTION 2 — FEATURED SURGICAL SERVICES SHOWCASE (Kinetic Scroll-Linked Orchestration)
 * 
 * Scroll Choreography:
 * 1. HEADING FLIP ON SCROLL:
 *    - Starts flipped in reverse manner (rotateX: -85deg, opacity: 0).
 *    - As user scrolls in, it slowly flips back upright (rotateX: 0deg, opacity: 1).
 *    - When scrolling past, it reverses and flips away (rotateX: 85deg, opacity: 0).
 * 
 * 2. CARD SCALING ON SCROLL:
 *    - Starts very small (scale: 0.32, opacity: 0.1, y: 80px).
 *    - Simultaneously expands to full size (scale: 1.0, opacity: 1, y: 0px).
 *    - Together, heading and card appear on screen in perfect synchronization.
 *    - When scrolling past, it reverses and shrinks back (scale: 0.35, opacity: 0, y: -80px).
 */
export const HomeCarouselSection = ({ onNextClick }) => {
  const sectionRef = useRef(null);

  // Track scroll position through the section viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // ── Heading Flip Transformations (Flipped in reverse manner -> flips upright -> flips away) ──
  const headingRotateX = useTransform(scrollYProgress, [0.05, 0.38, 0.65, 0.95], [-85, 0, 0, 85]);
  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.28, 0.72, 0.95], [0, 1, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0.05, 0.38, 0.65, 0.95], [45, 0, 0, -45]);

  // ── Card Scale Transformations (Starts very small -> scales bigger to 1.0 -> shrinks on exit) ──
  const cardScale = useTransform(scrollYProgress, [0.05, 0.40, 0.65, 0.95], [0.32, 1, 1, 0.35]);
  const cardOpacity = useTransform(scrollYProgress, [0.05, 0.28, 0.72, 0.95], [0.15, 1, 1, 0]);
  const cardY = useTransform(scrollYProgress, [0.05, 0.40, 0.65, 0.95], [80, 0, 0, -80]);

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
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen flex flex-col justify-between items-center py-4 sm:py-6 bg-[#030712] text-[#F8FAFC] border-t border-white/10 select-none overflow-hidden"
    >
      {/* Ambient Background Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] rounded-full bg-[#08284D]/40 blur-[150px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-[#38BDF8]/10 blur-[160px] -z-10" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          TOP HEADER: 3D FLIP ON SCROLL (Starts flipped reverse -> flips upright)
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center shrink-0 pt-2 [perspective:1200px]">
        <motion.div
          style={{
            rotateX: headingRotateX,
            opacity: headingOpacity,
            y: headingY,
            transformOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
          }}
          className="space-y-1 will-change-transform"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight-editorial uppercase leading-none">
            Featured Surgical Services
          </h2>

          <p className="text-[11px] sm:text-xs text-slate-400 max-w-lg mx-auto font-light leading-snug">
            Explore advanced robotic joint replacement, complex arthroscopy, and spine care led by Dr. Vatsal Khetan.
          </p>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CARD CONTAINER: SCALE ON SCROLL (Starts very small -> expands to 1.0)
      ═══════════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{
          scale: cardScale,
          opacity: cardOpacity,
          y: cardY,
          transformOrigin: 'center center',
        }}
        className="relative z-10 w-full max-w-6xl mx-auto my-auto px-2 sm:px-4 will-change-transform"
      >
        <FeaturedServicesShowcase />
      </motion.div>

      {/* ── SCROLL DOWN INDICATOR ── */}
      <div className="relative z-10 w-full flex justify-center pt-1 pb-1 shrink-0">
        <button
          onClick={scrollToNext}
          aria-label="Scroll to Hospital Introduction"
          className="p-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer group"
        >
          <ChevronDown className="w-5 h-5 animate-bounce text-slate-400 group-hover:text-cyan-400" />
        </button>
      </div>
    </section>
  );
};

export default HomeCarouselSection;
