import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Download, ExternalLink, Calendar, MapPin, Phone } from 'lucide-react';

export const PosterLightboxModal = ({ isOpen, onClose, imageSrc = '/images/khetan-knee-camp-poster-general.png' }) => {
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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[94vh] bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-700 z-10 my-auto flex flex-col"
        >
          {/* Top Bar */}
          <div className="p-3 sm:p-4 bg-slate-950 text-white flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white">
                Official Monthly Knee Camp Poster &bull; नि:शुल्क घुटना शिविर
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={imageSrc}
                target="_blank"
                rel="noopener noreferrer"
                title="Open original in new tab"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Full Resolution Scrollable Poster Display */}
          <div className="relative flex-1 overflow-y-auto p-2 sm:p-4 bg-slate-950 flex justify-center items-center">
            <img
              src={imageSrc}
              alt="Khetan Hospital Monthly Free Knee Camp Poster"
              className="max-w-full h-auto max-h-[75vh] object-contain rounded-xl shadow-2xl select-none"
            />
          </div>

          {/* Bottom Bar with Contact & Venue Reminder */}
          <div className="p-3 sm:p-3.5 bg-slate-900 border-t border-white/10 text-slate-300 text-[11px] sm:text-xs flex flex-wrap items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-amber-400 font-bold">
                <Calendar className="w-3.5 h-3.5" />
                <span>Every Month &bull; 10 AM – 1 PM</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Betiahata, Gorakhpur</span>
              </span>
            </div>

            <a
              href="tel:9161995550"
              className="px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all inline-flex items-center gap-1.5 shadow-sm"
            >
              <Phone className="w-3 h-3" />
              <span>Call: 9161995550</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PosterLightboxModal;
