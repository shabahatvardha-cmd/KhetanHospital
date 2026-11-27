import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Maximize2, ExternalLink, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import { DOCTOR_REELS, INSTAGRAM_PROFILE } from '../../data/doctorReels';

export const DoctorReelsPlayer = ({ onExpandModal }) => {
  const [activeTab, setActiveTab] = useState(0);
  const activeReel = DOCTOR_REELS[activeTab];

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
      {/* Decorative Ambient Aura behind the player */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-rose-500/15 via-purple-500/15 to-sky-500/15 rounded-3xl blur-2xl -z-10 pointer-events-none" />

      {/* Main Player Housing */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200/90 bg-white shadow-2xl flex flex-col">

        {/* 1. Header Bar with Instagram Verification Badge */}
        <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-[#08284d] to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-[1.5px] shrink-0 shadow-sm">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                <Instagram className="w-4 h-4 text-rose-400" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white truncate">
                  Dr. Vatsal Khetan
                </span>
                <span className="px-1 py-0.2 rounded text-[8px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 shrink-0">
                  FRCS
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-mono truncate">
                {INSTAGRAM_PROFILE.handle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onExpandModal && (
              <button
                onClick={() => onExpandModal(activeTab)}
                aria-label="Expand video player"
                title="Watch Fullscreen"
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}
            <a
              href={activeReel.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on Instagram"
              title="Open on Instagram"
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2. Interactive Video Tabs */}
        <div className="p-1.5 bg-slate-100/90 border-b border-slate-200/80 flex items-center gap-1.5">
          {DOCTOR_REELS.map((reel, idx) => (
            <button
              key={reel.id}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[10.5px] font-bold transition-all truncate text-center cursor-pointer ${
                activeTab === idx
                  ? 'bg-[#08284d] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/60'
              }`}
            >
              <span className="truncate">
                {idx === 0 ? '🎬 1. Why Knee Surgeon' : '🔬 2. DAA Technique'}
              </span>
            </button>
          ))}
        </div>

        {/* 3. Live Embedded Instagram Frame */}
        <div className="relative w-full h-[410px] sm:h-[440px] bg-black overflow-hidden flex items-center justify-center">
          <iframe
            key={activeReel.id}
            src={activeReel.embedUrl}
            className="w-full h-full border-0 select-none"
            frameBorder="0"
            scrolling="no"
            allowTransparency="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title={activeReel.title}
          />
        </div>

        {/* 4. Bottom Context Footer */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-900 truncate">
              {activeReel.title}
            </h4>
            <p className="text-[10px] text-slate-500 font-mono truncate">
              {activeReel.hindiTitle}
            </p>
          </div>

          <a
            href={activeReel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 text-[10px] font-bold tracking-wide flex items-center gap-1 transition-colors shrink-0"
          >
            <Instagram className="w-3 h-3" />
            <span>Follow</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default DoctorReelsPlayer;
