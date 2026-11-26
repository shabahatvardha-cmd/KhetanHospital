import React from 'react';
import { serviceChapters } from '../../data/servicesChaptersData';

/**
 * 🏥 ChapterProgressIndicator
 * Discreet floating vertical chapter progress marker for the Services page.
 * Displays all 8 chapters with direct one-click smooth scroll navigation.
 */
export const ChapterProgressIndicator = ({ activeChapterId, onSelectChapter }) => {
  return (
    <aside 
      className="fixed right-3 lg:right-5 top-1/2 -translate-y-1/2 z-[85] hidden md:flex flex-col gap-2 bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-slate-200/90 shadow-lg select-none"
      aria-label="Services Chapters Progress"
    >
      <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 text-center pb-1 border-b border-slate-100">
        CHAPTERS
      </div>

      <div className="flex flex-col gap-1.5">
        {serviceChapters.map((chapter) => {
          const isActive = activeChapterId === chapter.id;

          return (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id)}
              className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                isActive 
                  ? 'bg-sky-500 text-white shadow-xs font-bold' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title={`${chapter.chapterNumber} ${chapter.navLabel}`}
            >
              <span className={`text-[10px] font-mono ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'}`}>
                {chapter.chapterNumber}
              </span>
              <span className="text-[11px] font-medium tracking-tight whitespace-nowrap">
                {chapter.navLabel}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-auto" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
