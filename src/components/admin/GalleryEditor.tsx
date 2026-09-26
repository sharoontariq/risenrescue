import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Image as ImageIcon,
  Calendar
} from 'lucide-react';
import { GalleryItem } from '../../types';
import { ImageField } from './ImageField';
import { formatGalleryDate, toInputDateFormat } from '../../utils/mediaStorage';

interface GalleryEditorProps {
  items: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
}

export const GalleryEditor: React.FC<GalleryEditorProps> = ({ items, onChange }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDate, setNewDate] = useState(() => new Date().toISOString().split('T')[0]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl) {
      alert('Please select or upload an image.');
      return;
    }

    const newItem: GalleryItem = {
      id: `gallery-${Date.now()}`,
      title: newTitle.trim() || 'Sanctuary Photo',
      caption: newCaption.trim() || '',
      category: 'Gallery',
      imageUrl: newImageUrl,
      uploadedAt: formatGalleryDate(newDate),
      isUserUploaded: true
    };

    onChange([newItem, ...items]);
    setNewTitle('');
    setNewCaption('');
    setNewImageUrl('');
    setNewDate(new Date().toISOString().split('T')[0]);
  };

  const handleUpdateItem = (index: number, updated: Partial<GalleryItem>) => {
    const list = [...items];
    list[index] = { ...list[index], ...updated };
    onChange(list);
  };

  const handleDeleteItem = (index: number) => {
    const list = items.filter((_, i) => i !== index);
    onChange(list);
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const list = [...items];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    onChange(list);
  };

  return (
    <div className="space-y-6">
      {/* Upload New Photo Form */}
      <form onSubmit={handleAddItem} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
          <ImageIcon className="w-4 h-4 text-[#043E49]" />
          <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            Upload & Add New Photo to Public Gallery
          </h4>
        </div>

        <ImageField
          label="Select or Upload New Picture"
          value={newImageUrl}
          onChange={setNewImageUrl}
          helperText="PNG, JPG, or WEBP files supported"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Photo Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Morning Sunbathing at Meadow Sanctuary"
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#043E49]" />
              <span>Upload / Display Date</span>
            </label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Photo Caption</label>
            <input
              type="text"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              placeholder="e.g. Rescued canine pack enjoying freedom..."
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#043E49] hover:bg-[#032f38] text-white transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Publish to Gallery</span>
          </button>
        </div>
      </form>

      {/* Existing Gallery Photos List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            Current Gallery Pictures ({items.length})
          </h4>
          <span className="text-[11px] text-gray-500">Edit titles, dates, replace pictures, reorder, or delete</span>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-xs">
            No photos in the gallery yet. Use the form above to add your first photo.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#043E49]/10 text-[#043E49] font-black text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <span className="text-xs font-black text-[#1A1A1A]">
                      {item.title || 'Untitled Photo'}
                    </span>
                    {item.uploadedAt && (
                      <span className="text-[10px] text-gray-400">({formatGalleryDate(item.uploadedAt)})</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveItem(idx, 'up')}
                      className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === items.length - 1}
                      onClick={() => handleMoveItem(idx, 'down')}
                      className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(idx)}
                      className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700">Title</label>
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => handleUpdateItem(idx, { title: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#043E49]" />
                      <span>Date</span>
                    </label>
                    <input
                      type="date"
                      value={toInputDateFormat(item.uploadedAt)}
                      onChange={(e) => handleUpdateItem(idx, { uploadedAt: formatGalleryDate(e.target.value) })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700">Caption</label>
                    <input
                      type="text"
                      value={item.caption || ''}
                      onChange={(e) => handleUpdateItem(idx, { caption: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                    />
                  </div>
                </div>

                <ImageField
                  label="Picture"
                  value={item.imageUrl}
                  onChange={(url) => handleUpdateItem(idx, { imageUrl: url })}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
