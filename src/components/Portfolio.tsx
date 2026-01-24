import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { useGallery, GalleryItem, resolveGalleryUrl, getEmbedUrl, getItemThumbnailUrl } from '@/hooks/useGallery';
import { cn } from '@/lib/utils';
import { TOP_GROUPS, getItemGroupAndSubCategory } from '@/lib/categoryMapping';
import { PortfolioFilters } from '@/components/portfolio/PortfolioFilters';
import { useTouchSwipe } from '@/hooks/useTouchSwipe';
import { useIsMobile } from '@/hooks/use-mobile';

// Media type filter options
type MediaTypeFilter = 'all' | 'photos' | 'videos';

// Navigation direction for slide animation
type SlideDirection = 'left' | 'right' | null;

export function Portfolio() {
  const { t, language } = useLanguage();
  const { items: galleryItems, isLoading, error } = useGallery();
  const [activeGroup, setActiveGroup] = useState<string>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [mediaTypeFilter, setMediaTypeFilter] = useState<MediaTypeFilter>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(null);
  const { ref: sectionRef, isVisible } = useAnimateOnScroll<HTMLElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Get the current group's subcategories
  const currentGroup = TOP_GROUPS.find((g) => g.id === activeGroup);
  const subCategories = currentGroup?.subCategories || [];

  // Filter items based on active group, subcategory, and media type
  const filteredItems = useMemo(() => {
    let items = galleryItems;

    // Filter by media type first
    if (mediaTypeFilter === 'photos') {
      items = items.filter((item) => item.type === 'image');
    } else if (mediaTypeFilter === 'videos') {
      items = items.filter((item) => item.type === 'video' || item.type === 'embed');
    }

    // Then filter by category/group
    if (activeGroup === 'all') return items;

    return items.filter((item) => {
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
  }, [activeGroup, activeSubCategory, mediaTypeFilter, galleryItems]);

  // Compute counts per group and subcategory for the current media filter
  const { groupCounts, subCategoryCounts, visibleGroups, visibleSubCategories } = useMemo(() => {
    // First, filter items by media type
    let filteredByMedia = galleryItems;
    if (mediaTypeFilter === 'photos') {
      filteredByMedia = galleryItems.filter((item) => item.type === 'image');
    } else if (mediaTypeFilter === 'videos') {
      filteredByMedia = galleryItems.filter((item) => item.type === 'video' || item.type === 'embed');
    }

    // Count items per group
    const gCounts: Record<string, number> = {};
    // Count items per subcategory within the active group
    const sCounts: Record<string, number> = {};

    filteredByMedia.forEach((item) => {
      const mapping = getItemGroupAndSubCategory(item.category, (item as any).subCategory);
      if (mapping) {
        gCounts[mapping.groupId] = (gCounts[mapping.groupId] || 0) + 1;
        if (mapping.groupId === activeGroup) {
          sCounts[mapping.subCategoryId] = (sCounts[mapping.subCategoryId] || 0) + 1;
        }
      }
    });

    // Visible groups: 'all' always visible, others only if they have items
    const vGroups = TOP_GROUPS.filter((g) => g.id === 'all' || (gCounts[g.id] || 0) > 0);

    // Visible subcategories for the current group
    const vSubCats = subCategories.filter((sc) => (sCounts[sc.id] || 0) > 0);

    return {
      groupCounts: gCounts,
      subCategoryCounts: sCounts,
      visibleGroups: vGroups,
      visibleSubCategories: vSubCats,
    };
  }, [galleryItems, mediaTypeFilter, activeGroup, subCategories]);

  // Auto-fallback: if current group becomes empty, switch to 'all'
  useEffect(() => {
    if (activeGroup !== 'all' && (groupCounts[activeGroup] || 0) === 0) {
      setActiveGroup('all');
      setActiveSubCategory(null);
    }
  }, [activeGroup, groupCounts]);

  // Auto-fallback: if current subcategory becomes empty, switch to first available
  useEffect(() => {
    if (activeGroup === 'all' || !activeSubCategory) return;
    
    const currentCount = subCategoryCounts[activeSubCategory] || 0;
    if (currentCount === 0 && visibleSubCategories.length > 0) {
      setActiveSubCategory(visibleSubCategories[0].id);
    } else if (currentCount === 0 && visibleSubCategories.length === 0) {
      // No subcategories with items, fallback to 'all'
      setActiveGroup('all');
      setActiveSubCategory(null);
    }
  }, [activeSubCategory, activeGroup, subCategoryCounts, visibleSubCategories]);

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
  const navigateTo = useCallback((item: GalleryItem, direction: SlideDirection = null) => {
    stopAllMedia();
    setSlideDirection(direction);
    setLightboxItem(item);
  }, [stopAllMedia]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigateTo(filteredItems[currentIndex - 1], 'right');
      } else if (e.key === 'ArrowRight' && currentIndex < filteredItems.length - 1) {
        navigateTo(filteredItems[currentIndex + 1], 'left');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItem, currentIndex, filteredItems, closeLightbox, navigateTo]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigateTo(filteredItems[currentIndex - 1], 'right');
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      navigateTo(filteredItems[currentIndex + 1], 'left');
    }
  };

  // Mobile swipe gesture support for lightbox
  const isMobile = useIsMobile();
  const swipeHandlers = useTouchSwipe({
    onSwipeLeft: isMobile && lightboxItem ? handleNext : undefined,
    onSwipeRight: isMobile && lightboxItem ? handlePrev : undefined,
  });

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
        <div className="text-center mb-8">
          <p className="caption text-primary mb-4">{t(content.portfolio.title)}</p>
          <h2 className="heading-md font-display mb-4">{t(content.portfolio.subtitle)}</h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6 mb-8" />
        </div>

        {/* Filters */}
        <div className="mb-10">
          <PortfolioFilters
            activeGroup={activeGroup}
            activeSubCategory={activeSubCategory}
            mediaTypeFilter={mediaTypeFilter}
            subCategories={visibleSubCategories}
            subCategoryCounts={subCategoryCounts}
            visibleGroups={visibleGroups}
            onGroupChange={handleGroupChange}
            onSubCategoryChange={setActiveSubCategory}
            onMediaTypeChange={setMediaTypeFilter}
          />
        </div>

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
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid group cursor-pointer img-zoom"
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
          {...(isMobile ? swipeHandlers : {})}
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
            key={lightboxItem.id}
            className={cn(
              "w-full max-w-5xl max-h-[85vh] mx-auto px-4 sm:px-16",
              slideDirection === 'left' && "animate-slide-fade-left",
              slideDirection === 'right' && "animate-slide-fade-right",
              !slideDirection && "animate-fade-in"
            )}
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
