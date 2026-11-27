import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Single Word Reveal Item
 * Strictly linked to scroll progression:
 * - Appears sequentially one by one as user scrolls down.
 * - Stays visible (clamp: true) as user scrolls further down.
 * - Reverses sequentially when user scrolls back up to the top.
 */
const ScrollWord = ({ word, index, total, scrollYProgress, className = '' }) => {
  const step = 0.82 / total;
  const start = index * step;
  const end = Math.min(start + step * 1.4, 0.96);

  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
  const y = useTransform(scrollYProgress, [start, end], [20, 0]);
  const scale = useTransform(scrollYProgress, [start, end], [0.94, 1]);

  return (
    <motion.span
      style={{ opacity, y, scale }}
      className={`inline-block will-change-transform ${className}`}
    >
      {word}
    </motion.span>
  );
};

/**
 * 🎬 ScrollSplitTypography
 * Words in "SUB-MILLIMETER ... 24 HOURS" appear one-by-one on scroll down,
 * stay visible as user goes down, and reverse when user scrolls back up.
 * Zero invented or added text.
 */
export function ScrollSplitTypography({
  line1 = ["SUB-MILLIMETER", "ROBOTIC", "PRECISION"],
  line2 = ["UK", "ROYAL", "COLLEGE", "RIGOR"],
  line3 = ["MOBILITY", "WITHIN", "24", "HOURS"],
  caption = "Bringing world-class sub-millimeter joint reconstruction, arthroscopy, and sports medicine directly to Gorakhpur and Eastern Uttar Pradesh."
}) {
  const containerRef = useRef(null);

  // Track scroll position from when section enters until it centers on screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'center 45%'],
  });

  const totalWords = line1.length + line2.length + line3.length;
  const captionOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.75, 1], [15, 0]);

  return (
    <section
      id="split-typography"
      ref={containerRef}
      className="relative w-full min-h-[calc(100vh-60px)] lg:h-[calc(100vh-60px)] flex flex-col justify-center bg-[#030712] text-white overflow-hidden border-y border-white/10 select-none py-8 sm:py-14"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-[#38BDF8]/10 blur-[160px] -z-10" />
        <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] rounded-full bg-[#08284D]/40 blur-[150px] -z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          
          {/* Line 1: SUB-MILLIMETER ROBOTIC PRECISION */}
          <div className="flex flex-wrap gap-x-3 sm:gap-x-5 md:gap-x-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-none text-white">
            {line1.map((word, i) => (
              <ScrollWord
                key={`l1-${i}`}
                word={word}
                index={i}
                total={totalWords}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* Line 2: UK ROYAL COLLEGE RIGOR */}
          <div className="flex flex-wrap gap-x-3 sm:gap-x-5 md:gap-x-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-none text-sky-300">
            {line2.map((word, i) => (
              <ScrollWord
                key={`l2-${i}`}
                word={word}
                index={line1.length + i}
                total={totalWords}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* Line 3: MOBILITY WITHIN 24 HOURS */}
          <div className="flex flex-wrap gap-x-3 sm:gap-x-5 md:gap-x-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-none text-cyan-400">
            {line3.map((word, i) => (
              <ScrollWord
                key={`l3-${i}`}
                word={word}
                index={line1.length + line2.length + i}
                total={totalWords}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

        </div>

        {/* Narrative Caption */}
        {caption && (
          <motion.div
            style={{ opacity: captionOpacity, y: captionY }}
            className="mt-8 sm:mt-12 pt-6 border-t border-white/10"
          >
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl font-light leading-relaxed">
              {caption}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default ScrollSplitTypography;
