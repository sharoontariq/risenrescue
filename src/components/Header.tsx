import React, { useState } from 'react';
import { ShieldCheck, PhoneCall, Heart, Images, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage?: 'home' | 'gallery' | 'admin' | 'about' | 'goals';
  onHomeClick?: () => void;
  onAboutClick?: () => void;
  onGoalsClick?: () => void;
  onDonateClick?: () => void;
  onWhatWeDoClick?: () => void;
  onStoriesClick?: () => void;
  onGalleryClick?: () => void;
  onAdminClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentPage = 'home',
  onHomeClick,
  onAboutClick,
  onGoalsClick,
  onDonateClick, 
  onWhatWeDoClick, 
  onStoriesClick,
  onGalleryClick,
  onAdminClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavAction = (action?: () => void) => {
    if (action) action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 lg:px-8 py-3 sm:py-3.5 border-b border-gray-100 bg-white/90 backdrop-blur-md transition-all shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo & Brand Identity */}
        <div 
          onClick={onHomeClick}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group flex-shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#15803D] group-hover:bg-green-800 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0 transition-colors">
            <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-white text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-lg lg:text-xl font-black tracking-tight text-[#1A1A1A]">
                RISE & RESCUE
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold bg-green-50 text-[#15803D] px-2 py-0.5 rounded-full border border-green-200">
                <ShieldCheck className="w-3 h-3 text-[#15803D]" />
                501(c)(3)
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 hidden sm:block leading-tight">
              Sanctuary & Wildlife Medical Rehabilitation
            </p>
          </div>
        </div>

        {/* Desktop / Tablet Navigation Links (Hidden on small screens < md) */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          <button
            onClick={onHomeClick}
            className={`text-xs font-bold transition-all cursor-pointer px-3 py-1.5 rounded-full border ${
              currentPage === 'home'
                ? 'bg-green-50 text-[#15803D] border-green-200 font-black'
                : 'text-gray-600 hover:text-[#15803D] border-transparent hover:bg-gray-100'
            }`}
          >
            Home
          </button>

          <button
            onClick={onAboutClick}
            className={`text-xs font-bold transition-all cursor-pointer px-3 py-1.5 rounded-full border ${
              currentPage === 'about'
                ? 'bg-green-50 text-[#15803D] border-green-200 font-black'
                : 'text-gray-600 hover:text-[#15803D] border-transparent hover:bg-gray-100'
            }`}
          >
            About Us
          </button>

          <button
            onClick={onGoalsClick}
            className={`text-xs font-bold transition-all cursor-pointer px-3 py-1.5 rounded-full border ${
              currentPage === 'goals'
                ? 'bg-green-50 text-[#15803D] border-green-200 font-black'
                : 'text-gray-600 hover:text-[#15803D] border-transparent hover:bg-gray-100'
            }`}
          >
            Future Goals
          </button>

          <button
            onClick={onGalleryClick}
            className={`inline-flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer px-3 py-1.5 rounded-full border ${
              currentPage === 'gallery'
                ? 'bg-green-50 text-[#15803D] border-green-200 font-black'
                : 'text-gray-600 hover:text-[#15803D] border-transparent hover:bg-gray-100'
            }`}
          >
            <Images className="w-3.5 h-3.5" />
            <span>Gallery</span>
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Emergency Hotline - Desktop Only */}
          <div className="hidden xl:flex items-center gap-2 text-xs text-gray-600 bg-gray-50 border border-gray-200/80 px-3 py-1.5 rounded-full">
            <PhoneCall className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>
              <span className="text-gray-400 font-medium">Rescue:</span>{' '}
              <strong className="text-[#1A1A1A] font-semibold">1-800-723-3729</strong>
            </span>
          </div>

          {/* Quick Donate Button - Always Visible */}
          <button
            id="header-donate-btn"
            onClick={onDonateClick}
            className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white bg-[#15803D] hover:bg-green-800 active:bg-green-900 transition-all rounded-full shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white" />
            <span>Donate</span>
          </button>

          {/* Mobile Hamburger Menu Toggle Button (Visible only on < md) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-700 hover:text-[#15803D] hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#1A1A1A]" />
            ) : (
              <Menu className="w-5 h-5 text-[#1A1A1A]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown / Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 pb-4 border-t border-gray-200/80 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavAction(onHomeClick)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-left transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? 'bg-green-50 text-[#15803D]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>Home</span>
              {currentPage === 'home' && <span className="w-2 h-2 rounded-full bg-[#15803D]"></span>}
            </button>

            <button
              onClick={() => handleNavAction(onAboutClick)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-left transition-colors cursor-pointer ${
                currentPage === 'about'
                  ? 'bg-green-50 text-[#15803D]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>About Us</span>
              {currentPage === 'about' && <span className="w-2 h-2 rounded-full bg-[#15803D]"></span>}
            </button>

            <button
              onClick={() => handleNavAction(onGoalsClick)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-left transition-colors cursor-pointer ${
                currentPage === 'goals'
                  ? 'bg-green-50 text-[#15803D]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>Future Goals</span>
              {currentPage === 'goals' && <span className="w-2 h-2 rounded-full bg-[#15803D]"></span>}
            </button>

            <button
              onClick={() => handleNavAction(onGalleryClick)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-left transition-colors cursor-pointer ${
                currentPage === 'gallery'
                  ? 'bg-green-50 text-[#15803D]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Images className="w-4 h-4" />
                <span>Photo Showcase Gallery</span>
              </div>
              {currentPage === 'gallery' && <span className="w-2 h-2 rounded-full bg-[#15803D]"></span>}
            </button>

            {onAdminClick && (
              <button
                onClick={() => handleNavAction(onAdminClick)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer text-gray-500 hover:text-gray-800 hover:bg-gray-50`}
              >
                <span>Admin Panel</span>
              </button>
            )}
          </nav>

          {/* Emergency 24/7 Hotline Call Box on Mobile */}
          <div className="mt-3 pt-3 border-t border-gray-100 px-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-semibold block">24/7 Rescue Line</span>
                <a href="tel:18007233729" className="font-bold text-[#1A1A1A] hover:text-[#15803D]">
                  1-800-723-3729
                </a>
              </div>
            </div>

            <span className="text-[10px] font-bold bg-green-50 text-[#15803D] px-2 py-0.5 rounded-full border border-green-200">
              501(c)(3)
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
