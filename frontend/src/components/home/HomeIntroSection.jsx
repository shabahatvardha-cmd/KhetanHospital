import React, { forwardRef, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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
import { AnimatedPushpin } from './AnimatedPushpin';
import { ContinuousOpticalBackground } from './ContinuousOpticalBackground';
import { HomeCashlessTrustStrip } from './HomeCashlessTrustStrip';

export const HomeIntroSection = forwardRef((props, forwardedRef) => {
  const localRef = useRef(null);
  const sectionRef = forwardedRef || localRef;
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  // Scroll tracking for the doctors showcase
  const doctorsRef = useRef(null);
  const { scrollYProgress: doctorsScroll } = useScroll({
    target: doctorsRef,
    offset: ['start end', 'center 50%'],
  });

  // Header: appears dropping from above
  const headerY = useTransform(doctorsScroll, [0, 1], [-80, 0]);
  const headerOpacity = useTransform(doctorsScroll, [0, 0.75], [0, 1]);

  // Dr. Vatsal's card: pinned from top right (transformOrigin: 'top right'), lifted up and swings/comes down on scroll
  const vatsalRotate = useTransform(doctorsScroll, [0, 1], [10, 0]);
  const vatsalY = useTransform(doctorsScroll, [0, 1], [-70, 0]);
  const vatsalOpacity = useTransform(doctorsScroll, [0, 0.75], [0.2, 1]);

  // Dr. Heli's card: pinned from top left (transformOrigin: 'top left'), lifted up and swings/comes down on scroll
  const heliRotate = useTransform(doctorsScroll, [0, 1], [-10, 0]);
  const heliY = useTransform(doctorsScroll, [0, 1], [-70, 0]);
  const heliOpacity = useTransform(doctorsScroll, [0, 0.75], [0.2, 1]);

  // Scroll tracking for Clinical Expertise (Option 3: Center Expand / Magnetic Clasp)
  const expertiseRef = useRef(null);
  const { scrollYProgress: expertiseScroll } = useScroll({
    target: expertiseRef,
    offset: ['start 85%', 'center 50%'],
  });

  const expertiseHeaderY = useTransform(expertiseScroll, [0, 1], [-40, 0]);
  const expertiseHeaderOpacity = useTransform(expertiseScroll, [0, 0.7], [0, 1]);

  // Card 1 (Top-Left: Robotic Knee) expands outward from center
  const card1X = useTransform(expertiseScroll, [0, 1], [40, 0]);
  const card1Y = useTransform(expertiseScroll, [0, 1], [30, 0]);
  const card1Scale = useTransform(expertiseScroll, [0, 1], [0.86, 1]);
  const card1Opacity = useTransform(expertiseScroll, [0, 0.75], [0.2, 1]);

  // Card 2 (Top-Right: Total & Partial) expands outward from center
  const card2X = useTransform(expertiseScroll, [0, 1], [-40, 0]);
  const card2Y = useTransform(expertiseScroll, [0, 1], [30, 0]);
  const card2Scale = useTransform(expertiseScroll, [0, 1], [0.86, 1]);
  const card2Opacity = useTransform(expertiseScroll, [0, 0.75], [0.2, 1]);

  // Card 3 (Bottom-Left: Sports Medicine) expands outward from center
  const card3X = useTransform(expertiseScroll, [0, 1], [40, 0]);
  const card3Y = useTransform(expertiseScroll, [0, 1], [-30, 0]);
  const card3Scale = useTransform(expertiseScroll, [0, 1], [0.86, 1]);
  const card3Opacity = useTransform(expertiseScroll, [0, 0.75], [0.2, 1]);

  // Card 4 (Bottom-Right: Rapid Recovery) expands outward from center
  const card4X = useTransform(expertiseScroll, [0, 1], [-40, 0]);
  const card4Y = useTransform(expertiseScroll, [0, 1], [-30, 0]);
  const card4Scale = useTransform(expertiseScroll, [0, 1], [0.86, 1]);
  const card4Opacity = useTransform(expertiseScroll, [0, 0.75], [0.2, 1]);

  // Scroll tracking for Knee Camp Section (Idea A: Poster reveal + details slide in)
  const campRef = useRef(null);
  const isCampInView = useInView(campRef, { amount: 0.35, once: true });
  const [isPosterImpacted, setIsPosterImpacted] = useState(false);

  const { scrollYProgress: campScroll } = useScroll({
    target: campRef,
    offset: ['start 90%', 'center 50%'],
  });

  // Poster reveal: slides up smoothly with subtle paper tilt into place
  const posterY = useTransform(campScroll, [0, 1], [60, 0]);
  const posterRotate = useTransform(campScroll, [0, 1], [-3, 0]);
  const posterScale = useTransform(campScroll, [0, 1], [0.94, 1]);
  const posterOpacity = useTransform(campScroll, [0, 0.8], [0.2, 1]);

  // Editorial details reveal from right
  const campDetailsX = useTransform(campScroll, [0, 1], [40, 0]);
  const campDetailsOpacity = useTransform(campScroll, [0, 0.8], [0.2, 1]);

  // Continuous background scroll tracking bridging Clinical Expertise -> Knee Camp -> Cashless Trust Strip
  const bridgeRef = useRef(null);
  const { scrollYProgress: bridgeScroll } = useScroll({
    target: bridgeRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      id="hospital-intro"
      ref={sectionRef}
      className="relative w-full bg-[#f8fafc] border-t border-slate-200/90 select-none pt-12 sm:pt-20 pb-4 sm:pb-6 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16 sm:space-y-24">

        {/* ═══════════════════════════════════════════════════════════════
            MEET THE DOCTORS
        ═══════════════════════════════════════════════════════════════ */}
        <div ref={doctorsRef} className="space-y-10 sm:space-y-12">
          {/* Section Header: Dropping from above */}
          <motion.div
            style={{ y: headerY, opacity: headerOpacity }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 will-change-transform"
          >
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#08284d] tracking-tight leading-tight">
                <AnimatedWordReveal
                  text="Meet Our Hospital Doctors & Specialist Team"
                  delay={0.1}
                  stagger={0.03}
                />
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light max-w-2xl">
                Led by <strong className="text-slate-900 font-semibold">Dr. Vatsal Khetan</strong> and <strong className="text-slate-900 font-semibold">Dr. Heli Khetan</strong>, providing verified surgical and non-surgical joint care directly in Gorakhpur.
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
          </motion.div>

          {/* Dual Doctor Cards (Pinned & Lifted up, coming down on scroll) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch [perspective:1200px]">

            {/* Doctor 1: Dr. Vatsal Khetan (Pinned from Top Right) */}
            <motion.div
              style={{
                y: vatsalY,
                rotate: vatsalRotate,
                opacity: vatsalOpacity,
                transformOrigin: 'top right',
              }}
              className="lg:col-span-7 bg-white rounded-3xl border-2 border-slate-900 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-sky-600 transition-shadow duration-300 flex flex-col justify-between group relative will-change-transform"
            >
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
                  </div>

                  <div className="space-y-1.5 min-w-0">
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
            </motion.div>

            {/* Doctor 2: Dr. Heli Khetan (Pinned from Top Left) */}
            <motion.div
              style={{
                y: heliY,
                rotate: heliRotate,
                opacity: heliOpacity,
                transformOrigin: 'top left',
              }}
              className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-900 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-emerald-600 transition-shadow duration-300 flex flex-col justify-between group relative will-change-transform"
            >
              <div className="space-y-6">
                {/* Header Lockup */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl border-2 border-slate-900 overflow-hidden bg-slate-100 shrink-0 shadow-md">
                    <img
                      src="/images/dr-heli-khetan.webp"
                      alt="Dr. Heli Khetan — Arthritis & Pain Specialist"
                      className="w-full h-full object-cover object-top select-none group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-1.5 min-w-0">
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
            </motion.div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            CONTINUOUS ZONE: CLINICAL EXPERTISE -> FREE KNEE CAMP -> CASHLESS STRIP
            (Bridged by Translucent Blue Kinetic Optical Geometry on Scroll)
        ═══════════════════════════════════════════════════════════════ */}
        <div
          ref={bridgeRef}
          className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 sm:py-20 bg-gradient-to-b from-[#082242] via-[#071A32] to-[#041021] text-white space-y-16 sm:space-y-24 rounded-3xl overflow-hidden shadow-2xl border border-sky-500/20"
        >
          {/* Continuous Translucent Blue Kinetic Optical Geometry */}
          <ContinuousOpticalBackground scrollProgress={bridgeScroll} />

          {/* 1. CLINICAL EXPERTISE (Asymmetric Rich Image Grid - Center Expand) */}
          <div ref={expertiseRef} className="relative z-10 space-y-8">
          <motion.div
            style={{ y: expertiseHeaderY, opacity: expertiseHeaderOpacity }}
            className="space-y-1.5 max-w-2xl will-change-transform"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Evidence-Based Surgical &amp; Joint Reconstruction
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Each procedure is backed by British Royal College governance, computer-assisted navigation, and proven rapid recovery protocols.
            </p>
          </motion.div>

          {/* Asymmetric 4-Card Composition (Center Expand / Magnetic Clasp) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch [perspective:1200px]">

            {/* Specialty 1: Robotic Knee Surgery (7 Cols) */}
            <motion.div
              style={{
                x: card1X,
                y: card1Y,
                scale: card1Scale,
                opacity: card1Opacity,
                transformOrigin: 'bottom right',
              }}
              className="lg:col-span-7 bg-[#0c2647]/80 rounded-3xl border border-sky-400/25 p-5 sm:p-6 shadow-xl backdrop-blur-md hover:border-sky-400/60 transition-all duration-300 flex flex-col justify-between group will-change-transform"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-sky-500/20 bg-slate-950/60">
                  <img
                    src="/images/surgeries/robotic-knee.webp"
                    alt="Sub-millimeter robotic knee joint replacement"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    Robotic Knee Replacement &amp; 3D CT Planning
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    Uses high-resolution CT navigation to calculate bone cuts with &plusmn;0.5 mm boundary precision. Spares natural collateral ligaments, minimizes blood loss, and delivers natural joint balance.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-sky-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>0.5mm Tolerance &bull; Bone Sparing</span>
                <span className="font-bold text-sky-400">Robotic Standard</span>
              </div>
            </motion.div>

            {/* Specialty 2: Total & Partial Replacement (5 Cols) */}
            <motion.div
              style={{
                x: card2X,
                y: card2Y,
                scale: card2Scale,
                opacity: card2Opacity,
                transformOrigin: 'bottom left',
              }}
              className="lg:col-span-5 bg-[#0c2647]/80 rounded-3xl border border-sky-400/25 p-5 sm:p-6 shadow-xl backdrop-blur-md hover:border-sky-400/60 transition-all duration-300 flex flex-col justify-between group will-change-transform"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-sky-500/20 bg-slate-950/60">
                  <img
                    src="/images/surgeries/knee-replacement.webp"
                    alt="Primary and complex knee replacement"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    Total &amp; Partial Joint Replacement
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    Partial unicompartmental resurfacing preserving 70% of healthy bone, and direct anterior muscle-sparing hip surgery.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-sky-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Cementless Ingrowth &bull; High Flexion</span>
                <span className="font-bold text-sky-400">30+ Year Longevity</span>
              </div>
            </motion.div>

            {/* Specialty 3: Sports Medicine & Arthroscopy (5 Cols) */}
            <motion.div
              style={{
                x: card3X,
                y: card3Y,
                scale: card3Scale,
                opacity: card3Opacity,
                transformOrigin: 'top right',
              }}
              className="lg:col-span-5 bg-[#0c2647]/80 rounded-3xl border border-sky-400/25 p-5 sm:p-6 shadow-xl backdrop-blur-md hover:border-sky-400/60 transition-all duration-300 flex flex-col justify-between group will-change-transform"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-sky-500/20 bg-slate-950/60">
                  <img
                    src="/images/surgeries/acl-surgery.webp"
                    alt="Keyhole arthroscopy and sports ligament reconstruction"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    Sports Medicine &amp; Arthroscopy
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    Remnant-preserving ACL reconstruction using the anatomical "J Arch" landmark, inside-out meniscus repair, and shoulder cuff restoration.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-sky-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>IOC Switzerland Diploma &bull; Athletes</span>
                <span className="font-bold text-sky-400">Keyhole Repair</span>
              </div>
            </motion.div>

            {/* Specialty 4: Rapid Recovery & Same-Day Ambulation (7 Cols) */}
            <motion.div
              style={{
                x: card4X,
                y: card4Y,
                scale: card4Scale,
                opacity: card4Opacity,
                transformOrigin: 'top left',
              }}
              className="lg:col-span-7 bg-[#0c2647]/80 rounded-3xl border border-sky-400/25 p-5 sm:p-6 shadow-xl backdrop-blur-md hover:border-sky-400/60 transition-all duration-300 flex flex-col justify-between group will-change-transform"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-sky-500/20 bg-slate-950/60">
                  <img
                    src="/images/surgeries/happy-knee-walk.webp"
                    alt="Patient walking comfortably outdoors post recovery"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    Assisted Walking in 24 Hours &amp; Early Discharge
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    Multimodal local infiltration analgesia (LIA) and soft-tissue preservation enable over 90% of patients to walk to the washroom with support on the same evening of surgery.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-sky-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Same-Day Mobilization &bull; 48-72h Discharge</span>
                <span className="font-bold text-emerald-400">Zero Pain Protocol</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            MONTHLY FREE KNEE CHECK-UP CAMPAIGN (Official Poster & Animated Pushpin)
        ═══════════════════════════════════════════════════════════════ */}
        <div ref={campRef} className="relative z-10 bg-[#0c2647]/80 border border-amber-400/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left: Original Hospital Promotional Poster (Clickable to view full-size) */}
            <motion.div
              style={{
                y: posterY,
                rotate: posterRotate,
                scale: posterScale,
                opacity: posterOpacity,
              }}
              className="lg:col-span-5 relative flex flex-col items-center will-change-transform"
            >
              <div className="relative w-full max-w-sm">
                {/* 3D Animated Pushpin (Gentle Hammering & Tactile Impact) */}
                <AnimatedPushpin
                  isTriggered={isCampInView}
                  onImpact={() => setIsPosterImpacted(true)}
                  className="absolute -top-3.5 left-7 z-20"
                />

                {/* Poster Card with subtle impact vibration */}
                <motion.div
                  animate={isPosterImpacted ? { y: [0, 2, -1, 0], rotate: [0, -0.4, 0.2, 0] } : {}}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  onClick={() => setIsPosterModalOpen(true)}
                  className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white shadow-2xl cursor-pointer group"
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
                </motion.div>
              </div>

              {/* Schedule & Timing Pill */}
              <div className="w-full max-w-sm mt-3.5 p-3 rounded-xl bg-[#091f3a] border border-amber-400/40 flex items-center justify-between text-xs font-mono font-bold text-slate-200 shadow-xs">
                <span className="inline-flex items-center gap-1.5 text-amber-300">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Every Month (हर महीने)</span>
                </span>
                <span className="text-slate-300">10:00 AM – 1:00 PM</span>
              </div>
            </motion.div>

            {/* Right: Editorial Breakdown & Transparent Registration Notice */}
            <motion.div
              style={{
                x: campDetailsX,
                opacity: campDetailsOpacity,
              }}
              className="lg:col-span-7 space-y-5 will-change-transform"
            >
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  Free Monthly Knee Check-up
                  <span className="block text-xl sm:text-2xl text-amber-400 font-extrabold mt-1">
                    नि:शुल्क घुटना शिविर &bull; नि:शुल्क हड्डी और नस की जांच!
                  </span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  Conducted by <strong className="text-white font-semibold">Dr. Vatsal Khetan</strong> &amp; <strong className="text-white font-semibold">Dr. Heli Khetan</strong> at <strong className="text-white font-semibold">Khetan Knee N Shoulder Clinic</strong>, S.K. Pandey Complex, Betiahata, Gorakhpur.
                </p>
              </div>

              {/* 6 100% Free Diagnostics Included */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wide text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Included Free Examinations (नि:शुल्क जांच):</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#081d38]/90 border border-sky-500/25 text-xs font-semibold text-slate-100 shadow-2xs">
                    &bull; Free OPD Consultation
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#081d38]/90 border border-sky-500/25 text-xs font-semibold text-slate-100 shadow-2xs">
                    &bull; Bone Health (हड्डी जांच)
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#081d38]/90 border border-sky-500/25 text-xs font-semibold text-slate-100 shadow-2xs">
                    &bull; Nerve Check (नस जांच)
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#081d38]/90 border border-sky-500/25 text-xs font-semibold text-slate-100 shadow-2xs">
                    &bull; Blood Sugar Screening
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#081d38]/90 border border-sky-500/25 text-xs font-semibold text-slate-100 shadow-2xs">
                    &bull; Blood Pressure Check
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#081d38]/90 border border-sky-500/25 text-xs font-semibold text-slate-100 shadow-2xs">
                    &bull; Uric Acid Evaluation
                  </div>
                </div>
              </div>

              {/* Concessions from Poster */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wide text-slate-300">
                  Special Concessions Available at Camp:
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold">
                  <span className="px-3 py-1 rounded-lg bg-rose-950/50 text-rose-300 border border-rose-500/30">
                    50% Discount on X-Rays
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-sky-950/50 text-sky-300 border border-sky-500/30">
                    30% Discount on Blood Tests
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-amber-950/50 text-amber-300 border border-amber-500/30">
                    10% Discount on Medicines
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-950/50 text-emerald-300 border border-emerald-500/30">
                    Special Concession for Athletes
                  </span>
                </div>
              </div>

              {/* ⚠️ Explicit & Transparent Registration Fee Notice */}
              <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-amber-300">Transparent Registration Fee Notice:</strong> All consultations and bone/nerve checks above are provided without doctor consultation charges. A nominal hospital registration fee of <strong className="font-black text-amber-300">₹50</strong> applies at reception. Wheelchair assistance is available.
                </div>
              </div>

              {/* Direct Hospital Contact from Poster */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="tel:9161995550"
                  className="px-6 py-3 rounded-full bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-950" />
                  <span>Call to Register: 9161995550</span>
                </a>


              </div>
            </motion.div>

          </div>
        </div>

        {/* 3. 100% CASHLESS HEALTH INSURANCE & TPA TRUST STRIP (Morphed Glass Panels) */}
        <div className="relative z-10 pt-2">
          <HomeCashlessTrustStrip />
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
