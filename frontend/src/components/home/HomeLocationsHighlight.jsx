import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Phone, Navigation, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { allLocations } from '../../data/clinicContent';

/**
 * 🏥 SCENE 7 — PURVANCHAL REGIONAL CONSULTATION NETWORK
 * 
 * Interactive geographic network experience connecting Gorakhpur Central Hospital
 * with regional specialist outreach clinics across Eastern UP and Western Bihar.
 */
export const HomeLocationsHighlight = ({ onBookClick }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeLoc = allLocations[selectedIdx] || allLocations[0];

  return (
    <section className="relative w-full bg-[#030712] border-b border-white/10 py-14 sm:py-20 select-none text-[#F8FAFC] overflow-hidden">
      {/* Living Ambient Lighting Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500 blur-[160px] -z-10"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Purvanchal Outreach Network &bull; Scene 7</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Hospital &amp; Regional Outreach Centres
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Serving patients across Eastern Uttar Pradesh and Western Bihar with regular specialist consultation clinics and advanced robotic surgery at our main Gorakhpur hospital.
            </p>
          </div>

          <Link
            to="/locations"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.05] text-white text-xs font-bold hover:bg-white/[0.1] hover:border-cyan-400 transition-all duration-300 shadow-md group self-start sm:self-auto cursor-pointer"
          >
            <span>View All Clinic Details &amp; Maps</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Interactive Network Stage: Visual Connectivity Diagram + Active Hub Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Left: Interactive Regional Route Selector (5 Cols) */}
          <div className="lg:col-span-5 bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                Select Regional Consultation Hub
              </span>

              {/* Location Selector Tabs */}
              <div className="space-y-2 pt-1">
                {allLocations.slice(0, 4).map((loc, idx) => {
                  const isSelected = idx === selectedIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedIdx(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-md'
                          : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-mono font-bold text-xs ${
                            isSelected ? 'bg-cyan-400 text-slate-950 font-black' : 'bg-white/10 text-slate-400'
                          }`}
                        >
                          {idx === 0 ? 'HUB' : `0${idx}`}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">{loc.city}</div>
                          <div className="text-[10px] text-slate-400 font-light truncate">{loc.title}</div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono shrink-0 ml-2 ${isSelected ? 'text-cyan-300 font-bold' : 'text-slate-500'}`}>
                        {idx === 0 ? 'Main Hospital' : 'Outreach'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hub Quick Hotline */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Gorakhpur Surgical Hub:</span>
              <a href="tel:9662365917" className="text-cyan-300 font-bold hover:underline">
                +91 96623 65917
              </a>
            </div>
          </div>

          {/* Right: Active Hub Telemetry & Full Clinical Address (7 Cols) */}
          <div className="lg:col-span-7 bg-[#071326]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col justify-between space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLoc.city}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                {/* Header Lockup */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {selectedIdx === 0 ? 'Main Surgical Hospital Hub' : 'Regional Outreach Centre'}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeLoc.distance || 'Central Surgical Hub'}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {activeLoc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light flex items-start gap-2 pt-1">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{activeLoc.address}</span>
                  </p>
                </div>

                {/* Timings & Contact Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <div className="text-[10.5px] font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Clinic Timings</span>
                    </div>
                    <div className="text-xs text-slate-200 font-medium">
                      {activeLoc.timings || 'Mon - Sat: 9:00 AM – 8:00 PM'}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <div className="text-[10.5px] font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Helpline Contact</span>
                    </div>
                    <div className="text-xs text-slate-200 font-medium">
                      {activeLoc.phone || '+91 96623 65917'}
                    </div>
                  </div>
                </div>

                {/* Catchment & Services Available */}
                {activeLoc.servicesAvailable && (
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-slate-300 font-light space-y-1">
                    <span className="font-bold text-white font-mono uppercase text-[10px]">Specialist Services:</span>
                    <p>{activeLoc.servicesAvailable}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <Link
                to="/locations"
                className="px-6 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
              >
                <span>View Centre Schedule &amp; Maps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => onBookClick && onBookClick()}
                className="px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/10 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Book Consultation
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HomeLocationsHighlight;
