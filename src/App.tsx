import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { DonationAppealBox } from './components/DonationAppealBox';
import { DonationSuccessModal } from './components/DonationSuccessModal';
import { WhatWeDoSection } from './components/WhatWeDoSection';
import { CAROUSEL_SLIDES } from './data/carouselData';
import { CarouselSlide, DonationSubmission } from './types';
import { ShieldCheck, Heart, Sparkles, Award } from 'lucide-react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<CarouselSlide>(CAROUSEL_SLIDES[0]);
  const [activeTab, setActiveTab] = useState<'carousel' | 'donate'>('carousel');
  const [completedDonation, setCompletedDonation] = useState<DonationSubmission | null>(null);
  const donationBoxRef = useRef<HTMLDivElement>(null);
  const whatWeDoRef = useRef<HTMLDivElement>(null);

  const handleQuickDonateFocus = () => {
    setActiveTab('donate');
    if (donationBoxRef.current) {
      donationBoxRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatWeDoScroll = () => {
    if (whatWeDoRef.current) {
      whatWeDoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] flex flex-col selection:bg-[#15803D] selection:text-white">
      {/* Top Sanctuary Navigation Bar */}
      <Header 
        onDonateClick={handleQuickDonateFocus} 
        onWhatWeDoClick={handleWhatWeDoScroll}
      />

      {/* Main Hero Stage */}
      <main className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col justify-center">
        {/* Mobile View Toggle (Visible only on mobile/tablet) */}
        <div className="lg:hidden flex items-center justify-center p-1.5 bg-gray-100 border border-gray-200 rounded-2xl mb-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('carousel')}
            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'carousel'
                ? 'bg-[#15803D] text-white shadow-sm'
                : 'text-gray-600 hover:text-[#1A1A1A]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Animal Stories</span>
          </button>
          <button
            onClick={() => setActiveTab('donate')}
            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'donate'
                ? 'bg-[#15803D] text-white shadow-sm'
                : 'text-gray-600 hover:text-[#1A1A1A]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Donation Appeal</span>
          </button>
        </div>

        {/* Hero Grid Container: Left = Carousel, Right = Appeal Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Carousel Column (Occupies 7 columns on desktop) */}
          <div 
            className={`lg:col-span-7 xl:col-span-7 flex flex-col ${
              activeTab === 'carousel' ? 'block' : 'hidden lg:flex'
            }`}
          >
            <HeroCarousel
              onSelectSlide={(slide) => setCurrentSlide(slide)}
              onQuickDonateFocus={handleQuickDonateFocus}
            />
          </div>

          {/* Donation Appeal Box Column (Occupies 5 columns on desktop) */}
          <div 
            ref={donationBoxRef}
            className={`lg:col-span-5 xl:col-span-5 flex flex-col justify-center ${
              activeTab === 'donate' ? 'block' : 'hidden lg:flex'
            }`}
          >
            <DonationAppealBox
              activeAnimalName={currentSlide.animalName}
              onSuccessfulDonation={(submission) => setCompletedDonation(submission)}
            />
          </div>
        </div>

        {/* Hero Trust & Accountability Bar */}
        <div className="mt-5 sm:mt-8 pt-4 sm:pt-5 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-gray-700 font-semibold">
              <Award className="w-4 h-4 text-amber-500" />
              Charity Navigator 4/4 Star Rated (98.6%)
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="flex items-center gap-1.5 text-gray-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#15803D]" />
              GuideStar Platinum Transparency
            </span>
            <span className="hidden md:inline text-gray-300">•</span>
            <span className="hidden md:inline text-gray-500">
              88¢ of every dollar directly funds animal surgery, rescue nutrition & permanent sanctuary
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#15803D] font-bold">501(c)(3) Non-Profit</span>
          </div>
        </div>
      </main>

      {/* What We Do Section Under the Hero Page */}
      <div ref={whatWeDoRef}>
        <WhatWeDoSection onExploreMore={handleQuickDonateFocus} />
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200/80 py-8 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#15803D] fill-[#15803D]" />
            <span className="font-bold text-[#1A1A1A]">PAWHAVEN WILDLIFE TRUST</span>
            <span className="text-gray-300">•</span>
            <span>Dedicated to compassionate animal rescue and sanctuary since 2011</span>
          </div>
          <div>
            <span>© {new Date().getFullYear()} PawHaven Wildlife Trust. All donations are tax-deductible.</span>
          </div>
        </div>
      </footer>

      {/* Tax-Deductible Donation Receipt & Gratitude Modal */}
      <DonationSuccessModal
        submission={completedDonation}
        onClose={() => setCompletedDonation(null)}
      />
    </div>
  );
}
