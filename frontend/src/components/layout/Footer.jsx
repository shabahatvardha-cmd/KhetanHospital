import React, { forwardRef, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { clinicInfo } from '../../data/navigationData';

/**
 * 🎨 PAGE-SPECIFIC SPECIALTY THEMES
 * Matches each surgical service and section page's unique color palette, headline & clinical mission.
 */
const SERVICE_FOOTER_THEMES = {
  'robotic-knee-surgery': {
    accent: '#f59e0b',
    accentHover: '#d97706',
    bgGradient: 'from-[#08284d] to-[#04162c]',
    tag: 'SUB-MILLIMETER OPTICAL GUIDANCE',
    headline: 'EXPERIENCE ADVANCED ROBOTIC PRECISION',
    tagline: 'Sub-Millimeter Optical Guidance • Rapid 24-Hour Mobility Protocol'
  },
  'knee-replacement': {
    accent: '#f59e0b',
    accentHover: '#d97706',
    bgGradient: 'from-[#08284d] to-[#04162c]',
    tag: 'KINEMATIC TISSUE-SPARING REALIGNMENT',
    headline: 'RESTORE NATURAL PAIN-FREE KNEE MOBILITY',
    tagline: '20+ Year Survivorship Implants • Rapid 24-Hour Walking Protocol'
  },
  'knee-arthroscopy': {
    accent: '#06b6d4',
    accentHover: '#0891b2',
    bgGradient: 'from-[#072a45] to-[#031828]',
    tag: 'KEYHOLE JOINT PRESERVATION',
    headline: 'MINIMALLY INVASIVE KNEE ARTHROSCOPY ONLY',
    tagline: 'High-Definition Meniscal Repair & Ligament Reconstruction'
  },
  'hip-replacement': {
    accent: '#10b981',
    accentHover: '#059669',
    bgGradient: 'from-[#062c23] to-[#021713]',
    tag: 'LIFELONG CERAMIC PROSTHESIS',
    headline: 'EXPERIENCE LIFELONG CERAMIC HIP PRECISION',
    tagline: 'Direct Anterior Muscle Sparing • Lifelong Low-Wear Ceramic Bearings'
  },
  'shoulder-replacement': {
    accent: '#a855f7',
    accentHover: '#9333ea',
    bgGradient: 'from-[#1c123d] to-[#0c081f]',
    tag: 'HIGH-DEFINITION KEYHOLE OPTICS',
    headline: 'RESTORE HIGH-PERFORMANCE SHOULDER POWER',
    tagline: 'Advanced Deltoid Biomechanical Mastery & Rotator Cuff Reconstruction'
  },
  'shoulder-arthroscopy': {
    accent: '#a855f7',
    accentHover: '#9333ea',
    bgGradient: 'from-[#1c123d] to-[#0c081f]',
    tag: 'ADVANCED ROTATOR CUFF RESTORATION',
    headline: 'ARTHROSCOPIC SHOULDER RECONSTRUCTION ONLY',
    tagline: 'Sub-Centimeter Portals • Complete Rotator Cuff & Labral Repair'
  },
  'acl-surgery': {
    accent: '#ef4444',
    accentHover: '#dc2626',
    bgGradient: 'from-[#2c0c12] to-[#160509]',
    tag: 'IOC OLYMPIC SPORTS PROTOCOL',
    headline: 'RETURN TO PEAK ATHLETIC PERFORMANCE',
    tagline: 'Biological Meniscus Preservation & Anatomical ACL Reconstruction'
  },
  'spine-surgery': {
    accent: '#0d9488',
    accentHover: '#0f766e',
    bgGradient: 'from-[#082828] to-[#031616]',
    tag: 'MICROSCOPIC NERVE DECOMPRESSION',
    headline: 'MINIMALLY INVASIVE MICROSCOPIC SPINE RELIEF',
    tagline: 'Targeted Neurological Decompression • 24-Hour Walking Protocol'
  },
  'trauma-surgery': {
    accent: '#3b82f6',
    accentHover: '#2563eb',
    bgGradient: 'from-[#08244d] to-[#04132b]',
    tag: '3D ANATOMICAL FRACTURE RESTORATION',
    headline: 'ADVANCED 3D ANATOMICAL FRACTURE RESTORATION',
    tagline: 'UK Fellowship Trauma Mastery • 24/7 Emergency Polytrauma Care'
  },
  'ankle-surgery': {
    accent: '#f97316',
    accentHover: '#ea580c',
    bgGradient: 'from-[#281b0c] to-[#140e05]',
    tag: 'LIGAMENT & COMPLEX ANKLE MASTERY',
    headline: 'PRECISION ANKLE & LIGAMENT RECONSTRUCTION',
    tagline: 'Anatomical Stability & Early Weight-Bearing Recovery Protocol'
  }
};

/**
 * 🏥 ADAPTIVE MATCHING HOSPITAL SHUTTER FOOTER
 * - Slides up like an architectural shutter on every page
 * - Never gets cut under the navbar: ample top clearance (pt-20 sm:pt-24 lg:pt-28) + scroll-mt-24
 * - Dynamically matches the specific page you are viewing (Colors, Tag, Headline, Tagline)
 * - Clean, uncluttered 3-column layout (Brand | Directory | Contact & Hours)
 */
export const Footer = forwardRef((props, ref) => {
  const location = useLocation();
  const path = location.pathname;

  // Dynamically resolve matching page theme based on URL
  const pageTheme = useMemo(() => {
    // 1. Surgical detail routes (/services/:slug)
    if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '').split('/')[0];
      if (SERVICE_FOOTER_THEMES[slug]) return SERVICE_FOOTER_THEMES[slug];
    }

    // 2. Services index (/services)
    if (path === '/services') {
      return {
        accent: '#f59e0b',
        accentHover: '#d97706',
        bgGradient: 'from-[#08284d] to-[#04162c]',
        tag: 'SPECIALISED SURGICAL CHAPTERS',
        headline: 'ADVANCED ORTHOPAEDIC & ROBOTIC SURGERY',
        tagline: '8 Sub-Millimeter Specialties • Same-Day & 24-Hour Mobility Protocol'
      };
    }

    // 3. About Doctor (/about, /about/dr-vatsal-khetan)
    if (path.startsWith('/about') && !path.includes('memorable') && !path.includes('published')) {
      return {
        accent: '#f59e0b',
        accentHover: '#d97706',
        bgGradient: 'from-[#08284d] to-[#04162c]',
        tag: 'UK ROYAL COLLEGE GOVERNANCE',
        headline: 'SUB-MILLIMETER ROBOTIC CARE ONLY',
        tagline: 'Direct UK Royal College Governance • 0.5mm Precision • Gorakhpur'
      };
    }

    // 4. Memorable Moments (/memorable-moments, /timeline)
    if (path === '/memorable-moments' || path.includes('memorable') || path === '/timeline') {
      return {
        accent: '#38bdf8',
        accentHover: '#0284c7',
        bgGradient: 'from-[#08284d] to-[#031528]',
        tag: 'FELLOWSHIPS & MILESTONES',
        headline: 'INTERNATIONAL SURGICAL STANDARDS ONLY',
        tagline: 'NHS British Fellowships • IOC Switzerland • FRCS Edinburgh'
      };
    }

    // 5. Published Papers (/published-papers)
    if (path.includes('published-papers')) {
      return {
        accent: '#a855f7',
        accentHover: '#9333ea',
        bgGradient: 'from-[#091f3d] to-[#041224]',
        tag: 'PEER-REVIEWED SCIENTIFIC RIGOR',
        headline: 'EVIDENCE-BASED ORTHOPAEDICS ONLY',
        tagline: '10 International Papers Translating Directly into Safer Patient Recovery'
      };
    }

    // 6. Blogs (/blogs)
    if (path.startsWith('/blogs')) {
      return {
        accent: '#0284c7',
        accentHover: '#0369a1',
        bgGradient: 'from-[#0b2b52] to-[#051830]',
        tag: 'PATIENT EDUCATION REPOSITORY',
        headline: 'ORTHOPAEDIC PATIENT EDUCATION ONLY',
        tagline: '61 Clinical Guides Empowering Patients With Transparent Recovery Steps'
      };
    }

    // 7. Locations (/locations)
    if (path === '/locations') {
      return {
        accent: '#ff5722',
        accentHover: '#e64a19',
        bgGradient: 'from-[#0c2444] to-[#05152b]',
        tag: 'REGIONAL OUTREACH HUBS',
        headline: 'REGIONAL ORTHOPAEDIC OUTREACH ONLY',
        tagline: 'Connecting Eastern UP & Western Bihar Directly to Flagship Care in Gorakhpur'
      };
    }

    // 8. Contact (/contact)
    if (path === '/contact') {
      return {
        accent: '#10b981',
        accentHover: '#059669',
        bgGradient: 'from-[#08284d] to-[#04162c]',
        tag: 'CENTRALIZED 24/7 RECEPTION',
        headline: 'CENTRALIZED EMERGENCY & OPD RECEPTION',
        tagline: 'Vikas Nagar, Bargadawa, Gorakhpur • Helpline +91 96623 65917'
      };
    }

    // Default Home Page
    return {
      accent: '#f59e0b',
      accentHover: '#d97706',
      bgGradient: 'from-[#08284d] to-[#04162c]',
      tag: 'INTERNATIONAL SURGICAL BENCHMARK',
      headline: 'EXPERIENCE ADVANCED ROBOTIC PRECISION',
      tagline: 'Dr. Vatsal Khetan (FRCS Edinburgh) • Rapid 24-Hour Mobility Protocol'
    };
  }, [path]);

  return (
    <footer
      id="hospital-footer"
      ref={ref}
      className={`relative z-30 w-full min-h-[calc(100vh-64px)] bg-gradient-to-b ${pageTheme.bgGradient} text-white select-none shrink-0 shadow-[0_-30px_90px_rgba(0,0,0,0.7)] border-t-2 border-sky-400/40 flex flex-col justify-between pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden scroll-mt-24`}
    >
      <div className="max-w-7xl mx-auto w-full my-auto space-y-10 sm:space-y-12">

        {/* ══════════════════════════════════════════════════════════
            TOP BAR: Brand Identity & Priority Consultation CTA
            (Placed with safe clearance from sticky navbar)
        ══════════════════════════════════════════════════════════ */}
        <div className="pb-8 border-b border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Logo & Full Brand Name */}
          <Link to="/" className="flex items-center gap-3.5 group cursor-pointer">
            <img
              src="/logo.webp"
              alt="Khetan Multi Speciality And Medical Research Centre"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-2xl bg-white/10 p-1 border border-white/20 shadow-md group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-black text-white uppercase tracking-wider leading-tight">
                KHETAN MULTI SPECIALITY
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-sky-300 uppercase tracking-widest mt-0.5">
                AND MEDICAL RESEARCH CENTRE
              </span>
            </div>
          </Link>

          {/* Page-Themed Priority Consultation Action Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => props.onBookClick && props.onBookClick()}
              style={{ backgroundColor: pageTheme.accent }}
              className="px-7 sm:px-9 py-3.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <span>Book Priority Consultation</span>
              <span>&rarr;</span>
            </button>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════
            MAIN 3-COLUMN DIRECTORY GRID
        ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 text-xs">

          {/* Column 1: Page-Specific Clinical Governance & Focus (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <div 
              style={{ color: pageTheme.accent, borderColor: `${pageTheme.accent}40`, backgroundColor: `${pageTheme.accent}15` }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{pageTheme.tag}</span>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
              {pageTheme.headline}
            </h3>

            <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs font-light">
              {pageTheme.tagline}. Directed by <strong className="text-white font-semibold">Dr. Vatsal Khetan</strong> (FRCS Edinburgh, M.Ch Knee UK).
            </p>

            <div className="space-y-2 pt-2 text-[11px] font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>UK Royal College (Edinburgh) Governance</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Sub-Millimeter Optical Robotic Precision</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Clinical & Patient Directory (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <span 
              style={{ color: pageTheme.accent }}
              className="text-[11px] font-mono font-bold tracking-widest uppercase block"
            >
              PATIENT &amp; CLINICAL DIRECTORY
            </span>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 font-mono text-[11px] sm:text-xs">
              <Link to="/" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-sky-400" />
                <span>Home</span>
              </Link>
              <Link to="/services" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-sky-400" />
                <span>Services</span>
              </Link>
              <Link to="/about" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-sky-400" />
                <span>Dr. Vatsal Khetan</span>
              </Link>
              <Link to="/memorable-moments" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-sky-400" />
                <span>Career Timeline</span>
              </Link>
              <Link to="/published-papers" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-sky-400" />
                <span>Research Papers</span>
              </Link>
              <Link to="/locations" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-sky-400" />
                <span>Regional Hubs</span>
              </Link>
              <Link to="/blogs" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-sky-400" />
                <span>Patient Guides</span>
              </Link>
              <Link to="/contact" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-sky-400" />
                <span>Contact &amp; Visits</span>
              </Link>
            </div>
          </div>

          {/* Column 3: Hospital Reception, Timings & Directions (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <span 
              style={{ color: pageTheme.accent }}
              className="text-[11px] font-mono font-bold tracking-widest uppercase block"
            >
              HOSPITAL RECEPTION &amp; VISITS
            </span>

            <div className="space-y-3 text-slate-300 font-mono text-[11px] sm:text-xs">
              {/* Phone Helpline */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase">Emergency Helpline:</span>
                  <a href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`} className="text-sm font-bold text-white hover:text-sky-300 transition-colors">
                    {clinicInfo.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase">Official Email:</span>
                  <a href="mailto:drvatsalkhetan@gmail.com" className="text-white hover:underline">
                    drvatsalkhetan@gmail.com
                  </a>
                </div>
              </div>

              {/* Physical Location */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="block text-[10px] text-slate-400 uppercase">Hospital Address:</span>
                  <span className="text-white">Vikas Nagar, Bargadawa, Gorakhpur, UP 273015</span>
                </div>
              </div>

              {/* OPD Consultation Timings */}
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase">OPD Consultation Hours:</span>
                  <span className="text-white">Mon – Sat: 9:00 AM – 8:00 PM (Emergency 24/7)</span>
                </div>
              </div>

              {/* Google Maps Direction Button */}
              <div className="pt-1">
                <a
                  href="https://maps.google.com/?q=Khetan+Hospital+Gorakhpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: pageTheme.accent }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold hover:underline transition-all uppercase tracking-wider"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════
            BOTTOM STRIP: Copyright & Governance Verification
        ══════════════════════════════════════════════════════════ */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Khetan Multi Speciality And Medical Research Centre. All Rights Reserved.
          </div>
          <div className="text-[11px]" style={{ color: pageTheme.accent }}>
            FRCS (Edinburgh) Surgical Standards &bull; Modular Clean-Room OT
          </div>
        </div>

      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
