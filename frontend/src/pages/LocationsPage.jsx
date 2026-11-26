import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowRight, CheckCircle2, Navigation, Quote, ChevronRight } from 'lucide-react';
import { allLocations } from '../data/clinicContent';

export const LocationsPage = ({ onBookClick }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 1. Oreo Interior Breadcrumb Banner */}
      <section className="bg-[#edf1f5] border-b border-slate-200/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#00bcd4] inline-block rounded-full"></span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                Consultation <span className="font-normal text-slate-600">Centres &amp; Outreach</span>
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1 pl-3.5">
              Serving patients across Eastern Uttar Pradesh &amp; Western Bihar
            </p>
          </div>
        </div>
      </section>

      {/* 2. Locations List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
        
        {allLocations.map((loc, idx) => (
          <div 
            key={idx}
            className={`rounded-2xl p-6 sm:p-8 border transition-all ${
              loc.isMain 
                ? 'bg-white border-[#00bcd4] shadow-md ring-2 ring-[#00bcd4]/10' 
                : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md'
            }`}
          >
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-start gap-3.5">
                <div className={`p-3 rounded-2xl flex-shrink-0 ${loc.isMain ? 'bg-sky-50 text-[#00bcd4]' : 'bg-slate-100 text-slate-600'}`}>
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {loc.title}
                    </h3>
                    {loc.isMain ? (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-[#00bcd4]">
                        MAIN SURGICAL HOSPITAL
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        REGIONAL OUTREACH
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 max-w-xl">
                    {loc.desc}
                  </p>
                </div>
              </div>

              <button 
                onClick={onBookClick}
                className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#ff5722] hover:bg-[#e64a19] text-white shadow-xs transition-all shrink-0 cursor-pointer"
              >
                <span>Book Consultation</span>
              </button>
            </div>

            {/* Timings, Phone, Catchment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-5 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Clock className="w-4 h-4 text-[#00bcd4] flex-shrink-0" />
                <span><strong>Hours:</strong> {loc.timings}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Phone className="w-4 h-4 text-[#ff5722] flex-shrink-0" />
                <span><strong>Helpline:</strong> {loc.phone}</span>
              </div>
              {loc.catchment && (
                <div className="flex items-center gap-2 text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100 sm:col-span-2 md:col-span-1">
                  <Navigation className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Areas Served:</strong> {loc.catchment}</span>
                </div>
              )}
            </div>

            {/* Facilities Note */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Services:</strong> {loc.servicesAvailable}</span>
            </div>

            {/* Local Patient Stories for this city */}
            {loc.patientStories && loc.patientStories.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Quote className="w-3.5 h-3.5 text-[#ff5722]" />
                  What {loc.city} Patients Say:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {loc.patientStories.map((story, sIdx) => (
                    <div key={sIdx} className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 text-xs space-y-2 flex flex-col justify-between">
                      <p className="text-slate-600 italic leading-relaxed">
                        "{story.quote}"
                      </p>
                      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                        <span className="font-bold text-slate-800">{story.name}</span>
                        <span className="text-[10px] text-[#ff5722] font-semibold">{story.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ))}

      </section>

    </div>
  );
};
