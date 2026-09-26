import { GalleryItem } from '../types';

const DB_NAME = 'rise_rescue_gallery_db';
const DB_VERSION = 1;
const STORE_NAME = 'gallery_store';
const STORAGE_KEY = 'pawhaven_admin_gallery_photos';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Persist gallery items safely in IndexedDB (allowing 100s of MBs for video data)
 * with a fallback to localStorage.
 */
export async function saveGalleryItemsToStorage(items: GalleryItem[]): Promise<void> {
  // 1. Try to save in IndexedDB
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(items, 'gallery_items');
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB save failed, falling back to localStorage:', err);
  }

  // 2. Also try localStorage for faster synchronous fallback
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    // Quota exceeded on localStorage is expected for large videos; IndexedDB handles it.
  }
}

/**
 * Load gallery items from IndexedDB first, with localStorage fallback.
 */
export async function loadGalleryItemsFromStorage(): Promise<GalleryItem[] | null> {
  // 1. Try IndexedDB
  try {
    const db = await openDB();
    const items = await new Promise<GalleryItem[] | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get('gallery_items');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
    if (items && Array.isArray(items) && items.length > 0) {
      return items;
    }
  } catch (err) {
    console.warn('IndexedDB load failed, trying localStorage:', err);
  }

  // 2. Fallback to localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    // ignore
  }

  return null;
}

export interface VideoEmbedInfo {
  type: 'youtube' | 'vimeo' | 'direct';
  embedUrl?: string;
  directUrl?: string;
  videoId?: string;
  defaultThumbnail?: string;
}

/**
 * Detect YouTube, Vimeo, or direct video URLs and return embedding parameters.
 */
export function getVideoEmbedInfo(url?: string): VideoEmbedInfo {
  if (!url) return { type: 'direct', directUrl: '' };
  const trimmed = url.trim();

  // YouTube detection (Standard, Share, Shorts, Embed)
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    const id = ytMatch[1];
    return {
      type: 'youtube',
      videoId: id,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`,
      defaultThumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    };
  }

  // Vimeo detection
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    const id = vimeoMatch[1];
    return {
      type: 'vimeo',
      videoId: id,
      embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1`
    };
  }

  return {
    type: 'direct',
    directUrl: trimmed
  };
}

/**
 * Converts any date string or ISO date into clean format "MMM DD, YYYY" (e.g., "Sep 26, 2026")
 */
export function formatGalleryDate(dateStr?: string): string {
  if (!dateStr || !dateStr.trim()) {
    return new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  }
  const trimmed = dateStr.trim();
  // Already in "MMM DD, YYYY" format
  if (/^[A-Za-z]{3}\s+\d{1,2},\s+\d{4}$/.test(trimmed)) {
    return trimmed;
  }
  // If in YYYY-MM-DD format, parse parts to avoid timezone shifting
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [year, month, day] = trimmed.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    }
  }
  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  }
  return trimmed;
}

/**
 * Converts a gallery date string into HTML5 date input format "YYYY-MM-DD"
 */
export function toInputDateFormat(dateStr?: string): string {
  if (!dateStr || !dateStr.trim()) {
    return new Date().toISOString().split('T')[0];
  }
  const trimmed = dateStr.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }
  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return new Date().toISOString().split('T')[0];
}
