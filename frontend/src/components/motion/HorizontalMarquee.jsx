import React from 'react';

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
    <div className={`relative w-full overflow-hidden py-3.5 select-none ${
      isDark ? 'bg-[#08284d] text-white' : 'bg-slate-100 text-[#08284d]'
    } ${className}`}>
      <div className={`flex w-max ${animationClass} hover:[animation-play-state:paused]`}>
        {[...Array(4)].map((_, loopIdx) => (
          <div key={loopIdx} className="flex items-center gap-8 shrink-0 pr-8">
            {words.map((word, idx) => (
              <span key={idx} className="flex items-center gap-8">
                <span className="text-xs sm:text-sm font-extrabold tracking-ultra-wide uppercase font-mono">
                  {word}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-sky-400' : 'bg-slate-400'}`} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HorizontalMarquee;

