import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, FileText, PhoneCall, CheckCircle2 } from 'lucide-react';
import { clinicInfo } from '../../data/clinicContent';
import { TiltSpotlightCard } from '../motion/TiltSpotlightCard';

const INSURERS = [
  'Star Health',
  'Care Health',
  'HDFC ERGO',
  'ICICI Lombard',
  'Niva Bupa',
  'Bajaj Allianz',
  'Aditya Birla',
  'New India Assurance',
];

export const HomeCashlessTrustStrip = () => {
  return (
    <section className="relative w-full bg-[#030712] border-y border-white/10 py-10 sm:py-14 select-none text-white overflow-hidden">
      {/* Living Ambient Lighting Node */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-[480px] h-[480px] rounded-full bg-emerald-500 blur-[150px] -z-10"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* Left: Assurance Proposition (5 Cols) with In-View Stagger */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-2.5"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hassle-Free Mediclaim &amp; TPA</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              100% Cashless Hospitalization &amp; Fast TPA Approvals
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              We partner with all major health insurance providers and TPAs. Our dedicated in-hospital desk handles pre-authorizations and claims directly so you focus entirely on recovery.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-300 font-semibold">
              <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Hidden Fees</span>
              </motion.span>
              <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Fast Pre-Auth Help</span>
              </motion.span>
              <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>All Major TPAs</span>
              </motion.span>
            </div>
          </motion.div>

          {/* Right: Insurer Badges Grid with 3D Tilt Card & Specular Spotlight */}
          <div className="lg:col-span-7">
            <TiltSpotlightCard
              maxTilt={4}
              delay={0.15}
              spotlightColor="rgba(52, 211, 153, 0.18)"
              borderColor="rgba(52, 211, 153, 0.45)"
              className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-5 sm:p-7 border border-white/10 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Recognized Insurance Partners &amp; TPAs
                </span>
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="text-xs font-bold text-cyan-300 hover:text-cyan-200 flex items-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Insurance Desk: {clinicInfo.phoneFormatted}</span>
                </a>
              </div>

              {/* Badges Flow in Frosted Glass Pills with Kinetic Hover Lift */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {INSURERS.map((ins, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-center text-xs font-bold text-slate-200 shadow-sm hover:border-cyan-400/60 hover:text-white hover:bg-white/[0.08] transition-all flex items-center justify-center truncate cursor-default"
                  >
                    <span className="truncate">{ins}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 border-t border-white/10">
                <span>Have corporate or private insurance? We verify coverage within 15 minutes.</span>
                <motion.a
                  whileHover={{ x: 3 }}
                  href={`https://wa.me/91${clinicInfo.phone}?text=Hello%2C%20I%20would%20like%20to%20verify%20cashless%20mediclaim%20eligibility%20at%20Khetan%20Hospital.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 shrink-0"
                >
                  Verify on WhatsApp &rarr;
                </motion.a>
              </div>
            </TiltSpotlightCard>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeCashlessTrustStrip;
