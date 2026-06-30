# Commander Realms

Static reference site for thematic Commander formats — decks, rules, and local Planechase.

> **Note:** The GitHub repository may still be named `mtg-tematico` until renamed. The site `base` path is configured for `command-realms`.

## Local development

Requires [Node.js](https://nodejs.org/) 18+.

```bash
npm install
npm run dev
```

Open in the browser: **http://localhost:4321/command-realms/**

### Other commands

```bash
npm run build
npm run preview
```

## Brand assets

| File | Usage |
|------|-------|
| `public/images/branding/icon-source.png` | **Source** — emblem artwork for processing |
| `public/images/branding/icon.png` | Site emblem (header, intro card; generated) |
| `public/favicon.png` | Browser tab icon |

After replacing the source logo, run:

```bash
npm run process:logo
```

**Important:** Export logos as PNG with a real alpha channel, or on a **solid black** background. Avoid “fake transparency” checkerboard patterns — they are baked into the image and look broken on the dark site.

**Palette:** Navy `#0F172A` · Purple `#5B3E96` · Teal `#1F8A8A` · Gold `#D4A64A` · Cream `#F3E9D2`

## Project layout

- `src/pages/` — site pages
- `src/content/themes/` — one Markdown file per theme
- `src/lib/site.ts` — site name and brand constants
- `spec.md` — project specification

## Language convention

| Layer | Language |
|-------|----------|
| Folders, files, code, docs | English |
| Site UI and theme content | Portuguese (PT-BR) |
