import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { useGallery, GalleryItem, resolveGalleryUrl, getEmbedUrl, getItemThumbnailUrl } from '@/hooks/useGallery';
import { cn } from '@/lib/utils';

type Category = 'all' | 'weddings' | 'baptisms' | 'portraits' | 'corporate' | 'architecture';

export function Portfolio() {
  const { t, language } = useLanguage();
  const { items: galleryItems, isLoading, error } = useGallery();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const { ref: sectionRef, isVisible } = useAnimateOnScroll<HTMLElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: language === 'ro' ? 'Toate' : 'All' },
    { id: 'weddings', label: t(content.portfolio.categories.weddings) },
    { id: 'baptisms', label: t(content.portfolio.categories.baptisms) },
    { id: 'portraits', label: t(content.portfolio.categories.portraits) },
    { id: 'corporate', label: t(content.portfolio.categories.corporate) },
    { id: 'architecture', label: t(content.portfolio.categories.architecture) },
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, galleryItems]);

  const currentIndex = lightboxItem
    ? filteredItems.findIndex((item) => item.id === lightboxItem.id)
    : -1;

  // Stop local video playback
  const stopLocalVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  // Stop embed playback by clearing iframe src
  const stopEmbed = useCallback(() => {
    if (iframeRef.current) {
      // Setting src to empty stops the video
      iframeRef.current.src = '';
    }
  }, []);

  // Stop all media (local video and embeds)
  const stopAllMedia = useCallback(() => {
    stopLocalVideo();
    stopEmbed();
  }, [stopLocalVideo, stopEmbed]);

  // Handle closing lightbox
  const closeLightbox = useCallback(() => {
    stopAllMedia();
    setLightboxItem(null);
  }, [stopAllMedia]);

  // Handle navigation - stop current media before switching
  const navigateTo = useCallback((item: GalleryItem) => {
    stopAllMedia();
    setLightboxItem(item);
  }, [stopAllMedia]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigateTo(filteredItems[currentIndex - 1]);
      } else if (e.key === 'ArrowRight' && currentIndex < filteredItems.length - 1) {
        navigateTo(filteredItems[currentIndex + 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItem, currentIndex, filteredItems, closeLightbox, navigateTo]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigateTo(filteredItems[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      navigateTo(filteredItems[currentIndex + 1]);
    }
  };

  // Get the resolved source URL for an item (images and local videos only)
  const getItemSrc = (item: GalleryItem): string => {
    if (item.type === 'image' || item.type === 'video') {
      return resolveGalleryUrl(item.filename);
    }
    return '';
  };

  // Check if item is a playable media type (video or embed)
  const isPlayableMedia = (item: GalleryItem): boolean => {
    return item.type === 'video' || item.type === 'embed';
  };

  if (error) {
    console.error('Gallery loading error:', error);
  }

  // Render the lightbox content based on item type
  const renderLightboxContent = (item: GalleryItem) => {
    switch (item.type) {
      case 'image':
        return (
          <img
            src={getItemSrc(item)}
            alt={item.alt[language]}
            className="max-w-full max-h-[85vh] object-contain animate-fade-in-scale mx-auto"
          />
        );

      case 'video':
        return (
          <video
            ref={videoRef}
            key={item.id}
            src={getItemSrc(item)}
            poster={item.thumbnail ? resolveGalleryUrl(item.thumbnail) : undefined}
            controls
            autoPlay
            playsInline
            className="w-full max-h-[75vh] object-contain rounded-sm bg-black"
          >
            {language === 'ro' ? 'Browserul tău nu suportă redarea video.' : 'Your browser does not support video playback.'}
          </video>
        );

      case 'embed':
        const embedUrl = getEmbedUrl(item);
        if (!embedUrl) {
          return (
            <div className="flex items-center justify-center h-64 bg-muted rounded-sm">
              <p className="text-muted-foreground">
                {language === 'ro' ? 'Video indisponibil' : 'Video unavailable'}
              </p>
            </div>
          );
        }
        return (
          <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
            <iframe
              ref={iframeRef}
              key={item.id}
              src={embedUrl}
              className="absolute inset-0 w-full h-full rounded-sm"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              title={item.alt[language]}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="section-padding bg-secondary/30 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container-wide relative">
        {/* Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="caption text-primary mb-4">{t(content.portfolio.title)}</p>
          <h2 className="heading-md font-display mb-4">{t(content.portfolio.subtitle)}</h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </div>

        {/* Category Filter */}
        <div className={cn(
          "flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-5 py-2 text-sm tracking-wide transition-all duration-300 border rounded-sm',
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground border-primary scale-105'
                  : 'bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground hover:scale-105'
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16">
            <div className="animate-pulse text-muted-foreground">
              {language === 'ro' ? 'Se încarcă galeria...' : 'Loading gallery...'}
            </div>
          </div>
        )}

        {/* Masonry Grid */}
        {!isLoading && (
          <div className={cn(
            "columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 transition-all duration-700 delay-200",
            isVisible ? "opacity-100" : "opacity-0"
          )}>
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "break-inside-avoid group cursor-pointer img-zoom transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                )}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
                onClick={() => setLightboxItem(item)}
              >
                <div className="relative overflow-hidden bg-secondary rounded-sm">
                  <img
                    src={getItemThumbnailUrl(item)}
                    alt={item.alt[language]}
                    loading="lazy"
                    className={cn(
                      'w-full object-cover transition-transform duration-500 group-hover:scale-110',
                      item.aspectRatio === 'portrait' && 'aspect-[3/4]',
                      item.aspectRatio === 'landscape' && 'aspect-[4/3]',
                      item.aspectRatio === 'square' && 'aspect-square',
                      !item.aspectRatio && 'aspect-[4/3]'
                    )}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    {isPlayableMedia(item) && (
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play size={24} className="text-primary-foreground ml-1" />
                      </div>
                    )}
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm text-background font-medium">{item.alt[language]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors duration-250 z-10"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Navigation */}
          {currentIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-6 p-2 text-muted-foreground hover:text-foreground transition-colors duration-250 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={40} />
            </button>
          )}
          {currentIndex < filteredItems.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-6 p-2 text-muted-foreground hover:text-foreground transition-colors duration-250 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={40} />
            </button>
          )}

          {/* Content (Image/Video/Embed) */}
          <div
            className="w-full max-w-5xl max-h-[85vh] mx-auto px-4 sm:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            {renderLightboxContent(lightboxItem)}

            {/* Caption */}
            <p className="text-center text-muted-foreground mt-4">
              {lightboxItem.alt[language]}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}