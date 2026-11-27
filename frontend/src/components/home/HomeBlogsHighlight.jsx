import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { allBlogs } from '../../data/clinicContent';
import { TiltSpotlightCard } from '../motion/TiltSpotlightCard';

export const HomeBlogsHighlight = () => {
  const featuredGuides = allBlogs.slice(0, 3);

  return (
    <section className="relative w-full bg-[#030712] border-b border-white/10 py-12 sm:py-16 select-none text-white overflow-hidden">
      {/* Living Ambient Lighting Node */}
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              <BookOpen className="w-3 h-3 text-amber-400" />
              <span>Doctor-Curated Insights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Patient Recovery &amp; Joint Health Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Clear, evidence-backed advice authored by Dr. Vatsal Khetan to help you understand robotic knee surgery, home recovery, and joint preservation.
            </p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.05] text-white text-xs font-bold hover:bg-white/[0.1] hover:border-cyan-400 transition-all duration-300 shadow-md group self-start sm:self-auto cursor-pointer"
            >
              <span>Explore All Patient Guides</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* 3-Column Editorial Grid with 3D Tilt Cards & Catchy Swiss/Myntra Rhythm */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start pb-4">
          {featuredGuides.map((guide, idx) => {
            const isDown = idx === 1;
            return (
              <div
                key={guide.id || idx}
                className={`transition-all duration-300 ${isDown ? 'md:pt-8' : 'md:pt-0'}`}
              >
                <TiltSpotlightCard
                  delay={idx * 0.12}
                  maxTilt={6}
                  spotlightColor="rgba(56, 189, 248, 0.2)"
                  borderColor="rgba(56, 189, 248, 0.5)"
                  className="bg-white/[0.03] backdrop-blur-2xl rounded-2xl border border-white/10 shadow-xl p-4 h-full group"
                >
                  <Link
                    to="/blogs"
                    className="flex flex-col justify-between h-full cursor-pointer"
                  >
                    {/* Thumbnail with inside padding & rounded corners */}
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#071326] border border-white/10 shrink-0">
                      <img
                        src={guide.featuredImage || '/images/dr-vatsal-rehab.webp'}
                        alt={guide.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 select-none"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/dr-vatsal-rehab.webp';
                        }}
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#030712]/90 border border-white/15 text-cyan-300 text-[9.5px] font-mono font-bold uppercase tracking-wider shadow-sm">
                          {guide.category || 'Orthopaedics'}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="pt-3.5 sm:pt-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2 h-10 sm:h-11 flex items-start">
                          {guide.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-2 h-8 sm:h-9">
                          {guide.excerpt || guide.textContent?.slice(0, 120)}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                        <span className="inline-flex items-center gap-1 text-slate-400">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>{guide.readTime || '3 min read'}</span>
                        </span>

                        <span className="font-bold text-cyan-400 group-hover:text-cyan-300 inline-flex items-center gap-1 transition-colors">
                          <span>Read Article</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </TiltSpotlightCard>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HomeBlogsHighlight;
