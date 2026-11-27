import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
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
 * 🏥 UNIFIED MATCHING HOSPITAL SHUTTER FOOTER
 * - Architectural shutter slide covering the page on scroll (relative z-30, shadow-2xl, full-height)
 * - Signature Hospital Cobalt palette (#08284d) matching Navbar, Modals and Brand
 * - Clean 3-column layout (Brand & UK Governance | Quick Directory | Hospital Contact & OPD Hours)
 * - Rendered consistently on EVERY page across the entire website
 */
export const Footer = forwardRef((props, ref) => {
  return (
    <footer
      id="hospital-footer"
      ref={ref}
      className="relative z-30 w-full min-h-[calc(100vh-60px)] bg-gradient-to-b from-[#08284d] to-[#04162c] text-white select-none shrink-0 shadow-[0_-30px_90px_rgba(4,22,46,0.7)] border-t-2 border-sky-400/40 flex flex-col justify-between py-10 sm:py-14 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full my-auto space-y-10 sm:space-y-12">

        {/* ══════════════════════════════════════════════════════════
            TOP BAR: Brand Identity & Priority Consultation CTA
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

          {/* Golden Priority Consultation Action Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => props.onBookClick && props.onBookClick()}
              className="px-7 sm:px-9 py-3.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-[#f59e0b] hover:bg-[#d97706] text-[#08284d] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
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

          {/* Column 1: Clinical Governance & Surgical Excellence (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-sky-400" />
              <span>International Surgical Rigor</span>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
              Sub-Millimeter Robotic &amp; Sports Injury Centre in Purvanchal
            </h3>

            <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs font-light">
              Founded and directed by <strong className="text-white font-semibold">Dr. Vatsal Khetan</strong> (FRCS Edinburgh, M.Ch Knee UK), delivering evidence-based joint replacements, kinematic realignments, and 24-hour rapid mobilization pathways.
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
            <span className="text-[11px] font-mono font-bold tracking-widest text-sky-300 uppercase block">
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
                <span>Research (10 Papers)</span>
              </Link>
              <Link to="/locations" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-sky-400" />
                <span>Regional Locations</span>
              </Link>
              <Link to="/blogs" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-sky-400" />
                <span>Patient Guides (61)</span>
              </Link>
              <Link to="/contact" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-sky-400" />
                <span>Contact &amp; Visits</span>
              </Link>
            </div>
          </div>

          {/* Column 3: Hospital Reception, Timings & Directions (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[11px] font-mono font-bold tracking-widest text-sky-300 uppercase block">
              HOSPITAL RECEPTION &amp; VISITS
            </span>

            <div className="space-y-3 text-slate-300 font-mono text-[11px] sm:text-xs">
              {/* Phone Helpline */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase">Emergency &amp; Appointments:</span>
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
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-300 hover:text-white transition-colors uppercase tracking-wider"
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
          <div className="text-[11px] text-sky-300/80">
            FRCS (Edinburgh) Surgical Standards &bull; Modular Clean-Room OT
          </div>
        </div>

      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
