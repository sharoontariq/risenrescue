import React, { useState } from 'react';
import { 
  Play, 
  Video, 
  Tag, 
  ArrowRight, 
  Sparkles,
  Maximize2,
  Clock,
  Calendar,
  X
} from 'lucide-react';
import { GalleryItem } from '../types';
import { getVideoEmbedInfo, formatGalleryDate } from '../utils/mediaStorage';

interface HomeGalleryPreviewProps {
  galleryItems: GalleryItem[];
  onViewAllGallery: () => void;
}

export const HomeGalleryPreview: React.FC<HomeGalleryPreviewProps> = ({
  galleryItems,
  onViewAllGallery,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'photo'>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = React.useMemo(() => {
    return galleryItems.filter(item => {
      const isVideo = item.mediaType === 'video' || Boolean(item.videoUrl);
      if (activeTab === 'video') return isVideo;
      if (activeTab === 'photo') return !isVideo;
      return true;
    }).slice(0, 8);
  }, [galleryItems, activeTab]);

  const totalVideos = galleryItems.filter(i => i.mediaType === 'video' || Boolean(i.videoUrl)).length;
  const totalPhotos = galleryItems.filter(i => i.mediaType !== 'video' && !i.videoUrl).length;

  if (galleryItems.length === 0) return null;

  return (
    <section className="w-full py-12 sm:py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#043E49]/10 border border-[#043E49]/20 text-[#043E49] text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Sanctuary Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
              Sanctuary Moments & Videos
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl mt-1">
              Watch our rescued animals heal, play, and experience compassionate lifelong rehabilitation.
            </p>
          </div>

          {/* Filter Pills & View All */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center p-1 bg-gray-100 rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#043E49] text-white shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All ({galleryItems.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  activeTab === 'video'
                    ? 'bg-[#043E49] text-white shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Videos ({totalVideos})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('photo')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'photo'
                    ? 'bg-[#043E49] text-white shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Photos ({totalPhotos})
              </button>
            </div>

            <button
              type="button"
              onClick={onViewAllGallery}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#043E49]/10 hover:bg-[#043E49] text-[#043E49] hover:text-white border border-[#043E49]/20 transition-all cursor-pointer group ml-auto sm:ml-0"
            >
              <span>Full Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredItems.map((item) => {
            const isVideo = item.mediaType === 'video' || Boolean(item.videoUrl);
            const embed = isVideo ? getVideoEmbedInfo(item.videoUrl) : null;
            const displayImage = item.imageUrl || embed?.defaultThumbnail || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=80';

            return (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Thumbnail Frame */}
                <div className="relative aspect-[4/3] bg-gray-900 overflow-hidden">
                  <img
                    src={displayImage}
                    alt={item.title || (isVideo ? 'Sanctuary video' : 'Sanctuary photo')}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
                    {item.category ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20 shadow-xs">
                        <Tag className="w-2.5 h-2.5" />
                        <span>{item.category}</span>
                      </span>
                    ) : <span />}

                    {isVideo && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-[#043E49]/90 backdrop-blur-md px-2 py-0.5 rounded-md border border-teal-300/30 shadow-xs">
                        <Video className="w-2.5 h-2.5 text-teal-300" />
                        <span>Video {item.duration ? `• ${item.duration}` : ''}</span>
                      </span>
                    )}
                  </div>

                  {/* Play Button Overlay */}
                  <div className={`absolute inset-0 transition-colors flex items-center justify-center ${
                    isVideo ? 'bg-black/30 group-hover:bg-black/40' : 'bg-black/0 group-hover:bg-black/20'
                  }`}>
                    {isVideo ? (
                      <div className="w-12 h-12 rounded-full bg-white/95 text-[#043E49] shadow-lg flex items-center justify-center pl-0.5 group-hover:scale-110 group-hover:bg-[#043E49] group-hover:text-white transition-all duration-300">
                        <Play className="w-5 h-5 fill-current" />
                      </div>
                    ) : (
                      <span className="p-1.5 rounded-full bg-white/90 text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                {(item.title || item.caption) && (
                  <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-1 bg-white">
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
                          <Calendar className="w-3 h-3 text-[#043E49]" />
                          <span>{formatGalleryDate(item.uploadedAt)}</span>
                        </div>
                        {item.category && (
                          <span className="font-semibold text-gray-500">{item.category}</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA banner */}
        <div className="bg-[#043E49]/5 border border-[#043E49]/15 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm sm:text-base font-black text-[#043E49]">
              Explore Our Complete Visual Sanctuary Archives
            </h4>
            <p className="text-xs text-gray-600 mt-0.5">
              Browse dozens of rescue stories, medical surgeries, wildlife releases, and rehabilitation milestones.
            </p>
          </div>
          <button
            type="button"
            onClick={onViewAllGallery}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-[#043E49] hover:bg-[#032f38] text-white transition-all shadow-xs cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 shrink-0"
          >
            <span>View All {galleryItems.length} Gallery Media</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lightbox / Video Player Modal */}
      {activeLightboxItem && (() => {
        const isVideo = activeLightboxItem.mediaType === 'video' || Boolean(activeLightboxItem.videoUrl);
        const embed = isVideo ? getVideoEmbedInfo(activeLightboxItem.videoUrl) : null;

        return (
          <div 
            onClick={() => setActiveLightboxItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-sm animate-fade-in"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
            >
              {/* Media Container */}
              <div className="relative w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                {isVideo ? (
                  embed?.type === 'youtube' || embed?.type === 'vimeo' ? (
                    <div className="w-full aspect-video max-h-[70vh] bg-black flex items-center justify-center">
                      <iframe
                        src={embed.embedUrl}
                        title={activeLightboxItem.title || 'Video Player'}
                        className="w-full h-full aspect-video border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video max-h-[70vh] bg-black flex items-center justify-center">
                      <video
                        src={activeLightboxItem.videoUrl || activeLightboxItem.imageUrl}
                        poster={activeLightboxItem.imageUrl}
                        controls
                        autoPlay
                        playsInline
                        className="w-full h-full max-h-[70vh] object-contain"
                      />
                    </div>
                  )
                ) : (
                  <img
                    src={activeLightboxItem.imageUrl}
                    alt={activeLightboxItem.title}
                    className="max-h-[70vh] w-auto object-contain"
                  />
                )}
                <button
                  onClick={() => setActiveLightboxItem(null)}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer z-10"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Details */}
              <div className="p-4 sm:p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    {activeLightboxItem.category && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#043E49] bg-[#043E49]/10 border border-[#043E49]/20 px-2 py-0.5 rounded-full">
                        <Tag className="w-2.5 h-2.5" />
                        <span>{activeLightboxItem.category}</span>
                      </span>
                    )}
                    {(activeLightboxItem.mediaType === 'video' || activeLightboxItem.videoUrl) && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                        <Video className="w-2.5 h-2.5 text-teal-600" />
                        <span>Video {activeLightboxItem.duration ? `(${activeLightboxItem.duration})` : ''}</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-black text-[#1A1A1A]">
                    {activeLightboxItem.title || (activeLightboxItem.mediaType === 'video' ? 'Sanctuary Video' : 'Showcase Picture')}
                  </h3>
                  {activeLightboxItem.caption && (
                    <p className="text-xs text-gray-600 mt-0.5">
                      {activeLightboxItem.caption}
                    </p>
                  )}
                  {activeLightboxItem.uploadedAt && (
                    <div className="flex items-center gap-1 text-[10.5px] text-gray-400 mt-1">
                      <Calendar className="w-3 h-3 text-[#043E49]" />
                      <span>Date: {formatGalleryDate(activeLightboxItem.uploadedAt)}</span>
                    </div>
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
        );
      })()}
    </section>
  );
};
