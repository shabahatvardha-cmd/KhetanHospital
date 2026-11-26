import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Clock,
  Trash2,
  Activity,
  BookOpen,
  User,
  MapPin,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { allServices, allBlogs } from '../../data/clinicContent';

const RECENT_SEARCHES_KEY = 'khetan_hospital_recent_searches';
const MAX_RECENTS = 5;

const POPULAR_SEARCHES = [
  'Robotic Knee Replacement',
  'Hip Replacement & AVN',
  'ACL & Sports Ligament',
  'Dr. Vatsal Khetan',
  'Bargadawa OPD Timings'
];

export const SearchAutocomplete = ({ isMobile = false, onAfterNavigate }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not load recent searches', e);
    }
  }, []);

  // Save query to recent searches
  const saveRecentSearch = (term) => {
    if (!term || !term.trim()) return;
    const cleanTerm = term.trim();
    try {
      const updated = [cleanTerm, ...recentSearches.filter(s => s.toLowerCase() !== cleanTerm.toLowerCase())].slice(0, MAX_RECENTS);
      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save recent search', e);
    }
  };

  const clearRecentSearches = (e) => {
    e.stopPropagation();
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (e) { }
  };

  const removeSingleRecent = (e, item) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s !== item);
    setRecentSearches(updated);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch (e) { }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live real-time filtered results across all clinic content
  const liveResults = useMemo(() => {
    if (!query || query.trim().length < 1) return { services: [], blogs: [], info: [] };
    const q = query.toLowerCase().trim();

    // 1. Matching Surgeries & Specialties
    const services = allServices.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      (s.summary && s.summary.toLowerCase().includes(q))
    ).slice(0, 3);

    // 2. Matching Clinical Guides & Blogs
    const blogs = allBlogs.filter(b =>
      b.title.toLowerCase().includes(q) ||
      (b.category && b.category.toLowerCase().includes(q)) ||
      (b.excerpt && b.excerpt.toLowerCase().includes(q))
    ).slice(0, 4);

    // 3. Static Clinical & Hospital Info
    const infoMatches = [];
    if ('dr vatsal khetan frcs surgeon qualification edinburgh fellowship'.includes(q)) {
      infoMatches.push({
        title: 'Dr. Vatsal Khetan — FRCS (Edinburgh), M.Ch (UK)',
        path: '/about',
        icon: User
      });
    }
    if ('opd timings hours bargadawa vikas nagar contact emergency phone appointment'.includes(q)) {
      infoMatches.push({
        title: 'Bargadawa Hospital OPD Timings & Location',
        path: '/contact',
        icon: MapPin
      });
    }
    if ('papers research publication journal cementless bone'.includes(q)) {
      infoMatches.push({
        title: 'Published Research Papers (Bone & Joint Open)',
        path: '/published-papers',
        icon: BookOpen
      });
    }

    return { services, blogs, info: infoMatches.slice(0, 2) };
  }, [query]);

  const hasResults = liveResults.services.length > 0 || liveResults.blogs.length > 0 || liveResults.info.length > 0;

  const handleSelect = (path, termToSave) => {
    if (termToSave) saveRecentSearch(termToSave);
    setIsOpen(false);
    setQuery('');
    navigate(path);
    if (onAfterNavigate) onAfterNavigate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query && query.trim()) {
      saveRecentSearch(query);
      setIsOpen(false);
      navigate(`/blogs?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
      if (onAfterNavigate) onAfterNavigate();
    }
  };

  return (
    <div ref={containerRef} className={`relative ${isMobile ? 'w-full' : 'w-48 lg:w-60'}`}>
      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search surgery, blogs, Dr..."
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          className="w-full text-xs py-2 pl-8 pr-7 rounded-full bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#00bcd4] focus:bg-white text-slate-800 placeholder-slate-400 transition-all shadow-2xs"
        />
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* Floating Dropdown: Live Suggestions & Recent Searches */}
      {isOpen && (
        <div
          className={`absolute left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${isMobile ? 'w-full' : 'w-80 lg:w-96 -left-12 lg:-left-20'
            }`}
        >
          {/* A. If Query is empty: Show Recent Searches & Trending */}
          {query.trim().length === 0 ? (
            <div className="p-4 space-y-4 text-xs">

              {/* Recent Searches Header */}
              {recentSearches.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="w-3 h-3 text-[#00bcd4]" />
                      Recent Searches
                    </span>
                    <button
                      onClick={clearRecentSearches}
                      className="text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((term, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelect(`/blogs?search=${encodeURIComponent(term)}`, term)}
                        className="group flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-[#00bcd4] border border-slate-200/60 transition-all cursor-pointer font-medium text-slate-700"
                      >
                        <Clock className="w-2.5 h-2.5 text-slate-400 group-hover:text-[#00bcd4]" />
                        <span>{term}</span>
                        <button
                          onClick={(e) => removeSingleRecent(e, term)}
                          className="hover:text-rose-500 ml-1 text-slate-400"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-[11px] text-slate-400 py-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00bcd4]" />
                  <span>Type to search surgeries, blogs, doctor credentials & timings</span>
                </div>
              )}

              {/* Trending / Popular Quick Jumps */}
              <div>
                <span className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-2">
                  <TrendingUp className="w-3 h-3 text-[#ff5722]" />
                  Popular Topics
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SEARCHES.map((pop, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(
                        pop.includes('Dr. Vatsal') ? '/about' : pop.includes('Timings') ? '/contact' : `/blogs?search=${encodeURIComponent(pop)}`,
                        pop
                      )}
                      className="px-2.5 py-1 rounded-full text-[11px] bg-slate-50 hover:bg-orange-50 hover:text-[#ff5722] hover:border-orange-200 text-slate-600 border border-slate-200/60 transition-all cursor-pointer"
                    >
                      {pop}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            /* B. While typing: Live Autocomplete Results (Strictly 1-Liner items) */
            <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 text-xs">

              {!hasResults && (
                <div className="p-6 text-center text-slate-500">
                  <Search className="w-8 h-8 text-slate-300 mx-auto mb-2 stroke-[1.5]" />
                  <p className="font-bold text-slate-700">No exact matches found for "{query}"</p>
                  <p className="text-[11px] text-slate-400 mt-1">Press Enter to search all 61 medical publications</p>
                  <button
                    onClick={handleSubmit}
                    className="mt-3 px-4 py-1.5 rounded-full bg-[#00bcd4] text-white font-bold text-xs hover:bg-[#00acc1] cursor-pointer"
                  >
                    Search Blogs for "{query}"
                  </button>
                </div>
              )}

              {/* 1. Surgeries & Specialties (Strictly 1-Liner) */}
              {liveResults.services.length > 0 && (
                <div className="p-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5 px-2">
                    <Activity className="w-3 h-3 text-[#00bcd4]" />
                    <span>Specialized Surgeries</span>
                  </div>
                  <div className="space-y-1">
                    {liveResults.services.map((srv, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelect(`/services/${srv.slug}`, srv.title)}
                        className="p-2 rounded-xl hover:bg-sky-50 transition-colors flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Activity className="w-3.5 h-3.5 text-[#00bcd4] shrink-0" />
                          <span className="font-semibold text-slate-800 group-hover:text-[#00bcd4] transition-colors truncate">
                            {srv.title}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#00bcd4] -translate-x-1 group-hover:translate-x-0 transition-all shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Doctor & Facility Quick Matches (Strictly 1-Liner) */}
              {liveResults.info.length > 0 && (
                <div className="p-2.5 bg-slate-50/50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5 px-2">
                    <User className="w-3 h-3 text-purple-600" />
                    <span>Doctor &amp; Hospital Information</span>
                  </div>
                  <div className="space-y-1">
                    {liveResults.info.map((info, idx) => {
                      const Icon = info.icon;
                      return (
                        <div
                          key={idx}
                          onClick={() => handleSelect(info.path, info.title)}
                          className="p-2 rounded-xl hover:bg-purple-50 transition-colors flex items-center justify-between cursor-pointer group"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Icon className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                            <span className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors truncate">
                              {info.title}
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-purple-600 shrink-0 transition-transform group-hover:translate-x-0.5 ml-2" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Clinical Guides & Blogs (Strictly 1-Liner) */}
              {liveResults.blogs.length > 0 && (
                <div className="p-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5 px-2">
                    <BookOpen className="w-3 h-3 text-[#ff5722]" />
                    <span>Clinical Guides &amp; Articles</span>
                  </div>
                  <div className="space-y-1">
                    {liveResults.blogs.map((blog, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelect(`/blogs?search=${encodeURIComponent(blog.title)}`, blog.title)}
                        className="p-2 rounded-xl hover:bg-orange-50 transition-colors flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <BookOpen className="w-3.5 h-3.5 text-[#ff5722] shrink-0" />
                          <span className="font-semibold text-slate-800 group-hover:text-[#ff5722] transition-colors truncate">
                            {blog.title}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#ff5722] shrink-0 transition-transform group-hover:translate-x-0.5 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* View Full Search Link */}
              <div
                onClick={handleSubmit}
                className="p-3 bg-slate-50 hover:bg-[#00bcd4] hover:text-white transition-colors text-center font-bold text-xs text-[#00bcd4] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Press Enter to search all results for "{query}"</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
};
