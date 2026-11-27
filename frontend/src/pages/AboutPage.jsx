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
  Star,
  CheckCircle2,
  HeartHandshake,
  Phone,
  ZoomIn,
  Maximize2,
  Info
} from 'lucide-react';
import { clinicInfo } from '../data/clinicContent';
import { doctorImages } from '../data/imageConfig';
import { KineticDualTitle } from '../components/motion/KineticDualTitle';
import { PosterLightboxModal } from '../components/home/PosterLightboxModal';

/**
 * 🏥 DR. VATSAL KHETAN & DR. HELI KHETAN — DOCTORS & CLINICAL TEAM PAGE
 * 
 * - Meet the Doctors (Editorial portraits of Dr. Vatsal & Dr. Heli Khetan)
 * - Clinical Expertise (Asymmetric 4-card surgical & joint preservation layout)
 * - Monthly Free Knee Check-up Campaign (Official poster display + clickable modal)
 * - Clinical Governance FAQ & Direct Booking
 */
export const AboutPage = ({ onBookClick }) => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

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

  return (
    <div className="relative w-full bg-[#fbfbfd] text-slate-900 select-none overflow-hidden">

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: EDITORIAL HEADER & DOCTOR PROFILE HERO
      ────────────────────────────────────────────────────────────── */}
      <section className="relative w-full border-b border-slate-200/90 pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-6">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">

            {/* Left Column: Bold Dual-Box Lockup */}
            <div className="lg:col-span-7 space-y-3">
              <KineticDualTitle
                primaryText="KHETAN DOCTORS"
                secondaryText="UK GOVERNANCE"
              />

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight pt-1">
                Authentic Surgical Excellence &bull; Dr. Vatsal &amp; Dr. Heli Khetan
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
                  Rheumatology &bull; Pain Care
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light max-w-xl pt-1">
                Bringing UK Royal College surgical governance, sub-millimeter robotic precision, and dedicated non-surgical arthritis rehabilitation directly to Gorakhpur and Eastern Uttar Pradesh.
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

            {/* Right Column: Verified Author Quote Chip & Official Specification Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-900 shadow-2xs">
                <img
                  src="/images/dr-vatsal-camp.png"
                  alt="Dr. Vatsal Khetan"
                  className="w-14 h-16 rounded-xl object-cover object-top border border-white shadow-xs shrink-0"
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

              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border-l-4 border-l-[#f59e0b] border-2 border-slate-900 shadow-xs space-y-2">
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
          MEET THE DOCTORS (Editorial-Style Dual Doctor Layout)
      ────────────────────────────────────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-10">
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08284d] tracking-tight">
            Our Specialist Physicians &amp; Surgeons
          </h2>
          <p className="text-xs sm:text-sm font-extrabold text-slate-700 tracking-tight">
            Meet the experienced doctors leading robotic surgical joint reconstruction and medical arthritis care at Khetan Hospital.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Dr. Vatsal Khetan Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-slate-900 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-sky-600 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl border-2 border-slate-900 overflow-hidden bg-slate-100 shrink-0 shadow-md">
                  <img
                    src="/images/dr-vatsal-camp.png"
                    alt="Dr. Vatsal Khetan — Robotic Knee Surgeon"
                    className="w-full h-full object-cover object-top select-none group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-1.5 min-w-0">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Dr. Vatsal Khetan
                  </h3>
                  <p className="text-sm font-extrabold text-sky-800 tracking-tight">
                    Senior Knee Specialist &bull; घुटने के वरिष्ठ विशेषज्ञ
                  </p>
                  <p className="text-xs font-extrabold text-slate-700 tracking-tight leading-snug">
                    MBBS &bull; MS (Ortho) &bull; FRCS (Edinburgh) &bull; M.Ch Knee (UK)
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-extrabold text-slate-700 leading-relaxed tracking-tight">
                Specializing in sub-millimeter robotic knee replacements and sports arthroscopy. Trained at Wrightington Hospital and Newcastle upon Tyne NHS Trust (UK).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="text-[11px] font-extrabold text-sky-800 uppercase tracking-tight">Precision</div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">Sub-Millimeter Robotic Surgery</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="text-[11px] font-extrabold text-sky-800 uppercase tracking-tight">Tissue Care</div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">Keyhole Ligament Preservation</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="text-[11px] font-extrabold text-sky-800 uppercase tracking-tight">Recovery</div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">Assisted Walking in 24 Hours</div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onBookClick}
                className="px-6 py-2.5 rounded-full bg-[#08284d] text-white text-xs font-extrabold tracking-tight hover:bg-sky-600 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Consult Dr. Vatsal Khetan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dr. Heli Khetan Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-900 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-emerald-600 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl border-2 border-slate-900 overflow-hidden bg-slate-100 shrink-0 shadow-md">
                  <img
                    src="/images/dr-heli-khetan.png"
                    alt="Dr. Heli Khetan — Arthritis & Pain Specialist"
                    className="w-full h-full object-cover object-top select-none group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-1.5 min-w-0">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Dr. Heli Khetan
                  </h3>
                  <p className="text-sm font-extrabold text-emerald-800 tracking-tight">
                    Arthritis &amp; Pain Specialist &bull; गठिया और दर्द विशेषज्ञ
                  </p>
                  <p className="text-xs font-extrabold text-slate-700 tracking-tight leading-snug">
                    Rheumatology &bull; Chronic Joint Pain &bull; Bone Health Optimization
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-extrabold text-slate-700 leading-relaxed tracking-tight">
                Dedicated to non-surgical arthritis management, early diagnosis of joint degeneration, bone density screening, and targeted local pain therapy.
              </p>

              <div className="space-y-2 pt-1">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">Targeted Joint Injections &amp; Therapy</div>
                    <div className="text-[11px] font-extrabold text-slate-700 tracking-tight">घुटने का इंजेक्शन एवं सटीक दवाई से दर्द निवारण</div>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">Nerve &amp; Bone Health Protocol</div>
                    <div className="text-[11px] font-extrabold text-slate-700 tracking-tight">नस एवं हड्डी की जांच और संपूर्ण सुरक्षा</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onBookClick}
                className="px-6 py-2.5 rounded-full bg-emerald-800 text-white text-xs font-extrabold tracking-tight hover:bg-emerald-900 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Consult Dr. Heli Khetan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="tel:9161995550"
                className="text-xs font-extrabold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 tracking-tight"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>9161995550</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          CLINICAL EXPERTISE (Asymmetric 4-Card Surgical Layout)
      ────────────────────────────────────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-8 bg-slate-50/50 rounded-3xl my-6 border-y border-slate-200/80">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08284d] tracking-tight">
            Specialized Surgical &amp; Joint Reconstruction
          </h2>
          <p className="text-xs sm:text-sm font-extrabold text-slate-700 tracking-tight">
            Every procedure adheres to strict UK Royal College governance, sub-millimeter computer planning, and rapid patient recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">

          {/* Specialty 1: Robotic Knee Surgery (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-slate-900 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-sky-600 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src="/images/surgeries/robotic-knee.webp"
                  alt="Sub-millimeter robotic knee joint replacement"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                  loading="lazy"
                />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors tracking-tight">
                  Robotic Knee Replacement &amp; 3D CT Planning
                </h3>
                <p className="text-xs sm:text-sm font-extrabold text-slate-700 leading-relaxed tracking-tight">
                  High-resolution CT navigation calculates bone cuts with &plusmn;0.5 mm boundary accuracy, completely sparing soft tissues and collateral ligaments.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold tracking-tight text-slate-700">
              <span>0.5mm Tolerance &bull; Bone Sparing</span>
              <span className="font-extrabold text-sky-800">Robotic Standard</span>
            </div>
          </div>

          {/* Specialty 2: Total & Partial Replacement (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-900 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-sky-600 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src="/images/surgeries/knee-replacement.webp"
                  alt="Primary and complex knee replacement"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                  loading="lazy"
                />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors tracking-tight">
                  Total &amp; Partial Joint Replacement
                </h3>
                <p className="text-xs sm:text-sm font-extrabold text-slate-700 leading-relaxed tracking-tight">
                  Partial unicompartmental resurfacing preserving 70% of healthy bone, and direct anterior muscle-sparing hip surgery.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold tracking-tight text-slate-700">
              <span>Cementless Ingrowth &bull; High Flexion</span>
              <span className="font-extrabold text-sky-800">30+ Year Longevity</span>
            </div>
          </div>

          {/* Specialty 3: Sports Medicine & Arthroscopy (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-900 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-sky-600 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src="/images/surgeries/acl-surgery.webp"
                  alt="Keyhole arthroscopy and sports ligament reconstruction"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                  loading="lazy"
                />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors tracking-tight">
                  Sports Medicine &amp; Arthroscopy
                </h3>
                <p className="text-xs sm:text-sm font-extrabold text-slate-700 leading-relaxed tracking-tight">
                  Remnant-preserving ACL reconstruction using the anatomical "J Arch" landmark, inside-out meniscus repair, and shoulder cuff restoration.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold tracking-tight text-slate-700">
              <span>IOC Switzerland Diploma &bull; Athletes</span>
              <span className="font-extrabold text-sky-800">Keyhole Repair</span>
            </div>
          </div>

          {/* Specialty 4: Rapid Recovery & Same-Day Ambulation (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-slate-900 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-sky-600 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src="/images/surgeries/happy-knee-walk.webp"
                  alt="Patient walking comfortably outdoors post recovery"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                  loading="lazy"
                />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors tracking-tight">
                  Assisted Walking in 24 Hours &amp; Early Discharge
                </h3>
                <p className="text-xs sm:text-sm font-extrabold text-slate-700 leading-relaxed tracking-tight">
                  Multimodal local infiltration analgesia (LIA) and soft-tissue preservation enable over 90% of patients to walk to the washroom with support on the same evening of surgery.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold tracking-tight text-slate-700">
              <span>Same-Day Mobilization &bull; 48-72h Discharge</span>
              <span className="font-extrabold text-emerald-800">Zero Pain Protocol</span>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MONTHLY FREE KNEE CHECK-UP CAMPAIGN
      ────────────────────────────────────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-gradient-to-br from-amber-50/90 via-white to-sky-50/90 rounded-3xl border-2 border-slate-900 p-6 sm:p-10 shadow-md relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left: Original Hospital Promotional Poster (Clickable) */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              <div
                onClick={() => setIsPosterModalOpen(true)}
                className="relative aspect-[3/4] w-full max-w-sm rounded-2xl border-2 border-slate-900 overflow-hidden bg-white shadow-lg cursor-pointer group"
                title="Click to view full-size original poster"
              >
                <img
                  src="/images/khetan-knee-camp-poster-general.png"
                  alt="Khetan Knee N Shoulder Clinic — Monthly Free Knee Camp Poster"
                  className="w-full h-full object-contain p-1 group-hover:scale-102 transition-transform duration-300 select-none"
                />

                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-4 py-2 rounded-full bg-[#08284d] text-white text-xs font-extrabold tracking-tight shadow-xl flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-amber-400" />
                    <span>Click to View Full Poster</span>
                  </span>
                </div>
              </div>

              <div className="w-full max-w-sm mt-3.5 p-3 rounded-xl bg-white border-2 border-slate-900 flex items-center justify-between text-xs font-extrabold tracking-tight text-slate-800 shadow-2xs">
                <span className="inline-flex items-center gap-1.5 text-amber-800">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Every Month (हर महीने)</span>
                </span>
                <span className="text-slate-700">10:00 AM – 1:00 PM</span>
              </div>
            </div>

            {/* Right: Editorial Breakdown & Transparent Registration Notice */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Free Monthly Knee Check-up
                  <span className="block text-xl sm:text-2xl text-sky-800 font-extrabold mt-1 tracking-tight">
                    नि:शुल्क घुटना शिविर &bull; नि:शुल्क हड्डी और नस की जांच!
                  </span>
                </h2>

                <p className="text-xs sm:text-sm font-extrabold text-slate-700 leading-relaxed tracking-tight">
                  Conducted by <strong className="text-slate-900 font-extrabold">Dr. Vatsal Khetan</strong> &amp; <strong className="text-slate-900 font-extrabold">Dr. Heli Khetan</strong> at <strong className="text-slate-900 font-extrabold">Khetan Knee N Shoulder Clinic</strong>, S.K. Pandey Complex, Betiahata, Gorakhpur.
                </p>
              </div>

              {/* 6 100% Free Diagnostics Included */}
              <div className="space-y-2">
                <div className="text-xs font-extrabold tracking-tight uppercase text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Included Free Examinations (नि:शुल्क जांच):</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-extrabold tracking-tight text-slate-900 shadow-2xs">
                    &bull; Free OPD Consultation
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-extrabold tracking-tight text-slate-900 shadow-2xs">
                    &bull; Bone Health (हड्डी जांच)
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-extrabold tracking-tight text-slate-900 shadow-2xs">
                    &bull; Nerve Check (नस जांच)
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-extrabold tracking-tight text-slate-900 shadow-2xs">
                    &bull; Blood Sugar Screening
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-extrabold tracking-tight text-slate-900 shadow-2xs">
                    &bull; Blood Pressure Check
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-extrabold tracking-tight text-slate-900 shadow-2xs">
                    &bull; Uric Acid Evaluation
                  </div>
                </div>
              </div>

              {/* Concessions from Poster */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-extrabold tracking-tight uppercase text-slate-800">
                  Special Concessions Available at Camp:
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold tracking-tight">
                  <span className="px-3 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                    50% Discount on X-Rays
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                    30% Discount on Blood Tests
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                    10% Discount on Medicines
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                    Special Concession for Athletes
                  </span>
                </div>
              </div>

              {/* ⚠️ Explicit & Transparent Registration Fee Notice */}
              <div className="p-3.5 rounded-2xl bg-amber-100/70 border border-amber-300 text-amber-950 text-xs leading-relaxed flex items-start gap-2.5 font-extrabold tracking-tight">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-extrabold">Transparent Registration Fee Notice:</strong> All consultations and bone/nerve checks above are provided without doctor consultation charges. A nominal hospital registration fee of <strong className="font-black text-slate-900">₹50</strong> applies at reception. Wheelchair assistance is available.
                </div>
              </div>

              {/* Direct Hospital Contact from Poster */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="tel:9161995550"
                  className="px-6 py-3 rounded-full bg-[#08284d] text-white text-xs font-extrabold tracking-tight hover:bg-sky-600 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call to Register: 9161995550</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsPosterModalOpen(true)}
                  className="px-5 py-3 rounded-full border-2 border-slate-900 bg-white text-slate-800 text-xs font-extrabold tracking-tight hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-slate-600" />
                  <span>View Original Poster</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: CONVERSATIONAL SPEECH-BUBBLE FAQ ACCORDION
      ────────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
            <span>WHAT TO ASK BEFORE CONSULTATION...</span>
            <span className="text-2xl select-none">🧐</span>
          </h2>
        </div>

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
          SECTION 5: CLOSING BANNER
      ────────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#08284d] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-black/20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
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

          <div className="shrink-0">
            <button
              onClick={onBookClick}
              className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-[#f59e0b] hover:bg-[#d97706] text-[#08284d] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Book Priority Consultation &rarr;
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-10 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
          <span>Khetan Hospital &bull; Vikas Nagar, Bargadawa, Gorakhpur</span>
          <span>Royal College of Surgeons (Edinburgh) Governance</span>
        </div>
      </section>

      {/* Lightbox Modal for Original Poster */}
      <PosterLightboxModal
        isOpen={isPosterModalOpen}
        onClose={() => setIsPosterModalOpen(false)}
        imageSrc="/images/khetan-knee-camp-poster-general.png"
      />
    </div>
  );
};

export default AboutPage;
