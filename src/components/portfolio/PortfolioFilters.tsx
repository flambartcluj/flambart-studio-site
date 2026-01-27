import { useState, useRef, useEffect } from 'react';
import { Image, Film, LayoutGrid } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { TopGroup, SubCategory } from '@/lib/categoryMapping';

type MediaTypeFilter = 'all' | 'photos' | 'videos';

interface PortfolioFiltersProps {
  activeGroup: string;
  activeSubCategory: string | null;
  mediaTypeFilter: MediaTypeFilter;
  subCategories: SubCategory[];
  subCategoryCounts: Record<string, number>;
  visibleGroups: TopGroup[];
  onGroupChange: (groupId: string) => void;
  onSubCategoryChange: (subCategoryId: string) => void;
  onMediaTypeChange: (filter: MediaTypeFilter) => void;
}

// Reusable scrollable pill container with overflow fade cues
function ScrollablePillRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const checkOverflow = () => {
    const el = scrollRef.current;
    if (!el) return;

    const hasOverflow = el.scrollWidth > el.clientWidth;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    setShowLeftFade(hasOverflow && scrollLeft > 4);
    setShowRightFade(hasOverflow && scrollLeft < maxScroll - 4);
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [children]);

  return (
    <div className="relative">
      {/* Left fade gradient */}
      <div
        className={cn(
          'absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-200',
          showLeftFade ? 'opacity-100' : 'opacity-0'
        )}
      />
      {/* Right fade gradient */}
      <div
        className={cn(
          'absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-200',
          showRightFade ? 'opacity-100' : 'opacity-0'
        )}
      />
      <div
        ref={scrollRef}
        onScroll={checkOverflow}
        className={cn(
          'flex gap-2 overflow-x-auto scrollbar-hide px-1',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function PortfolioFilters({
  activeGroup,
  activeSubCategory,
  mediaTypeFilter,
  subCategories,
  subCategoryCounts,
  visibleGroups,
  onGroupChange,
  onSubCategoryChange,
  onMediaTypeChange,
}: PortfolioFiltersProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-4">
      {/* Media Type Toggle - Compact for all screens */}
      <div className="flex justify-center">
        <div className="inline-flex items-center bg-muted/50 rounded-full p-1 border border-border/40">
          <button
            onClick={() => onMediaTypeChange('all')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
              mediaTypeFilter === 'all'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <LayoutGrid size={14} />
            <span>{language === 'ro' ? 'Toate' : 'All'}</span>
          </button>
          <button
            onClick={() => onMediaTypeChange('photos')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
              mediaTypeFilter === 'photos'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Image size={14} />
            <span>{language === 'ro' ? 'Foto' : 'Photos'}</span>
          </button>
          <button
            onClick={() => onMediaTypeChange('videos')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
              mediaTypeFilter === 'videos'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Film size={14} />
            <span>{language === 'ro' ? 'Video' : 'Videos'}</span>
          </button>
        </div>
      </div>

      {/* Mobile: Horizontally scrollable pill rows */}
      <div className="flex md:hidden flex-col gap-3">
        {/* First-level category pills */}
        <ScrollablePillRow>
          {visibleGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => onGroupChange(group.id)}
              className={cn(
                'flex-shrink-0 px-4 py-2 text-xs font-medium rounded-full border whitespace-nowrap transition-all duration-200',
                activeGroup === group.id
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-background text-muted-foreground border-border/60 hover:border-foreground/40 hover:text-foreground'
              )}
            >
              {group.label[language]}
            </button>
          ))}
        </ScrollablePillRow>

        {/* Second-level subcategory pills */}
        {activeGroup !== 'all' && subCategories.length > 0 && (
          <ScrollablePillRow>
            {/* "All" option for subcategories */}
            <button
              onClick={() => onSubCategoryChange('all')}
              className={cn(
                'flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap transition-all duration-200',
                activeSubCategory === null || activeSubCategory === 'all'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground'
              )}
            >
              {language === 'ro' ? 'Toate' : 'All'}
            </button>
            {subCategories.map((subCat) => {
              const count = subCategoryCounts[subCat.id] || 0;
              const isActive = activeSubCategory === subCat.id;
              return (
                <button
                  key={subCat.id}
                  onClick={() => onSubCategoryChange(subCat.id)}
                  className={cn(
                    'flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap transition-all duration-200',
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground'
                  )}
                >
                  {subCat.label[language]}
                  {count > 0 && (
                    <span className={cn(
                      "ml-1 text-[10px]",
                      isActive ? "text-primary-foreground/70" : "text-muted-foreground/60"
                    )}>
                      ({count})
                    </span>
                  )}
                </button>
              );
            })}
          </ScrollablePillRow>
        )}
      </div>

      {/* Desktop: Original pill buttons */}
      <div className="hidden md:block">
        {/* Top Group Filter */}
        <div className="mb-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {visibleGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => onGroupChange(group.id)}
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
          <div className="mb-10">
            <div className="flex justify-center">
              <div className="flex gap-2 overflow-x-auto pb-2 px-4 max-w-full scrollbar-hide">
                {/* "All" option for subcategories */}
                <button
                  onClick={() => onSubCategoryChange('all')}
                  className={cn(
                    'px-3 md:px-4 py-1.5 md:py-2 text-xs font-medium rounded-full border whitespace-nowrap transition-all duration-200',
                    activeSubCategory === null || activeSubCategory === 'all'
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground'
                  )}
                >
                  {language === 'ro' ? 'Toate' : 'All'}
                </button>
                {subCategories.map((subCat) => {
                  const count = subCategoryCounts[subCat.id] || 0;
                  return (
                    <button
                      key={subCat.id}
                      onClick={() => onSubCategoryChange(subCat.id)}
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
      </div>
    </div>
  );
}
