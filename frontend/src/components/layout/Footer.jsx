import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ChevronUp } from 'lucide-react';
import { clinicInfo } from '../../data/navigationData';

/**
 * 🏥 KHETAN HOSPITAL FOOTER
 * - Supports both standard document flow and full-screen Shutter Overlay mode
 * - In Shutter mode (isShutter={true}):
 *   Rises smoothly like a physical shutter over preceding sections,
 *   covering the entire viewport with an authoritative hospital close.
 */
export const Footer = forwardRef(({ onBookClick, isShutter = false, shutterDirection = 'vertical', ...props }, ref) => {
  const isHorizontal = shutterDirection === 'horizontal';

  return (
    <footer
      id="hospital-footer"
      ref={ref}
      className={`w-full bg-slate-900 text-slate-300 text-xs select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${isShutter
        ? isHorizontal
          ? 'h-full min-h-full flex flex-col justify-between shadow-[-35px_0_80px_rgba(0,0,0,0.9)] rounded-l-[36px] sm:rounded-l-[48px] border-l-2 border-sky-500/40 py-6 sm:py-8'
          : 'min-h-screen flex flex-col justify-between shadow-[0_-35px_80px_rgba(0,0,0,0.9)] rounded-t-[36px] sm:rounded-t-[48px] border-t-2 border-sky-500/40 pt-5 pb-6 sm:pb-8'
        : 'border-t border-slate-800 py-10 sm:py-12'
        }`}
    >
      {/* Shutter Pull Handle & Hospital Header (Vertical Shutter Mode on Home Page) */}
      {isShutter && !isHorizontal && (
        <div className="w-full pt-1 pb-3 flex flex-col items-center select-none">
          <div className="w-20 h-1.5 rounded-full bg-slate-700/90 shadow-inner" />
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-2.5 font-bold">
            KHETAN MULTI SPECIALITY HOSPITAL &bull; CLINICAL GOVERNANCE
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6 sm:space-y-8 my-auto">

        {/* 24/7 Clinical Excellence Banner (Shutter Mode) */}
        {isShutter && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-4 rounded-xl bg-slate-800/70 border border-slate-700/60 text-[11px] font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>24/7 Emergency Trauma</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Sub-0.5mm Robotic Nav</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>100% Cashless TPA Desk</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Royal College FRCS Gov</span>
            </div>
          </div>
        )}

        {/* 3 Main Hospital Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Column 1: Hospital Name & Profile (5 Cols) */}
          <div className="md:col-span-5 space-y-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/logo.webp"
                alt="Khetan Multi Speciality"
                className="w-9 h-9 object-contain rounded-lg bg-white/10 p-0.5 shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                  Khetan Multi Speciality
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider">
                  And Medical Research Centre
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-light">
              Advanced orthopedic, sub-millimeter robotic joint replacement, and sports medicine hospital directed by Dr. Vatsal Khetan (FRCS Edinburgh, M.Ch Knee UK).
            </p>
          </div>

          {/* Column 2: Quick Links (3 Cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-slate-400 font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Surgical Services</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Dr. Vatsal Khetan</Link></li>
              <li><Link to="/locations" className="hover:text-white transition-colors">Locations &amp; Outreach</Link></li>
              <li><Link to="/blogs" className="hover:text-white transition-colors">Patient Guides</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact &amp; Visits</Link></li>
            </ul>
          </div>

          {/* Column 3: Hospital Contact & Hours (4 Cols) */}
          <div className="md:col-span-4 space-y-2.5 text-slate-400">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Hospital Contact
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>Helpline: <a href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`} className="text-white hover:underline font-semibold">{clinicInfo.phone}</a></span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <a href="mailto:drvatsalkhetan@gmail.com" className="hover:underline">drvatsalkhetan@gmail.com</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>Vikas Nagar, Bargadawa, Gorakhpur, UP 273015</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>OPD: Mon – Sat: 9:00 AM – 8:00 PM (Emergency 24/7)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onBookClick && onBookClick()}
                className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Book Priority Appointment
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Accreditation */}
        <div className="pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
          <span>&copy; {new Date().getFullYear()} Khetan Multi Speciality And Medical Research Centre. All Rights Reserved.</span>
          <span>Gorakhpur, Uttar Pradesh</span>
        </div>

      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
