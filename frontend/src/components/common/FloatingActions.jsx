import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingActions = ({ onBookClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 pointer-events-none">
      {/* WhatsApp Floating Action Button (Oreo Style) */}
      <a
        href="https://wa.me/919662365917?text=Hello%20Khetan%20Hospital,%20I%20would%20like%20to%20book%20an%20OPD%20appointment."
        target="_blank"
        rel="noreferrer"
        aria-label="Book OPD via WhatsApp"
        className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20ba59] transition-all duration-300 hover:scale-105 group border-2 border-white"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping"></span>
        </div>
        <span className="text-xs font-bold tracking-tight">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
};
