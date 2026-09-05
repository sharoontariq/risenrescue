import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { DonationAppealBox } from './components/DonationAppealBox';
import { DonationSuccessModal } from './components/DonationSuccessModal';
import { WhatWeDoSection } from './components/WhatWeDoSection';
import { StoriesSection } from './components/StoriesSection';
import { GalleryPage } from './components/GalleryPage';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { CAROUSEL_SLIDES } from './data/carouselData';
import { CarouselSlide, DonationSubmission, GalleryItem } from './types';
import { ShieldCheck, Heart, Sparkles, Award, ArrowUp } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery' | 'admin'>('home');
  const [currentSlide, setCurrentSlide] = useState<CarouselSlide>(CAROUSEL_SLIDES[0]);
  const [activeTab, setActiveTab] = useState<'carousel' | 'donate'>('carousel');
  const [completedDonation, setCompletedDonation] = useState<DonationSubmission | null>(null);
  const [selectedAppealTarget, setSelectedAppealTarget] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Gallery items strictly managed through Admin Panel
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('pawhaven_admin_gallery_photos');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore parse errors
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('pawhaven_admin_gallery_photos', JSON.stringify(galleryItems));
    } catch {
      // storage full or disabled
    }
  }, [galleryItems]);

  const handleAddPhoto = (item: GalleryItem) => {
    setGalleryItems((prev) => [item, ...prev]);
  };

  const handleDeletePhoto = (id: string) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const heroRef = useRef<HTMLElement>(null);
  const donationBoxRef = useRef<HTMLDivElement>(null);
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 220) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleHeroScroll = () => {
    if (currentPage === 'gallery' || currentPage === 'admin') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateGallery = () => {
    setCurrentPage('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAdmin = () => {
    setCurrentPage('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickDonateFocus = (targetName?: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
    }
    if (targetName) {
      setSelectedAppealTarget(targetName);
    }
    setActiveTab('donate');
    setTimeout(() => {
      if (donationBoxRef.current) {
        donationBoxRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleWhatWeDoScroll = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        if (whatWeDoRef.current) {
          whatWeDoRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else if (whatWeDoRef.current) {
      whatWeDoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStoriesScroll = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        if (storiesRef.current) {
          storiesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else if (storiesRef.current) {
      storiesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] flex flex-col selection:bg-[#15803D] selection:text-white relative">
      {/* Top Sanctuary Navigation Bar */}
      <Header 
        currentPage={currentPage}
        onHomeClick={handleNavigateHome}
        onGalleryClick={handleNavigateGallery}
        onAdminClick={handleNavigateAdmin}
        onDonateClick={() => handleQuickDonateFocus()} 
        onWhatWeDoClick={handleWhatWeDoScroll}
        onStoriesClick={handleStoriesScroll}
      />

      {currentPage === 'admin' ? (
        /* Admin Panel - Upload and control gallery pictures */
        <AdminPanel
          galleryItems={galleryItems}
          onAddPhoto={handleAddPhoto}
          onDeletePhoto={handleDeletePhoto}
          onViewGallery={handleNavigateGallery}
          onBackToHome={handleNavigateHome}
        />
      ) : currentPage === 'gallery' ? (
        /* Gallery Page - Only shows uploaded pictures controlled from Admin Panel */
        <GalleryPage 
          galleryItems={galleryItems}
          onBackToHome={handleNavigateHome}
          onOpenAdmin={handleNavigateAdmin}
        />
      ) : (
        /* Home Page Sections */
        <>
          {/* Main Hero Stage */}
          <main ref={heroRef} className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4.5 flex flex-col justify-center">
            {/* Mobile View Toggle (Visible only on mobile/tablet) */}
            <div className="lg:hidden flex items-center justify-center p-1.5 bg-gray-100 border border-gray-200 rounded-2xl mb-3 text-xs font-bold">
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
                  activeAnimalName={selectedAppealTarget || currentSlide.animalName}
                  onSuccessfulDonation={(submission) => setCompletedDonation(submission)}
                />
              </div>
            </div>

            {/* Hero Trust & Accountability Bar */}
            <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs text-gray-500 font-medium">
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

          {/* Stories Section Under What We Do */}
          <div ref={storiesRef}>
            <StoriesSection onSupportAnimal={(name) => handleQuickDonateFocus(name)} />
          </div>
        </>
      )}

      {/* Comprehensive Sanctuary Footer with Social Media, Email, Phone & Address Sections */}
      <Footer
        onNavigateHome={handleNavigateHome}
        onNavigateGallery={handleNavigateGallery}
        onNavigateAdmin={handleNavigateAdmin}
        onDonateClick={() => handleQuickDonateFocus()}
        onWhatWeDoClick={handleWhatWeDoScroll}
        onStoriesClick={handleStoriesScroll}
      />

      {/* Tax-Deductible Donation Receipt & Gratitude Modal */}
      <DonationSuccessModal
        submission={completedDonation}
        onClose={() => setCompletedDonation(null)}
      />

      {/* Floating Lower-Right Button to Return to Hero Section */}
      <button
        type="button"
        onClick={handleHeroScroll}
        aria-label="Scroll to top or hero section"
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 bg-[#15803D] hover:bg-green-800 text-white rounded-full font-black text-xs sm:text-sm shadow-[0_10px_25px_rgba(21,128,61,0.35)] hover:shadow-[0_14px_30px_rgba(21,128,61,0.45)] border-2 border-white/90 transition-all duration-300 cursor-pointer group active:scale-95 ${
          showScrollTop
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 transition-transform" />
        <span className="tracking-wide">
          {currentPage === 'gallery' ? 'Back to Top' : 'Back to Hero'}
        </span>
      </button>
    </div>
  );
}
