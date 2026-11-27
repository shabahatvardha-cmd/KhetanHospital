import React, { useRef, useState } from 'react';
import { HomeDoctorHero } from '../components/home/HomeDoctorHero';
import { HomeCarouselSection } from '../components/home/HomeCarouselSection';
import { HomeIntroSection } from '../components/home/HomeIntroSection';
import { DoctorVideoModal } from '../components/home/DoctorVideoModal';
import { HorizontalMarquee } from '../components/motion/HorizontalMarquee';
import { ScrollSplitTypography } from '../components/motion/ScrollSplitTypography';
import { Footer } from '../components/layout/Footer';

/**
 * 🏥 KHETAN HOSPITAL — MASTER HOMEPAGE FLOW (Polpharma Biologics Inspired Redesign)
 * 
 * 1. Screen 1: Doctor-Focused Hero (Dr. Vatsal Khetan, oversized typography, sequential word reveal)
 * 2. Precision Marquee Ticker: Continuous clinical excellence statements
 * 3. Screen 2: Interactive 3D Circular Surgical Carousel (6 destinations)
 * 4. Kinetic Scroll-Linked Typography: Sub-millimeter robotic precision statement assembly
 * 5. Screen 3: Hospital Overview & Instagram Video Stories (Shutter Slide 1, animated headline, live Reels)
 * 6. Screen 4: Comprehensive Hospital Footer (Shutter Slide 2, sticky z-20)
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
    <div className="relative w-full bg-white text-slate-900 select-none">
      {/* 1. DOCTOR HERO (Screen 1 with animated editorial typography & credentials) */}
      <HomeDoctorHero
        onBookClick={onBookClick}
        onWatchReelsClick={() => openVideoModal(0)}
      />

      {/* 2. POLPHARMA-STYLE CONTINUOUS CLINICAL EXCELLENCE MARQUEE */}
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
        className="border-y border-[#08284d]/20 bg-[#08284d]"
      />

      {/* 3. INTERACTIVE 3D SURGICAL SERVICES CAROUSEL (Screen 2) */}
      <HomeCarouselSection onNextClick={scrollToIntro} />

      {/* 4. KINETIC SCROLL-LINKED SPLIT TYPOGRAPHY (Polpharma Technique) */}
      <ScrollSplitTypography
        line1={["SUB-MILLIMETER", "ROBOTIC", "PRECISION"]}
        line2={["UK", "ROYAL", "COLLEGE", "RIGOR"]}
        line3={["MOBILITY", "WITHIN", "24", "HOURS"]}
        caption="Bringing world-class sub-millimeter joint reconstruction, arthroscopy, and sports medicine directly to Gorakhpur and Eastern Uttar Pradesh."
      />

      {/* 5. HOSPITAL OVERVIEW & LIVE DOCTOR INSTAGRAM REELS (Screen 3) */}
      <HomeIntroSection
        onNextClick={scrollToFooter}
        onExpandModal={(idx) => openVideoModal(idx)}
      />

      {/* 6. COMPREHENSIVE HOSPITAL FOOTER (Screen 4) */}
      <Footer ref={footerRef} onBookClick={onBookClick} />

      {/* 7. FULLSCREEN HIGH-RES DOCTOR REEL MODAL */}
      <DoctorVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        initialIndex={activeReelIndex}
      />
    </div>
  );
};

export default HomePage;
