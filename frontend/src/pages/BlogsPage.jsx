import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  Search,
  X,
  User,
  Clock,
  Share2,
  Check,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { allBlogs, clinicInfo } from '../data/clinicContent';
import { KineticDualTitle } from '../components/motion/KineticDualTitle';
import { Footer } from '../components/layout/Footer';

/**
 * 🏥 BLOGS & PATIENT EDUCATION HUB
 * True Myntra-Style 5-Column Staggered Masonry:
 * - Contrasting soft slate background (bg-[#f1f5f9]) so white cards pop with sharp separation
 * - Independent column stacks (5 cols on desktop, 3 on tablet, 2 on mobile)
 * - Alternating vertical top offsets (pt-0, pt-10, pt-2, pt-12, pt-4) with guaranteed gap-5 between items
 * - Zero vertical collisions or overlaps
 * - Minimalist cards (photo + category chip + clamp-2 title + read time) with zero text clutter
 * - In-depth article reader modal on card click
 * - Clean closing banner with zero duplicate footers
 */
export const BlogsPage = ({ onBookClick }) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [copiedLink, setCopiedLink] = useState(false);

  // If URL has a slug parameter, open that blog automatically
  useEffect(() => {
    if (slug) {
      const match = allBlogs.find(b => b.slug === slug || b.slug.includes(slug));
      if (match) setSelectedBlog(match);
    }
  }, [slug]);

  // Lock body scroll when reading card is open
  useEffect(() => {
    if (selectedBlog) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selectedBlog]);

  // Keep search in sync if search params change
  useEffect(() => {
    const q = searchParams.get('q') || searchParams.get('search');
    if (q !== null && q !== undefined) {
      setSearchQuery(q);
    }
  }, [searchParams]);



  // Filtered blogs based on comprehensive search across EVERYTHING (title, excerpt, content, tags)
  const filteredBlogs = useMemo(() => {
    return allBlogs.filter(b => {
      // Category filter (if set from URL parameter)
      if (selectedCategory && selectedCategory !== 'All') {
        const matchesCategory =
          (b.category && b.category.toLowerCase() === selectedCategory.toLowerCase()) ||
          (b.allCategories && b.allCategories.some(c => c.toLowerCase() === selectedCategory.toLowerCase()));
        if (!matchesCategory) return false;
      }

      // If no search query, show all
      if (!searchQuery || !searchQuery.trim()) return true;

      // Multi-word intelligent search: every word in the query must match in the comprehensive article corpus
      const queryWords = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
      const articleCorpus = [
        b.title || '',
        b.excerpt || '',
        b.category || '',
        ...(Array.isArray(b.allCategories) ? b.allCategories : []),
        b.textContent || '',
        b.slug || ''
      ].join(' ').toLowerCase();

      return queryWords.every(word => articleCorpus.includes(word));
    });
  }, [searchQuery, selectedCategory]);

  // Distribute into 5 columns for Desktop (Up / Down / Up / Down / Up)
  const cols5 = useMemo(() => {
    const cols = [[], [], [], [], []];
    filteredBlogs.forEach((blog, idx) => {
      cols[idx % 5].push(blog);
    });
    return cols;
  }, [filteredBlogs]);

  // Distribute into 3 columns for Tablet (Up / Down / Up)
  const cols3 = useMemo(() => {
    const cols = [[], [], []];
    filteredBlogs.forEach((blog, idx) => {
      cols[idx % 3].push(blog);
    });
    return cols;
  }, [filteredBlogs]);

  // Distribute into 2 columns for Mobile (Up / Down)
  const cols2 = useMemo(() => {
    const cols = [[], []];
    filteredBlogs.forEach((blog, idx) => {
      cols[idx % 2].push(blog);
    });
    return cols;
  }, [filteredBlogs]);

  const handleShare = () => {
    if (navigator.clipboard && selectedBlog) {
      const url = `${window.location.origin}/blogs/${selectedBlog.slug}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Reusable card renderer (Uniform dimensions, inside padding, dark border)
  const renderCard = (blog, key) => (
    <article
      key={key}
      onClick={() => setSelectedBlog(blog)}
      className="bg-white rounded-2xl border-2 border-slate-900 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-sky-600 transition-all duration-300 flex flex-col justify-between group cursor-pointer p-3.5 sm:p-4 h-full"
    >
      {/* Featured Image with strict identical aspect ratio and inner rounding */}
      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0">
        <img
          src={blog.featuredImage || '/images/dr-vatsal-rehab.webp'}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/dr-vatsal-rehab.webp';
          }}
        />
      </div>

      {/* Body: Uniform fixed height so all cards line up 100% evenly */}
      <div className="pt-3 flex-1 flex flex-col justify-between space-y-2.5">
        <h3 className="text-xs sm:text-[13px] font-extrabold tracking-tight text-slate-900 group-hover:text-sky-700 transition-colors leading-snug line-clamp-2 h-10 sm:h-11 flex items-start">
          {blog.title}
        </h3>

        {/* Micro Meta Strip */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-extrabold tracking-tight text-slate-500">
          <span className="inline-flex items-center gap-1 text-slate-500">
            <Clock className="w-3 h-3 text-[#f59e0b]" />
            <span>{blog.readTime || '4 min'}</span>
          </span>

          <span className="inline-flex items-center gap-0.5 font-extrabold text-[#08284d] group-hover:text-sky-700 group-hover:translate-x-0.5 transition-all">
            <span>Read</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>
    </article>
  );

  return (
    <div className="relative w-full bg-[#f1f5f9] text-slate-900 select-none overflow-hidden min-h-screen">

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: EDITORIAL HEADER & QUICK SEARCH
      ────────────────────────────────────────────────────────────── */}
      <section className="relative w-full border-b border-slate-200/90 pt-6 sm:pt-8 pb-6 sm:pb-7 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-5">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">

            {/* Left Column: Bold Dual-Box Lockup */}
            <div className="lg:col-span-7 space-y-3">
              <KineticDualTitle
                primaryText="CLINICAL INSIGHTS"
                secondaryText="61 MEDICAL GUIDES"
              />

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight pt-1">
                Orthopedic Recovery Guides &amp; Surgical Checklists
              </h1>

              <p className="text-xs sm:text-sm font-extrabold text-slate-700 leading-relaxed tracking-tight max-w-xl">
                Written and curated directly by Dr. Vatsal Khetan (M.Ch Knee UK, FRCS Edinburgh). Clear, patient-first clinical guidance on robotic joint replacement, rapid 24-hour ambulation, keyhole sports recovery, and arthritis prevention.
              </p>

              {/* Instant Search Bar with Vertically Centered Lens & Popular Topic Tags */}
              <div className="w-full max-w-xl space-y-2.5 pt-1">
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <input
                    type="text"
                    placeholder="Search all guides: Robotic Knee, ACL, Hip, Joint Preservation, Shoulder..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-9 py-2.5 rounded-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 placeholder-slate-400 border border-slate-300 focus:outline-hidden focus:border-[#08284d] text-xs font-extrabold tracking-tight shadow-2xs transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>


              </div>
            </div>

            {/* Right Column: Specification Standard Card (Matched to Authentic Surgical Excellence Font Style) */}
            <div className="lg:col-span-5 space-y-3.5">
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border-l-4 border-l-[#f59e0b] border border-amber-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#08284d] tracking-tight uppercase">
                    KNOWLEDGE SPECIFICATION : 2024
                  </span>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-[#f59e0b] text-[#08284d] tracking-tight">
                    EVIDENCE BACKED
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-snug">
                  Khetan Hospital Patient Education Repository
                </h2>
                <p className="text-xs font-extrabold text-slate-700 leading-relaxed tracking-tight">
                  Every guide bridges complex surgical knowledge into simple, actionable steps. No jargon, no ambiguity—empowering patients and families with transparent clinical clarity.
                </p>
              </div>

              {/* Quick Counter */}
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-extrabold text-slate-700 tracking-tight">
                <span>Showing <strong>{filteredBlogs.length}</strong> of <strong>{allBlogs.length}</strong> guides</span>
                <span className="text-sky-800 font-extrabold">100% Free Access</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: TRUE MYNTRA 5-COLUMN STAGGERED MASONRY
          - Shifted directly up (removed category buttons & huge dead gap)
          - 5 columns on desktop, 3 on tablet, 2 on mobile
      ────────────────────────────────────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-20">

        {/* Clean, tight feed header */}
        <div className="flex items-baseline justify-between pb-3 sm:pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {searchQuery ? `Guides Matching "${searchQuery}"` : 'All Clinical Patient Guides'}
          </h2>
          <span className="text-xs font-extrabold text-slate-500 tracking-tight">
            {filteredBlogs.length} Guides Available
          </span>
        </div>

        {/* ── Myntra Up-and-Down Alternating Staggered Feed ── */}
        {filteredBlogs.length > 0 ? (
          <>
            {/* Desktop: 5-Column Alternating Up / Down (lg & up) */}
            <div className="hidden lg:grid grid-cols-5 gap-5 items-start">
              {/* Column 0: UP */}
              <div className="flex flex-col gap-5 pt-0">
                {cols5[0].map((blog, idx) => renderCard(blog, `col0-${blog.id || idx}`))}
              </div>

              {/* Column 1: DOWN (Shifted down by 64px) */}
              <div className="flex flex-col gap-5 pt-16">
                {cols5[1].map((blog, idx) => renderCard(blog, `col1-${blog.id || idx}`))}
              </div>

              {/* Column 2: UP */}
              <div className="flex flex-col gap-5 pt-0">
                {cols5[2].map((blog, idx) => renderCard(blog, `col2-${blog.id || idx}`))}
              </div>

              {/* Column 3: DOWN (Shifted down by 64px) */}
              <div className="flex flex-col gap-5 pt-16">
                {cols5[3].map((blog, idx) => renderCard(blog, `col3-${blog.id || idx}`))}
              </div>

              {/* Column 4: UP */}
              <div className="flex flex-col gap-5 pt-0">
                {cols5[4].map((blog, idx) => renderCard(blog, `col4-${blog.id || idx}`))}
              </div>
            </div>

            {/* Tablet: 3-Column Alternating Up / Down (md to lg) */}
            <div className="hidden md:grid lg:hidden grid-cols-3 gap-4 items-start">
              {/* Column 0: UP */}
              <div className="flex flex-col gap-4 pt-0">
                {cols3[0].map((blog, idx) => renderCard(blog, `tab0-${blog.id || idx}`))}
              </div>

              {/* Column 1: DOWN (Shifted down by 48px) */}
              <div className="flex flex-col gap-4 pt-12">
                {cols3[1].map((blog, idx) => renderCard(blog, `tab1-${blog.id || idx}`))}
              </div>

              {/* Column 2: UP */}
              <div className="flex flex-col gap-4 pt-0">
                {cols3[2].map((blog, idx) => renderCard(blog, `tab2-${blog.id || idx}`))}
              </div>
            </div>

            {/* Mobile: 2-Column Alternating Up / Down (sm & below) */}
            <div className="grid md:hidden grid-cols-2 gap-3.5 items-start">
              {/* Column 0: UP */}
              <div className="flex flex-col gap-3.5 pt-0">
                {cols2[0].map((blog, idx) => renderCard(blog, `mob0-${blog.id || idx}`))}
              </div>

              {/* Column 1: DOWN (Shifted down by 40px) */}
              <div className="flex flex-col gap-3.5 pt-10">
                {cols2[1].map((blog, idx) => renderCard(blog, `mob1-${blog.id || idx}`))}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-slate-900 shadow-xs max-w-lg mx-auto">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">No articles found matching "{searchQuery}"</h3>
            <p className="text-xs font-extrabold text-slate-500 tracking-tight mt-1.5">Try another surgical keyword or tap any of the popular topics above.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-5 px-6 py-2.5 rounded-full text-xs font-extrabold tracking-tight bg-[#08284d] text-white hover:bg-sky-700 transition-colors cursor-pointer shadow-xs"
            >
              Clear Search &amp; Show All
            </button>
          </div>
        )}

      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: MONOLITHIC SATURATED COBALT CLOSING BANNER
      ────────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#08284d] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-black/20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">

          {/* Left: Circular Hospital Seal & Headline */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center shrink-0 shadow-inner bg-white/5">
              <div className="w-11 h-11 rounded-full border border-white/60 flex items-center justify-center text-white font-black text-xs">
                KH
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                ORTHOPAEDIC PATIENT EDUCATION ONLY
              </h2>
              <p className="text-xs text-slate-300 font-light max-w-lg">
                Evidence-based surgical knowledge empowering patients with clarity, safety, and rapid recovery across Purvanchal.
              </p>
            </div>
          </div>

          {/* Right: Golden Pill Call to Action Button */}
          <div className="shrink-0">
            <button
              onClick={onBookClick}
              className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-[#f59e0b] hover:bg-[#d97706] text-[#08284d] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Book Priority Consultation &rarr;
            </button>
          </div>

        </div>

        {/* Minimal White Bottom Divider Line */}
        <div className="max-w-5xl mx-auto mt-10 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
          <span>Khetan Hospital &bull; Vikas Nagar, Bargadawa, Gorakhpur</span>
          <span>Centralized Helpline: +91 96623 65917</span>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: IN-DEPTH ARTICLE READER MODAL (On Card Click)
      ────────────────────────────────────────────────────────────── */}
      {selectedBlog && (
        <div
          className="fixed inset-0 z-[200] overflow-y-auto bg-black/75 backdrop-blur-sm p-4 sm:p-6 md:p-8 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setSelectedBlog(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[82vh] my-auto overflow-hidden shadow-2xl border border-slate-200 flex flex-col relative z-[210]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#08284d] text-white flex items-center justify-between gap-4 shrink-0 shadow-xs">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-sky-300 block mb-0.5">
                  KHETAN HOSPITAL &bull; CLINICAL RECOVERY GUIDE
                </span>
                <h2 className="text-sm sm:text-lg font-bold text-white line-clamp-1">
                  {selectedBlog.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedBlog(null)}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-5 flex-1 text-slate-700 text-xs sm:text-sm leading-relaxed">
              {/* Featured Image */}
              {selectedBlog.featuredImage && (
                <div className="rounded-2xl overflow-hidden bg-slate-50 p-2 flex justify-center max-h-72 border border-slate-100">
                  <img
                    src={selectedBlog.featuredImage}
                    alt={selectedBlog.title}
                    className="w-auto max-h-64 mx-auto object-contain rounded-xl"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Author & Meta Line */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#0284c7]" />
                  <span>Author: <strong>Dr. Vatsal Khetan</strong> (FRCS Edinburgh)</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
                    <span>{selectedBlog.readTime || '4 min read'}</span>
                  </span>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1 text-[#0284c7] hover:underline font-bold cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                  </button>
                </div>
              </div>

              {/* Render Full HTML Article */}
              <div
                className="blog-article-content max-w-none text-slate-700 leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{
                  __html: selectedBlog.content || selectedBlog.rawHtml || selectedBlog.textContent || selectedBlog.excerpt
                }}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 text-center sm:text-left">
                Need expert advice on this condition? Consult Dr. Vatsal Khetan.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedBlog(null);
                    onBookClick();
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#08284d] hover:bg-[#0284c7] text-white shadow-xs transition-all cursor-pointer"
                >
                  Book Priority Consultation
                </button>
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="px-4 py-2 rounded-full text-xs font-bold border border-slate-300 text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Hospital Footer */}
      <Footer onBookClick={onBookClick} />

    </div>
  );
};

export default BlogsPage;
