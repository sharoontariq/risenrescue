import React, { useEffect, useState } from 'react';
import { ArrowLeft, Heart, ChevronRight, ChevronLeft, ArrowRight, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StoryCardItem } from '../types';

interface StoryPageProps {
  story: StoryCardItem;
  remainingStories: StoryCardItem[];
  onSelectStory: (storyId: string) => void;
  onBackToHome: () => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({
  story,
  remainingStories,
  onSelectStory,
  onBackToHome,
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 640 : false));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPageIndex(0);
  }, [story.id]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Display exactly 2 cards at a time on sm/desktop (1 on mobile)
  const cardsPerPage = isMobile ? 1 : 2;
  const totalCards = remainingStories.length;
  const totalPages = Math.max(1, Math.ceil(totalCards / cardsPerPage));

  useEffect(() => {
    if (pageIndex >= totalPages) {
      setPageIndex(Math.max(0, totalPages - 1));
    }
  }, [totalPages, pageIndex]);

  useEffect(() => {
    if (!isPlaying || totalPages <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setPageIndex((prev) => (prev + 1) % totalPages);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, totalPages]);

  const handlePrev = () => {
    setDirection(-1);
    setPageIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setPageIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const visibleStories = remainingStories.slice(
    pageIndex * cardsPerPage,
    pageIndex * cardsPerPage + cardsPerPage
  );

  return (
    <div className="w-full bg-[#F8F9FA] py-6 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700 hover:text-[#043E49] bg-white border border-gray-200 hover:border-[#043E49]/30 px-4 py-2 rounded-full shadow-2xs transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Stories</span>
          </button>
        </div>

        {/* Selected Story Main Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm overflow-hidden mb-12 sm:mb-16">
          {/* Image with Animal Name */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-gray-100 overflow-hidden">
            <img
              src={story.imageUrl}
              alt={story.imageAlt || story.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* Animal Name Tag */}
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-black bg-white/95 text-[#1A1A1A] backdrop-blur-md shadow-sm">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{story.name}</span>
            </div>
          </div>

          {/* Card Content: Title & Full Description */}
          <div className="p-6 sm:p-8 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight leading-snug">
              {story.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
              {story.description}
            </p>
          </div>
        </div>

        {/* Lower Bottom Remaining Cards Carousel Section (strictly 2 cards per view) */}
        {totalCards > 0 && (
          <div className="space-y-5 border-t border-gray-200 pt-8">
            {/* Carousel Header with Navigation Controls and Cards Number */}
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#1A1A1A] tracking-tight">
                  Other Stories
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Click on any card below to read their story.
                </p>
              </div>

              {/* Carousel Navigation Controls matching reference design */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Page Counter Pill */}
                <div className="text-[12px] sm:text-[13px] font-mono font-bold text-gray-500 bg-white border border-gray-200/90 px-3.5 py-1.5 rounded-full shadow-2xs select-none flex items-center">
                  <span className="text-[#043E49] font-black">
                    {(pageIndex + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="text-gray-300 mx-1.5 font-normal">/</span>
                  <span className="text-gray-600 font-medium">
                    {totalPages.toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Play/Pause Button */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause stories carousel' : 'Play stories carousel'}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200/90 text-gray-600 hover:text-[#043E49] hover:border-gray-300 shadow-2xs flex items-center justify-center transition-all cursor-pointer touch-manipulation"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
                  ) : (
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700 fill-gray-700 ml-0.5" />
                  )}
                </button>

                {/* Prev Button */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous stories"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200/90 text-gray-600 hover:text-[#043E49] hover:border-gray-300 shadow-2xs flex items-center justify-center transition-all cursor-pointer touch-manipulation"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gray-700" />
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next stories"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200/90 text-gray-600 hover:text-[#043E49] hover:border-gray-300 shadow-2xs flex items-center justify-center transition-all cursor-pointer touch-manipulation"
                >
                  <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Exactly 2 cards in the section with smooth animation */}
            <div className="relative overflow-hidden min-h-[360px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`${pageIndex}-${cardsPerPage}-${story.id}`}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 35 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 35 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
                >
                  {visibleStories.map((other) => (
                    <div
                      key={other.id}
                      onClick={() => onSelectStory(other.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectStory(other.id);
                        }
                      }}
                      className="group bg-white rounded-2xl border border-gray-200 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                    >
                      {/* Picture Container */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                        <img
                          src={other.imageUrl}
                          alt={other.imageAlt || other.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Animal Name Tag */}
                        <div className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black bg-white/95 text-[#1A1A1A] backdrop-blur-md shadow-xs">
                          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                          <span>{other.name}</span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
                        <div className="space-y-1.5">
                          <h3 className="text-base sm:text-lg font-black text-[#1A1A1A] tracking-tight leading-snug group-hover:text-[#043E49] transition-colors line-clamp-2">
                            {other.title}
                          </h3>
                          <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed line-clamp-3">
                            {other.description}
                          </p>
                        </div>

                        {/* Card Footer: Read Story on left, arrow on right */}
                        <div className="pt-2.5 sm:pt-3 border-t border-gray-100 flex items-center justify-between text-xs sm:text-[13px] font-bold text-[#043E49]">
                          <span className="group-hover:underline">Read Story</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
