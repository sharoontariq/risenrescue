import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Layers, 
  HeartHandshake, 
  Sparkles, 
  Building2, 
  DollarSign 
} from 'lucide-react';
import { SiteContent } from '../../siteContent';
import { CarouselSlide, WhatWeDoItem, StoryCardItem } from '../../types';
import { ImageField } from './ImageField';

interface HomeEditorProps {
  content: SiteContent['home'];
  onChange: (updated: SiteContent['home']) => void;
}

export const HomeEditor: React.FC<HomeEditorProps> = ({ content, onChange }) => {
  const [activeTab, setActiveTab] = useState<'hero' | 'bank' | 'whatwedo' | 'stories'>('hero');

  // Hero Slides Helpers
  const handleUpdateSlide = (index: number, updated: Partial<CarouselSlide>) => {
    const newSlides = [...content.heroSlides];
    newSlides[index] = { ...newSlides[index], ...updated };
    onChange({ ...content, heroSlides: newSlides });
  };

  const handleAddSlide = () => {
    const newSlide: CarouselSlide = {
      id: `slide-${Date.now()}`,
      animalName: 'New Rescued Animal',
      category: 'Special Care & Sanctuary',
      location: 'Main Sanctuary Habitat',
      title: 'A safe haven for every soul in need',
      subtitle: 'Compassionate medical intervention and lifelong nurturing sanctuary.',
      story: 'Describe the rescue journey and treatment of this animal here.',
      impactFact: 'Rescued, rehabilitated, and protected with love',
      urgencyLevel: 'Immediate Care',
      imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1600&q=80',
      imageAlt: 'Rescued animal resting peacefully in sanctuary'
    };
    onChange({ ...content, heroSlides: [...content.heroSlides, newSlide] });
  };

  const handleDeleteSlide = (index: number) => {
    if (content.heroSlides.length <= 1) {
      alert('You must have at least one hero slide.');
      return;
    }
    const newSlides = content.heroSlides.filter((_, i) => i !== index);
    onChange({ ...content, heroSlides: newSlides });
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= content.heroSlides.length) return;
    const newSlides = [...content.heroSlides];
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIndex];
    newSlides[targetIndex] = temp;
    onChange({ ...content, heroSlides: newSlides });
  };

  // Bank Appeal Helpers
  const handleUpdateIntlBank = (field: string, value: string) => {
    onChange({
      ...content,
      bankDetails: {
        ...content.bankDetails,
        intlBank: {
          ...content.bankDetails.intlBank,
          [field]: value
        }
      }
    });
  };

  const handleUpdateLocalBank = (field: string, value: string) => {
    onChange({
      ...content,
      bankDetails: {
        ...content.bankDetails,
        localBank: {
          ...content.bankDetails.localBank,
          [field]: value
        }
      }
    });
  };

  // What We Do Helpers
  const handleUpdateWhatWeDoItem = (index: number, updated: Partial<WhatWeDoItem>) => {
    const items = [...content.whatWeDoItems];
    items[index] = { ...items[index], ...updated };
    onChange({ ...content, whatWeDoItems: items });
  };

  const handleAddWhatWeDoItem = () => {
    const newItem: WhatWeDoItem = {
      id: `whatwedo-${Date.now()}`,
      tag: 'New Mission Pillar',
      title: 'Title of Sanctuary Pillar',
      description: 'Describe what your team accomplishes in this specific field of animal welfare and rehabilitation.',
      imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1600&q=80',
      imageAlt: 'Sanctuary care and animal support',
      metricNumber: '100+',
      metricLabel: 'Animals Impacted'
    };
    onChange({ ...content, whatWeDoItems: [...content.whatWeDoItems, newItem] });
  };

  const handleDeleteWhatWeDoItem = (index: number) => {
    if (content.whatWeDoItems.length <= 1) {
      alert('You must have at least one mission pillar.');
      return;
    }
    const items = content.whatWeDoItems.filter((_, i) => i !== index);
    onChange({ ...content, whatWeDoItems: items });
  };

  const handleMoveWhatWeDoItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= content.whatWeDoItems.length) return;
    const items = [...content.whatWeDoItems];
    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;
    onChange({ ...content, whatWeDoItems: items });
  };

  // Stories Helpers
  const handleUpdateStoryItem = (index: number, updated: Partial<StoryCardItem>) => {
    const items = [...content.storiesItems];
    items[index] = { ...items[index], ...updated };
    onChange({ ...content, storiesItems: items });
  };

  const handleAddStoryItem = () => {
    const newItem: StoryCardItem = {
      id: `story-${Date.now()}`,
      name: 'Rescued Friend',
      title: 'A New Journey Toward Healing',
      category: 'Animal Rehabilitation',
      status: 'Recovering in Sanctuary',
      tag: 'Medical Recovery',
      description: 'Found injured and fragile, receiving compassionate intensive medical treatment and love.',
      imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Rescued animal resting in sanctuary'
    };
    onChange({ ...content, storiesItems: [...content.storiesItems, newItem] });
  };

  const handleDeleteStoryItem = (index: number) => {
    if (content.storiesItems.length <= 1) {
      alert('You must have at least one story.');
      return;
    }
    const items = content.storiesItems.filter((_, i) => i !== index);
    onChange({ ...content, storiesItems: items });
  };

  const handleMoveStoryItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= content.storiesItems.length) return;
    const items = [...content.storiesItems];
    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;
    onChange({ ...content, storiesItems: items });
  };

  return (
    <div className="space-y-6">
      {/* Sub-Tabs for Home Sections */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-3 flex-wrap">
        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'hero'
              ? 'bg-[#043E49] text-white shadow-2xs'
              : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Hero Carousel ({content.heroSlides.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('bank')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'bank'
              ? 'bg-[#043E49] text-white shadow-2xs'
              : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Donation & Bank Details</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('whatwedo')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'whatwedo'
              ? 'bg-[#043E49] text-white shadow-2xs'
              : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>What We Do ({content.whatWeDoItems.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('stories')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'stories'
              ? 'bg-[#043E49] text-white shadow-2xs'
              : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stories Section ({content.storiesItems.length})</span>
        </button>
      </div>

      {/* TAB 1: HERO CAROUSEL */}
      {activeTab === 'hero' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-[#1A1A1A]">Hero Image Slideshow</h3>
              <p className="text-xs text-gray-500">Edit existing slides, upload new images, reorder or add new slides.</p>
            </div>
            <button
              type="button"
              onClick={handleAddSlide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#043E49] hover:bg-[#032f38] text-white transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Slide</span>
            </button>
          </div>

          <div className="space-y-4">
            {content.heroSlides.map((slide, idx) => (
              <div 
                key={slide.id || idx}
                className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#043E49]/10 text-[#043E49] font-black text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-black text-[#1A1A1A]">
                      {slide.animalName || `Slide ${idx + 1}`}
                    </span>
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-semibold">
                      {slide.category || 'General'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveSlide(idx, 'up')}
                      className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === content.heroSlides.length - 1}
                      onClick={() => handleMoveSlide(idx, 'down')}
                      className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(idx)}
                      className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700">Animal / Focus Name</label>
                    <input
                      type="text"
                      value={slide.animalName}
                      onChange={(e) => handleUpdateSlide(idx, { animalName: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#043E49]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700">Category Tag</label>
                    <input
                      type="text"
                      value={slide.category}
                      onChange={(e) => handleUpdateSlide(idx, { category: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#043E49]"
                    />
                  </div>
                </div>

                <ImageField
                  label="Slide Background Image"
                  value={slide.imageUrl}
                  onChange={(url) => handleUpdateSlide(idx, { imageUrl: url })}
                  altValue={slide.imageAlt}
                  onAltChange={(alt) => handleUpdateSlide(idx, { imageAlt: alt })}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BANK DETAILS */}
      {activeTab === 'bank' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-black text-[#1A1A1A]">Hero Donation Box & Bank Details</h3>
            <p className="text-xs text-gray-500">Edit the bank transfer credentials shown to donors on the home page.</p>
          </div>

          {/* International Bank Transfer */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
              <Building2 className="w-4 h-4 text-[#043E49]" />
              <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
                International Bank Transfer Details
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Bank Name</label>
                <input
                  type="text"
                  value={content.bankDetails.intlBank.bankName}
                  onChange={(e) => handleUpdateIntlBank('bankName', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Account Title / Beneficiary</label>
                <input
                  type="text"
                  value={content.bankDetails.intlBank.accountTitle}
                  onChange={(e) => handleUpdateIntlBank('accountTitle', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-bold text-gray-700">IBAN</label>
                <input
                  type="text"
                  value={content.bankDetails.intlBank.iban}
                  onChange={(e) => handleUpdateIntlBank('iban', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg font-mono text-gray-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">SWIFT / BIC Code</label>
                <input
                  type="text"
                  value={content.bankDetails.intlBank.swiftBic}
                  onChange={(e) => handleUpdateIntlBank('swiftBic', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg font-mono text-gray-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Routing Number / Branch Code</label>
                <input
                  type="text"
                  value={content.bankDetails.intlBank.routingNumber}
                  onChange={(e) => handleUpdateIntlBank('routingNumber', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg font-mono text-gray-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Bank Country</label>
                <input
                  type="text"
                  value={content.bankDetails.intlBank.bankCountry}
                  onChange={(e) => handleUpdateIntlBank('bankCountry', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Accepted Currencies</label>
                <input
                  type="text"
                  value={content.bankDetails.intlBank.currencies}
                  onChange={(e) => handleUpdateIntlBank('currencies', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Local Bank Transfer */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
              <Building2 className="w-4 h-4 text-[#043E49]" />
              <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
                Local Mobile / Bank Details (EasyPaisa / JazzCash)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Platform / Bank Name</label>
                <input
                  type="text"
                  value={content.bankDetails.localBank.bankName}
                  onChange={(e) => handleUpdateLocalBank('bankName', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Account Title</label>
                <input
                  type="text"
                  value={content.bankDetails.localBank.accountTitle}
                  onChange={(e) => handleUpdateLocalBank('accountTitle', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Account / Mobile Number</label>
                <input
                  type="text"
                  value={content.bankDetails.localBank.accountNumber}
                  onChange={(e) => handleUpdateLocalBank('accountNumber', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg font-mono text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Appeal Notice Footer */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-2">
            <label className="text-[11px] font-bold text-gray-700">Footer Appeal Notice</label>
            <input
              type="text"
              value={content.bankDetails.footerNotice}
              onChange={(e) =>
                onChange({
                  ...content,
                  bankDetails: {
                    ...content.bankDetails,
                    footerNotice: e.target.value
                  }
                })
              }
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
        </div>
      )}

      {/* TAB 3: WHAT WE DO */}
      {activeTab === 'whatwedo' && (
        <div className="space-y-6">
          {/* Header configuration */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-3">
            <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
              Section Header & Title
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Eyebrow / Badge</label>
                <input
                  type="text"
                  value={content.whatWeDoHeader.badge}
                  onChange={(e) =>
                    onChange({
                      ...content,
                      whatWeDoHeader: { ...content.whatWeDoHeader, badge: e.target.value }
                    })
                  }
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Heading Title</label>
                <input
                  type="text"
                  value={content.whatWeDoHeader.title}
                  onChange={(e) =>
                    onChange({
                      ...content,
                      whatWeDoHeader: { ...content.whatWeDoHeader, title: e.target.value }
                    })
                  }
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700">Description Paragraph</label>
              <textarea
                rows={2}
                value={content.whatWeDoHeader.description}
                onChange={(e) =>
                  onChange({
                    ...content,
                    whatWeDoHeader: { ...content.whatWeDoHeader, description: e.target.value }
                  })
                }
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
              />
            </div>
          </div>

          {/* Items list */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
                Mission Pillars ({content.whatWeDoItems.length})
              </h4>
              <button
                type="button"
                onClick={handleAddWhatWeDoItem}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#043E49] hover:bg-[#032f38] text-white transition-colors cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Pillar</span>
              </button>
            </div>

            {content.whatWeDoItems.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#043E49]/10 text-[#043E49] font-black text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-black text-[#1A1A1A]">{item.title}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveWhatWeDoItem(idx, 'up')}
                      className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === content.whatWeDoItems.length - 1}
                      onClick={() => handleMoveWhatWeDoItem(idx, 'down')}
                      className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteWhatWeDoItem(idx)}
                      className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700">Tag / Category</label>
                    <input
                      type="text"
                      value={item.tag}
                      onChange={(e) => handleUpdateWhatWeDoItem(idx, { tag: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleUpdateWhatWeDoItem(idx, { title: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700">Detailed Description</label>
                  <textarea
                    rows={3}
                    value={item.description}
                    onChange={(e) => handleUpdateWhatWeDoItem(idx, { description: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700">Stat Metric Number</label>
                    <input
                      type="text"
                      value={item.metricNumber || ''}
                      onChange={(e) => handleUpdateWhatWeDoItem(idx, { metricNumber: e.target.value })}
                      placeholder="e.g. 3,450+"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700">Metric Label</label>
                    <input
                      type="text"
                      value={item.metricLabel || ''}
                      onChange={(e) => handleUpdateWhatWeDoItem(idx, { metricLabel: e.target.value })}
                      placeholder="e.g. Emergency Rescues Completed"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                    />
                  </div>
                </div>

                <ImageField
                  label="Pillar Showcase Image"
                  value={item.imageUrl}
                  onChange={(url) => handleUpdateWhatWeDoItem(idx, { imageUrl: url })}
                  altValue={item.imageAlt}
                  onAltChange={(alt) => handleUpdateWhatWeDoItem(idx, { imageAlt: alt })}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STORIES */}
      {activeTab === 'stories' && (
        <div className="space-y-6">
          {/* Header settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-3">
            <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
              Stories Header
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Badge Text</label>
                <input
                  type="text"
                  value={content.storiesHeader.badge}
                  onChange={(e) =>
                    onChange({
                      ...content,
                      storiesHeader: { ...content.storiesHeader, badge: e.target.value }
                    })
                  }
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Section Title</label>
                <input
                  type="text"
                  value={content.storiesHeader.title}
                  onChange={(e) =>
                    onChange({
                      ...content,
                      storiesHeader: { ...content.storiesHeader, title: e.target.value }
                    })
                  }
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700">Description Paragraph</label>
              <textarea
                rows={2}
                value={content.storiesHeader.description}
                onChange={(e) =>
                  onChange({
                    ...content,
                    storiesHeader: { ...content.storiesHeader, description: e.target.value }
                  })
                }
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
              />
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
                Animal Stories ({content.storiesItems.length})
              </h4>
              <button
                type="button"
                onClick={handleAddStoryItem}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#043E49] hover:bg-[#032f38] text-white transition-colors cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Story</span>
              </button>
            </div>

            {content.storiesItems.map((story, idx) => (
              <div
                key={story.id || idx}
                className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#043E49]/10 text-[#043E49] font-black text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-black text-[#1A1A1A]">{story.name}: {story.title}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveStoryItem(idx, 'up')}
                      className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === content.storiesItems.length - 1}
                      onClick={() => handleMoveStoryItem(idx, 'down')}
                      className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteStoryItem(idx)}
                      className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700">Animal Name</label>
                    <input
                      type="text"
                      value={story.name}
                      onChange={(e) => handleUpdateStoryItem(idx, { name: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700">Category Tag</label>
                    <input
                      type="text"
                      value={story.category}
                      onChange={(e) => handleUpdateStoryItem(idx, { category: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700">Story Title</label>
                  <input
                    type="text"
                    value={story.title}
                    onChange={(e) => handleUpdateStoryItem(idx, { title: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700">Story Narrative / Description</label>
                  <textarea
                    rows={3}
                    value={story.description}
                    onChange={(e) => handleUpdateStoryItem(idx, { description: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>

                <ImageField
                  label="Animal Story Picture"
                  value={story.imageUrl}
                  onChange={(url) => handleUpdateStoryItem(idx, { imageUrl: url })}
                  altValue={story.imageAlt}
                  onAltChange={(alt) => handleUpdateStoryItem(idx, { imageAlt: alt })}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
