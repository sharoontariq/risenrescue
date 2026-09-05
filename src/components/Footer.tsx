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

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateGallery: () => void;
  onNavigateAdmin: () => void;
  onDonateClick: () => void;
  onWhatWeDoClick: () => void;
  onStoriesClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateGallery,
  onNavigateAdmin,
  onDonateClick
}) => {
  return (
    <footer className="w-full bg-[#111827] text-gray-400 border-t border-gray-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#15803D] flex items-center justify-center text-white">
                <Heart className="w-3.5 h-3.5 fill-white" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                Rise & Rescue
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Dedicated to wildlife rehabilitation, compassionate veterinary rescue, and lifelong sanctuary protection.
            </p>
            <span className="inline-block text-[11px] font-semibold text-green-400 bg-green-950/60 border border-green-800/50 px-2.5 py-0.5 rounded-full">
              501(c)(3) Non-Profit
            </span>
          </div>

          {/* Contact Details (Phone & Email) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact Us
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                <div>
                  <a href="tel:18007233729" className="text-gray-200 hover:text-white font-medium transition-colors">
                    1-800-723-3729
                  </a>
                  <span className="text-[10px] text-gray-500 block">24/7 Rescue Line</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="w-4 h-4 text-green-500 flex-shrink-0" />
                <a href="mailto:contact@riseandrescue.org" className="text-gray-200 hover:text-white font-medium transition-colors">
                  contact@riseandrescue.org
                </a>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Sanctuary Address
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-gray-300">
              <MapPin className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-200">4280 Meadowbrook Sanctuary Way</p>
                <p className="text-gray-400 text-[11px] mt-0.5">Boulder Foothills, CO 80302</p>
                <a 
                  href="https://maps.google.com/?q=Boulder+CO" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-block text-[11px] text-green-400 hover:underline mt-1"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Social Media Links & Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Follow Us
            </h4>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Follow us on Instagram"
                className="w-9 h-9 rounded-xl bg-gray-800/90 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:shadow-[0_6px_16px_rgba(220,39,67,0.45)] border border-gray-700/60 group cursor-pointer"
              >
                <Instagram className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                title="Follow us on Facebook"
                className="w-9 h-9 rounded-xl bg-gray-800/90 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 hover:bg-[#1877F2] hover:shadow-[0_6px_16px_rgba(24,119,242,0.45)] border border-gray-700/60 group cursor-pointer"
              >
                <Facebook className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                title="Follow us on YouTube"
                className="w-9 h-9 rounded-xl bg-gray-800/90 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 hover:bg-[#FF0000] hover:shadow-[0_6px_16px_rgba(255,0,0,0.45)] border border-gray-700/60 group cursor-pointer"
              >
                <Youtube className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://tiktok.com/@riseandrescue"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                title="Follow us on TikTok"
                className="w-9 h-9 rounded-xl bg-gray-800/90 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 hover:bg-black hover:border-cyan-400/60 hover:shadow-[0_6px_16px_rgba(0,0,0,0.7)] border border-gray-700/60 group cursor-pointer"
              >
                <Music2 className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
              </a>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-3 pt-2 text-xs">
              <button onClick={onNavigateHome} className="hover:text-white transition-colors cursor-pointer">
                Home
              </button>
              <span>•</span>
              <button onClick={onNavigateGallery} className="hover:text-white transition-colors cursor-pointer">
                Gallery
              </button>
              <span>•</span>
              <button onClick={onDonateClick} className="text-green-400 hover:text-green-300 font-semibold cursor-pointer">
                Donate
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Minimal Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Rise & Rescue Animal Welfare. All donations are tax-deductible.</p>
          <button
            onClick={onNavigateAdmin}
            className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer text-[11px]"
          >
            Admin Panel
          </button>
        </div>
      </div>
    </footer>
  );
};
