import React from 'react';

/**
 * 🏥 SCENE 2 — CLINICAL EXCELLENCE CONTINUOUS MARQUEE
 * Smooth, non-distracting kinetic ribbon communicating verified clinical benchmarks.
 * Slows down on hover without halting layout flow.
 */
export function HorizontalMarquee({
  words = [
    "SUB-MILLIMETER ROBOTIC PRECISION",
    "UK ROYAL COLLEGE GOVERNANCE",
    "RAPID MOBILITY IN 24 HOURS",
    "ARTHROSCOPIC SPORTS RESTORATION",
    "SAME-DAY DISCHARGE PROTOCOL",
    "COMPREHENSIVE TRAUMA CARE"
  ],
  direction = "normal",
  className = "",
  theme = "dark"
}) {
  const isDark = theme === "dark";
  const animationClass = direction === "reverse" ? "animate-marquee-reverse" : "animate-marquee";

  return (
    <div
      className={`relative w-full overflow-hidden py-3 select-none transition-colors border-y ${
        isDark
          ? 'bg-[#051329]/80 border-white/10 text-cyan-300 backdrop-blur-md'
          : 'bg-slate-100 border-slate-200 text-[#08284d]'
      } ${className}`}
    >
      <div className={`flex w-max ${animationClass} hover:[animation-play-state:paused]`}>
        {[...Array(4)].map((_, loopIdx) => (
          <div key={loopIdx} className="flex items-center gap-8 shrink-0 pr-8">
            {words.map((word, idx) => (
              <span key={idx} className="flex items-center gap-8">
                <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase font-mono">
                  {word}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-slate-400'}`} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HorizontalMarquee;
