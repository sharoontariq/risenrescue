import React, { useState } from 'react';
import { Heart, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { STORIES_DATA } from '../data/storiesData';
import { StoryCardItem } from '../types';

interface StoriesSectionProps {
  onSupportAnimal?: (animalName: string) => void;
}

export const StoriesSection: React.FC<StoriesSectionProps> = ({ onSupportAnimal }) => {
  const [selectedStory, setSelectedStory] = useState<StoryCardItem | null>(null);

  return (
    <section 
      id="stories-section" 
      className="w-full py-12 sm:py-16 lg:py-20 border-t border-gray-200/80 bg-[#F8F9FA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-100/80 text-[#15803D] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#15803D]" />
              Rescues & Second Chances
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight">
              Stories
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl leading-relaxed">
              Every animal that enters our care carries a journey of survival. Discover the real stories made possible through timely medical rescue, nurturing rehabilitation, and compassionate community support.
            </p>
          </div>
        </div>

        {/* Stories Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {STORIES_DATA.map((story) => (
            <div
              key={story.id}
              className="group bg-white rounded-[28px] sm:rounded-[32px] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Picture Container */}
              <div className="relative w-full aspect-[16/11] overflow-hidden bg-gray-100">
                <img
                  src={story.imageUrl}
                  alt={story.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Status Badge Over Image */}
                {story.status && (
                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-md">
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                    <span>{story.status}</span>
                  </div>
                )}

                {/* Animal Name Tag */}
                <div className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/90 text-[#1A1A1A] backdrop-blur-md shadow-sm">
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                  <span>{story.name}</span>
                </div>
              </div>

              {/* Card Content: Title & Description */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-2.5">
                  <div className="text-[11px] font-black uppercase tracking-widest text-[#15803D]">
                    {story.category}
                  </div>
                  <h3 className="text-xl font-black text-[#1A1A1A] tracking-tight leading-snug group-hover:text-[#15803D] transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {story.description}
                  </p>
                </div>

                {/* Footer Action of the Card */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-400">
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
                    className="inline-flex items-center gap-1 font-bold text-[#15803D] hover:text-green-800 transition-colors cursor-pointer group/btn"
                  >
                    <span>Support Similar Rescues</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Story Modal Detail if clicked */}
        {selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="w-full max-w-lg bg-white rounded-[32px] border-4 border-white shadow-2xl p-6 sm:p-8 text-[#1A1A1A] relative animate-fade-in">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <div>
                  <span className="text-xs text-[#15803D] font-bold uppercase tracking-widest">{selectedStory.category}</span>
                  <h3 className="text-2xl font-black text-[#1A1A1A] mt-0.5">{selectedStory.name}'s Story</h3>
                </div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="p-2 text-gray-400 hover:text-gray-900 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-[16/10] mb-4">
                <img
                  src={selectedStory.imageUrl}
                  alt={selectedStory.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {selectedStory.description}
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="py-3 px-6 rounded-xl text-xs font-bold bg-[#15803D] hover:bg-green-800 text-white transition-colors cursor-pointer shadow-md"
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
