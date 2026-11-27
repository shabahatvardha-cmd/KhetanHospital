import React, { forwardRef, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Phone,
  ArrowRight,
  Play,
  HeartHandshake,
  Activity,
  Maximize2,
  ZoomIn,
  Instagram,
  Clock,
  Zap,
  Info
} from 'lucide-react';
import { AnimatedWordReveal } from '../motion/AnimatedWordReveal';
import { PosterLightboxModal } from './PosterLightboxModal';

/**
 * 🏥 HOSPITAL DOCTORS SECTION — 3-PART MASTER REDESIGN
 * 
 * Part 1: Meet the Doctors (Dr. Vatsal Khetan & Dr. Heli Khetan with authentic verified photos)
 * Part 2: Clinical Expertise (Asymmetric image layout: Robotic Knee, Joint Replacement, Sports Arthroscopy, Rapid Walking)
 * Part 3: Monthly Free Knee Check-up Campaign (Official Poster with Clickable Modal, ₹50 Registration transparent notice)
 */
export const HomeIntroSection = forwardRef((props, forwardedRef) => {
  const localRef = useRef(null);
  const sectionRef = forwardedRef || localRef;
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  return (
    <section
      id="hospital-intro"
      ref={sectionRef}
      className="relative w-full bg-[#f8fafc] border-t border-slate-200/90 select-none py-12 sm:py-20 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16 sm:space-y-24">

        {/* ═══════════════════════════════════════════════════════════════
            PART 1: MEET THE DOCTORS (Editorial-style Authentic Portraits)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-10 sm:space-y-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-[10.5px] font-mono font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <span>Part 1 &bull; Authentic Medical Leadership</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#08284d] tracking-tight leading-tight">
                <AnimatedWordReveal
                  text="Meet Our Hospital Doctors & Specialist Team"
                  delay={0.1}
                  stagger={0.03}
                />
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light max-w-2xl">
                Led by UK Royal College specialist <strong className="text-slate-900 font-semibold">Dr. Vatsal Khetan</strong> and Rheumatology specialist <strong className="text-slate-900 font-semibold">Dr. Heli Khetan</strong>, providing verified surgical and non-surgical joint care directly in Gorakhpur.
              </p>
            </div>

            {/* Video Stories Quick Trigger */}
            {props.onExpandModal && (
              <button
                type="button"
                onClick={() => props.onExpandModal(0)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border-2 border-slate-900 text-slate-800 text-xs font-bold hover:bg-[#08284d] hover:text-white transition-all shadow-xs group cursor-pointer self-start sm:self-auto shrink-0"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center p-[1px]">
                  <Instagram className="w-3 h-3 text-white" />
                </div>
                <span>Doctor's Introduction</span>
                <Play className="w-3 h-3 text-sky-500 fill-current ml-1" />
              </button>
            )}
          </div>

          {/* Dual Doctor Editorial Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Doctor 1: Dr. Vatsal Khetan (7 Cols on desktop) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-slate-900 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-sky-600 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                {/* Header Lockup */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl border-2 border-slate-900 overflow-hidden bg-slate-100 shrink-0 shadow-md">
                    <img
                      src="/images/dr-vatsal-camp.png"
                      alt="Dr. Vatsal Khetan — Senior Robotic Knee & Orthopaedic Surgeon"
                      className="w-full h-full object-cover object-top select-none group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/dr-vatsal-hero.webp';
                      }}
                    />
                    <div className="absolute top-1.5 left-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#08284d] text-white text-[9px] font-mono font-bold uppercase shadow-xs">
                        FRCS
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 min-w-0">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-100 text-[10px] font-mono font-bold uppercase">
                      <Award className="w-3 h-3 text-sky-600" />
                      <span>Fellow, Royal College of Surgeons (Edinburgh)</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Dr. Vatsal Khetan
                    </h3>

                    <p className="text-sm font-bold text-sky-700">
                      Senior Knee &amp; Joint Replacement Specialist &bull; घुटने के वरिष्ठ विशेषज्ञ
                    </p>

                    <p className="text-xs font-mono text-slate-500 leading-snug">
                      MBBS &bull; MS (Ortho) &bull; FRCS (Edinburgh) &bull; M.Ch Knee (UK) &bull; IOC Dip Sports Med (Switzerland)
                    </p>
                  </div>
                </div>

                {/* Plain-Language Clinical Mission */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Specializing in sub-millimeter robotic knee replacements and sports arthroscopy. Trained at Wrightington Hospital (birthplace of modern hip replacement) and Newcastle upon Tyne Hospitals NHS Trust (UK).
                </p>

                {/* 3 Core Clinical Guarantees */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-[10px] font-mono font-bold text-sky-700 uppercase">Precision</div>
                    <div className="text-xs font-bold text-slate-800 leading-tight">Sub-Millimeter Robotic Alignment</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-[10px] font-mono font-bold text-sky-700 uppercase">Tissue Care</div>
                    <div className="text-xs font-bold text-slate-800 leading-tight">Keyhole Ligament Preservation</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-[10px] font-mono font-bold text-sky-700 uppercase">Recovery</div>
                    <div className="text-xs font-bold text-slate-800 leading-tight">Assisted Walking Within 24 Hours</div>
                  </div>
                </div>
              </div>

              {/* Action Triggers */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => props.onBookClick && props.onBookClick()}
                  className="px-6 py-2.5 rounded-full bg-[#08284d] text-white text-xs font-bold hover:bg-sky-600 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Consult Dr. Vatsal Khetan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {props.onExpandModal && (
                  <button
                    type="button"
                    onClick={() => props.onExpandModal(0)}
                    className="text-xs font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Introduction Video</span>
                  </button>
                )}
              </div>
            </div>

            {/* Doctor 2: Dr. Heli Khetan (5 Cols on desktop) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-900 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-emerald-600 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                {/* Header Lockup */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl border-2 border-slate-900 overflow-hidden bg-slate-100 shrink-0 shadow-md">
                    <img
                      src="/images/dr-heli-khetan.png"
                      alt="Dr. Heli Khetan — Arthritis & Pain Specialist"
                      className="w-full h-full object-cover object-top select-none group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1.5 left-1.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-800 text-white text-[9px] font-mono font-bold uppercase shadow-xs">
                        Physician
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 min-w-0">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] font-mono font-bold uppercase">
                      <HeartHandshake className="w-3 h-3 text-emerald-600" />
                      <span>Specialist Care</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Dr. Heli Khetan
                    </h3>

                    <p className="text-sm font-bold text-emerald-700">
                      Arthritis &amp; Pain Specialist &bull; गठिया और दर्द विशेषज्ञ
                    </p>

                    <p className="text-xs font-mono text-slate-500 leading-snug">
                      Rheumatology &bull; Chronic Joint Pain &bull; Bone Health Optimization
                    </p>
                  </div>
                </div>

                {/* Plain-Language Clinical Mission */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Focused on non-surgical arthritis management, early diagnosis of joint inflammation, bone density screening, and targeted local pain therapy for long-term mobility.
                </p>

                {/* 2 Core Clinical Guarantees */}
                <div className="space-y-2 pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Targeted Joint Injections &amp; Therapy</div>
                      <div className="text-[11px] text-slate-500 font-light">घुटने का इंजेक्शन एवं सटीक दवाई से दर्द निवारण</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Nerve &amp; Bone Health Protocol</div>
                      <div className="text-[11px] text-slate-500 font-light">नस एवं हड्डी की जांच और संपूर्ण सुरक्षा</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Triggers */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => props.onBookClick && props.onBookClick()}
                  className="px-6 py-2.5 rounded-full bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Consult Dr. Heli Khetan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="tel:9161995550"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call: 9161995550</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PART 2: CLINICAL EXPERTISE (Asymmetric Rich Image Grid)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-8">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10.5px] font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Part 2 &bull; Clinical Expertise &amp; Surgical Specialties</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08284d] tracking-tight">
              Evidence-Based Surgical &amp; Joint Reconstruction
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light">
              Each procedure is backed by British Royal College governance, computer-assisted navigation, and proven rapid recovery protocols.
            </p>
          </div>

          {/* Asymmetric 4-Card Composition */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">

            {/* Specialty 1: Robotic Knee Surgery (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-slate-900 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-sky-600 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src="/images/surgeries/robotic-knee.webp"
                    alt="Sub-millimeter robotic knee joint replacement"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#08284d]/90 backdrop-blur-xs text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                      Sub-Millimeter Tech
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    Robotic Knee Replacement &amp; 3D CT Planning
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    Uses high-resolution CT navigation to calculate bone cuts with &plusmn;0.5 mm boundary precision. Spares natural collateral ligaments, minimizes blood loss, and delivers natural joint balance.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>0.5mm Tolerance &bull; Bone Sparing</span>
                <span className="font-bold text-sky-700">Robotic Standard</span>
              </div>
            </div>

            {/* Specialty 2: Total & Partial Replacement (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-900 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-sky-600 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src="/images/surgeries/knee-replacement.webp"
                    alt="Primary and complex knee replacement"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#08284d]/90 backdrop-blur-xs text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                      Joint Preservation
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    Total &amp; Partial Joint Replacement
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    Partial unicompartmental resurfacing preserving 70% of healthy bone, and direct anterior muscle-sparing hip surgery.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Cementless Ingrowth &bull; High Flexion</span>
                <span className="font-bold text-sky-700">30+ Year Longevity</span>
              </div>
            </div>

            {/* Specialty 3: Sports Medicine & Arthroscopy (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-900 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-sky-600 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src="/images/surgeries/acl-surgery.webp"
                    alt="Keyhole arthroscopy and sports ligament reconstruction"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#08284d]/90 backdrop-blur-xs text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                      Keyhole Surgery
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    Sports Medicine &amp; Arthroscopy
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    Remnant-preserving ACL reconstruction using the anatomical "J Arch" landmark, inside-out meniscus repair, and shoulder cuff restoration.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>IOC Switzerland Diploma &bull; Athletes</span>
                <span className="font-bold text-sky-700">Keyhole Repair</span>
              </div>
            </div>

            {/* Specialty 4: Rapid Recovery & Same-Day Ambulation (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-slate-900 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-sky-600 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src="/images/surgeries/happy-knee-walk.webp"
                    alt="Patient walking comfortably outdoors post recovery"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-900/90 backdrop-blur-xs text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                      Rapid Recovery
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    Assisted Walking in 24 Hours &amp; Early Discharge
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    Multimodal local infiltration analgesia (LIA) and soft-tissue preservation enable over 90% of patients to walk to the washroom with support on the same evening of surgery.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Same-Day Mobilization &bull; 48-72h Discharge</span>
                <span className="font-bold text-emerald-700">Zero Pain Protocol</span>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PART 3: MONTHLY FREE KNEE CHECK-UP CAMPAIGN (Official Poster)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="bg-gradient-to-br from-amber-50/90 via-white to-sky-50/90 rounded-3xl border-2 border-slate-900 p-6 sm:p-10 shadow-md relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left: Original Hospital Promotional Poster (Clickable to view full-size) */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              <div
                onClick={() => setIsPosterModalOpen(true)}
                className="relative aspect-[3/4] w-full max-w-sm rounded-2xl border-2 border-slate-900 overflow-hidden bg-white shadow-lg cursor-pointer group"
                title="Click to view full-size original poster"
              >
                <img
                  src="/images/khetan-knee-camp-poster-general.png"
                  alt="Khetan Knee N Shoulder Clinic — Monthly Free Knee Camp Poster"
                  className="w-full h-full object-contain p-1 group-hover:scale-102 transition-transform duration-300 select-none"
                />

                {/* Clickable Zoom Pill Overlay */}
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-4 py-2 rounded-full bg-[#08284d] text-white text-xs font-bold shadow-xl flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-amber-400" />
                    <span>Click to View Full Poster</span>
                  </span>
                </div>

                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 text-[10px] font-mono font-black uppercase tracking-wider shadow-xs">
                    ★ Official Notice
                  </span>
                </div>
              </div>

              {/* Schedule & Timing Pill */}
              <div className="w-full max-w-sm mt-3.5 p-3 rounded-xl bg-white border-2 border-slate-900 flex items-center justify-between text-xs font-mono font-bold text-slate-800 shadow-2xs">
                <span className="inline-flex items-center gap-1.5 text-amber-700">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Every Month (हर महीने)</span>
                </span>
                <span className="text-slate-600">10:00 AM – 1:00 PM</span>
              </div>
            </div>

            {/* Right: Editorial Breakdown & Transparent Registration Notice */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-[10.5px] font-mono font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                  <span>Part 3 &bull; Monthly Community Health Mission</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Free Monthly Knee Check-up
                  <span className="block text-xl sm:text-2xl text-sky-800 font-extrabold mt-1">
                    नि:शुल्क घुटना शिविर &bull; नि:शुल्क हड्डी और नस की जांच!
                  </span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  Conducted by <strong className="text-slate-800 font-semibold">Dr. Vatsal Khetan</strong> &amp; <strong className="text-slate-800 font-semibold">Dr. Heli Khetan</strong> at <strong className="text-slate-800 font-semibold">Khetan Knee N Shoulder Clinic</strong>, S.K. Pandey Complex, Betiahata, Gorakhpur.
                </p>
              </div>

              {/* 6 100% Free Diagnostics Included */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wide text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Included Free Examinations (नि:शुल्क जांच):</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                    &bull; Free OPD Consultation
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                    &bull; Bone Health (हड्डी जांच)
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                    &bull; Nerve Check (नस जांच)
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                    &bull; Blood Sugar Screening
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                    &bull; Blood Pressure Check
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                    &bull; Uric Acid Evaluation
                  </div>
                </div>
              </div>

              {/* Concessions from Poster */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wide text-slate-700">
                  Special Concessions Available at Camp:
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold">
                  <span className="px-3 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                    50% Discount on X-Rays
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                    30% Discount on Blood Tests
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                    10% Discount on Medicines
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                    Special Concession for Athletes
                  </span>
                </div>
              </div>

              {/* ⚠️ Explicit & Transparent Registration Fee Notice */}
              <div className="p-3.5 rounded-2xl bg-amber-100/70 border border-amber-300 text-amber-950 text-xs leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Transparent Registration Fee Notice:</strong> All consultations and bone/nerve checks above are provided without doctor consultation charges. A nominal hospital registration fee of <strong className="font-black text-slate-900">₹50</strong> applies at reception. Wheelchair assistance is available.
                </div>
              </div>

              {/* Direct Hospital Contact from Poster */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="tel:9161995550"
                  className="px-6 py-3 rounded-full bg-[#08284d] text-white text-xs font-bold hover:bg-sky-600 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call to Register: 9161995550</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsPosterModalOpen(true)}
                  className="px-5 py-3 rounded-full border-2 border-slate-900 bg-white text-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-slate-600" />
                  <span>View Original Poster</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Lightbox Modal for Original Poster */}
      <PosterLightboxModal
        isOpen={isPosterModalOpen}
        onClose={() => setIsPosterModalOpen(false)}
        imageSrc="/images/khetan-knee-camp-poster-general.png"
      />
    </section>
  );
});

HomeIntroSection.displayName = 'HomeIntroSection';

export default HomeIntroSection;
