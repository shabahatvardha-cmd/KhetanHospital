import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  Sparkles,
  Activity,
  ArrowRight,
  FileText,
  ExternalLink,
  Calendar,
  Stethoscope,
  Plus,
  X
} from 'lucide-react';
import { publishedPapers, clinicInfo } from '../data/clinicContent';
import { doctorImages } from '../data/imageConfig';
import { KineticDualTitle } from '../components/motion/KineticDualTitle';

/**
 * 🏥 PUBLISHED RESEARCH PAPERS PAGE
 * Re-imagined in the Swiss/Editorial Visual Standard System (inspired by video):
 * - Technical Standard Specification Cards (DSTU 4512:2006 archival style)
 * - Layered Display Typography framing the content
 * - Conversational Chat-Bubble FAQ Accordions ("WHAT TO DO IF... 🧐" style with + to ✕ toggle)
 * - Monolithic Saturated Cobalt Closing Banner with circular crest and golden pill CTA
 */
export const PublishedPapersPage = ({ onBookClick }) => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "Why does surgical research matter for everyday joint replacement patients?",
      a: "Surgeons who actively conduct and publish peer-reviewed clinical research strictly adhere to global evidence-based standards. It ensures that surgical choices—such as cementless implants, tranexamic acid bleeding control, and anatomical ligament reconstruction—are scientifically proven to deliver better longevity and faster recovery."
    },
    {
      q: "What is the key clinical breakthrough in the 2024 Bone & Joint Open knee study?",
      a: "Dr. Vatsal Khetan's co-authored series of 454 total knee replacements proved that trabecular metal cementless implants provide superior biological bone ingrowth and significantly lower rates of aseptic loosening in young, active patients compared to traditional cemented implants."
    },
    {
      q: "What is the 'J Arch' landmark in ACL surgery developed by Dr. Khetan?",
      a: "The 'J Arch' is an intra-articular anatomical soft-tissue landmark published in the Journal of Arthroscopic Surgery & Sports Medicine. It guides surgeons to position the ACL femoral tunnel with extreme anatomical accuracy while preserving native tissue remnants, restoring natural joint kinematics."
    },
    {
      q: "Where can doctors and patients read the full published manuscripts?",
      a: "All 10 published research papers are indexed on Google Scholar, PubMed, and respective international orthopedic journal repositories. Direct links are provided on each official specification card below."
    }
  ];

  // Paper standard reference codes matching the video's DSTU 4512:2006 style
  const paperStandardCodes = [
    { code: "SPEC: BJO-454-2024", tag: "CEMENTLESS KNEE BENCHMARK" },
    { code: "SPEC: ACTA-TXA-2021", tag: "HEMOSTASIS PROTOCOL" },
    { code: "SPEC: ACTA-MENISCUS-2022", tag: "SPORTS PRESERVATION" },
    { code: "SPEC: JASSM-MPFL-2021", tag: "PATELLAR STABILIZATION" },
    { code: "SPEC: JASSM-JARCH-2022", tag: "ANATOMIC ACL LANDMARK" },
    { code: "SPEC: JOST-SALVAGE-2022", tag: "COMPLEX FEMUR SALVAGE" },
    { code: "SPEC: JASSM-ITBAND-2021", tag: "SPORTS AVULSION" },
    { code: "SPEC: IJO-TXA100-2021", tag: "PROSPECTIVE KNEE TRIAL" },
    { code: "SPEC: NJOT-CALC-2019", tag: "TRAUMA FIXATION" },
    { code: "SPEC: CTS-TIBIA-2018", tag: "FRACTURE EPIDEMIOLOGY" }
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
                primaryText="SCIENTIFIC RIGOR"
                secondaryText="10 PAPERS"
              />

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight pt-1">
                Published Peer-Reviewed Research in World Orthopaedics
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light max-w-xl">
                Every clinical protocol at Khetan Hospital is anchored in international scientific evidence. Co-authored by Dr. Vatsal Khetan across premier UK and European orthopedic journals, advancing cementless joint fixation, ligament preservation, and blood management.
              </p>

              {/* Action Trigger Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onBookClick}
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#08284d] hover:bg-[#0284c7] shadow-md transition-all cursor-pointer"
                >
                  Book Priority Consultation
                </button>

                <a
                  href="https://scholar.google.co.in/citations?user=44RIVEQAAAAJ&hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-xs font-mono font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <span>Google Scholar Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

            {/* Right Column: Video-Style Author Quote Chip & Official Specification Card */}
            <div className="lg:col-span-5 space-y-4">

              {/* Author Provenance Chip with Avatar */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                <img
                  src={doctorImages.portrait}
                  alt="Dr. Vatsal Khetan"
                  className="w-12 h-12 rounded-xl object-cover object-top border border-white shadow-xs shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#0284c7] block">
                    CLINICAL ARCHIVE RECORD &bull; 2018–2024
                  </span>
                  <p className="text-xs text-slate-700 italic font-medium leading-snug">
                    "Every joint decision is rooted in published biomechanical validation."
                  </p>
                  <span className="text-[10px] font-bold text-slate-900 block mt-0.5">
                    — Dr. Vatsal Khetan (M.Ch UK, FRCS Edinburgh)
                  </span>
                </div>
              </div>

              {/* Master Standard Specification Card (DSTU 4512:2006 style from video) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border-l-4 border-l-[#f59e0b] border border-amber-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-[#08284d] tracking-wider uppercase">
                    CLINICAL SPECIFICATION : 2024
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#f59e0b] text-[#08284d]">
                    VERIFIED EVIDENCE
                  </span>
                </div>
                <h2 className="text-sm font-extrabold text-slate-900 leading-tight">
                  Khetan Hospital Evidence-Based Orthopaedic Care Standard
                </h2>
                <p className="text-[11px] text-slate-600 font-mono leading-relaxed">
                  Published in Bone &amp; Joint Open (UK), Acta Orthopaedica Belgica &amp; JASSM. Enforcing sub-millimeter robotic precision cutting, trabecular tantalum ingrowth, and multimodal tranexamic acid blood conservation.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: COMPLETE 10 RESEARCH PAPERS AS OFFICIAL SPEC CARDS
          (Exact DSTU 4512:2006 visual standard: Standard ID Tag + Yellow Notch + Metadata)
      ────────────────────────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-8">

        {/* Giant Kinetic Wordmark Layered in Background like "BEAUTIFUL" in video */}
        <div className="relative mb-8">
          <div className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-slate-200/50 select-none tracking-tight">
            EVIDENCE-BASED
          </div>
          <div className="relative -mt-6 sm:-mt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Official Clinical Publications Archive
            </h2>
          </div>
        </div>

        {/* 10 Papers List — Each Styled as a Video-Inspired Technical Specification Card */}
        <div className="space-y-5">
          {publishedPapers.map((paper, idx) => {
            const spec = paperStandardCodes[idx] || { code: `SPEC: KHETAN-REF-${idx + 1}`, tag: "SURGICAL STUDY" };
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 p-5 sm:p-7 space-y-3 group overflow-hidden border-l-4 border-l-[#f59e0b]"
              >
                {/* Standard ID Bar matching the video's DSTU 4512:2006 tag */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="px-2 py-0.5 rounded text-[11px] font-black bg-[#08284d] text-white">
                      {spec.code}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {spec.tag}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80">
                    {paper.citations}
                  </span>
                </div>

                {/* Title & Institutional Authors */}
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug group-hover:text-[#0284c7] transition-colors tracking-tight">
                    {paper.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs text-slate-600 font-extrabold tracking-tight">
                    <span><strong>Journal:</strong> {paper.journal} ({paper.year})</span>
                    {paper.volume && <span>&bull; {paper.volume}</span>}
                    <span>&bull; <strong>Authors:</strong> {paper.authors}</span>
                  </div>
                </div>

                {/* Abstract Text Container */}
                <p className="text-xs font-extrabold tracking-tight text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {paper.summary}
                </p>

                {/* Direct Google Scholar Manuscript Action Link */}
                {paper.link && (
                  <div className="pt-1 flex items-center justify-between">
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#08284d] hover:text-[#0284c7] transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                    >
                      <span>Read Publication Manuscript on Google Scholar</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0284c7]" />
                    </a>

                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline-block">
                      UK &bull; Europe &bull; India
                    </span>
                  </div>
                )}
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
            <span>WHAT TO ASK ABOUT RESEARCH...</span>
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
                EVIDENCE-BASED ORTHOPAEDICS ONLY
              </h2>
              <p className="text-xs text-slate-300 font-light max-w-lg">
                10 international peer-reviewed papers translating directly into safer, faster recovery for patients across Purvanchal.
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

export default PublishedPapersPage;
