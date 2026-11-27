import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { clinicInfo } from '../../data/navigationData';

/**
 * 🏥 NORMAL, CALM & UNCLUTTERED HOSPITAL FOOTER
 * - Standard, natural document flow (no full-screen shutter trap, no navbar cut-off)
 * - Normal, elegant dark slate palette (bg-slate-900) that looks natural across all pages
 * - Normal, clean details: Brand, Quick Links, Hospital Contact & OPD Hours
 */
export const Footer = forwardRef((props, ref) => {
  return (
    <footer
      id="hospital-footer"
      ref={ref}
      className="w-full bg-[#030712] text-slate-300 border-t border-slate-800/80 text-xs select-none relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        
        {/* 3 Normal Clean Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
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
                onClick={() => props.onBookClick && props.onBookClick()}
                className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Book Priority Appointment
              </button>
            </div>
          </div>

        </div>

        {/* Normal Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
          <span>&copy; {new Date().getFullYear()} Khetan Multi Speciality And Medical Research Centre. All Rights Reserved.</span>
          <span>Gorakhpur, Uttar Pradesh</span>
        </div>

      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
