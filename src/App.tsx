import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { DonationAppealBox } from './components/DonationAppealBox';
import { DonationSuccessModal } from './components/DonationSuccessModal';
import { WhatWeDoSection } from './components/WhatWeDoSection';
import { StoriesSection } from './components/StoriesSection';
import { GalleryPage } from './components/GalleryPage';
import { AdminPanel } from './components/AdminPanel';
import { AboutUsPage } from './components/AboutUsPage';
import { FutureGoalsPage } from './components/FutureGoalsPage';
import { StoryPage } from './components/StoryPage';
import { Footer } from './components/Footer';
import { CAROUSEL_SLIDES } from './data/carouselData';
import { CarouselSlide, DonationSubmission, GalleryItem } from './types';
import { 
  SiteContent, 
  loadSiteContent, 
  saveSiteContent, 
  DEFAULT_SITE_CONTENT 
} from './siteContent';
import { ArrowUp } from 'lucide-react';

type PageRoute = 'home' | 'gallery' | 'about' | 'goals' | 'admin' | 'story';

function resolveRoute(pathname: string): { page: PageRoute; storyId?: string; redirect?: string } {
  const cleanPath = pathname.toLowerCase().replace(/\/+$/, '') || '/';

  if (cleanPath === '/admin' || cleanPath === '/admin/login') {
    return { page: 'admin' };
  }

  if (cleanPath === '/gallery') {
    return { page: 'gallery' };
  }

  if (cleanPath === '/about') {
    return { page: 'about' };
  }

  if (cleanPath === '/goals') {
    return { page: 'goals' };
  }

  if (cleanPath.startsWith('/story/')) {
    const storyId = cleanPath.replace('/story/', '');
    return { page: 'story', storyId };
  }

  return { page: 'home' };
}

