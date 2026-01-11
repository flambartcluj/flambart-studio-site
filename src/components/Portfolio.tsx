import { useState, useMemo } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { content, PortfolioItem } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { cn } from '@/lib/utils';

type Category = 'all' | 'weddings' | 'baptisms' | 'portraits' | 'corporate' | 'architecture';

export function Portfolio() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);
  const { ref: sectionRef, isVisible } = useAnimateOnScroll<HTMLElement>();

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: language === 'ro' ? 'Toate' : 'All' },
    { id: 'weddings', label: t(content.portfolio.categories.weddings) },
    { id: 'baptisms', label: t(content.portfolio.categories.baptisms) },
    { id: 'portraits', label: t(content.portfolio.categories.portraits) },
    { id: 'corporate', label: t(content.portfolio.categories.corporate) },
    { id: 'architecture', label: t(content.portfolio.categories.architecture) },
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return content.portfolio.items;
    return content.portfolio.items.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const currentIndex = lightboxItem
    ? filteredItems.findIndex((item) => item.id === lightboxItem.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setLightboxItem(filteredItems[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setLightboxItem(filteredItems[currentIndex + 1]);
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

        {/* Masonry Grid */}
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
                  src={item.type === 'video' ? item.thumbnail || item.src : item.src}
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
                  {item.type === 'video' && (
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
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center"
          onClick={() => setLightboxItem(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxItem(null)}
            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors duration-250"
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
              className="absolute left-6 p-2 text-muted-foreground hover:text-foreground transition-colors duration-250"
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
              className="absolute right-6 p-2 text-muted-foreground hover:text-foreground transition-colors duration-250"
              aria-label="Next image"
            >
              <ChevronRight size={40} />
            </button>
          )}

          {/* Image/Video */}
          <div
            className="max-w-5xl max-h-[85vh] mx-auto px-16"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxItem.type === 'video' ? (
              <div className="aspect-video bg-secondary flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Play size={64} className="mx-auto mb-4" />
                  <p>Video placeholder</p>
                </div>
              </div>
            ) : (
              <img
                src={lightboxItem.src}
                alt={lightboxItem.alt[language]}
                className="max-w-full max-h-[85vh] object-contain animate-fade-in-scale"
              />
            )}

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
