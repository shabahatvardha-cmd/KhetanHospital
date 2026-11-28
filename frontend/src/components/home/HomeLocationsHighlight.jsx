import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, ArrowRight, MapPin } from 'lucide-react';
import { allLocations } from '../../data/clinicContent';

const LOCATION_CARD_THEMES = [
  {
    // 0: Gorakhpur (Main Surgical Hospital) - Sapphire & Royal Sky
    cardBg: 'bg-gradient-to-br from-blue-50/95 via-sky-50/50 to-white',
    border: 'border-sky-300/90 hover:border-sky-500',
    shadow: 'shadow-md shadow-sky-500/10 hover:shadow-xl hover:shadow-sky-500/20',
    badge: 'bg-[#08284d] text-white',
    cityTitle: 'text-[#08284d]',
    title: 'text-slate-900 group-hover:text-sky-800',
    clockIcon: 'text-sky-600',
    linkText: 'text-sky-700 hover:text-sky-900',
    distanceText: 'text-sky-700 font-bold',
    divider: 'border-sky-200/70',
    ring: 'ring-2 ring-sky-400/25',
    topBar: 'bg-gradient-to-r from-sky-400 to-blue-600',
  },
  {
    // 1: Deoria (Outreach Centre) - Emerald & Jade Green
    cardBg: 'bg-gradient-to-br from-emerald-50/95 via-teal-50/50 to-white',
    border: 'border-emerald-300/90 hover:border-emerald-500',
    shadow: 'shadow-md shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/20',
    badge: 'bg-emerald-700 text-white',
    cityTitle: 'text-emerald-950',
    title: 'text-slate-900 group-hover:text-emerald-800',
    clockIcon: 'text-emerald-600',
    linkText: 'text-emerald-700 hover:text-emerald-900',
    distanceText: 'text-emerald-700 font-bold',
    divider: 'border-emerald-200/70',
    ring: 'ring-1 ring-emerald-400/20',
    topBar: 'bg-gradient-to-r from-emerald-400 to-teal-600',
  },
  {
    // 2: Basti (Outreach Centre) - Warm Amber & Golden Honey
    cardBg: 'bg-gradient-to-br from-amber-50/95 via-yellow-50/50 to-white',
    border: 'border-amber-300/90 hover:border-amber-500',
    shadow: 'shadow-md shadow-amber-500/10 hover:shadow-xl hover:shadow-amber-500/20',
    badge: 'bg-amber-700 text-white',
    cityTitle: 'text-amber-950',
    title: 'text-slate-900 group-hover:text-amber-900',
    clockIcon: 'text-amber-600',
    linkText: 'text-amber-800 hover:text-amber-950',
    distanceText: 'text-amber-800 font-bold',
    divider: 'border-amber-200/70',
    ring: 'ring-1 ring-amber-400/20',
    topBar: 'bg-gradient-to-r from-amber-400 to-orange-500',
  },
  {
    // 3: Padrauna / Kushinagar (Outreach Centre) - Royal Indigo & Purple
    cardBg: 'bg-gradient-to-br from-indigo-50/95 via-purple-50/50 to-white',
    border: 'border-indigo-300/90 hover:border-indigo-500',
    shadow: 'shadow-md shadow-indigo-500/10 hover:shadow-xl hover:shadow-indigo-500/20',
    badge: 'bg-indigo-700 text-white',
    cityTitle: 'text-indigo-950',
    title: 'text-slate-900 group-hover:text-indigo-800',
    clockIcon: 'text-indigo-600',
    linkText: 'text-indigo-700 hover:text-indigo-900',
    distanceText: 'text-indigo-700 font-bold',
    divider: 'border-indigo-200/70',
    ring: 'ring-1 ring-indigo-400/20',
    topBar: 'bg-gradient-to-r from-indigo-400 to-purple-600',
  },
];

