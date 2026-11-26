import React from 'react';
import { ShieldCheck, ArrowUpRight, CheckCircle2, Sparkles, Activity } from 'lucide-react';

export const JourneyTimelineSection = ({ onBookClick }) => {
  const steps = [
    {
      num: "01",
      title: "Consultation & 3D Digital Imaging",
      desc: "Comprehensive OPD evaluation at Bargadawa, weight-bearing alignment X-rays, and transparent explanation of joint condition and preservation options."
    },
    {
      num: "02",
      title: "Personalized Computer Surgical Planning",
      desc: "Pre-operative 3D mapping and virtual simulation of implant sizing to preserve maximum natural bone, ligaments, and healthy cartilage."
    },
    {
      num: "03",
      title: "Sub-Millimeter Robotic / Keyhole Surgery",
      desc: "Sub-millimeter robotic joint placement or minimally invasive keyhole arthroscopy with minimal muscle cutting, low blood loss, and minimal pain."
    },
    {
      num: "04",
      title: "Fast-Track 24-Hour Recovery & Life Follow-Up",
      desc: "Assisted walking within 24 hours of surgery, tailored physiotherapy guidelines, and ongoing clinical reviews to ensure lifelong pain-free mobility."
    }
  ];

  return (
    <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-sky-50/40 border-t border-slate-200 relative overflow-hidden" aria-labelledby="journey-title">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Journey Overview (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-sky-100 text-[#08284d]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00b4d8]" />
            04 / YOUR PATHWAY TO PAIN-FREE MOBILITY
          </span>

          <h2 id="journey-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#08284d] leading-tight">
            Precision for<br />
            <span className="text-[#00b4d8]">every single step.</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
            Orthopedic surgery should never feel intimidating. Dr. Vatsal Khetan and his team guide you through every milestone—from your initial diagnosis and 3D computer simulation to fast-track post-op rehabilitation.
          </p>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#08284d]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Full Mobility Assistance Protocol</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Every surgical patient receives a dedicated recovery care plan, pain management protocols, and same-day mobility support.
            </p>
          </div>

          <div>
            <button 
              onClick={onBookClick}
              className="px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#08284d] hover:bg-[#00458b] text-white transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>Schedule Initial Evaluation</span>
              <ArrowUpRight className="w-4 h-4 text-[#f37021] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Step-by-Step Pathway (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              CLINICAL MILESTONES
            </span>
            <span className="text-xs font-bold text-[#00b4d8] flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" />
              <span>Evidence-Based Care Pathway</span>
            </span>
          </div>

          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-5 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#08284d] text-white flex items-center justify-center font-mono font-bold text-base shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-[#00b4d8] transition-all">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#08284d] group-hover:text-[#00b4d8] transition-colors mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 pt-4 border-t border-slate-100 text-center sm:text-left">
            * Recovery timelines vary based on individual bone quality, age, and health history. Customized during consultation.
          </p>
        </div>

      </div>
    </section>
  );
};
