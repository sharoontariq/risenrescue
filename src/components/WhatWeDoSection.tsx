import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WHAT_WE_DO_ITEMS } from '../data/whatWeDoData';

interface WhatWeDoSectionProps {
  onExploreMore?: () => void;
}

const AUTOPLAY_INTERVAL_MS = 6500;

export const WhatWeDoSection: React.FC<WhatWeDoSectionProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const currentItem = WHAT_WE_DO_ITEMS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % WHAT_WE_DO_ITEMS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + WHAT_WE_DO_ITEMS.length) % WHAT_WE_DO_ITEMS.length);
  };

  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const interval = setInterval(handleNext, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, currentIndex]);

  return (
    <section 
      id="what-we-do-section" 
      className="w-full py-12 sm:py-16 lg:py-20 border-t border-gray-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-100/80 text-[#15803D] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#15803D]" />
              Our Core Pillars
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight">
              What We Do
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl leading-relaxed">
              From frontline medical rescue to expansive lifelong sanctuaries, discover how our dedicated programs heal, protect, and advocate for every vulnerable animal.
            </p>
          </div>

          {/* Navigation Controls in Header */}
          <div className="flex items-center gap-3">
            <div className="text-xs font-mono font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm">
              <span className="text-[#15803D] font-black">0{currentIndex + 1}</span>
              <span className="text-gray-300 mx-1.5">/</span>
              <span>0{WHAT_WE_DO_ITEMS.length}</span>
            </div>

            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Start slideshow'}
              className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#15803D] hover:border-[#15803D] shadow-sm transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                aria-label="Previous pillar"
                className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:text-[#15803D] hover:border-[#15803D] shadow-sm transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next pillar"
                className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:text-[#15803D] hover:border-[#15803D] shadow-sm transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Card Container: Left Picture, Right Content */}
        <div 
          className="bg-white rounded-[32px] sm:rounded-[40px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-6 sm:p-8 lg:p-12 transition-all overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Side: Picture */}
            <div className="lg:col-span-6 xl:col-span-6 w-full">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-gray-100 border-2 border-white shadow-lg">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentItem.id}
                    src={currentItem.imageUrl}
                    alt={currentItem.imageAlt}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover object-center"
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side: Heading & Description */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-5 sm:space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Pillar Category Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-green-50 text-[#15803D] border border-green-200/60">
                    {currentItem.tag}
                  </div>

                  {/* Heading */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1A1A1A] tracking-tight leading-tight">
                    {currentItem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {currentItem.description}
                  </p>

                  {/* Highlight Stat Metric Card */}
                  {currentItem.metricNumber && (
                    <div className="bg-[#F8F9FA] rounded-2xl p-4 sm:p-5 border border-gray-200/80 flex items-center gap-4">
                      <div className="text-2xl sm:text-3xl font-black text-[#15803D] tracking-tight">
                        {currentItem.metricNumber}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-600 border-l border-gray-200 pl-4">
                        {currentItem.metricLabel}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Slide Indicator Bars */}
              <div className="pt-2 flex items-center gap-2">
                {WHAT_WE_DO_ITEMS.map((item, idx) => {
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Jump to ${item.title}`}
                      className="p-1 -m-1 cursor-pointer flex items-center"
                    >
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isCurrent
                            ? 'w-10 bg-[#15803D] shadow-sm'
                            : 'w-3 bg-gray-200 hover:bg-gray-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
