import React from 'react';
import { motion, useTransform } from 'framer-motion';

/**
 * ContinuousOpticalBackground — Translucent Blue Kinetic Optical Geometry
 * 
 * A premium, dark-blue, translucent, glass-inspired visual system with 3 surgical optical objects:
 * - Object A: Large Navigation Ring -> Morphs into an elongated rectangular glass instrument frame
 * - Object B: Medium Alignment Ring -> Morphs into a rounded square glass panel with amber/bronze details
 * - Object C: Precision Reticle -> Morphs into a square micro-target reticle
 * 
 * Aesthetic Palette:
 * - Background blue: #071A32
 * - Transparent navy: rgba(10, 35, 65, 0.20)
 * - Glass blue: rgba(30, 90, 140, 0.16)
 * - Cyan edge: rgba(100, 190, 225, 0.35)
 * - Steel blue: rgba(110, 155, 190, 0.25)
 * - Muted amber: rgba(190, 145, 85, 0.35)
 */
export const ContinuousOpticalBackground = ({ scrollProgress }) => {
  // ─────────────────────────────────────────────────────────────────────────
  // 1. OBJECT A — LARGE NAVIGATION RING -> ELONGATED RECTANGULAR GLASS PANEL
  // ─────────────────────────────────────────────────────────────────────────
  // Travel path: Clinical Expertise (top-right) -> accelerates past Camp (mid-left) -> Cashless (center-right)
  const objAY = useTransform(
    scrollProgress,
    [0, 0.35, 0.68, 1],
    [-20, 380, 920, 1480]
  );
  const objAX = useTransform(
    scrollProgress,
    [0, 0.35, 0.68, 1],
    [60, -30, -90, 40]
  );
  const objARotate = useTransform(
    scrollProgress,
    [0, 0.35, 0.68, 1],
    [0, 22, 42, 14]
  );
  const objAOpacity = useTransform(
    scrollProgress,
    [0, 0.2, 0.5, 0.7, 1],
    [0.28, 0.50, 0.35, 0.55, 0.38]
  );

  // Geometric Morphing: Circle -> Rounded Rectangle
  const objAWidth = useTransform(scrollProgress, [0.55, 0.85], [360, 430]);
  const objAHeight = useTransform(scrollProgress, [0.55, 0.85], [360, 260]);
  const objABorderRadius = useTransform(scrollProgress, [0.55, 0.85], ['50%', '28px']);
  const objAMorphProgress = useTransform(scrollProgress, [0.55, 0.85], [0, 1]);

  // ─────────────────────────────────────────────────────────────────────────
  // 3. OBJECT B — MEDIUM ALIGNMENT RING -> ROUNDED SQUARE GLASS PANEL
  // ─────────────────────────────────────────────────────────────────────────
  // Travel path: Clinical Expertise (mid-left) -> accelerates past Camp (mid-right) -> Cashless (left)
  const objBY = useTransform(
    scrollProgress,
    [0, 0.35, 0.68, 1],
    [40, 420, 980, 1420]
  );
  const objBX = useTransform(
    scrollProgress,
    [0, 0.35, 0.68, 1],
    [-50, 40, 100, -30]
  );
  const objBRotate = useTransform(
    scrollProgress,
    [0, 0.35, 0.68, 1],
    [0, -20, -38, -12]
  );
  const objBOpacity = useTransform(
    scrollProgress,
    [0, 0.2, 0.5, 0.7, 1],
    [0.25, 0.48, 0.32, 0.52, 0.35]
  );

  // Geometric Morphing: Circle -> Rounded Square
  const objBWidth = useTransform(scrollProgress, [0.55, 0.85], [280, 310]);
  const objBHeight = useTransform(scrollProgress, [0.55, 0.85], [280, 310]);
  const objBBorderRadius = useTransform(scrollProgress, [0.55, 0.85], ['50%', '22px']);

  // ─────────────────────────────────────────────────────────────────────────
  // 4. OBJECT C — PRECISION FOCUS RETICLE -> SQUARE TARGET INSTRUMENT
  // ─────────────────────────────────────────────────────────────────────────
  // Glides down the spine connecting all three sections
  const objCY = useTransform(
    scrollProgress,
    [0, 0.35, 0.68, 1],
    [0, 350, 880, 1380]
  );
  const objCX = useTransform(
    scrollProgress,
    [0, 0.35, 0.68, 1],
    [0, 25, -20, 15]
  );
  const objCRotate = useTransform(
    scrollProgress,
    [0, 0.35, 0.68, 1],
    [-15, 18, 35, 0]
  );
  const objCOpacity = useTransform(
    scrollProgress,
    [0, 0.2, 0.5, 0.7, 1],
    [0.35, 0.65, 0.42, 0.68, 0.45]
  );
  const objCBorderRadius = useTransform(scrollProgress, [0.55, 0.85], ['50%', '10px']);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* ═════════════════════════════════════════════════════════════════════
          OBJECT A — LARGE NAVIGATION RING -> ELONGATED GLASS RECTANGLE
      ═════════════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{
          y: objAY,
          x: objAX,
          rotate: objARotate,
          opacity: objAOpacity,
          width: objAWidth,
          height: objAHeight,
          borderRadius: objABorderRadius,
          transformOrigin: '50% 50%',
        }}
        className="absolute top-8 right-6 sm:right-16 lg:right-32 will-change-transform"
      >
        {/* Physical Glass Surface with Layered Reflections */}
        <div
          className="absolute inset-0 w-full h-full rounded-[inherit] overflow-hidden transition-all"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 90, 140, 0.16) 0%, rgba(10, 35, 65, 0.22) 100%)',
            border: '1px solid rgba(100, 190, 225, 0.35)',
            boxShadow:
              'inset 0 1px 2px rgba(100, 190, 225, 0.35), inset 0 -1px 2px rgba(10, 35, 65, 0.4), 0 12px 36px rgba(7, 26, 50, 0.28)',
          }}
        >
          {/* Subtle Diagonal Specular Reflection Sheen */}
          <div
            className="absolute -inset-x-12 -top-12 h-28 bg-gradient-to-b from-white/[0.08] via-cyan-200/[0.03] to-transparent transform -rotate-12 pointer-events-none"
          />

          {/* Inner Steel-Blue Bezel Trace */}
          <div
            className="absolute inset-2.5 rounded-[inherit] border border-[rgba(110,155,190,0.22)] pointer-events-none"
          />

          {/* SVG Technical Markings & Calibration Lines */}
          <svg
            viewBox="0 0 360 360"
            className="absolute inset-0 w-full h-full p-2 pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="cyanMarkingGrad" x1="0" y1="0" x2="360" y2="360" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(100, 190, 225, 0.55)" />
                <stop offset="50%" stopColor="rgba(110, 155, 190, 0.35)" />
                <stop offset="100%" stopColor="rgba(100, 190, 225, 0.15)" />
              </linearGradient>
            </defs>

            {/* Concentric Dashed Measurement Track */}
            <circle
              cx="180"
              cy="180"
              r="148"
              stroke="url(#cyanMarkingGrad)"
              strokeWidth="1"
              strokeDasharray="4 8"
              opacity="0.55"
            />

            {/* Inner Precision Arc */}
            <circle
              cx="180"
              cy="180"
              r="125"
              stroke="url(#cyanMarkingGrad)"
              strokeWidth="0.75"
              opacity="0.35"
            />

            {/* 12 Radial Calibration Ticks (Sub-Millimeter Navigation Marks) */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="180"
                y1="18"
                x2="180"
                y2={deg % 90 === 0 ? "32" : "26"}
                stroke="url(#cyanMarkingGrad)"
                strokeWidth={deg % 90 === 0 ? "1.5" : "0.75"}
                transform={`rotate(${deg} 180 180)`}
              />
            ))}

            {/* 4 Cardinal Precision Dots */}
            {[0, 90, 180, 270].map((deg) => (
              <circle
                key={deg}
                cx="180"
                cy="38"
                r="1.75"
                fill="rgba(100, 190, 225, 0.6)"
                transform={`rotate(${deg} 180 180)`}
              />
            ))}

            {/* Corner Alignment Brackets (Become prominent on morph) */}
            <path d="M 28 42 L 28 28 L 42 28" stroke="rgba(100, 190, 225, 0.45)" strokeWidth="1.2" fill="none" />
            <path d="M 332 42 L 332 28 L 318 28" stroke="rgba(100, 190, 225, 0.45)" strokeWidth="1.2" fill="none" />
            <path d="M 28 318 L 28 332 L 42 332" stroke="rgba(100, 190, 225, 0.45)" strokeWidth="1.2" fill="none" />
            <path d="M 332 318 L 332 332 L 318 332" stroke="rgba(100, 190, 225, 0.45)" strokeWidth="1.2" fill="none" />
          </svg>
        </div>
      </motion.div>

      {/* ═════════════════════════════════════════════════════════════════════
          OBJECT B — MEDIUM ALIGNMENT RING -> ROUNDED SQUARE GLASS PANEL
      ═════════════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{
          y: objBY,
          x: objBX,
          rotate: objBRotate,
          opacity: objBOpacity,
          width: objBWidth,
          height: objBHeight,
          borderRadius: objBBorderRadius,
          transformOrigin: '50% 50%',
        }}
        className="absolute top-64 left-4 sm:left-14 lg:left-24 will-change-transform"
      >
        {/* Physical Amber-Bronze Glass Surface with Muted Warm Highlights */}
        <div
          className="absolute inset-0 w-full h-full rounded-[inherit] overflow-hidden transition-all"
          style={{
            background: 'linear-gradient(145deg, rgba(190, 145, 85, 0.12) 0%, rgba(10, 35, 65, 0.22) 100%)',
            border: '1px solid rgba(190, 145, 85, 0.35)',
            boxShadow:
              'inset 0 1px 2px rgba(190, 145, 85, 0.35), inset 0 -1px 2px rgba(10, 35, 65, 0.4), 0 10px 30px rgba(7, 26, 50, 0.24)',
          }}
        >
          {/* Subtle Warm Amber Sheen */}
          <div
            className="absolute -inset-x-8 -top-8 h-20 bg-gradient-to-b from-amber-200/[0.06] via-transparent to-transparent transform rotate-6 pointer-events-none"
          />

          {/* Inner Bronze-Steel Outline */}
          <div
            className="absolute inset-2 rounded-[inherit] border border-[rgba(190,145,85,0.20)] pointer-events-none"
          />

          {/* SVG Technical Markings & Cardinal Notches */}
          <svg
            viewBox="0 0 280 280"
            className="absolute inset-0 w-full h-full p-2 pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="amberMarkingGrad" x1="0" y1="0" x2="280" y2="280" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(190, 145, 85, 0.55)" />
                <stop offset="50%" stopColor="rgba(110, 155, 190, 0.30)" />
                <stop offset="100%" stopColor="rgba(190, 145, 85, 0.20)" />
              </linearGradient>
            </defs>

            {/* Fine Concentric Dashed Ring */}
            <circle
              cx="140"
              cy="140"
              r="110"
              stroke="url(#amberMarkingGrad)"
              strokeWidth="0.85"
              strokeDasharray="5 5"
              opacity="0.55"
            />

            {/* Inner Core Circle */}
            <circle
              cx="140"
              cy="140"
              r="82"
              stroke="url(#amberMarkingGrad)"
              strokeWidth="0.65"
              opacity="0.35"
            />

            {/* Cardinal Alignment Cross Notches */}
            {[0, 90, 180, 270].map((deg) => (
              <line
                key={deg}
                x1="140"
                y1="14"
                x2="140"
                y2="28"
                stroke="url(#amberMarkingGrad)"
                strokeWidth="1.5"
                transform={`rotate(${deg} 140 140)`}
              />
            ))}

            {/* Angular Step Dots */}
            {[45, 135, 225, 315].map((deg) => (
              <circle
                key={deg}
                cx="140"
                cy="22"
                r="1.5"
                fill="rgba(190, 145, 85, 0.55)"
                transform={`rotate(${deg} 140 140)`}
              />
            ))}

            {/* Corner Alignment Crosses */}
            <path d="M 24 34 L 24 24 L 34 24" stroke="rgba(190, 145, 85, 0.4)" strokeWidth="1" fill="none" />
            <path d="M 256 34 L 256 24 L 246 24" stroke="rgba(190, 145, 85, 0.4)" strokeWidth="1" fill="none" />
            <path d="M 24 246 L 24 256 L 34 256" stroke="rgba(190, 145, 85, 0.4)" strokeWidth="1" fill="none" />
            <path d="M 256 246 L 256 256 L 246 256" stroke="rgba(190, 145, 85, 0.4)" strokeWidth="1" fill="none" />
          </svg>
        </div>
      </motion.div>

      {/* ═════════════════════════════════════════════════════════════════════
          OBJECT C — PRECISION FOCUS RETICLE -> SQUARE TARGET INSTRUMENT
      ═════════════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{
          y: objCY,
          x: objCX,
          rotate: objCRotate,
          opacity: objCOpacity,
          borderRadius: objCBorderRadius,
          transformOrigin: '50% 50%',
        }}
        className="absolute top-96 left-1/2 -translate-x-1/2 w-14 h-14 will-change-transform"
      >
        {/* Subtle Dark Navy Glass Surface */}
        <div
          className="absolute inset-0 w-full h-full rounded-[inherit] overflow-hidden"
          style={{
            background: 'rgba(10, 35, 65, 0.30)',
            border: '1px solid rgba(100, 190, 225, 0.45)',
            boxShadow:
              'inset 0 1px 1.5px rgba(100, 190, 225, 0.5), 0 6px 20px rgba(7, 26, 50, 0.3)',
          }}
        >
          <svg
            viewBox="0 0 56 56"
            className="w-full h-full p-1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Target Ring */}
            <circle cx="28" cy="28" r="18" stroke="rgba(100, 190, 225, 0.5)" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="28" cy="28" r="11" stroke="rgba(190, 145, 85, 0.45)" strokeWidth="0.6" />

            {/* Central Focal Dot with Radial Blue Glow */}
            <circle cx="28" cy="28" r="2.5" fill="#38bdf8" />
            <circle cx="28" cy="28" r="5" stroke="#0284c7" strokeWidth="0.5" opacity="0.4" />

            {/* Hairline Crosshairs */}
            <line x1="28" y1="4" x2="28" y2="13" stroke="rgba(100, 190, 225, 0.7)" strokeWidth="0.8" />
            <line x1="28" y1="43" x2="28" y2="52" stroke="rgba(100, 190, 225, 0.7)" strokeWidth="0.8" />
            <line x1="4" y1="28" x2="13" y2="28" stroke="rgba(100, 190, 225, 0.7)" strokeWidth="0.8" />
            <line x1="43" y1="28" x2="52" y2="28" stroke="rgba(100, 190, 225, 0.7)" strokeWidth="0.8" />

            {/* Target Corner Framing Brackets [ + ] */}
            <path d="M 8 14 L 8 8 L 14 8" stroke="rgba(110, 155, 190, 0.6)" strokeWidth="0.9" fill="none" />
            <path d="M 48 14 L 48 8 L 42 8" stroke="rgba(110, 155, 190, 0.6)" strokeWidth="0.9" fill="none" />
            <path d="M 8 42 L 8 48 L 14 48" stroke="rgba(110, 155, 190, 0.6)" strokeWidth="0.9" fill="none" />
            <path d="M 48 42 L 48 48 L 42 48" stroke="rgba(110, 155, 190, 0.6)" strokeWidth="0.9" fill="none" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

