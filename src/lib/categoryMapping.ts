// Category mapping for 2-level portfolio navigation
// Maps existing JSON categories to the new hierarchical structure

export interface BilingualLabel {
  ro: string;
  en: string;
}

export interface SubCategory {
  id: string;
  label: BilingualLabel;
}

export interface TopGroup {
  id: string;
  label: BilingualLabel;
  subCategories: SubCategory[];
}

// Top-level groups with their subcategories (Bilingual: RO + EN)
export const TOP_GROUPS: TopGroup[] = [
  {
    id: 'all',
    label: { ro: 'Toate', en: 'All' },
    subCategories: [],
  },
  {
    id: 'weddings',
    label: { ro: 'Nunți', en: 'Weddings' },
    subCategories: [
      { id: 'wedding', label: { ro: 'Nuntă', en: 'Wedding' } },
      { id: 'civil', label: { ro: 'Stare civilă', en: 'Civil ceremony' } },
      { id: 'save-the-date', label: { ro: 'Save the date', en: 'Save the date' } },
      { id: 'proposal', label: { ro: 'Proposal / Logodnă', en: 'Proposal / Engagement' } },
      { id: 'trash-the-dress', label: { ro: 'Trash the dress', en: 'Trash the dress' } },
    ],
  },
  {
    id: 'other-events',
    label: { ro: 'Alte Evenimente', en: 'Other Events' },
    subCategories: [
      { id: 'baptism', label: { ro: 'Botez', en: 'Baptism' } },
      { id: 'coming-of-age', label: { ro: 'Majorat', en: 'Coming of age' } },
      { id: 'anniversary', label: { ro: 'Aniversare', en: 'Anniversary' } },
    ],
  },
  {
    id: 'portrait-personal',
    label: { ro: 'Portret & Ședințe Personale', en: 'Portrait & Personal Sessions' },
    subCategories: [
      { id: 'portrait', label: { ro: 'Portret', en: 'Portrait' } },
      { id: 'couple', label: { ro: 'Cuplu', en: 'Couple' } },
      { id: 'family', label: { ro: 'Familie', en: 'Family' } },
      { id: 'baby', label: { ro: 'Baby', en: 'Baby' } },
      { id: 'themed-sessions', label: { ro: 'Ședințe tematice', en: 'Themed sessions' } },
    ],
  },
  {
    id: 'corporate-business',
    label: { ro: 'Corporate & Business', en: 'Corporate & Business' },
    subCategories: [
      { id: 'portraits-teams', label: { ro: 'Portrete & Echipe', en: 'Corporate portraits & teams' } },
      { id: 'business-branding', label: { ro: 'Business Branding', en: 'Business branding' } },
      { id: 'corporate-events', label: { ro: 'Evenimente Corporate', en: 'Corporate events' } },
    ],
  },
  {
    id: 'real-estate-architecture',
    label: { ro: 'Imobiliar & Arhitectură', en: 'Real Estate & Architecture' },
    subCategories: [
      { id: 'real-estate', label: { ro: 'Imobiliar', en: 'Real estate' } },
      { id: 'architectural', label: { ro: 'Arhitectural', en: 'Architectural' } },
      { id: 'virtual-tours', label: { ro: 'Tururi virtuale 360', en: '360 virtual tours' } },
      { id: 'aerial', label: { ro: 'Imagini aeriene', en: 'Aerial imagery' } },
    ],
  },
];

// Maps existing JSON category values to { groupId, subCategoryId }
// This allows current JSON to work immediately without changes
export const CATEGORY_MAPPING: Record<string, { groupId: string; subCategoryId: string }> = {
  weddings: { groupId: 'weddings', subCategoryId: 'wedding' },
  baptisms: { groupId: 'other-events', subCategoryId: 'baptism' },
  portraits: { groupId: 'portrait-personal', subCategoryId: 'portrait' },
  corporate: { groupId: 'corporate-business', subCategoryId: 'portraits-teams' },
  architecture: { groupId: 'real-estate-architecture', subCategoryId: 'architectural' },
};

// Get the group and subcategory for a gallery item
// Supports optional subCategory field for fine-grained filtering
export function getItemGroupAndSubCategory(
  category: string,
  subCategory?: string
): { groupId: string; subCategoryId: string } | null {
  // If subCategory is provided in JSON, use it directly
  if (subCategory) {
    // Find which group contains this subCategory
    for (const group of TOP_GROUPS) {
      const found = group.subCategories.find((sc) => sc.id === subCategory);
      if (found) {
        return { groupId: group.id, subCategoryId: subCategory };
      }
    }
  }

  // Fall back to category mapping
  return CATEGORY_MAPPING[category] || null;
}

// Get all items for a specific group
export function getItemsForGroup(groupId: string): string[] {
  if (groupId === 'all') return [];
  
  // Find all categories that map to this group
  return Object.entries(CATEGORY_MAPPING)
    .filter(([_, mapping]) => mapping.groupId === groupId)
    .map(([category]) => category);
}

// Get all subcategory IDs for a group
export function getSubCategoryIdsForGroup(groupId: string): string[] {
  const group = TOP_GROUPS.find((g) => g.id === groupId);
  return group ? group.subCategories.map((sc) => sc.id) : [];
}

// Helper to get translated label
export function getTranslatedLabel(
  labelObj: BilingualLabel,
  language: 'ro' | 'en'
): string {
  return labelObj[language];
}
