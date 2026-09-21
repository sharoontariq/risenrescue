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
import { FooterContent } from '../siteContent';

interface FooterProps {
  content?: FooterContent;
  onNavigateHome: () => void;
  onNavigateAbout?: () => void;
  onNavigateGoals?: () => void;
  onNavigateGallery: () => void;
  onDonateClick: () => void;
  onWhatWeDoClick: () => void;
  onStoriesClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  content,
  onNavigateHome,
  onNavigateAbout,
  onNavigateGoals,
  onNavigateGallery,
  onDonateClick
}) => {
  const brandName = content?.brandName || 'Rise & Rescue Animal Welfare';
  const description = content?.description || 'Dedicated to stray animal care, compassionate veterinary rescue, and lifelong rehabilitation.';
  const rescuePhone = content?.rescuePhone || '+92-320-7482952';
  const rescuePhoneLabel = content?.rescuePhoneLabel || '24/7 Rescue Line';
  const email = content?.email || 'rise.rescuefsd@gmail.com';
  const addressLine1 = content?.addressLine1 || '224 RB Wazirkhan Wali, St #4';
  const addressLine2 = content?.addressLine2 || 'Gosiyabad, Faisalabad, 38000';
  const mapLink = content?.mapLink || 'https://maps.google.com/?q=224+RB+Wazirkhan+Wali+Faisalabad';
  const instagramUrl = content?.instagramUrl || 'https://instagram.com';
  const facebookUrl = content?.facebookUrl || 'https://facebook.com';
  const youtubeUrl = content?.youtubeUrl || 'https://youtube.com';
  const tiktokUrl = content?.tiktokUrl || 'https://tiktok.com/@riseandrescue';
  const copyrightText = content?.copyrightText || `© ${new Date().getFullYear()} Rise & Rescue Animal Welfare. All rights reserved.`;

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
                {brandName}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              {description}
            </p>
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
                  <a href={`tel:${rescuePhone.replace(/[^0-9+]/g, '')}`} className="text-gray-200 hover:text-white font-medium transition-colors">
                    {rescuePhone}
                  </a>
                  <span className="text-[9px] text-gray-500 block">{rescuePhoneLabel}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <Mail className="w-3.5 h-3.5 text-[#4fc3d0] flex-shrink-0" />
                <a href={`mailto:${email}`} className="text-gray-200 hover:text-white font-medium transition-colors">
                  {email}
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
                <p className="font-medium text-gray-200">{addressLine1}</p>
                <p className="text-gray-400 text-[10px] mt-0.5">{addressLine2}</p>
                {mapLink && (
                  <a 
                    href={mapLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-block text-[10px] text-[#4fc3d0] hover:underline mt-0.5"
                  >
                    View on Google Maps
                  </a>
                )}
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
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Follow us on Instagram"
                className="w-7.5 h-7.5 rounded-lg bg-gray-800/90 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] border border-gray-700/60 group cursor-pointer"
              >
                <Instagram className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                title="Follow us on Facebook"
                className="w-7.5 h-7.5 rounded-lg bg-gray-800/90 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-[#1877F2] border border-gray-700/60 group cursor-pointer"
              >
                <Facebook className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                title="Follow us on YouTube"
                className="w-7.5 h-7.5 rounded-lg bg-gray-800/90 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-[#FF0000] border border-gray-700/60 group cursor-pointer"
              >
                <Youtube className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href={tiktokUrl}
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
          <p>{copyrightText}</p>
          <div className="flex items-center gap-1.5 text-gray-500">
            <span>Rescue, Rehabilitation & Sanctuary Care</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
