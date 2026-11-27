import React, { forwardRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { clinicInfo } from '../../data/navigationData';

/**
 * 🎨 SPECIALTY-SPECIFIC FOOTER THEMES
 * Matches each surgical service page's unique color palette, headline & clinical tagline.
 */
const SERVICE_FOOTER_THEMES = {
  'robotic-knee-surgery': {
    accent: '#f59e0b',
    accentHover: '#d97706',
    headline: 'EXPERIENCE ADVANCED ROBOTIC PRECISION',
    tagline: 'Sub-Millimeter Optical Guidance • Rapid 24-Hour Mobility Protocol'
  },
  'knee-replacement': {
    accent: '#f59e0b',
    accentHover: '#d97706',
    headline: 'RESTORE NATURAL PAIN-FREE KNEE MOBILITY',
    tagline: '20+ Year Survivorship Implants • Kinematic Tissue-Sparing Realignment'
  },
  'hip-replacement': {
    accent: '#10b981',
    accentHover: '#059669',
    headline: 'EXPERIENCE LIFELONG CERAMIC HIP PRECISION',
    tagline: 'Direct Anterior Muscle Sparing • Lifelong Low-Wear Ceramic Bearings'
  },
  'shoulder-replacement': {
    accent: '#8b5cf6',
    accentHover: '#7c3aed',
    headline: 'RESTORE HIGH-PERFORMANCE SHOULDER POWER',
    tagline: 'High-Definition Keyhole Optics • Advanced Deltoid Biomechanical Mastery'
  },
  'acl-surgery': {
    accent: '#ef4444',
    accentHover: '#dc2626',
    headline: 'RETURN TO PEAK ATHLETIC PERFORMANCE',
    tagline: 'IOC Olympic Sports Protocol • Biological Meniscus Preservation'
  },
  'spine-surgery': {
    accent: '#0d9488',
    accentHover: '#0f766e',
    headline: 'MINIMALLY INVASIVE MICROSCOPIC SPINE RELIEF',
    tagline: 'Targeted Nerve Decompression • Same-Day & 24-Hour Walking Protocol'
  },
  'trauma-surgery': {
    accent: '#2563eb',
    accentHover: '#1d4ed8',
    headline: 'ADVANCED 3D ANATOMICAL FRACTURE RESTORATION',
    tagline: 'UK Fellowship Trauma Mastery • 24/7 Emergency Pelvic & Polytrauma Care'
  }
};

const DEFAULT_FOOTER_THEME = {
  accent: '#f59e0b',
  accentHover: '#d97706',
  headline: 'EXPERIENCE ADVANCED ROBOTIC PRECISION',
  tagline: 'Sub-Millimeter Joint Excellence • Rapid 24-Hour Mobility Protocol'
};

/**
 * 🏥 TUBIK-INSPIRED EDITORIAL HOSPITAL FOOTER
 * - Dynamically inherits active surgery page palette & headline
 * - Single-line consultation booking pill with Country Code (+91) & strict 10-digit validation
 * - High-contrast deep dark canvas with generous breathing space
 * - Screen-fitted shutter slide behavior on Homepage & Services
 */
export const Footer = forwardRef((props, ref) => {
  const { isHomePage } = useNavigation();
  const location = useLocation();
  const isServicesRoute = location.pathname.startsWith('/services');
  const isShutter = props.isShutter !== undefined ? props.isShutter : (isHomePage || isServicesRoute);

  // Extract route slug if on /services/:slug
  const pathParts = location.pathname.split('/').filter(Boolean);
  const routeSlug = (pathParts[0] === 'services' && pathParts[1]) ? pathParts[1] : null;
  const routeTheme = routeSlug ? SERVICE_FOOTER_THEMES[routeSlug] : null;

  // Resolve dynamic theme prioritizing props, then route, then fallback
  const activeAccent = props.themeSpec?.accent || props.accentColor || routeTheme?.accent || DEFAULT_FOOTER_THEME.accent;
  const activeAccentHover = props.themeSpec?.accentHover || props.accentHover || routeTheme?.accentHover || DEFAULT_FOOTER_THEME.accentHover;
  const activeHeadline = props.themeSpec?.footerHeadline || props.headline || routeTheme?.headline || DEFAULT_FOOTER_THEME.headline;
  const activeTagline = props.themeSpec?.footerTagline || props.tagline || routeTheme?.tagline || DEFAULT_FOOTER_THEME.tagline;

  // Phone input state with country code and strict 10-digit constraint
  const [phoneDigits, setPhoneDigits] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handlePhoneInput = (e) => {
    // Only allow numeric digits, max 10
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneDigits(digitsOnly);
    if (phoneError) setPhoneError('');
  };

  const handleQuickBook = (e) => {
    e.preventDefault();
    if (phoneDigits.length !== 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }
    setPhoneError('');
    if (props.onBookClick) {
      props.onBookClick(phoneDigits);
    }
  };

  return (
    <footer
      id="hospital-footer"
      ref={ref}
      className={`w-full bg-[#121110] text-white select-none shrink-0 ${
        isShutter
          ? 'relative z-30 min-h-[calc(100vh-58px)] sm:min-h-[calc(100vh-60px)] lg:h-[calc(100vh-60px)] shadow-[0_-25px_60px_rgba(0,0,0,0.6)] border-t border-white/10 flex flex-col justify-between overflow-hidden'
          : 'relative z-20 border-t border-white/10'
      } py-8 sm:py-12 lg:py-14 px-6 sm:px-10 lg:px-16`}
    >
      <div className="max-w-7xl mx-auto w-full my-auto space-y-10 sm:space-y-12">

        {/* Main Grid: Left Giant Headline + Input, Right 2 Directory Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ══════════════════════════════════════════════════════════
              LEFT COLUMN (7 Cols): GIANT TITLE & QUICK BOOKING PILL
              Dynamic surgical headline, country code & 10-digit number
          ══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            
            {/* Giant Condensed All-Caps Headline - Service-Themed */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[0.92] transition-colors duration-300">
              {activeHeadline}
            </h2>

            {/* Quick Consultation Booking Pill Input with Country Code */}
            <div className="space-y-2 max-w-xl">
              <form 
                onSubmit={handleQuickBook}
                style={{
                  borderColor: phoneError ? '#ef4444' : undefined,
                }}
                className="flex items-center rounded-full border border-white/20 bg-white/5 p-1.5 focus-within:border-white/50 focus-within:bg-white/10 transition-all shadow-inner"
              >
                {/* Dedicated Country Code Badge */}
                <div className="flex items-center gap-1.5 pl-3 sm:pl-4 pr-2.5 py-1 text-xs sm:text-sm font-mono font-bold text-white/90 border-r border-white/20 select-none shrink-0">
                  <span className="text-sm sm:text-base leading-none">🇮🇳</span>
                  <span>+91</span>
                </div>

                {/* Numeric-Only 10-Digit Input */}
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  value={phoneDigits}
                  onChange={handlePhoneInput}
                  placeholder="98765 43210"
                  className="bg-transparent px-3 sm:px-4 py-2 text-xs sm:text-sm font-mono text-white placeholder-white/35 outline-none flex-1 tracking-wider"
                />

                {/* Service-Themed Book Button */}
                <button
                  type="submit"
                  style={{ backgroundColor: activeAccent }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = activeAccentHover; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = activeAccent; }}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer shrink-0"
                >
                  BOOK
                </button>
              </form>

              {phoneError && (
                <p className="text-[11px] font-mono font-medium text-red-400 pl-4 animate-in fade-in duration-200">
                  &bull; {phoneError}
                </p>
              )}
            </div>

            {/* Subtle Clinical Tagline - Service-Themed */}
            <p className="text-xs font-mono text-white/50 tracking-wider uppercase transition-colors duration-300">
              {activeTagline}
            </p>

          </div>

          {/* ══════════════════════════════════════════════════════════
              RIGHT COLUMN (5 Cols): TWO CLEAN DIRECTORY COLUMNS
              Matches active service accent color
          ══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-mono">
            
            {/* Column 1: YOU CAN FIND US */}
            <div className="space-y-4">
              <span 
                className="text-[11px] font-mono font-bold tracking-widest uppercase block transition-colors duration-300"
                style={{ color: activeAccent }}
              >
                YOU CAN FIND US
              </span>

              <div className="space-y-2.5 text-white/80">
                <div>
                  <a
                    href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
                    className="hover:text-white transition-colors font-bold block"
                  >
                    +91 {clinicInfo.phone}
                  </a>
                </div>

                <div>
                  <a
                    href="mailto:drvatsalkhetan@gmail.com"
                    className="hover:text-white transition-colors uppercase block text-[11px]"
                  >
                    DRVATSALKHETAN@GMAIL.COM
                  </a>
                </div>

                <div className="text-white/60 leading-relaxed text-[11px] pt-1">
                  VIKAS NAGAR, BARGADAWA,<br />
                  GORAKHPUR, UP 273015
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Khetan+Hospital+Gorakhpur"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: activeAccent }}
                    className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider transition-opacity hover:opacity-80"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: A FEW WORDS ABOUT US */}
            <div className="space-y-4">
              <span 
                className="text-[11px] font-mono font-bold tracking-widest uppercase block transition-colors duration-300"
                style={{ color: activeAccent }}
              >
                A FEW WORDS ABOUT US
              </span>

              <ul className="space-y-2 text-white/80 font-bold uppercase tracking-wider text-[11px]">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors block">
                    WHO WE ARE
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white transition-colors block">
                    SURGICAL PROCEDURES
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors block">
                    DR. VATSAL KHETAN
                  </Link>
                </li>
                <li>
                  <Link to="/published-papers" className="hover:text-white transition-colors block">
                    PUBLISHED RESEARCH
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors block">
                    CONTACT &amp; VISITS
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Strip: Logo Mark, Copyright & Governance */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div className="flex items-center gap-3">
            <img src="/logo.webp" alt="Khetan Multi Speciality" className="w-8 h-8 object-contain rounded-full bg-white/10 p-0.5 shrink-0" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="font-black text-white uppercase tracking-wider text-sm">
                KHETAN MULTI SPECIALITY
              </span>
              <span className="hidden sm:inline">&bull;</span>
              <span className="text-[11px] text-sky-300 font-semibold uppercase tracking-wider">
                AND MEDICAL RESEARCH CENTRE
              </span>
            </div>
          </div>

          <div className="text-[11px]">
            &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED.
          </div>
        </div>

      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
