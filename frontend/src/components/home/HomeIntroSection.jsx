import React, { forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Instagram,
  Calendar,
  MapPin,
  Phone,
  ArrowRight,
  Play,
  HeartHandshake,
  Activity,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { AnimatedWordReveal } from '../motion/AnimatedWordReveal';

/**
 * 🏥 SECTION 3 — HOSPITAL DOCTORS, MULTIDISCIPLINARY CARE & COMMUNITY OUTREACH
 * 
 * Part 1: Verified Dual Specialist Care (Dr. Vatsal Khetan & Dr. Heli Khetan)
 * Part 2: Monthly Free Knee & Bone Camp (Official Clinic Announcement)
 * Part 3: Video Stories Trigger
 */
export const HomeIntroSection = forwardRef((props, forwardedRef) => {
  const localRef = useRef(null);
  const sectionRef = forwardedRef || localRef;

  return (
    <section
      id="hospital-intro"
      ref={sectionRef}
      className="relative w-full bg-[#f8fafc] border-t border-slate-200/90 select-none py-10 sm:py-16 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10 sm:space-y-12">

        {/* ─────────────────────────────────────────────────────────────
            1. SECTION HEADER
        ────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-[10.5px] font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span>Authentic Specialist Care &bull; Khetan Hospital Doctors</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#08284d] tracking-tight leading-tight">
              <AnimatedWordReveal
                text="Meet Our Hospital Doctors & Specialist Team"
                delay={0.1}
                stagger={0.03}
              />
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light max-w-2xl">
              From sub-millimeter robotic knee replacements and sports arthroscopy to non-surgical arthritis management, our verified hospital specialists provide complete joint health solutions in Eastern UP.
            </p>
          </div>

          {/* Video Stories Quick Trigger */}
          <button
            type="button"
            onClick={() => props.onExpandModal && props.onExpandModal(0)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border-2 border-slate-900 text-slate-800 text-xs font-bold hover:bg-[#08284d] hover:text-white transition-all shadow-xs group cursor-pointer self-start sm:self-auto shrink-0"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center p-[1px]">
              <Instagram className="w-3 h-3 text-white" />
            </div>
            <span>Watch Doctor's Stories (2 Reels)</span>
            <Play className="w-3 h-3 text-sky-500 fill-current ml-1" />
          </button>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. MULTIDISCIPLINARY DOCTORS: SURGICAL & NON-SURGICAL CARE
        ────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">

          {/* DOCTOR 1: Dr. Vatsal Khetan */}
          <div className="bg-white rounded-3xl border-2 border-slate-900 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-sky-600 transition-all duration-300 flex flex-col justify-between space-y-5">
            <div>
              {/* Doctor Header Profile */}
              <div className="flex items-start gap-4">
                <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl border-2 border-slate-900 overflow-hidden bg-slate-100 shrink-0 shadow-2xs relative">
                  <img
                    src="/images/dr-vatsal-camp.jpg"
                    alt="Dr. Vatsal Khetan — Robotic Knee & Orthopaedic Surgeon"
                    className="w-full h-full object-cover object-top select-none"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/dr-vatsal-hero.webp';
                    }}
                  />
                  <div className="absolute top-1 left-1">
                    <span className="px-1.5 py-0.5 rounded bg-[#08284d] text-white text-[8px] font-mono font-bold uppercase">
                      FRCS
                    </span>
                  </div>
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-100 text-[9.5px] font-mono font-bold uppercase">
                    <Award className="w-2.5 h-2.5 text-sky-600" />
                    <span>Royal College Fellow (Edinburgh)</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
                    Dr. Vatsal Khetan
                  </h3>
                  <p className="text-xs font-bold text-sky-700">
                    Senior Knee Specialist &bull; घुटने के वरिष्ठ विशेषज्ञ
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 font-medium">
                    MBBS &bull; MS (Ortho) &bull; FRCS (Edinburgh) &bull; M.Ch Knee (UK)
                  </p>
                </div>
              </div>

              {/* Supporting Clinical Technology Visual (Strictly Unique) */}
              <div className="mt-4 relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src="/images/robotic-ct-planning.webp"
                  alt="Sub-Millimeter 3D CT Robotic Navigation Planning"
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-1 rounded-md bg-[#08284d]/90 backdrop-blur-xs text-white text-[9.5px] font-mono font-bold uppercase tracking-wider shadow-xs flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-sky-400" />
                    <span>0.5mm 3D Computer Navigation</span>
                  </span>
                </div>
              </div>

              {/* Clinical Guarantees from Clinic Practice */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Sub-Millimeter Robotic Knee Surgery &bull; <span className="font-normal text-slate-600">रोबोटिक सर्जरी की सुविधा</span></span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Keyhole Ligament &amp; Nerve Work &bull; <span className="font-normal text-slate-600">घुटने की नस का काम</span></span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Rapid Mobility Protocol &bull; <span className="font-normal text-slate-600">घुटना प्रत्यारोपण एवं 24 घंटे में चलना</span></span>
                </div>
              </div>
            </div>

            {/* Action Triggers */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => props.onBookClick && props.onBookClick()}
                className="px-5 py-2.5 rounded-full bg-[#08284d] text-white text-xs font-bold hover:bg-sky-600 transition-colors shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                <span>Consult Dr. Vatsal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => props.onExpandModal && props.onExpandModal(0)}
                className="text-xs font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Watch Video</span>
                <Play className="w-3 h-3 fill-current" />
              </button>
            </div>
          </div>

          {/* DOCTOR 2: Dr. Heli Khetan */}
          <div className="bg-white rounded-3xl border-2 border-slate-900 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-emerald-600 transition-all duration-300 flex flex-col justify-between space-y-5">
            <div>
              {/* Doctor Header Profile */}
              <div className="flex items-start gap-4">
                <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl border-2 border-slate-900 overflow-hidden bg-slate-100 shrink-0 shadow-2xs relative">
                  <img
                    src="/images/dr-heli-khetan.jpg"
                    alt="Dr. Heli Khetan — Arthritis & Pain Management Specialist"
                    className="w-full h-full object-cover object-top select-none"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/hospital-interior.webp';
                    }}
                  />
                  <div className="absolute top-1 left-1">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-800 text-white text-[8px] font-mono font-bold uppercase">
                      Care
                    </span>
                  </div>
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100 text-[9.5px] font-mono font-bold uppercase">
                    <HeartHandshake className="w-2.5 h-2.5 text-emerald-600" />
                    <span>Specialist Physician</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
                    Dr. Heli Khetan
                  </h3>
                  <p className="text-xs font-bold text-emerald-700">
                    Arthritis &amp; Pain Specialist &bull; गठिया और दर्द विशेषज्ञ
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 font-medium">
                    Rheumatology &bull; Chronic Joint Pain &bull; Bone Health Optimization
                  </p>
                </div>
              </div>

              {/* Supporting Clinical Technology Visual (Strictly Unique) */}
              <div className="mt-4 relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src="/images/happy-knee-walk.webp"
                  alt="Non-Surgical Joint Rehabilitation and Rapid Recovery"
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-900/90 backdrop-blur-xs text-white text-[9.5px] font-mono font-bold uppercase tracking-wider shadow-xs flex items-center gap-1">
                    <Activity className="w-2.5 h-2.5 text-emerald-300" />
                    <span>Non-Surgical Joint Restoration</span>
                  </span>
                </div>
              </div>

              {/* Clinical Guarantees from Clinic Practice */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Early Arthritis &amp; Joint Diagnosis &bull; <span className="font-normal text-slate-600">गठिया का सटीक निदान</span></span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Targeted Injections &amp; Therapy &bull; <span className="font-normal text-slate-600">घुटने का इंजेक्शन एवं दवाई</span></span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Nerve &amp; Bone Health Protocols &bull; <span className="font-normal text-slate-600">नस एवं हड्डी का संपूर्ण इलाज</span></span>
                </div>
              </div>
            </div>

            {/* Action Triggers */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => props.onBookClick && props.onBookClick()}
                className="px-5 py-2.5 rounded-full bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                <span>Consult Dr. Heli</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="tel:9161995550"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. MONTHLY FREE KNEE CAMP (नि:शुल्क घुटना शिविर)
        ────────────────────────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-amber-50/90 via-white to-sky-50/90 rounded-3xl border-2 border-slate-900 p-5 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

            {/* Left: Authentic Official Flyer Image Frame */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              <div className="relative aspect-[4/3] w-full rounded-2xl border-2 border-slate-900 overflow-hidden bg-white shadow-md">
                <img
                  src="/images/free-knee-camp-banner.jpg"
                  alt="Khetan Knee N Shoulder Clinic — Monthly Free Knee Camp Flyer"
                  className="w-full h-full object-cover object-top select-none"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 text-[10px] font-mono font-black uppercase tracking-wider shadow-xs">
                    ★ Official Clinic Notice
                  </span>
                </div>
              </div>

              {/* Schedule Strip */}
              <div className="w-full mt-3 p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs font-mono font-bold text-slate-800">
                <span className="inline-flex items-center gap-1.5 text-amber-700">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Every Month (हर महीने)</span>
                </span>
                <span className="text-slate-500">10:00 AM - 1:00 PM</span>
              </div>
            </div>

            {/* Right: Camp Breakdown, Free Tests & Concessions */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-900 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <span>Community Health Initiative</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                  Monthly Free Knee &amp; Bone Camp &bull; नि:शुल्क घुटना शिविर
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  Held at <strong className="text-slate-800 font-semibold">Khetan Knee N Shoulder Clinic</strong>, S.K. Pandey Complex, Betiahata, Gorakhpur. Dedicated to early arthritis diagnosis and pain relief for Purvanchal residents.
                </p>
              </div>

              {/* 6 Free Diagnostics Grid */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wide text-slate-800">
                  100% Free Diagnostics Included (नि:शुल्क जांच):
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-[11px] font-semibold text-slate-800 flex items-center gap-1.5 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Free OPD Consultation</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-[11px] font-semibold text-slate-800 flex items-center gap-1.5 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Bone Health Check (हड्डी जांच)</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-[11px] font-semibold text-slate-800 flex items-center gap-1.5 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Nerve Assessment (नस जांच)</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-[11px] font-semibold text-slate-800 flex items-center gap-1.5 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Blood Sugar Screening</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-[11px] font-semibold text-slate-800 flex items-center gap-1.5 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Blood Pressure Check</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-[11px] font-semibold text-slate-800 flex items-center gap-1.5 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Uric Acid Evaluation</span>
                  </div>
                </div>
              </div>

              {/* Concessions Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[10.5px] font-mono font-bold">
                <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                  50% OFF X-Rays
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                  30% OFF Blood Tests
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                  10% OFF Medicines
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                  Special Sports Athlete Concession
                </span>
              </div>

              {/* Camp Contact & Slot Booking Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="tel:9161995550"
                  className="px-6 py-2.5 rounded-full bg-[#08284d] text-white text-xs font-bold hover:bg-sky-600 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call to Register: 9161995550</span>
                </a>

                <button
                  type="button"
                  onClick={() => props.onBookClick && props.onBookClick()}
                  className="px-5 py-2.5 rounded-full border-2 border-slate-900 bg-white text-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Book Camp Appointment Online
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
});

HomeIntroSection.displayName = 'HomeIntroSection';

export default HomeIntroSection;
