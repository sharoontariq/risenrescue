import React, { useState } from 'react';
import { 
  Home, 
  Info, 
  Compass, 
  Image as ImageIcon, 
  Navigation, 
  FileText, 
  Save, 
  RotateCcw, 
  Eye, 
  Check, 
  ArrowLeft,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { SiteContent, DEFAULT_SITE_CONTENT } from '../../siteContent';
import { GalleryItem } from '../../types';
import { HomeEditor } from './HomeEditor';
import { AboutUsEditor } from './AboutUsEditor';
import { FutureGoalsEditor } from './FutureGoalsEditor';
import { GalleryEditor } from './GalleryEditor';
import { NavigationEditor } from './NavigationEditor';
import { FooterEditor } from './FooterEditor';
import { RiseAndRescueLogo } from '../RiseAndRescueLogo';

interface AdminDashboardProps {
  currentContent: SiteContent;
  galleryItems: GalleryItem[];
  onSaveContent: (updatedContent: SiteContent, updatedGallery: GalleryItem[]) => void;
  onPreview: () => void;
  onExitAdmin: () => void;
}

export type AdminTab = 'home' | 'about' | 'goals' | 'gallery' | 'navigation' | 'footer';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentContent,
  galleryItems,
  onSaveContent,
  onPreview,
  onExitAdmin
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('home');
  const [draftContent, setDraftContent] = useState<SiteContent>(currentContent);
  const [draftGallery, setDraftGallery] = useState<GalleryItem[]>(galleryItems);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleContentChange = (updated: SiteContent) => {
    setDraftContent(updated);
    setHasUnsavedChanges(true);
  };

  const handleGalleryChange = (updated: GalleryItem[]) => {
    setDraftGallery(updated);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    onSaveContent(draftContent, draftGallery);
    setHasUnsavedChanges(false);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 3000);
  };

  const handleDiscardChanges = () => {
    setDraftContent(currentContent);
    setDraftGallery(galleryItems);
    setHasUnsavedChanges(false);
  };

  const handleResetToDefault = () => {
    setDraftContent(DEFAULT_SITE_CONTENT);
    setHasUnsavedChanges(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#043E49] text-white border-b border-[#032f38] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center p-1.5 border border-white/20">
              <RiseAndRescueLogo className="w-full h-full" inverted={true} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm tracking-wide text-white">Admin Management Panel</span>
                <span className="text-[10px] uppercase font-bold bg-[#E67E22] text-white px-2 py-0.5 rounded-full tracking-wider">
                  Live Editor
                </span>
              </div>
              <p className="text-[11px] text-white/70 hidden sm:block">
                Edit and update all content across the website
              </p>
            </div>
          </div>

          {/* Action Buttons: Preview, Discard, Save */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onPreview}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/20"
              title="View how the site looks with current changes"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview Website</span>
              <span className="sm:hidden">Preview</span>
            </button>

            {hasUnsavedChanges && (
              <button
                type="button"
                onClick={handleDiscardChanges}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 transition-all cursor-pointer border border-rose-400/30"
                title="Discard unsaved edits"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cancel</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleSave}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer shadow-md ${
                hasUnsavedChanges
                  ? 'bg-[#E67E22] hover:bg-[#d4721c] text-white ring-2 ring-amber-300/40 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Save className="w-4 h-4" />
              <span>{hasUnsavedChanges ? 'Save Changes' : 'Saved'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Body: Sidebar + Main Work Canvas */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-2xs space-y-1">
            <div className="px-3 py-2 text-[10px] font-black uppercase text-gray-600 tracking-wider">
              Website Pages
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#043E49] text-white shadow-2xs'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Home className="w-4 h-4" />
                <span>Home Page</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeTab === 'home' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                4 parts
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('about')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-[#043E49] text-white shadow-2xs'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Info className="w-4 h-4" />
                <span>About Us</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeTab === 'about' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                Team & Mission
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('goals')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'goals'
                  ? 'bg-[#043E49] text-white shadow-2xs'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4" />
                <span>Future Goals</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeTab === 'goals' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {draftContent.goals.goals.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-[#043E49] text-white shadow-2xs'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-4 h-4" />
                <span>Gallery</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeTab === 'gallery' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {draftGallery.length}
              </span>
            </button>

            <div className="pt-2 mt-2 border-t border-gray-100">
              <div className="px-3 py-2 text-[10px] font-black uppercase text-gray-600 tracking-wider">
                Site-Wide Elements
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('navigation')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'navigation'
                    ? 'bg-[#043E49] text-white shadow-2xs'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-4 h-4" />
                  <span>Header & Nav</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('footer')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'footer'
                    ? 'bg-[#043E49] text-white shadow-2xs'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4" />
                  <span>Footer & Contacts</span>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs space-y-3">
            <h5 className="text-[11px] font-black text-gray-700 uppercase tracking-wider">
              Control Panel
            </h5>

            <button
              type="button"
              onClick={onExitAdmin}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </button>

            <button
              type="button"
              onClick={handleResetToDefault}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Factory Defaults</span>
            </button>
          </div>
        </aside>

        {/* Main Editor Content Area */}
        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-2xs">
            <div className="border-b border-gray-200 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-black text-[#1A1A1A]">
                  {activeTab === 'home' && 'Home Page Editor'}
                  {activeTab === 'about' && 'About Us Page Editor'}
                  {activeTab === 'goals' && 'Future Goals Page Editor'}
                  {activeTab === 'gallery' && 'Gallery Photos Manager'}
                  {activeTab === 'navigation' && 'Header Navigation & Branding'}
                  {activeTab === 'footer' && 'Footer, Contacts & Social Media'}
                </h2>
                <p className="text-xs text-gray-500">
                  {activeTab === 'home' && 'Manage hero slideshows, bank details, mission pillars, and animal rescue stories.'}
                  {activeTab === 'about' && 'Update organization story, mission & vision statements, and team member profiles.'}
                  {activeTab === 'goals' && 'Configure future strategic initiatives, target years, milestones, and image cards.'}
                  {activeTab === 'gallery' && 'Upload new photos, edit titles/captions, reorder, or remove images.'}
                  {activeTab === 'navigation' && 'Update brand logo title, tagline, rescue phone number, and nav link labels.'}
                  {activeTab === 'footer' && 'Update organization mission summary, address, social media links, and copyright.'}
                </p>
              </div>

              {hasUnsavedChanges && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold shrink-0">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>Unsaved Changes</span>
                </div>
              )}
            </div>

            {/* Active Sub-Editor */}
            {activeTab === 'home' && (
              <HomeEditor
                content={draftContent.home}
                onChange={(updated) => handleContentChange({ ...draftContent, home: updated })}
              />
            )}

            {activeTab === 'about' && (
              <AboutUsEditor
                content={draftContent.about}
                onChange={(updated) => handleContentChange({ ...draftContent, about: updated })}
              />
            )}

            {activeTab === 'goals' && (
              <FutureGoalsEditor
                content={draftContent.goals}
                onChange={(updated) => handleContentChange({ ...draftContent, goals: updated })}
              />
            )}

            {activeTab === 'gallery' && (
              <GalleryEditor
                items={draftGallery}
                onChange={handleGalleryChange}
              />
            )}

            {activeTab === 'navigation' && (
              <NavigationEditor
                content={draftContent.header}
                onChange={(updated) => handleContentChange({ ...draftContent, header: updated })}
              />
            )}

            {activeTab === 'footer' && (
              <FooterEditor
                content={draftContent.footer}
                onChange={(updated) => handleContentChange({ ...draftContent, footer: updated })}
              />
            )}
          </div>
        </main>
      </div>

      {/* Floating Save Notification Toast */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#043E49] text-white px-5 py-3 rounded-xl shadow-xl border border-white/20 flex items-center gap-3 animate-bounce">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-black text-xs">Content Saved Successfully!</div>
            <div className="text-[11px] text-white/80">All edits are now live on your website.</div>
          </div>
        </div>
      )}
    </div>
  );
};
