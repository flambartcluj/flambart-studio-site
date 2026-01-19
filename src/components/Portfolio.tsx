import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { useGallery, GalleryItem, resolveGalleryUrl, getEmbedUrl, getItemThumbnailUrl } from '@/hooks/useGallery';
import { cn } from '@/lib/utils';
import { TOP_GROUPS, CATEGORY_MAPPING, getItemGroupAndSubCategory } from '@/lib/categoryMapping';

export function Portfolio() {
  const { t, language } = useLanguage();
  const { items: galleryItems, isLoading, error } = useGallery();
  const [activeGroup, setActiveGroup] = useState<string>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const { ref: sectionRef, isVisible } = useAnimateOnScroll<HTMLElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Get the current group's subcategories
  const currentGroup = TOP_GROUPS.find((g) => g.id === activeGroup);
  const subCategories = currentGroup?.subCategories || [];

  // Filter items based on active group and subcategory
  const filteredItems = useMemo(() => {
    if (activeGroup === 'all') return galleryItems;

    return galleryItems.filter((item) => {
      const mapping = getItemGroupAndSubCategory(item.category, (item as any).subCategory);
      if (!mapping) return false;

      // Check if item belongs to the active group
      if (mapping.groupId !== activeGroup) return false;

      // If a subcategory is selected, filter by it
      if (activeSubCategory) {
        return mapping.subCategoryId === activeSubCategory;
      }

      return true;
    });
  }, [activeGroup, activeSubCategory, galleryItems]);

  // Count items per subcategory for the current group
  const subCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    galleryItems.forEach((item) => {
      const mapping = getItemGroupAndSubCategory(item.category, (item as any).subCategory);
      if (mapping && mapping.groupId === activeGroup) {
        counts[mapping.subCategoryId] = (counts[mapping.subCategoryId] || 0) + 1;
      }
    });

    return counts;
  }, [activeGroup, galleryItems]);

  // Handle group change - auto-select first subcategory with items
  const handleGroupChange = useCallback((groupId: string) => {
    setActiveGroup(groupId);
    
    if (groupId === 'all') {
      setActiveSubCategory(null);
      return;
    }

    const group = TOP_GROUPS.find((g) => g.id === groupId);
    if (!group || group.subCategories.length === 0) {
      setActiveSubCategory(null);
      return;
    }

    // Find first subcategory with items
    const itemsInGroup = galleryItems.filter((item) => {
      const mapping = getItemGroupAndSubCategory(item.category, (item as any).subCategory);
      return mapping?.groupId === groupId;
    });

    if (itemsInGroup.length === 0) {
      // No items in this group, select first subcategory to show empty state
      setActiveSubCategory(group.subCategories[0].id);
      return;
    }

    // Find first subcategory that has items
    for (const subCat of group.subCategories) {
      const hasItems = itemsInGroup.some((item) => {
        const mapping = getItemGroupAndSubCategory(item.category, (item as any).subCategory);
        return mapping?.subCategoryId === subCat.id;
      });
      if (hasItems) {
        setActiveSubCategory(subCat.id);
        return;
      }
    }

    // Fallback to first subcategory
    setActiveSubCategory(group.subCategories[0].id);
  }, [galleryItems]);

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
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
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

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <p className="text-muted-foreground text-center mb-6">
        {language === 'ro' 
          ? 'Momentan nu există imagini în această categorie.' 
          : 'There are no images in this category yet.'}
      </p>
      <button
        onClick={() => handleGroupChange('all')}
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
      >
        {language === 'ro' ? 'Vezi Toate' : 'View All'}
      </button>
    </div>
  );

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
          "text-center mb-12 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="caption text-primary mb-4">{t(content.portfolio.title)}</p>
          <h2 className="heading-md font-display mb-4">{t(content.portfolio.subtitle)}</h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </div>

        {/* Top Group Filter */}
        <div className={cn(
          "mb-4 transition-all duration-700 delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {TOP_GROUPS.map((group) => (
              <button
                key={group.id}
                onClick={() => handleGroupChange(group.id)}
                className={cn(
                  'px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium tracking-wide rounded-full border transition-all duration-200',
                  activeGroup === group.id
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-transparent text-muted-foreground border-border/60 hover:border-foreground/40 hover:text-foreground'
                )}
              >
                {group.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        {activeGroup !== 'all' && subCategories.length > 0 && (
          <div className={cn(
            "mb-10 transition-all duration-500 delay-150",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <div className="flex justify-center">
              <div className="flex gap-2 overflow-x-auto pb-2 px-4 max-w-full scrollbar-hide">
                {subCategories.map((subCat) => {
                  const count = subCategoryCounts[subCat.id] || 0;
                  return (
                    <button
                      key={subCat.id}
                      onClick={() => setActiveSubCategory(subCat.id)}
                      className={cn(
                        'px-3 md:px-4 py-1.5 md:py-2 text-xs font-medium rounded-full border whitespace-nowrap transition-all duration-200',
                        activeSubCategory === subCat.id
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground'
                      )}
                    >
                      {subCat.label[language]}
                      {count > 0 && (
                        <span className={cn(
                          "ml-1.5 text-[10px]",
                          activeSubCategory === subCat.id ? "text-primary-foreground/70" : "text-muted-foreground/60"
                        )}>
                          ({count})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16">
            <div className="animate-pulse text-muted-foreground">
              {language === 'ro' ? 'Se încarcă galeria...' : 'Loading gallery...'}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredItems.length === 0 && <EmptyState />}

        {/* Masonry Grid */}
        {!isLoading && filteredItems.length > 0 && (
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
