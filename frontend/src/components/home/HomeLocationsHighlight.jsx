import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Building2 } from 'lucide-react';
import { allLocations } from '../../data/clinicContent';
import { TiltSpotlightCard } from '../motion/TiltSpotlightCard';

export const HomeLocationsHighlight = ({ onBookClick }) => {
  return (
    <section className="relative w-full bg-[#030712] border-b border-white/10 py-12 sm:py-16 select-none text-white overflow-hidden">
      {/* Living Ambient Lighting Node */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-[480px] h-[480px] rounded-full bg-cyan-500 blur-[150px] -z-10"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1.5 max-w-2xl"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>Purvanchal Consultation Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Hospital &amp; Regional Outreach Centres
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Serving patients across Eastern Uttar Pradesh and Western Bihar with regular specialist OPDs and advanced surgical care at our main Gorakhpur hospital.
            </p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/locations"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.05] text-white text-xs font-bold hover:bg-white/[0.1] hover:border-cyan-400 transition-all duration-300 shadow-md group self-start sm:self-auto cursor-pointer"
            >
              <span>View All Clinic Details &amp; Maps</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* 4-Card Locations Grid with 3D Tilt & Specular Cursor Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {allLocations.slice(0, 4).map((loc, idx) => {
            const isMain = loc.isMain || idx === 0;

            return (
              <TiltSpotlightCard
                key={idx}
                delay={idx * 0.1}
                maxTilt={6}
                spotlightColor={isMain ? "rgba(56, 189, 248, 0.25)" : "rgba(56, 189, 248, 0.15)"}
                borderColor={isMain ? "rgba(56, 189, 248, 0.6)" : "rgba(56, 189, 248, 0.35)"}
                className={`rounded-2xl p-5 flex flex-col justify-between border transition-all duration-300 backdrop-blur-xl ${
                  isMain
                    ? 'bg-white/[0.06] border-cyan-500/60 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-500/40'
                    : 'bg-white/[0.03] border-white/10 shadow-lg'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9.5px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md ${
                        isMain
                          ? 'bg-cyan-500 text-slate-950 font-black'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {isMain ? 'Main Surgical Hospital' : 'Outreach Centre'}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {loc.city}
                    </span>
                  </div>

                  {/* Title & Address */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {loc.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-light mt-1 line-clamp-2">
                      {loc.address}
                    </p>
                  </div>

                  {/* Timings */}
                  <div className="pt-2 border-t border-white/10 flex items-start gap-1.5 text-[11px] text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2 font-medium">
                      {loc.timings}
                    </span>
                  </div>
                </div>

                {/* Bottom Trigger */}
                <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    {loc.distance || 'Centre Hub'}
                  </span>
                  <Link
                    to="/locations"
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 group/link"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </TiltSpotlightCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HomeLocationsHighlight;
