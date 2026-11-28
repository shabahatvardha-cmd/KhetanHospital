import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion
} from 'framer-motion';
import {
  Search,
  X,
  MapPin,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  Quote,
  ArrowRight,
  ExternalLink,
  Calendar,
  ShieldCheck,
  Check,
  Building2,
  User,
  Plus,
  Copy,
  Play,
  ArrowUpRight
} from 'lucide-react';
import { allLocations, clinicInfo } from '../data/clinicContent';
import { KineticDualTitle } from '../components/motion/KineticDualTitle';
import { WaveGradientText } from '../components/motion/WaveGradientText';
import { Footer } from '../components/layout/Footer';

/**
 * 🏥 REGIONAL CONSULTATION HUBS & OUTREACH CENTRES
 * - Top First Card: Designed like the First Section of Home Page (HomeDoctorHero) with UK accreditation,
 *   WaveGradientText, rotating surgical optical rings, Dr. Vatsal Khetan hero cutout, and 4 clinical metric chips.
 * - Regional Outreach Cards: EXACT SAME UNIFORM SIZE (identical height & fixed internal slots),
 *   fitted images (object-cover object-center), and 100% Indian-style clinical service images.
 * - Alternating UP & DOWN Columns (pt-0, pt-16, pt-0) with borderless cards (border-0).
 * - Full-Screen Hospital Shutter Footer sliding smoothly over the sticky FAQ stage.
 */

// Distinct Faceless Hospital & Therapy Image Mapping (Strictly ZERO faces, 100% Bright Clinical & Rehab)
const locationImages = {
  'Main Surgical Centre — Bargadawa, Gorakhpur': '/images/khetan-hospital-building.webp',
  'Khetan Knee N Shoulder Clinic — Betiahata, Gorakhpur': '/images/locations/faceless-joint-implants-clinic.webp',
  'Deoria Patient Care & Consultation Centre': '/images/locations/faceless-knee-physiotherapy.webp',
  'Basti Patient Consultation Centre': '/images/backgrounds/modular-ot.webp',
  'Kushinagar Outreach OPD': '/images/locations/faceless-robotic-surgery-arm.webp',
  'Maharajganj Consultation Outreach': '/images/surgeries/robotic-ct-planning.webp',
  'Bettiah (West Champaran, Bihar) Centre': '/images/locations/faceless-parallel-bars-rehab.webp',
  'Siwan (Bihar) Consultation Outreach': '/images/surgeries/hip-ceramic-implant.webp',
  'Motihari (East Champaran, Bihar) Centre': '/images/surgeries/knee-partial-unicompartmental.webp',
  'Patna Surgical Partner Centre': '/images/surgeries/trauma-mipo.webp',
  // City fallbacks (strictly faceless, bright hospital & therapy visuals)
  Gorakhpur: '/images/locations/faceless-joint-implants-clinic.webp',
  Deoria: '/images/locations/faceless-knee-physiotherapy.webp',
  Basti: '/images/backgrounds/modular-ot.webp',
  Kushinagar: '/images/locations/faceless-robotic-surgery-arm.webp',
  Maharajganj: '/images/surgeries/robotic-ct-planning.webp',
  Bettiah: '/images/locations/faceless-parallel-bars-rehab.webp',
  Siwan: '/images/surgeries/hip-ceramic-implant.webp',
  Motihari: '/images/surgeries/knee-partial-unicompartmental.webp',
  Patna: '/images/surgeries/trauma-mipo.webp',
};

const enhancedLocations = [
  ...allLocations,
  {
    city: 'Gorakhpur',
    isMain: false,
    title: 'Khetan Knee N Shoulder Clinic — Betiahata, Gorakhpur',
    address: 'Khetan Knee N Shoulder Clinic, Betiahata Chowk, Gorakhpur, UP 273001',
    timings: 'Monday - Saturday: 5:00 PM - 8:30 PM (Evening Consultation Clinic)',
    phone: '+91 96623 65917',
    distance: 'Heart of Gorakhpur City',
    servicesAvailable: 'Specialist Joint OPD, Non-Surgical Arthritis Therapy, Pre & Post-Op Reviews',
    catchment: 'Betiahata, Golghar, Civil Lines, Medical College Road, Rustampur',
    patientStories: [
      {
        name: 'Vikas Srivastava',
        location: 'Betiahata, Gorakhpur',
        quote: 'Having the evening clinic at Betiahata made it so easy for my mother to consult Dr. Vatsal Khetan after office hours. Thorough explanation and gentle care.'
      }
    ]
  }
];

