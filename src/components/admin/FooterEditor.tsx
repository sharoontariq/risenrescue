import React from 'react';
import { 
  Building2, 
  Mail, 
  PhoneCall, 
  MapPin, 
  Share2 
} from 'lucide-react';
import { SiteContent } from '../../siteContent';

interface FooterEditorProps {
  content: SiteContent['footer'];
  onChange: (updated: SiteContent['footer']) => void;
}

export const FooterEditor: React.FC<FooterEditorProps> = ({ content, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Brand & Description */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
          <Building2 className="w-4 h-4 text-[#043E49]" />
          <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            Footer Identity & Mission Summary
          </h4>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Footer Brand Name</label>
            <input
              type="text"
              value={content.brandName}
              onChange={(e) => onChange({ ...content, brandName: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Mission Description Text</label>
            <textarea
              rows={2}
              value={content.description}
              onChange={(e) => onChange({ ...content, description: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Contact & Location Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
          <PhoneCall className="w-4 h-4 text-[#043E49]" />
          <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            Contact & Sanctuary Address
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Rescue Phone Number</label>
            <input
              type="text"
              value={content.rescuePhone}
              onChange={(e) => onChange({ ...content, rescuePhone: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Phone Label / Availability</label>
            <input
              type="text"
              value={content.rescuePhoneLabel}
              onChange={(e) => onChange({ ...content, rescuePhoneLabel: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
              <Mail className="w-3 h-3 text-[#043E49]" />
              <span>Official Email Address</span>
            </label>
            <input
              type="email"
              value={content.email}
              onChange={(e) => onChange({ ...content, email: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#043E49]" />
              <span>Physical Address Line 1</span>
            </label>
            <input
              type="text"
              value={content.addressLine1}
              onChange={(e) => onChange({ ...content, addressLine1: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Address Line 2 (City, Zip, Country)</label>
            <input
              type="text"
              value={content.addressLine2}
              onChange={(e) => onChange({ ...content, addressLine2: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-[11px] font-bold text-gray-700">Google Maps Link</label>
            <input
              type="text"
              value={content.mapLink}
              onChange={(e) => onChange({ ...content, mapLink: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Social Media Links & Copyright */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
          <Share2 className="w-4 h-4 text-[#043E49]" />
          <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            Social Media Handles & Copyright
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Instagram Profile URL</label>
            <input
              type="text"
              value={content.instagramUrl}
              onChange={(e) => onChange({ ...content, instagramUrl: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Facebook Page URL</label>
            <input
              type="text"
              value={content.facebookUrl}
              onChange={(e) => onChange({ ...content, facebookUrl: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">YouTube Channel URL</label>
            <input
              type="text"
              value={content.youtubeUrl}
              onChange={(e) => onChange({ ...content, youtubeUrl: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">TikTok Profile URL</label>
            <input
              type="text"
              value={content.tiktokUrl}
              onChange={(e) => onChange({ ...content, tiktokUrl: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-[11px] font-bold text-gray-700">Copyright Line</label>
            <input
              type="text"
              value={content.copyrightText}
              onChange={(e) => onChange({ ...content, copyrightText: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
