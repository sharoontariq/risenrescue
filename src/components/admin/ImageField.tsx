import React, { useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  altValue?: string;
  onAltChange?: (alt: string) => void;
  helperText?: string;
}

export const ImageField: React.FC<ImageFieldProps> = ({
  label,
  value,
  onChange,
  altValue,
  onAltChange,
  helperText
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP, etc.)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target?.result as string;
      if (dataUrl) {
        onChange(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2 bg-gray-50 border border-gray-200/90 rounded-xl p-3 sm:p-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#043E49]" />
          <span>{label}</span>
        </label>
        {helperText && <span className="text-[11px] text-gray-500">{helperText}</span>}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Thumbnail Preview */}
        <div className="w-24 h-20 sm:w-28 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-gray-200 border border-gray-300 relative group">
          {value ? (
            <img
              src={value}
              alt={altValue || 'Preview'}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-[10px]">
              <ImageIcon className="w-5 h-5 mb-0.5" />
              <span>No image</span>
            </div>
          )}
        </div>

        {/* Input & Upload Controls */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
                <LinkIcon className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://... or upload below"
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#043E49] focus:border-[#043E49]"
              />
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 transition-colors cursor-pointer shrink-0 shadow-2xs"
            >
              <Upload className="w-3.5 h-3.5 text-gray-600" />
              <span>Upload</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {onAltChange !== undefined && (
            <input
              type="text"
              value={altValue || ''}
              onChange={(e) => onAltChange(e.target.value)}
              placeholder="Descriptive image alt text (for accessibility)..."
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#043E49] focus:border-[#043E49]"
            />
          )}
        </div>
      </div>
    </div>
  );
};
