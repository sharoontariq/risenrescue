import React from 'react';
import { Compass, PhoneCall } from 'lucide-react';
import { SiteContent } from '../../siteContent';

interface NavigationEditorProps {
  content: SiteContent['header'];
  onChange: (updated: SiteContent['header']) => void;
}

export const NavigationEditor: React.FC<NavigationEditorProps> = ({ content, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
          <Compass className="w-4 h-4 text-[#043E49]" />
          <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            Header Branding & Contacts
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Brand Title (Logo text)</label>
            <input
              type="text"
              value={content.brandName}
              onChange={(e) => onChange({ ...content, brandName: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Brand Tagline (Subtext)</label>
            <input
              type="text"
              value={content.brandTagline}
              onChange={(e) => onChange({ ...content, brandTagline: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-amber-500" />
              <span>Emergency Rescue Hotline Phone</span>
            </label>
            <input
              type="text"
              value={content.rescuePhone}
              onChange={(e) => onChange({ ...content, rescuePhone: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Donate Button Text</label>
            <input
              type="text"
              value={content.donateButtonText}
              onChange={(e) => onChange({ ...content, donateButtonText: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4">
        <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
          Navigation Menu Link Labels
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Home Link</label>
            <input
              type="text"
              value={content.navLinks.home}
              onChange={(e) =>
                onChange({
                  ...content,
                  navLinks: { ...content.navLinks, home: e.target.value }
                })
              }
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">About Us Link</label>
            <input
              type="text"
              value={content.navLinks.about}
              onChange={(e) =>
                onChange({
                  ...content,
                  navLinks: { ...content.navLinks, about: e.target.value }
                })
              }
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Future Goals Link</label>
            <input
              type="text"
              value={content.navLinks.goals}
              onChange={(e) =>
                onChange({
                  ...content,
                  navLinks: { ...content.navLinks, goals: e.target.value }
                })
              }
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Gallery Link</label>
            <input
              type="text"
              value={content.navLinks.gallery}
              onChange={(e) =>
                onChange({
                  ...content,
                  navLinks: { ...content.navLinks, gallery: e.target.value }
                })
              }
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
