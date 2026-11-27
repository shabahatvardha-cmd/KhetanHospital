import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HomeDoctorHero } from '../components/home/HomeDoctorHero';
import { HomeCarouselSection } from '../components/home/HomeCarouselSection';
import { HomeIntroSection } from '../components/home/HomeIntroSection';
import { HomeLocationsHighlight } from '../components/home/HomeLocationsHighlight';
import { HomeBlogsHighlight } from '../components/home/HomeBlogsHighlight';
import { DoctorVideoModal } from '../components/home/DoctorVideoModal';
import { HorizontalMarquee } from '../components/motion/HorizontalMarquee';
import { ScrollSplitTypography } from '../components/motion/ScrollSplitTypography';
import { Footer } from '../components/layout/Footer';

/**
 * 🏥 KHETAN HOSPITAL — MASTER HOMEPAGE FLOW
 * 
 * 1. Screen 1: Doctor-Focused Hero (Dr. Vatsal Khetan, FRCS Edinburgh, Doctor's Introduction)
 * 2. Precision Marquee Ticker: Continuous clinical excellence statements
 * 3. Screen 2: Interactive 3D Circular Surgical Carousel (6 surgical destinations)
 * 4. Kinetic Scroll-Linked Typography: Sub-millimeter robotic precision statement assembly
 * 5. Screen 3: Hospital Overview & Instagram Video Stories (Live compact Reels & 3 clinical pillars)
 * 6. Section 4: 100% Cashless Hospitalization & TPA Network Trust Strip
 * 7. Section 5: Hospital & Regional Outreach Centres (Gorakhpur, Deoria, Basti, Padrauna)
 * 8. Section 6: Patient Recovery & Joint Health Guides (Covered by Shutter Footer)
 * 9. Comprehensive Full-Screen Hospital Shutter Footer (Covers everything on scroll)
 */
export const HomePage = ({ onBookClick }) => {
  const footerRef = useRef(null);
  const shutterContainerRef = useRef(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeReelIndex, setActiveReelIndex] = useState(0);

  // Shutter scroll tracking: controls the depth recessing of blogs as shutter footer rises over it
  const { scrollYProgress: shutterScroll } = useScroll({
    target: shutterContainerRef,
    offset: ['start start', 'end end'],
  });

  const blogsScale = useTransform(shutterScroll, [0, 0.75], [1, 0.94]);
  const blogsOpacity = useTransform(shutterScroll, [0, 0.75], [1, 0.4]);
  const blogsY = useTransform(shutterScroll, [0, 0.75], [0, -35]);

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

      {/* 5. CLINICAL OVERVIEW, EXPERTISE, FREE KNEE CAMP & CASHLESS TRUST */}
      <HomeIntroSection
        onNextClick={scrollToFooter}
        onExpandModal={(idx) => openVideoModal(idx)}
      />

      {/* 6. HOSPITAL & REGIONAL OUTREACH NETWORK (Gorakhpur, Deoria, Basti, Padrauna) */}
      <HomeLocationsHighlight onBookClick={onBookClick} />

      {/* 8. PATIENT GUIDES COVERED BY SHUTTER FOOTER */}
      <div ref={shutterContainerRef} className="relative w-full">
        {/* Sticky Blogs Stage: Stays in viewport as shutter footer rises over it */}
        <div className="sticky top-0 z-10 w-full min-h-screen flex flex-col justify-center bg-white overflow-hidden">
          <motion.div
            style={{
              scale: blogsScale,
              opacity: blogsOpacity,
              y: blogsY,
              transformOrigin: 'center center',
            }}
            className="w-full will-change-transform"
          >
            <HomeBlogsHighlight />
          </motion.div>
        </div>

        {/* Shutter Footer: Heavy physical curtain rising from bottom and covering everything */}
        <div className="relative z-20 w-full">
          <Footer ref={footerRef} isShutter={true} onBookClick={onBookClick} />
        </div>
      </div>

      {/* 10. FULLSCREEN HIGH-RES DOCTOR REEL MODAL */}
      <DoctorVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        initialIndex={activeReelIndex}
      />
    </div>
  );
};

export default HomePage;