export default function App() {
  // Central site content loaded from localStorage with default fallbacks
  const [siteContent, setSiteContent] = useState<SiteContent>(() => loadSiteContent());

  const initialRoute = resolveRoute(window.location.pathname);
  const [currentPage, setCurrentPage] = useState<PageRoute>(initialRoute.page);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(initialRoute.storyId || null);

  const [currentSlide, setCurrentSlide] = useState<CarouselSlide>(() => {
    const initialContent = loadSiteContent();
    return initialContent.home.heroSlides[0] || CAROUSEL_SLIDES[0];
  });
  const [completedDonation, setCompletedDonation] = useState<DonationSubmission | null>(null);
  const [selectedAppealTarget, setSelectedAppealTarget] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Gallery items managed through Admin Panel
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

  const handleSaveContent = (newContent: SiteContent) => {
    setSiteContent(newContent);
    saveSiteContent(newContent);
  };

  const handleResetContent = () => {
    setSiteContent(DEFAULT_SITE_CONTENT);
    saveSiteContent(DEFAULT_SITE_CONTENT);
  };

  const heroRef = useRef<HTMLElement>(null);
  const donationBoxRef = useRef<HTMLDivElement>(null);
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);

  // Browser History & URL route handling
  useEffect(() => {
    const handlePopState = () => {
      const route = resolveRoute(window.location.pathname);
      setCurrentPage(route.page);
      if (route.storyId) {
        setSelectedStoryId(route.storyId);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

  const navigateTo = (page: PageRoute, urlPath: string) => {
    if (window.location.pathname !== urlPath) {
      window.history.pushState(null, '', urlPath);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => navigateTo('home', '/');
  const handleNavigateAbout = () => navigateTo('about', '/about');
  const handleNavigateGoals = () => navigateTo('goals', '/goals');
  const handleNavigateGallery = () => navigateTo('gallery', '/gallery');
  const handleNavigateAdmin = () => navigateTo('admin', '/admin');

  const handleSelectStory = (storyId: string) => {
    setSelectedStoryId(storyId);
    navigateTo('story', `/story/${storyId}`);
  };

  const currentStoryItem = siteContent.home.storiesItems.find(
    (s) => s.id === selectedStoryId || s.id.toLowerCase() === selectedStoryId?.toLowerCase()
  ) || siteContent.home.storiesItems[0];

  const remainingStories = siteContent.home.storiesItems.filter(
    (s) => s.id !== currentStoryItem?.id
  );

  const handleHeroScroll = () => {
    if (currentPage !== 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQuickDonateFocus = (targetName?: string) => {
    if (currentPage !== 'home') {
      handleNavigateHome();
    }
    if (targetName) {
      setSelectedAppealTarget(targetName);
    }
    setTimeout(() => {
      if (donationBoxRef.current) {
        donationBoxRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleWhatWeDoScroll = () => {
    if (currentPage !== 'home') {
      handleNavigateHome();
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
      handleNavigateHome();
      setTimeout(() => {
        if (storiesRef.current) {
          storiesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else if (storiesRef.current) {
      storiesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Direct Admin Panel View at /admin without login gate
  if (currentPage === 'admin') {
    return (
      <AdminPanel
        content={siteContent}
        onSaveContent={handleSaveContent}
        onResetContent={handleResetContent}
        galleryItems={galleryItems}
        onAddPhoto={handleAddPhoto}
        onDeletePhoto={handleDeletePhoto}
        onViewGallery={handleNavigateGallery}
        onBackToHome={handleNavigateHome}
      />
    );
  }

  // Public Frontend Views: Absolutely no reference to /admin or Admin Panel in UI
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] flex flex-col selection:bg-[#043E49] selection:text-white relative">
      {/* Top Sanctuary Navigation Bar */}
      <Header 
        content={siteContent.header}
        currentPage={currentPage}
        onHomeClick={handleNavigateHome}
        onAboutClick={handleNavigateAbout}
        onGoalsClick={handleNavigateGoals}
        onGalleryClick={handleNavigateGallery}
        onDonateClick={() => handleQuickDonateFocus()} 
        onWhatWeDoClick={handleWhatWeDoScroll}
        onStoriesClick={handleStoriesScroll}
      />

      {currentPage === 'gallery' ? (
        /* Gallery Page */
        <GalleryPage 
          content={siteContent.gallery}
          galleryItems={galleryItems}
          onBackToHome={handleNavigateHome}
        />
      ) : currentPage === 'about' ? (
        /* About Us Page */
        <AboutUsPage
          content={siteContent.about}
          onBackToHome={handleNavigateHome}
          onNavigateGallery={handleNavigateGallery}
          onNavigateGoals={handleNavigateGoals}
          onDonateClick={() => handleQuickDonateFocus()}
        />
      ) : currentPage === 'goals' ? (
        /* Future Goals Page */
        <FutureGoalsPage
          content={siteContent.goals}
          goals={siteContent.goals.goals}
          onBackToHome={handleNavigateHome}
          onNavigateAbout={handleNavigateAbout}
          onNavigateGallery={handleNavigateGallery}
          onDonateClick={() => handleQuickDonateFocus()}
        />
      ) : currentPage === 'story' && currentStoryItem ? (
        /* Dedicated Story Page: Only Image, Name, Title, Description, and remaining stories at the bottom */
        <StoryPage
          story={currentStoryItem}
          remainingStories={remainingStories}
          onSelectStory={handleSelectStory}
          onBackToHome={handleNavigateHome}
        />
      ) : (
        /* Home Page Sections */
        <>
          {/* Main Hero Stage */}
          <section ref={heroRef} className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              {/* Main Content Area */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch w-full">
                <div className="w-full h-full flex flex-col">
                  <HeroCarousel 
                    slides={siteContent.home.heroSlides}
                    onSlideChange={(slide) => setCurrentSlide(slide)}
                    onDonateNow={() => handleQuickDonateFocus(currentSlide?.animalName)}
                  />
                </div>

                {/* Right Appeal / Bank Deposit Box */}
                <div ref={donationBoxRef} className="w-full h-full flex flex-col">
                  <DonationAppealBox 
                    intlBank={siteContent.home.bankDetails.intlBank}
                    localBank={siteContent.home.bankDetails.localBank}
                    activeAnimalName={selectedAppealTarget || currentSlide?.animalName}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* What We Do Mission Pillars Section */}
          <div ref={whatWeDoRef}>
            <WhatWeDoSection 
              headerContent={siteContent.home.whatWeDoHeader}
              items={siteContent.home.whatWeDoItems}
            />
          </div>

          {/* Stories Section Under What We Do */}
          <div ref={storiesRef}>
            <StoriesSection 
              headerContent={siteContent.home.storiesHeader}
              stories={siteContent.home.storiesItems}
              onSupportAnimal={(name) => handleQuickDonateFocus(name)} 
              onSelectStory={handleSelectStory}
            />
          </div>
        </>
      )}

      {/* Comprehensive Sanctuary Footer */}
      <Footer
        content={siteContent.footer}
        onNavigateHome={handleNavigateHome}
        onNavigateAbout={handleNavigateAbout}
        onNavigateGoals={handleNavigateGoals}
        onNavigateGallery={handleNavigateGallery}
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
        className={`fixed bottom-3.5 right-3.5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-3.5 bg-[#043E49] hover:bg-[#032f38] text-white rounded-full font-black text-xs sm:text-sm shadow-[0_6px_20px_rgba(4,62,73,0.35)] hover:shadow-[0_12px_28px_rgba(4,62,73,0.45)] border-2 border-white/90 transition-all duration-300 cursor-pointer group active:scale-95 touch-manipulation ${
          showScrollTop
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:-translate-y-0.5 transition-transform" />
        <span className="tracking-wide text-[11px] sm:text-sm">
          {currentPage === 'home' ? 'Back to Hero' : 'Back to Top'}
        </span>
      </button>
    </div>
  );
}
