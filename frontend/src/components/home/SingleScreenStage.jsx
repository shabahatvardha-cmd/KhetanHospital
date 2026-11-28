import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * ⚡ SINGLE SCREEN 3D STAGE
 * 
 * Replaces multi-card overlapping clutter with a single, cinematic, 
 * un-clipped 3D showcase screen.
 */
export const SingleScreenStage = ({
  imageSrc,
  imageAlt,
  badgeIcon = null,
  badgeText,
  badgeColor = "text-sky-300 border-sky-500/30",
  pulseColor = "bg-emerald-400",
  footerIcon = null,
  footerTitle,
  footerStatus,
  footerStatusColor = "text-emerald-400",
  style = {},
  className = ""
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      style={prefersReducedMotion ? {} : style}
      whileHover={{ scale: 1.02, rotateY: 0, rotateX: 0, transition: { duration: 0.3 } }}
      className={`relative w-full max-w-lg aspect-[16/10] rounded-2xl overflow-hidden border-2 border-sky-400/40 shadow-2xl bg-slate-900 cursor-pointer group ${className}`}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Bottom Telemetry Footer Bar */}
      {(footerTitle || footerStatus) && (
        <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/85 border border-white/10 text-white backdrop-blur-md flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 min-w-0">
            {footerIcon}
            <span className="text-[11px] font-bold text-slate-200 truncate">{footerTitle}</span>
          </div>
          {footerStatus && (
            <span className={`text-[10px] font-mono font-bold shrink-0 ${footerStatusColor}`}>
              {footerStatus}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SingleScreenStage;

