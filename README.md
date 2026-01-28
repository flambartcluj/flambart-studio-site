# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## Gallery Management

The gallery is fully data-driven via `public/gallery.json`. Media files are stored in `public/gallery-assets/`.

### Category Structure

The gallery uses a 2-level hierarchical category system with top-level groups and subcategories.

#### Top-Level Groups & Subcategories

| Group | Group ID | Subcategories |
|-------|----------|---------------|
| **NUNȚI / WEDDINGS** | `weddings` | `wedding`, `civil`, `save-the-date`, `proposal`, `trash-the-dress` |
| **ALTE EVENIMENTE / OTHER EVENTS** | `other-events` | `baptism`, `coming-of-age`, `anniversary` |
| **PORTRET & ȘEDINȚE PERSONALE / PORTRAIT & PERSONAL SESSIONS** | `portrait-personal` | `portrait`, `couple`, `family`, `baby`, `themed-sessions` |
| **CORPORATE & BUSINESS** | `corporate-business` | `portraits-teams`, `business-branding`, `corporate-events` |
| **IMOBILIAR & ARHITECTURĂ / REAL ESTATE & ARCHITECTURE** | `real-estate-architecture` | `real-estate`, `architectural`, `virtual-tours`, `aerial` |

#### Subcategory Reference (RO / EN)

**Nunți / Weddings:**
- `wedding` - Nuntă / Wedding
- `civil` - Stare civilă / Civil ceremony
- `save-the-date` - Save the date / Save the date
- `proposal` - Proposal / Logodnă / Proposal / Engagement
- `trash-the-dress` - Trash the dress / Trash the dress

**Alte Evenimente / Other Events:**
- `baptism` - Botez / Baptism
- `coming-of-age` - Majorat / Coming of age
- `anniversary` - Aniversare / Anniversary

**Portret & Ședințe Personale / Portrait & Personal Sessions:**
- `portrait` - Portret / Portrait
- `couple` - Cuplu / Couple
- `family` - Familie / Family
- `baby` - Baby / Baby
- `themed-sessions` - Ședințe tematice / Themed sessions

**Corporate & Business:**
- `portraits-teams` - Portrete & Echipe / Corporate portraits & teams
- `business-branding` - Business Branding / Business branding
- `corporate-events` - Evenimente Corporate / Corporate events

**Imobiliar & Arhitectură / Real Estate & Architecture:**
- `real-estate` - Imobiliar / Real estate
- `architectural` - Arhitectural / Architectural
- `virtual-tours` - Tururi virtuale 360 / 360 virtual tours
- `aerial` - Imagini aeriene / Aerial imagery

---

### Gallery Configuration

The gallery supports global configuration options via the `config` object at the root of `gallery.json`:

```json
{
  "config": {
    "showAltTextOverlay": false
  },
  "items": [...]
}
```

#### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `showAltTextOverlay` | `boolean` | `false` | Controls whether alt text is displayed as a visual overlay on thumbnails and in the lightbox. When `false`, alt text is still applied to the `alt` attribute for SEO and accessibility, but hidden visually. Set to `true` to show captions on hover and in the lightbox. |

**Note:** This setting applies consistently across all gallery views (homepage featured section, portfolio page masonry grid, mobile views, and lightbox captions).

---

### Adding Gallery Items

#### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier for the item |
| `type` | `"image"` \| `"video"` \| `"embed"` | Media type |
| `alt` | `{ "ro": "...", "en": "..." }` | Bilingual description |
| `category` | string | Legacy category: `weddings`, `baptisms`, `portraits`, `corporate`, `architecture` |

#### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `subCategory` | string | Fine-grained subcategory ID (see table above) |
| `aspectRatio` | `"landscape"` \| `"portrait"` \| `"square"` | Display aspect ratio |
| `thumbnail` | string | Poster image filename for videos/embeds |
| `filename` | string | File name in `gallery-assets/` (for image/video types) |
| `provider` | `"youtube"` \| `"vimeo"` \| `"other"` | Embed provider (for embed type) |
| `videoId` | string | Platform-specific video ID (for YouTube/Vimeo) |
| `embedUrl` | string | Full embed URL (for other providers) |

---

### Examples

#### Adding an Image

```json
{
  "id": "wed-01",
  "type": "image",
  "filename": "wedding-ceremony.jpg",
  "alt": { "ro": "Ceremonie de nuntă", "en": "Wedding ceremony" },
  "category": "weddings",
  "subCategory": "wedding",
  "aspectRatio": "landscape"
}
```

#### Adding a Local Video

```json
{
  "id": "wed-video-01",
  "type": "video",
  "filename": "wedding-highlights.mp4",
  "thumbnail": "wedding-video-thumb.jpg",
  "alt": { "ro": "Film de nuntă", "en": "Wedding film" },
  "category": "weddings",
  "subCategory": "wedding",
  "aspectRatio": "landscape"
}
```

#### Adding a YouTube Embed

```json
{
  "id": "wed-yt-01",
  "type": "embed",
  "provider": "youtube",
  "videoId": "dQw4w9WgXcQ",
  "alt": { "ro": "Video nuntă YouTube", "en": "Wedding video YouTube" },
  "category": "weddings",
  "subCategory": "wedding",
  "aspectRatio": "landscape"
}
```

The `videoId` is the part after `v=` in a YouTube URL (e.g., `youtube.com/watch?v=dQw4w9WgXcQ`).

#### Adding a Vimeo Embed

```json
{
  "id": "bap-vimeo-01",
  "type": "embed",
  "provider": "vimeo",
  "videoId": "76979871",
  "thumbnail": "baptism-thumb.jpg",
  "alt": { "ro": "Video botez Vimeo", "en": "Baptism video Vimeo" },
  "category": "baptisms",
  "subCategory": "baptism",
  "aspectRatio": "landscape"
}
```

The `videoId` is the numeric ID from the Vimeo URL (e.g., `vimeo.com/76979871`).

#### Adding Other Embeds

```json
{
  "id": "tour-01",
  "type": "embed",
  "provider": "other",
  "embedUrl": "https://example.com/embed/virtual-tour",
  "thumbnail": "tour-thumb.jpg",
  "alt": { "ro": "Tur virtual 360", "en": "360 virtual tour" },
  "category": "architecture",
  "subCategory": "virtual-tours",
  "aspectRatio": "landscape"
}
```

---

### Backward Compatibility

Items without a `subCategory` field will be automatically mapped:

| `category` value | Maps to Group | Default Subcategory |
|------------------|---------------|---------------------|
| `weddings` | Nunți / Weddings | `wedding` |
| `baptisms` | Alte Evenimente / Other Events | `baptism` |
| `portraits` | Portret & Ședințe Personale | `portrait` |
| `corporate` | Corporate & Business | `portraits-teams` |
| `architecture` | Imobiliar & Arhitectură | `architectural` |
