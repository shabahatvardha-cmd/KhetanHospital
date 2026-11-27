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
    <section className="relative w-full bg-white border-y border-slate-200/90 py-8 sm:py-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* Left: Assurance Proposition (5 Cols) */}
          <div className="lg:col-span-5 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hassle-Free Mediclaim &amp; TPA</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#08284d] tracking-tight leading-snug">
              100% Cashless Hospitalization &amp; Fast TPA Approvals
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              We partner with all major health insurance providers and TPAs. Our dedicated in-hospital desk handles pre-authorizations and claims directly so you focus entirely on recovery.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-700 font-semibold">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Hidden Fees</span>
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Fast Pre-Auth Help</span>
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>All Major TPAs</span>
              </span>
            </div>
          </div>

          {/* Right: Insurer Badges Grid & Help CTA (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                Recognized Insurance Partners &amp; TPAs
              </span>
              <a
                href={`tel:${clinicInfo.phone}`}
                className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 transition-colors"
              >
                <PhoneCall className="w-3 h-3 text-sky-600" />
                <span>Insurance Desk: {clinicInfo.phoneFormatted}</span>
              </a>
            </div>

            {/* Badges Flow */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {INSURERS.map((ins, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2.5 rounded-xl bg-white border border-slate-200/90 text-center text-xs font-bold text-slate-800 shadow-2xs hover:border-sky-400 hover:shadow-xs transition-all flex items-center justify-center truncate"
                >
                  <span className="truncate">{ins}</span>
                </div>
              ))}
            </div>

            <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 border-t border-slate-200/60">
              <span>Have corporate or private insurance? We verify coverage within 15 minutes.</span>
              <a
                href={`https://wa.me/91${clinicInfo.phone}?text=Hello%2C%20I%20would%20like%20to%20verify%20cashless%20mediclaim%20eligibility%20at%20Khetan%20Hospital.`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-2 shrink-0"
              >
                Verify on WhatsApp &rarr;
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeCashlessTrustStrip;
