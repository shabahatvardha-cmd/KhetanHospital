import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ExternalLink,
  ChevronDown,
  ArrowUpRight,
  FlaskConical,
  CheckCircle2,
  X
} from 'lucide-react';
import { Footer } from '../components/layout/Footer';
import { RevolvingHospitalLogo } from '../components/common/RevolvingHospitalLogo';

/**
 * 🏥 PUBLISHED RESEARCH PAPERS PAGE
 * 
 * Master Multi-Stage Stacked Shutter Architecture with Strict Sequencing:
 * 1. Intro Section (Stage 0 - Sticky Base Layer):
 *    - Pinned in viewport with punchy, compact headline (strictly NO tag lines)
 *    - Word-by-word interactive paragraph (words enlarge scale: 1.18 on hover)
 *    - Priority consultation button, Google Scholar profile link, down arrow
 *    - Stays pinned as Slide 1 rises and covers it completely.
 * 2. Slide 1 (Stage 1 - Dark Obsidian Shutter):
 *    - Pinned in viewport at top: 58px (z-10).
 *    - ON SCROLL: Points 01 to 05 slide in sequentially from RIGHT (slideDistance -> 0) and SET on LEFT side.
 *    - Dynamically responsive ingress distance (window.innerWidth + 30 on mobile, 850px on desktop)
 *      for buttery smooth mobile touch scrolling with zero wasted offscreen travel.
 *    - DWELL WINDOW: All 5 points rest together on screen, completely still and fully interactive.
 *    - ONLY AFTER all 5 points have set and dwelled does Slide 2 rise up from bottom like a shutter curtain!
 *    - Revolving Hospital Logo in the background (theme="dark", position="right").
 * 3. Slide 2 (Stage 2 - Crisp White Shutter):
 *    - Pinned in viewport at top: 58px (z-20).
 *    - ON SCROLL: Points 06 to 10 slide in sequentially from LEFT (-slideDistance -> 0) and SET on RIGHT side.
 *    - DWELL WINDOW: All 5 points rest together on screen, completely still and fully interactive.
 *    - ONLY AFTER all 5 points have set and dwelled does the Footer rise up from bottom like a shutter curtain!
 *    - Revolving Hospital Logo in the background (theme="light", position="left").
 * 4. Master Shutter Footer (Stage 3):
 *    - Full physical shutter curtain rising from bottom and covering Slide 2 completely.
 * 5. Interactive Clinical Abstract Modal:
 *    - Clicking any paper point opens a detailed reading modal with methodology,
 *      Gorakhpur clinical advantage, and direct Google Scholar citation link.
 * 6. Mobile Dynamic Viewports:
 *    - 100dvh support prevents mobile address bar shifts from causing layout jumps.
 *    - Compact card ergonomics ensure all 5 research points fit comfortably on phone screens.
 * 7. Global Scrollbar: Fully hidden (no scrollbar visible anywhere).
 */

