import { useState, useEffect } from 'react';

export type GalleryCategory = 'weddings' | 'baptisms' | 'portraits' | 'corporate' | 'architecture';

// Media types supported by the gallery
export type GalleryMediaType = 'image' | 'video' | 'embed';

// Embed providers with special handling
export type EmbedProvider = 'youtube' | 'vimeo' | 'other';

// Base fields shared by all gallery items
interface GalleryItemBase {
  id: string;
  alt: { ro: string; en: string };
  category: GalleryCategory;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  thumbnail?: string; // Optional poster/thumbnail for videos and embeds
  featured?: boolean; // Optional flag for featured items on homepage
}

// Image item
interface GalleryImageItem extends GalleryItemBase {
  type: 'image';
  filename: string;
}

// Local video item
interface GalleryVideoItem extends GalleryItemBase {
  type: 'video';
  filename: string;
}

// Embedded video item
interface GalleryEmbedItem extends GalleryItemBase {
  type: 'embed';
  provider: EmbedProvider;
  videoId?: string; // For YouTube/Vimeo - the video ID
  embedUrl?: string; // For 'other' provider or custom URLs
}

// Union type for all gallery items
export type GalleryItem = GalleryImageItem | GalleryVideoItem | GalleryEmbedItem;

interface GalleryData {
  items: GalleryItem[];
}

// Base path for gallery assets in the public folder
const GALLERY_ASSETS_PATH = '/gallery-assets/';

// Resolve filename to full URL for local assets
export function resolveGalleryUrl(filename: string): string {
  if (filename.startsWith('/') || filename.startsWith('http')) {
    return filename;
  }
  return `${GALLERY_ASSETS_PATH}${filename}`;
}

// Generate embed URL from provider and videoId
export function getEmbedUrl(item: GalleryItem): string | null {
  if (item.type !== 'embed') return null;

  switch (item.provider) {
    case 'youtube':
      if (item.videoId) {
        // Enable JS API for programmatic control, autoplay, and allow fullscreen
        return `https://www.youtube.com/embed/${item.videoId}?autoplay=1&enablejsapi=1&rel=0`;
      }
      break;
    case 'vimeo':
      if (item.videoId) {
        return `https://player.vimeo.com/video/${item.videoId}?autoplay=1&title=0&byline=0&portrait=0`;
      }
      break;
    case 'other':
      if (item.embedUrl) {
        return item.embedUrl;
      }
      break;
  }
  return null;
}

// Get thumbnail URL for an item
export function getItemThumbnailUrl(item: GalleryItem): string {
  // If explicit thumbnail is provided, use it
  if (item.thumbnail) {
    return resolveGalleryUrl(item.thumbnail);
  }

  // For images, use the image itself
  if (item.type === 'image') {
    return resolveGalleryUrl(item.filename);
  }

  // For local videos, we can't generate a thumbnail - return placeholder
  if (item.type === 'video') {
    return '/placeholder.svg';
  }

  // For embeds, try to get provider-specific thumbnail
  if (item.type === 'embed') {
    switch (item.provider) {
      case 'youtube':
        if (item.videoId) {
          return `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`;
        }
        break;
      case 'vimeo':
        // Vimeo thumbnails require API call, fallback to placeholder
        break;
    }
  }

  return '/placeholder.svg';
}

export function useGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/gallery.json');
        
        if (!response.ok) {
          throw new Error(`Failed to load gallery: ${response.status}`);
        }
        
        const data: GalleryData = await response.json();
        setItems(data.items);
      } catch (err) {
        console.error('Error loading gallery:', err);
        setError(err instanceof Error ? err.message : 'Failed to load gallery');
      } finally {
        setIsLoading(false);
      }
    }

    loadGallery();
  }, []);

  // Get featured items (max 18)
  const featuredItems = items.filter(item => item.featured === true).slice(0, 18);

  return { items, featuredItems, isLoading, error };
}
