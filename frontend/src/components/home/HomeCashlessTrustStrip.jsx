import React from 'react';
import { ShieldCheck, PhoneCall, CheckCircle2 } from 'lucide-react';
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
    <section className="relative w-full bg-white border-y border-slate-200/90 py-10 sm:py-14 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50/70 rounded-3xl border-2 border-slate-900 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left: Assurance Proposition (5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-[10.5px] font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% Cashless Hospitalization</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#08284d] tracking-tight leading-tight">
                Zero-Hassle Mediclaim &amp; Fast TPA Approvals
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                We partner with all leading health insurance companies and TPAs. Our dedicated in-hospital desk manages pre-authorizations and cashless claims from start to finish so your family can focus entirely on patient recovery.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-800 font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero Hidden Charges</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Fast-Track Pre-Auth</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>All TPAs Recognized</span>
                </span>
              </div>
            </div>

            {/* Right: Insurer Badges Grid & Help CTA (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-slate-900 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <span className="text-[11px] font-mono font-black text-slate-900 uppercase tracking-wider">
                  Partnered Insurance Companies &amp; TPAs
                </span>
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="text-xs font-mono font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-sky-600" />
                  <span>Helpdesk: {clinicInfo.phoneFormatted}</span>
                </a>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {INSURERS.map((ins, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-3 rounded-xl bg-slate-50 border-2 border-slate-900 text-center text-xs font-bold text-slate-900 shadow-2xs hover:bg-[#08284d] hover:text-white hover:border-[#08284d] transition-all flex items-center justify-center truncate cursor-default group"
                  >
                    <span className="truncate">{ins}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-500 border-t border-slate-100">
                <span>Immediate desk support available 24/7 for emergency surgical admissions.</span>
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
      </div>
    </section>
  );
};

export default HomeCashlessTrustStrip;
