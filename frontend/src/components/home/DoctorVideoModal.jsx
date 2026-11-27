import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Instagram, Play, Sparkles, Award } from 'lucide-react';
import { DOCTOR_REELS, INSTAGRAM_PROFILE } from '../../data/doctorReels';

export const DoctorVideoModal = ({ isOpen, onClose, initialIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = React.useState(initialIndex);

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentReel = DOCTOR_REELS[activeIndex] || DOCTOR_REELS[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-10 my-auto flex flex-col"
        >
          {/* Header Bar with Instagram Gradient Accent */}
          <div className="relative p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-[#08284d] to-slate-900 text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5 flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-rose-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                    Dr. Vatsal Khetan
                  </h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    FRCS (Edin)
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-mono">
                  {INSTAGRAM_PROFILE.handle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close video player"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Reel Switcher Tabs */}
          <div className="p-2 sm:p-2.5 bg-slate-100/90 border-b border-slate-200 flex items-center gap-2">
            {DOCTOR_REELS.map((reel, idx) => (
              <button
                key={reel.id}
                onClick={() => setActiveIndex(idx)}
                className={`flex-1 py-2 px-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all text-center truncate cursor-pointer ${
                  activeIndex === idx
                    ? 'bg-[#08284d] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/60'
                }`}
              >
                <span className="block truncate">
                  {idx === 0 ? '🎬 1. Why Knee Surgeon' : '🔬 2. DAA Technique'}
                </span>
              </button>
            ))}
          </div>

          {/* Video Player Frame */}
          <div className="p-3 sm:p-4 bg-slate-50 flex flex-col items-center">
            <div className="relative w-full max-w-[360px] h-[480px] sm:h-[510px] rounded-2xl overflow-hidden bg-black shadow-lg border border-slate-300/80">
              <iframe
                key={currentReel.id}
                src={currentReel.embedUrl}
                className="w-full h-full border-0"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title={currentReel.title}
              />
            </div>

            {/* Video Context & Direct Instagram Trigger */}
            <div className="w-full max-w-[360px] mt-3 space-y-2 text-center">
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {currentReel.description}
              </p>

              <div className="pt-1 flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Instagram Verified Reel
                </span>
                <a
                  href={currentReel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors"
                >
                  <span>Open on Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DoctorVideoModal;
