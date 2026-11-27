import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  X
} from 'lucide-react';
import { memorableMoments, clinicInfo } from '../data/clinicContent';
import { doctorImages } from '../data/imageConfig';
import { KineticDualTitle } from '../components/motion/KineticDualTitle';

/**
 * 🏥 MEMORABLE MOMENTS & UK TRAINING PAGE
 * Re-imagined in the Swiss/Editorial Visual Standard System (inspired by video):
 * - Technical Milestone Specification Cards (DSTU 4512:2006 archival style)
 * - Layered Display Typography framing the content
 * - Conversational Chat-Bubble FAQ Accordions ("WHAT TO DO IF... 🧐" style with + to ✕ toggle)
 * - Monolithic Saturated Cobalt Closing Banner with circular crest and golden pill CTA
 */
export const MemorableMomentsPage = ({ onBookClick }) => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "What is the clinical significance of Wrightington Hospital training?",
      a: "Wrightington Hospital in Lancashire, UK, is universally recognized as the birthplace of modern hip arthroplasty, pioneered by Sir John Charnley. Training at Wrightington embeds strict sterile surgical technique, precise biomechanical implant positioning, and lifetime joint durability protocols."
    },
    {
      q: "How does NHS robotic training improve surgical outcomes in Gorakhpur?",
      a: "NHS surgical robotic protocols from Newcastle upon Tyne enforce sub-millimeter precision cutting envelopes (0.5 mm tolerance). This eliminates human angular deviation, spares soft-tissue ligaments, and accelerates 24-hour patient ambulation."
    },
    {
      q: "Does Dr. Vatsal Khetan treat international and national athletes?",
      a: "Yes. Dr. Khetan holds an International Olympic Committee (IOC) Diploma in Sports Medicine from Switzerland and has provided clinical consultations and joint rehabilitation for elite Indian athletes including cricketer Yashasvi Jaiswal and Olympic hockey star Vandana Katariya."
    },
    {
      q: "How can patients from Gorakhpur access these advanced surgical protocols?",
      a: "All advanced NHS-grade protocols—including laminar airflow sterility, computer-calibrated implant balance, and rapid-recovery analgesia—are standard practice for every patient operated on at Khetan Hospital."
    }
  ];

  // Milestone standard reference codes matching the video's DSTU 4512:2006 style
  const milestoneCodes = [
    { code: "SPEC: UK-WRIGHTINGTON", tag: "CENTRE OF EXCELLENCE" },
    { code: "SPEC: UK-HTO-BIRMINGHAM", tag: "FACULTY APPOINTMENT" },
    { code: "SPEC: UK-NHS-ROTHERHAM", tag: "REVISION ARTHROPLASTY" },
    { code: "SPEC: STATE-GOV-HONOR", tag: "STATE RECOGNITION" },
    { code: "SPEC: CRICKET-JAISWAL", tag: "ELITE ATHLETE CARE" },
    { code: "SPEC: OLYMPIC-KATARIYA", tag: "OLYMPIAN SPORTS REHAB" },
    { code: "SPEC: PEDIATRIC-PARIKH", tag: "PEDIATRIC KNEE PRESERVATION" },
    { code: "SPEC: UK-ARTHRO-ANDERSON", tag: "CEMENTLESS ARTHROPLASTY" },
    { code: "SPEC: SHOULDER-DRAVIARAJ", tag: "KEYHOLE RECONSTRUCTION" },
    { code: "SPEC: HIP-SALVAGE-GARNETI", tag: "COMPLEX HIP SALVAGE" },
    { code: "SPEC: KNEE-LEGG-SAHINI", tag: "SURGICAL NAVIGATION" },
    { code: "SPEC: SPORTSMED-MUMBAI", tag: "LIGAMENT FELLOWSHIP" }
  ];

  return (
    <div className="relative w-full bg-[#fbfbfd] text-slate-900 select-none overflow-hidden">

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: EDITORIAL HEADER & OFFICIAL SPECIFICATION HERO
          (Inspired by video: Dual Box Title + Author Quote Chip + DSTU 4512 Spec Card)
      ────────────────────────────────────────────────────────────── */}
      <section className="relative w-full border-b border-slate-200/90 pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Video-Style Dual-Box Inverted Headline & Author Provenance Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">

            {/* Left Column: Bold Dual-Box Lockup */}
            <div className="lg:col-span-7 space-y-3">
              {/* Bold Opposing Kinetic Dual Box Title */}
              <KineticDualTitle
                primaryText="CAREER TIMELINE"
                secondaryText="UK FELLOWSHIPS"
              />

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight pt-1">
                International Mentorship, NHS Centres &amp; Athletic Care
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light max-w-xl">
                An illustrious surgical trajectory spanning world-renowned orthopaedic centres in the United Kingdom, Olympic sports medicine institutes in Switzerland, and national athletic care in India. Every milestone represents a direct clinical standard now available to patients in Gorakhpur.
              </p>

              {/* Action Trigger Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onBookClick}
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#08284d] hover:bg-[#0284c7] shadow-md transition-all cursor-pointer"
                >
                  Book Priority Consultation
                </button>

                <button
                  onClick={() => {
                    navigate('/published-papers');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-xs font-mono font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <span>Explore Research Papers</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Right Column: Video-Style Author Quote Chip & Official Specification Card */}
            <div className="lg:col-span-5 space-y-4">

              {/* Author Provenance Chip with Avatar */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                <img
                  src={doctorImages.fellowship}
                  alt="Dr. Vatsal Khetan UK Robotics Fellowship"
                  className="w-12 h-12 rounded-xl object-cover object-center border border-white shadow-xs shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#0284c7] block">
                    NHS TRAINING RECORD &bull; UK &amp; SWITZERLAND
                  </span>
                  <p className="text-xs text-slate-700 italic font-medium leading-snug">
                    "Bringing world-class British surgical governance directly to our home in Gorakhpur."
                  </p>
                  <span className="text-[10px] font-bold text-slate-900 block mt-0.5">
                    — Dr. Vatsal Khetan (FRCS Edinburgh, M.Ch Knee UK)
                  </span>
                </div>
              </div>

              {/* Master Standard Specification Card (DSTU 4512:2006 style from video) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border-l-4 border-l-[#f59e0b] border border-amber-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-[#08284d] tracking-wider uppercase">
                    GOVERNANCE STANDARD : UK-NHS
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#f59e0b] text-[#08284d]">
                    FELLOWSHIP AUDITED
                  </span>
                </div>
                <h2 className="text-sm font-extrabold text-slate-900 leading-tight">
                  Wrightington Hospital &amp; Newcastle NHS Robotics Protocol
                </h2>
                <p className="text-[11px] text-slate-600 font-mono leading-relaxed">
                  Trained at the historic global birthplace of hip replacement (Wrightington) and advanced NHS computer-assisted joint navigation (Newcastle upon Tyne). IOC Diploma in Sports Medicine, Lausanne, Switzerland.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: COMPLETE 13 MILESTONES AS OFFICIAL SPEC CARDS
          (Exact DSTU 4512:2006 visual standard: Standard ID Tag + Yellow Notch + Metadata)
      ────────────────────────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-8">

        {/* Giant Kinetic Wordmark Layered in Background like "BEAUTIFUL" in video */}
        <div className="relative mb-8">
          <div className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-slate-200/50 select-none tracking-tight">
            MILESTONES
          </div>
          <div className="relative -mt-6 sm:-mt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Complete Career &amp; Fellowship Archive
            </h2>
          </div>
        </div>

        {/* 13 Milestones Grid — Each Styled as a Video-Inspired Technical Specification Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {memorableMoments.map((item, idx) => {
            const spec = milestoneCodes[idx] || { code: `SPEC: KHETAN-M-${idx + 1}`, tag: "CLINICAL MILESTONE" };
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 p-5 sm:p-6 space-y-3 group overflow-hidden border-l-4 border-l-[#f59e0b] flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  {/* Standard ID Bar matching the video's DSTU 4512:2006 tag */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-[#08284d] text-white">
                      {spec.code}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Year Tag & Title */}
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/80 inline-block mb-1.5">
                      {item.year}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-[#0284c7] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Descriptive Body */}
                  <p className="text-xs text-slate-600 leading-relaxed font-light bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {item.desc}
                  </p>
                </div>

                {/* Card Bottom Marker */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" />
                    <span>Verified Milestone</span>
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                    RECORDED
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: CONVERSATIONAL SPEECH-BUBBLE FAQ ACCORDION
          (Exact "WHAT TO DO IF... 🧐" style from the video with + to ✕ toggle)
      ────────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-6">

        {/* Video-Style Conversational Header with Emoji */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
            <span>WHAT TO ASK ABOUT TRAINING...</span>
            <span className="text-2xl select-none">🧐</span>
          </h2>
        </div>

        {/* Speech-Bubble / Chat Capsule Rows with smooth + to ✕ toggle */}
        <div className="space-y-3.5 pt-2">
          {faqs.map((faq, fIdx) => {
            const isOpen = openFaq === fIdx;
            return (
              <div
                key={fIdx}
                className={`relative rounded-3xl transition-all duration-200 overflow-hidden ${isOpen
                  ? 'bg-white border-2 border-[#08284d] shadow-md'
                  : 'bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300'
                  }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 pr-4">
                    {faq.q}
                  </span>

                  {/* Micro-interaction toggle: + turns into ✕ when open (just like video) */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'bg-[#08284d] text-white rotate-90' : 'bg-slate-100 text-slate-600'
                    }`}>
                    {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 pt-0 text-xs text-slate-600 leading-relaxed font-light border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: MONOLITHIC SATURATED COBALT CLOSING BANNER
          (Exact visual style of video's 00:11–00:17: "UKRAINIAN FLAG ONLY"
          with circular embossed seal and golden pill button)
      ────────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#08284d] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-black/20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">

          {/* Left: Circular Hospital Seal & Headline */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            {/* Circular Embossed Seal matching video's trident circle */}
            <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center shrink-0 shadow-inner bg-white/5">
              <div className="w-11 h-11 rounded-full border border-white/60 flex items-center justify-center text-white font-black text-xs">
                KH
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                INTERNATIONAL SURGICAL STANDARDS ONLY
              </h2>
              <p className="text-xs text-slate-300 font-light max-w-lg">
                Direct UK NHS fellowships, Olympic sports medicine credentials, and world-class joint care available right in Gorakhpur.
              </p>
            </div>
          </div>

          {/* Right: Golden Pill Call to Action Button matching video's "GLORY TO UKRAINE" */}
          <div className="shrink-0">
            <button
              onClick={onBookClick}
              className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-[#f59e0b] hover:bg-[#d97706] text-[#08284d] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Book Priority Consultation &rarr;
            </button>
          </div>

        </div>

        {/* Minimal White Bottom Divider Line from video */}
        <div className="max-w-5xl mx-auto mt-10 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
          <span>Khetan Hospital &bull; Vikas Nagar, Bargadawa, Gorakhpur</span>
          <span>Royal College of Surgeons (Edinburgh) Governance</span>
        </div>
      </section>

    </div>
  );
};

export default MemorableMomentsPage;
