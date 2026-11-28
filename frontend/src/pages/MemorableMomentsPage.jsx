import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useReducedMotion, useInView } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  Sparkles,
  Activity,
  ArrowRight,
  MapPin,
  Calendar,
  ExternalLink,
  Plus,
  X,
  Stethoscope,
  Star,
  CheckCircle2,
  ChevronDown,
  ArrowUpRight,
  Check,
  Trophy,
  UserCheck,
  Building2
} from 'lucide-react';
import { memorableMoments, clinicInfo } from '../data/clinicContent';
import { doctorImages } from '../data/imageConfig';
import { AnimatedCounter } from '../components/motion/AnimatedCounter';
import { Footer } from '../components/layout/Footer';

/**
 * 🏥 MEMORABLE MOMENTS & UK TRAINING PAGE
 * 
 * Unified Clinical Executive Layout & Motion Architecture:
 * 1. Compact Editorial Hero (#08284d) with word-by-word reveal, hover micro-scale & bidirectional scroll reversal
 * 2. 3D Floating Stage with slow-motion showcase poster slide (down-to-up entry & downward exit)
 *    and continuous 2s/3s position swap with rhythm indicator
 * 3. Deep Clinical Blue (#08284d) Connected Milestone Cards with borderless frosted glass
 *    (bg-white/[0.06] backdrop-blur-md) and smooth sequential entrance (Card 1 ➔ 2 ➔ 3)
 * 4. Conversational FAQ Stage covered by Full-Screen Hospital Shutter Footer
 */

const heroEditorialWords = "From the historic birthplace of hip replacement at Wrightington Hospital (UK) to Olympic sports conditioning in Switzerland, Dr. Vatsal Khetan trained alongside the world's leading joint reconstruction authorities — translating directly into safer care for you.".split(' ');

const heroWordsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.032,
      delayChildren: 0.15,
    },
  },
};

const heroWordItem = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const milestoneContainerVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1, // Reverses backwards when scrolling up out of view
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.12, // Smooth sequential reveal: Card 1 -> Card 2 -> Card 3
      delayChildren: 0.1,
    },
  },
};

const milestoneCardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const MemorableMomentsPage = ({ onBookClick }) => {
  const navigate = useNavigate();
  const pageContainerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const floatingStageRef = useRef(null);
  const footerRef = useRef(null);
  const shutterContainerRef = useRef(null);

  // States
  const [openFaq, setOpenFaq] = useState(0);
  const [expandedMoment, setExpandedMoment] = useState(null);
  const [isStageSwapped, setIsStageSwapped] = useState(false);

  const isStageInView = useInView(floatingStageRef, { amount: 0.25 });

  useEffect(() => {
    if (!isStageInView) return;

    // Smooth continuous swap every 2.5s, whether hovered or not
    const delay = isStageSwapped ? 2800 : 2500;

    const timer = setTimeout(() => {
      setIsStageSwapped(prev => !prev);
    }, delay);

    return () => clearTimeout(timer);
  }, [isStageInView, isStageSwapped]);

  const prefersReducedMotion = useReducedMotion();

  // Scroll tracking for Hero Section (Smooth bidirectional reversal on scroll)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start']
  });

  const heroWordsScrollOpacity = useTransform(heroScroll, [0, 0.65], [1, 0]);
  const heroWordsScrollY = useTransform(heroScroll, [0, 0.65], [0, -25]);

  // Track scroll for Section 2 Surgical Poster slide:
  // 1. As user scrolls down from Hero (0 to 300px): Poster SLIDES FROM DOWN TO UP (260px -> 0px)
  // 2. From scrollY 300px to 650px: Poster stays locked in place (0px)
  // 3. From scrollY 650px to 1100px: Poster SLIDES DOWN AGAIN (0px -> 240px) in slow motion
  // 4. Reversible when scrolling back up
  const { scrollY } = useScroll();
  const { scrollYProgress: stageScroll } = useScroll({
    target: floatingStageRef,
    offset: ['start end', 'end start']
  });

  const springConfig = { stiffness: 90, damping: 20, mass: 0.4 };
  const slowMotionSpring = { stiffness: 45, damping: 22, mass: 1 };

  const posterSlowY = useSpring(
    useTransform(scrollY, [0, 300, 650, 1100], [260, 0, 0, 240]),
    slowMotionSpring
  );
  const posterSlowOpacity = useSpring(
    useTransform(scrollY, [0, 220, 700, 1100], [0.1, 1, 1, 0.2]),
    slowMotionSpring
  );
  const posterSlowScale = useSpring(
    useTransform(scrollY, [0, 300, 650, 1100], [0.90, 1, 1, 0.94]),
    slowMotionSpring
  );
  const posterSlowRotateX = useSpring(
    useTransform(scrollY, [0, 300, 650, 1100], [8, 0, 0, 6]),
    slowMotionSpring
  );

  const cardParallaxY = useSpring(useTransform(stageScroll, [0, 0.5, 1], [15, 0, -15]), springConfig);

  // Shutter scroll tracking: controls the depth recessing of FAQ as shutter footer rises over it
  const { scrollYProgress: shutterScroll } = useScroll({
    target: shutterContainerRef,
    offset: ['start start', 'end end'],
  });

  const faqScale = useTransform(shutterScroll, [0, 0.75], [1, 0.94]);
  const faqOpacity = useTransform(shutterScroll, [0, 0.75], [1, 0.4]);
  const faqY = useTransform(shutterScroll, [0, 0.75], [0, -35]);

  const toggleMoment = (momentId) => {
    setExpandedMoment(prev => (prev === momentId ? null : momentId));
  };

  const faqs = [
    {
      q: "What is the clinical significance of Wrightington Hospital training?",
      a: "Wrightington Hospital in Lancashire, UK, is universally recognized as the birthplace of modern hip arthroplasty, pioneered by Sir John Charnley. Training at Wrightington embeds strict sterile surgical technique, ultra-clean laminar airflow protocols, precise biomechanical implant positioning, and lifetime joint durability."
    },
    {
      q: "How does NHS robotic training improve surgical outcomes in Gorakhpur?",
      a: "NHS surgical robotic protocols from Newcastle upon Tyne enforce sub-millimeter precision cutting envelopes (0.5 mm tolerance). This eliminates human angular deviation, spares soft-tissue ligaments, and accelerates 24-hour patient ambulation."
    },
    {
      q: "Does Dr. Vatsal Khetan treat international and national athletes?",
      a: "Yes. Dr. Khetan holds an International Olympic Committee (IOC) Diploma in Sports Medicine from Lausanne, Switzerland, and has provided clinical consultations and joint rehabilitation for elite Indian athletes including cricketer Yashasvi Jaiswal and Olympic hockey star Vandana Katariya."
    },
    {
      q: "How can patients from Gorakhpur access these advanced surgical protocols?",
      a: "All advanced NHS-grade protocols—including laminar airflow sterility, computer-calibrated implant balance, and rapid-recovery analgesia—are standard practice for every patient operated on at Khetan Hospital."
    }
  ];

  // Milestone standard reference codes matching archival specification style
  const milestoneMetadata = [
    {
      code: "SPEC: UK-WRIGHTINGTON",
      tag: "CENTRE OF EXCELLENCE",
      tagColor: "bg-sky-500/20 text-sky-200 border-sky-400/30",
      mentor: "Wrightington Hospital (Lancashire, UK) — Sir John Charnley Legacy",
      takeaway: "Mastery of ultra-clean laminar airflow antisepsis, sub-millimeter implant positioning, and low-wear ceramic/cross-linked polyethylene tribology for 30+ year joint durability."
    },
    {
      code: "SPEC: UK-HTO-BIRMINGHAM",
      tag: "FACULTY APPOINTMENT",
      tagColor: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
      mentor: "High Tibial Osteotomy Masterclass Faculty (Birmingham, UK)",
      takeaway: "Pioneering joint-preserving angular osteotomies to unload arthritic knee compartments and postpone or completely prevent knee replacement in active individuals under 55."
    },
    {
      code: "SPEC: UK-NHS-ROTHERHAM",
      tag: "REVISION ARTHROPLASTY",
      tagColor: "bg-amber-500/20 text-amber-200 border-amber-400/30",
      mentor: "Rotherham NHS Foundation Trust Hospital (UK)",
      takeaway: "Advanced surgical reconstruction of complex failed, loose, or infected previous joint implants using modular stems and trabecular augments to restore bone stock."
    },
    {
      code: "SPEC: STATE-GOV-HONOR",
      tag: "STATE RECOGNITION",
      tagColor: "bg-purple-500/20 text-purple-200 border-purple-400/30",
      mentor: "Hon'ble Governor Shiv Pratap Shukla (Himachal Pradesh)",
      takeaway: "State-level commendation acknowledging pioneering robotic orthopedic standards and high-volume charitable joint preservation camps serving Eastern UP."
    },
    {
      code: "SPEC: CRICKET-JAISWAL",
      tag: "ELITE ATHLETE CARE",
      tagColor: "bg-blue-500/20 text-blue-200 border-blue-400/30",
      mentor: "Yashasvi Jaiswal (Indian National Cricket Team)",
      takeaway: "High-performance sports conditioning, tendon micro-tear biological therapy, and rapid deceleration joint stabilization required for international athletic competition."
    },
    {
      code: "SPEC: OLYMPIC-KATARIYA",
      tag: "OLYMPIAN SPORTS REHAB",
      tagColor: "bg-rose-500/20 text-rose-200 border-rose-400/30",
      mentor: "Vandana Katariya (Indian Olympic Hockey Forward, Padma Shri)",
      takeaway: "Olympic sports medicine rehabilitation protocols, intense pivot-load cartilage protection, and neuromuscular conditioning for maximum agility."
    },
    {
      code: "SPEC: PEDIATRIC-PARIKH",
      tag: "PEDIATRIC PRESERVATION",
      tagColor: "bg-teal-500/20 text-teal-200 border-teal-400/30",
      mentor: "Dr. Sheetal Parikh (Director of Pediatric Orthopaedics, Cincinnati)",
      takeaway: "Growth-plate sparing surgical techniques for adolescent patellar dislocation, trochlear dysplasia, and pediatric sports ligament reconstructions."
    },
    {
      code: "SPEC: UK-ARTHRO-ANDERSON",
      tag: "CEMENTLESS ARTHROPLASTY",
      tagColor: "bg-indigo-500/20 text-indigo-200 border-indigo-400/30",
      mentor: "Mr. A. Anderson (Consultant Arthroplasty Lead, UK)",
      takeaway: "Direct co-authorship on the landmark 454-patient cementless knee benchmark published in Bone & Joint Open 2024, proving superior biological bone ingrowth."
    },
    {
      code: "SPEC: SHOULDER-DRAVIARAJ",
      tag: "KEYHOLE RECONSTRUCTION",
      tagColor: "bg-cyan-500/20 text-cyan-200 border-cyan-400/30",
      mentor: "Mr. Kingsley Draviaraj (Upper Limb Consultant, UK)",
      takeaway: "Keyhole arthroscopic subacromial decompression, double-row rotator cuff repairs, and reverse anatomical shoulder joint replacement."
    },
    {
      code: "SPEC: HIP-SALVAGE-GARNETI",
      tag: "COMPLEX HIP SALVAGE",
      tagColor: "bg-amber-500/20 text-amber-200 border-amber-400/30",
      mentor: "Mr. N. Garneti (Pelvic & Revision Hip Lead, UK)",
      takeaway: "Complex acetabular bone defect reconstruction, ceramic-on-ceramic bearings, and salvage fixations for difficult non-united fractures."
    },
    {
      code: "SPEC: KNEE-LEGG-SAHINI",
      tag: "SURGICAL NAVIGATION",
      tagColor: "bg-sky-500/20 text-sky-200 border-sky-400/30",
      mentor: "Mr. Andrew Legg & Mr. Sahini (UK Knee Specialists)",
      takeaway: "Real-time intraoperative computer tracking, ensuring coronal and sagittal alignment accuracy within 0.5 degrees for natural joint kinematics."
    },
    {
      code: "SPEC: SPORTSMED-MUMBAI",
      tag: "LIGAMENT FELLOWSHIP",
      tagColor: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
      mentor: "Dr. Anant Joshi, Dr. Bhushan Sabnis & Dr. Sajeer Usman",
      takeaway: "Fellowship training resulting in the published 'J Arch' anatomical landmark for remnant-preserving ACL reconstruction and inside-out meniscus repair."
    }
  ];

  return (
    <div
      ref={pageContainerRef}
      className="relative w-full bg-[#f8fafc] text-slate-900 select-none min-h-screen"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. COMPACT HERO (Tight, Clean & Connected)
          • Clinical Blue Background (#08284d)
          • Words appear one by one with micro hover scale (scale: 1.18)
          • Smooth bidirectional reversal on scroll
      ────────────────────────────────────────────────────────────── */}
      <section
        ref={heroSectionRef}
        className="relative z-10 w-full pt-8 sm:pt-10 pb-6 sm:pb-7 px-4 sm:px-6 lg:px-8 bg-[#08284d] border-b border-sky-500/30 text-center overflow-hidden shadow-md"
      >
        {/* Subtle ambient gradient */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/15 via-transparent to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-3.5">

          {/* Minimalist Provenance Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-sky-950/80 border border-sky-400/40 text-[11px] font-mono font-bold text-sky-200 tracking-tight shadow-xs">
            <span>🇬🇧 12 Verified Fellowships, NHS Mentorships &amp; National Athletic Care</span>
          </div>

          {/* Punchy, Compact Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            World-Class British Surgical Training, In Gorakhpur.
          </h1>

          {/* Words appear one by one, on hover words enlarge slightly without box or color change, and reverses on scroll */}
          <motion.div
            style={{ y: heroWordsScrollY, opacity: heroWordsScrollOpacity }}
            className="will-change-transform"
          >
            <motion.p
              variants={heroWordsContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="text-xs sm:text-sm text-sky-100 font-medium leading-relaxed tracking-tight max-w-2xl mx-auto flex flex-wrap justify-center gap-x-1.5 gap-y-1 select-text"
            >
              {heroEditorialWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  variants={heroWordItem}
                  whileHover={{ scale: 1.18, transition: { duration: 0.18, ease: 'easeOut' } }}
                  className="inline-block text-sky-100 font-medium cursor-pointer will-change-transform origin-center"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Clean Action Buttons */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onBookClick}
              className="px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
            >
              Book Priority Consultation
            </button>

            <button
              type="button"
              onClick={() => {
                navigate('/published-papers');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-mono font-bold text-white hover:text-sky-200 bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
            >
              <span>Explore 10 Published Papers</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-300" />
            </button>

            <button
              type="button"
              onClick={() => {
                navigate('/about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-mono font-bold text-sky-200/80 hover:text-white transition-all cursor-pointer"
            >
              <span>Doctor Profile</span>
            </button>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. 3D FLOATING STAGE & DYNAMIC CARD SWAP
          • Swaps after 2s, stays for 3s, in smooth slow-motion glide (1.3s duration)
          • Color Palette: Warm white, Soft ivory, Very light bluish grey, Muted clinical blue
          • Left: 3D Showcase Poster (Slides down-to-up on entry, and moves down on scroll)
          • Right: Dr. Vatsal Khetan Executive Fellowship Card
      ────────────────────────────────────────────────────────────── */}
      <section
        ref={floatingStageRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7"
      >
        <div
          className="relative rounded-3xl bg-gradient-to-b from-[#F8F9F7] via-white to-[#EEF3F7] border border-slate-200/90 p-5 sm:p-7 lg:p-8 overflow-hidden shadow-xl"
        >
          {/* Subtle Ambient Illumination */}
          <div className="absolute w-72 h-72 rounded-full bg-sky-200/35 blur-3xl -top-10 -left-10 pointer-events-none" />
          <div className="absolute w-80 h-80 rounded-full bg-amber-100/40 blur-3xl -bottom-10 -right-10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center">

            {/* Showcase Poster: UK Robotics & NHS Fellowship (Slides from down to up, and moves down on scroll) */}
            <motion.div
              layout
              transition={{
                layout: { duration: 1.1, ease: [0.25, 1, 0.5, 1] }
              }}
              onClick={() => setIsStageSwapped(prev => !prev)}
              className={`relative flex items-center justify-center w-full cursor-pointer select-none ${isStageSwapped ? 'lg:col-span-7 lg:order-2 order-2' : 'lg:col-span-7 lg:order-1 order-1'
                }`}
            >
              <motion.div
                style={prefersReducedMotion ? {} : {
                  y: posterSlowY,
                  opacity: posterSlowOpacity,
                  scale: posterSlowScale,
                  rotateX: posterSlowRotateX,
                }}
                className="relative w-full max-w-lg aspect-[16/10] rounded-2xl overflow-hidden border-2 border-sky-400/40 shadow-2xl bg-slate-950 cursor-pointer group will-change-transform"
              >
                <img
                  src={doctorImages.fellowship}
                  alt="Dr. Vatsal Khetan UK Robotics & NHS Fellowship"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />

                {/* Laser Scanning Line */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#38bdf8] pointer-events-none z-20"
                  animate={{ top: ['2%', '96%', '2%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                />

                {/* Bottom Telemetry Footer Pill */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/90 border border-white/10 text-white backdrop-blur-md flex items-center justify-between text-xs font-mono z-20">
                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="text-[11px] font-bold text-slate-200">Royal College of Surgeons (Edin)</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold shrink-0">12 MILESTONES</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Executive Profile Card: Dr. Vatsal Khetan (Smooth 1.1s glide) */}
            <motion.div
              layout
              transition={{
                layout: { duration: 1.1, ease: [0.25, 1, 0.5, 1] }
              }}
              style={prefersReducedMotion ? {} : { y: cardParallaxY }}
              onClick={() => setIsStageSwapped(prev => !prev)}
              className={`w-full bg-white/95 border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 text-slate-900 backdrop-blur-md cursor-pointer select-none ${isStageSwapped ? 'lg:col-span-5 lg:order-1 order-1' : 'lg:col-span-5 lg:order-2 order-2'
                }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 shrink-0 shadow-md">
                  <img
                    src={doctorImages.fellowship}
                    alt="Dr. Vatsal Khetan — Surgical Lead"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="space-y-0.5 min-w-0">
                  <div className="text-[9px] font-mono font-bold text-sky-800 tracking-wider uppercase">
                    FELLOW OF ROYAL COLLEGE OF SURGEONS
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    Dr. Vatsal Khetan
                  </h3>
                  <p className="text-[11px] text-slate-600 font-mono">
                    FRCS (Edin) &bull; M.Ch Knee (UK) &bull; IOC Dip (Lausanne)
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-semibold tracking-tight">
                Advanced clinical training at Wrightington Hospital and NHS Newcastle upon Tyne. Bringing identical sterile laminar airflow protocols, sub-millimeter robotic precision, and Olympic joint rehab to patients across Purvanchal.
              </p>

              {/* Compact Metrics Row */}
              <div className="grid grid-cols-2 gap-2.5 pt-1 border-t border-slate-100">
                <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100">
                  <div className="text-lg sm:text-xl font-extrabold text-sky-900">
                    <AnimatedCounter value="12" />
                  </div>
                  <div className="text-[10px] font-bold text-slate-700 uppercase tracking-tight">
                    Global Fellowships &amp; Posts
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100">
                  <div className="text-lg sm:text-xl font-extrabold text-amber-900">
                    <AnimatedCounter value="2" />
                  </div>
                  <div className="text-[10px] font-bold text-slate-700 uppercase tracking-tight">
                    Olympic &amp; National Stars
                  </div>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookClick();
                  }}
                  className="px-5 py-2 rounded-full bg-[#f59e0b] hover:bg-amber-400 text-[#071A32] text-xs font-extrabold uppercase tracking-wider transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <span>Consult Dr. Vatsal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-[10px] font-mono font-bold text-slate-500">
                  NHS Audited
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. CONNECTED MILESTONE CARDS (Deep Clinical Blue #08284d)
          • Transparent Frosted Glass Cards (bg-white/[0.06] backdrop-blur-md)
          • Uniform font-normal white text (no clashing borders)
          • Sequential smooth entrance (Card 1 ➔ Card 2 ➔ Card 3)
          • Reverses backwards on scroll up
      ────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-2 sm:pb-3 select-none">
        <div className="relative rounded-3xl bg-[#08284d] border border-sky-500/30 p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden font-sans text-white">
          {/* Subtle Ambient Radiant Lighting */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/15 via-[#08284d] to-[#041a33]" />
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

          {/* Compact Split Header */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline border-b border-white/10 pb-5">
            <div className="lg:col-span-6 space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-[10px] font-mono font-normal text-emerald-300 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ARCHIVAL DOSSIER &bull; 12 VERIFIED MILESTONES</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal text-white tracking-tight leading-tight">
                Every milestone translates into a patient outcome.
              </h2>
            </div>

            <div className="lg:col-span-6">
              <p className="text-xs sm:text-sm font-normal text-sky-100/80 leading-relaxed tracking-tight">
                Click any milestone to open its verified institutional mentor details, clinical standard learned, and direct application at Khetan Hospital.
              </p>
            </div>
          </div>

          {/* 12 Frosted Glass Milestone Cards in Sequential Staggered 3-Column Grid */}
          <motion.div
            variants={milestoneContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-start mt-6 sm:mt-8"
          >
            {memorableMoments.map((item, idx) => {
              const meta = milestoneMetadata[idx] || {
                code: `SPEC: KHETAN-M-${idx + 1}`,
                tag: "CLINICAL MILESTONE",
                tagColor: "bg-white/10 text-sky-200 border-white/15",
                mentor: "British & International Orthopaedic Mentorship",
                takeaway: "Direct standard of sterile care and precision joint alignment applied at Khetan Hospital."
              };
              const momentId = `moment-${idx}`;
              const isExpanded = expandedMoment === momentId;

              return (
                <motion.article
                  key={idx}
                  variants={milestoneCardVariants}
                  className={`rounded-2xl transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group ${isExpanded
                    ? 'bg-white/[0.12] ring-1 ring-sky-400/40 shadow-xl'
                    : 'bg-white/[0.06] backdrop-blur-md hover:bg-white/[0.10]'
                    }`}
                >
                  <div className="space-y-3">
                    {/* Top Row: Spec Code & Category Pill */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-normal bg-white/10 text-white">
                        {meta.code}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-normal ${meta.tagColor}`}>
                        {meta.tag}
                      </span>
                    </div>

                    {/* Milestone Title & Year Badge */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-300/30 tracking-tight">
                          {item.year}
                        </span>
                        <span className="text-[10px] font-mono text-sky-200/60">
                          #{String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-normal text-white tracking-tight leading-snug group-hover:text-sky-200 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    {/* Summary */}
                    <p className="text-xs font-normal text-sky-100/80 leading-relaxed tracking-tight">
                      {item.desc}
                    </p>

                    {/* Interactive Expandable Drawer */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="space-y-3 pt-3 border-t border-white/10 overflow-hidden"
                        >
                          {/* Mentor & Institution */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-normal uppercase text-sky-300 flex items-center gap-1">
                              <Building2 className="w-3 h-3 text-sky-400" />
                              <span>Mentor &amp; Institution:</span>
                            </span>
                            <p className="text-xs text-white font-normal tracking-tight bg-white/[0.05] p-2.5 rounded-lg border border-white/10">
                              {meta.mentor}
                            </p>
                          </div>

                          {/* Clinical Takeaway */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-normal uppercase text-emerald-300 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>Application at Khetan Hospital:</span>
                            </span>
                            <p className="text-xs text-emerald-100 font-normal leading-relaxed bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-400/20">
                              {meta.takeaway}
                            </p>
                          </div>

                          {/* Verified Status Tag */}
                          <div className="flex items-center gap-1.5 text-[11px] font-mono font-normal text-sky-200 pt-0.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Verified NHS / Royal College Milestone</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleMoment(momentId)}
                      className="inline-flex items-center gap-1 text-xs font-normal text-sky-200 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'Close Record' : 'Open Case Record'}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-white' : 'text-sky-200'}`} />
                    </button>

                    <button
                      type="button"
                      onClick={onBookClick}
                      className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                      aria-label="Book Consultation"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4. CONVERSATIONAL FAQ STAGE COVERED BY SHUTTER FOOTER
          • Sticky FAQ stage stays in viewport and recesses smoothly in scale & opacity
          • Full-Screen Hospital Shutter Footer rises from bottom like a physical curtain,
            covering everything as on Home Page & Doctor Profile
      ═══════════════════════════════════════════════════════════════════ */}
      <div ref={shutterContainerRef} className="relative w-full">
        {/* FAQ Stage */}
        <div className="sticky top-0 z-10 w-full py-10 sm:py-16 bg-[#f8fafc] overflow-hidden">
          <motion.div
            style={{
              scale: faqScale,
              opacity: faqOpacity,
              y: faqY,
              transformOrigin: 'center center',
            }}
            className="w-full will-change-transform max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4"
          >
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
                <span>WHAT TO ASK ABOUT TRAINING...</span>
                <span className="text-xl select-none">🧐</span>
              </h2>
            </div>

            <div className="space-y-2.5 pt-1">
              {faqs.map((faq, fIdx) => {
                const isOpen = openFaq === fIdx;
                return (
                  <div
                    key={fIdx}
                    className={`relative rounded-2xl transition-all duration-200 overflow-hidden ${isOpen
                      ? 'bg-white border-2 border-[#08284d] shadow-sm'
                      : 'bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300'
                      }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                      className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left cursor-pointer transition-colors"
                    >
                      <span className="text-xs sm:text-sm font-extrabold tracking-tight text-slate-900 pr-3">
                        {faq.q}
                      </span>

                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'bg-[#08284d] text-white rotate-90' : 'bg-slate-100 text-slate-600'
                        }`}>
                        {isOpen ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-3.5 sm:p-4 pt-0 text-xs text-slate-700 leading-relaxed font-extrabold tracking-tight border-t border-slate-100">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Shutter Footer: Heavy physical curtain rising from bottom and covering everything */}
        <div className="relative z-20 w-full">
          <Footer ref={footerRef} isShutter={true} onBookClick={onBookClick} />
        </div>
      </div>
    </div>
  );
};

export default MemorableMomentsPage;
