import React from 'react';
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Youtube,
  Music2
} from 'lucide-react';
import { RiseAndRescueLogo } from './RiseAndRescueLogo';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateAbout?: () => void;
  onNavigateGoals?: () => void;
  onNavigateGallery: () => void;
  onNavigateAdmin: () => void;
  onDonateClick: () => void;
  onWhatWeDoClick: () => void;
  onStoriesClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateAbout,
  onNavigateGoals,
  onNavigateGallery,
  onNavigateAdmin,
  onDonateClick
}) => {
  return (
    <footer className="w-full bg-[#111827] text-gray-400 border-t border-gray-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand Info */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <RiseAndRescueLogo className="w-full h-full" inverted={true} />
              </div>
              <span className="font-bold text-sm text-white tracking-tight">
                Rise & Rescue Animal Welfare
              </span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Dedicated to stray animal care, compassionate veterinary rescue, and lifelong rehabilitation.
            </p>
            <span className="inline-block text-[10px] font-semibold text-[#4fc3d0] bg-[#043E49]/60 border border-[#043E49] px-2 py-0.5 rounded-full">
              501(c)(3) Non-Profit
            </span>
          </div>

          {/* Contact Details (Phone & Email) */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              Contact Us
            </h4>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#4fc3d0] flex-shrink-0" />
                <div>
                  <a href="tel:18007233729" className="text-gray-200 hover:text-white font-medium transition-colors">
                    1-800-723-3729
                  </a>
                  <span className="text-[9px] text-gray-500 block">24/7 Rescue Line</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <Mail className="w-3.5 h-3.5 text-[#4fc3d0] flex-shrink-0" />
                <a href="mailto:contact@riseandrescue.org" className="text-gray-200 hover:text-white font-medium transition-colors">
                  contact@riseandrescue.org
                </a>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              Sanctuary Address
            </h4>
            <div className="flex items-start gap-2 text-[11px] text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-[#4fc3d0] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-200">4280 Meadowbrook Sanctuary Way</p>
                <p className="text-gray-400 text-[10px] mt-0.5">Boulder Foothills, CO 80302</p>
                <a 
                  href="https://maps.google.com/?q=Boulder+CO" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-block text-[10px] text-[#4fc3d0] hover:underline mt-0.5"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Social Media Links & Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              Follow Us
            </h4>
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Follow us on Instagram"
                className="w-7.5 h-7.5 rounded-lg bg-gray-800/90 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] border border-gray-700/60 group cursor-pointer"
              >
                <Instagram className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                title="Follow us on Facebook"
                className="w-7.5 h-7.5 rounded-lg bg-gray-800/90 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-[#1877F2] border border-gray-700/60 group cursor-pointer"
              >
                <Facebook className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                title="Follow us on YouTube"
                className="w-7.5 h-7.5 rounded-lg bg-gray-800/90 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-[#FF0000] border border-gray-700/60 group cursor-pointer"
              >
                <Youtube className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://tiktok.com/@riseandrescue"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                title="Follow us on TikTok"
                className="w-7.5 h-7.5 rounded-lg bg-gray-800/90 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-black border border-gray-700/60 group cursor-pointer"
              >
                <Music2 className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
              </a>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-2 pt-1 text-[11px] flex-wrap">
              <button onClick={onNavigateHome} className="hover:text-white transition-colors cursor-pointer">
                Home
              </button>
              <span>•</span>
              {onNavigateAbout && (
                <>
                  <button onClick={onNavigateAbout} className="hover:text-white transition-colors cursor-pointer">
                    About Us
                  </button>
                  <span>•</span>
                </>
              )}
              {onNavigateGoals && (
                <>
                  <button onClick={onNavigateGoals} className="hover:text-white transition-colors cursor-pointer">
                    Future Goals
                  </button>
                  <span>•</span>
                </>
              )}
              <button onClick={onNavigateGallery} className="hover:text-white transition-colors cursor-pointer">
                Gallery
              </button>
              <span>•</span>
              <button onClick={onDonateClick} className="text-[#4fc3d0] hover:text-[#76d6e1] font-semibold cursor-pointer">
                Donate
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Minimal Copyright Bar */}
        <div className="mt-6 pt-4 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} Rise & Rescue Animal Welfare. All donations are tax-deductible.</p>
          <button
            onClick={onNavigateAdmin}
            className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer text-[10px]"
          >
            Admin Panel
          </button>
        </div>
      </div>
    </footer>
  );
};
