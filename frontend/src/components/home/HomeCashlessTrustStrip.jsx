import React from 'react';
import { ShieldCheck, Zap, FileText, PhoneCall, CheckCircle2 } from 'lucide-react';
import { clinicInfo } from '../../data/clinicContent';

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
    <section className="relative w-full bg-transparent py-2 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

        {/* Left: Assurance Proposition (5 Cols) */}
        <div className="lg:col-span-5 space-y-2">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
            100% Cashless Hospitalization &amp; Fast TPA Approvals
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            We partner with all major health insurance providers and TPAs. Our dedicated in-hospital desk handles pre-authorizations and claims directly so you focus entirely on recovery.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-300 font-semibold">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero Hidden Fees</span>
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Fast Pre-Auth Help</span>
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>All Major TPAs</span>
            </span>
          </div>
        </div>

        {/* Right: Insurer Badges Grid & Help CTA (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0c2647]/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-sky-400/25 shadow-xl backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Recognized Insurance Partners &amp; TPAs
            </span>
            <a
              href={`tel:${clinicInfo.phone}`}
              className="text-xs font-bold text-sky-300 hover:text-sky-200 flex items-center gap-1 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-sky-400" />
              <span>Insurance Desk: {clinicInfo.phoneFormatted}</span>
            </a>
          </div>

          {/* Badges Flow */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {INSURERS.map((ins, idx) => (
              <div
                key={idx}
                className="px-3 py-2.5 rounded-xl bg-[#081d38] border border-sky-500/30 text-center text-xs font-bold text-slate-100 shadow-2xs hover:border-sky-400 hover:text-white transition-all flex items-center justify-center truncate"
              >
                <span className="truncate">{ins}</span>
              </div>
            ))}
          </div>

          <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 border-t border-sky-500/20">
            <span>Have corporate or private insurance? We verify coverage within 15 minutes.</span>
            <a
              href={`https://wa.me/91${clinicInfo.phone}?text=Hello%2C%20I%20would%20like%20to%20verify%20cashless%20mediclaim%20eligibility%20at%20Khetan%20Hospital.`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 shrink-0"
            >
              Verify on WhatsApp &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeCashlessTrustStrip;
