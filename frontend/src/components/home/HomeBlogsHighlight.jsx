import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { allBlogs } from '../../data/clinicContent';

export const HomeBlogsHighlight = () => {
  // Select 3 featured patient guides
  const featuredGuides = allBlogs.slice(0, 3);

  return (
    <section className="relative w-full bg-white border-b border-slate-200/90 py-10 sm:py-14 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-mono font-bold uppercase tracking-wider">
              <BookOpen className="w-3 h-3 text-amber-600" />
              <span>Doctor-Curated Insights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08284d] tracking-tight">
              Patient Recovery &amp; Joint Health Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Clear, evidence-backed advice authored by Dr. Vatsal Khetan to help you understand robotic knee surgery, home recovery, and joint preservation.
            </p>
          </div>

          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 bg-white text-slate-800 text-xs font-bold hover:bg-[#08284d] hover:text-white hover:border-[#08284d] transition-all duration-300 shadow-2xs group self-start sm:self-auto cursor-pointer"
          >
            <span>Explore All Patient Guides</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Editorial Grid - Catchy Up & Down Myntra Rhythm */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start pb-4">
          {featuredGuides.map((guide, idx) => {
            const isDown = idx === 1; // Middle card shifted down in Myntra rhythm
            return (
              <div
                key={guide.id || idx}
                className={`transition-all duration-300 ${isDown ? 'md:pt-10' : 'md:pt-0'}`}
              >
                <Link
                  to="/blogs"
                  className="bg-white rounded-2xl border-2 border-slate-900 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-sky-600 transition-all duration-300 flex flex-col justify-between group cursor-pointer p-3.5 sm:p-4 h-full"
                >
                  {/* Thumbnail with inside padding & rounded corners */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0">
                    <img
                      src={guide.featuredImage || '/images/dr-vatsal-rehab.webp'}
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/dr-vatsal-rehab.webp';
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#08284d]/90 backdrop-blur-xs text-white text-[9.5px] font-mono font-bold uppercase tracking-wider shadow-xs">
                        {guide.category || 'Orthopaedics'}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="pt-3.5 sm:pt-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2 h-10 sm:h-11 flex items-start">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-2 h-8 sm:h-9">
                        {guide.excerpt || guide.textContent?.slice(0, 120)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3 text-amber-500" />
                        <span>{guide.readTime || '3 min read'}</span>
                      </span>

                      <span className="font-bold text-[#08284d] group-hover:text-sky-600 inline-flex items-center gap-1 transition-colors">
                        <span>Read Article</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HomeBlogsHighlight;
