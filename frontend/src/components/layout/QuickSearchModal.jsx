import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Activity, Calendar, Stethoscope, Sparkles } from 'lucide-react';
import { searchIndex } from '../../data/navigationData';

export const QuickSearchModal = ({ isOpen, onClose, onSelectResult }) => {
  const [query, setQuery] = useState('');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle search
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredResults = query.trim() === ''
    ? searchIndex.slice(0, 6)
    : searchIndex.filter(item => 
        item.keywords.includes(query.toLowerCase()) || 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-navy-950/60 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-brand-600 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symptoms (knee pain, ACL, shoulder tear), treatments, timings..."
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center text-[10px] bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded-md shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 flex items-center justify-between">
            <span>{query.trim() === '' ? 'Popular Clinical Searches' : `Matching Results (${filteredResults.length})`}</span>
            <span className="text-brand-600 font-semibold flex items-center">
              <Sparkles className="w-3 h-3 mr-1" /> Quick Navigation
            </span>
          </div>

          {filteredResults.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <Activity className="w-8 h-8 text-slate-300 mx-auto mb-2 animate-pulse" />
              <p className="text-sm font-semibold">No direct match found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">
                You can directly speak with our medical coordinator at <a href="tel:+919662365917" className="text-brand-600 font-bold underline">+91 96623 65917</a>
              </p>
            </div>
          ) : (
            filteredResults.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectResult && onSelectResult(item);
                  onClose();
                }}
                className="group p-3 rounded-xl hover:bg-brand-50/70 border border-transparent hover:border-brand-200 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-brand-600 group-hover:text-white text-slate-600 transition-colors">
                    {item.type === 'Treatment' ? <Stethoscope className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-navy-950 group-hover:text-brand-700 transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-semibold bg-slate-100 group-hover:bg-brand-200/60 text-slate-600 group-hover:text-brand-800 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Dr. Vatsal Khetan Knee N Shoulder Clinic &bull; Bargadawa, Gorakhpur</span>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-700 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
