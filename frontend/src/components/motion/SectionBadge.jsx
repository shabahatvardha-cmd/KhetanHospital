import React from 'react';

export function SectionBadge({
  text = "",
  theme = "light",
  className = ""
}) {
  const isDark = theme === "dark";

  return (
    <div className={`inline-flex items-center gap-2 mono-tag text-xs py-1 px-3 rounded-full border ${
      isDark
        ? 'bg-white/5 text-sky-400 border-white/10'
        : 'bg-[#08284d]/5 text-[#08284d] border-[#08284d]/10'
    } ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
      <span>{text}</span>
    </div>
  );
}

export default SectionBadge;

