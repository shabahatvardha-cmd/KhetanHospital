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

        {/* 3-Column Editorial Grid with Dynamic Up-and-Down Staggering */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {featuredGuides.map((guide, idx) => {
            // Dynamic wave offset: Card 1 sits at top, Card 2 dips down by 36px, Card 3 sits midway
            const offsetClass = idx === 1 ? 'md:mt-8 lg:mt-10' : idx === 2 ? 'md:mt-3 lg:mt-4' : 'md:mt-0';

            return (
              <Link
                key={guide.id || idx}
                to="/blogs"
                className={`bg-white rounded-2xl border border-slate-300/85 overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1.5 hover:border-sky-400 transition-all duration-300 flex flex-col justify-between group cursor-pointer ${offsetClass}`}
              >
                {/* Thumbnail with Fine Bottom Divider */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-200/85">
                  <img
                    src={guide.featuredImage || '/images/dr-vatsal-rehab.webp'}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-2">
                      {guide.excerpt || guide.textContent?.slice(0, 120)}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
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
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HomeBlogsHighlight;
