import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

  const l1X = useTransform(scrollYProgress, [0, 0.9], [-60, 0]);
  const l1Opacity = useTransform(scrollYProgress, [0, 0.7], [0.3, 1]);

  const l2X = useTransform(scrollYProgress, [0.1, 0.9], [60, 0]);
  const l2Opacity = useTransform(scrollYProgress, [0.1, 0.75], [0.3, 1]);

  const l3X = useTransform(scrollYProgress, [0.2, 0.95], [-40, 0]);
  const l3Opacity = useTransform(scrollYProgress, [0.2, 0.85], [0.2, 1]);

  const captionOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <section
      id="split-typography"
      ref={containerRef}
      className="relative w-full min-h-[calc(100vh-60px)] lg:h-[calc(100vh-60px)] flex flex-col justify-center bg-[#030712] text-white overflow-hidden border-y border-white/10 select-none py-6 sm:py-10"
    >
      {/* Ambient Lighting Field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[180px] -z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-4">
          <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/80">
            {badge}
          </span>
        </div>

        <div className="space-y-2 md:space-y-3">
          <motion.div
            style={{ x: l1X, opacity: l1Opacity }}
            className="flex flex-wrap gap-x-4 md:gap-x-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight-editorial uppercase leading-none text-white"
          >
            {line1.map((w, i) => (
              <span key={i} className="hover:text-cyan-300 transition-colors duration-300">
                {w}
              </span>
            ))}
          </motion.div>

          <motion.div
            style={{ x: l2X, opacity: l2Opacity }}
            className="flex flex-wrap gap-x-4 md:gap-x-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight-editorial uppercase leading-none text-cyan-400"
          >
            {line2.map((w, i) => (
              <span key={i} className="hover:text-white transition-colors duration-300">
                {w}
              </span>
            ))}
          </motion.div>

          <motion.div
            style={{ x: l3X, opacity: l3Opacity }}
            className="flex flex-wrap gap-x-4 md:gap-x-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight-editorial uppercase leading-none text-sky-400"
          >
            {line3.map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: captionOpacity }}
          className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <p className="text-slate-300 text-xs md:text-sm max-w-xl font-light leading-relaxed">
            {caption}
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 shrink-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>UK SURGICAL BENCHMARK</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ScrollSplitTypography;