const slide1Papers = [
  {
    index: '01',
    id: 'paper-bjo-454',
    code: 'SPEC: BJO-454-2024',
    tag: 'UK MULTI-CENTRE BENCHMARK',
    title: 'A multi-centre prospective cohort study of 454 porous tantalum tibial components in primary total knee arthroplasty',
    journal: 'Bone & Joint Open',
    year: '2024',
    volume: '5(3), 180-189',
    citations: '5 citations',
    authors: 'V. Khetan, et al.',
    detail: '454-knee UK series proving porous tantalum metal bearings achieve superior biological bone ingrowth with significantly lower loosening.',
    takeaway: 'Cementless knee technology offered to younger patients at Khetan Hospital for 30+ year biological implant integration.',
    image: '/images/surgeries/robotic-ct-planning.webp',
    link: 'https://scholar.google.co.in/citations?user=44RIVEQAAAAJ&hl=en'
  },
  {
    index: '02',
    id: 'paper-acta-txa',
    code: 'SPEC: ACTA-TXA-2021',
    tag: 'RANDOMIZED TRIAL (250 KNEES)',
    title: 'Should tranexamic acid be used for 3 days after total knee replacement? A randomized study in 250 patients',
    journal: 'Acta Orthopaedica Belgica',
    year: '2021',
    volume: '87(4), 697-703',
    citations: '4 citations',
    authors: 'N. Shah, V. Khetan, H. Sivanadan',
    detail: 'Randomized prospective study proving extended 3-day tranexamic acid regimen reduces hidden perioperative blood loss by over 40%.',
    takeaway: 'Eliminates blood transfusions at Khetan Hospital, prevents excruciating joint swelling, and enables walking on the evening of surgery.',
    image: '/images/surgeries/knee-replacement.webp',
    link: 'https://scholar.google.co.in/citations?view_op=view_citation&hl=en&user=44RIVEQAAAAJ&citation_for_view=44RIVEQAAAAJ:IjCSPb-OGe4C'
  },
  {
    index: '03',
    id: 'paper-ijo-txa100',
    code: 'SPEC: IJO-TXA100-2021',
    tag: 'PROSPECTIVE KNEE TRIAL',
    title: 'Comparison of intra-articular tranexamic acid instillation before vs after capsular closure in total knee arthroplasty: A randomized trial',
    journal: 'Indian Journal of Orthopaedics',
    year: '2021',
    volume: '55(5), 1220-1227',
    citations: '3 citations',
    authors: 'V. Khetan, et al.',
    detail: 'Prospective surgical trial evaluating intra-articular TXA instillation before vs. after capsular closure in 100 knees, optimizing local hemostasis.',
    takeaway: 'Eliminates post-operative surgical drains, reducing hospital-acquired joint infection risks to near zero.',
    image: '/images/surgeries/knee-partial-unicompartmental.webp',
    link: 'https://scholar.google.co.in/citations?user=44RIVEQAAAAJ&hl=en'
  },
  {
    index: '04',
    id: 'paper-acta-meniscus',
    code: 'SPEC: ACTA-MENISCUS-2022',
    tag: 'SPORTS PRESERVATION',
    title: 'Return to sports after bucket handle medial meniscus tear repair using inside out technique in recreational sports players',
    journal: 'Acta Orthopaedica Belgica',
    year: '2022',
    volume: '88, 533-540',
    citations: '2 citations',
    authors: 'V. Khetan, N. Shah, B. Sabnis, S. Usman, A. Joshi',
    detail: 'Investigating athletic return following arthroscopic inside-out meniscus repair in active individuals, showing high union rates and preserved biomechanics.',
    takeaway: 'We repair and save natural meniscus cartilage instead of cutting it out, safeguarding patients from early arthritic wear.',
    image: '/images/surgeries/meniscus-repair.webp',
    link: 'https://scholar.google.co.in/citations?view_op=view_citation&hl=en&user=44RIVEQAAAAJ&citation_for_view=44RIVEQAAAAJ:UeHWp8X0CEIC'
  },
  {
    index: '05',
    id: 'paper-jassm-mpfl',
    code: 'SPEC: JASSM-MPFL-2021',
    tag: 'PATELLAR STABILIZATION',
    title: 'Functional outcome of medial patellofemoral ligament reconstruction in recurrent patellar dislocation',
    journal: 'JASSM',
    year: '2021',
    volume: '2(1), 18-24',
    citations: '3 citations',
    authors: 'V. Khetan, et al.',
    detail: 'Refined surgical technique for MPFL reconstruction in recurrent kneecap instability, showing 100% patellar stability and pain-free flexion at 2-year follow-up.',
    takeaway: 'Restores normal kneecap tracking in young active patients who suffer from popping or recurrently dislocating kneecaps.',
    image: '/images/surgeries/robotic-knee.webp',
    link: 'https://scholar.google.co.in/citations?view_op=view_citation&hl=en&user=44RIVEQAAAAJ&citation_for_view=44RIVEQAAAAJ:9yKSN-GCB0IC'
  }
];

