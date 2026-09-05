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
  onSelectSlide?: (slide: CarouselSlide) => void;
  onQuickDonateFocus?: () => void;
}

const SLIDE_DURATION_MS = 6000;

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ 
  onSelectSlide 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(Date.now());
  const requestRef = useRef<number | null>(null);

  const currentSlide = CAROUSEL_SLIDES[currentIndex];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    setProgress(0);
    lastTimeRef.current = Date.now();
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
    setProgress(0);
    lastTimeRef.current = Date.now();
  }, []);

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
  }, [currentSlide, onSelectSlide]);

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
      className="relative w-full h-full min-h-[320px] xs:min-h-[360px] sm:min-h-[420px] lg:min-h-[500px] flex items-center justify-center overflow-hidden rounded-[24px] sm:rounded-[36px] bg-[#E5E7EB] shadow-xl border-2 sm:border-4 border-white group select-none"
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
        className="absolute left-2.5 sm:left-4 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center transition-all cursor-pointer opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 touch-manipulation"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2.5 sm:right-4 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center transition-all cursor-pointer opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 touch-manipulation"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Bottom Minimal Floating Navigation Pill (Geometric indicators & play/pause, zero text) */}
      <div className="absolute bottom-3 sm:bottom-5 z-20 flex items-center justify-center pointer-events-auto max-w-[95%]">
        <div className="flex items-center gap-1.5 sm:gap-2.5 bg-black/50 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full border border-white/25 shadow-xl">
          {/* Geometric Slide Indicators */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {CAROUSEL_SLIDES.map((slide, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToIndex(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className="p-1 -m-1 cursor-pointer flex items-center touch-manipulation"
                >
                  <div
                    className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'w-5 sm:w-7 bg-white shadow-sm'
                        : 'w-1.5 sm:w-2 bg-white/45 hover:bg-white/75'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="w-px h-3 bg-white/25 mx-0.5" />

          {/* Progress Mini Bar */}
          <div className="w-8 sm:w-12 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/90 rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Play/Pause Toggle Button */}
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="p-1 rounded-full text-white/80 hover:text-white transition-colors cursor-pointer touch-manipulation"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
