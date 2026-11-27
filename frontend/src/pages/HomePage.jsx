import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HomeDoctorHero } from '../components/home/HomeDoctorHero';
import { HomeCarouselSection } from '../components/home/HomeCarouselSection';
import { HomeIntroSection } from '../components/home/HomeIntroSection';
import { HomeCashlessTrustStrip } from '../components/home/HomeCashlessTrustStrip';
import { HomeLocationsHighlight } from '../components/home/HomeLocationsHighlight';
import { HomeBlogsHighlight } from '../components/home/HomeBlogsHighlight';
import { DoctorVideoModal } from '../components/home/DoctorVideoModal';
import { HorizontalMarquee } from '../components/motion/HorizontalMarquee';
import { ScrollSplitTypography } from '../components/motion/ScrollSplitTypography';
import { Footer } from '../components/layout/Footer';

/**
 * 🏥 KHETAN HOSPITAL — COMPLETE HOMEPAGE REDESIGN
 * Inspired by Polpharma Biologics (Awwwards SOTD by Widelab)
 * 
 * Scene 0: Scroll-responsive ambient atmosphere & subtle technical grid
 * Scene 1: Cinematic Doctor Hero (Editorial cover, scroll-linked depth)
 * Scene 2: Continuous clinical excellence marquee ticker
 * Scene 3: Surgical services interactive stage (Visual composition + 3D circular enhancement)
 * Scene 4: Kinetic scroll-linked typography assembly
 * Scene 5: Connected Doctors experience (3 Parts: Meet Doctors, Clinical Expertise, Free Knee Camp)
 * Scene 6: Cashless mediclaim & TPA trust section
 * Scene 7: Purvanchal consultation network (Interactive geographic experience)
 * Scene 8: Patient recovery & joint health guides (Editorial magazine rhythm)
 * Scene 9: Calm, verified hospital footer
 */
export const HomePage = ({ onBookClick }) => {
  const containerRef = useRef(null);
  const footerRef = useRef(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeReelIndex, setActiveReelIndex] = useState(0);

  // Global scroll progression for subtle ambient lighting modulation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Soft ambient light translation across the full page scroll journey
  const cyanY = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '35%', '80%']);
  const tealY = useTransform(scrollYProgress, [0, 0.5, 1], ['20%', '55%', '90%']);
  const indigoY = useTransform(scrollYProgress, [0, 0.5, 1], ['40%', '75%', '95%']);
  const ambientIntensity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.18, 0.12, 0.16, 0.12]);

  const openVideoModal = (index = 0) => {
    setActiveReelIndex(index);
    setIsVideoModalOpen(true);
  };

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToIntro = () => {
    document.getElementById('hospital-intro')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#030712] text-[#F8FAFC] select-none overflow-x-hidden min-h-screen selection:bg-cyan-500 selection:text-black font-sans"
    >
      {/* ═══════════════════════════════════════════════════════════════
          SCENE 0: SCROLL-RESPONSIVE AMBIENT VISUAL ENVIRONMENT
      ═══════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Cyan Ambient Field (Tracks upper scenes) */}
        <motion.div
          style={{ top: cyanY, opacity: ambientIntensity }}
          animate={{
            x: [0, 35, -25, 0],
            scale: [1, 1.12, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-1/4 w-[550px] h-[550px] rounded-full bg-[#38BDF8] blur-[160px]"
        />

        {/* Teal Ambient Field (Tracks mid scenes) */}
        <motion.div
          style={{ top: tealY, opacity: ambientIntensity }}
          animate={{
            x: [0, -30, 35, 0],
            scale: [1, 1.15, 0.92, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/6 w-[480px] h-[480px] rounded-full bg-[#10B981] blur-[150px]"
        />

        {/* Indigo Ambient Field (Tracks lower scenes) */}
        <motion.div
          style={{ top: indigoY, opacity: ambientIntensity }}
          animate={{
            x: [0, 25, -35, 0],
            scale: [1, 1.18, 0.9, 1],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-1/3 w-[580px] h-[580px] rounded-full bg-[#6366F1] blur-[170px]"
        />

        {/* Restrained Technical Micro-Dot Grid */}
        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="relative z-10">
        {/* SCENE 1: CINEMATIC DOCTOR HERO */}
        <HomeDoctorHero
          onBookClick={onBookClick}
          onWatchReelsClick={() => openVideoModal(0)}
        />

        {/* SCENE 2: CONTINUOUS CLINICAL EXCELLENCE MARQUEE */}
        <HorizontalMarquee
          words={[
            "SUB-MILLIMETER ROBOTIC PRECISION",
            "UK ROYAL COLLEGE GOVERNANCE",
            "RAPID MOBILITY IN 24 HOURS",
            "ARTHROSCOPIC SPORTS RESTORATION",
            "SAME-DAY DISCHARGE PROTOCOL",
            "COMPREHENSIVE TRAUMA CARE"
          ]}
          theme="dark"
          direction="normal"
          className="border-y border-white/10 bg-[#051329]/80 backdrop-blur-md text-cyan-300"
        />

        {/* SCENE 3: SURGICAL SERVICES INTERACTIVE STAGE */}
        <HomeCarouselSection onNextClick={scrollToIntro} />

        {/* SCENE 4: KINETIC SCROLL-LINKED SPLIT TYPOGRAPHY */}
        <ScrollSplitTypography
          badge="( PURVANCHAL ROBOTIC STANDARDS • UK GOVERNED )"
          line1={["SUB-MILLIMETER", "ROBOTIC", "PRECISION"]}
          line2={["UK", "ROYAL", "COLLEGE", "RIGOR"]}
          line3={["MOBILITY", "WITHIN", "24", "HOURS"]}
          caption="Bringing world-class sub-millimeter joint reconstruction, arthroscopy, and sports medicine directly to Gorakhpur and Eastern Uttar Pradesh."
        />

        {/* SCENE 5: THE CONNECTED DOCTORS EXPERIENCE (3 PARTS) */}
        <HomeIntroSection
          onBookClick={onBookClick}
          onNextClick={scrollToFooter}
          onExpandModal={(idx) => openVideoModal(idx)}
        />

        {/* SCENE 6: CASHLESS MEDICLAIM & TPA TRUST STRIP */}
        <HomeCashlessTrustStrip />

        {/* SCENE 7: HOSPITAL & REGIONAL OUTREACH NETWORK */}
        <HomeLocationsHighlight onBookClick={onBookClick} />

        {/* SCENE 8: PATIENT RECOVERY & JOINT HEALTH GUIDES */}
        <HomeBlogsHighlight />

        {/* SCENE 9: COMPREHENSIVE HOSPITAL FOOTER */}
        <Footer ref={footerRef} onBookClick={onBookClick} />

        {/* FULLSCREEN DOCTOR REEL / VIDEO MODAL */}
        <DoctorVideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          initialIndex={activeReelIndex}
        />
      </div>
    </div>
  );
};

export default HomePage;