const regionalFaqs = [
  {
    q: 'Do I need a prior appointment for outreach clinics in Deoria, Basti, Kushinagar, etc.?',
    a: 'Yes, prior booking is strongly recommended for all regional outreach clinics. Since Dr. Vatsal Khetan attends regional clinics on scheduled days with limited OPD slots, reserving your appointment in advance ensures guaranteed consultation without waiting.'
  },
  {
    q: 'How does surgical admission work if I consult at an outreach clinic?',
    a: 'If surgery is recommended (e.g. robotic knee replacement or keyhole arthroscopy), all pre-operative evaluations and cashless insurance pre-authorizations are coordinated seamlessly by our team. On your scheduled surgery date, you arrive directly at our main surgical hospital in Bargadawa, Gorakhpur.'
  },
  {
    q: 'Is cashless health insurance (TPA) available for patients traveling from outside Gorakhpur?',
    a: 'Yes, 100%. Khetan Hospital is empaneled with all major government and private insurance TPAs, Ayushman Bharat, and corporate health plans. Our dedicated cashless desk handles pre-authorization before you travel so you face zero out-of-pocket stress.'
  },
  {
    q: 'Where do post-operative follow-up visits and stitch removals happen?',
    a: 'Routine post-operative reviews, dressing changes, and follow-up clinical checks can be conducted conveniently at the nearest outreach consultation centre or coordinated virtually, saving you repeated long-distance travel.'
  },
  {
    q: 'How do out-of-district patients reach the main hospital in Bargadawa, Gorakhpur?',
    a: 'Khetan Hospital is centrally situated in Vikas Nagar, Bargadawa on the Gorakhpur–Nepal highway (NH24), easily accessible within 15–20 minutes from Gorakhpur Junction Railway Station and the Interstate Bus Terminal (ISBT).'
  }
];

