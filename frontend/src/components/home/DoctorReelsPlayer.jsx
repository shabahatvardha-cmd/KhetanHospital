import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Maximize2, ExternalLink, Play, Sparkles, Volume2, Film, RefreshCw } from 'lucide-react';
import { DOCTOR_REELS, INSTAGRAM_PROFILE } from '../../data/doctorReels';
import { doctorImages } from '../../data/imageConfig';

export const DoctorReelsPlayer = ({ onExpandModal }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isInlinePlaying, setIsInlinePlaying] = useState(false);
  const activeReel = DOCTOR_REELS[activeTab];

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Ambient Glow */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-rose-500/10 via-sky-500/10 to-indigo-500/10 rounded-2xl blur-xl -z-10 pointer-events-none" />

      {/* Main Container */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-xl flex flex-col">

        {/* 1. Ultra-Compact Top Bar with Reel Switcher Tabs (38px height) */}
        <div className="p-1 sm:p-1.5 bg-slate-900 text-white flex items-center justify-between gap-1.5 border-b border-white/10">
          <div className="flex items-center gap-1 shrink-0 px-1">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-[1px] flex items-center justify-center">
              <Instagram className="w-3 h-3 text-white" />
            </div>
            <span className="text-[10px] font-mono text-slate-300 font-bold hidden xs:inline">
              Reels
            </span>
          </div>

          {/* Switcher Tabs */}
          <div className="flex items-center gap-1 flex-1 max-w-[280px]">
            {DOCTOR_REELS.map((reel, idx) => (
              <button
                key={reel.id}
                onClick={() => {
                  setActiveTab(idx);
                }}
                className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] sm:text-[10.5px] font-bold transition-all text-center truncate cursor-pointer ${
                  activeTab === idx
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/15'
                }`}
              >
                <span className="truncate">
                  {idx === 0 ? '🎬 1. Why Surgeon' : '🔬 2. DAA Method'}
                </span>
              </button>
            ))}
          </div>

          {/* External Instagram Trigger */}
          <a
            href={activeReel.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open on Instagram"
            className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all shrink-0"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* 2. Content Area: Clean Compact Preview or Inline Player */}
        {isInlinePlaying ? (
          /* Inline Player Mode: Clean, precisely-bounded iframe */
          <div className="relative w-full h-[320px] sm:h-[350px] bg-black flex flex-col">
            <iframe
              key={activeReel.id}
              src={activeReel.embedUrl}
              className="w-full flex-1 border-0"
              frameBorder="0"
              scrolling="no"
              allowTransparency="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title={activeReel.title}
            />
            {/* Minimal Bar to Exit Inline or Expand */}
            <div className="px-3 py-1.5 bg-slate-900 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
              <button
                onClick={() => setIsInlinePlaying(false)}
                className="text-slate-400 hover:text-white font-medium cursor-pointer"
              >
                &larr; Back to Card
              </button>
              {onExpandModal && (
                <button
                  onClick={() => onExpandModal(activeTab)}
                  className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Fullscreen</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Default Preview Mode: Compact, high-impact, zero scroll, zero top/bottom cut */
          <div
            onClick={() => onExpandModal ? onExpandModal(activeTab) : setIsInlinePlaying(true)}
            className="relative w-full h-[190px] xs:h-[210px] sm:h-[240px] bg-gradient-to-br from-slate-950 via-[#08284d] to-slate-900 overflow-hidden cursor-pointer group flex items-center select-none"
          >
            {/* Background Medical OT Texture */}
            <img
              src="/images/backgrounds/modular-ot.jpg"
              alt="Modular OT Background"
              className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />

            {/* Doctor Authentic Cutout on the Right */}
            <div className="absolute right-0 bottom-0 h-full w-[45%] flex items-end justify-end pointer-events-none overflow-hidden">
              <img
                src={doctorImages.hero}
                alt="Dr. Vatsal Khetan"
                className="h-[92%] sm:h-[95%] w-auto object-contain object-bottom drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] group-hover:scale-102 transition-transform duration-500"
              />
            </div>

            {/* Left Content Column */}
            <div className="relative z-10 p-3 sm:p-4 max-w-[62%] sm:max-w-[58%] space-y-1.5 sm:space-y-2">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 text-[9px] font-mono font-bold tracking-wider uppercase">
                <Sparkles className="w-2.5 h-2.5 text-rose-400" />
                <span>Dr. Vatsal Speaks</span>
              </div>

              {/* Hindi & English Titles */}
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-white leading-snug line-clamp-1 group-hover:text-rose-200 transition-colors">
                  {activeReel.hindiTitle}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-sky-200/90 font-medium line-clamp-1">
                  {activeReel.title}
                </p>
              </div>

              {/* Verified Credential Tag */}
              <div className="text-[9px] text-slate-300 font-mono font-medium flex items-center gap-1">
                <span>FRCS (Edinburgh)</span>
                <span>&bull;</span>
                <span>Robotic Specialist</span>
              </div>

              {/* Interactive Play Trigger Button */}
              <div className="pt-1 flex items-center gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white text-[10.5px] sm:text-xs font-bold tracking-wide shadow-md group-hover:shadow-rose-500/30 group-hover:scale-[1.03] transition-all flex items-center gap-1.5"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center">
                    <Play className="w-2 h-2 text-white fill-current" />
                  </div>
                  <span>Watch Reel</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsInlinePlaying(true);
                  }}
                  className="px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 text-[9.5px] font-mono transition-colors hidden sm:inline-block"
                  title="Play directly on page"
                >
                  Inline
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DoctorReelsPlayer;