export const HomeLocationsHighlight = ({ onBookClick }) => {
  const sectionRef = useRef(null);

  // Track section scroll progression bidirectionally
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Section Header: Slides from left of screen and stays visible
  const textX = useTransform(scrollYProgress, [0.04, 0.22], [-40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.04, 0.18], [0.3, 1]);

  // CTA Button: Smooth entrance and stays visible
  const buttonX = useTransform(scrollYProgress, [0.06, 0.24], [40, 0]);
  const buttonOpacity = useTransform(scrollYProgress, [0.06, 0.20], [0.3, 1]);

  // Staggered pop up for each card: pops into view and STAYS solid and interactive
  // Card 1
  const card1Y = useTransform(scrollYProgress, [0.06, 0.22], [40, 0]);
  const card1Scale = useTransform(scrollYProgress, [0.06, 0.22], [0.94, 1]);
  const card1Opacity = useTransform(scrollYProgress, [0.06, 0.18], [0.3, 1]);

  // Card 2
  const card2Y = useTransform(scrollYProgress, [0.09, 0.25], [40, 0]);
  const card2Scale = useTransform(scrollYProgress, [0.09, 0.25], [0.94, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0.09, 0.21], [0.3, 1]);

  // Card 3
  const card3Y = useTransform(scrollYProgress, [0.12, 0.28], [40, 0]);
  const card3Scale = useTransform(scrollYProgress, [0.12, 0.28], [0.94, 1]);
  const card3Opacity = useTransform(scrollYProgress, [0.12, 0.24], [0.3, 1]);

  // Card 4
  const card4Y = useTransform(scrollYProgress, [0.15, 0.31], [40, 0]);
  const card4Scale = useTransform(scrollYProgress, [0.15, 0.31], [0.94, 1]);
  const card4Opacity = useTransform(scrollYProgress, [0.15, 0.27], [0.3, 1]);

  const cardTransforms = [
    { y: card1Y, scale: card1Scale, opacity: card1Opacity },
    { y: card2Y, scale: card2Scale, opacity: card2Opacity },
    { y: card3Y, scale: card3Scale, opacity: card3Opacity },
    { y: card4Y, scale: card4Scale, opacity: card4Opacity },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-slate-50 border-b border-slate-200/90 pt-4 sm:pt-6 pb-10 sm:pb-14 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">

        {/* Section Header: Slides from left of screen */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <motion.div
            style={{ x: textX, opacity: textOpacity }}
            className="space-y-1.5 max-w-2xl will-change-transform"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08284d] tracking-tight">
              Hospital &amp; Regional Outreach Centres
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Serving patients across Eastern Uttar Pradesh and Western Bihar with regular specialist OPDs and advanced surgical care at our main Gorakhpur hospital.
            </p>
          </motion.div>

          <motion.div
            style={{ x: buttonX, opacity: buttonOpacity }}
            className="self-start sm:self-auto will-change-transform"
          >
            <Link
              to="/locations"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 bg-white text-slate-800 text-xs font-bold hover:bg-[#08284d] hover:text-white hover:border-[#08284d] transition-all duration-300 shadow-2xs group cursor-pointer"
            >
              <span>View All Clinic Details &amp; Maps</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* 4-Card Locations Grid: Spacious gap & compact heading-styled cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 [perspective:1000px]">
          {allLocations.slice(0, 4).map((loc, idx) => {
            const isMain = loc.isMain || idx === 0;
            const theme = LOCATION_CARD_THEMES[idx % LOCATION_CARD_THEMES.length];
            const transform = cardTransforms[idx];

            // Simplified punchy title for small card format
            const cleanTitle = isMain
              ? 'Main Surgical Centre'
              : loc.title.replace(' Patient Care & Consultation Centre', ' Consultation Centre').replace(' Patient Consultation Centre', ' Outreach Centre');

            const timingText = isMain
              ? 'Mon - Sat: 9 AM – 8 PM'
              : loc.timings.replace(' (Prior booking mandatory)', '');

            return (
              <motion.div
                key={idx}
                style={{
                  y: transform.y,
                  scale: transform.scale,
                  opacity: transform.opacity,
                  transformOrigin: 'bottom center',
                }}
                className={`rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between border transition-all duration-300 relative group overflow-hidden ${theme.cardBg} ${theme.border} ${theme.shadow} ${isMain ? theme.ring : ''} will-change-transform min-h-[148px] sm:min-h-[158px]`}
              >
                {/* Subtle colorful top accent bar */}
                <div className={`absolute top-0 inset-x-0 h-1 ${theme.topBar}`} />

                <div className="space-y-2 pt-0.5">
                  {/* Top: City & Badge (Heading style) */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-base sm:text-lg font-black tracking-tight ${theme.cityTitle}`}>
                      {loc.city}
                    </span>
                    <span
                      className={`text-[9.5px] font-mono font-bold uppercase px-2 py-0.5 rounded-md shrink-0 shadow-2xs ${theme.badge}`}
                    >
                      {isMain ? 'Main Hospital' : 'Outreach Centre'}
                    </span>
                  </div>

                  {/* Centre Heading Title (Heading style only) */}
                  <div>
                    <h3 className={`text-sm sm:text-[15px] font-extrabold tracking-tight leading-snug transition-colors ${theme.title}`}>
                      {cleanTitle}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                      <Clock className={`w-3.5 h-3.5 shrink-0 ${theme.clockIcon}`} />
                      <span className="truncate">{timingText}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Trigger: Distance Hub & Details Link */}
                <div className={`pt-2.5 mt-2 border-t flex items-center justify-between text-xs ${theme.divider}`}>
                  <span className={`text-[10.5px] font-mono ${theme.distanceText}`}>
                    {loc.distance ? loc.distance.split('(')[0].trim() : 'Central Hub'}
                  </span>
                  <Link
                    to="/locations"
                    className={`font-extrabold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-all ${theme.linkText}`}
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HomeLocationsHighlight;
