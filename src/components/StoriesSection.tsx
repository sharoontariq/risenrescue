import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, CheckCircle2, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STORIES_DATA } from '../data/storiesData';
import { StoryCardItem } from '../types';

interface StoriesSectionProps {
  onSupportAnimal?: (animalName: string) => void;
}

const ITEMS_PER_VIEW = 2;
const AUTOPLAY_INTERVAL_MS = 7000;

export const StoriesSection: React.FC<StoriesSectionProps> = ({ onSupportAnimal }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<number>(1);
  const [selectedStory, setSelectedStory] = useState<StoryCardItem | null>(null);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));
  const touchStartXRef = React.useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerView = isMobile ? 1 : 2;
  const totalPages = Math.ceil(STORIES_DATA.length / itemsPerView);

  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [totalPages, currentPage]);

  const handleNext = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartXRef.current = null;
  };

  const goToPage = (pageIndex: number) => {
    setDirection(pageIndex > currentPage ? 1 : -1);
    setCurrentPage(pageIndex);
  };

  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const timer = setInterval(handleNext, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isPlaying, isHovered, currentPage, totalPages]);

  // Extract the cards for the current carousel view
  const currentStories = STORIES_DATA.slice(
    currentPage * itemsPerView,
    currentPage * itemsPerView + itemsPerView
  );

  return (
    <section 
      id="stories-section" 
      className="w-full py-8 sm:py-12 lg:py-14 border-t border-gray-200/80 bg-[#F8F9FA]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#043E49]/10 text-[#043E49] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3 h-3 text-[#043E49]" />
              Rescues & Second Chances
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-3xl font-black text-[#1A1A1A] tracking-tight">
              Stories
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
              Every animal that enters our care carries a journey of survival. Discover the real stories made possible through timely medical rescue, nurturing rehabilitation, and compassionate community support.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Page Counter */}
            <div className="text-[11px] font-mono font-bold text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-2xs">
              <span className="text-[#043E49] font-black">0{currentPage + 1}</span>
              <span className="text-gray-300 mx-1">/</span>
              <span>0{totalPages}</span>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause stories carousel' : 'Play stories carousel'}
              className="p-1.5 sm:p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#043E49] hover:border-gray-300 shadow-2xs transition-all cursor-pointer touch-manipulation"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-0.5 bg-white border border-gray-200 p-0.5 rounded-full shadow-2xs">
              <button
                onClick={handlePrev}
                aria-label="Previous stories"
                className="p-1.5 sm:p-2 rounded-full text-gray-600 hover:text-white hover:bg-[#043E49] transition-colors cursor-pointer touch-manipulation"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next stories"
                className="p-1.5 sm:p-2 rounded-full text-gray-600 hover:text-white hover:bg-[#043E49] transition-colors cursor-pointer touch-manipulation"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stories Carousel Track (1 Card on mobile, 2 Cards on md+) */}
        <div className="relative overflow-hidden min-h-[360px] sm:min-h-[420px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${currentPage}-${itemsPerView}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6"
            >
              {currentStories.map((story) => (
                <div
                  key={story.id}
                  className="group bg-white rounded-[18px] sm:rounded-[24px] border border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Picture Container */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={story.imageUrl}
                      alt={story.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    />
                    
                    {/* Status Badge Over Image */}
                    {story.status && (
                      <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-sm">
                        <CheckCircle2 className="w-3 h-3 text-[#4fc3d0]" />
                        <span>{story.status}</span>
                      </div>
                    )}

                    {/* Animal Name Tag */}
                    <div className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-black bg-white/95 text-[#1A1A1A] backdrop-blur-md shadow-xs">
                      <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                      <span>{story.name}</span>
                    </div>
                  </div>

                  {/* Card Content: Title & Description */}
                  <div className="p-3.5 sm:p-5 lg:p-6 flex flex-col flex-1 justify-between gap-3 sm:gap-4">
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#043E49]">
                        {story.category}
                      </div>
                      <h3 className="text-base sm:text-xl font-black text-[#1A1A1A] tracking-tight leading-snug group-hover:text-[#043E49] transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed line-clamp-3">
                        {story.description}
                      </p>
                    </div>

                    {/* Footer Action of the Card */}
                    <div className="pt-2.5 sm:pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-[13px]">
                      <span className="font-semibold text-gray-400 text-[10.5px] sm:text-[11px]">
                        {story.tag || 'Sanctuary Care'}
                      </span>
                      <button
                        onClick={() => {
                          if (onSupportAnimal) {
                            onSupportAnimal(story.name);
                          } else {
                            setSelectedStory(story);
                          }
                        }}
                        className="inline-flex items-center gap-1 font-bold text-[#043E49] hover:text-[#032f38] transition-colors cursor-pointer group/btn text-xs sm:text-[13px] touch-manipulation"
                      >
                        <span>Support Similar Rescues</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Carousel Indicator Bars */}
        <div className="flex items-center justify-center gap-1.5 mt-4 sm:mt-6">
          {Array.from({ length: totalPages }).map((_, index) => {
            const isActive = index === currentPage;
            return (
              <button
                key={index}
                onClick={() => goToPage(index)}
                aria-label={`Go to stories slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer touch-manipulation ${
                  isActive 
                    ? 'w-6 sm:w-8 bg-[#043E49]' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            );
          })}
        </div>

        {/* Story Modal Detail if clicked */}
        {selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-md overflow-y-auto">
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-[24px] sm:rounded-[32px] border-2 sm:border-4 border-white shadow-2xl p-5 sm:p-8 text-[#1A1A1A] relative animate-fade-in my-auto">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 sm:pb-4 mb-3 sm:mb-4">
                <div>
                  <span className="text-[11px] sm:text-xs text-[#043E49] font-bold uppercase tracking-widest">{selectedStory.category}</span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A] mt-0.5">{selectedStory.name}'s Story</h3>
                </div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="p-2 text-gray-400 hover:text-gray-900 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/10] mb-4">
                <img
                  src={selectedStory.imageUrl}
                  alt={selectedStory.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                {selectedStory.description}
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl text-xs font-bold bg-[#043E49] hover:bg-[#032f38] text-white transition-colors cursor-pointer shadow-md touch-manipulation"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
