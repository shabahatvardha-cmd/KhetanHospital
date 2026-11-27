import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * 🏥 SCENE 4 — KINETIC SCROLL-LINKED SPLIT TYPOGRAPHY (POLPHARMA TECHNIQUE)
 * 
 * As the user scrolls into this section, three distinct typographic lines move
 * from horizontal offsets into a unified, high-contrast surgical statement.
 * The final statement locks cleanly in place, connecting directly with Scene 5 (Doctors).
 */
export function ScrollSplitTypography({
  badge = "( PURVANCHAL ROBOTIC STANDARDS • UK GOVERNED )",
  line1 = ["SUB-MILLIMETER", "ROBOTIC", "PRECISION"],
  line2 = ["UK", "ROYAL", "COLLEGE", "RIGOR"],
  line3 = ["MOBILITY", "WITHIN", "24", "HOURS"],
  caption = "Bringing world-class sub-millimeter joint reconstruction, arthroscopy, and sports medicine directly to Eastern Uttar Pradesh."
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  // Dynamic scroll-progress driven horizontal convergence
  const l1X = useTransform(scrollYProgress, [0, 0.9], [-80, 0]);
  const l1Opacity = useTransform(scrollYProgress, [0, 0.75], [0.25, 1]);

  const l2X = useTransform(scrollYProgress, [0.1, 0.9], [80, 0]);
  const l2Opacity = useTransform(scrollYProgress, [0.1, 0.8], [0.25, 1]);

  const l3X = useTransform(scrollYProgress, [0.2, 0.95], [-60, 0]);
  const l3Opacity = useTransform(scrollYProgress, [0.2, 0.85], [0.2, 1]);

  const captionOpacity = useTransform(scrollYProgress, [0.65, 1], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.65, 1], [20, 0]);

  return (
    <section
      id="split-typography"
      ref={containerRef}
      className="relative w-full min-h-[calc(100vh-60px)] lg:h-[calc(100vh-60px)] flex flex-col justify-center bg-[#030712] text-white overflow-hidden border-y border-white/10 select-none py-8 sm:py-12"
    >
      {/* Subtle Central Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[180px] -z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Monospace Standard Badge */}
        <div className="mb-4 sm:mb-6">
          <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/80">
            {badge}
          </span>
        </div>

        {/* 3 Converging Statement Lines */}
        <div className="space-y-2 sm:space-y-3">
          <motion.div
            style={{ x: l1X, opacity: l1Opacity }}
            className="flex flex-wrap gap-x-3 sm:gap-x-5 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight-editorial uppercase leading-none text-white will-change-transform"
          >
            {line1.map((w, i) => (
              <span key={i} className="hover:text-cyan-300 transition-colors duration-300">
                {w}
              </span>
            ))}
          </motion.div>

          <motion.div
            style={{ x: l2X, opacity: l2Opacity }}
            className="flex flex-wrap gap-x-3 sm:gap-x-5 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight-editorial uppercase leading-none text-cyan-400 will-change-transform"
          >
            {line2.map((w, i) => (
              <span key={i} className="hover:text-white transition-colors duration-300">
                {w}
              </span>
            ))}
          </motion.div>

          <motion.div
            style={{ x: l3X, opacity: l3Opacity }}
            className="flex flex-wrap gap-x-3 sm:gap-x-5 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight-editorial uppercase leading-none text-sky-400 will-change-transform"
          >
            {line3.map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </motion.div>
        </div>

        {/* Supporting Narrative & Royal College Guarantee */}
        <motion.div
          style={{ opacity: captionOpacity, y: captionY }}
          className="mt-8 sm:mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 will-change-transform"
        >
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
            {caption}
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>UK SURGICAL GOVERNANCE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ScrollSplitTypography;