export const LocationsPage = ({ onBookClick }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prefersReducedMotion = useReducedMotion();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || searchParams.get('search') || '');
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || 'All');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  // Shutter footer scroll setup
  const footerRef = useRef(null);
  const shutterContainerRef = useRef(null);

  const { scrollYProgress: shutterScroll } = useScroll({
    target: shutterContainerRef,
    offset: ['start start', 'end end'],
  });

  const faqScale = useTransform(shutterScroll, [0, 0.75], [1, 0.94]);
  const faqOpacity = useTransform(shutterScroll, [0, 0.75], [1, 0.4]);
  const faqY = useTransform(shutterScroll, [0, 0.75], [0, -35]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedLocation) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selectedLocation]);

  // Sync search query from URL
  useEffect(() => {
    const q = searchParams.get('q') || searchParams.get('search');
    if (q !== null && q !== undefined) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Quick 1-click filter topic pills
  const regionFilters = useMemo(() => [
    'All',
    'Gorakhpur',
    'Deoria',
    'Basti',
    'Kushinagar',
    'Maharajganj',
    'Western Bihar'
  ], []);

  // Filtered locations based on comprehensive multi-word intelligent search
  const filteredLocations = useMemo(() => {
    return enhancedLocations.filter(loc => {
      // Region filter
      if (selectedRegion && selectedRegion !== 'All') {
        if (selectedRegion === 'Western Bihar') {
          const isBihar = ['Bettiah', 'Siwan', 'Motihari', 'Patna'].includes(loc.city) ||
            (loc.title && loc.title.toLowerCase().includes('bihar'));
          if (!isBihar) return false;
        } else if (selectedRegion === 'Gorakhpur') {
          if (loc.city !== 'Gorakhpur') return false;
        } else {
          const matches = loc.city.toLowerCase() === selectedRegion.toLowerCase() ||
            (loc.title && loc.title.toLowerCase().includes(selectedRegion.toLowerCase())) ||
            (loc.catchment && loc.catchment.toLowerCase().includes(selectedRegion.toLowerCase()));
          if (!matches) return false;
        }
      }

      // If no search query, show all
      if (!searchQuery || !searchQuery.trim()) return true;

      // Multi-word intelligent search
      const queryWords = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
      const corpus = [
        loc.city || '',
        loc.title || '',
        loc.address || '',
        loc.servicesAvailable || '',
        loc.catchment || '',
        loc.distance || '',
        loc.travelNote || '',
        loc.desc || '',
        ...(loc.patientStories ? loc.patientStories.map(s => `${s.name} ${s.location} ${s.quote}`) : [])
      ].join(' ').toLowerCase();

      return queryWords.every(word => corpus.includes(word));
    });
  }, [searchQuery, selectedRegion]);

  // Top Card: Main Hospital (First card placed on top, styled like Section 1 of Home Page)
  const topMainHospital = useMemo(() => {
    const main = filteredLocations.find(l => l.isMain);
    if (main) return main;
    if (selectedRegion === 'All' || selectedRegion === 'Gorakhpur') {
      return enhancedLocations.find(l => l.isMain);
    }
    return null;
  }, [filteredLocations, selectedRegion]);

  // The remaining regional cards (excluding the top main hospital) to distribute in columns
  const remainingLocations = useMemo(() => {
    if (!topMainHospital) return filteredLocations;
    return filteredLocations.filter(loc => loc !== topMainHospital);
  }, [filteredLocations, topMainHospital]);

  // Distribute remaining cards into 3 alternating columns for Desktop (Up / Down / Up)
  const cols3 = useMemo(() => {
    const cols = [[], [], []];
    remainingLocations.forEach((loc, idx) => {
      cols[idx % 3].push(loc);
    });
    return cols;
  }, [remainingLocations]);

  // Distribute remaining cards into 2 alternating columns for Mobile & Tablet (Up / Down)
  const cols2 = useMemo(() => {
    const cols = [[], []];
    remainingLocations.forEach((loc, idx) => {
      cols[idx % 2].push(loc);
    });
    return cols;
  }, [remainingLocations]);

  const handleCopyAddress = (address) => {
    if (navigator.clipboard && address) {
      navigator.clipboard.writeText(address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  const getGoogleMapsUrl = (loc) => {
    const query = encodeURIComponent(`${loc.title}, ${loc.address}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  // Reusable card renderer: FULL-BLEEED IMAGE BACKGROUND & COMPACT MINIMAL DETAILS
  // Shorter height (~225px - 240px) with photo as full background & clean text overlay
  const renderCard = (loc, key) => {
    const imageSrc = locationImages[loc.title] || locationImages[loc.city] || '/images/locations/faceless-knee-physiotherapy.webp';
    return (
      <article
        key={key}
        onClick={() => setSelectedLocation(loc)}
        className="relative w-full h-[225px] sm:h-[240px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-3.5 sm:p-4 flex flex-col justify-end group cursor-pointer border-0 select-none bg-slate-900"
      >
        {/* Full-Bleed Background Image (Clean without top corner badges) */}
        <img
          src={imageSrc}
          alt={loc.title}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 select-none z-0"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/locations/faceless-knee-physiotherapy.webp';
          }}
        />

        {/* Crisp Bottom-Only Gradient Overlay for Maximum Brightness & Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none z-0" />

        {/* Bottom Floating Area: City, Title, Timings & Quick Action */}
        <div className="relative z-10 space-y-1.5">
          <span className="text-[10.5px] font-bold text-[#f59e0b] tracking-wider uppercase block">
            {loc.city}
          </span>

          <h3 className="text-sm sm:text-[15px] font-extrabold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors line-clamp-1 drop-shadow-md">
            {loc.title}
          </h3>

          <div className="flex items-center gap-2 text-[10.5px] font-mono text-slate-200">
            <Clock className="w-3 h-3 text-[#f59e0b] shrink-0" />
            <span className="truncate">{loc.timings}</span>
          </div>

          <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[11px] font-extrabold text-cyan-300 group-hover:text-white transition-colors">
            <span className="tracking-tight">View Details &amp; OPD Schedule</span>
            <span className="w-5 h-5 rounded-full bg-white/15 group-hover:bg-cyan-400 group-hover:text-slate-950 flex items-center justify-center transition-all group-hover:translate-x-0.5">
              <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="relative w-full bg-[#f1f5f9] text-slate-900 select-none min-h-screen">

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: EDITORIAL HEADER & INSTANT SEARCH (Matched to BlogsPage)
      ────────────────────────────────────────────────────────────── */}
      <section className="relative w-full border-b border-slate-200/90 pt-4 sm:pt-5 pb-3.5 sm:pb-4 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-3.5">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">

            {/* Left Column: Bold Dual-Box Lockup */}
            <div className="lg:col-span-7 space-y-2">
              <KineticDualTitle
                primaryText="REGIONAL HUBS"
                secondaryText="EASTERN UP & BIHAR"
              />

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight pt-0.5">
                Consultation Centres &amp; Regional Outreach
              </h1>

              <p className="text-xs sm:text-sm font-extrabold text-slate-700 leading-relaxed tracking-tight max-w-xl">
                Direct sub-millimeter robotic joint care, early arthritis diagnosis, and sports injury recovery across Gorakhpur, Deoria, Basti, Kushinagar, Maharajganj, and Western Bihar.
              </p>

              {/* Instant Search Bar with Vertically Centered Lens & Popular Topic Tags */}
              <div className="w-full max-w-xl space-y-2 pt-0.5">
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <input
                    type="text"
                    placeholder="Search centres: Gorakhpur, Deoria, Basti, Kushinagar, Knee, OPD..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-9 py-2 rounded-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 placeholder-slate-400 border border-slate-300 focus:outline-hidden focus:border-[#08284d] text-xs font-extrabold tracking-tight shadow-2xs transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Specification Standard Card (Matched to BlogsPage) */}
            <div className="lg:col-span-5 space-y-2.5">
              <div className="p-3 sm:p-3.5 rounded-xl bg-amber-50/60 border-l-4 border-l-[#f59e0b] border border-amber-200/80 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-[#08284d] tracking-tight uppercase">
                    REGIONAL CARE NETWORK
                  </span>
                  <span className="text-[9.5px] font-extrabold px-2 py-0.5 rounded bg-[#f59e0b] text-[#08284d] tracking-tight">
                    CASHLESS TPA &amp; EMERGENCY
                  </span>
                </div>
                <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight leading-snug">
                  Khetan Hospital Regional Outreach Infrastructure
                </h2>
                <p className="text-[11px] font-extrabold text-slate-700 leading-relaxed tracking-tight">
                  Bridging world-class surgical precision directly to your home district. Prioritize hometown consultations, seamless cashless TPA admissions, and rapid 24-hour mobility recovery.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: FIRST HORIZONTAL CARD (LIKE HOME PAGE HERO SECTION)
          + UNIFORM SIZED REGIONAL CARDS IN ALTERNATING UP & DOWN COLUMNS
      ────────────────────────────────────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-2 sm:pb-3 space-y-4 sm:space-y-5">

        {/* ═════════════════════════════════════════════════════════════════
            TOP FIRST CARD: DESIGNED LIKE THE FIRST SECTION OF HOME PAGE
        ═════════════════════════════════════════════════════════════════ */}
        {topMainHospital && (
          <div className="space-y-1.5">
            {/* The First Horizontal Card (Home Page Hero Style) */}
            <div
              className="relative w-full rounded-2xl overflow-hidden bg-[#030712] text-[#F8FAFC] border border-white/10 shadow-xl p-4 sm:p-5 lg:p-6 select-none"
            >
              {/* Ambient Scientific Lighting Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#38BDF8]/15 blur-[140px] -z-10" />
                <div className="absolute bottom-1/3 left-1/5 w-[350px] h-[350px] rounded-full bg-[#08284D]/40 blur-[130px] -z-10" />
                <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-[#10B981]/10 blur-[150px] -z-10" />
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px]" />
              </div>

              {/* Grid: Left Column Text & Credentials, Right Column Clean Building Photo */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center">

                {/* Left Column (7 Cols) */}
                <div className="lg:col-span-7 space-y-2.5">
                  {/* Hospital Headline with WaveGradientText */}
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                      <WaveGradientText words={["Khetan", "Hospital", "Gorakhpur"]} />
                    </div>

                    <h2 className="text-sm sm:text-base font-bold text-sky-300 tracking-tight">
                      Joint Replacement &amp; Comprehensive Surgical Care
                    </h2>
                  </div>

                  {/* Address & Travel Info */}
                  <p className="text-xs text-slate-300 leading-relaxed font-light max-w-xl">
                    Equipped with dedicated laminar flow modular operating theatres, sub-millimeter robotic navigation, 24/7 emergency trauma care, and rapid 24-hour mobility recovery protocols.
                  </p>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3.5 text-xs font-mono text-slate-400 pt-0.5">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" />
                      <span>{topMainHospital.address}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Mon-Sat: 9:00 AM - 8:00 PM (24/7 Emergency)</span>
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onBookClick && onBookClick()}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 text-xs sm:text-[13px] font-bold tracking-wide shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 group cursor-pointer"
                    >
                      <span>Book Priority Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedLocation(topMainHospital)}
                      className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-[13px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Hospital Profile</span>
                      <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                    </button>

                    <a
                      href={`tel:${topMainHospital.phone}`}
                      className="px-3.5 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{topMainHospital.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Authentic Hospital Building Photograph (Completely Clean without overlays) */}
                <div className="lg:col-span-5 relative flex justify-center items-center">
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-slate-900 group">
                    <img
                      src="/images/khetan-hospital-building.webp"
                      alt="Khetan Multi Speciality Hospital Building, Gorakhpur"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                    />

                    {/* Subtle bottom gradient only */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ── REGIONAL OUTREACH HUBS HEADER ── */}
        <div className="flex items-baseline justify-between pt-1 border-t border-slate-200/80 pb-0.5">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            {searchQuery
              ? `Centres Matching "${searchQuery}"`
              : 'Regional Outreach Consultation Centres'}
          </h2>
        </div>

        {/* ── ALTERNATING UP & DOWN COLUMNS OF UNIFORM SIZED REGIONAL CARDS ── */}
        {remainingLocations.length > 0 ? (
          <>
            {/* Desktop: 3-Column Alternating Up / Down / Up (lg & up) */}
            <div className="hidden lg:grid grid-cols-3 gap-4 lg:gap-5 items-start">
              {/* Column 0: UP (pt-0) */}
              <div className="flex flex-col gap-4 lg:gap-5 pt-0">
                {cols3[0].map((loc, idx) => renderCard(loc, `col0-${loc.title}-${idx}`))}
              </div>

              {/* Column 1: DOWN (Subtle stagger of just 12px instead of 64px) */}
              <div className="flex flex-col gap-4 lg:gap-5 pt-3">
                {cols3[1].map((loc, idx) => renderCard(loc, `col1-${loc.title}-${idx}`))}
              </div>

              {/* Column 2: UP (pt-0) */}
              <div className="flex flex-col gap-4 lg:gap-5 pt-0">
                {cols3[2].map((loc, idx) => renderCard(loc, `col2-${loc.title}-${idx}`))}
              </div>
            </div>

            {/* Mobile & Tablet: 2-Column Alternating Up / Down (md & down) */}
            <div className="grid lg:hidden grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 items-start">
              {/* Column 0: UP (pt-0) */}
              <div className="flex flex-col gap-3.5 sm:gap-4 pt-0">
                {cols2[0].map((loc, idx) => renderCard(loc, `mob0-${loc.title}-${idx}`))}
              </div>

              {/* Column 1: DOWN (Subtle stagger of just 12px on sm) */}
              <div className="flex flex-col gap-3.5 sm:gap-4 pt-0 sm:pt-3">
                {cols2[1].map((loc, idx) => renderCard(loc, `mob1-${loc.title}-${idx}`))}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border-0 shadow-md max-w-lg mx-auto">
            <MapPin className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">No centres found matching "{searchQuery}"</h3>
            <p className="text-xs font-extrabold text-slate-500 tracking-tight mt-1.5">Try searching for Gorakhpur, Deoria, Basti, Kushinagar, or Bihar.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('All');
              }}
              className="mt-5 px-6 py-2.5 rounded-full text-xs font-extrabold tracking-tight bg-[#08284d] text-white hover:bg-sky-700 transition-colors cursor-pointer shadow-xs"
            >
              Clear Search &amp; Show All
            </button>
          </div>
        )}

      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: IN-DEPTH LOCATION DETAILS MODAL (On Card Click)
      ────────────────────────────────────────────────────────────── */}
      {selectedLocation && (
        <div
          className="fixed inset-0 z-[200] overflow-y-auto bg-black/75 backdrop-blur-sm p-4 sm:p-6 md:p-8 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setSelectedLocation(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[86vh] my-auto overflow-hidden shadow-2xl border-0 flex flex-col relative z-[210]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#08284d] text-white flex items-center justify-between gap-4 shrink-0 shadow-xs">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-sky-300 block mb-0.5">
                  KHETAN HOSPITAL &bull; REGIONAL CONSULTATION PROFILE
                </span>
                <h2 className="text-sm sm:text-lg font-bold text-white line-clamp-1">
                  {selectedLocation.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-5 flex-1 text-slate-700 text-xs sm:text-sm leading-relaxed">

              {/* Photo & Badge Hero */}
              <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={locationImages[selectedLocation.title] || locationImages[selectedLocation.city] || '/images/locations/faceless-robotic-surgery-arm.webp'}
                  alt={selectedLocation.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
                      {selectedLocation.city} CENTRE
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {selectedLocation.title}
                    </h3>
                  </div>
                  {selectedLocation.distance && (
                    <span className="text-[10px] font-mono bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-xs">
                      {selectedLocation.distance}
                    </span>
                  )}
                </div>
              </div>

              {/* Address Strip with Copy & Google Maps Action */}
              <div className="p-4 rounded-xl bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#08284d] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                      Exact Address &amp; Location
                    </span>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {selectedLocation.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyAddress(selectedLocation.address)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-white hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer shadow-2xs"
                  >
                    {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAddress ? 'Copied' : 'Copy'}</span>
                  </button>

                  <a
                    href={getGoogleMapsUrl(selectedLocation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-[#08284d] hover:bg-sky-700 text-white transition-colors cursor-pointer shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Maps</span>
                  </a>
                </div>
              </div>

              {/* Operating OPD Schedule & Timings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-amber-50/70 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#08284d]">
                    <Clock className="w-4 h-4 text-[#f59e0b]" />
                    <span>OPD Consultation Timings</span>
                  </div>
                  <p className="text-xs font-extrabold text-slate-800 pl-6">
                    {selectedLocation.timings}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/70 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#08284d]">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Helpline &amp; Fast-Track Token</span>
                  </div>
                  <p className="text-xs font-extrabold text-slate-800 pl-6">
                    <a href={`tel:${selectedLocation.phone || clinicInfo.phone}`} className="hover:underline">
                      {selectedLocation.phone || clinicInfo.phoneFormatted}
                    </a>
                  </p>
                </div>
              </div>

              {/* Attending Doctors Profile Lockup */}
              <div className="p-4 rounded-xl bg-slate-50 space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  Lead Attending Specialists
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-extrabold">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#08284d] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      VK
                    </div>
                    <div>
                      <span className="text-slate-900 block">Dr. Vatsal Khetan</span>
                      <span className="text-[11px] text-slate-500 font-medium">M.Ch Knee (UK), FRCS (Edinburgh) &bull; Robotic Joint Specialist</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      HK
                    </div>
                    <div>
                      <span className="text-slate-900 block">Dr. Heli Khetan</span>
                      <span className="text-[11px] text-slate-500 font-medium">MS OBGYN (Gold Medalist) &bull; Women's Health &amp; Infertility</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Available Checklist */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Clinical Services Available at this Hub</span>
                </span>
                <div className="p-3.5 rounded-xl bg-slate-50 text-xs font-extrabold text-slate-700 leading-relaxed">
                  {selectedLocation.servicesAvailable}
                </div>
              </div>

              {/* Areas Served / Catchment */}
              {selectedLocation.catchment && (
                <div className="space-y-1.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-sky-700" />
                    <span>Catchment Areas &amp; Towns Served</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLocation.catchment.split(',').map((town, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800"
                      >
                        {town.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Patient Stories for this specific location */}
              {selectedLocation.patientStories && selectedLocation.patientStories.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-slate-200">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <Quote className="w-4 h-4 text-[#f59e0b]" />
                    <span>Real Patient Experiences ({selectedLocation.city})</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedLocation.patientStories.map((story, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-xl bg-slate-50/80 text-xs space-y-2 flex flex-col justify-between"
                      >
                        <p className="text-slate-700 italic leading-relaxed font-extrabold">
                          "{story.quote}"
                        </p>
                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-extrabold">
                          <span className="text-slate-900">{story.name}</span>
                          <span className="text-[#f59e0b]">{story.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-extrabold text-center sm:text-left">
                Need priority OPD token at {selectedLocation.city}? Reserve in advance.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedLocation(null);
                    onBookClick();
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#08284d] hover:bg-sky-700 text-white shadow-xs transition-all cursor-pointer"
                >
                  Book Priority Consultation
                </button>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="px-4 py-2 rounded-full text-xs font-extrabold border-0 bg-slate-200 text-slate-700 hover:bg-slate-300 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: CONVERSATIONAL FAQ STAGE COVERED BY SHUTTER FOOTER
          • Sticky FAQ stage stays in viewport and recesses smoothly in scale & opacity
          • Full-Screen Hospital Shutter Footer rises from bottom like a physical curtain,
            covering everything as on Home Page, Services, Doctor Profile & Research
      ────────────────────────────────────────────────────────────── */}
      <div ref={shutterContainerRef} className="relative w-full -mt-4 sm:-mt-6">
        {/* Sticky FAQ Stage - Shifted close to upper section and cleanly below sticky navbar */}
        <div className="sticky top-[58px] sm:top-[60px] z-10 w-full min-h-[calc(100vh-58px)] sm:min-h-[calc(100vh-60px)] flex flex-col justify-start pt-4 sm:pt-6 pb-8 bg-[#f8fafc] overflow-hidden">
          <motion.div
            style={prefersReducedMotion ? {} : {
              scale: faqScale,
              opacity: faqOpacity,
              y: faqY,
              transformOrigin: 'center center',
            }}
            className="w-full will-change-transform max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3"
          >
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
                <span>WHAT TO ASK ABOUT REGIONAL OUTREACH...</span>
                <span className="text-xl select-none">📍</span>
              </h2>
              <p className="text-xs font-extrabold text-slate-500 tracking-tight mt-1">
                Frequently asked questions regarding our outreach clinics across Eastern UP and Western Bihar.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              {regionalFaqs.map((faq, fIdx) => {
                const isOpen = openFaq === fIdx;
                return (
                  <div
                    key={fIdx}
                    className={`relative rounded-2xl transition-all duration-200 overflow-hidden ${isOpen
                      ? 'bg-white border-2 border-[#08284d] shadow-sm'
                      : 'bg-white border-0 shadow-xs hover:shadow-md'
                      }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                      className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left cursor-pointer transition-colors"
                    >
                      <span className="text-xs sm:text-sm font-extrabold tracking-tight text-slate-900 pr-3">
                        {faq.q}
                      </span>

                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'bg-[#08284d] text-white rotate-90' : 'bg-slate-100 text-slate-600'
                        }`}>
                        {isOpen ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-3.5 sm:p-4 pt-0 text-xs text-slate-700 leading-relaxed font-extrabold tracking-tight border-t border-slate-100">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Shutter Footer: Heavy physical curtain rising from bottom and covering everything */}
        <div className="relative z-20 w-full">
          <Footer ref={footerRef} isShutter={true} onBookClick={onBookClick} />
        </div>
      </div>

    </div>
  );
};

export default LocationsPage;
