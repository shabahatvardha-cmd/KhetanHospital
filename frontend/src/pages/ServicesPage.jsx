import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Footer } from '../components/layout/Footer';
import { RevolvingHospitalLogo } from '../components/common/RevolvingHospitalLogo';

/**
 * 🏥 Khetan Hospital - Services Page
 * 
 * Master Multi-Stage Stacked Shutter Architecture with Strict Sequencing:
 * 1. Intro Section (Layer 0 - Sticky Base):
 *    - Standalone heading + 1 small paragraph with word-by-word hover enlargement (scale: 1.18).
 *    - Stays pinned at top as Slide 1 rises like a shutter curtain and covers it completely.
 * 2. Slide 1 (Layer 1 - Dark Obsidian Shutter):
 *    - Pinned in viewport at top: 58px (z-10).
 *    - ON SCROLL: Points 01 to 04 slide in sequentially from RIGHT (slideDistance -> 0) and SET on LEFT side.
 *    - Dynamically responsive ingress distance (window.innerWidth + 30 on mobile, 850px on desktop)
 *      for buttery smooth mobile touch scrolling with zero wasted offscreen travel.
 *    - DWELL WINDOW: All 4 points rest together on screen, completely still and fully clickable.
 *    - ONLY AFTER all 4 points have set and dwelled does Slide 2 rise up from bottom like a shutter curtain!
 *    - Revolving Hospital Logo in the background (theme="dark", position="right").
 * 3. Slide 2 (Layer 2 - Crisp White Shutter):
 *    - Pinned in viewport at top: 58px (z-20).
 *    - ON SCROLL: Points 05 to 08 slide in sequentially from LEFT (-slideDistance -> 0) and SET on RIGHT side.
 *    - DWELL WINDOW: All 4 points rest together on screen, completely still and fully clickable.
 *    - ONLY AFTER all 4 points have set and dwelled does the Footer rise up from bottom like a shutter curtain!
 *    - Revolving Hospital Logo in the background (theme="light", position="left").
 * 4. Master Footer Shutter (Layer 3):
 *    - Physical shutter curtain rising from bottom and covering Slide 2 completely.
 * 5. Mobile Dynamic Viewports:
 *    - 100dvh support prevents mobile address bar shifts from causing layout jumps.
 *    - Fully responsive card padding & typography for 100% natural mobile touch ergonomics.
 * 6. Global Scrollbar: Fully hidden (no scrollbar visible anywhere).
 */

const slide1Services = [
  {
    index: '01',
    id: 'knee-replacement',
    name: 'Knee Replacement',
    detail: 'Expert knee replacement care for pain-free mobility and improved quality of life.',
    image: '/images/surgeries/knee-replacement.webp',
    route: '/services/knee-replacement'
  },
  {
    index: '02',
    id: 'knee-arthroscopy',
    name: 'Knee Arthroscopy',
    detail: 'Advanced knee arthroscopy for precise diagnosis and minimally invasive treatment.',
    image: '/images/surgeries/robotic-knee.webp',
    route: '/services/knee-arthroscopy'
  },
  {
    index: '03',
    id: 'shoulder-arthroscopy',
    name: 'Shoulder Arthroscopy',
    detail: 'Innovative shoulder arthroscopy for accurate diagnosis and effective minimally invasive treatment.',
    image: '/images/surgeries/reverse-shoulder.webp',
    route: '/services/shoulder-replacement'
  },
  {
    index: '04',
    id: 'ankle-surgery',
    name: 'Ankle Surgery',
    detail: 'Specialized ankle surgery for restoring function and relieving discomfort effectively.',
    image: '/images/surgeries/ankle-surgery.webp',
    route: '/services/ankle-surgery'
  }
];

const slide2Services = [
  {
    index: '05',
    id: 'hip-replacement',
    name: 'Hip Replacement',
    detail: 'Comprehensive hip replacement surgery for improved mobility and pain relief.',
    image: '/images/surgeries/hip-ceramic-implant.webp',
    route: '/services/hip-replacement'
  },
  {
    index: '06',
    id: 'spine-surgery',
    name: 'Spine Surgery',
    detail: 'Advanced spine surgery for alleviating pain and restoring spinal function effectively.',
    image: '/images/surgeries/spine-stabilization.webp',
    route: '/services/spine-surgery'
  },
  {
    index: '07',
    id: 'back-pain',
    name: 'Back Pain Management',
    detail: 'Tailored medical management to alleviate back pain and improve overall well-being.',
    image: '/images/surgeries/indian-back-pain-therapy.webp',
    route: '/services/spine-surgery'
  },
  {
    index: '08',
    id: 'rheumatology',
    name: 'Rheumatology',
    detail: 'Comprehensive rheumatology management for relief and improved quality of life.',
    image: '/images/dr-vatsal-rehab.webp',
    route: '/services/knee-replacement'
  }
];

