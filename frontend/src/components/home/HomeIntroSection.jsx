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
import { TiltSpotlightCard } from '../motion/TiltSpotlightCard';
import { PosterLightboxModal } from './PosterLightboxModal';

/**
 * 🏥 HOSPITAL DOCTORS SECTION — 3-PART MASTER REDESIGN (POLPHARMA FLUID MOTION)
 * 
 * Part 1: Meet the Doctors (Interactive 3D Tilt Cards, living authentic portraits, moving spotlights)
 * Part 2: Clinical Expertise (Asymmetric 60/40 grid with 3D perspective tilt & depth zoom)
 * Part 3: Monthly Free Knee Check-up Campaign (3D Poster Card, breathing indicators, transparent fee notice)
 */
export const HomeIntroSection = forwardRef((props, forwardedRef) => {
  const localRef = useRef(null);
  const sectionRef = forwardedRef || localRef;
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  return (
    <section
      id="hospital-intro"
      ref={sectionRef}
      className="relative w-full bg-[#030712] border-t border-white/10 select-none py-12 sm:py-20 scroll-mt-20 text-white"
    >
      {/* Living Ambient Radial Glowing Field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500 blur-[150px] -z-10"
        />
        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.10, 0.18, 0.10],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500 blur-[140px] -z-10"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16 sm:space-y-24 relative z-10">

        {/* ═══════════════════════════════════════════════════════════════
            PART 1: MEET THE DOCTORS (Interactive 3D Tilt & Spotlights)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-10 sm:space-y-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10.5px] font-mono font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Part 1 &bull; Authentic Medical Leadership</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                <AnimatedWordReveal
                  text="Meet Our Hospital Doctors & Specialist Team"
                  delay={0.1}
                  stagger={0.03}
                />
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light max-w-2xl">
                Led by UK Royal College specialist <strong className="text-white font-semibold">Dr. Vatsal Khetan</strong> and Rheumatology specialist <strong className="text-white font-semibold">Dr. Heli Khetan</strong>, providing verified surgical and non-surgical joint care directly in Gorakhpur.
              </p>
            </div>

            {/* Video Stories Quick Trigger */}
            {props.onExpandModal && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => props.onExpandModal(0)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.05] border border-white/20 text-white text-xs font-bold hover:bg-white/[0.1] hover:border-cyan-400 transition-all shadow-md group cursor-pointer self-start sm:self-auto shrink-0"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center p-[1px]">
                  <Instagram className="w-3 h-3 text-white" />
                </div>
                <span>Doctor's Introduction</span>
                <Play className="w-3 h-3 text-cyan-400 fill-current ml-1" />
              </motion.button>
            )}
          </div>

          {/* Dual Doctor Editorial Cards with 3D Perspective Tilt & Specular Cursor Spotlight */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Doctor 1: Dr. Vatsal Khetan (7 Cols on desktop) */}
            <div className="lg:col-span-7 flex flex-col">
              <TiltSpotlightCard
                maxTilt={6}
                delay={0.1}
                spotlightColor="rgba(56, 189, 248, 0.22)"
                borderColor="rgba(56, 189, 248, 0.5)"
                className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl flex flex-col justify-between h-full"
              >
                <div className="space-y-6">
                  {/* Header Lockup */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl border border-cyan-500/40 overflow-hidden bg-[#071326] shrink-0 shadow-xl group">
                      <motion.img
                        animate={{
                          y: [0, -5, 0],
                          scale: [1, 1.025, 1],
                        }}
                        transition={{
                          duration: 4.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        src="/images/dr-vatsal-camp.png"
                        alt="Dr. Vatsal Khetan — Senior Robotic Knee & Orthopaedic Surgeon"
                        className="w-full h-full object-cover object-top select-none group-hover:scale-108 transition-transform duration-700"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/dr-vatsal-hero.webp';
                        }}
                      />
                      <div className="absolute top-1.5 left-1.5">
                        <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-[9px] font-mono font-bold uppercase shadow-sm">
                          FRCS
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 min-w-0">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-800/80 text-[10px] font-mono font-bold uppercase">
                        <Award className="w-3 h-3 text-cyan-400" />
                        <span>Fellow, Royal College of Surgeons (Edinburgh)</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Dr. Vatsal Khetan
                      </h3>

                      <p className="text-sm font-bold text-cyan-400">
                        Senior Knee &amp; Joint Replacement Specialist &bull; घुटने के वरिष्ठ विशेषज्ञ
                      </p>

                      <p className="text-xs font-mono text-slate-400 leading-snug">
                        MBBS &bull; MS (Ortho) &bull; FRCS (Edinburgh) &bull; M.Ch Knee (UK) &bull; IOC Dip Sports Med (Switzerland)
                      </p>
                    </div>
                  </div>

                  {/* Plain-Language Clinical Mission */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    Specializing in sub-millimeter robotic knee replacements and sports arthroscopy. Trained at Wrightington Hospital (birthplace of modern hip replacement) and Newcastle upon Tyne Hospitals NHS Trust (UK).
                  </p>

                  {/* 3 Core Clinical Guarantees */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 hover:border-cyan-400/40 transition-colors">
                      <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase">Precision</div>
                      <div className="text-xs font-bold text-slate-200 leading-tight">Sub-Millimeter Robotic Alignment</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 hover:border-cyan-400/40 transition-colors">
                      <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase">Tissue Care</div>
                      <div className="text-xs font-bold text-slate-200 leading-tight">Keyhole Ligament Preservation</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 hover:border-cyan-400/40 transition-colors">
                      <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase">Recovery</div>
                      <div className="text-xs font-bold text-slate-200 leading-tight">Assisted Walking Within 24 Hours</div>
                    </div>
                  </div>
                </div>

                {/* Action Triggers */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => props.onBookClick && props.onBookClick()}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 text-xs font-black transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Consult Dr. Vatsal Khetan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>

                  {props.onExpandModal && (
                    <button
                      type="button"
                      onClick={() => props.onExpandModal(0)}
                      className="text-xs font-bold text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Watch Introduction Video</span>
                    </button>
                  )}
                </div>
              </TiltSpotlightCard>
            </div>

            {/* Doctor 2: Dr. Heli Khetan (5 Cols on desktop) */}
            <div className="lg:col-span-5 flex flex-col">
              <TiltSpotlightCard
                maxTilt={6}
                delay={0.25}
                spotlightColor="rgba(52, 211, 153, 0.22)"
                borderColor="rgba(52, 211, 153, 0.5)"
                className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl flex flex-col justify-between h-full"
              >
                <div className="space-y-6">
                  {/* Header Lockup */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl border border-emerald-500/40 overflow-hidden bg-[#071326] shrink-0 shadow-xl group">
                      <motion.img
                        animate={{
                          y: [0, -5, 0],
                          scale: [1, 1.025, 1],
                        }}
                        transition={{
                          duration: 5.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5,
                        }}
                        src="/images/dr-heli-khetan.png"
                        alt="Dr. Heli Khetan — Arthritis & Pain Specialist"
                        className="w-full h-full object-cover object-top select-none group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute top-1.5 left-1.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-[9px] font-mono font-bold uppercase shadow-sm">
                          Physician
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 min-w-0">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 text-[10px] font-mono font-bold uppercase">
                        <HeartHandshake className="w-3 h-3 text-emerald-400" />
                        <span>Specialist Care</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Dr. Heli Khetan
                      </h3>

                      <p className="text-sm font-bold text-emerald-400">
                        Arthritis &amp; Pain Specialist &bull; गठिया और दर्द विशेषज्ञ
                      </p>

                      <p className="text-xs font-mono text-slate-400 leading-snug">
                        Rheumatology &bull; Chronic Joint Pain &bull; Bone Health Optimization
                      </p>
                    </div>
                  </div>

                  {/* Plain-Language Clinical Mission */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    Focused on non-surgical arthritis management, early diagnosis of joint inflammation, bone density screening, and targeted local pain therapy for long-term mobility.
                  </p>

                  {/* 2 Core Clinical Guarantees */}
                  <div className="space-y-2 pt-1">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3 hover:border-emerald-400/40 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">Targeted Joint Injections &amp; Therapy</div>
                        <div className="text-[11px] text-slate-400 font-light">घुटने का इंजेक्शन एवं सटीक दवाई से दर्द निवारण</div>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3 hover:border-emerald-400/40 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">Nerve &amp; Bone Health Protocol</div>
                        <div className="text-[11px] text-slate-400 font-light">नस एवं हड्डी की जांच और संपूर्ण सुरक्षा</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Triggers */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => props.onBookClick && props.onBookClick()}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-black transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Consult Dr. Heli Khetan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>

                  <a
                    href="tel:9161995550"
                    className="text-xs font-bold text-emerald-300 hover:text-emerald-200 inline-flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call: 9161995550</span>
                  </a>
                </div>
              </TiltSpotlightCard>
            </div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PART 2: CLINICAL EXPERTISE (Asymmetric 60/40 3D Tilt Grid)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-8">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10.5px] font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Part 2 &bull; Clinical Expertise &amp; Surgical Specialties</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Evidence-Based Surgical &amp; Joint Reconstruction
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Each procedure is backed by British Royal College governance, computer-assisted navigation, and proven rapid recovery protocols.
            </p>
          </div>

          {/* Asymmetric 4-Card Composition with 3D Tilt & Specular Cursor Spotlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">

            {/* Specialty 1: Robotic Knee Surgery (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col">
              <TiltSpotlightCard
                maxTilt={5}
                delay={0.1}
                spotlightColor="rgba(56, 189, 248, 0.2)"
                borderColor="rgba(56, 189, 248, 0.5)"
                className="bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 p-5 sm:p-6 shadow-xl flex flex-col justify-between h-full group"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#071326]">
                    <img
                      src="/images/surgeries/robotic-knee.webp"
                      alt="Sub-millimeter robotic knee joint replacement"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 select-none"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#030712]/90 backdrop-blur-md text-cyan-300 border border-cyan-800 text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                        Sub-Millimeter Tech
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      Robotic Knee Replacement &amp; 3D CT Planning
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      Uses high-resolution CT navigation to calculate bone cuts with &plusmn;0.5 mm boundary precision. Spares natural collateral ligaments, minimizes blood loss, and delivers natural joint balance.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>0.5mm Tolerance &bull; Bone Sparing</span>
                  <span className="font-bold text-cyan-400">Robotic Standard</span>
                </div>
              </TiltSpotlightCard>
            </div>

            {/* Specialty 2: Total & Partial Replacement (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col">
              <TiltSpotlightCard
                maxTilt={5}
                delay={0.2}
                spotlightColor="rgba(251, 191, 36, 0.2)"
                borderColor="rgba(251, 191, 36, 0.5)"
                className="bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 p-5 sm:p-6 shadow-xl flex flex-col justify-between h-full group"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#071326]">
                    <img
                      src="/images/surgeries/knee-replacement.webp"
                      alt="Primary and complex knee replacement"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 select-none"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#030712]/90 backdrop-blur-md text-amber-300 border border-amber-800 text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                        Joint Preservation
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      Total &amp; Partial Joint Replacement
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      Partial unicompartmental resurfacing preserving 70% of healthy bone, and direct anterior muscle-sparing hip surgery.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Cementless Ingrowth &bull; High Flexion</span>
                  <span className="font-bold text-amber-400">30+ Year Longevity</span>
                </div>
              </TiltSpotlightCard>
            </div>

            {/* Specialty 3: Sports Medicine & Arthroscopy (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col">
              <TiltSpotlightCard
                maxTilt={5}
                delay={0.3}
                spotlightColor="rgba(34, 211, 238, 0.2)"
                borderColor="rgba(34, 211, 238, 0.5)"
                className="bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 p-5 sm:p-6 shadow-xl flex flex-col justify-between h-full group"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#071326]">
                    <img
                      src="/images/surgeries/acl-surgery.webp"
                      alt="Keyhole arthroscopy and sports ligament reconstruction"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 select-none"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#030712]/90 backdrop-blur-md text-cyan-300 border border-cyan-800 text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                        Keyhole Surgery
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      Sports Medicine &amp; Arthroscopy
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      Remnant-preserving ACL reconstruction using the anatomical "J Arch" landmark, inside-out meniscus repair, and shoulder cuff restoration.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>IOC Switzerland Diploma &bull; Athletes</span>
                  <span className="font-bold text-cyan-400">Keyhole Repair</span>
                </div>
              </TiltSpotlightCard>
            </div>

            {/* Specialty 4: Rapid Recovery & Same-Day Ambulation (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col">
              <TiltSpotlightCard
                maxTilt={5}
                delay={0.4}
                spotlightColor="rgba(52, 211, 153, 0.2)"
                borderColor="rgba(52, 211, 153, 0.5)"
                className="bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 p-5 sm:p-6 shadow-xl flex flex-col justify-between h-full group"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#071326]">
                    <img
                      src="/images/surgeries/happy-knee-walk.webp"
                      alt="Patient walking comfortably outdoors post recovery"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 select-none"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-950/90 backdrop-blur-md text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                        Rapid Recovery
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Assisted Walking in 24 Hours &amp; Early Discharge
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      Multimodal local infiltration analgesia (LIA) and soft-tissue preservation enable over 90% of patients to walk to the washroom with support on the same evening of surgery.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Same-Day Mobilization &bull; 48-72h Discharge</span>
                  <span className="font-bold text-emerald-400">Zero Pain Protocol</span>
                </div>
              </TiltSpotlightCard>
            </div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PART 3: MONTHLY FREE KNEE CHECK-UP CAMPAIGN (3D Poster Card)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="bg-gradient-to-br from-[#0c1e38] via-[#061224] to-[#020712] rounded-3xl border border-amber-500/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left: Original Hospital Promotional Poster with 3D Tilt Effect */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              <TiltSpotlightCard
                maxTilt={8}
                spotlightColor="rgba(245, 158, 11, 0.25)"
                borderColor="rgba(245, 158, 11, 0.55)"
                onClick={() => setIsPosterModalOpen(true)}
                className="relative aspect-[3/4] w-full max-w-sm rounded-2xl border-2 border-amber-500/50 overflow-hidden bg-white shadow-2xl cursor-pointer group"
                title="Click to view full-size original poster"
              >
                <img
                  src="/images/khetan-knee-camp-poster-general.png"
                  alt="Khetan Knee N Shoulder Clinic — Monthly Free Knee Camp Poster"
                  className="w-full h-full object-contain p-1 group-hover:scale-103 transition-transform duration-500 select-none"
                />

                {/* Clickable Zoom Pill Overlay */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-4 py-2 rounded-full bg-cyan-500 text-slate-950 text-xs font-black shadow-xl flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-slate-950" />
                    <span>Click to View Full Poster</span>
                  </span>
                </div>

                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 text-[10px] font-mono font-black uppercase tracking-wider shadow-md">
                    ★ Official Notice
                  </span>
                </div>
              </TiltSpotlightCard>

              {/* Schedule & Timing Pill with Subtle Breathing Motion */}
              <motion.div
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full max-w-sm mt-3.5 p-3 rounded-xl bg-white/[0.04] border border-amber-500/30 flex items-center justify-between text-xs font-mono font-bold text-white shadow-md"
              >
                <span className="inline-flex items-center gap-1.5 text-amber-300">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Every Month (हर महीने)</span>
                </span>
                <span className="text-slate-300">10:00 AM – 1:00 PM</span>
              </motion.div>
            </div>

            {/* Right: Editorial Breakdown & Transparent Registration Notice */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[10.5px] font-mono font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  <span>Part 3 &bull; Monthly Community Health Mission</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  Free Monthly Knee Check-up
                  <span className="block text-xl sm:text-2xl text-amber-300 font-extrabold mt-1">
                    नि:शुल्क घुटना शिविर &bull; नि:शुल्क हड्डी और नस की जांच!
                  </span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  Conducted by <strong className="text-white font-semibold">Dr. Vatsal Khetan</strong> &amp; <strong className="text-white font-semibold">Dr. Heli Khetan</strong> at <strong className="text-white font-semibold">Khetan Knee N Shoulder Clinic</strong>, S.K. Pandey Complex, Betiahata, Gorakhpur.
                </p>
              </div>

              {/* 6 100% Free Diagnostics Included in Interactive Hover Cards */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wide text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Included Free Examinations (नि:शुल्क जांच):</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-slate-200 hover:border-emerald-400/50 hover:bg-white/[0.08] transition-colors">
                    &bull; Free OPD Consultation
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-slate-200 hover:border-emerald-400/50 hover:bg-white/[0.08] transition-colors">
                    &bull; Bone Health (हड्डी जांच)
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-slate-200 hover:border-emerald-400/50 hover:bg-white/[0.08] transition-colors">
                    &bull; Nerve Check (नस जांच)
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-slate-200 hover:border-emerald-400/50 hover:bg-white/[0.08] transition-colors">
                    &bull; Blood Sugar Screening
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-slate-200 hover:border-emerald-400/50 hover:bg-white/[0.08] transition-colors">
                    &bull; Blood Pressure Check
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-slate-200 hover:border-emerald-400/50 hover:bg-white/[0.08] transition-colors">
                    &bull; Uric Acid Evaluation
                  </motion.div>
                </div>
              </div>

              {/* Concessions from Poster */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wide text-slate-400">
                  Special Concessions Available at Camp:
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold">
                  <span className="px-3 py-1 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-800">
                    50% Discount on X-Rays
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-blue-950/60 text-blue-300 border border-blue-800">
                    30% Discount on Blood Tests
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-800">
                    10% Discount on Medicines
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800">
                    Special Concession for Athletes
                  </span>
                </div>
              </div>

              {/* ⚠️ Explicit & Transparent Registration Fee Notice */}
              <div className="p-3.5 rounded-2xl bg-amber-950/50 border border-amber-500/40 text-amber-200 text-xs leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-amber-300">Transparent Registration Fee Notice:</strong> All consultations and bone/nerve checks above are provided without doctor consultation charges. A nominal hospital registration fee of <strong className="font-black text-white">₹50</strong> applies at reception. Wheelchair assistance is available.
                </div>
              </div>

              {/* Direct Hospital Contact from Poster with Spring Tap */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href="tel:9161995550"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-950" />
                  <span>Call to Register: 9161995550</span>
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => setIsPosterModalOpen(true)}
                  className="px-5 py-3 rounded-full border border-white/20 bg-white/[0.05] text-white text-xs font-bold hover:bg-white/[0.1] hover:border-cyan-400 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-cyan-300" />
                  <span>View Original Poster</span>
                </motion.button>
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
