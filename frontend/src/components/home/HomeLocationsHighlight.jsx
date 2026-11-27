import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Building2, Navigation } from 'lucide-react';
import { allLocations } from '../../data/clinicContent';

export const HomeLocationsHighlight = ({ onBookClick }) => {
  return (
    <section className="relative w-full bg-slate-50/70 border-b border-slate-200/90 py-12 sm:py-16 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-[10px] font-mono font-bold uppercase tracking-wider">
              <MapPin className="w-3 h-3 text-sky-600" />
              <span>Purvanchal Surgical &amp; OPD Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#08284d] tracking-tight">
              Hospital &amp; Regional Outreach Centres
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Providing specialist orthopedic OPDs and robotic joint surgery across Eastern Uttar Pradesh and Western Bihar with our main hospital hub in Gorakhpur.
            </p>
          </div>

          <Link
            to="/locations"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-slate-900 bg-white text-slate-900 text-xs font-bold hover:bg-[#08284d] hover:text-white transition-all duration-300 shadow-2xs group self-start sm:self-auto cursor-pointer"
          >
            <span>View All Clinic Details &amp; Maps</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Card Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {allLocations.slice(0, 4).map((loc, idx) => {
            const isMain = loc.isMain || idx === 0;

            return (
              <div
                key={idx}
                className={`rounded-3xl p-5 flex flex-col justify-between border-2 transition-all duration-300 ${
                  isMain
                    ? 'bg-white border-slate-900 shadow-md ring-2 ring-[#08284d]/10'
                    : 'bg-white border-slate-900 shadow-2xs hover:shadow-lg hover:border-sky-600'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9.5px] font-mono font-black uppercase px-2.5 py-0.5 rounded-md ${
                        isMain
                          ? 'bg-[#08284d] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {isMain ? 'Main Surgical Hospital' : 'Outreach Centre'}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {loc.city}
                    </span>
                  </div>

                  {/* Title & Address */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {loc.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-light mt-1.5 line-clamp-2">
                      {loc.address}
                    </p>
                  </div>

                  {/* Timings */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-start gap-1.5 text-xs text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-2 font-medium">
                      {loc.timings}
                    </span>
                  </div>
                </div>

                {/* Bottom Trigger */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 font-medium">
                    {loc.distance || 'Centre Hub'}
                  </span>
                  <Link
                    to="/locations"
                    className="text-xs font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>View Map</span>
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