const servicesEditorialWords = "From sub-millimeter robotic knee replacements and keyhole joint arthroscopy to complex spine stabilization — every surgical procedure is governed by UK Royal College standards for rapid 24-hour walking and lifelong joint preservation.".split(' ');

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

export const ServicesPage = ({ onBookClick }) => {
  const introSectionRef = useRef(null);
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);
  const footerRef = useRef(null);

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

  // 1. Intro section scroll tracking
  const { scrollYProgress: introScroll } = useScroll({
    target: introSectionRef,
    offset: ['start start', 'end start']
  });

  const heroWordsScrollOpacity = useTransform(introScroll, [0, 0.65], [1, 0]);
  const heroWordsScrollY = useTransform(introScroll, [0, 0.65], [0, -25]);

  // 2. Slide 1 Scroll Tracking (Pinned container height: 350vh)
  const { scrollYProgress: slide1Progress } = useScroll({
    target: slide1Ref,
    offset: ['start start', 'end end']
  });

  // Slide 1 Points: Glide in sequentially from RIGHT (slideDistance -> 0) on scroll and dock on LEFT
  // Point 01: 0.00 -> 0.10
  const p1X = useTransform(slide1Progress, [0.00, 0.03, 0.07, 0.10], [slideDistance, slideDistance * 0.42, slideDistance * 0.09, 0]);
  const p1Opacity = useTransform(slide1Progress, [0.00, 0.03, 0.08], [0, 0.8, 1]);

  // Point 02: 0.10 -> 0.20
  const p2X = useTransform(slide1Progress, [0.10, 0.13, 0.17, 0.20], [slideDistance, slideDistance * 0.42, slideDistance * 0.09, 0]);
  const p2Opacity = useTransform(slide1Progress, [0.10, 0.13, 0.18], [0, 0.8, 1]);

  // Point 03: 0.20 -> 0.30
  const p3X = useTransform(slide1Progress, [0.20, 0.23, 0.27, 0.30], [slideDistance, slideDistance * 0.42, slideDistance * 0.09, 0]);
  const p3Opacity = useTransform(slide1Progress, [0.20, 0.23, 0.28], [0, 0.8, 1]);

  // Point 04: 0.30 -> 0.40
  const p4X = useTransform(slide1Progress, [0.30, 0.33, 0.37, 0.40], [slideDistance, slideDistance * 0.42, slideDistance * 0.09, 0]);
  const p4Opacity = useTransform(slide1Progress, [0.30, 0.33, 0.38], [0, 0.8, 1]);

  // Points 01-04 transforms array
  const slide1PointTransforms = [
    { x: p1X, opacity: p1Opacity },
    { x: p2X, opacity: p2Opacity },
    { x: p3X, opacity: p3Opacity },
    { x: p4X, opacity: p4Opacity }
  ];

  // 3. Slide 2 Scroll Tracking (Pinned container height: 350vh)
  const { scrollYProgress: slide2Progress } = useScroll({
    target: slide2Ref,
    offset: ['start start', 'end end']
  });

  // Slide 2 Points: Glide in sequentially from LEFT (-slideDistance -> 0) on scroll and dock on RIGHT
  // Point 05: 0.00 -> 0.10
  const p5X = useTransform(slide2Progress, [0.00, 0.03, 0.07, 0.10], [-slideDistance, -slideDistance * 0.42, -slideDistance * 0.09, 0]);
  const p5Opacity = useTransform(slide2Progress, [0.00, 0.03, 0.08], [0, 0.8, 1]);

  // Point 06: 0.10 -> 0.20
  const p6X = useTransform(slide2Progress, [0.10, 0.13, 0.17, 0.20], [-slideDistance, -slideDistance * 0.42, -slideDistance * 0.09, 0]);
  const p6Opacity = useTransform(slide2Progress, [0.10, 0.13, 0.18], [0, 0.8, 1]);

  // Point 07: 0.20 -> 0.30
  const p7X = useTransform(slide2Progress, [0.20, 0.23, 0.27, 0.30], [-slideDistance, -slideDistance * 0.42, -slideDistance * 0.09, 0]);
  const p7Opacity = useTransform(slide2Progress, [0.20, 0.23, 0.28], [0, 0.8, 1]);

  // Point 08: 0.30 -> 0.40
  const p8X = useTransform(slide2Progress, [0.30, 0.33, 0.37, 0.40], [-slideDistance, -slideDistance * 0.42, -slideDistance * 0.09, 0]);
  const p8Opacity = useTransform(slide2Progress, [0.30, 0.33, 0.38], [0, 0.8, 1]);

  // Points 05-08 transforms array
  const slide2PointTransforms = [
    { x: p5X, opacity: p5Opacity },
    { x: p6X, opacity: p6Opacity },
    { x: p7X, opacity: p7Opacity },
    { x: p8X, opacity: p8Opacity }
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
          STAGE 0: SERVICES INTRO HEADER (Sticky Base Layer - Covered by Slide 1 Shutter)
          • Stays pinned in viewport as Slide 1 rises up from bottom like a physical curtain
          • Punchy, Bold Headline (Strictly NO tag line)
          • Small Paragraph: words appear one-by-one, enlarge on hover (scale: 1.18)
      ────────────────────────────────────────────────────────────── */}
      <section
        ref={introSectionRef}
        id="services-intro"
        className="sticky top-[58px] sm:top-[60px] z-0 w-full min-h-[calc(100dvh-58px)] sm:min-h-[calc(100vh-60px)] flex flex-col justify-between items-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#08284d] text-center overflow-hidden shadow-md"
      >
        {/* Subtle ambient gradient */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/15 via-transparent to-transparent" />

        <div className="w-full" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-3 sm:space-y-4 my-auto px-2">
          {/* Punchy, Compact Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Precision surgical care for lifelong joint mobility.
          </h1>

          {/* Words appear one by one, on hover words enlarge slightly without box or color change */}
          <motion.div
            style={{ y: heroWordsScrollY, opacity: heroWordsScrollOpacity }}
            className="will-change-transform pt-2"
          >
            <motion.p
              variants={heroWordsContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="text-xs sm:text-sm lg:text-base text-sky-100 font-medium leading-relaxed tracking-tight max-w-2xl mx-auto flex flex-wrap justify-center gap-x-1.5 gap-y-1 select-text"
            >
              {servicesEditorialWords.map((word, idx) => (
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
          • Container height: 350vh.
          • Sticky Viewport at top: 58px (z-10).
          • ON SCROLL: Points 01-04 slide in from RIGHT and ALL SET on LEFT side.
          • Dwell window (0.40 -> 0.60): All 4 points stay resting on screen.
          • ONLY AFTER all 4 points are set and dwelled does Slide 2 rise from below!
          • REVOLVING HOSPITAL LOGO in the background (theme="dark", position="right")
      ═════════════════════════════════════════════════════════════════════ */}
      <div
        id="slide-1"
        ref={slide1Ref}
        className="relative z-10 w-full h-[350vh]"
      >
        {/* Sticky Slide 1 Shutter Viewport: Rises from bottom and covers Stage 0 */}
        <div className="sticky top-[58px] sm:top-[60px] z-10 w-full h-[calc(100dvh-58px)] sm:h-[calc(100vh-60px)] rounded-t-[32px] sm:rounded-t-[48px] border-t-2 border-cyan-500/40 shadow-[0_-35px_80px_rgba(0,0,0,0.9)] bg-[#030712] overflow-hidden flex flex-col justify-between py-2.5 sm:py-6 px-3.5 sm:px-8 lg:px-14">

          <div className="w-full h-full flex flex-col justify-between relative">
            {/* Shutter Pull Handle */}
            <div className="w-full pt-1 pb-1 flex justify-center shrink-0 select-none z-10">
              <div className="w-14 sm:w-16 h-1 rounded-full bg-slate-700/80 shadow-inner" />
            </div>

            {/* 🌟 REVOLVING HOSPITAL LOGO (DARK OBSIDIAN THEME - ANCHORED ON RIGHT / CENTER WATERMARK ON MOBILE) */}
            <RevolvingHospitalLogo theme="dark" position="right" />

            {/* Main Stage: 4 Points Settling on LEFT Side Directly Bound to Scroll */}
            <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex items-center">
              <div className="w-full lg:w-[62%] xl:w-[56%] mr-auto flex flex-col gap-2.5 sm:gap-3.5">
                {slide1Services.map((point, idx) => {
                  const { x, opacity } = slide1PointTransforms[idx];
                  return (
                    <motion.div
                      key={point.id}
                      style={{ x, opacity }}
                      className="w-full will-change-transform"
                    >
                      <Link
                        to={point.route}
                        className="group relative bg-slate-900/90 backdrop-blur-md rounded-2xl p-2.5 sm:p-4 border border-slate-700/80 hover:border-cyan-400 shadow-md hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-between gap-3 sm:gap-4 overflow-hidden cursor-pointer"
                      >
                        {/* Interactive subtle light sheen on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent transition-transform pointer-events-none" />

                        {/* Left Block: Index Number & Pulsing Beacon Dot */}
                        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                          <span className="font-mono text-xs sm:text-sm font-extrabold text-cyan-400 tracking-wider">
                            {point.index}
                          </span>
                          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-cyan-400" />
                          </span>
                        </div>

                        {/* Thumbnail Preview */}
                        <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-slate-700/80 bg-slate-950">
                          <img
                            src={point.image}
                            alt={point.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                            loading="eager"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Middle Block: Surgical Title & 1-Line Detail */}
                        <div className="flex-1 min-w-0 pr-1">
                          <h3 className="text-xs sm:text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors truncate leading-tight">
                            {point.name}
                          </h3>
                          <p className="text-[11px] sm:text-xs text-slate-400 font-normal truncate mt-0.5 leading-normal">
                            {point.detail}
                          </p>
                        </div>

                        {/* Right Action Button with Arrow */}
                        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-slate-800/90 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:bg-cyan-400 group-hover:text-slate-950 group-hover:border-cyan-400 transition-all duration-300 shrink-0 shadow-sm">
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </Link>
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
          • Container height: 350vh. Positioned with -mt-[100vh] to rise over Slide 1.
          • Sticky Viewport at top: 58px (z-20).
          • ON SCROLL: Points 05-08 slide in from LEFT and ALL SET on RIGHT side.
          • Dwell window (0.40 -> 0.60): All 4 points stay resting on screen.
          • ONLY AFTER all 4 points are set and dwelled does the Footer rise from below!
          • REVOLVING HOSPITAL LOGO in the background (theme="light", position="left")
      ═════════════════════════════════════════════════════════════════════ */}
      <div
        id="slide-2-stage"
        ref={slide2Ref}
        className="relative z-20 w-full h-[350vh] -mt-[100vh]"
      >
        {/* Sticky Slide 2 Shutter Viewport: Rises from bottom and covers Slide 1 */}
        <div className="sticky top-[58px] sm:top-[60px] z-20 w-full h-[calc(100dvh-58px)] sm:h-[calc(100vh-60px)] rounded-t-[32px] sm:rounded-t-[48px] border-t-2 border-slate-300 shadow-[0_-35px_80px_rgba(0,0,0,0.25)] bg-white overflow-hidden flex flex-col justify-between py-2.5 sm:py-6 px-3.5 sm:px-8 lg:px-14">

          <div className="w-full h-full flex flex-col justify-between relative">
            {/* Shutter Pull Handle */}
            <div className="w-full pt-1 pb-1 flex justify-center shrink-0 select-none z-10">
              <div className="w-14 sm:w-16 h-1 rounded-full bg-slate-300 shadow-inner" />
            </div>

            {/* 🌟 REVOLVING HOSPITAL LOGO (CRISP WHITE THEME - ANCHORED ON LEFT / CENTER WATERMARK ON MOBILE) */}
            <RevolvingHospitalLogo theme="light" position="left" />

            {/* Main Stage: 4 Points Settling on RIGHT Side Directly Bound to Scroll */}
            <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex items-center justify-end">
              <div className="w-full lg:w-[62%] xl:w-[56%] ml-auto flex flex-col gap-2.5 sm:gap-3.5">
                {slide2Services.map((point, idx) => {
                  const { x, opacity } = slide2PointTransforms[idx];
                  return (
                    <motion.div
                      key={point.id}
                      style={{ x, opacity }}
                      className="w-full will-change-transform"
                    >
                      <Link
                        to={point.route}
                        className="group relative bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-4 border border-slate-200 hover:border-sky-500 shadow-sm hover:shadow-xl hover:shadow-sky-500/15 transition-all duration-300 flex items-center justify-between gap-3 sm:gap-4 overflow-hidden cursor-pointer"
                      >
                        {/* Interactive subtle light sheen on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-sky-500/10 to-transparent transition-transform pointer-events-none" />

                        {/* Left Block: Index Number & Pulsing Beacon Dot */}
                        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                          <span className="font-mono text-xs sm:text-sm font-extrabold text-sky-600 tracking-wider">
                            {point.index}
                          </span>
                          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-sky-500" />
                          </span>
                        </div>

                        {/* Thumbnail Preview */}
                        <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-50">
                          <img
                            src={point.image}
                            alt={point.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />
                        </div>

                        {/* Middle Block: Surgical Title & 1-Line Detail */}
                        <div className="flex-1 min-w-0 pr-1">
                          <h3 className="text-xs sm:text-base font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors truncate leading-tight">
                            {point.name}
                          </h3>
                          <p className="text-[11px] sm:text-xs text-slate-500 font-normal truncate mt-0.5 leading-normal">
                            {point.detail}
                          </p>
                        </div>

                        {/* Right Action Button with Arrow */}
                        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600 transition-all duration-300 shrink-0 shadow-xs">
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </Link>
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

    </div>
  );
};

export default ServicesPage;
