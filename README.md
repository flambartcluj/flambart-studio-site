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

The gallery is fully data-driven via `public/gallery.json`. To add new items:

### Adding an Image

1. Upload the image file to `public/gallery-assets/`
2. Add an entry to `public/gallery.json`:

```json
{
  "id": "unique-id",
  "type": "image",
  "filename": "your-image.jpg",
  "alt": { "ro": "Descriere română", "en": "English description" },
  "category": "weddings",
  "aspectRatio": "landscape"
}
```

### Adding a Local Video

1. Upload the video file (`.mp4` or `.webm`) to `public/gallery-assets/`
2. Optionally upload a thumbnail image
3. Add an entry:

```json
{
  "id": "unique-id",
  "type": "video",
  "filename": "your-video.mp4",
  "thumbnail": "video-thumbnail.jpg",
  "alt": { "ro": "Descriere română", "en": "English description" },
  "category": "weddings",
  "aspectRatio": "landscape"
}
```

### Adding a YouTube Embed

```json
{
  "id": "unique-id",
  "type": "embed",
  "provider": "youtube",
  "videoId": "dQw4w9WgXcQ",
  "alt": { "ro": "Descriere română", "en": "English description" },
  "category": "weddings",
  "aspectRatio": "landscape"
}
```

The `videoId` is the part after `v=` in a YouTube URL (e.g., `youtube.com/watch?v=dQw4w9WgXcQ`).

### Adding a Vimeo Embed

```json
{
  "id": "unique-id",
  "type": "embed",
  "provider": "vimeo",
  "videoId": "76979871",
  "thumbnail": "optional-thumbnail.jpg",
  "alt": { "ro": "Descriere română", "en": "English description" },
  "category": "baptisms",
  "aspectRatio": "landscape"
}
```

The `videoId` is the numeric ID from the Vimeo URL (e.g., `vimeo.com/76979871`).

### Adding Other Embeds

For other video providers, use the `embedUrl` field:

```json
{
  "id": "unique-id",
  "type": "embed",
  "provider": "other",
  "embedUrl": "https://example.com/embed/video",
  "thumbnail": "thumbnail.jpg",
  "alt": { "ro": "Descriere română", "en": "English description" },
  "category": "corporate",
  "aspectRatio": "landscape"
}
```

### Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique identifier |
| `type` | Yes | `"image"`, `"video"`, or `"embed"` |
| `filename` | For image/video | File name in `gallery-assets/` |
| `provider` | For embed | `"youtube"`, `"vimeo"`, or `"other"` |
| `videoId` | For YouTube/Vimeo | Platform-specific video ID |
| `embedUrl` | For other embeds | Full embed URL |
| `thumbnail` | Optional | Poster image filename |
| `alt` | Yes | `{ "ro": "...", "en": "..." }` |
| `category` | Yes | One of: `weddings`, `baptisms`, `portraits`, `corporate`, `architecture` |
| `aspectRatio` | Optional | `"landscape"`, `"portrait"`, or `"square"` |
