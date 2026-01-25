# Gallery Reference Guide

This document provides a complete reference for managing the portfolio gallery via the `public/gallery.json` file.

---

## Table of Contents

1. [File Location](#file-location)
2. [Top-Level Categories & Subcategories](#top-level-categories--subcategories)
3. [Gallery Item Schema](#gallery-item-schema)
4. [Item Types](#item-types)
5. [Examples](#examples)
6. [Quick Add Checklist](#quick-add-checklist)

---

## File Location

All gallery data is stored in:
```
public/gallery.json
```

Media assets (images, videos) should be placed in:
```
public/gallery-assets/
```

### Recommended Folder Structure

Organize assets into category/subcategory folders for easier management:

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

### Path Formats

Both formats are supported (you can migrate gradually):

| Format | `filename` Example | Resolves To |
|--------|-------------------|-------------|
| **Flat (legacy)** | `photo.jpg` | `/gallery-assets/photo.jpg` |
| **Organized** | `weddings/wedding/photo.jpg` | `/gallery-assets/weddings/wedding/photo.jpg` |

**Path formula:** `{category}/{subCategory}/{filename}`

---

## Top-Level Categories & Subcategories

The gallery uses a 2-level hierarchy. Each item must have a `category` (legacy field) and optionally a `subCategory` for fine-grained filtering.

### 1. **Weddings** (`weddings`)
| SubCategory ID    | Romanian Label          | English Label           |
|-------------------|-------------------------|-------------------------|
| `wedding`         | Nuntă                   | Wedding                 |
| `civil`           | Stare civilă            | Civil ceremony          |
| `save-the-date`   | Save the date           | Save the date           |
| `proposal`        | Proposal / Logodnă      | Proposal / Engagement   |
| `trash-the-dress` | Trash the dress         | Trash the dress         |

### 2. **Other Events** (`other-events`)
| SubCategory ID    | Romanian Label          | English Label           |
|-------------------|-------------------------|-------------------------|
| `baptism`         | Botez                   | Baptism                 |
| `coming-of-age`   | Majorat                 | Coming of age           |
| `anniversary`     | Aniversare              | Anniversary             |

> **Note:** Legacy `category: "baptisms"` maps to `other-events` → `baptism`

### 3. **Portrait & Personal Sessions** (`portrait-personal`)
| SubCategory ID     | Romanian Label          | English Label           |
|--------------------|-------------------------|-------------------------|
| `portrait`         | Portret                 | Portrait                |
| `couple`           | Cuplu                   | Couple                  |
| `family`           | Familie                 | Family                  |
| `baby`             | Baby                    | Baby                    |
| `themed-sessions`  | Ședințe tematice        | Themed sessions         |

> **Note:** Legacy `category: "portraits"` maps to `portrait-personal` → `portrait`

### 4. **Corporate & Business** (`corporate-business`)
| SubCategory ID      | Romanian Label          | English Label               |
|---------------------|-------------------------|-----------------------------|
| `portraits-teams`   | Portrete & Echipe       | Corporate portraits & teams |
| `business-branding` | Business Branding       | Business branding           |
| `corporate-events`  | Evenimente Corporate    | Corporate events            |

> **Note:** Legacy `category: "corporate"` maps to `corporate-business` → `portraits-teams`

### 5. **Real Estate & Architecture** (`real-estate-architecture`)
| SubCategory ID   | Romanian Label          | English Label           |
|------------------|-------------------------|-------------------------|
| `real-estate`    | Imobiliar               | Real estate             |
| `architectural`  | Arhitectural            | Architectural           |
| `virtual-tours`  | Tururi virtuale 360     | 360 virtual tours       |
| `aerial`         | Imagini aeriene         | Aerial imagery          |

> **Note:** Legacy `category: "architecture"` maps to `real-estate-architecture` → `architectural`

---

## Gallery Item Schema

Every item in `gallery.json` must follow this structure:

### Required Fields

| Field       | Type     | Description                                                    |
|-------------|----------|----------------------------------------------------------------|
| `id`        | string   | Unique identifier (e.g., `wed-01`, `bap-02`)                   |
| `type`      | string   | Media type: `"image"`, `"video"`, or `"embed"`                 |
| `alt`       | object   | Bilingual alt text: `{ "ro": "...", "en": "..." }`             |
| `category`  | string   | Legacy category: `weddings`, `baptisms`, `portraits`, `corporate`, `architecture` |

### Optional Fields

| Field         | Type     | Description                                                              |
|---------------|----------|--------------------------------------------------------------------------|
| `subCategory` | string   | Fine-grained subcategory ID (see tables above)                           |
| `aspectRatio` | string   | Display ratio: `"landscape"`, `"portrait"`, or `"square"` (default: landscape) |
| `thumbnail`   | string   | Thumbnail filename for videos/embeds (in `gallery-assets/`)             |

### Type-Specific Fields

#### For `type: "image"` or `type: "video"`
| Field      | Type   | Description                              |
|------------|--------|------------------------------------------|
| `filename` | string | File name in `public/gallery-assets/`    |

#### For `type: "embed"`
| Field      | Type   | Description                                               |
|------------|--------|-----------------------------------------------------------|
| `provider` | string | Embed provider: `"youtube"`, `"vimeo"`, or `"other"`      |
| `videoId`  | string | Video ID for YouTube/Vimeo (extracted from URL)           |
| `embedUrl` | string | Full embed URL (only for `provider: "other"`)             |

---

## Item Types

### 1. Image
Local image file from `gallery-assets/` (using organized folder structure):
```json
{
  "id": "wed-01",
  "type": "image",
  "filename": "weddings/wedding/DSC03303.jpg",
  "alt": { "ro": "Ceremonie de nuntă", "en": "Wedding ceremony" },
  "category": "weddings",
  "subCategory": "wedding",
  "aspectRatio": "landscape"
}
```

### 2. Video (Local)
Local video file with thumbnail (using organized folder structure):
```json
{
  "id": "wed-03",
  "type": "video",
  "filename": "weddings/wedding/timelapse.mp4",
  "thumbnail": "weddings/wedding/timelapse-thumb.jpg",
  "alt": { "ro": "Film de nuntă", "en": "Wedding film" },
  "category": "weddings",
  "subCategory": "wedding",
  "aspectRatio": "landscape"
}
```

### 3. Embed (YouTube)
YouTube video by ID:
```json
{
  "id": "wed-04",
  "type": "embed",
  "provider": "youtube",
  "videoId": "eeAXriTPutk",
  "alt": { "ro": "Video de nuntă", "en": "Wedding video" },
  "category": "weddings",
  "subCategory": "wedding",
  "aspectRatio": "landscape"
}
```

> **YouTube ID:** From `https://www.youtube.com/watch?v=eeAXriTPutk` → `videoId: "eeAXriTPutk"`

### 4. Embed (Vimeo)
Vimeo video by ID:
```json
{
  "id": "bap-02",
  "type": "embed",
  "provider": "vimeo",
  "videoId": "76979871",
  "thumbnail": "portfolio-event-video-thumb.jpg",
  "alt": { "ro": "Video botez", "en": "Baptism video" },
  "category": "baptisms",
  "subCategory": "baptism",
  "aspectRatio": "landscape"
}
```

> **Vimeo ID:** From `https://vimeo.com/76979871` → `videoId: "76979871"`

---

## Examples

### Adding a New Wedding Photo

1. Upload image to `public/gallery-assets/weddings/wedding/my-wedding-photo.jpg`
2. Add entry to `public/gallery.json`:

```json
{
  "id": "wed-new-01",
  "type": "image",
  "filename": "weddings/wedding/my-wedding-photo.jpg",
  "alt": { "ro": "Fotografie de nuntă nouă", "en": "New wedding photo" },
  "category": "weddings",
  "subCategory": "wedding",
  "aspectRatio": "landscape"
}
```

### Adding a YouTube Video to Corporate Events

```json
{
  "id": "corp-vid-01",
  "type": "embed",
  "provider": "youtube",
  "videoId": "dQw4w9WgXcQ",
  "alt": { "ro": "Eveniment corporate video", "en": "Corporate event video" },
  "category": "corporate",
  "subCategory": "corporate-events",
  "aspectRatio": "landscape"
}
```

### Adding an Aerial Drone Video

1. Upload video to `public/gallery-assets/architecture/aerial/drone-flight.mp4`
2. Upload thumbnail to `public/gallery-assets/architecture/aerial/drone-thumb.jpg`
3. Add entry:

```json
{
  "id": "aerial-vid-01",
  "type": "video",
  "filename": "architecture/aerial/drone-flight.mp4",
  "thumbnail": "architecture/aerial/drone-thumb.jpg",
  "alt": { "ro": "Filmare cu drona", "en": "Drone footage" },
  "category": "architecture",
  "subCategory": "aerial",
  "aspectRatio": "landscape"
}
```

---

## Quick Add Checklist

- [ ] Upload media file(s) to `public/gallery-assets/`
- [ ] Choose a unique `id` (format: `category-prefix-number`, e.g., `wed-05`)
- [ ] Set correct `type`: `image`, `video`, or `embed`
- [ ] Add bilingual `alt` text (Romanian + English)
- [ ] Set `category` from legacy values: `weddings`, `baptisms`, `portraits`, `corporate`, `architecture`
- [ ] Add `subCategory` for precise filtering
- [ ] Set `aspectRatio`: `landscape`, `portrait`, or `square`
- [ ] For videos: add `thumbnail` filename
- [ ] For embeds: set `provider` and `videoId`

---

## Legacy Category Mapping

If `subCategory` is omitted, the system defaults based on `category`:

| category       | → groupId                 | → subCategoryId    |
|----------------|---------------------------|--------------------|
| `weddings`     | `weddings`                | `wedding`          |
| `baptisms`     | `other-events`            | `baptism`          |
| `portraits`    | `portrait-personal`       | `portrait`         |
| `corporate`    | `corporate-business`      | `portraits-teams`  |
| `architecture` | `real-estate-architecture`| `architectural`    |

---

*Last updated: 2026-01-24*
