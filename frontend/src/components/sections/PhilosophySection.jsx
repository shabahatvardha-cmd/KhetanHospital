import React from 'react';
import { Heart, Activity } from 'lucide-react';

export const PhilosophySection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#08284d] via-[#0c3668] to-[#08284d] text-white text-center relative overflow-hidden" aria-label="Our care philosophy">
      {/* Background medical grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#00b4d8_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#00b4d8] text-xs font-bold tracking-widest uppercase border border-white/10">
          <Heart className="w-3.5 h-3.5 text-[#f37021] fill-current" />
          <span>OUR COMMITMENT TO YOUR INDEPENDENCE</span>
        </div>

        <blockquote className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug text-slate-100">
          “Mobility isn’t simply walking or bending without pain.<br />
          <span className="text-[#00b4d8]">It is your independence, your livelihood, and your freedom to live fully.</span> Caring for your joints means restoring your whole world.”
        </blockquote>

        <div className="pt-4 flex flex-col items-center">
          <span className="text-sm font-bold text-white tracking-wide">
            Dr. Vatsal Khetan
          </span>
          <span className="text-xs text-orange-300 font-mono mt-0.5">
            MS (Ortho), MRCS, FRCS (Edinburgh), M.Ch (UK), IOC Sports Med
          </span>
        </div>
      </div>
    </section>
  );
};