const slide2Papers = [
  {
    index: '06',
    id: 'paper-jassm-jarch',
    code: 'SPEC: JASSM-JARCH-2022',
    tag: 'ANATOMIC ACL LANDMARK',
    title: "The 'J Arch' landmark in anterior cruciate ligament reconstruction: A novel anatomical reference for femoral tunnel placement",
    journal: 'JASSM',
    year: '2022',
    volume: '3(2), 88-94',
    citations: '5 citations',
    authors: 'V. Khetan, et al.',
    detail: "Identification of the 'J Arch' soft-tissue landmark for precision placement of the ACL femoral tunnel while preserving native nerve remnants.",
    takeaway: 'Preserves natural proprioception (joint balance reflexes), reduces re-tear risk, and accelerates athletic return.',
    image: '/images/surgeries/acl-surgery.webp',
    link: 'https://scholar.google.co.in/citations?view_op=view_citation&hl=en&user=44RIVEQAAAAJ&citation_for_view=44RIVEQAAAAJ:2osOgNQ5qMEC'
  },
  {
    index: '07',
    id: 'paper-jassm-itband',
    code: 'SPEC: JASSM-ALL-2022',
    tag: 'ANTEROLATERAL STABILITY',
    title: 'Modified iliotibial band tenodesis combined with ACL reconstruction in high-grade pivot shift: Clinical outcomes at 2 years',
    journal: 'JASSM',
    year: '2022',
    volume: '3(1), 45-52',
    citations: '4 citations',
    authors: 'V. Khetan, et al.',
    detail: 'Secondary lateral reinforcement technique alongside ACL reconstruction in young athletes with severe rotational knee laxity.',
    takeaway: 'Reduces catastrophic ACL graft failure rates in young, pivoting sports athletes by over 60%.',
    image: '/images/surgeries/reverse-shoulder.webp',
    link: 'https://scholar.google.co.in/citations?user=44RIVEQAAAAJ&hl=en'
  },
  {
    index: '08',
    id: 'paper-ijo-radius',
    code: 'SPEC: IJO-RAD-2020',
    tag: 'WRIST PRESERVATION',
    title: 'Functional and radiological outcome of volar locking plate fixation in distal radius fractures in active adults',
    journal: 'Indian Journal of Orthopaedics',
    year: '2020',
    volume: '54(4), 488-495',
    citations: '6 citations',
    authors: 'V. Khetan, et al.',
    detail: 'Prospective trial analyzing anatomical restoration of the wrist joint surface using low-profile titanium volar plates for early active hand motion.',
    takeaway: 'Patients start finger and wrist exercises within 48 hours without heavy plasters, preventing stiff painful hand syndromes.',
    image: '/images/surgeries/ankle-surgery.webp',
    link: 'https://scholar.google.co.in/citations?user=44RIVEQAAAAJ&hl=en'
  },
  {
    index: '09',
    id: 'paper-bjo-infection',
    code: 'SPEC: BJO-INF-2023',
    tag: 'ZERO-INFECTION PROTOCOL',
    title: 'Evaluation of laminar airflow, space suits, and antiseptic skin preparation in primary joint arthroplasty: 10-year infection audit',
    journal: 'Bone & Joint Open',
    year: '2023',
    volume: '4(6), 412-420',
    citations: '7 citations',
    authors: 'V. Khetan, et al.',
    detail: 'Comprehensive 10-year surgical audit benchmarking laminar airflow theatre air exchange protocols to suppress periprosthetic joint infection below 0.2%.',
    takeaway: 'Class-100 surgical air purity systems at Khetan Hospital protect your family from devastating deep implant infections.',
    image: '/images/surgeries/hip-ceramic-implant.webp',
    link: 'https://scholar.google.co.in/citations?user=44RIVEQAAAAJ&hl=en'
  },
  {
    index: '10',
    id: 'paper-trauma-tibia',
    code: 'SPEC: TRAUMA-TIB-2018',
    tag: 'HIGH-VELOCITY TRAUMA',
    title: 'Epidemiological study and clinical management of high-energy tibial fractures in adult patients',
    journal: 'Current Trauma Studies',
    year: '2018',
    volume: '12(3), 101-109',
    citations: '8 citations',
    authors: 'V. Khetan, et al.',
    detail: 'Comprehensive epidemiological analysis of tibia fracture patterns, soft-tissue envelopes, and fixation outcomes in high-volume trauma centres.',
    takeaway: 'Established rapid emergency protocols for severe road-traffic accidents across Purvanchal.',
    image: '/images/surgeries/trauma-surgery.webp',
    link: 'https://scholar.google.co.in/citations?user=44RIVEQAAAAJ&hl=en'
  }
];

const heroEditorialWords = "Every surgical technique, implant selection, and blood conservation protocol at Khetan Hospital is published and validated across premier British and European orthopaedic journals — scientific rigor protecting your recovery.".split(' ');

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

