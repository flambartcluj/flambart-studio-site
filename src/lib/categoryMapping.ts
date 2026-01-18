// Category mapping for 2-level portfolio navigation
// Maps existing JSON categories to the new hierarchical structure

export interface SubCategory {
  id: string;
  label: string;
}

export interface TopGroup {
  id: string;
  label: string;
  subCategories: SubCategory[];
}

// Top-level groups with their subcategories (Romanian labels)
export const TOP_GROUPS: TopGroup[] = [
  {
    id: 'all',
    label: 'Toate',
    subCategories: [],
  },
  {
    id: 'events',
    label: 'Evenimente',
    subCategories: [
      { id: 'wedding', label: 'Nuntă' },
      { id: 'baptism', label: 'Botez' },
      { id: 'civil', label: 'Stare civilă' },
      { id: 'coming-of-age', label: 'Majorat' },
      { id: 'anniversary', label: 'Aniversare' },
    ],
  },
  {
    id: 'wedding-sessions',
    label: 'Sesiuni conexe nunții',
    subCategories: [
      { id: 'save-the-date', label: 'Save the date' },
      { id: 'proposal', label: 'Proposal' },
      { id: 'trash-the-dress', label: 'Trash the dress' },
    ],
  },
  {
    id: 'portrait-thematic',
    label: 'Portret & Ședințe tematice',
    subCategories: [
      { id: 'portrait', label: 'Portret' },
      { id: 'couple', label: 'Cuplu' },
      { id: 'family', label: 'Familie' },
      { id: 'baby', label: 'Baby' },
    ],
  },
  {
    id: 'corporate-business',
    label: 'Corporate & Business',
    subCategories: [
      { id: 'portraits-teams', label: 'Portrete & Echipe' },
      { id: 'business-branding', label: 'Business Branding' },
      { id: 'corporate-events', label: 'Evenimente Corporate' },
    ],
  },
  {
    id: 'real-estate-architecture',
    label: 'Real Estate & Arhitectură',
    subCategories: [
      { id: 'real-estate', label: 'Imobiliar' },
      { id: 'architectural', label: 'Arhitectural' },
    ],
  },
];

// Maps existing JSON category values to { groupId, subCategoryId }
// This allows current JSON to work immediately without changes
export const CATEGORY_MAPPING: Record<string, { groupId: string; subCategoryId: string }> = {
  weddings: { groupId: 'events', subCategoryId: 'wedding' },
  baptisms: { groupId: 'events', subCategoryId: 'baptism' },
  portraits: { groupId: 'portrait-thematic', subCategoryId: 'portrait' },
  corporate: { groupId: 'corporate-business', subCategoryId: 'portraits-teams' },
  architecture: { groupId: 'real-estate-architecture', subCategoryId: 'architectural' },
};

// Get the group and subcategory for a gallery item
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
