import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { allBlogs } from '../../data/clinicContent';
import { TiltSpotlightCard } from '../motion/TiltSpotlightCard';

/**
 * 🏥 SCENE 8 — PATIENT RECOVERY & JOINT HEALTH GUIDES (EDITORIAL MAGAZINE RHYTHM)
 * 
 * Evidence-based surgical guides authored by Dr. Vatsal Khetan.
 * Features an alternating editorial composition with large lead feature and secondary paired guides.
 */
export const HomeBlogsHighlight = () => {
  const featuredGuides = allBlogs.slice(0, 3);
  const leadArticle = featuredGuides[0] || {};
  const secondaryArticles = featuredGuides.slice(1, 3);

  return (
    <section className="relative w-full bg-[#030712] border-b border-white/10 py-14 sm:py-20 select-none text-[#F8FAFC] overflow-hidden">
      {/* Living Ambient Lighting Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 w-[520px] h-[520px] rounded-full bg-cyan-500 blur-[160px] -z-10"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Doctor-Authored Guides &bull; Scene 8</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Patient Recovery &amp; Joint Health Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Clear, evidence-backed advice authored by Dr. Vatsal Khetan to help you understand robotic knee surgery, home rehabilitation, and joint longevity.
            </p>
          </div>

          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.05] text-white text-xs font-bold hover:bg-white/[0.1] hover:border-cyan-400 transition-all duration-300 shadow-md group self-start sm:self-auto cursor-pointer"
          >
            <span>Explore All Patient Guides</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Editorial Asymmetric Grid: 1 Large Lead Feature + 2 Stacked Secondary Guides */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Lead Feature Guide (7 Cols) */}
          {leadArticle.title && (
            <div className="lg:col-span-7 flex flex-col">
              <TiltSpotlightCard
                maxTilt={5}
                spotlightColor="rgba(56, 189, 248, 0.2)"
                borderColor="rgba(56, 189, 248, 0.5)"
                className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/10 p-5 sm:p-7 shadow-xl flex flex-col justify-between h-full group"
              >
                <Link to="/blogs" className="flex flex-col justify-between h-full cursor-pointer space-y-4">
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#071326] border border-white/10 shrink-0">
                    <img
                      src="/images/dr-vatsal-rehab.webp"
                      alt={leadArticle.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 select-none"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-md bg-[#030712]/90 border border-white/15 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                        Featured Recovery Protocol
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {leadArticle.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed line-clamp-3">
                        {leadArticle.excerpt || leadArticle.textContent?.slice(0, 160)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="inline-flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{leadArticle.readTime || '4 min read'}</span>
                      </span>

                      <span className="font-bold text-cyan-400 group-hover:text-cyan-300 inline-flex items-center gap-1 transition-colors">
                        <span>Read Full Guide</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltSpotlightCard>
            </div>
          )}

          {/* Secondary Paired Guides (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {secondaryArticles.map((guide, idx) => (
              <TiltSpotlightCard
                key={guide.id || idx}
                delay={0.15 * (idx + 1)}
                maxTilt={5}
                spotlightColor="rgba(56, 189, 248, 0.18)"
                borderColor="rgba(56, 189, 248, 0.45)"
                className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/10 p-5 shadow-xl flex-1 group"
              >
                <Link to="/blogs" className="flex flex-col sm:flex-row gap-4 h-full cursor-pointer justify-between">
                  <div className="relative aspect-[16/10] sm:w-36 h-28 sm:h-auto rounded-xl overflow-hidden bg-[#071326] border border-white/10 shrink-0">
                    <img
                      src={idx === 0 ? '/images/surgeries/robotic-knee.webp' : '/images/surgeries/happy-knee-walk.webp'}
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 select-none"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <span className="text-[9.5px] font-mono text-cyan-400 font-bold uppercase">
                        {guide.category || 'Orthopaedics'}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                        {guide.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-slate-400 border-t border-white/5">
                      <span>{guide.readTime || '3 min read'}</span>
                      <span className="text-cyan-400 font-bold flex items-center gap-1">
                        <span>Read</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltSpotlightCard>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default HomeBlogsHighlight;
