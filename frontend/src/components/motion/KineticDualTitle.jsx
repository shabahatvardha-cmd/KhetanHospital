import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * 🎬 KineticDualTitle — Opposing Motion Typography Component
 * 
 * Behavior:
 * 1. ENTRANCE:
 *    - Box 1 rushes in from the far LEFT (x: -140 -> 0)
 *    - Box 2 rushes in from the far RIGHT (x: +140 -> 0)
 *    - They collide and snap together side-by-side with organic ease.
 * 
 * 2. SCROLL PARALLAX:
 *    - When the screen scrolls DOWN, Box 1 drifts further LEFT, and Box 2 drifts further RIGHT.
 *    - When the screen scrolls UP, they converge back together.
 */
export const KineticDualTitle = ({
  primaryText,
  secondaryText,
  primaryBg = 'bg-[#08284d]',
  primaryColor = 'text-white',
  secondaryBg = 'bg-[#f59e0b]',
  secondaryColor = 'text-[#08284d]'
}) => {
  const containerRef = useRef(null);

  // Track window vertical scroll position
  const { scrollY } = useScroll();

  // Scroll parallax: as user scrolls down 0px -> 450px
  // Box 1 glides outwards to the left (0 -> -55px)
  // Box 2 glides outwards to the right (0 -> +55px)
  const rawX1 = useTransform(scrollY, [0, 450], [0, -55]);
  const rawX2 = useTransform(scrollY, [0, 450], [0, 55]);

  // Spring physics for buttery-smooth responsive gliding
  const springX1 = useSpring(rawX1, { stiffness: 140, damping: 24, mass: 0.8 });
  const springX2 = useSpring(rawX2, { stiffness: 140, damping: 24, mass: 0.8 });

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap items-center gap-2 sm:gap-3 text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight py-1 select-none"
    >
      {/* ── Box 1: Left Entrance & Left Scroll Drift ── */}
      <motion.div
        initial={{ x: -160, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        <motion.span
          style={{ x: springX1 }}
          className={`px-3.5 py-1.5 ${primaryBg} ${primaryColor} rounded-md shadow-xs inline-block will-change-transform`}
        >
          {primaryText}
        </motion.span>
      </motion.div>

      {/* ── Box 2: Right Entrance & Right Scroll Drift ── */}
      <motion.div
        initial={{ x: 160, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        <motion.span
          style={{ x: springX2 }}
          className={`px-3.5 py-1.5 ${secondaryBg} ${secondaryColor} rounded-md shadow-xs inline-block will-change-transform`}
        >
          {secondaryText}
        </motion.span>
      </motion.div>
    </div>
  );
};

export default KineticDualTitle;
