import { useState } from 'react';
import { ChevronDown, Image, Film, LayoutGrid, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { TOP_GROUPS, TopGroup, SubCategory } from '@/lib/categoryMapping';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type MediaTypeFilter = 'all' | 'photos' | 'videos';

interface PortfolioFiltersProps {
  activeGroup: string;
  activeSubCategory: string | null;
  mediaTypeFilter: MediaTypeFilter;
  subCategories: SubCategory[];
  subCategoryCounts: Record<string, number>;
  onGroupChange: (groupId: string) => void;
  onSubCategoryChange: (subCategoryId: string) => void;
  onMediaTypeChange: (filter: MediaTypeFilter) => void;
}

export function PortfolioFilters({
  activeGroup,
  activeSubCategory,
  mediaTypeFilter,
  subCategories,
  subCategoryCounts,
  onGroupChange,
  onSubCategoryChange,
  onMediaTypeChange,
}: PortfolioFiltersProps) {
  const { language } = useLanguage();
  const [isGroupOpen, setIsGroupOpen] = useState(false);

  const activeGroupData = TOP_GROUPS.find((g) => g.id === activeGroup);
  const activeGroupLabel = activeGroupData?.label[language] || (language === 'ro' ? 'Toate' : 'All');

  const activeSubCategoryData = subCategories.find((s) => s.id === activeSubCategory);
  const activeSubCategoryLabel = activeSubCategoryData?.label[language] || '';

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

      {/* Mobile: Dropdown filters */}
      <div className="flex md:hidden flex-col gap-3">
        {/* Category Dropdown */}
        <DropdownMenu open={isGroupOpen} onOpenChange={setIsGroupOpen}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-between w-full px-4 py-3 bg-muted/30 border border-border/60 rounded-lg text-sm font-medium text-foreground">
              <span>{activeGroupLabel}</span>
              <ChevronDown
                size={18}
                className={cn(
                  'text-muted-foreground transition-transform duration-200',
                  isGroupOpen && 'rotate-180'
                )}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[calc(100vw-2rem)] max-w-sm">
            {TOP_GROUPS.map((group) => (
              <DropdownMenuItem
                key={group.id}
                onClick={() => onGroupChange(group.id)}
                className={cn(
                  'flex items-center justify-between py-3',
                  activeGroup === group.id && 'bg-primary/10'
                )}
              >
                <span>{group.label[language]}</span>
                {activeGroup === group.id && <Check size={16} className="text-primary" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Subcategory Pills - Horizontal scroll */}
        {activeGroup !== 'all' && subCategories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
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
          </div>
        )}
      </div>

      {/* Desktop: Original pill buttons */}
      <div className="hidden md:block">
        {/* Top Group Filter */}
        <div className="mb-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {TOP_GROUPS.map((group) => (
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
