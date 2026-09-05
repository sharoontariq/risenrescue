import React from 'react';
import { ShieldCheck, PhoneCall, Heart } from 'lucide-react';

interface HeaderProps {
  onDonateClick?: () => void;
  onWhatWeDoClick?: () => void;
  onStoriesClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDonateClick, onWhatWeDoClick, onStoriesClick }) => {
  return (
    <header className="relative z-30 w-full px-4 sm:px-8 lg:px-12 py-4 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo & Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#15803D] rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Heart className="w-4 h-4 fill-white text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-[#1A1A1A]">
                PAWHAVEN
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-green-50 text-[#15803D] px-2.5 py-0.5 rounded-full border border-green-200">
                <ShieldCheck className="w-3 h-3 text-[#15803D]" />
                501(c)(3) Non-Profit
              </span>
            </div>
            <p className="text-xs text-gray-500 hidden sm:block">
              Sanctuary & Wildlife Medical Rehabilitation
            </p>
          </div>
        </div>

        {/* Navigation & Fast Action */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onWhatWeDoClick}
            className="hidden sm:inline-flex items-center text-xs font-bold text-gray-600 hover:text-[#15803D] transition-colors cursor-pointer px-3.5 py-2 rounded-full hover:bg-gray-100 border border-transparent hover:border-gray-200"
          >
            What We Do
          </button>

          <button
            onClick={onStoriesClick}
            className="hidden sm:inline-flex items-center text-xs font-bold text-gray-600 hover:text-[#15803D] transition-colors cursor-pointer px-3.5 py-2 rounded-full hover:bg-gray-100 border border-transparent hover:border-gray-200"
          >
            Stories
          </button>

          <div className="hidden lg:flex items-center gap-2 text-xs text-gray-600 bg-gray-50 border border-gray-200/80 px-3.5 py-1.5 rounded-full">
            <PhoneCall className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>
              <span className="text-gray-400 font-medium">24/7 Rescue:</span>{' '}
              <strong className="text-[#1A1A1A] font-semibold">1-800-SAFE-PAW</strong>
            </span>
          </div>

          <button
            id="header-donate-btn"
            onClick={onDonateClick}
            className="flex items-center gap-2 px-6 py-2 text-xs sm:text-sm font-semibold text-white bg-[#15803D] hover:bg-green-800 active:bg-green-900 transition-colors rounded-full shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Heart className="w-4 h-4 fill-white text-white" />
            <span>Donate Now</span>
          </button>
        </div>
      </div>
    </header>
  );
};
