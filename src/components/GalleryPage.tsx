import React, { useState } from 'react';
import { 
  ArrowLeft, 
  X, 
  Maximize2, 
  Image as ImageIcon,
  Clock
} from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryPageProps {
  galleryItems: GalleryItem[];
  onBackToHome: () => void;
  onOpenAdmin?: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ 
  galleryItems, 
  onBackToHome
}) => {
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  return (
    <div className="w-full bg-[#F8F9FA] min-h-screen pb-24">
      {/* Top Bar / Header */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#15803D] transition-colors cursor-pointer bg-gray-50 hover:bg-green-50 border border-gray-200 px-3.5 py-2 rounded-full"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </button>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
                Gallery
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-500">
                {galleryItems.length} {galleryItems.length === 1 ? 'Picture' : 'Pictures'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Gallery Stage: ONLY SHOWS UPLOADED PICTURES */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {galleryItems.length === 0 ? (
          <div className="w-full bg-white rounded-3xl border border-gray-200 p-12 sm:p-16 text-center shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-[#1A1A1A]">No pictures uploaded yet</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto mt-2">
              The gallery currently only displays pictures uploaded and managed via the Admin Panel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Image Frame */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title || 'Gallery image'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="p-2 rounded-full bg-white/90 text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Picture Details (only if title or caption exists) */}
                {(item.title || item.caption) && (
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      {item.title && (
                        <h3 className="text-sm font-bold text-[#1A1A1A] line-clamp-1 group-hover:text-[#15803D] transition-colors">
                          {item.title}
                        </h3>
                      )}
                      {item.caption && (
                        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                          {item.caption}
                        </p>
                      )}
                    </div>
                    {item.uploadedAt && (
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-2.5 pt-2 border-t border-gray-100">
                        <Clock className="w-3 h-3" />
                        <span>{item.uploadedAt}</span>
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
            className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 flex flex-col"
          >
            {/* Lightbox Image Container */}
            <div className="relative w-full max-h-[75vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                className="max-h-[75vh] w-auto object-contain"
              />
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Details */}
            <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-[#1A1A1A]">
                  {activeLightboxItem.title || 'Showcase Picture'}
                </h3>
                {activeLightboxItem.caption && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    {activeLightboxItem.caption}
                  </p>
                )}
                {activeLightboxItem.uploadedAt && (
                  <p className="text-[11px] text-gray-400 mt-1">
                    Uploaded: {activeLightboxItem.uploadedAt}
                  </p>
                )}
              </div>

              <button
                onClick={() => setActiveLightboxItem(null)}
                className="px-5 py-2 rounded-full text-xs font-bold bg-[#15803D] hover:bg-green-800 text-white transition-colors cursor-pointer self-start sm:self-auto"
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
