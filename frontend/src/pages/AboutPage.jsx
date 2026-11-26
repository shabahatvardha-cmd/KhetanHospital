import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Star
} from 'lucide-react';
import { clinicInfo } from '../data/clinicContent';
import { doctorImages } from '../data/imageConfig';
import { KineticDualTitle } from '../components/motion/KineticDualTitle';

/**
 * 🏥 DR. VATSAL KHETAN — SURGEON PROFILE PAGE
 * Re-imagined in the Swiss/Editorial Visual Standard System (inspired by video):
 * - Technical Standard Specification Cards (DSTU 4512:2006 archival style)
 * - Layered Display Typography framing the content
 * - Conversational Chat-Bubble FAQ Accordions ("WHAT TO DO IF... 🧐" style with + to ✕ toggle)
 * - Monolithic Saturated Cobalt Closing Banner with circular crest and golden pill CTA
 */
export const AboutPage = ({ onBookClick }) => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "What is Dr. Vatsal Khetan's surgical background and UK credentials?",
      a: "Dr. Vatsal Khetan is a Fellow of the Royal College of Surgeons of Edinburgh (FRCS), holds an M.Ch in Knee Surgery from the UK, and has completed advanced surgical fellowships at Wrightington Hospital (historic world birthplace of hip replacement) and The Newcastle upon Tyne NHS Trust (Robotics & AI). He also holds an IOC Diploma in Sports Medicine from Switzerland."
    },
    {
      q: "How can I book a direct consultation with Dr. Vatsal Khetan?",
      a: "Consultations can be booked directly online via our priority booking portal, through WhatsApp (+91 96623 65917), or by visiting Khetan Hospital, Bargadawa, Gorakhpur. Morning OPD runs from 10:30 AM to 02:00 PM and Evening OPD from 05:00 PM to 08:00 PM."
    },
    {
      q: "Does Dr. Vatsal Khetan provide second opinions for joint replacement surgeries?",
      a: "Yes. Many patients visit for expert second opinions regarding whether their joint can be preserved with biological treatments or partial resurfacing before deciding on total replacement surgery."
    },
    {
      q: "What surgical techniques are used to ensure fast 24-hour walking?",
      a: "Dr. Khetan utilizes sub-millimeter robotic navigation for bone preservation, muscle-sparing tissue intervals, and multimodal local infiltration analgesia (LIA), allowing 90%+ of patients to stand and take assisted steps on Day 1."
    }
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
                primaryText="DR. VATSAL KHETAN"
                secondaryText="FRCS (EDIN)"
              />

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight pt-1">
                Founder &amp; Chief Orthopaedic Robotic Surgeon
              </h1>

              {/* Credential Badges Row */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
                <span className="px-2.5 py-1 rounded-lg bg-[#08284d] text-white text-[10px] sm:text-[11px] font-mono font-bold tracking-wide shadow-2xs">
                  🇬🇧 FRCS (Edinburgh)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200/80 text-sky-900 text-[10px] sm:text-[11px] font-mono font-bold tracking-wide">
                  M.Ch Knee (UK)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-[10px] sm:text-[11px] font-mono font-bold tracking-wide">
                  🇨🇭 IOC Dip Sports Med
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80 text-slate-700 text-[10px] sm:text-[11px] font-mono font-semibold">
                  MS (Ortho) &bull; MBBS
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light max-w-xl pt-1">
                Bringing UK Royal College surgical governance, sub-millimeter robotic precision, and dedicated arthroscopic sports rehabilitation directly to Gorakhpur and Eastern Uttar Pradesh. Trained across Wrightington Hospital and Newcastle upon Tyne Hospitals NHS Trust.
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
                    navigate('/memorable-moments');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-xs font-mono font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <span>Explore Memorable Moments</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Right Column: Video-Style Author Quote Chip & Official Specification Card */}
            <div className="lg:col-span-5 space-y-4">

              {/* Doctor Cutout Visual with Floating Shadow */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                <img
                  src={doctorImages.portrait}
                  alt="Dr. Vatsal Khetan"
                  className="w-14 h-14 rounded-xl object-cover object-top border border-white shadow-xs shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#0284c7] block">
                    BRITISH SURGICAL FELLOW &bull; M.CH KNEE (UK)
                  </span>
                  <p className="text-xs text-slate-700 italic font-medium leading-snug">
                    "Sub-millimeter robotic precision eliminates human error and preserves natural joint anatomy."
                  </p>
                  <span className="text-[10px] font-bold text-slate-900 block mt-0.5">
                    — Dr. Vatsal Khetan (FRCS Edinburgh)
                  </span>
                </div>
              </div>

              {/* Master Standard Specification Card (DSTU 4512:2006 style from video) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border-l-4 border-l-[#f59e0b] border border-amber-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-[#08284d] tracking-wider uppercase">
                    CLINICAL STANDARD : UK-FRCS-2024
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#f59e0b] text-[#08284d]">
                    SURGICAL GOVERNANCE
                  </span>
                </div>
                <h2 className="text-sm font-extrabold text-slate-900 leading-tight">
                  Khetan Hospital Sub-Millimeter Robotic Joint Protocol
                </h2>
                <p className="text-[11px] text-slate-600 font-mono leading-relaxed">
                  Certified by the Royal College of Surgeons of Edinburgh. Operates strictly within a 0.5 mm boundary envelope, ensuring complete ligament preservation and 24-hour post-op assisted ambulation.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: CLINICAL PHILOSOPHY & CREDENTIAL SPECIFICATION CARDS
      ────────────────────────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-8">

        {/* Giant Kinetic Wordmark Layered in Background like "BEAUTIFUL" in video */}
        <div className="relative mb-8">
          <div className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-slate-200/50 select-none tracking-tight">
            PRECISION
          </div>
          <div className="relative -mt-6 sm:-mt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Core Clinical Pillars &amp; Standards
            </h2>
          </div>
        </div>

        {/* 3 Clinical Specification Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 p-6 space-y-3 border-l-4 border-l-[#f59e0b] flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-[#08284d] text-white">
                  SPEC: ROBOTIC-0.5MM
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400">#01</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                Sub-Millimeter Robotic Precision
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light bg-slate-50 p-3 rounded-xl border border-slate-100">
                Eliminates manual angular misalignment. Optical sensors track bone movement in real time, preventing soft tissue laceration and ligament stretching.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
              Envelope: &plusmn;0.5 mm &bull; Bone Sparing
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 p-6 space-y-3 border-l-4 border-l-[#f59e0b] flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-[#08284d] text-white">
                  SPEC: UK-WRIGHTINGTON
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400">#02</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                British Arthroplasty Heritage
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light bg-slate-50 p-3 rounded-xl border border-slate-100">
                Trained at the historic home of modern hip replacement (Sir John Charnley, Wrightington). Implements long-term cementless trabecular implant stability.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
              NHS Fellowship &bull; Bone &amp; Joint Open
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 p-6 space-y-3 border-l-4 border-l-[#f59e0b] flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-[#08284d] text-white">
                  SPEC: SWISS-IOC-REHAB
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400">#03</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                Olympic Sports Medicine &amp; Ligaments
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light bg-slate-50 p-3 rounded-xl border border-slate-100">
                Diploma from IOC Lausanne, Switzerland. Specialized in remnant-preserving ACL reconstructions (J-Arch landmark) and inside-out meniscus repair.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
              National Athletes &bull; Rapid Return-to-Play
            </div>
          </div>

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
            <span>WHAT TO ASK BEFORE CONSULTATION...</span>
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
                SUB-MILLIMETER ROBOTIC CARE ONLY
              </h2>
              <p className="text-xs text-slate-300 font-light max-w-lg">
                Direct UK Royal College governance, 0.5mm cutting precision, and 24-hour patient ambulation right here in Gorakhpur.
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

export default AboutPage;
