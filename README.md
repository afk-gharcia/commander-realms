# Commander Realms

Static site for thematic Commander tables — realm lore, deck lists, table rules, and a local Planechase picker.

**Live site:** [afk-gharcia.github.io/commander-realms](https://afk-gharcia.github.io/commander-realms/)

## Stack

- [Astro](https://astro.build/) 5 — static output
- Content in `src/content/themes/*.md` (frontmatter drives the UI)
- Card art via [Scryfall](https://scryfall.com) image URLs
- Deployed with GitHub Actions → GitHub Pages

## Local development

Requires [Node.js](https://nodejs.org/) 18+.

```bash
npm install
npm run dev
```

Open **http://localhost:4321/commander-realms/** (the `base` path matches production).

```bash
npm run build    # output to dist/
npm run preview  # serve the production build locally
```

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml` automatically.

One-time setup in the repo on GitHub:

1. **Settings → Pages → Build and deployment → Source:** GitHub Actions
2. Wait for the workflow to finish under **Actions**

The site URL must match `base` in `astro.config.mjs` (`/commander-realms/`).

## Adding a realm

1. Create `src/content/themes/your-realm-slug.md` (copy `marvel-civil-war.md` as a template).
2. Add assets under `public/images/themes/`, `public/images/table-rules/`, and `public/images/planechase/` as needed.
3. Set `status: active` so it appears on the home page.
4. Optional: add `public/images/themes/your-realm-slug/icon-source.png` and run `npm run process:logo` to regenerate `icon.png`.

Realm pages are served at `/commander-realms/themes/{slug}/`.

## Project layout

```
src/
  components/     # UI (banner, intro, decks, planechase picker, …)
  content/themes/ # One markdown file per realm (all page data in frontmatter)
  layouts/        # Base HTML shell
  lib/            # Scryfall helpers, site constants
  pages/          # index + themes/[slug]
  styles/         # global.css
public/images/    # Banners, icons, custom cards, plane art
scripts/          # Asset tooling (logo processing)
```

## Brand assets

| File | Usage |
|------|--------|
| `public/images/branding/icon-source.png` | Source artwork for the site emblem |
| `public/images/branding/icon.png` | Header emblem (generated) |
| `public/favicon.png` | Browser tab icon |
| `public/images/themes/{slug}/icon-source.png` | Optional per-realm icon source |
| `public/images/themes/{slug}/banner.png` | Realm banner (1280×300) |

After updating a source logo:

```bash
npm run process:logo
```

Requires Python 3 and Pillow (`pip install pillow`). Export PNGs with real transparency or on a solid black background — checkerboard “fake alpha” will look broken on the dark theme.

**Palette:** Navy `#0F172A` · Purple `#5B3E96` · Teal `#1F8A8A` · Gold `#D4A64A` · Cream `#F3E9D2`

## Language

| Layer | Language |
|-------|----------|
| Code, folders, docs | English |
| Site UI and realm content | Portuguese (PT-BR) |
