import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CAROUSEL_SLIDES } from '../data/carouselData';
import { CarouselSlide } from '../types';

interface HeroCarouselProps {
  slides?: CarouselSlide[];
  onSelectSlide?: (slide: CarouselSlide) => void;
  onSlideChange?: (slide: CarouselSlide) => void;
  onDonateNow?: () => void;
  onQuickDonateFocus?: () => void;
  className?: string;
}

const SLIDE_DURATION_MS = 6000;

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ 
  slides,
  onSelectSlide,
  onSlideChange,
  className
}) => {
  const activeSlides = (slides && slides.length > 0) ? slides : CAROUSEL_SLIDES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(Date.now());
  const requestRef = useRef<number | null>(null);

  // Guard if currentIndex is out of bounds after slide edits
  const safeIndex = currentIndex >= activeSlides.length ? 0 : currentIndex;
  const currentSlide = activeSlides[safeIndex] || activeSlides[0];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    setProgress(0);
    lastTimeRef.current = Date.now();
  }, [activeSlides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
    setProgress(0);
    lastTimeRef.current = Date.now();
  }, [activeSlides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartXRef.current = null;
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    lastTimeRef.current = Date.now();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === ' ' && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Inform parent when slide changes
  useEffect(() => {
    if (onSelectSlide) {
      onSelectSlide(currentSlide);
    }
    if (onSlideChange) {
      onSlideChange(currentSlide);
    }
  }, [currentSlide, onSelectSlide, onSlideChange]);

  // Animation frame loop for progress bar
  useEffect(() => {
    const updateProgress = () => {
      if (isPlaying && !isHovered) {
        const now = Date.now();
        const delta = now - lastTimeRef.current;
        lastTimeRef.current = now;

        setProgress((prev) => {
          const next = prev + (delta / SLIDE_DURATION_MS) * 100;
          if (next >= 100) {
            goToNext();
            return 0;
          }
          return next;
        });
      } else {
        lastTimeRef.current = Date.now();
      }
      requestRef.current = requestAnimationFrame(updateProgress);
    };

    lastTimeRef.current = Date.now();
    requestRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, isHovered, goToNext]);

  return (
    <div 
      className={`relative w-full h-full min-h-[440px] xs:min-h-[460px] sm:min-h-[500px] flex items-center justify-center overflow-hidden rounded-[20px] xs:rounded-[22px] sm:rounded-[30px] bg-[#E5E7EB] shadow-[0_10px_25px_rgba(0,0,0,0.06)] border border-gray-100 group select-none ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      id="hero-carousel-container"
    >
      {/* Pure High-Quality Background Image Layer with AnimatePresence */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next Floating Arrow Buttons (Icon only, responsive touch targets) */}
      <button
        onClick={goToPrev}
        className="absolute left-2.5 sm:left-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 shadow-md flex items-center justify-center transition-all cursor-pointer opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 touch-manipulation"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2.5 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 shadow-md flex items-center justify-center transition-all cursor-pointer opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 touch-manipulation"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
      </button>

      {/* Bottom Floating Navigation Capsule matching reference design (compact & refined) */}
      <div className="absolute bottom-2.5 sm:bottom-3.5 z-20 flex items-center justify-center pointer-events-auto max-w-[95%]">
        <div className="flex items-center gap-2 sm:gap-2.5 bg-[#3F3F3F]/85 sm:bg-[#4A4A4A]/85 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
          {/* Slide Indicator Dots / Active Capsule */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {activeSlides.map((_, idx) => {
              const isActive = idx === safeIndex;
              return (
                <button
                  key={idx}
                  onClick={() => goToIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer touch-manipulation ${
                    isActive
                      ? 'w-4.5 sm:w-5 h-1.5 sm:h-1.5 bg-white shadow-2xs'
                      : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                />
              );
            })}
          </div>

          {/* Subtle Vertical Divider */}
          <div className="w-[1px] h-2.5 sm:h-3 bg-white/30 rounded-full mx-0.5" />

          {/* Progress Capsule Bar */}
          <div className="w-8 sm:w-9.5 h-1.5 bg-white/25 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Play/Pause Toggle Button */}
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="p-0.5 text-white/90 hover:text-white transition-colors cursor-pointer touch-manipulation flex items-center justify-center ml-0.5"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? (
              <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white stroke-[2.5]" />
            ) : (
              <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white fill-white ml-0.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
