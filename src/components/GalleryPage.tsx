import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  X, 
  Maximize2, 
  Image as ImageIcon,
  Clock,
  Tag
} from 'lucide-react';
import { GalleryItem } from '../types';
import { GalleryContent } from '../siteContent';

interface GalleryPageProps {
  content?: GalleryContent;
  galleryItems: GalleryItem[];
  onBackToHome: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ 
  content,
  galleryItems, 
  onBackToHome
}) => {
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const pageTitle = content?.pageTitle || 'Gallery';
  const emptyStateHeading = content?.emptyStateHeading || 'No pictures uploaded yet';
  const emptyStateDescription = content?.emptyStateDescription || 'Check back soon for photo updates from our animal sanctuary and rescue missions.';

  const categories = useMemo(() => {
    const list = content?.categories && Array.isArray(content.categories) && content.categories.length > 0
      ? content.categories
      : [];
    const photoCategories = galleryItems.map(item => item.category?.trim()).filter(Boolean) as string[];
    const combined = Array.from(new Set([...list, ...photoCategories]));
    const fallback = ['Sanctuary Life', 'Feline Care', 'Wildlife Rehabilitation', 'Veterinary Care'];
    const finalCategories = combined.length > 0 ? combined : fallback;
    return ['All', ...finalCategories];
  }, [content?.categories, galleryItems]);

  // Keep selection in sync when categories are added, renamed, or deleted
  useEffect(() => {
    if (selectedCategory !== 'All' && !categories.some(c => c.toLowerCase() === selectedCategory.toLowerCase())) {
      setSelectedCategory('All');
    }
  }, [categories, selectedCategory]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return galleryItems;
    return galleryItems.filter(item => (item.category || '').toLowerCase() === selectedCategory.toLowerCase());
  }, [galleryItems, selectedCategory]);

  return (
    <div className="w-full bg-[#F8F9FA] min-h-screen pb-14">
      {/* Top Bar / Header */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#043E49] transition-colors cursor-pointer bg-gray-50 hover:bg-[#043E49]/10 border border-gray-200 px-3 py-1.5 rounded-full touch-manipulation"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </button>
              <h1 className="text-xl sm:text-2xl font-black text-[#1A1A1A] tracking-tight">
                {pageTitle}
              </h1>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-xs font-semibold text-gray-500">
                {filteredItems.length} of {galleryItems.length} {galleryItems.length === 1 ? 'Picture' : 'Pictures'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Gallery Stage */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-5 sm:mt-6 space-y-5">
        {/* Category Filter Pills (Matches Site Design) */}
        {categories.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
              const count = cat === 'All' 
                ? galleryItems.length 
                : galleryItems.filter(item => (item.category || '').toLowerCase() === cat.toLowerCase()).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 select-none ${
                    isSelected
                      ? 'bg-[#043E49] text-white shadow-sm ring-2 ring-[#043E49]/20'
                      : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  <Tag className="w-3 h-3 opacity-70" />
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {filteredItems.length === 0 ? (
          <div className="w-full bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center shadow-2xs space-y-2">
            <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-2">
              <ImageIcon className="w-6 h-6 text-[#043E49]" />
            </div>
            <h2 className="text-base sm:text-lg font-black text-[#1A1A1A]">
              {galleryItems.length === 0 ? emptyStateHeading : `No pictures in "${selectedCategory}"`}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              {galleryItems.length === 0 
                ? emptyStateDescription 
                : `There are currently no photos in the "${selectedCategory}" category.`}
            </p>
            {galleryItems.length > 0 && selectedCategory !== 'All' && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All')}
                  className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#043E49] hover:bg-[#032f38] text-white transition-colors cursor-pointer"
                >
                  Show All Pictures ({galleryItems.length})
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Image Frame */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title || 'Gallery image'}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  {/* Category Badge on Thumbnail */}
                  {item.category && (
                    <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20 shadow-xs">
                        <Tag className="w-2.5 h-2.5" />
                        <span>{item.category}</span>
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="p-1.5 rounded-full bg-white/90 text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Picture Details (only if title or caption exists) */}
                {(item.title || item.caption) && (
                  <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-1">
                    <div>
                      {item.title && (
                        <h3 className="text-xs sm:text-sm font-bold text-[#1A1A1A] line-clamp-1 group-hover:text-[#043E49] transition-colors">
                          {item.title}
                        </h3>
                      )}
                      {item.caption && (
                        <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">
                          {item.caption}
                        </p>
                      )}
                    </div>
                    {item.uploadedAt && (
                      <div className="flex items-center justify-between text-[10px] text-gray-400 mt-2 pt-1.5 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.uploadedAt}</span>
                        </div>
                        {item.category && (
                          <span className="font-semibold text-gray-500">{item.category}</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* High-Resolution Picture Viewer / Lightbox */}
      {activeLightboxItem && (
        <div 
          onClick={() => setActiveLightboxItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-xl border border-white/20 flex flex-col"
          >
            {/* Lightbox Image Container */}
            <div className="relative w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                className="max-h-[70vh] w-auto object-contain"
              />
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Lightbox Details */}
            <div className="p-4 sm:p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                {activeLightboxItem.category && (
                  <div className="mb-1">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#043E49] bg-[#043E49]/10 border border-[#043E49]/20 px-2 py-0.5 rounded-full">
                      <Tag className="w-2.5 h-2.5" />
                      <span>{activeLightboxItem.category}</span>
                    </span>
                  </div>
                )}
                <h3 className="text-base font-black text-[#1A1A1A]">
                  {activeLightboxItem.title || 'Showcase Picture'}
                </h3>
                {activeLightboxItem.caption && (
                  <p className="text-xs text-gray-600 mt-0.5">
                    {activeLightboxItem.caption}
                  </p>
                )}
                {activeLightboxItem.uploadedAt && (
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Uploaded: {activeLightboxItem.uploadedAt}
                  </p>
                )}
              </div>

              <button
                onClick={() => setActiveLightboxItem(null)}
                className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#043E49] hover:bg-[#032f38] text-white transition-colors cursor-pointer self-start sm:self-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
