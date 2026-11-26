import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🏥 SHINING HOSPITAL NAME
 * Features:
 * 1. Letter-by-letter continuous Red -> Blue -> Green spectral gradient.
 * 2. Luminous left-to-right specular shine sweep clipped to text geometry.
 * 3. Staggered brightness glint wave rippling across letters.
 */

const HOSPITAL_LETTERS = [
  // "KHETAN" — Red to Indigo/Blue
  { char: 'K', color: '#e11d48' }, // Crimson Red
  { char: 'H', color: '#f43f5e' }, // Rose Coral
  { char: 'E', color: '#d946ef' }, // Fuchsia Magenta
  { char: 'T', color: '#a855f7' }, // Purple
  { char: 'A', color: '#6366f1' }, // Royal Indigo
  { char: 'N', color: '#2563eb' }, // Sapphire Blue
  // Space separator
  { char: ' ', color: 'transparent', isSpace: true },
  // "HOSPITAL" — Blue to Emerald Green
  { char: 'H', color: '#0284c7' }, // Azure Blue
  { char: 'O', color: '#0ea5e9' }, // Sky Blue
  { char: 'S', color: '#00bcd4' }, // Khetan Hospital Cyan
  { char: 'P', color: '#0d9488' }, // Teal
  { char: 'I', color: '#10b981' }, // Mint Emerald
  { char: 'T', color: '#16a34a' }, // Fresh Green
  { char: 'A', color: '#22c55e' }, // Bright Leaf Green
  { char: 'L', color: '#15803d' }, // Deep Forest Green
];

export const ShiningHospitalName = ({ className = "" }) => {
  return (
    <div className={`relative inline-flex items-baseline font-black tracking-tight select-none overflow-hidden py-0.5 ${className}`}>
      
      {/* 1. Base Layer: Red -> Blue -> Green Letter-by-Letter Gradient */}
      <div className="inline-flex items-baseline">
        {HOSPITAL_LETTERS.map((item, idx) => {
          if (item.isSpace) {
            return <span key={idx} className="inline-block w-1.5 sm:w-2" />;
          }

          return (
            <motion.span
              key={idx}
              animate={{
                filter: [
                  'brightness(1)',
                  'brightness(1.55) drop-shadow(0 0 5px rgba(255,255,255,0.85))',
                  'brightness(1)',
                ],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 5.3,
                delay: idx * 0.16, // Slower, graceful wave traveling left to right
                ease: 'easeInOut',
              }}
              style={{ color: item.color }}
              className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              {item.char}
            </motion.span>
          );
        })}
      </div>

      {/* 2. Shine Layer: Clipped Text Specular Sheen Sweeping Left to Right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none inline-flex items-baseline animate-navbar-shine"
        style={{
          background: 'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.85) 46%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.85) 54%, transparent 80%)',
          backgroundSize: '250% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        }}
      >
        {HOSPITAL_LETTERS.map((item, idx) => {
          if (item.isSpace) {
            return <span key={idx} className="inline-block w-1.5 sm:w-2" />;
          }
          return (
            <span key={idx} className="inline-block">
              {item.char}
            </span>
          );
        })}
      </div>

      {/* 3. Sweeping Specular Light Glint Beam */}
      <motion.div
        aria-hidden="true"
        animate={{
          x: ['-120%', '260%'],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          repeatDelay: 2.3,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="absolute -inset-y-1 w-14 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-22deg] pointer-events-none mix-blend-overlay blur-[0.5px]"
      />
    </div>
  );
};

export default ShiningHospitalName;
