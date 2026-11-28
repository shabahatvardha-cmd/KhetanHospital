import React from 'react';
import { motion } from 'framer-motion';

export const RevolvingHospitalLogo = ({
  theme = 'dark',
  position = 'right',
  className = ''
}) => {
  const isDark = theme === 'dark';

  const positionClasses = position === 'right'
    ? 'hidden lg:flex absolute right-8 xl:right-20 top-1/2 -translate-y-1/2'
    : position === 'left'
      ? 'hidden lg:flex absolute left-8 xl:left-20 top-1/2 -translate-y-1/2'
      : 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex';

  return (
    <>
      <div
        className={`${positionClasses} items-center justify-center pointer-events-none select-none z-0 ${className}`}
        aria-hidden="true"
      >
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 xl:w-96 xl:h-96 flex items-center justify-center">
          <div
            className={`absolute inset-4 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${
              isDark
                ? 'bg-gradient-to-tr from-cyan-500/20 via-sky-400/15 to-transparent'
                : 'bg-gradient-to-tr from-sky-400/15 via-blue-500/10 to-transparent'
            }`}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
            className={`absolute inset-0 rounded-full border border-dashed pointer-events-none ${
              isDark ? 'border-cyan-400/20' : 'border-sky-400/25'
            }`}
          >
            <span
              className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${
                isDark ? 'bg-cyan-400 shadow-[0_0_8px_#38bdf8]' : 'bg-sky-500 shadow-[0_0_8px_#0284c7]'
              }`}
            />
            <span
              className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                isDark ? 'bg-cyan-400/60' : 'bg-sky-400/60'
              }`}
            />
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
            className={`absolute inset-6 rounded-full border pointer-events-none ${
              isDark ? 'border-sky-500/15' : 'border-slate-300/60'
            }`}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 32, ease: 'linear' }}
            className="relative w-44 h-44 sm:w-56 sm:h-56 xl:w-64 xl:h-64 flex items-center justify-center will-change-transform"
          >
            <img
              src="/logo.webp"
              alt="Khetan Hospital Emblem"
              className={`w-full h-full object-contain filter transition-all duration-500 ${
                isDark
                  ? 'opacity-30 drop-shadow-[0_0_25px_rgba(56,189,248,0.35)] brightness-110 contrast-125'
                  : 'opacity-20 drop-shadow-[0_0_20px_rgba(14,165,233,0.20)] contrast-110'
              }`}
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
      <div
        className="lg:hidden absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 36, ease: 'linear' }}
          className="relative w-56 h-56 opacity-[0.07] will-change-transform"
        >
          <img
            src="/logo.webp"
            alt="Khetan Hospital Emblem"
            className="w-full h-full object-contain filter"
            loading="lazy"
          />
        </motion.div>
      </div>
    </>
  );
};

export default RevolvingHospitalLogo;
