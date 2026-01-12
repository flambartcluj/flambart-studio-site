import { useState, useEffect } from 'react';

export type GalleryCategory = 'weddings' | 'baptisms' | 'portraits' | 'corporate' | 'architecture';

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  filename: string;
  thumbnail?: string;
  alt: { ro: string; en: string };
  category: GalleryCategory;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}

interface GalleryData {
  items: GalleryItem[];
}

// Base path for gallery assets in the public folder
const GALLERY_ASSETS_PATH = '/gallery-assets/';

// Resolve filename to full URL
export function resolveGalleryUrl(filename: string): string {
  // Handle placeholder or absolute paths
  if (filename.startsWith('/') || filename.startsWith('http')) {
    return filename;
  }
  return `${GALLERY_ASSETS_PATH}${filename}`;
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

  return { items, isLoading, error };
}
