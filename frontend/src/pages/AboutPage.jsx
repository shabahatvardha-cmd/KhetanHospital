import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useReducedMotion, useInView } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  Sparkles,
  Activity,
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  ExternalLink,
  Plus,
  X,
  Stethoscope,
  Star,
  CheckCircle2,
  HeartHandshake,
  Phone,
  ZoomIn,
  Maximize2,
  Info,
  ChevronDown,
  ArrowUpRight,
  Check
} from 'lucide-react';
import { clinicInfo } from '../data/clinicContent';
import { doctorImages } from '../data/imageConfig';
import { PosterLightboxModal } from '../components/home/PosterLightboxModal';
import { TiltSpotlightCard } from '../components/motion/TiltSpotlightCard';
import { AnimatedCounter } from '../components/motion/AnimatedCounter';
import { Footer } from '../components/layout/Footer';

/**
 * 🏥 DR. VATSAL KHETAN & DR. HELI KHETAN — DOCTOR & CLINICAL TEAM
 * 
 * Compact, Tight & Connected Executive Layout:
 * 1. Compact Hero (Tight vertical padding, crisp headline, zero dead whitespace)
 * 2. Compact 3D Floating Surgical Stage with Overlapping Executive Card
 * 3. Compact 3-Stage Connected Cards (Aligned side-by-side, no huge vertical drop offsets)
 *    with interactive "Open Protocol" expandable drawers
 * 4. Compact Dr. Heli Khetan & Joint Preservation Collaborative Card
 * 5. Monthly Free Knee Camp with Clickable Modal Poster
 * 6. Compact FAQ Accordion & Closing Banner
 */

const heroEditorialWords = "A lot of clinics rush patients into quick surgery. That's not what we do. We combine British sub-millimeter robotic precision with compassionate non-surgical arthritis prevention — ensuring you only get surgery if you genuinely need it.".split(' ');

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

const pathwayContainerVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.18,
      staggerDirection: -1, // Reverses backwards when scrolling up out of view: Card 3 -> Card 2 -> Card 1
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.45, // Smooth slow sequential reveal: Card 1 -> Card 2 -> Card 3
      delayChildren: 0.15,
    },
  },
};

const pathwayCardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.95,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const campContainerVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1, // Crucial: Reverses backwards when scrolling up
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const campItemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const examGridContainer = {
  hidden: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const examItemLeftVariants = {
  hidden: {
    opacity: 0,
    x: -16,
    y: 8,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const examItemRightVariants = {
  hidden: {
    opacity: 0,
    x: 16,
    y: 8,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const AboutPage = ({ onBookClick }) => {
  const navigate = useNavigate();
  const pageContainerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const floatingStageRef = useRef(null);
  const drHeliSectionRef = useRef(null);
  const campSectionRef = useRef(null);
  const footerRef = useRef(null);
  const shutterContainerRef = useRef(null);

  // Poster 3D pointer tilt state (desktop only)
  const [posterTilt, setPosterTilt] = useState({ rotateX: 0, rotateY: 0 });

  // States
  const [openFaq, setOpenFaq] = useState(0);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [expandedStage, setExpandedStage] = useState(null);

  // Section 2: Dynamic Smooth Card Swap (Continuous swap whether cursor is hovered or not)
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

  // Scroll tracking for Section 4: Dr. Heli (Option 1 movable restorative sage background)
  const { scrollYProgress: drHeliScroll } = useScroll({
    target: drHeliSectionRef,
    offset: ['start end', 'end start']
  });

  const heliOrb1Y = useSpring(useTransform(drHeliScroll, [0, 1], [-45, 55]), springConfig);
  const heliOrb1X = useSpring(useTransform(drHeliScroll, [0, 1], [30, -30]), springConfig);
  const heliOrb2Y = useSpring(useTransform(drHeliScroll, [0, 1], [35, -45]), springConfig);
  const heliOrb2X = useSpring(useTransform(drHeliScroll, [0, 1], [-20, 20]), springConfig);
  const heliPortraitY = useSpring(useTransform(drHeliScroll, [0, 0.5, 1], [16, 0, -16]), springConfig);
  const heliContentY = useSpring(useTransform(drHeliScroll, [0, 0.5, 1], [-8, 0, 8]), springConfig);
  const heliContourX = useSpring(useTransform(drHeliScroll, [0, 1], [-25, 25]), springConfig);
  const heliContourY = useSpring(useTransform(drHeliScroll, [0, 1], [-20, 20]), springConfig);
  const heliContourRotate = useSpring(useTransform(drHeliScroll, [0, 1], [-2.5, 2.5]), springConfig);

  // Pointer-based 3D tilt handlers for Camp Poster (desktop only, limited to a few degrees)
  const handlePosterMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosterTilt({
      rotateX: Math.max(-4.5, Math.min(4.5, -(y / (rect.height / 2)) * 4.5)),
      rotateY: Math.max(-4.5, Math.min(4.5, (x / (rect.width / 2)) * 4.5)),
    });
  };

  const handlePosterMouseLeave = () => {
    setPosterTilt({ rotateX: 0, rotateY: 0 });
  };

  // Scroll tracking for Section 5: Monthly Free Knee Camp (Reversible bidirectional scroll choreography)
  const { scrollYProgress: campScroll } = useScroll({
    target: campSectionRef,
    offset: ['start end', 'end start']
  });

  const campPosterScrollY = useSpring(useTransform(campScroll, [0.12, 0.45, 0.75, 1], [30, 0, 0, -30]), springConfig);
  const campPosterScrollRotateZ = useSpring(useTransform(campScroll, [0.12, 0.45, 0.75, 1], [-3.5, 0, 0, 2.5]), springConfig);
  const campPosterScrollRotateY = useSpring(useTransform(campScroll, [0.12, 0.45, 0.75, 1], [5, 0, 0, -3]), springConfig);
  const campPosterScale = useSpring(useTransform(campScroll, [0.12, 0.45], [0.95, 1]), springConfig);
  const campLineWidth = useSpring(useTransform(campScroll, [0.15, 0.42], ['0%', '100%']), springConfig);

  // Shutter scroll tracking: controls the depth recessing of FAQ as shutter footer rises over it
  const { scrollYProgress: shutterScroll } = useScroll({
    target: shutterContainerRef,
    offset: ['start start', 'end end'],
  });

  const faqScale = useTransform(shutterScroll, [0, 0.75], [1, 0.94]);
  const faqOpacity = useTransform(shutterScroll, [0, 0.75], [1, 0.4]);
  const faqY = useTransform(shutterScroll, [0, 0.75], [0, -35]);

  const toggleStage = (stageId) => {
    setExpandedStage(prev => (prev === stageId ? null : stageId));
  };

  const faqs = [
    {
      q: "What is Dr. Vatsal Khetan's surgical background and UK credentials?",
      a: "Dr. Vatsal Khetan is a Fellow of the Royal College of Surgeons of Edinburgh (FRCS), holds an M.Ch in Knee Surgery from Edge Hill University (UK), and completed clinical immersion at Wrightington Hospital (historic world birthplace of hip replacement) and Newcastle upon Tyne NHS Trust (Robotics). He also holds an IOC Diploma in Sports Medicine from Lausanne, Switzerland."
    },
    {
      q: "What is Dr. Heli Khetan's clinical focus in joint care?",
      a: "Dr. Heli Khetan specializes in Rheumatology, early arthritis diagnosis, and chronic pain management. She provides targeted joint injections, medical bone-density therapy, and non-surgical joint rehabilitation to help patients avoid surgery whenever possible."
    },
    {
      q: "How does the Monthly Free Knee Camp operate and what is the registration fee?",
      a: "The camp takes place every month from 10:00 AM to 1:00 PM at Khetan Knee N Shoulder Clinic, Betiahata, Gorakhpur. All doctor OPD consultations, bone checks, nerve checks, sugar, BP, and uric acid evaluations are 100% free of consultation charges. A nominal hospital registration fee of ₹50 applies at reception."
    },
    {
      q: "What surgical techniques are used to ensure fast 24-hour walking?",
      a: "Dr. Vatsal Khetan utilizes sub-millimeter robotic CT navigation for bone preservation, muscle-sparing tissue intervals, and multimodal local infiltration analgesia (LIA), allowing 90%+ of patients to stand and take assisted steps on the same evening of surgery."
    }
  ];

  const clinicalStages = [
    {
      id: 'stage1',
      stageNumber: 'Stage 01',
      title: 'Preserve',
      subtitle: 'Early diagnosis, joint preservation, bone density, and targeted non-surgical therapy.',
      lead: 'Dr. Heli Khetan & Dr. Vatsal Khetan',
      tag: 'NON-SURGICAL FIRST',
      tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      description: 'Get the foundation right. Before recommending any surgery, we conduct high-resolution CT cartilage analysis, bone mineral density (BMD) scans, and metabolic joint evaluations to preserve natural joint tissue whenever medically possible.',
      protocols: [
        'High-Resolution 3D Cartilage & Bone Density Analysis',
        'Targeted Intra-Articular Injections (PRP / Viscosupplementation)',
        'Medical Rheumatology & Early Arthritis Management',
        'Customized Non-Surgical Muscle Strengthening Protocols'
      ],
      metrics: 'Over 65% of early arthritis patients successfully avoid surgery through early targeted therapy.'
    },
    {
      id: 'stage2',
      stageNumber: 'Stage 02',
      title: 'Reconstruct',
      subtitle: 'Sub-millimeter robotic CT navigation, cementless implants, and keyhole ligament reconstruction.',
      lead: 'Dr. Vatsal Khetan (FRCS Edinburgh, M.Ch Knee UK)',
      tag: 'SUB-MILLIMETER PRECISION',
      tagColor: 'bg-sky-50 text-sky-800 border-sky-200',
      description: 'Operate with sub-millimeter certainty. Dr. Vatsal Khetan utilizes 3D CT pre-planning and robotic navigation operating strictly within a 0.5 mm boundary envelope—preserving healthy collateral ligaments and restoring natural knee kinematics.',
      protocols: [
        'Sub-Millimeter 0.5 mm Robotic CT Cutting Boundary Envelope',
        'Cementless Trabecular Tantalum Implants (UK 454-Patient Benchmark)',
        'Anatomical "J Arch" Remnant-Preserving ACL Reconstruction',
        'Direct Muscle-Sparing Tissue Windows for Fast Mobilization'
      ],
      metrics: '0.5 mm cutting tolerance eliminates human angular deviation for 30+ year joint durability.'
    },
    {
      id: 'stage3',
      stageNumber: 'Stage 03',
      title: 'Mobilise',
      subtitle: 'Multimodal local infiltration analgesia (LIA), 24-hour assisted walking, and rapid recovery protocol.',
      lead: 'Surgical & Physiotherapy Team',
      tag: 'RAPID RECOVERY PROTOCOL',
      tagColor: 'bg-amber-50 text-amber-900 border-amber-200',
      description: 'Amplify recovery from hour one. By eliminating muscle-cutting trauma and administering multi-site local infiltration analgesia (LIA), patients wake without excruciating pain and take guided steps on the same evening of surgery.',
      protocols: [
        'Multimodal Local Infiltration Analgesia (LIA) Pain Control',
        'Same-Day Evening Assisted Walking Protocol (24-Hour Ambulation)',
        'Rapid 48-72 Hour Hospital Discharge Standard',
        'Structured Long-Term Gait Retraining & Athletic Conditioning'
      ],
      metrics: 'Over 92% of joint replacement patients walk comfortably to the washroom on Day 1.'
    }
  ];

  return (
    <div
      ref={pageContainerRef}
      className="relative w-full bg-[#f8fafc] text-slate-900 select-none min-h-screen"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. COMPACT HERO (Tight, Clean & Connected)
          • Clinical Blue Background
          • Words appear one by one
          • On hover, word enlarges slightly (scale: 1.18) without color change or box
          • Reverses smoothly on scroll in both directions
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
            <span>🇬🇧 Royal College of Surgeons (Edinburgh) Governance</span>
          </div>

          {/* Punchy, Compact Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            We rebuild joints that hold up for a lifetime.
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
                navigate('/memorable-moments');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-mono font-bold text-white hover:text-sky-200 bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
            >
              <span>13 UK Milestones</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-300" />
            </button>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. 3D FLOATING STAGE & DYNAMIC CARD SWAP
          • Swaps after 2s, stays for 3s, in smooth slow-motion glide (1.3s duration)
          • Color Palette: Warm white, Soft ivory, Very light bluish grey, Muted clinical blue
          • Left: Robotic Surgical Showcase (Masked CT, scanning laser, targeting markers, sub-mm envelope)
          • Right: Dr. Vatsal Khetan Executive Profile (Qualifications, metrics, consult CTA)
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

            {/* Showcase Poster: Robotic Surgical Navigation (Slides from down to up, and moves down on scroll) */}
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
                  src="/images/surgeries/robotic-knee.webp"
                  alt="Sub-millimeter robotic CT knee navigation at Khetan Hospital"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                    <Activity className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="text-[11px] font-bold text-slate-200">Wrightington Sterile Protocol</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold shrink-0">24H WALKING</span>
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
                    src="/images/dr-vatsal-camp.webp"
                    alt="Dr. Vatsal Khetan — Surgical Lead"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="space-y-0.5 min-w-0">
                  <div className="text-[9px] font-mono font-bold text-sky-800 tracking-wider uppercase">
                    CHIEF JOINT RECONSTRUCTION SURGEON
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    Dr. Vatsal Khetan
                  </h3>
                  <p className="text-[11px] text-slate-600 font-mono">
                    MBBS &bull; MS &bull; FRCS (Edinburgh) &bull; M.Ch Knee (UK)
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-semibold tracking-tight">
                Trained at Wrightington Hospital and Newcastle upon Tyne NHS Trust. Robotic navigation restricts cuts strictly within a 0.5 mm boundary envelope, sparing collateral ligaments and enabling same-day walking.
              </p>

              {/* Compact Metrics Row */}
              <div className="grid grid-cols-2 gap-2.5 pt-1 border-t border-slate-100">
                <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100">
                  <div className="text-lg sm:text-xl font-extrabold text-sky-900">
                    <AnimatedCounter value="1,500+" />
                  </div>
                  <div className="text-[10px] font-bold text-slate-700 uppercase tracking-tight">
                    Robotic &amp; Navigated Knees
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <div className="text-lg sm:text-xl font-extrabold text-emerald-800">
                    <AnimatedCounter value="92%" />
                  </div>
                  <div className="text-[10px] font-bold text-slate-700 uppercase tracking-tight">
                    Same-Day 24h Ambulation
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
                  Wrightington Trained
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. THREE CONNECTED CLINICAL PATHWAYS
          Sequential, connected, progressive layout with connecting line
          • Deep clinical blue background (#08284d)
          • Transparent glass cards (bg-white/[0.06] backdrop-blur-md)
          • NO borders on cards
          • Uniform font-normal white text style everywhere
          • Slow smooth staggered reveal (Card 1 -> 2 -> 3)
          • Smooth reversal when scrolling up out of view (staggerDirection: -1)
      ────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 bg-[#08284d] rounded-3xl my-6 border border-sky-500/30 overflow-hidden shadow-2xl font-sans text-white">
        {/* Subtle ambient lighting */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/15 via-transparent to-transparent" />

        {/* Compact Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline border-b border-white/10 pb-4 relative z-10">
          <div className="lg:col-span-6 space-y-1">

            <h2 className="text-xl sm:text-2xl font-normal text-white tracking-tight leading-tight">
              Everything we do fits into one of three clinical stages.
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="text-xs sm:text-sm font-normal text-sky-100/90 leading-relaxed tracking-tight">
              Diagnosis, robotic surgery, and rehabilitation unified under strict British surgical governance.
            </p>
          </div>
        </div>

        {/* Connected Pathway Wrapper with connecting line */}
        <div className="relative">
          {/* Connecting Pathway Line behind cards (Desktop) */}
          <div className="hidden md:block absolute top-7 left-[15%] right-[15%] h-[2px] bg-white/10 z-0">
            <div className="w-full h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400 opacity-60" />
          </div>

          {/* 3 Horizontally Aligned Cards with Stagger & Reversal Variants */}
          <motion.div
            variants={pathwayContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-start"
          >
            {clinicalStages.map((stage) => {
              const isExpanded = expandedStage === stage.id;

              return (
                <motion.article
                  key={stage.id}
                  variants={pathwayCardVariants}
                  className={`rounded-2xl transition-all duration-300 p-5 shadow-lg flex flex-col justify-between group backdrop-blur-md select-none ${isExpanded
                    ? 'bg-white/[0.1] shadow-2xl'
                    : 'bg-white/[0.06] hover:bg-white/[0.09]'
                    }`}
                >
                  <div className="space-y-3">
                    {/* Top Row: Stage Number Pill & Lead Tag (Borderless) */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-normal text-white">
                          {stage.stageNumber}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-normal text-white tracking-wide">
                        {stage.tag}
                      </span>
                    </div>

                    {/* Stage Title */}
                    <div className="space-y-0.5">
                      <h3 className="text-xl font-normal text-white tracking-tight">
                        {stage.title}
                      </h3>
                      <p className="text-[11px] font-normal text-sky-200">
                        {stage.lead}
                      </p>
                    </div>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm font-normal text-sky-100/90 leading-relaxed tracking-tight">
                      {stage.subtitle}
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
                          <p className="text-xs text-white/90 leading-relaxed font-normal">
                            {stage.description}
                          </p>

                          <div className="space-y-1.5">
                            <span className="text-[10px] font-normal uppercase text-sky-200 block">
                              Verified Protocols:
                            </span>
                            <ul className="space-y-1">
                              {stage.protocols.map((protocol, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-1.5 text-xs font-normal text-white tracking-tight">
                                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{protocol}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3 rounded-xl bg-white/[0.05] text-xs font-normal text-white leading-relaxed">
                            <span className="text-sky-200 font-normal">Metric: </span>
                            <span>{stage.metrics}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleStage(stage.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-normal text-sky-200 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'Close Protocol' : 'Open Full Protocol'}</span>
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

      {/* ─────────────────────────────────────────────────────────────
          4. COMPACT DR. HELI KHETAN & JOINT PRESERVATION SECTION
          • Signature Deep Clinical Blue (#08284d) with Emerald Healing Glow
          • Kinetic Scroll-Linked Cartilage & Biomechanical Contours
          • 4-Pillar Care Grid + 3 Reassurance Metrics (Zero Blank Space)
          • Transparent Frosted Glass Cards (No borders, White Normal Text)
      ────────────────────────────────────────────────────────────── */}
      <section
        ref={drHeliSectionRef}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7"
      >
        <div className="relative rounded-3xl bg-[#08284d] border border-sky-500/30 p-5 sm:p-7 lg:p-8 shadow-2xl overflow-hidden select-none font-sans text-white">
          {/* Ambient Radiant Lighting */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/25 via-[#08284d] to-[#041a33]" />

          {/* Scroll-Movable Ambient Sage & Teal Light Pools */}
          <motion.div
            style={prefersReducedMotion ? {} : { x: heliOrb1X, y: heliOrb1Y }}
            className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-400/25 to-teal-400/15 blur-3xl pointer-events-none will-change-transform z-0"
          />
          <motion.div
            style={prefersReducedMotion ? {} : { x: heliOrb2X, y: heliOrb2Y }}
            className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-gradient-to-tr from-teal-400/20 to-emerald-300/15 blur-3xl pointer-events-none will-change-transform z-0"
          />
          <motion.div
            style={prefersReducedMotion ? {} : { y: heliOrb1Y }}
            className="absolute top-1/2 left-1/3 w-96 h-96 -translate-y-1/2 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none will-change-transform z-0"
          />

          {/* Option 1: Organic Cartilage & Biomechanical Contour Lines (Moves smoothly with scroll) */}
          <motion.div
            style={prefersReducedMotion ? {} : { x: heliContourX, y: heliContourY, rotate: heliContourRotate }}
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden will-change-transform opacity-40"
          >
            <svg
              viewBox="0 0 900 450"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full object-cover scale-110"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="heliContourGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id="heliContourGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.12" />
                </linearGradient>
              </defs>

              {/* Broad biomechanical envelope */}
              <path
                d="M-50,220 C120,130 260,310 450,210 C620,120 780,280 960,180"
                stroke="url(#heliContourGrad1)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Primary cartilage contour loop */}
              <path
                d="M-40,160 C150,70 310,240 500,140 C670,50 820,190 950,110"
                stroke="url(#heliContourGrad1)"
                strokeWidth="1.75"
              />

              {/* Nested kinematic joint curve */}
              <path
                d="M-30,110 C180,20 350,180 540,90 C710,10 850,130 960,60"
                stroke="url(#heliContourGrad2)"
                strokeWidth="1.5"
              />

              {/* Deep preservation boundary */}
              <path
                d="M-60,280 C100,200 220,380 420,280 C590,190 740,340 940,250"
                stroke="url(#heliContourGrad2)"
                strokeWidth="1.25"
              />

              {/* Fine sub-millimeter flow lines */}
              <path
                d="M50,420 C220,310 380,440 580,340 C740,260 860,390 980,320"
                stroke="url(#heliContourGrad1)"
                strokeWidth="1.2"
              />

              {/* Concentric Cartilage Focus Rings behind doctor profile */}
              <ellipse
                cx="720"
                cy="210"
                rx="170"
                ry="115"
                stroke="url(#heliContourGrad1)"
                strokeWidth="1.2"
                strokeDasharray="3 6"
                transform="rotate(-12 720 210)"
              />
              <ellipse
                cx="720"
                cy="210"
                rx="125"
                ry="75"
                stroke="url(#heliContourGrad2)"
                strokeWidth="1"
                transform="rotate(-12 720 210)"
              />
              <ellipse
                cx="720"
                cy="210"
                rx="70"
                ry="40"
                stroke="url(#heliContourGrad1)"
                strokeWidth="0.8"
                transform="rotate(-12 720 210)"
              />
            </svg>
          </motion.div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

            {/* Left 8 Columns: Comprehensive Clinical Presentation */}
            <motion.div
              style={prefersReducedMotion ? {} : { y: heliContentY }}
              className="lg:col-span-8 space-y-4 will-change-transform"
            >
              {/* Header Badge & Title */}
              <div className="space-y-1">

                <h2 className="text-xl sm:text-2xl font-normal text-white tracking-tight leading-snug">
                  Not sure if you need surgery?
                  <span className="block text-base sm:text-lg text-emerald-300 font-normal mt-0.5">
                    That's completely normal, don't worry.
                  </span>
                </h2>
              </div>

              {/* Clinical Mission Text */}
              <p className="text-xs sm:text-sm font-normal text-sky-100/90 leading-relaxed tracking-tight">
                Most patients come in knowing their joint hurts, rather than knowing whether surgery is truly required. <strong className="text-white font-normal">Dr. Heli Khetan</strong> evaluates cartilage thickness, bone density, and nerve health before any surgery is discussed.
              </p>

              {/* 4-Pillar Diagnostic & Care Grid (Fills Space with High Clinical Value) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-white/[0.07] backdrop-blur-md hover:bg-white/[0.11] transition-all flex items-start gap-2.5 group">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-normal text-white tracking-tight leading-tight">
                      Targeted Joint Injections &amp; PRP
                    </div>
                    <div className="text-[10px] font-normal text-emerald-200/90 tracking-tight">
                      घुटने का इंजेक्शन एवं सटीक दवा से दर्द निवारण
                    </div>
                    <div className="text-[10px] font-normal text-sky-200/70 pt-0.5">
                      Viscosupplementation &amp; cartilage preservation
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.07] backdrop-blur-md hover:bg-white/[0.11] transition-all flex items-start gap-2.5 group">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-normal text-white tracking-tight leading-tight">
                      Cartilage &amp; Bone Density Scans
                    </div>
                    <div className="text-[10px] font-normal text-emerald-200/90 tracking-tight">
                      नस एवं हड्डी की जांच और संपूर्ण सुरक्षा
                    </div>
                    <div className="text-[10px] font-normal text-sky-200/70 pt-0.5">
                      High-resolution 3D CT cartilage depth analysis
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.07] backdrop-blur-md hover:bg-white/[0.11] transition-all flex items-start gap-2.5 group">
                  <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-normal text-white tracking-tight leading-tight">
                      Medical Rheumatology &amp; Gout
                    </div>
                    <div className="text-[10px] font-normal text-emerald-200/90 tracking-tight">
                      गठिया, यूरिक एसिड एवं सूजन नियंत्रण
                    </div>
                    <div className="text-[10px] font-normal text-sky-200/70 pt-0.5">
                      Long-term inflammation &amp; metabolic care
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.07] backdrop-blur-md hover:bg-white/[0.11] transition-all flex items-start gap-2.5 group">
                  <HeartHandshake className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-normal text-white tracking-tight leading-tight">
                      Non-Surgical Joint Rehabilitation
                    </div>
                    <div className="text-[10px] font-normal text-emerald-200/90 tracking-tight">
                      मांसपेशी मजबूती एवं व्यायाम परामर्श
                    </div>
                    <div className="text-[10px] font-normal text-sky-200/70 pt-0.5">
                      Conservative physical therapy guidance
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Reassurance Metrics Row */}
              <div className="p-2.5 rounded-xl bg-white/[0.05] backdrop-blur-sm grid grid-cols-3 gap-2 text-center">
                <div className="border-r border-white/10 pr-2">
                  <div className="text-base sm:text-lg font-normal text-emerald-300">65%+</div>
                  <div className="text-[10px] font-normal text-sky-100/80 leading-tight">Avoid surgery early</div>
                </div>
                <div className="border-r border-white/10 px-2">
                  <div className="text-base sm:text-lg font-normal text-sky-300">15+ Yrs</div>
                  <div className="text-[10px] font-normal text-sky-100/80 leading-tight">Rheumatology focus</div>
                </div>
                <div className="pl-2">
                  <div className="text-base sm:text-lg font-normal text-amber-300">100%</div>
                  <div className="text-[10px] font-normal text-sky-100/80 leading-tight">Non-surgical first</div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href="tel:9161995550"
                  className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold tracking-tight transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-950" />
                  <span>Call Dr. Heli: 9161995550</span>
                </a>

                <button
                  type="button"
                  onClick={onBookClick}
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-normal tracking-tight transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
                </button>
              </div>
            </motion.div>

            {/* Right 4 Columns: Dr. Heli Executive Profile Showcase */}
            <motion.div
              style={prefersReducedMotion ? {} : { y: heliPortraitY }}
              className="lg:col-span-4 flex flex-col items-center justify-center will-change-transform"
            >
              <div className="relative w-full max-w-[250px] sm:max-w-[270px] rounded-2xl bg-white/[0.08] backdrop-blur-md p-3.5 shadow-xl space-y-3 text-center">
                {/* Doctor Portrait */}
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-900 shadow-inner">
                  <img
                    src="/images/dr-heli-khetan.webp"
                    alt="Dr. Heli Khetan — Arthritis & Pain Specialist"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-emerald-950/90 text-emerald-200 text-[9px] font-mono font-normal px-2 py-0.5 rounded text-center tracking-wide">
                    RHEUMATOLOGY &bull; JOINT PRESERVATION
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="space-y-1">
                  <h3 className="text-lg font-normal text-white tracking-tight">
                    Dr. Heli Khetan
                  </h3>
                  <p className="text-xs font-normal text-emerald-300">
                    Arthritis &amp; Pain Specialist
                  </p>
                  <p className="text-[11px] font-normal text-sky-200/80">
                    MBBS &bull; PGDCC (Rheumatology)
                  </p>
                </div>

                {/* OPD Schedule Pill */}
                <div className="pt-2 border-t border-white/10 text-[10px] font-normal text-sky-100/90 space-y-0.5">
                  <div>OPD: Mon – Sat &bull; 10:00 AM – 2:00 PM</div>
                  <div className="text-sky-300">Betiahata, Gorakhpur</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. MONTHLY FREE KNEE CHECK-UP CAMPAIGN
          • Reversible Cinematic Scroll Animation (Works down AND up)
          • Light Ivory & White Palette with Clinical Blue & Amber Accents
          • Left: 3D Floating Poster with Desktop Pointer Tilt & Prominent Schedule
          • Right: Sequential 6-Exam Grid, Concession Strip, Transparent ₹50 Notice
      ────────────────────────────────────────────────────────────── */}
      <section
        ref={campSectionRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-2 sm:pb-3 select-none"
      >
        <div className="relative rounded-3xl bg-gradient-to-br from-[#FCFBF7] via-white to-[#F2F6FA] border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/50 overflow-hidden font-sans text-slate-900">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100/40 via-transparent to-transparent" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-amber-100/30 blur-3xl pointer-events-none" />

          {/* ═══════════════════════════════════════════════════════════════════
              CAMPAIGN INTRODUCTION & EDITORIAL HEADER
          ═══════════════════════════════════════════════════════════════════ */}
          <div className="relative z-10 space-y-2 border-b border-slate-200/80 pb-5">


            {/* Progressively Drawing Fine Technical Line */}
            <motion.div
              style={{ width: campLineWidth }}
              className="h-[2px] bg-gradient-to-r from-sky-600 via-amber-400 to-transparent my-1 rounded-full will-change-transform"
            />

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-none uppercase">
                FREE MONTHLY KNEE CHECK-UP
              </h2>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-sky-800 tracking-tight">
                नि:शुल्क घुटना शिविर &bull; नि:शुल्क हड्डी और नस की जांच!
              </p>
            </div>

            <div className="pt-1 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-medium text-slate-600">
              <span>
                <strong>Conducted by:</strong> Dr. Vatsal Khetan &amp; Dr. Heli Khetan
              </span>
              <span className="hidden sm:inline text-slate-300">&bull;</span>
              <span>
                <strong>Venue:</strong> Khetan Knee N Shoulder Clinic, Betiahata, Gorakhpur
              </span>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              ASYMMETRICAL TWO-COLUMN COMPOSITION
          ═══════════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mt-6 sm:mt-8 relative z-10">

            {/* ── LEFT COLUMN: 3D FLOATING POSTER (Scroll Straightening + Pointer Tilt) ── */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              <motion.div
                style={prefersReducedMotion ? {} : {
                  y: campPosterScrollY,
                  rotateZ: campPosterScrollRotateZ,
                  rotateY: posterTilt.rotateY,
                  rotateX: posterTilt.rotateX,
                  scale: campPosterScale,
                }}
                onMouseMove={handlePosterMouseMove}
                onMouseLeave={handlePosterMouseLeave}
                className="relative w-full max-w-[320px] mx-auto will-change-transform [perspective:1000px]"
              >
                {/* Clickable Poster Frame */}
                <div
                  onClick={() => setIsPosterModalOpen(true)}
                  className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_20px_45px_rgba(8,40,77,0.14)] hover:shadow-[0_25px_55px_rgba(8,40,77,0.22)] cursor-pointer group transition-shadow duration-300"
                  title="Click to view full poster"
                >
                  {/* Subtle technical edge border highlight */}
                  <div className="absolute inset-0 border border-sky-400/40 rounded-2xl pointer-events-none z-20 group-hover:border-sky-500/70 transition-colors" />

                  <img
                    src="/images/khetan-knee-camp-poster-general.webp"
                    alt="Official Khetan Knee Camp Poster"
                    className="w-full h-full object-contain p-1.5 group-hover:scale-102 transition-transform duration-500"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none z-20">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#08284d] text-white text-[11px] font-bold tracking-tight shadow-md flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>View Full Poster</span>
                    </span>
                  </div>
                </div>

                {/* Prominent Schedule Display Below Poster */}
                <div className="mt-4 p-3 rounded-xl bg-white/95 border border-slate-200/90 shadow-sm flex items-center justify-between text-xs text-slate-800">
                  <div className="inline-flex items-center gap-1.5 font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/70">
                    <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Every Month</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 font-mono font-bold text-slate-900 pr-1">
                    <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>10:00 AM – 1:00 PM</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN: EXAMINATIONS, CONCESSIONS & NOTICES ── */}
            <motion.div
              variants={campContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              className="lg:col-span-7 space-y-5"
            >
              {/* 1. Six Free Clinical Examinations (2-Column Sequential Reveal) */}
              <div className="space-y-2.5">
                <motion.div variants={campItemVariants} className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>6 Included Free Examinations:</span>
                </motion.div>

                <motion.div variants={examGridContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Examination 1: Consultation */}
                  <motion.div variants={examItemLeftVariants} className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-sky-400 hover:shadow-xs transition-all flex items-start gap-2.5">
                    <Stethoscope className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 leading-tight">
                        Consultation
                      </div>
                      <div className="text-[11px] font-medium text-slate-600">
                        नि:शुल्क परामर्श
                      </div>
                    </div>
                  </motion.div>

                  {/* Examination 2: Bone Health */}
                  <motion.div variants={examItemRightVariants} className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-sky-400 hover:shadow-xs transition-all flex items-start gap-2.5">
                    <Activity className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 leading-tight">
                        Bone Health / Density
                      </div>
                      <div className="text-[11px] font-medium text-slate-600">
                        हड्डी की जांच (BMD)
                      </div>
                    </div>
                  </motion.div>

                  {/* Examination 3: Nerve Check */}
                  <motion.div variants={examItemLeftVariants} className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-sky-400 hover:shadow-xs transition-all flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 leading-tight">
                        Nerve Check
                      </div>
                      <div className="text-[11px] font-medium text-slate-600">
                        नस की जांच
                      </div>
                    </div>
                  </motion.div>

                  {/* Examination 4: Blood Sugar */}
                  <motion.div variants={examItemRightVariants} className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-sky-400 hover:shadow-xs transition-all flex items-start gap-2.5">
                    <HeartHandshake className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 leading-tight">
                        Blood Sugar Check
                      </div>
                      <div className="text-[11px] font-medium text-slate-600">
                        शुगर जांच
                      </div>
                    </div>
                  </motion.div>

                  {/* Examination 5: Blood Pressure */}
                  <motion.div variants={examItemLeftVariants} className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-sky-400 hover:shadow-xs transition-all flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 leading-tight">
                        Blood Pressure Check
                      </div>
                      <div className="text-[11px] font-medium text-slate-600">
                        बी.पी. जांच
                      </div>
                    </div>
                  </motion.div>

                  {/* Examination 6: Uric Acid */}
                  <motion.div variants={examItemRightVariants} className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-sky-400 hover:shadow-xs transition-all flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 leading-tight">
                        Uric Acid Evaluation
                      </div>
                      <div className="text-[11px] font-medium text-slate-600">
                        यूरिक एसिड मूल्यांकन
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* 2. Hospital Concessions Strip */}
              <motion.div variants={campItemVariants} className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xs space-y-2">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600">
                  Exclusive Hospital Concessions:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-rose-50/70 border border-rose-200/60">
                    <div className="text-lg sm:text-xl font-extrabold text-rose-900">50%</div>
                    <div className="text-[10px] font-bold text-rose-700">Off X-Rays</div>
                  </div>
                  <div className="p-2 rounded-xl bg-sky-50/70 border border-sky-200/60">
                    <div className="text-lg sm:text-xl font-extrabold text-sky-900">30%</div>
                    <div className="text-[10px] font-bold text-sky-700">Off Blood Tests</div>
                  </div>
                  <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-200/60">
                    <div className="text-lg sm:text-xl font-extrabold text-amber-900">10%</div>
                    <div className="text-[10px] font-bold text-amber-700">Off Medicines</div>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
                    <div className="text-lg sm:text-xl font-extrabold text-emerald-900">Special</div>
                    <div className="text-[10px] font-bold text-emerald-700">Athlete Concession</div>
                  </div>
                </div>
              </motion.div>

              {/* 3. Transparent ₹50 Registration Notice */}
              <motion.div variants={campItemVariants} className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 text-xs leading-relaxed flex items-start gap-2.5 shadow-2xs">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <strong className="block font-bold text-amber-900 uppercase tracking-tight text-[11px]">
                    100% Free Doctor Consultation &amp; Examinations
                  </strong>
                  <p className="text-[11px] font-medium text-amber-950/90">
                    Only a nominal <strong className="font-bold text-slate-900">₹50</strong> hospital registration fee is payable at the desk. All doctor consultations and diagnostic checks listed above are free of charge.
                  </p>
                </div>
              </motion.div>

              {/* 4. Action Buttons */}
              <motion.div variants={campItemVariants} className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href="tel:9161995550"
                  className="px-6 py-2.5 rounded-full bg-[#08284d] hover:bg-sky-800 text-white text-xs font-bold tracking-tight transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>CALL TO REGISTER — 9161995550</span>
                </a>


              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          6. CONVERSATIONAL FAQ STAGE COVERED BY SHUTTER FOOTER
          • Sticky FAQ stage stays in viewport and recesses smoothly in scale & opacity
          • Full-Screen Hospital Shutter Footer rises from bottom like a physical curtain,
            covering everything as on Home Page
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
                <span>WHAT TO ASK BEFORE CONSULTATION...</span>
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

      {/* Lightbox Modal for Original Poster */}
      <PosterLightboxModal
        isOpen={isPosterModalOpen}
        onClose={() => setIsPosterModalOpen(false)}
        imageSrc="/images/khetan-knee-camp-poster-general.webp"
      />
    </div>
  );
};

export default AboutPage;
