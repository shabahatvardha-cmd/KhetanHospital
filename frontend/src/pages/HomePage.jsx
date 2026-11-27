import React, { useRef, useState } from 'react';
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
 * 🏥 KHETAN HOSPITAL — MASTER HOMEPAGE FLOW (POLPHARMA BIOLOGICS THEME)
 * 
 * Deep midnight biotech canvas, frosted glassmorphism, glowing cyan/teal auras,
 * high-contrast Swiss statement typography, and authentic hospital leadership.
 */
export const HomePage = ({ onBookClick }) => {
  const footerRef = useRef(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeReelIndex, setActiveReelIndex] = useState(0);

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
    <div className="relative w-full bg-[#030712] text-white select-none overflow-x-hidden min-h-screen selection:bg-cyan-500 selection:text-black">
      {/* Polpharma-Style Fixed Ambient Atmospheric Glow Nodes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[160px]" />
        <div className="absolute top-1/3 left-1/6 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[650px] h-[650px] rounded-full bg-indigo-600/10 blur-[180px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="relative z-10">
        {/* 1. DOCTOR HERO (Polpharma Biotech Hero with Laser Telemetry & Statement Typography) */}
        <HomeDoctorHero
          onBookClick={onBookClick}
          onWatchReelsClick={() => openVideoModal(0)}
        />

        {/* 2. POLPHARMA CONTINUOUS CLINICAL EXCELLENCE MARQUEE TICKER */}
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

        {/* 3. INTERACTIVE 3D SURGICAL SERVICES CAROUSEL */}
        <HomeCarouselSection onNextClick={scrollToIntro} />

        {/* 4. KINETIC SCROLL-LINKED SPLIT TYPOGRAPHY */}
        <ScrollSplitTypography
          badge="( PURVANCHAL ROBOTIC STANDARDS • UK GOVERNED )"
          line1={["SUB-MILLIMETER", "ROBOTIC", "PRECISION"]}
          line2={["UK", "ROYAL", "COLLEGE", "RIGOR"]}
          line3={["MOBILITY", "WITHIN", "24", "HOURS"]}
          caption="Bringing world-class sub-millimeter joint reconstruction, arthroscopy, and sports medicine directly to Gorakhpur and Eastern Uttar Pradesh."
        />

        {/* 5. 3-PART DOCTORS SECTION (Meet Doctors, Clinical Expertise, Monthly Free Knee Camp) */}
        <HomeIntroSection
          onBookClick={onBookClick}
          onNextClick={scrollToFooter}
          onExpandModal={(idx) => openVideoModal(idx)}
        />

        {/* 6. 100% CASHLESS HEALTH INSURANCE & TPA TRUST STRIP */}
        <HomeCashlessTrustStrip />

        {/* 7. HOSPITAL & REGIONAL OUTREACH NETWORK */}
        <HomeLocationsHighlight onBookClick={onBookClick} />

        {/* 8. PATIENT RECOVERY & JOINT HEALTH GUIDES */}
        <HomeBlogsHighlight />

        {/* 9. COMPREHENSIVE HOSPITAL FOOTER */}
        <Footer ref={footerRef} onBookClick={onBookClick} />

        {/* 10. FULLSCREEN HIGH-RES DOCTOR REEL MODAL */}
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
