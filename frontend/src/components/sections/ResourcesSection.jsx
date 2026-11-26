import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageSquare, ArrowRight, X } from 'lucide-react';
import { allBlogs } from '../../data/clinicContent';

export const ResourcesSection = ({ onBookClick }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [newsletterData, setNewsletterData] = useState({ name: '', email: '' });
  const [subscribed, setSubscribed] = useState(false);

  // 3 Featured blogs from allBlogs
  const featuredBlogs = [
    allBlogs.find(b => b.slug.includes('hip-replacement-surgery-at-home')) || allBlogs[0],
    allBlogs.find(b => b.slug.includes('robotic-surgery-in-orthopedic') || b.slug.includes('benefits-of-robotic')) || allBlogs[2],
    allBlogs.find(b => b.slug.includes('risks-and-complications-of-acl-surgery')) || allBlogs[5]
  ].filter(Boolean);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <section id="blogs" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8f9fa] relative">
      <div className="max-w-7xl mx-auto">

        {/* Oreo Section Header with Cyan Vertical Bar */}
        <div className="mb-14">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#00bcd4] inline-block rounded-full"></span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Latest <span className="font-normal text-slate-600">From Blog</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 pl-3.5">
            Orthopedic health, surgical preparation checklists, and recovery guides
          </p>
        </div>

        {/* 3 Blog Cards (Exact Oreo Page 3 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBlogs.map((blog, idx) => {
            return (
              <article
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                onClick={() => setSelectedBlog(blog)}
              >
                {/* Photo: Ambient blurred fill + 100% uncut foreground image (zero clipping from top) */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 flex items-center justify-center border-b border-slate-100">
                  <img
                    src={blog.featuredImage || '/images/dr-vatsal-rehab.webp'}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-30 select-none pointer-events-none"
                    aria-hidden="true"
                  />
                  <img
                    src={blog.featuredImage || '/images/dr-vatsal-rehab.webp'}
                    alt={blog.title}
                    className="relative z-10 max-h-full max-w-full object-contain p-2 group-hover:scale-102 transition-transform duration-300 select-none"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/dr-vatsal-rehab.webp';
                    }}
                  />
                </div>

                {/* Content (Title & Meta only, compact layout) */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <h3 className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-[#00bcd4] transition-colors leading-snug line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Meta Strip */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#ff5722]" />
                      <span>{blog.date || '02 Feb 2026'}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 font-bold text-[#00bcd4] group-hover:underline">
                      <span>Read Guide &rarr;</span>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Floating Newsletter / Consultation Inquiry Strip (Exact Oreo Page 3) */}
        <div className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200/80 p-5 sm:p-6 relative z-20">
          {subscribed ? (
            <div className="text-center text-xs text-emerald-700 font-bold py-2">
              ✓ Thank you! You have subscribed to Khetan Hospital health updates.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-5">
                <input
                  type="text"
                  required
                  placeholder="your name"
                  value={newsletterData.name}
                  onChange={(e) => setNewsletterData({ ...newsletterData, name: e.target.value })}
                  className="w-full text-xs px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#00bcd4]"
                />
              </div>
              <div className="sm:col-span-4">
                <input
                  type="email"
                  required
                  placeholder="your email"
                  value={newsletterData.email}
                  onChange={(e) => setNewsletterData({ ...newsletterData, email: e.target.value })}
                  className="w-full text-xs px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#00bcd4]"
                />
              </div>
              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider bg-[#ff5722] hover:bg-[#e64a19] text-white shadow-md transition-all cursor-pointer text-center"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

      {/* Full Article Modal Reader */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 bg-[#00bcd4] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-white/80 block">
                  Khetan Hospital Clinical Blog
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                  {selectedBlog.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBlog(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 flex-1 text-slate-700 text-xs sm:text-sm leading-relaxed">
              {selectedBlog.featuredImage && (
                <div className="rounded-2xl overflow-hidden shadow-xs bg-slate-50 p-3 flex justify-center max-h-80 border border-slate-100 mb-4">
                  <img
                    src={selectedBlog.featuredImage}
                    alt={selectedBlog.title}
                    className="w-auto max-h-72 mx-auto object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* RENDER FULL HTML ARTICLE */}
              <div
                className="blog-article-content max-w-none text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: selectedBlog.content || selectedBlog.rawHtml || selectedBlog.textContent || selectedBlog.excerpt
                }}
              />
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedBlog(null);
                  onBookClick();
                }}
                className="px-5 py-2 rounded-full text-xs font-bold bg-[#ff5722] text-white shadow-xs hover:bg-[#e64a19] transition-all cursor-pointer"
              >
                Book OPD Consultation
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
      )}

    </section>
  );
};
