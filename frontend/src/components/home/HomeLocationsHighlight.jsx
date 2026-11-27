import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Navigation, CheckCircle2, Building2 } from 'lucide-react';
import { allLocations } from '../../data/clinicContent';

export const HomeLocationsHighlight = ({ onBookClick }) => {
  return (
    <section className="relative w-full bg-slate-50 border-b border-slate-200/90 py-10 sm:py-14 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-mono font-bold uppercase tracking-wider">
              <MapPin className="w-3 h-3 text-sky-600" />
              <span>Purvanchal Consultation Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08284d] tracking-tight">
              Hospital &amp; Regional Outreach Centres
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Serving patients across Eastern Uttar Pradesh and Western Bihar with regular specialist OPDs and advanced surgical care at our main Gorakhpur hospital.
            </p>
          </div>

          <Link
            to="/locations"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 bg-white text-slate-800 text-xs font-bold hover:bg-[#08284d] hover:text-white hover:border-[#08284d] transition-all duration-300 shadow-2xs group self-start sm:self-auto cursor-pointer"
          >
            <span>View All Clinic Details &amp; Maps</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Card Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {allLocations.slice(0, 4).map((loc, idx) => {
            const isMain = loc.isMain || idx === 0;

            return (
              <div
                key={idx}
                className={`rounded-2xl p-4 sm:p-5 flex flex-col justify-between border transition-all duration-300 ${
                  isMain
                    ? 'bg-white border-sky-400 shadow-md ring-2 ring-sky-400/20'
                    : 'bg-white border-slate-300/85 shadow-2xs hover:shadow-md hover:border-slate-400'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9.5px] font-mono font-bold uppercase px-2 py-0.5 rounded-md ${
                        isMain
                          ? 'bg-[#08284d] text-white'
                          : 'bg-slate-100 text-slate-600'
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
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {loc.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-light mt-1 line-clamp-2">
                      {loc.address}
                    </p>
                  </div>

                  {/* Timings */}
                  <div className="pt-2 border-t border-slate-100 flex items-start gap-1.5 text-[11px] text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-2 font-medium">
                      {loc.timings}
                    </span>
                  </div>
                </div>

                {/* Bottom Trigger */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    {loc.distance || 'Centre Hub'}
                  </span>
                  <Link
                    to="/locations"
                    className="text-xs font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HomeLocationsHighlight;
