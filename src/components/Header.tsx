import React, { useState } from 'react';
import { PhoneCall, Heart, Menu, X } from 'lucide-react';
import { RiseAndRescueLogo } from './RiseAndRescueLogo';

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
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 border-b border-gray-100 bg-white/90 backdrop-blur-md transition-all shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        {/* Logo & Brand Identity */}
        <div 
          onClick={onHomeClick}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group flex-shrink-0"
        >
          <div className="w-8 h-8 sm:w-9.5 sm:h-9.5 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
            <RiseAndRescueLogo className="w-full h-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-[#1A1A1A]">
                RISE & RESCUE ANIMAL WELFARE
              </span>
            </div>
            <p className="text-[10px] sm:text-[11.5px] text-gray-500 hidden sm:block leading-tight">
              Stray Animal Care & Rehabilitation
            </p>
          </div>
        </div>

        {/* Desktop / Tablet Navigation Links (Hidden on small screens < md) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <button
            onClick={onHomeClick}
            className={`text-xs sm:text-sm font-bold transition-all cursor-pointer px-3.5 py-1.5 rounded-full border ${
              currentPage === 'home'
                ? 'bg-[#043E49]/10 text-[#043E49] border-[#043E49]/20 font-black'
                : 'text-gray-600 hover:text-[#043E49] border-transparent hover:bg-gray-100'
            }`}
          >
            Home
          </button>

          <button
            onClick={onAboutClick}
            className={`text-xs sm:text-sm font-bold transition-all cursor-pointer px-3.5 py-1.5 rounded-full border ${
              currentPage === 'about'
                ? 'bg-[#043E49]/10 text-[#043E49] border-[#043E49]/20 font-black'
                : 'text-gray-600 hover:text-[#043E49] border-transparent hover:bg-gray-100'
            }`}
          >
            About Us
          </button>

          <button
            onClick={onGoalsClick}
            className={`text-xs sm:text-sm font-bold transition-all cursor-pointer px-3.5 py-1.5 rounded-full border ${
              currentPage === 'goals'
                ? 'bg-[#043E49]/10 text-[#043E49] border-[#043E49]/20 font-black'
                : 'text-gray-600 hover:text-[#043E49] border-transparent hover:bg-gray-100'
            }`}
          >
            Future Goals
          </button>

          <button
            onClick={onGalleryClick}
            className={`text-xs sm:text-sm font-bold transition-all cursor-pointer px-3.5 py-1.5 rounded-full border ${
              currentPage === 'gallery'
                ? 'bg-[#043E49]/10 text-[#043E49] border-[#043E49]/20 font-black'
                : 'text-gray-600 hover:text-[#043E49] border-transparent hover:bg-gray-100'
            }`}
          >
            Gallery
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Emergency Hotline - Desktop Only */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-200/80 px-3 py-1.5 rounded-full">
            <PhoneCall className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>
              <span className="text-gray-400 font-medium">Rescue:</span>{' '}
              <a href="tel:+923207482952" className="text-[#1A1A1A] font-semibold hover:text-[#043E49]">
                +92-320-7482952
              </a>
            </span>
          </div>

          {/* Quick Donate Button - Always Visible */}
          <button
            id="header-donate-btn"
            onClick={onDonateClick}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white bg-[#043E49] hover:bg-[#032f38] active:bg-[#02232a] transition-all rounded-full shadow-2xs cursor-pointer whitespace-nowrap"
          >
            <Heart className="w-4 h-4 fill-white text-white" />
            <span>Donate</span>
          </button>

          {/* Mobile Hamburger Menu Toggle Button (Visible only on < md) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-gray-700 hover:text-[#043E49] hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-[#1A1A1A]" />
            ) : (
              <Menu className="w-4 h-4 text-[#1A1A1A]" />
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
                  ? 'bg-[#043E49]/10 text-[#043E49]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>Home</span>
              {currentPage === 'home' && <span className="w-2 h-2 rounded-full bg-[#043E49]"></span>}
            </button>

            <button
              onClick={() => handleNavAction(onAboutClick)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-left transition-colors cursor-pointer ${
                currentPage === 'about'
                  ? 'bg-[#043E49]/10 text-[#043E49]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>About Us</span>
              {currentPage === 'about' && <span className="w-2 h-2 rounded-full bg-[#043E49]"></span>}
            </button>

            <button
              onClick={() => handleNavAction(onGoalsClick)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-left transition-colors cursor-pointer ${
                currentPage === 'goals'
                  ? 'bg-[#043E49]/10 text-[#043E49]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>Future Goals</span>
              {currentPage === 'goals' && <span className="w-2 h-2 rounded-full bg-[#043E49]"></span>}
            </button>

            <button
              onClick={() => handleNavAction(onGalleryClick)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-left transition-colors cursor-pointer ${
                currentPage === 'gallery'
                  ? 'bg-[#043E49]/10 text-[#043E49]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>Gallery</span>
              {currentPage === 'gallery' && <span className="w-2 h-2 rounded-full bg-[#043E49]"></span>}
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
                <a href="tel:+923207482952" className="font-bold text-[#1A1A1A] hover:text-[#043E49]">
                  +92-320-7482952
                </a>
              </div>
            </div>

            <span className="text-[10px] font-bold bg-[#043E49]/10 text-[#043E49] px-2 py-0.5 rounded-full border border-[#043E49]/20">
              501(c)(3)
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