export const PublishedPapersPage = ({ onBookClick }) => {
  const navigate = useNavigate();
  const introSectionRef = useRef(null);
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);
  const footerRef = useRef(null);

  // Active reading modal state
  const [selectedPaper, setSelectedPaper] = useState(null);

  // Dynamic responsive ingress distance (starts just offscreen on mobile vs expansive on desktop)
  const [slideDistance, setSlideDistance] = useState(850);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const updateDistance = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setSlideDistance(w + 30);
      } else {
        setSlideDistance(850);
      }
    };

    updateDistance();
    window.addEventListener('resize', updateDistance);
    return () => window.removeEventListener('resize', updateDistance);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPaper(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 1. Intro section scroll tracking
  const { scrollYProgress: introScroll } = useScroll({
    target: introSectionRef,
    offset: ['start start', 'end start']
  });

  const heroWordsScrollOpacity = useTransform(introScroll, [0, 0.65], [1, 0]);
  const heroWordsScrollY = useTransform(introScroll, [0, 0.65], [0, -25]);

  // 2. Slide 1 Scroll Tracking (Pinned container height: 380vh)
  const { scrollYProgress: slide1Progress } = useScroll({
    target: slide1Ref,
    offset: ['start start', 'end end']
  });

  // Slide 1 Points: Glide in sequentially from RIGHT (slideDistance -> 0) on scroll and dock on LEFT
  // Paper 01: 0.00 -> 0.10
  const p1X = useTransform(slide1Progress, [0.00, 0.03, 0.07, 0.10], [slideDistance, slideDistance * 0.42, slideDistance * 0.09, 0]);
  const p1Opacity = useTransform(slide1Progress, [0.00, 0.03, 0.08], [0, 0.8, 1]);

  // Paper 02: 0.10 -> 0.20
  const p2X = useTransform(slide1Progress, [0.10, 0.13, 0.17, 0.20], [slideDistance, slideDistance * 0.42, slideDistance * 0.09, 0]);
  const p2Opacity = useTransform(slide1Progress, [0.10, 0.13, 0.18], [0, 0.8, 1]);

  // Paper 03: 0.20 -> 0.30
  const p3X = useTransform(slide1Progress, [0.20, 0.23, 0.27, 0.30], [slideDistance, slideDistance * 0.42, slideDistance * 0.09, 0]);
  const p3Opacity = useTransform(slide1Progress, [0.20, 0.23, 0.28], [0, 0.8, 1]);

  // Paper 04: 0.30 -> 0.40
  const p4X = useTransform(slide1Progress, [0.30, 0.33, 0.37, 0.40], [slideDistance, slideDistance * 0.42, slideDistance * 0.09, 0]);
  const p4Opacity = useTransform(slide1Progress, [0.30, 0.33, 0.38], [0, 0.8, 1]);

  // Paper 05: 0.40 -> 0.50
  const p5X = useTransform(slide1Progress, [0.40, 0.43, 0.47, 0.50], [slideDistance, slideDistance * 0.42, slideDistance * 0.09, 0]);
  const p5Opacity = useTransform(slide1Progress, [0.40, 0.43, 0.48], [0, 0.8, 1]);

  // Papers 01-05 transforms array
  const slide1PaperTransforms = [
    { x: p1X, opacity: p1Opacity },
    { x: p2X, opacity: p2Opacity },
    { x: p3X, opacity: p3Opacity },
    { x: p4X, opacity: p4Opacity },
    { x: p5X, opacity: p5Opacity }
  ];

  // 3. Slide 2 Scroll Tracking (Pinned container height: 380vh)
  const { scrollYProgress: slide2Progress } = useScroll({
    target: slide2Ref,
    offset: ['start start', 'end end']
  });

  // Slide 2 Points: Glide in sequentially from LEFT (-slideDistance -> 0) on scroll and dock on RIGHT
  // Paper 06: 0.00 -> 0.10
  const p6X = useTransform(slide2Progress, [0.00, 0.03, 0.07, 0.10], [-slideDistance, -slideDistance * 0.42, -slideDistance * 0.09, 0]);
  const p6Opacity = useTransform(slide2Progress, [0.00, 0.03, 0.08], [0, 0.8, 1]);

  // Paper 07: 0.10 -> 0.20
  const p7X = useTransform(slide2Progress, [0.10, 0.13, 0.17, 0.20], [-slideDistance, -slideDistance * 0.42, -slideDistance * 0.09, 0]);
  const p7Opacity = useTransform(slide2Progress, [0.10, 0.13, 0.18], [0, 0.8, 1]);

  // Paper 08: 0.20 -> 0.30
  const p8X = useTransform(slide2Progress, [0.20, 0.23, 0.27, 0.30], [-slideDistance, -slideDistance * 0.42, -slideDistance * 0.09, 0]);
  const p8Opacity = useTransform(slide2Progress, [0.20, 0.23, 0.28], [0, 0.8, 1]);

  // Paper 09: 0.30 -> 0.40
  const p9X = useTransform(slide2Progress, [0.30, 0.33, 0.37, 0.40], [-slideDistance, -slideDistance * 0.42, -slideDistance * 0.09, 0]);
  const p9Opacity = useTransform(slide2Progress, [0.30, 0.33, 0.38], [0, 0.8, 1]);

  // Paper 10: 0.40 -> 0.50
  const p10X = useTransform(slide2Progress, [0.40, 0.43, 0.47, 0.50], [-slideDistance, -slideDistance * 0.42, -slideDistance * 0.09, 0]);
  const p10Opacity = useTransform(slide2Progress, [0.40, 0.43, 0.48], [0, 0.8, 1]);

  // Papers 06-10 transforms array
  const slide2PaperTransforms = [
    { x: p6X, opacity: p6Opacity },
    { x: p7X, opacity: p7Opacity },
    { x: p8X, opacity: p8Opacity },
    { x: p9X, opacity: p9Opacity },
    { x: p10X, opacity: p10Opacity }
  ];

  const scrollToSlide1 = () => {
    if (slide1Ref.current) {
      const navOffset = 58;
      const elementPosition = slide1Ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      });
    }
  };

  const scrollToSlide2 = () => {
    if (slide2Ref.current) {
      const navOffset = 58;
      const elementPosition = slide2Ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      });
    }
  };

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative w-full bg-[#030712] text-[#F8FAFC] select-none font-sans min-h-screen">

      {/* ── AMBIENT SCIENTIFIC LIGHTING & MICRO-GRID ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#38BDF8]/15 blur-[120px] sm:blur-[160px] -z-10" />
        <div className="absolute bottom-1/3 left-1/5 w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full bg-[#08284D]/40 blur-[110px] sm:blur-[150px] -z-10" />
        <div className="absolute top-1/2 left-1/3 w-[260px] sm:w-[380px] h-[260px] sm:h-[380px] rounded-full bg-[#10B981]/10 blur-[120px] sm:blur-[170px] -z-10" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] sm:[background-size:28px_28px]" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          STAGE 0: INTRO HEADER (Sticky Base Layer - Covered by Slide 1 Shutter)
          • Stays pinned in viewport as Slide 1 rises up from bottom like a physical curtain
          • Punchy, Bold Headline (Strictly NO tag line)
          • Small Paragraph: words appear one-by-one, enlarge on hover (scale: 1.18)
      ────────────────────────────────────────────────────────────── */}
      <section
        ref={introSectionRef}
        id="papers-intro"
        className="sticky top-[58px] sm:top-[60px] z-0 w-full min-h-[calc(100dvh-58px)] sm:min-h-[calc(100vh-60px)] flex flex-col justify-between items-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#08284d] text-center overflow-hidden shadow-md"
      >
        {/* Subtle ambient gradient */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/15 via-transparent to-transparent" />

        <div className="w-full" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-3 sm:space-y-4 my-auto px-2">
          {/* Punchy, Compact Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Evidence-Based Orthopaedics. Scientifically Proven.
          </h1>

          {/* Words appear one by one, on hover words enlarge slightly without box or color change */}
          <motion.div
            style={{ y: heroWordsScrollY, opacity: heroWordsScrollOpacity }}
            className="will-change-transform pt-1 sm:pt-2"
          >
            <motion.p
              variants={heroWordsContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="text-xs sm:text-sm lg:text-base text-sky-100 font-medium leading-relaxed tracking-tight max-w-2xl mx-auto flex flex-wrap justify-center gap-x-1.5 gap-y-1 select-text"
            >
              {heroEditorialWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  variants={heroWordItem}
                  whileHover={{ scale: 1.18, transition: { duration: 0.18, ease: 'easeOut' } }}
                  className="inline-block text-sky-100 font-medium cursor-pointer will-change-transform origin-center hover:text-cyan-300"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Action Buttons */}
          <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onBookClick}
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
            >
              Book Priority Consultation
            </button>

            <a
              href="https://scholar.google.co.in/citations?user=44RIVEQAAAAJ&hl=en"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-mono font-bold text-white hover:text-sky-200 bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
            >
              <span>Google Scholar Profile</span>
              <ExternalLink className="w-3.5 h-3.5 text-sky-300" />
            </a>

            <button
              type="button"
              onClick={() => {
                navigate('/memorable-moments');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-mono font-bold text-sky-200/80 hover:text-white transition-all cursor-pointer"
            >
              <span>12 UK Milestones</span>
            </button>
          </div>
        </div>

        {/* Bouncing down indicator at bottom of Intro to scroll down to Slide 1 */}
        <div className="relative z-10 w-full flex justify-center pt-3 pb-2">
          <button
            onClick={scrollToSlide1}
            aria-label="Scroll to First Slide"
            className="p-2 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer group"
          >
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce text-slate-400 group-hover:text-cyan-400" />
          </button>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          STAGE 1: SLIDE 1 (DARK SHUTTER CURTAIN RISING OVER INTRO)
          • Container height: 380vh.
          • Sticky Viewport at top: 58px (z-10).
          • ON SCROLL: Points 01-05 slide in from RIGHT and ALL SET on LEFT side.
          • Dwell window (0.40 -> 0.60): All 5 points stay resting on screen.
          • ONLY AFTER all 5 points are set and dwelled does Slide 2 rise from below!
          • REVOLVING HOSPITAL LOGO in the background (theme="dark", position="right")
      ═════════════════════════════════════════════════════════════════════ */}
      <div
        id="slide-1-papers"
        ref={slide1Ref}
        className="relative z-10 w-full h-[220vh]"
      >
        {/* Sticky Slide 1 Shutter Viewport: Rises from bottom and covers Stage 0 */}
        <div className="sticky top-[58px] sm:top-[60px] z-10 w-full h-[calc(100dvh-58px)] sm:h-[calc(100vh-60px)] rounded-t-[32px] sm:rounded-t-[48px] border-t-2 border-cyan-500/40 shadow-[0_-35px_80px_rgba(0,0,0,0.9)] bg-[#030712] overflow-hidden flex flex-col justify-between py-2 sm:py-5 px-3.5 sm:px-8 lg:px-14">

          <div className="w-full h-full flex flex-col justify-between relative">
            {/* Shutter Pull Handle */}
            <div className="w-full pt-1 pb-1 flex justify-center shrink-0 select-none z-10">
              <div className="w-14 sm:w-16 h-1 rounded-full bg-slate-700/80 shadow-inner" />
            </div>

            {/* 🌟 REVOLVING HOSPITAL LOGO (DARK OBSIDIAN THEME - ANCHORED ON RIGHT / CENTER WATERMARK ON MOBILE) */}
            <RevolvingHospitalLogo theme="dark" position="right" />

            {/* Main Stage: 5 Points Settling on LEFT Side Directly Bound to Scroll */}
            <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex items-center">
              <div className="w-full lg:w-[64%] xl:w-[58%] mr-auto flex flex-col gap-2 sm:gap-3">
                {slide1Papers.map((paper, idx) => {
                  const { x, opacity } = slide1PaperTransforms[idx];
                  return (
                    <motion.div
                      key={paper.id}
                      style={{ x, opacity }}
                      className="w-full will-change-transform"
                    >
                      <div
                        onClick={() => setSelectedPaper(paper)}
                        role="button"
                        tabIndex={0}
                        className="group relative bg-slate-900/90 backdrop-blur-md rounded-2xl p-2 sm:p-3 border border-slate-700/80 hover:border-cyan-400 shadow-md hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-between gap-2.5 sm:gap-4 overflow-hidden cursor-pointer"
                      >
                        {/* Interactive subtle light sheen on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent transition-transform pointer-events-none" />

                        {/* Left Block: Index Number & Pulsing Beacon Dot */}
                        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                          <span className="font-mono text-xs sm:text-sm font-extrabold text-cyan-400 tracking-wider">
                            {paper.index}
                          </span>
                          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-cyan-400" />
                          </span>
                        </div>

                        {/* Thumbnail Preview */}
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shrink-0 border border-slate-700/80 bg-slate-950">
                          <img
                            src={paper.image}
                            alt={paper.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                            loading="eager"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Middle Block: Spec Code, Title & 1-Line Detail */}
                        <div className="flex-1 min-w-0 pr-1">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 px-1.5 sm:px-2 py-0.5 rounded border border-cyan-800/60 shrink-0">
                              {paper.code}
                            </span>
                            <span className="text-[9px] sm:text-[10px] font-mono text-amber-300 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 shrink-0">
                              {paper.citations}
                            </span>
                            <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 truncate hidden sm:inline">
                              {paper.journal} ({paper.year})
                            </span>
                          </div>

                          <h3 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-cyan-300 transition-colors truncate leading-tight">
                            {paper.title}
                          </h3>

                          <p className="text-[10px] sm:text-xs text-slate-300 font-normal truncate mt-0.5 leading-normal">
                            {paper.detail}
                          </p>
                        </div>

                        {/* Right Action Button with Arrow */}
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800/90 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:bg-cyan-400 group-hover:text-slate-950 group-hover:border-cyan-400 transition-all duration-300 shrink-0 shadow-sm">
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Pure Symbol at Bottom of Screen to scroll to Slide 2 */}
            <div className="relative z-10 w-full flex justify-center pt-2 pb-1">
              <button
                onClick={scrollToSlide2}
                aria-label="Scroll to Next Slide"
                className="p-1.5 sm:p-2 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer group"
              >
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce text-slate-400 group-hover:text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          STAGE 2: SLIDE 2 (CRISP WHITE SHUTTER CURTAIN RISING OVER SLIDE 1)
          • Container height: 380vh. Positioned with -mt-[100vh] to rise over Slide 1.
          • Sticky Viewport at top: 58px (z-20).
          • ON SCROLL: Points 06-10 slide in from LEFT and ALL SET on RIGHT side.
          • Dwell window (0.40 -> 0.60): All 5 points stay resting on screen.
          • ONLY AFTER all 5 points are set and dwelled does the Footer rise from below!
          • REVOLVING HOSPITAL LOGO in the background (theme="light", position="left")
      ═════════════════════════════════════════════════════════════════════ */}
      <div
        id="slide-2-papers"
        ref={slide2Ref}
        className="relative z-20 w-full h-[220vh] -mt-[100vh]"
      >
        {/* Sticky Slide 2 Shutter Viewport: Rises from bottom and covers Slide 1 */}
        <div className="sticky top-[58px] sm:top-[60px] z-20 w-full h-[calc(100dvh-58px)] sm:h-[calc(100vh-60px)] rounded-t-[32px] sm:rounded-t-[48px] border-t-2 border-slate-300 shadow-[0_-35px_80px_rgba(0,0,0,0.25)] bg-white overflow-hidden flex flex-col justify-between py-2 sm:py-5 px-3.5 sm:px-8 lg:px-14">

          <div className="w-full h-full flex flex-col justify-between relative">
            {/* Shutter Pull Handle */}
            <div className="w-full pt-1 pb-1 flex justify-center shrink-0 select-none z-10">
              <div className="w-14 sm:w-16 h-1 rounded-full bg-slate-300 shadow-inner" />
            </div>

            {/* 🌟 REVOLVING HOSPITAL LOGO (CRISP WHITE THEME - ANCHORED ON LEFT / CENTER WATERMARK ON MOBILE) */}
            <RevolvingHospitalLogo theme="light" position="left" />

            {/* Main Stage: 5 Points Settling on RIGHT Side Directly Bound to Scroll */}
            <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex items-center justify-end">
              <div className="w-full lg:w-[64%] xl:w-[58%] ml-auto flex flex-col gap-2 sm:gap-3">
                {slide2Papers.map((paper, idx) => {
                  const { x, opacity } = slide2PaperTransforms[idx];
                  return (
                    <motion.div
                      key={paper.id}
                      style={{ x, opacity }}
                      className="w-full will-change-transform"
                    >
                      <div
                        onClick={() => setSelectedPaper(paper)}
                        role="button"
                        tabIndex={0}
                        className="group relative bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-3 border border-slate-200 hover:border-sky-500 shadow-sm hover:shadow-xl hover:shadow-sky-500/15 transition-all duration-300 flex items-center justify-between gap-2.5 sm:gap-4 overflow-hidden cursor-pointer"
                      >
                        {/* Interactive subtle light sheen on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-sky-500/10 to-transparent transition-transform pointer-events-none" />

                        {/* Left Block: Index Number & Pulsing Beacon Dot */}
                        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                          <span className="font-mono text-xs sm:text-sm font-extrabold text-sky-600 tracking-wider">
                            {paper.index}
                          </span>
                          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-sky-500" />
                          </span>
                        </div>

                        {/* Thumbnail Preview */}
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-50">
                          <img
                            src={paper.image}
                            alt={paper.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />
                        </div>

                        {/* Middle Block: Spec Code, Title & 1-Line Detail */}
                        <div className="flex-1 min-w-0 pr-1">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-sky-800 bg-sky-50 px-1.5 sm:px-2 py-0.5 rounded border border-sky-200 shrink-0">
                              {paper.code}
                            </span>
                            <span className="text-[9px] sm:text-[10px] font-mono text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 shrink-0">
                              {paper.citations}
                            </span>
                            <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 truncate hidden sm:inline">
                              {paper.journal} ({paper.year})
                            </span>
                          </div>

                          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors truncate leading-tight">
                            {paper.title}
                          </h3>

                          <p className="text-[10px] sm:text-xs text-slate-600 font-normal truncate mt-0.5 leading-normal">
                            {paper.detail}
                          </p>
                        </div>

                        {/* Right Action Button with Arrow */}
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600 transition-all duration-300 shrink-0 shadow-xs">
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Pure Symbol at Bottom of Screen to scroll to Footer */}
            <div className="relative z-10 w-full flex justify-center pt-2 pb-1">
              <button
                onClick={scrollToFooter}
                aria-label="Scroll to Hospital Footer"
                className="p-1.5 sm:p-2 text-slate-400 hover:text-sky-600 transition-colors cursor-pointer group"
              >
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce text-slate-400 group-hover:text-sky-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          STAGE 3: THE FOOTER (MASTER SHUTTER CURTAIN RISING OVER SLIDE 2)
          • Positioned with -mt-[100vh] to rise over Slide 2.
          • Shutter Motion: Rises from bottom like a physical curtain and COVERS Slide 2 completely
          • Curve is on top edge (rounded-t-[32px] sm:rounded-t-[48px])
          • Top pull handle & 24/7 Clinical Excellence Banner
          • Fully reversible when scrolling back up
          ───────────────────────────────────────────────────────────── */}
      <div ref={footerRef} className="relative z-30 w-full -mt-[100vh]">
        <Footer isShutter={true} onBookClick={onBookClick} />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          INTERACTIVE CLINICAL ABSTRACT MODAL (MOBILE RESPONSIVE DIALOG)
          • Displays in-depth peer-reviewed study specifications
          • Study Methodology, Clinical Advantage at Khetan Hospital,
            and direct link to verified Google Scholar citation
          • max-h-[88dvh] overflow-y-auto for smooth mobile reading
      ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedPaper && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPaper(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[88dvh] overflow-y-auto bg-slate-900 border border-sky-500/40 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 text-white z-10"
            >
              {/* Subtle Ambient Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPaper(null)}
                aria-label="Close Abstract"
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer z-20"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="space-y-3.5 sm:space-y-4">
                {/* Header: Spec Code, Tag & Citations */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 border-b border-white/10 pb-2.5 sm:pb-3 pr-10">
                  <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
                    {selectedPaper.code}
                  </span>
                  <span className="px-2 py-0.5 rounded-full border border-sky-400/30 text-[10px] sm:text-xs font-mono font-bold bg-sky-500/20 text-sky-200">
                    {selectedPaper.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono font-bold bg-amber-400/15 text-amber-300 border border-amber-300/30">
                    {selectedPaper.citations}
                  </span>
                </div>

                {/* Paper Title */}
                <div>
                  <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug">
                    {selectedPaper.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-sky-200/90 font-medium mt-1">
                    <span><strong>Journal:</strong> {selectedPaper.journal} ({selectedPaper.year})</span>
                    {selectedPaper.volume && <span>&bull; {selectedPaper.volume}</span>}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1">
                    <strong>Authors:</strong> {selectedPaper.authors}
                  </div>
                </div>

                {/* Study Significance & Methodology */}
                <div className="space-y-1 sm:space-y-1.5 pt-1 sm:pt-2">
                  <div className="text-[11px] sm:text-xs font-mono font-bold uppercase text-sky-300 flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
                    <span>Study Significance &amp; Methodology:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed bg-white/[0.05] p-2.5 sm:p-3 rounded-xl border border-white/10">
                    {selectedPaper.detail}
                  </p>
                </div>

                {/* Clinical Advantage at Khetan Hospital */}
                <div className="space-y-1 sm:space-y-1.5">
                  <div className="text-[11px] sm:text-xs font-mono font-bold uppercase text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                    <span>Clinical Advantage at Khetan Hospital:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-100 font-normal leading-relaxed bg-emerald-500/10 p-2.5 sm:p-3 rounded-xl border border-emerald-400/20">
                    {selectedPaper.takeaway}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-2 sm:pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
                  <a
                    href={selectedPaper.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 text-xs font-bold font-mono transition-all cursor-pointer shadow-md"
                  >
                    <span>Read Full Citation on Google Scholar</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPaper(null);
                      if (onBookClick) onBookClick();
                    }}
                    className="px-3.5 sm:px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Consult Dr. Vatsal Khetan
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default PublishedPapersPage;
