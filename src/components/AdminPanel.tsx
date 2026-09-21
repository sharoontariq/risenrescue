import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Trash2, 
  Image as ImageIcon, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2, 
  Plus, 
  ExternalLink,
  Shield,
  Clock,
  LogOut,
  Save,
  RotateCcw,
  Layout,
  FileText,
  Target,
  Compass,
  CreditCard,
  Layers,
  Sparkles,
  Users,
  Building,
  Phone,
  Globe,
  HelpCircle,
  Eye,
  Check
} from 'lucide-react';
import { GalleryItem, CarouselSlide, WhatWeDoItem, StoryCardItem } from '../types';
import { 
  SiteContent, 
  AboutTeamMember, 
  FutureGoalItem, 
  DEFAULT_SITE_CONTENT 
} from '../siteContent';

interface AdminPanelProps {
  content: SiteContent;
  onSaveContent: (newContent: SiteContent) => void;
  onResetContent: () => void;
  galleryItems: GalleryItem[];
  onAddPhoto: (item: GalleryItem) => void;
  onDeletePhoto: (id: string) => void;
  onViewGallery: () => void;
  onBackToHome: () => void;
  onLogout?: () => void;
}

type AdminTab = 'general' | 'home-hero' | 'home-sections' | 'about' | 'goals' | 'gallery';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  content,
  onSaveContent,
  onResetContent,
  galleryItems,
  onAddPhoto,
  onDeletePhoto,
  onViewGallery,
  onBackToHome,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('home-hero');
  const [formData, setFormData] = useState<SiteContent>(() => JSON.parse(JSON.stringify(content)));
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Gallery photo upload state
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hero Carousel image upload state
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const [isHeroDragging, setIsHeroDragging] = useState(false);
  const [heroUrlInput, setHeroUrlInput] = useState('');
  const [heroActionStatus, setHeroActionStatus] = useState<string | null>(null);

  // Update local formData if external content updates
  React.useEffect(() => {
    setFormData(JSON.parse(JSON.stringify(content)));
  }, [content]);

  const handleSave = () => {
    onSaveContent(formData);
    setSaveStatus('Changes saved and published across the website!');
    setTimeout(() => setSaveStatus(null), 3500);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all website text, slides, stories, and sections to default? Your uploaded gallery photos will remain safe.')) {
      onResetContent();
      setFormData(JSON.parse(JSON.stringify(DEFAULT_SITE_CONTENT)));
      setSaveStatus('All content restored to original defaults.');
      setTimeout(() => setSaveStatus(null), 3500);
    }
  };

  // Hero Carousel multi-file local upload
  const handleHeroLocalFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (validFiles.length === 0) {
      alert('Please select valid image files (PNG, JPG, WEBP, etc.)');
      return;
    }

    let loadedCount = 0;
    const newSlides: CarouselSlide[] = [];

    validFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          newSlides.push({
            id: `slide-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 6)}`,
            title: 'Sanctuary Animal Rescue',
            subtitle: 'Frontline Sanctuary Care',
            story: 'Safe haven and lifelong rehabilitation for rescued animals.',
            animalName: 'Sanctuary Rescue',
            category: 'Canine Care',
            location: 'Sanctuary Grounds',
            impactFact: '100% of donor funding goes directly toward emergency animal medical care.',
            imageUrl: dataUrl,
            imageAlt: cleanName || 'Hero carousel slide'
          });
        }

        loadedCount++;
        if (loadedCount === validFiles.length) {
          setFormData(prev => ({
            ...prev,
            home: {
              ...prev.home,
              heroSlides: [...prev.home.heroSlides, ...newSlides]
            }
          }));
          setHeroActionStatus(`Added ${newSlides.length} image${newSlides.length > 1 ? 's' : ''}! Click "Save & Publish" to update the live website.`);
          setTimeout(() => setHeroActionStatus(null), 4000);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Add slide from web image URL
  const handleAddHeroUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const url = heroUrlInput.trim();
    if (!url) return;

    const newSlide: CarouselSlide = {
      id: `slide-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      title: 'Sanctuary Animal Rescue',
      subtitle: 'Frontline Sanctuary Care',
      story: 'Safe haven and lifelong rehabilitation for rescued animals.',
      animalName: 'Sanctuary Rescue',
      category: 'Canine Care',
      location: 'Sanctuary Grounds',
      impactFact: '100% of donor funding goes directly toward emergency animal medical care.',
      imageUrl: url,
      imageAlt: 'Hero carousel slide'
    };

    setFormData(prev => ({
      ...prev,
      home: {
        ...prev.home,
        heroSlides: [...prev.home.heroSlides, newSlide]
      }
    }));
    setHeroUrlInput('');
    setHeroActionStatus('New image URL added! Click "Save & Publish" to update the live website.');
    setTimeout(() => setHeroActionStatus(null), 4000);
  };

  // Delete slide from carousel
  const handleDeleteHeroSlide = (index: number) => {
    if (formData.home.heroSlides.length <= 1) {
      alert('You need to keep at least one image in the hero carousel.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      home: {
        ...prev.home,
        heroSlides: prev.home.heroSlides.filter((_, i) => i !== index)
      }
    }));
    setHeroActionStatus('Image removed from carousel.');
    setTimeout(() => setHeroActionStatus(null), 3000);
  };

  // Reorder slide
  const handleMoveHeroSlide = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= formData.home.heroSlides.length) return;
    const updated = [...formData.home.heroSlides];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setFormData(prev => ({
      ...prev,
      home: {
        ...prev.home,
        heroSlides: updated
      }
    }));
  };

  // Replace existing slide image via local file
  const handleReplaceHeroSlideFile = (index: number, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WEBP, etc.)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        const updated = [...formData.home.heroSlides];
        updated[index] = {
          ...updated[index],
          imageUrl: dataUrl,
          imageAlt: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || updated[index].imageAlt
        };
        setFormData(prev => ({
          ...prev,
          home: {
            ...prev.home,
            heroSlides: updated
          }
        }));
        setHeroActionStatus(`Replaced image for Slide ${index + 1}.`);
        setTimeout(() => setHeroActionStatus(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  // Add new What We Do Pillar Card
  const handleAddWhatWeDoCard = () => {
    const newPillar: WhatWeDoItem = {
      id: `pillar-${Date.now()}`,
      tag: 'New Mission Pillar',
      title: 'Emergency Medical Rescue',
      metricNumber: '24/7',
      metricLabel: 'Rapid Response Care',
      description: 'Dedicated rescue operations providing immediate triage, emergency surgical intervention, and lifelong shelter rehabilitation.',
      imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Sanctuary pillar rescue initiative'
    };
    setFormData(prev => ({
      ...prev,
      home: {
        ...prev.home,
        whatWeDoItems: [...prev.home.whatWeDoItems, newPillar]
      }
    }));
  };

  // Upload or replace local image for a specific What We Do card
  const handleWhatWeDoImageUpload = (index: number, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WEBP, etc.)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        const updated = [...formData.home.whatWeDoItems];
        updated[index] = {
          ...updated[index],
          imageUrl: dataUrl,
          imageAlt: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || updated[index].imageAlt
        };
        setFormData(prev => ({
          ...prev,
          home: {
            ...prev.home,
            whatWeDoItems: updated
          }
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Delete What We Do card
  const handleDeleteWhatWeDoCard = (index: number) => {
    if (formData.home.whatWeDoItems.length <= 1) {
      alert('You must keep at least 1 mission pillar card.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      home: {
        ...prev.home,
        whatWeDoItems: prev.home.whatWeDoItems.filter((_, i) => i !== index)
      }
    }));
  };

  // Move What We Do card
  const handleMoveWhatWeDoCard = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= formData.home.whatWeDoItems.length) return;
    const updated = [...formData.home.whatWeDoItems];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setFormData(prev => ({
      ...prev,
      home: {
        ...prev.home,
        whatWeDoItems: updated
      }
    }));
  };

  // Add Rescue Story Card
  const handleAddStoryCard = () => {
    const newStory: StoryCardItem = {
      id: `story-${Date.now()}`,
      name: 'New Animal',
      title: 'Second Chance at Life',
      category: 'Canine Rehabilitation',
      description: 'Found injured and malnourished, now flourishing under medical care and compassion.',
      imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Rescued animal recovering safely',
      status: 'Recovering in Sanctuary'
    };
    setFormData(prev => ({
      ...prev,
      home: {
        ...prev.home,
        storiesItems: [...prev.home.storiesItems, newStory]
      }
    }));
  };

  // Upload local image for Rescue Story Card
  const handleStoryImageUpload = (index: number, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setFormData(prev => {
          const updated = [...prev.home.storiesItems];
          if (updated[index]) {
            updated[index] = {
              ...updated[index],
              imageUrl: result,
              imageAlt: updated[index].name || file.name
            };
          }
          return {
            ...prev,
            home: {
              ...prev.home,
              storiesItems: updated
            }
          };
        });
      }
    };
    reader.readAsDataURL(file);
  };

  // Delete Story Card
  const handleDeleteStoryCard = (index: number) => {
    if (formData.home.storiesItems.length <= 1) {
      alert('You must keep at least one story card.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      home: {
        ...prev.home,
        storiesItems: prev.home.storiesItems.filter((_, i) => i !== index)
      }
    }));
  };

  // Move Story Card
  const handleMoveStoryCard = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= formData.home.storiesItems.length) return;
    const updated = [...formData.home.storiesItems];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setFormData(prev => ({
      ...prev,
      home: {
        ...prev.home,
        storiesItems: updated
      }
    }));
  };

  // Gallery photo file handling
  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewImage(result);
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setPhotoTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoPublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewImage) {
      alert('Please select an image to upload.');
      return;
    }

    const newItem: GalleryItem = {
      id: `gallery-photo-${Date.now()}`,
      title: photoTitle.trim() || 'Untitled Photo',
      caption: photoCaption.trim() || '',
      category: 'Gallery',
      imageUrl: previewImage,
      uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      isUserUploaded: true
    };

    onAddPhoto(newItem);
    setPreviewImage(null);
    setPhotoTitle('');
    setPhotoCaption('');
    setSaveStatus('Photo published directly to Gallery!');
    setTimeout(() => setSaveStatus(null), 3500);
  };

  const handleDeletePhotoItem = (id: string, itemTitle: string) => {
    if (window.confirm(`Delete "${itemTitle}" from the gallery?`)) {
      onDeletePhoto(id);
      setSaveStatus(`Removed "${itemTitle}" from gallery.`);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  return (
    <div className="w-full bg-[#F4F6F8] min-h-screen pb-20 text-[#1A1A1A]">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onBackToHome}
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer border border-gray-200"
                title="View Website"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="p-0.5 rounded bg-[#043E49]/10 text-[#043E49]">
                    <Shield className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#043E49]">
                    Website Admin Portal
                  </span>
                </div>
                <h1 className="text-lg sm:text-xl font-black text-[#1A1A1A] tracking-tight mt-0.5">
                  Content Management Dashboard
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleResetToDefaults}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-colors cursor-pointer"
                title="Restore default texts"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Defaults</span>
              </button>

              <button
                type="button"
                onClick={onViewGallery}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#043E49] bg-[#043E49]/10 hover:bg-[#043E49]/20 border border-[#043E49]/20 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">View Site</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-[#043E49] hover:bg-[#032f38] text-white shadow-2xs transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save & Publish</span>
              </button>

              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 hover:bg-rose-50 text-gray-700 hover:text-rose-600 border border-gray-200 transition-colors cursor-pointer"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100 flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('home-hero')}
            className={`px-3 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'home-hero'
                ? 'bg-[#043E49] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Home: Hero & Bank Info</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('home-sections')}
            className={`px-3 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'home-sections'
                ? 'bg-[#043E49] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Home: What We Do & Stories</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className={`px-3 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'about'
                ? 'bg-[#043E49] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>About Us Page</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('goals')}
            className={`px-3 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'goals'
                ? 'bg-[#043E49] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Future Goals Page</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-3 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#043E49] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Gallery Page & Photos ({galleryItems.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`px-3 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'general'
                ? 'bg-[#043E49] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Header & Footer Info</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        {/* Floating Notification */}
        {saveStatus && (
          <div className="p-3 bg-[#043E49]/10 border border-[#043E49]/20 rounded-xl flex items-center justify-between gap-2.5 text-[#043E49] text-xs sm:text-sm font-semibold shadow-2xs animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#043E49] flex-shrink-0" />
              <span>{saveStatus}</span>
            </div>
            <span className="text-[11px] text-gray-500 font-normal">Auto-published</span>
          </div>
        )}

        {/* TAB 1: HOME - HERO SLIDES & BANK APPEAL DETAILS */}
        {activeTab === 'home-hero' && (
          <div className="space-y-6">
            {/* Bank Details Editor */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <CreditCard className="w-5 h-5 text-[#043E49]" />
                <div>
                  <h2 className="text-base font-black text-[#1A1A1A]">Donation Appeal Box (Bank Details)</h2>
                  <p className="text-xs text-gray-500">Edit the direct deposit banking information displayed on the home page appeal box.</p>
                </div>
              </div>

              {/* International Bank Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded inline-block">
                  International Wire Details (USD, EUR, GBP, CAD)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={formData.home.bankDetails.intlBank.bankName}
                      onChange={(e) => setFormData({
                        ...formData,
                        home: {
                          ...formData.home,
                          bankDetails: {
                            ...formData.home.bankDetails,
                            intlBank: { ...formData.home.bankDetails.intlBank, bankName: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-[#043E49]/20 focus:border-[#043E49]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Account Title</label>
                    <input
                      type="text"
                      value={formData.home.bankDetails.intlBank.accountTitle}
                      onChange={(e) => setFormData({
                        ...formData,
                        home: {
                          ...formData.home,
                          bankDetails: {
                            ...formData.home.bankDetails,
                            intlBank: { ...formData.home.bankDetails.intlBank, accountTitle: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-[#043E49]/20 focus:border-[#043E49]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">IBAN</label>
                    <input
                      type="text"
                      value={formData.home.bankDetails.intlBank.iban}
                      onChange={(e) => setFormData({
                        ...formData,
                        home: {
                          ...formData.home,
                          bankDetails: {
                            ...formData.home.bankDetails,
                            intlBank: { ...formData.home.bankDetails.intlBank, iban: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-mono focus:ring-2 focus:ring-[#043E49]/20 focus:border-[#043E49]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">SWIFT / BIC</label>
                    <input
                      type="text"
                      value={formData.home.bankDetails.intlBank.swiftBic}
                      onChange={(e) => setFormData({
                        ...formData,
                        home: {
                          ...formData.home,
                          bankDetails: {
                            ...formData.home.bankDetails,
                            intlBank: { ...formData.home.bankDetails.intlBank, swiftBic: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-mono focus:ring-2 focus:ring-[#043E49]/20 focus:border-[#043E49]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Routing Number / Branch</label>
                    <input
                      type="text"
                      value={formData.home.bankDetails.intlBank.routingNumber}
                      onChange={(e) => setFormData({
                        ...formData,
                        home: {
                          ...formData.home,
                          bankDetails: {
                            ...formData.home.bankDetails,
                            intlBank: { ...formData.home.bankDetails.intlBank, routingNumber: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-[#043E49]/20 focus:border-[#043E49]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Supported Currencies</label>
                    <input
                      type="text"
                      value={formData.home.bankDetails.intlBank.currencies}
                      onChange={(e) => setFormData({
                        ...formData,
                        home: {
                          ...formData.home,
                          bankDetails: {
                            ...formData.home.bankDetails,
                            intlBank: { ...formData.home.bankDetails.intlBank, currencies: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-[#043E49]/20 focus:border-[#043E49]"
                    />
                  </div>
                </div>
              </div>

              {/* Local Deposit Details */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded inline-block">
                  Local Deposit Details (PKR / Mobile Wallet)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Service / Bank Name</label>
                    <input
                      type="text"
                      value={formData.home.bankDetails.localBank.bankName}
                      onChange={(e) => setFormData({
                        ...formData,
                        home: {
                          ...formData.home,
                          bankDetails: {
                            ...formData.home.bankDetails,
                            localBank: { ...formData.home.bankDetails.localBank, bankName: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-[#043E49]/20 focus:border-[#043E49]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Account Title</label>
                    <input
                      type="text"
                      value={formData.home.bankDetails.localBank.accountTitle}
                      onChange={(e) => setFormData({
                        ...formData,
                        home: {
                          ...formData.home,
                          bankDetails: {
                            ...formData.home.bankDetails,
                            localBank: { ...formData.home.bankDetails.localBank, accountTitle: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-[#043E49]/20 focus:border-[#043E49]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Account Number / Phone</label>
                    <input
                      type="text"
                      value={formData.home.bankDetails.localBank.accountNumber}
                      onChange={(e) => setFormData({
                        ...formData,
                        home: {
                          ...formData.home,
                          bankDetails: {
                            ...formData.home.bankDetails,
                            localBank: { ...formData.home.bankDetails.localBank, accountNumber: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-mono focus:ring-2 focus:ring-[#043E49]/20 focus:border-[#043E49]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Appeal Box Footer Notice</label>
                <input
                  type="text"
                  value={formData.home.bankDetails.footerNotice}
                  onChange={(e) => setFormData({
                    ...formData,
                    home: {
                      ...formData.home,
                      bankDetails: { ...formData.home.bankDetails, footerNotice: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-[#043E49]/20 focus:border-[#043E49]"
                />
              </div>
            </div>

            {/* Hero Carousel Images Box (User-Friendly Image Uploader) */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#043E49]" />
                    <h2 className="text-base font-black text-[#1A1A1A]">
                      Hero Carousel Images ({formData.home.heroSlides.length})
                    </h2>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Upload images for the home page hero carousel. You can add as many photos as you want.
                  </p>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => heroFileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-[#043E49] text-white hover:bg-[#032f38] transition-colors cursor-pointer shadow-2xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Local Images</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save & Publish</span>
                  </button>
                </div>
              </div>

              {heroActionStatus && (
                <div className="px-3.5 py-2.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 text-xs font-medium flex items-center justify-between">
                  <span>{heroActionStatus}</span>
                  <button 
                    type="button" 
                    onClick={() => setHeroActionStatus(null)}
                    className="text-teal-700 hover:text-teal-950 font-bold ml-2 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Drag and Drop Local Upload Box */}
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  setIsHeroDragging(false);
                  if (e.dataTransfer.files) handleHeroLocalFiles(e.dataTransfer.files);
                }}
                onDragOver={(e) => { e.preventDefault(); setIsHeroDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsHeroDragging(false); }}
                onClick={() => heroFileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
                  isHeroDragging
                    ? 'border-[#043E49] bg-[#043E49]/10 scale-[1.01]'
                    : 'border-gray-200 hover:border-[#043E49]/60 hover:bg-gray-50/80 bg-gray-50/40'
                }`}
              >
                <input
                  type="file"
                  ref={heroFileInputRef}
                  onChange={(e) => {
                    handleHeroLocalFiles(e.target.files);
                    if (e.target) e.target.value = '';
                  }}
                  accept="image/*"
                  multiple
                  className="hidden"
                />

                <div className="flex flex-col items-center gap-2.5">
                  <div className="w-12 h-12 rounded-full bg-[#043E49]/10 text-[#043E49] flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      Click or Drag & Drop local images here to add to the Hero Carousel
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Choose single or multiple pictures (PNG, JPG, WEBP). They will be added instantly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Optional Web URL Add Row */}
              <div className="flex items-center gap-2 pt-1">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Or paste an image web URL (e.g. https://...)"
                    value={heroUrlInput}
                    onChange={(e) => setHeroUrlInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddHeroUrl();
                      }
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-[#043E49]/20 focus:border-[#043E49]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleAddHeroUrl()}
                  disabled={!heroUrlInput.trim()}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer shrink-0"
                >
                  Add Image URL
                </button>
              </div>

              {/* Current Carousel Images Grid */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">Active Carousel Slides ({formData.home.heroSlides.length})</span>
                  <span>Rearrange order or replace images below</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.home.heroSlides.map((slide, idx) => (
                    <div 
                      key={slide.id || idx} 
                      className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col"
                    >
                      {/* Top Image Preview */}
                      <div className="relative aspect-16/10 w-full bg-gray-100 overflow-hidden">
                        <img
                          src={slide.imageUrl}
                          alt={slide.imageAlt || `Slide ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                        {/* Slide Index Badge */}
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold">
                          Slide {idx + 1}
                        </span>

                        {/* Quick Delete Overlay Button */}
                        {formData.home.heroSlides.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteHeroSlide(idx)}
                            className="absolute top-2 right-2 p-1.5 rounded-md bg-black/60 hover:bg-rose-600 text-white backdrop-blur-sm transition-colors cursor-pointer"
                            title="Delete this slide"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Bottom Card Controls */}
                      <div className="p-3 flex flex-col gap-2 flex-1 justify-between bg-white">
                        {/* Reorder and Replace Controls */}
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMoveHeroSlide(idx, idx - 1)}
                              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none text-gray-700 text-xs font-bold cursor-pointer transition-colors"
                              title="Move slide earlier"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === formData.home.heroSlides.length - 1}
                              onClick={() => handleMoveHeroSlide(idx, idx + 1)}
                              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none text-gray-700 text-xs font-bold cursor-pointer transition-colors"
                              title="Move slide later"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Replace Image via Local File */}
                          <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold text-[#043E49] bg-[#043E49]/10 hover:bg-[#043E49]/20 cursor-pointer transition-colors">
                            <Upload className="w-3 h-3" />
                            <span>Replace</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                handleReplaceHeroSlideFile(idx, e.target.files);
                                if (e.target) e.target.value = '';
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* Editable Image URL Input */}
                        <div>
                          <input
                            type="text"
                            value={slide.imageUrl}
                            onChange={(e) => {
                              const updated = [...formData.home.heroSlides];
                              updated[idx].imageUrl = e.target.value;
                              setFormData(prev => ({
                                ...prev,
                                home: { ...prev.home, heroSlides: updated }
                              }));
                            }}
                            placeholder="Image URL"
                            className="w-full px-2 py-1 text-[11px] font-mono text-gray-600 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:ring-1 focus:ring-[#043E49]"
                            title="Edit Image URL"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HOME - WHAT WE DO & STORIES */}
        {activeTab === 'home-sections' && (
          <div className="space-y-6">
            {/* What We Do Section Header */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <Layers className="w-5 h-5 text-[#043E49]" />
                <div>
                  <h2 className="text-base font-black text-[#1A1A1A]">"What We Do" Section Header & Pillars</h2>
                  <p className="text-xs text-gray-500">Edit the mission pillars, descriptions, and impact metrics.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={formData.home.whatWeDoHeader.badge}
                    onChange={(e) => setFormData({
                      ...formData,
                      home: {
                        ...formData.home,
                        whatWeDoHeader: { ...formData.home.whatWeDoHeader, badge: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Section Title</label>
                  <input
                    type="text"
                    value={formData.home.whatWeDoHeader.title}
                    onChange={(e) => setFormData({
                      ...formData,
                      home: {
                        ...formData.home,
                        whatWeDoHeader: { ...formData.home.whatWeDoHeader, title: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Section Description</label>
                  <textarea
                    rows={2}
                    value={formData.home.whatWeDoHeader.description}
                    onChange={(e) => setFormData({
                      ...formData,
                      home: {
                        ...formData.home,
                        whatWeDoHeader: { ...formData.home.whatWeDoHeader, description: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              </div>

              {/* What We Do Items List */}
              <div className="pt-2 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                      <span>Mission Pillar Cards</span>
                      <span className="px-2 py-0.5 text-xs font-bold bg-[#043E49]/10 text-[#043E49] rounded-full">
                        {formData.home.whatWeDoItems.length} {formData.home.whatWeDoItems.length === 1 ? 'Card' : 'Cards'}
                      </span>
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Add and manage your mission cards with local image uploads and instant previews.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAddWhatWeDoCard}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-[#043E49] text-white hover:bg-[#032f38] transition-colors cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save & Publish</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {formData.home.whatWeDoItems.map((item, idx) => (
                    <div 
                      key={item.id || idx} 
                      className="p-3 rounded-xl border border-gray-200 bg-white hover:border-[#043E49]/40 shadow-2xs transition-all space-y-2.5"
                    >
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-5 h-5 rounded-full bg-[#043E49]/10 text-[#043E49] font-black text-[11px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-black text-gray-900 truncate">
                            {item.title || 'Untitled Card'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveWhatWeDoCard(idx, idx - 1)}
                            className="p-1 rounded text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                            title="Move Up"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === formData.home.whatWeDoItems.length - 1}
                            onClick={() => handleMoveWhatWeDoCard(idx, idx + 1)}
                            className="p-1 rounded text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                            title="Move Down"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          {formData.home.whatWeDoItems.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteWhatWeDoCard(idx)}
                              className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer ml-0.5"
                              title="Delete Card"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Compact 2-Column Body: Thumbnail + Inputs */}
                      <div className="flex flex-col sm:flex-row gap-3 items-start">
                        {/* Compact Image Thumbnail & Upload */}
                        <div className="w-full sm:w-32 shrink-0">
                          <div className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50 h-24 w-full">
                            {item.imageUrl ? (
                              <>
                                <img
                                  src={item.imageUrl}
                                  alt={item.imageAlt || item.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1">
                                  <label className="px-2 py-1 rounded bg-white text-[#043E49] text-[10px] font-bold cursor-pointer shadow hover:bg-gray-100 inline-flex items-center gap-1">
                                    <Upload className="w-3 h-3" />
                                    <span>Change</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => handleWhatWeDoImageUpload(idx, e.target.files)}
                                    />
                                  </label>
                                </div>
                              </>
                            ) : (
                              <label className="w-full h-full flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-gray-100 transition-colors text-center">
                                <Upload className="w-4 h-4 text-gray-400 mb-0.5" />
                                <span className="text-[10px] font-bold text-gray-600">Upload</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleWhatWeDoImageUpload(idx, e.target.files)}
                                />
                              </label>
                            )}
                          </div>
                        </div>

                        {/* Title, Tag & Description in compact layout */}
                        <div className="flex-1 w-full space-y-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Title</label>
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => {
                                  const updated = [...formData.home.whatWeDoItems];
                                  updated[idx].title = e.target.value;
                                  setFormData({ ...formData, home: { ...formData.home, whatWeDoItems: updated } });
                                }}
                                placeholder="Pillar Title"
                                className="w-full px-2.5 py-1 rounded-md border border-gray-200 bg-white text-xs focus:ring-1 focus:ring-[#043E49] focus:border-[#043E49]"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Tag Badge</label>
                              <input
                                type="text"
                                value={item.tag}
                                onChange={(e) => {
                                  const updated = [...formData.home.whatWeDoItems];
                                  updated[idx].tag = e.target.value;
                                  setFormData({ ...formData, home: { ...formData.home, whatWeDoItems: updated } });
                                }}
                                placeholder="Tag Name"
                                className="w-full px-2.5 py-1 rounded-md border border-gray-200 bg-white text-xs focus:ring-1 focus:ring-[#043E49] focus:border-[#043E49]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Description</label>
                            <textarea
                              rows={2}
                              value={item.description}
                              onChange={(e) => {
                                const updated = [...formData.home.whatWeDoItems];
                                updated[idx].description = e.target.value;
                                setFormData({ ...formData, home: { ...formData.home, whatWeDoItems: updated } });
                              }}
                              placeholder="Brief description of this pillar..."
                              className="w-full px-2.5 py-1 rounded-md border border-gray-200 bg-white text-xs focus:ring-1 focus:ring-[#043E49] focus:border-[#043E49]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add New Card Tile (Compact) */}
                  <button
                    type="button"
                    onClick={handleAddWhatWeDoCard}
                    className="border-2 border-dashed border-gray-200 hover:border-[#043E49] bg-gray-50/50 hover:bg-[#043E49]/5 rounded-xl p-4 min-h-[140px] flex items-center justify-center gap-3 text-center transition-all cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#043E49]/10 group-hover:bg-[#043E49] text-[#043E49] group-hover:text-white flex items-center justify-center transition-colors">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-gray-800 group-hover:text-[#043E49]">
                        + Add Another Pillar Card
                      </p>
                      <p className="text-[11px] text-gray-500">
                        Create a new card with custom image and text
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Stories Section Header & Cards */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <Sparkles className="w-5 h-5 text-[#043E49]" />
                <div>
                  <h2 className="text-base font-black text-[#1A1A1A]">"Stories" Section Header & Animal Cards</h2>
                  <p className="text-xs text-gray-500">Edit the rescue story cards that allow visitors to click "Support".</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={formData.home.storiesHeader.badge}
                    onChange={(e) => setFormData({
                      ...formData,
                      home: {
                        ...formData.home,
                        storiesHeader: { ...formData.home.storiesHeader, badge: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Section Title</label>
                  <input
                    type="text"
                    value={formData.home.storiesHeader.title}
                    onChange={(e) => setFormData({
                      ...formData,
                      home: {
                        ...formData.home,
                        storiesHeader: { ...formData.home.storiesHeader, title: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Section Description</label>
                  <textarea
                    rows={2}
                    value={formData.home.storiesHeader.description}
                    onChange={(e) => setFormData({
                      ...formData,
                      home: {
                        ...formData.home,
                        storiesHeader: { ...formData.home.storiesHeader, description: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              </div>

              {/* Rescue Story Cards List */}
              <div className="pt-2 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                      <span>Rescue Story Cards</span>
                      <span className="px-2 py-0.5 text-xs font-bold bg-[#043E49]/10 text-[#043E49] rounded-full">
                        {formData.home.storiesItems.length} {formData.home.storiesItems.length === 1 ? 'Card' : 'Cards'}
                      </span>
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Add and manage animal rescue stories with local image uploads and instant previews.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAddStoryCard}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-[#043E49] text-white hover:bg-[#032f38] transition-colors cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Story</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save & Publish</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {formData.home.storiesItems.map((story, idx) => (
                    <div 
                      key={story.id || idx} 
                      className="p-3 rounded-xl border border-gray-200 bg-white hover:border-[#043E49]/40 shadow-2xs transition-all space-y-2.5"
                    >
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-5 h-5 rounded-full bg-[#043E49]/10 text-[#043E49] font-black text-[11px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-black text-gray-900 truncate">
                            {story.name || 'Untitled Animal'} — {story.title || 'Story'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveStoryCard(idx, idx - 1)}
                            className="p-1 rounded text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                            title="Move Up"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === formData.home.storiesItems.length - 1}
                            onClick={() => handleMoveStoryCard(idx, idx + 1)}
                            className="p-1 rounded text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                            title="Move Down"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          {formData.home.storiesItems.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteStoryCard(idx)}
                              className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer ml-0.5"
                              title="Delete Story"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Compact 2-Column Body: Thumbnail + Inputs */}
                      <div className="flex flex-col sm:flex-row gap-3 items-start">
                        {/* Compact Image Thumbnail & Upload */}
                        <div className="w-full sm:w-32 shrink-0">
                          <div className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50 h-24 w-full">
                            {story.imageUrl ? (
                              <>
                                <img
                                  src={story.imageUrl}
                                  alt={story.imageAlt || story.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1">
                                  <label className="px-2 py-1 rounded bg-white text-[#043E49] text-[10px] font-bold cursor-pointer shadow hover:bg-gray-100 inline-flex items-center gap-1">
                                    <Upload className="w-3 h-3" />
                                    <span>Change</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => handleStoryImageUpload(idx, e.target.files)}
                                    />
                                  </label>
                                </div>
                              </>
                            ) : (
                              <label className="w-full h-full flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-gray-100 transition-colors text-center">
                                <Upload className="w-4 h-4 text-gray-400 mb-0.5" />
                                <span className="text-[10px] font-bold text-gray-600">Upload</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleStoryImageUpload(idx, e.target.files)}
                                />
                              </label>
                            )}
                          </div>
                        </div>

                        {/* Story Details in compact layout */}
                        <div className="flex-1 w-full space-y-2">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <div>
                              <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Animal Name</label>
                              <input
                                type="text"
                                value={story.name}
                                onChange={(e) => {
                                  const updated = [...formData.home.storiesItems];
                                  updated[idx].name = e.target.value;
                                  setFormData({ ...formData, home: { ...formData.home, storiesItems: updated } });
                                }}
                                placeholder="Animal Name"
                                className="w-full px-2.5 py-1 rounded-md border border-gray-200 bg-white text-xs focus:ring-1 focus:ring-[#043E49] focus:border-[#043E49]"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Story Heading</label>
                              <input
                                type="text"
                                value={story.title}
                                onChange={(e) => {
                                  const updated = [...formData.home.storiesItems];
                                  updated[idx].title = e.target.value;
                                  setFormData({ ...formData, home: { ...formData.home, storiesItems: updated } });
                                }}
                                placeholder="Story Heading"
                                className="w-full px-2.5 py-1 rounded-md border border-gray-200 bg-white text-xs focus:ring-1 focus:ring-[#043E49] focus:border-[#043E49]"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Status Badge</label>
                              <input
                                type="text"
                                value={story.status || ''}
                                onChange={(e) => {
                                  const updated = [...formData.home.storiesItems];
                                  updated[idx].status = e.target.value;
                                  setFormData({ ...formData, home: { ...formData.home, storiesItems: updated } });
                                }}
                                placeholder="e.g. In Sanctuary"
                                className="w-full px-2.5 py-1 rounded-md border border-gray-200 bg-white text-xs focus:ring-1 focus:ring-[#043E49] focus:border-[#043E49]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Description</label>
                            <textarea
                              rows={2}
                              value={story.description}
                              onChange={(e) => {
                                const updated = [...formData.home.storiesItems];
                                updated[idx].description = e.target.value;
                                setFormData({ ...formData, home: { ...formData.home, storiesItems: updated } });
                              }}
                              placeholder="Brief description of the animal and its recovery..."
                              className="w-full px-2.5 py-1 rounded-md border border-gray-200 bg-white text-xs focus:ring-1 focus:ring-[#043E49] focus:border-[#043E49]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add New Story Tile (Compact) */}
                  <button
                    type="button"
                    onClick={handleAddStoryCard}
                    className="border-2 border-dashed border-gray-200 hover:border-[#043E49] bg-gray-50/50 hover:bg-[#043E49]/5 rounded-xl p-4 min-h-[140px] flex items-center justify-center gap-3 text-center transition-all cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#043E49]/10 group-hover:bg-[#043E49] text-[#043E49] group-hover:text-white flex items-center justify-center transition-colors">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-gray-800 group-hover:text-[#043E49]">
                        + Add Another Story Card
                      </p>
                      <p className="text-[11px] text-gray-500">
                        Create a new rescue story with photo and recovery details
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ABOUT US PAGE */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            {/* Page Header & Top Story */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <Compass className="w-5 h-5 text-[#043E49]" />
                <div>
                  <h2 className="text-base font-black text-[#1A1A1A]">About Us: Story & Mission</h2>
                  <p className="text-xs text-gray-500">Edit the sanctuary founding story, mission, and vision statements.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Page Title</label>
                  <input
                    type="text"
                    value={formData.about.pageTitle}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, pageTitle: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Non-Profit Badge</label>
                  <input
                    type="text"
                    value={formData.about.nonProfitBadge}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, nonProfitBadge: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Support Button Text</label>
                  <input
                    type="text"
                    value={formData.about.supportButtonText}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, supportButtonText: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Story Main Heading</label>
                  <input
                    type="text"
                    value={formData.about.heroHeading}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, heroHeading: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-bold"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Story Paragraph 1</label>
                  <textarea
                    rows={2}
                    value={formData.about.heroParagraph1}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, heroParagraph1: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Story Paragraph 2</label>
                  <textarea
                    rows={2}
                    value={formData.about.heroParagraph2}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, heroParagraph2: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Hero Image URL</label>
                  <input
                    type="text"
                    value={formData.about.heroImageUrl}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, heroImageUrl: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Hero Image Caption</label>
                  <input
                    type="text"
                    value={formData.about.heroImageCaption}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, heroImageCaption: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              </div>

              {/* Trust Metric Badges */}
              <div className="pt-2 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-700 mb-2">Trust Metrics Pills</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <input
                    type="text"
                    value={formData.about.trustBadge1}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, trustBadge1: e.target.value } })}
                    className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                  <input
                    type="text"
                    value={formData.about.trustBadge2}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, trustBadge2: e.target.value } })}
                    className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                  <input
                    type="text"
                    value={formData.about.trustBadge3}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, trustBadge3: e.target.value } })}
                    className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Mission & Vision Statements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
                <h3 className="text-sm font-black text-[#1A1A1A] flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-[#043E49]" />
                  <span>Mission Card</span>
                </h3>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Heading</label>
                  <input
                    type="text"
                    value={formData.about.missionHeading}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, missionHeading: e.target.value } })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.about.missionDescription}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, missionDescription: e.target.value } })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Mandate Status Tag</label>
                  <input
                    type="text"
                    value={formData.about.missionMandateValue}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, missionMandateValue: e.target.value } })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
                <h3 className="text-sm font-black text-[#1A1A1A] flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#043E49]" />
                  <span>Vision Card</span>
                </h3>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Heading</label>
                  <input
                    type="text"
                    value={formData.about.visionHeading}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, visionHeading: e.target.value } })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.about.visionDescription}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, visionDescription: e.target.value } })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Horizon Status Tag</label>
                  <input
                    type="text"
                    value={formData.about.visionHorizonValue}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, visionHorizonValue: e.target.value } })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h2 className="text-base font-black text-[#1A1A1A]">Team Members ({formData.about.teamMembers.length})</h2>
                  <p className="text-xs text-gray-500">Edit surgeons, veterinarians, and directors shown on About Us.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newMember: AboutTeamMember = {
                      id: `team-${Date.now()}`,
                      name: 'New Team Member',
                      role: 'Wildlife Specialist',
                      bio: 'Devoted to emergency veterinary trauma care and compassionate rehabilitation.',
                      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
                      badge: 'Veterinary Staff'
                    };
                    setFormData({
                      ...formData,
                      about: {
                        ...formData.about,
                        teamMembers: [...formData.about.teamMembers, newMember]
                      }
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#043E49] text-white hover:bg-[#032f38] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {formData.about.teamMembers.map((member, idx) => (
                  <div key={member.id || idx} className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-gray-800">{member.name}</span>
                      {formData.about.teamMembers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete ${member.name}?`)) {
                              setFormData({
                                ...formData,
                                about: {
                                  ...formData.about,
                                  teamMembers: formData.about.teamMembers.filter((_, i) => i !== idx)
                                }
                              });
                            }
                          }}
                          className="text-rose-600 hover:text-rose-800 text-xs font-bold cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Name</label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => {
                            const updated = [...formData.about.teamMembers];
                            updated[idx].name = e.target.value;
                            setFormData({ ...formData, about: { ...formData.about, teamMembers: updated } });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Role</label>
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) => {
                            const updated = [...formData.about.teamMembers];
                            updated[idx].role = e.target.value;
                            setFormData({ ...formData, about: { ...formData.about, teamMembers: updated } });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Badge</label>
                        <input
                          type="text"
                          value={member.badge}
                          onChange={(e) => {
                            const updated = [...formData.about.teamMembers];
                            updated[idx].badge = e.target.value;
                            setFormData({ ...formData, about: { ...formData.about, teamMembers: updated } });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Image URL</label>
                        <input
                          type="text"
                          value={member.imageUrl}
                          onChange={(e) => {
                            const updated = [...formData.about.teamMembers];
                            updated[idx].imageUrl = e.target.value;
                            setFormData({ ...formData, about: { ...formData.about, teamMembers: updated } });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Bio</label>
                        <textarea
                          rows={2}
                          value={member.bio}
                          onChange={(e) => {
                            const updated = [...formData.about.teamMembers];
                            updated[idx].bio = e.target.value;
                            setFormData({ ...formData, about: { ...formData.about, teamMembers: updated } });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FUTURE GOALS PAGE */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <Target className="w-5 h-5 text-[#043E49]" />
                <div>
                  <h2 className="text-base font-black text-[#1A1A1A]">Future Goals: Header & Initiatives</h2>
                  <p className="text-xs text-gray-500">Edit the strategic initiatives, target years, and descriptions.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Page Title</label>
                  <input
                    type="text"
                    value={formData.goals.pageTitle}
                    onChange={(e) => setFormData({ ...formData, goals: { ...formData.goals, pageTitle: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={formData.goals.introBadge}
                    onChange={(e) => setFormData({ ...formData, goals: { ...formData.goals, introBadge: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Section Main Heading</label>
                  <input
                    type="text"
                    value={formData.goals.introHeading}
                    onChange={(e) => setFormData({ ...formData, goals: { ...formData.goals, introHeading: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-bold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Intro Description</label>
                  <textarea
                    rows={2}
                    value={formData.goals.introDescription}
                    onChange={(e) => setFormData({ ...formData, goals: { ...formData.goals, introDescription: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Goal Items List */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h2 className="text-base font-black text-[#1A1A1A]">Strategic Goal Sections ({formData.goals.goals.length})</h2>
                  <p className="text-xs text-gray-500">Edit the 6 strategic initiatives and their target timelines.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newGoal: FutureGoalItem = {
                      id: `goal-${Date.now()}`,
                      tag: 'New Strategic Initiative',
                      targetYear: 'Target: 2030',
                      heading: 'Expanded Wildlife Care',
                      description: 'Expanding sanctuary acreage and mobile field clinics to protect vulnerable animal populations.',
                      imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
                      imageAlt: 'Sanctuary expansion project',
                      highlights: ['Full community transparency', 'Zero-footprint environmental planning']
                    };
                    setFormData({
                      ...formData,
                      goals: {
                        ...formData.goals,
                        goals: [...formData.goals.goals, newGoal]
                      }
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#043E49] text-white hover:bg-[#032f38] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Initiative</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.goals.goals.map((goal, idx) => (
                  <div key={goal.id || idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#043E49] text-white text-[11px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs font-black text-gray-800">
                          {goal.tag} — {goal.heading}
                        </h4>
                      </div>
                      {formData.goals.goals.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete goal "${goal.heading}"?`)) {
                              setFormData({
                                ...formData,
                                goals: {
                                  ...formData.goals,
                                  goals: formData.goals.goals.filter((_, i) => i !== idx)
                                }
                              });
                            }
                          }}
                          className="text-rose-600 hover:text-rose-800 text-xs font-bold cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Tag</label>
                        <input
                          type="text"
                          value={goal.tag}
                          onChange={(e) => {
                            const updated = [...formData.goals.goals];
                            updated[idx].tag = e.target.value;
                            setFormData({ ...formData, goals: { ...formData.goals, goals: updated } });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Target Year</label>
                        <input
                          type="text"
                          value={goal.targetYear}
                          onChange={(e) => {
                            const updated = [...formData.goals.goals];
                            updated[idx].targetYear = e.target.value;
                            setFormData({ ...formData, goals: { ...formData.goals, goals: updated } });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Heading</label>
                        <input
                          type="text"
                          value={goal.heading}
                          onChange={(e) => {
                            const updated = [...formData.goals.goals];
                            updated[idx].heading = e.target.value;
                            setFormData({ ...formData, goals: { ...formData.goals, goals: updated } });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-bold"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Description</label>
                        <textarea
                          rows={2}
                          value={goal.description}
                          onChange={(e) => {
                            const updated = [...formData.goals.goals];
                            updated[idx].description = e.target.value;
                            setFormData({ ...formData, goals: { ...formData.goals, goals: updated } });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Image URL</label>
                        <input
                          type="text"
                          value={goal.imageUrl}
                          onChange={(e) => {
                            const updated = [...formData.goals.goals];
                            updated[idx].imageUrl = e.target.value;
                            setFormData({ ...formData, goals: { ...formData.goals, goals: updated } });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GALLERY & UPLOADED PHOTOS */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            {/* Gallery Page Text Config */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <ImageIcon className="w-5 h-5 text-[#043E49]" />
                <div>
                  <h2 className="text-base font-black text-[#1A1A1A]">Gallery Page Headers</h2>
                  <p className="text-xs text-gray-500">Configure page title and empty state text.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Page Title</label>
                  <input
                    type="text"
                    value={formData.gallery.pageTitle}
                    onChange={(e) => setFormData({ ...formData, gallery: { ...formData.gallery, pageTitle: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Empty State Heading</label>
                  <input
                    type="text"
                    value={formData.gallery.emptyStateHeading}
                    onChange={(e) => setFormData({ ...formData, gallery: { ...formData.gallery, emptyStateHeading: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Empty State Description</label>
                  <input
                    type="text"
                    value={formData.gallery.emptyStateDescription}
                    onChange={(e) => setFormData({ ...formData, gallery: { ...formData.gallery, emptyStateDescription: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Upload New Picture to Gallery */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <Upload className="w-5 h-5 text-[#043E49]" />
                <div>
                  <h2 className="text-base font-black text-[#1A1A1A]">Upload New Picture to Gallery</h2>
                  <p className="text-xs text-gray-500">
                    Uploaded photos appear instantly on the public Gallery page.
                  </p>
                </div>
              </div>

              <form onSubmit={handlePhotoPublish} className="space-y-4">
                <div
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
                  }}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-5 sm:p-6 text-center transition-all cursor-pointer ${
                    isDragging
                      ? 'border-[#043E49] bg-[#043E49]/10 scale-[1.01]'
                      : 'border-gray-200 hover:border-[#043E49]/60 hover:bg-gray-50/60'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFiles(e.target.files)}
                    accept="image/*"
                    className="hidden"
                  />

                  {previewImage ? (
                    <div className="flex flex-col items-center gap-2.5">
                      <div className="relative rounded-xl overflow-hidden max-h-56 w-auto border-2 border-[#043E49] shadow-sm">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="max-h-56 w-auto object-contain bg-black/5"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewImage(null);
                        }}
                        className="text-xs text-rose-600 hover:underline font-bold cursor-pointer"
                      >
                        Change Picture
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                          Click to select a picture or drag & drop here
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Supports JPG, PNG, WEBP • Max 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Picture Title / Heading</label>
                    <input
                      type="text"
                      placeholder="e.g. Golden Retriever Playtime"
                      value={photoTitle}
                      onChange={(e) => setPhotoTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-[#043E49]/20 focus:border-[#043E49]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Caption / Description (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Rescued and flourishing at the sanctuary"
                      value={photoCaption}
                      onChange={(e) => setPhotoCaption(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-[#043E49]/20 focus:border-[#043E49]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={!previewImage}
                    className="px-4.5 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#043E49] hover:bg-[#032f38] disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload & Publish to Gallery</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Currently Uploaded Photos */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h2 className="text-base font-black text-[#1A1A1A]">Pictures in Gallery ({galleryItems.length})</h2>
                  <p className="text-xs text-gray-500">Live pictures visible to every visitor on the Gallery page.</p>
                </div>
              </div>

              {galleryItems.length === 0 ? (
                <div className="p-8 border border-dashed border-gray-200 rounded-xl text-center text-gray-400">
                  <ImageIcon className="w-8 h-8 mx-auto text-gray-300 mb-1.5" />
                  <p className="text-xs sm:text-sm font-bold text-gray-600">No pictures in the gallery</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Upload a picture above to display it on the Gallery page.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryItems.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                    >
                      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => handleDeletePhotoItem(item.id, item.title)}
                            aria-label="Delete photo from gallery"
                            className="p-1.5 rounded-lg bg-white/90 hover:bg-rose-50 text-rose-600 shadow-xs transition-colors cursor-pointer"
                            title="Delete from gallery"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="p-3 flex flex-col justify-between flex-1">
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-[#1A1A1A] line-clamp-1">
                            {item.title}
                          </h4>
                          {item.caption && (
                            <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">
                              {item.caption}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 pt-2 mt-1.5 border-t border-gray-100">
                          <Clock className="w-2.5 h-2.5" />
                          <span>Uploaded {item.uploadedAt}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: GENERAL - HEADER & FOOTER */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            {/* Header Settings */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <Layout className="w-5 h-5 text-[#043E49]" />
                <div>
                  <h2 className="text-base font-black text-[#1A1A1A]">Header & Navigation Bar</h2>
                  <p className="text-xs text-gray-500">Edit brand name, hotline number, and navigation labels.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={formData.header.brandName}
                    onChange={(e) => setFormData({ ...formData, header: { ...formData.header, brandName: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Brand Tagline</label>
                  <input
                    type="text"
                    value={formData.header.brandTagline}
                    onChange={(e) => setFormData({ ...formData, header: { ...formData.header, brandTagline: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Rescue Phone Number</label>
                  <input
                    type="text"
                    value={formData.header.rescuePhone}
                    onChange={(e) => setFormData({ ...formData, header: { ...formData.header, rescuePhone: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Donate Button Text</label>
                  <input
                    type="text"
                    value={formData.header.donateButtonText}
                    onChange={(e) => setFormData({ ...formData, header: { ...formData.header, donateButtonText: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Nav: About Label</label>
                  <input
                    type="text"
                    value={formData.header.navLinks.about}
                    onChange={(e) => setFormData({
                      ...formData,
                      header: {
                        ...formData.header,
                        navLinks: { ...formData.header.navLinks, about: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Nav: Future Goals Label</label>
                  <input
                    type="text"
                    value={formData.header.navLinks.goals}
                    onChange={(e) => setFormData({
                      ...formData,
                      header: {
                        ...formData.header,
                        navLinks: { ...formData.header.navLinks, goals: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Footer Settings */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <Globe className="w-5 h-5 text-[#043E49]" />
                <div>
                  <h2 className="text-base font-black text-[#1A1A1A]">Footer Contact & Social Media</h2>
                  <p className="text-xs text-gray-500">Edit address, hotline, email, social links, and copyright text.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Footer Sanctuary Description</label>
                  <input
                    type="text"
                    value={formData.footer.description}
                    onChange={(e) => setFormData({ ...formData, footer: { ...formData.footer, description: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Rescue Phone Number</label>
                  <input
                    type="text"
                    value={formData.footer.rescuePhone}
                    onChange={(e) => setFormData({ ...formData, footer: { ...formData.footer, rescuePhone: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.footer.email}
                    onChange={(e) => setFormData({ ...formData, footer: { ...formData.footer, email: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Address Line 1</label>
                  <input
                    type="text"
                    value={formData.footer.addressLine1}
                    onChange={(e) => setFormData({ ...formData, footer: { ...formData.footer, addressLine1: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Address Line 2</label>
                  <input
                    type="text"
                    value={formData.footer.addressLine2}
                    onChange={(e) => setFormData({ ...formData, footer: { ...formData.footer, addressLine2: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Instagram URL</label>
                  <input
                    type="text"
                    value={formData.footer.instagramUrl}
                    onChange={(e) => setFormData({ ...formData, footer: { ...formData.footer, instagramUrl: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Facebook URL</label>
                  <input
                    type="text"
                    value={formData.footer.facebookUrl}
                    onChange={(e) => setFormData({ ...formData, footer: { ...formData.footer, facebookUrl: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">TikTok URL</label>
                  <input
                    type="text"
                    value={formData.footer.tiktokUrl}
                    onChange={(e) => setFormData({ ...formData, footer: { ...formData.footer, tiktokUrl: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Copyright Line</label>
                  <input
                    type="text"
                    value={formData.footer.copyrightText}
                    onChange={(e) => setFormData({ ...formData, footer: { ...formData.footer, copyrightText: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
