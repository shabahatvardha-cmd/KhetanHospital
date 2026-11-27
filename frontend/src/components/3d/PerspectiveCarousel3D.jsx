import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

/**
 * 🏥 Khetan Hospital - Continuous Circular 3D Perspective Surgical Services Carousel (Polpharma Theme)
 * 
 * Strict Specification:
 * 1. Displays 6 Premier Orthopaedic Surgical Services (Robotic Knee, TKR, Hip, Shoulder, ACL, Spine).
 * 2. Infinite circular 3D rotation: cards move horizontally left and right.
 * 3. Frosted glassmorphism on dark biotech background.
 * 4. Center card has subtle "Explore Procedure" badge with glowing cyan border.
 * 5. Supports mouse dragging, touch swiping, trackpad horizontal swipe, chevron arrows, and keyboard.
 */
export const PerspectiveCarousel3D = () => {
  const { activeIndex, setActiveIndex, servicesNavigation, handleCardClick } = useNavigation();
  const total = servicesNavigation.length;

  const [cardSpacing, setCardSpacing] = useState(260);
  const [isMobile, setIsMobile] = useState(false);
  const isDragging = useRef(false);
  const hasDraggedRef = useRef(false);
  const startX = useRef(0);
  const currentDragDelta = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const wheelTimeout = useRef(null);
  const carouselContainerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardSpacing(190);
        setIsMobile(true);
      } else if (width < 1024) {
        setCardSpacing(225);
        setIsMobile(false);
      } else {
        setCardSpacing(260);
        setIsMobile(false);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % total);
  };

  const onWheel = (e) => {
    const absY = Math.abs(e.deltaY);
    const absX = Math.abs(e.deltaX);

    if (absX > absY && absX > 15) {
      if (wheelTimeout.current) return;

      if (e.deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }

      wheelTimeout.current = setTimeout(() => {
        wheelTimeout.current = null;
      }, 230);
    }
  };

  const onPointerDown = (e) => {
    isDragging.current = true;
    hasDraggedRef.current = false;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    currentDragDelta.current = 0;
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const delta = clientX - startX.current;
    if (Math.abs(delta) > 8) {
      hasDraggedRef.current = true;
    }
    currentDragDelta.current = delta;
    setDragOffset(delta);
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = currentDragDelta.current;
    setDragOffset(0);

    if (delta < -38) {
      handleNext();
    } else if (delta > 38) {
      handlePrev();
    }

    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 50);
  };

  const handleSafeCardClick = (index) => {
    if (hasDraggedRef.current) return;
    handleCardClick(index);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Enter') {
        handleCardClick(activeIndex);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, total]);

  return (
    <div
      ref={carouselContainerRef}
      className="relative w-full flex flex-col justify-center items-center py-2 px-3 sm:px-4 select-none bg-transparent text-white"
      onWheel={onWheel}
      onMouseDown={onPointerDown}
      onMouseMove={onPointerMove}
      onMouseUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
      tabIndex={0}
      role="region"
      aria-label="Continuous Circular 3D Services Navigation"
    >
      {/* 3D CIRCULAR TRACK STAGE */}
      <div
        className="relative w-full h-[310px] sm:h-[340px] lg:h-[360px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: '1200px' }}
      >
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          {servicesNavigation.map((card, index) => {
            let offset = index - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset <= -total / 2) offset += total;

            const isCenter = offset === 0;
            const maxVisibleOffset = isMobile ? 1 : 2;
            const isVisible = Math.abs(offset) <= maxVisibleOffset;
            if (!isVisible) return null;

            const dragShift = dragOffset * 0.35;
            const xTranslate = offset * cardSpacing + dragShift;
            const rotateY = offset * (isMobile ? -26 : -30);
            const scale = isCenter ? 1.04 : (Math.abs(offset) === 1 ? 0.90 : 0.82);
            const translateZ = isCenter ? 0 : (Math.abs(offset) === 1 ? -80 : -170);
            const zIndex = isCenter ? 30 : 20 - Math.abs(offset);

            return (
              <div
                key={card.id}
                onClick={() => handleSafeCardClick(index)}
                className={`absolute w-[240px] sm:w-[270px] lg:w-[290px] h-[275px] sm:h-[305px] lg:h-[325px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-350 ease-out backdrop-blur-xl border ${
                  isCenter
                    ? 'bg-[#071326]/95 border-cyan-400 shadow-[0_16px_40px_rgba(56,189,248,0.3)] ring-2 ring-cyan-400/50'
                    : 'bg-[#071326]/80 border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.5)] hover:border-cyan-400/40'
                }`}
                style={{
                  transform: `translate3d(${xTranslate}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: 1,
                  filter: 'none',
                  zIndex: zIndex,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
              >
                <div className="relative w-full h-full flex flex-col justify-between">

                  {/* Card Visual / Surgical Photograph */}
                  <div className="relative w-full h-[64%] bg-[#020712] overflow-hidden border-b border-white/10 flex items-center justify-center">
                    <img
                      src={card.image}
                      alt={card.heading}
                      className={`w-full h-full object-cover transition-transform duration-700 ${isCenter ? 'scale-108' : 'scale-100'}`}
                      loading="eager"
                    />
                    {isCenter && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-black text-[9.5px] uppercase tracking-wider shadow-md flex items-center gap-1">
                          <span>Active</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content Area */}
                  <div className="p-3.5 sm:p-4 flex flex-col justify-center flex-1 bg-gradient-to-b from-[#071326]/90 to-[#020712]/95">
                    <h2 className="text-sm sm:text-base font-black tracking-tight text-white leading-tight">
                      {card.heading}
                    </h2>
                    <p className="text-xs text-slate-300 font-light leading-relaxed mt-0.5 line-clamp-2">
                      {card.supportingLine}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CONTINUOUS CIRCULAR CONTROLS */}
      <div className="relative z-20 flex items-center justify-center gap-3 pt-2">
        <button
          onClick={handlePrev}
          aria-label="Previous Service"
          className="w-8 h-8 rounded-full bg-white/10 border border-white/15 text-white hover:text-cyan-400 hover:border-cyan-400 flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* 6 Synchronized Dots */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10">
          {servicesNavigation.map((card, i) => (
            <button
              key={card.id}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to ${card.heading}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                i === activeIndex
                  ? 'w-5 h-1.5 bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]'
                  : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next Service"
          className="w-8 h-8 rounded-full bg-white/10 border border-white/15 text-white hover:text-cyan-400 hover:border-cyan-400 flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default PerspectiveCarousel3D;
