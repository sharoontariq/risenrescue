import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Trash2, 
  Image as ImageIcon, 
  ArrowLeft, 
  CheckCircle2, 
  Plus, 
  ExternalLink,
  Shield,
  Clock,
  AlertCircle
} from 'lucide-react';
import { GalleryItem } from '../types';

interface AdminPanelProps {
  galleryItems: GalleryItem[];
  onAddPhoto: (item: GalleryItem) => void;
  onDeletePhoto: (id: string) => void;
  onViewGallery: () => void;
  onBackToHome: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  galleryItems,
  onAddPhoto,
  onDeletePhoto,
  onViewGallery,
  onBackToHome,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewImage(result);
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewImage) {
      alert('Please select an image to upload.');
      return;
    }

    const newItem: GalleryItem = {
      id: `gallery-photo-${Date.now()}`,
      title: title.trim() || 'Untitled Photo',
      caption: caption.trim() || '',
      category: 'Gallery',
      imageUrl: previewImage,
      uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      isUserUploaded: true
    };

    onAddPhoto(newItem);
    setPreviewImage(null);
    setTitle('');
    setCaption('');
    setNotification('Photo successfully published to the gallery!');
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDelete = (id: string, photoTitle: string) => {
    if (window.confirm(`Are you sure you want to remove "${photoTitle}" from the gallery?`)) {
      onDeletePhoto(id);
      setNotification(`Removed "${photoTitle}" from the gallery.`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="w-full bg-[#F8F9FA] min-h-screen pb-14">
      {/* Admin Header */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                onClick={onBackToHome}
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer border border-gray-200"
                title="Back to Home"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="p-0.5 rounded bg-amber-100 text-amber-800">
                    <Shield className="w-3 h-3" />
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">
                    Admin Control
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-[#1A1A1A] mt-0.5">
                  Gallery Manager
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={onViewGallery}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#043E49] hover:bg-[#032f38] text-white transition-colors cursor-pointer shadow-2xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Public Gallery</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 sm:mt-6 space-y-6">
        {/* Success Alert */}
        {notification && (
          <div className="p-3 bg-[#043E49]/10 border border-[#043E49]/20 rounded-xl flex items-center gap-2.5 text-[#043E49] text-xs sm:text-sm font-semibold shadow-2xs animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#043E49] flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Upload Form Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-2xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-[#043E49]/10 text-[#043E49] flex items-center justify-center font-bold">
              <Plus className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#1A1A1A]">Upload New Picture to Gallery</h2>
              <p className="text-[11px] text-gray-500">
                Pictures uploaded here will appear directly on the public Gallery page.
              </p>
            </div>
          </div>

          <form onSubmit={handlePublish} className="space-y-4">
            {/* Drag and drop upload zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-all cursor-pointer ${
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
                <div className="flex flex-col items-center gap-3">
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
                      Click to choose a picture or drag & drop here
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Supports JPG, PNG, WEBP • Max 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Picture Title / Caption
                </label>
                <input
                  type="text"
                  placeholder="e.g. Golden Retriever Playtime"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#043E49]/20 focus:border-[#043E49]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Short Description (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rescued and flourishing at the sanctuary"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#043E49]/20 focus:border-[#043E49]"
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

        {/* Uploaded Photos Management Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-black text-[#1A1A1A]">
                Pictures in Gallery ({galleryItems.length})
              </h2>
              <p className="text-[11px] text-gray-500">
                These are the pictures currently displayed on the public Gallery page.
              </p>
            </div>
          </div>

          {galleryItems.length === 0 ? (
            <div className="p-8 border border-dashed border-gray-200 rounded-xl text-center text-gray-400">
              <ImageIcon className="w-8 h-8 mx-auto text-gray-300 mb-1.5" />
              <p className="text-xs sm:text-sm font-bold text-gray-600">No pictures in the gallery</p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Upload your first picture above to display it on the Gallery page.
              </p>
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
                        onClick={() => handleDelete(item.id, item.title)}
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
    </div>
  );
};
