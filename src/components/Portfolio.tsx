import { useState, useMemo } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { content, PortfolioItem } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

type Category = 'all' | 'weddings' | 'events' | 'architecture';

export function Portfolio() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: language === 'ro' ? 'Toate' : 'All' },
    { id: 'weddings', label: t(content.portfolio.categories.weddings) },
    { id: 'events', label: t(content.portfolio.categories.events) },
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
    <section id="portfolio" className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="caption text-primary mb-4">{t(content.portfolio.title)}</p>
          <h2 className="heading-md font-serif mb-4">{t(content.portfolio.subtitle)}</h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-6 py-2 text-sm tracking-wide transition-all duration-250 border',
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="break-inside-avoid group cursor-pointer img-zoom"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setLightboxItem(item)}
            >
              <div className="relative overflow-hidden bg-secondary">
                <img
                  src={item.type === 'video' ? item.thumbnail || item.src : item.src}
                  alt={item.alt[language]}
                  loading="lazy"
                  className={cn(
                    'w-full object-cover',
                    item.aspectRatio === 'portrait' && 'aspect-[3/4]',
                    item.aspectRatio === 'landscape' && 'aspect-[4/3]',
                    item.aspectRatio === 'square' && 'aspect-square',
                    !item.aspectRatio && 'aspect-[4/3]'
                  )}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-350 flex items-center justify-center">
                  {item.type === 'video' && (
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-350">
                      <Play size={24} className="text-primary-foreground ml-1" />
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350">
                  <p className="text-sm text-foreground">{item.alt[language]}</p>
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
