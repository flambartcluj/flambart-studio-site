

## Plan: Add Subfolder Structure for Gallery Assets

### Summary

You want to organize your gallery assets into category/subcategory folders for easier management. **Good news: The existing code already supports this!** The `resolveGalleryUrl` function will correctly handle paths like `weddings/wedding/photo.jpg`.

The only changes needed are:
1. Update the documentation to explain the new folder structure
2. Migrate existing JSON entries to use the new path format

---

### How It Works

The `filename` field in `gallery.json` already supports relative paths. When you specify:

```json
"filename": "weddings/wedding/DSC03303.jpg"
```

The system resolves it to:
```
/gallery-assets/weddings/wedding/DSC03303.jpg
```

**No code changes are required** - just organize your folders and update the JSON paths.

---

### Proposed Folder Structure

Based on your screenshot, here is the complete structure:

```
public/gallery-assets/
  weddings/
    wedding/
    civil/
    save-the-date/
    proposal/
    trash-the-dress/
  baptisms/
    baptism/
    coming-of-age/
    anniversary/
  portraits/
    portrait/
    couple/
    family/
    baby/
    themed-sessions/
  corporate/
    portraits-teams/
    business-branding/
    corporate-events/
  architecture/
    real-estate/
    architectural/
    virtual-tours/
    aerial/
```

---

### Changes Required

#### 1. Update `docs/GALLERY_REFERENCE.md`
- Add the folder structure diagram
- Update the "File Location" section to explain subfolders
- Update examples to show the new path format
- Clarify that `filename` and `thumbnail` should include the relative path

#### 2. Update Example JSON Entries
Show both formats are supported:
- **Flat (legacy):** `"filename": "photo.jpg"` (for files directly in `gallery-assets/`)
- **Organized:** `"filename": "weddings/wedding/photo.jpg"` (for files in subfolders)

---

### Updated JSON Format Examples

**Before (flat structure):**
```json
{
  "id": "wed-01",
  "type": "image",
  "filename": "DSC03303.jpg",
  "category": "weddings",
  "subCategory": "wedding"
}
```

**After (organized structure):**
```json
{
  "id": "wed-01",
  "type": "image",
  "filename": "weddings/wedding/DSC03303.jpg",
  "category": "weddings",
  "subCategory": "wedding"
}
```

**Video with thumbnail (organized):**
```json
{
  "id": "wed-03",
  "type": "video",
  "filename": "weddings/wedding/timelapse.mp4",
  "thumbnail": "weddings/wedding/timelapse-thumb.jpg",
  "category": "weddings",
  "subCategory": "wedding"
}
```

---

### Technical Details

**Files to update:**
- `docs/GALLERY_REFERENCE.md` - Add folder structure documentation and update examples

**No code changes needed in:**
- `src/hooks/useGallery.ts` - Already supports relative paths
- `src/components/Portfolio.tsx` - Uses the existing resolver

**Migration approach:**
- Both formats work simultaneously, so you can migrate gradually
- Move files to new folders and update their `filename` in the JSON
- Old flat paths continue working until you move those files

---

### Quick Reference Card (to be added to docs)

| Field | Flat Example | Organized Example |
|-------|--------------|-------------------|
| `filename` | `photo.jpg` | `weddings/wedding/photo.jpg` |
| `thumbnail` | `thumb.jpg` | `weddings/wedding/thumb.jpg` |

**Path formula:** `{category}/{subCategory}/{filename}`

