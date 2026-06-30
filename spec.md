# Commander Realms — Project Specification

> Spec closed 2025-06-30. Reference document for v1 development.

---

## 0. Language convention

| Layer | Language | Examples |
|-------|----------|----------|
| Folders, files, code, docs | **English** | `src/content/themes/`, `tableRule`, `spec.md` |
| Site UI (labels, buttons) | **Portuguese (PT-BR)** | "Tema aleatório", "Voltar ao índice" |
| Theme content (values, Markdown body) | **Portuguese (PT-BR)** | `name: "Marvel Civil War"`, rules text |

Frontmatter **keys** are always English; **values** shown to players stay Portuguese.

---

## 1. Overview

### 1.1 What it is

A static reference site for thematic **Commander** (Magic: The Gathering) formats. Each format has its own rules, fixed thematic decks with commanders, and **local Planechase** cards (custom planes per theme, with custom art).

### 1.2 Goal

Central reference for a friend group: discover themes, read rules, view decks with Moxfield links, illustrate with official art via Scryfall, and randomize a local plane during play.

### 1.3 Key decisions

| Item | Decision |
|------|----------|
| **Product name** | **Commander Realms** |
| Hosting | GitHub Pages |
| Site type | Static (no backend, no database) |
| Site language | **PT-BR** (UI + content) |
| Code & docs language | **English** |
| Audience | Closed group — friends who play together |
| Content maintainer | Single maintainer |
| Themes at launch | **1** (Marvel Civil War); expand to 20+ |
| Stack | **Astro + TypeScript + Markdown** (YAML frontmatter) |
| Styles | **CSS custom properties** (dark mode + brand palette) |
| Timeline | ASAP |
| GitHub repo (target) | `command-realms` |
| Base URL (target) | `https://{user}.github.io/command-realms/` |

---

## 2. Audience and usage

### 2.1 Target audience

Closed friend group playing thematic Commander. Not a public site or open tournament.

### 2.2 Usage context

- **Desktop** via web browser (mobile layout discontinued)
- Consult before or during meetups (rules, decks, plane randomizer)
- Occasional **random theme** when the group doesn't want to pick manually

### 2.3 Content maintenance

Maintainer edits Markdown in the repo. Only devs run the project locally (`npm run dev`).

---

## 3. Functional scope

### 3.1 Home page (index)

**Behavior:**

- Simple list of all themes (no search/filters in v1)
- **Alphabetical** sort by theme `name`
- Each item shows **name** and **summary** (one line)
- Click goes to theme page (`/themes/{slug}`)
- **"Tema aleatório"** button: redirects to a random theme from the list
- **Archived** themes remain visible in the index (with status badge)

**Header (index):** primary logo (`logo-primary.png`) linking to home.

**Out of v1:** search, filters, categories, theme of the week, theme counter.

### 3.2 Theme page

**URL:** `/themes/{slug}` (e.g. `/themes/marvel-civil-war`)

**Required sections (in order):**

1. **Theme explanation** — free Markdown: lore, thematic rules, restrictions, bans, etc.
2. **Decks** — fixed deck list for the theme
3. **Table rule** — when the theme has always-active special card(s) (e.g. Pressão Pública); show image + full text
4. **Local Planechase** — randomizer + summary list of planes

**Rules:**

- Each theme defines its own rules in Markdown body
- Official MTG rules always override thematic rules (no separate global rules page; mention in footer or intro)

**Navigation:**

- **No** prev/next between themes
- **Header (theme page):** back-to-index button, styled with that theme's identity/colors
- No full breadcrumb in v1

**Out of v1:** last updated date, author, inter-theme navigation.

### 3.3 Decks and commanders

**Model:**

- Decks are **fixed per theme** (predefined by maintainer)
- Each deck has **100 cards**, including the commander (standard Commander)
- Support **partner, background, and dual commanders** when needed

**Fields per deck:**

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Deck identifier (team, character, etc.) |
| `commanders` | Yes | List of 1+ exact card names (Scryfall) |
| `moxfieldUrl` | Yes | Moxfield decklist URL |
| `thematicText` | No | Short flavor / context text |
| `illustrativeCards` | No | Scryfall names for extra card art beyond commander |

**Display:**

- Commander image(s) via **Scryfall API**
- Optional illustrative card images via Scryfall
- Clickable Moxfield link
- Thematic text when present

### 3.4 Local Planechase

**Model:**

- **Local planes only** (no phenomena, no official Wizards deck)
- Each theme has its own plane set

**Fields per plane:**

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Plane name |
| `effect` | Yes | Plane rules text |
| `image` | Yes | Custom art in `public/images/planechase/{slug}/` |
| `number` | No | e.g. `001/005` |
| `subtitle` | No | e.g. theme line on card |
| `flavor` | No | Flavor text |

**Randomizer:**

- **"Sortear plano"** button
- Fully **random** (may repeat same plane; no session memory in v1)
- Shows plane name, effect, and image
- Result stays until next roll

**Plane list:**

- Visible on page as **summary** (name + effect; optional thumbnail)
- Full list accessible without rolling

### 3.5 Table rule (special card)

Some themes include **table rule cards** — global mechanics **always active** during the game (unlike Planechase, which randomizes planes).

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Rule/card name |
| `subtitle` | No | e.g. "Regra de Mesa" |
| `effect` | Yes | Full rule text (Markdown) |
| `image` | Yes | Custom art in `public/images/table-rules/{slug}/` |

**Display:** dedicated section between Decks and Planechase; no randomizer.

### 3.6 Out of scope (v1)

- Login / user accounts
- Visitor deck submission
- Comments or forum
- Life/poison tracker
- Native mobile app
- Analytics
- Custom domain
- Index search/filters
- Open Graph rich link previews
- PWA / add to home screen

---

## 4. Content and data

### 4.1 Data model

Slug is derived from the filename (`marvel-civil-war.md` → `/themes/marvel-civil-war`).

```yaml
# src/content/themes/marvel-civil-war.md
---
name: "Marvel Civil War"          # PT-BR value — shown to users
summary: "One-line index blurb"
status: active                    # active | archived — both appear in index

style:                            # optional — theme header colors
  primaryColor: "#..."
  secondaryColor: "#..."

meta:
  players: 4
  powerLevel: 7
  bracket: 3
  tableType: closed

decks:
  - name: "Secret Avengers"
    commanders:
      - "Captain America, Team Leader"
    moxfieldUrl: "https://www.moxfield.com/decks/..."
    thematicText: "Optional PT-BR flavor..."
    illustrativeCards:
      - "Solitude"

tableRule:                        # optional — always-active card
  name: "Pressão Pública"
  subtitle: "Regra de Mesa"
  image: "/images/table-rules/marvel-civil-war/public-pressure.png"
  effect: |
    Full rule text in Markdown (PT-BR)...

planechase:
  - number: "001/005"
    name: "Stamford, Connecticut"
    effect: "..."
    flavor: "..."
    image: "/images/planechase/marvel-civil-war/001-stamford-connecticut.png"
---

Markdown body (PT-BR): theme explanation, rules, lore, etc.
```

**Images:**

| Type | Source | Path |
|------|--------|------|
| Commanders & illustrative cards | Scryfall API | — |
| Local plane art | Repo assets | `public/images/planechase/{slug}/` |
| Table rule art | Repo assets | `public/images/table-rules/{slug}/` |
| Site logo / assets | Created in dev | `public/images/` |

**Index sort:** alphabetical by `name`.

### 4.2 Pilot theme — Marvel Civil War

**Content file:** `src/content/themes/marvel-civil-war.md`

**Concept:** Closed 4-player table, 4 calibrated decks (PL 7, Bracket 3). Every creature must be a Marvel hero.

| Deck | Commander | Moxfield |
|------|-----------|----------|
| Secret Avengers | Captain America, Team Leader | https://www.moxfield.com/decks/f22bVROmQUCdXQP2_aeIiQ |
| Wakandan Neutrality | T'Challa, the Black Panther | https://www.moxfield.com/decks/tSVbdtdCBUah6rDouotw7A |
| Registration Act | Iron Man, Titan of Innovation | https://www.moxfield.com/decks/1i8_kMxPWUSMq1wQGB95mg |
| Mutant Resistance | Storm, Force of Nature | https://www.moxfield.com/decks/2eyCZJ1JyEu08_aW2DrPEg |

**Table rule:** Pressão Pública — public pressure points with Apoio Popular / Aprovação Oficial reward at 3 points.

**Local Planechase (5 planes):** Stamford, Ilha Ryker, Ponte do Brooklyn, Esconderijo dos Vingadores Secretos, Ruas de Nova York.

**Assets:** `public/images/planechase/marvel-civil-war/` + `public/images/table-rules/marvel-civil-war/public-pressure.png`

### 4.3 Editorial process

- New theme = new `.md` in `src/content/themes/`
- PR review optional; PR preview during development
- Theme template TBD

---

## 5. Design and UX

### 5.1 Brand identity — Commander Realms

**Assets** (`public/images/branding/`):

| File | Usage |
|------|-------|
| `logo-primary.png` | Header logo (home + theme back-nav TBD) |
| `icon.png` | Emblem, favicon source |
| `brand-guide.png` | Identity reference (not shown in UI) |
| `public/favicon.png` | Browser tab |

**Palette:**

| Name | Hex | Usage |
|------|-----|-------|
| Dark Navy | `#0F172A` | Background |
| Purple | `#5B3E96` | Accents, secondary brand |
| Teal | `#1F8A8A` | Links, tagline |
| Gold | `#D4A64A` | Primary CTA, highlights |
| Cream | `#F3E9D2` | Body text |

**Typography:**

| Role | Font |
|------|------|
| Headlines | Cinzel (serif) |
| Body | Source Sans 3 (sans-serif) |

**Tagline (EN):** *Build tables. Tell stories. Command realms.*

**Tagline (PT-BR UI):** *Monte mesas. Conte histórias. Comande reinos.*

**Symbolism (reference):** crown = leadership; portal = realms; diamond cards = strategy; stars = discovery.

### 5.2 Visual mode

- **Dark mode only** (navy base, cream text)
- Theme page header may use per-theme `style.primaryColor` / `secondaryColor` on top of brand base

### 5.3 Global layout

**Header:**

| Page | Content |
|------|---------|
| Index | Commander Realms primary logo |
| Theme | Back to index + theme title (thematic styling) |

**Footer (all pages):**

- Group **Discord** link
- **Play location** link
- **Fan content** Wizards disclaimer (PT-BR in UI)
- Scryfall credit for official card images

### 5.4 Layout

- **Desktop-only** fixed layout (~1280px); optimized for wide screens, not mobile
- Theme card grid: **4 columns** on the home page

### 5.5 Accessibility (reasonable minimum)

- Adequate dark-mode contrast
- `alt` on commander and plane images
- Keyboard access on main buttons

---

## 6. Technology and infrastructure

### 6.1 Stack

| Layer | Technology |
|-------|------------|
| Framework | Astro 5.x |
| Language | TypeScript |
| Content | Markdown + YAML frontmatter (English keys) |
| Styles | CSS + custom properties |
| Card images | Scryfall API |
| Deploy | GitHub Actions → GitHub Pages |
| PR preview | GitHub Actions (development phase) |

### 6.2 Repository and URL

| Item | Value |
|------|-------|
| Repository (target) | `command-realms` |
| URL | `https://{user}.github.io/command-realms/` |
| Current repo folder | `mtg-tematico` (rename when ready) |
| Custom domain | No (for now) |
| Production branch | `main` |

### 6.3 Folder structure

```
mtg-tematico/
├── public/
│   └── images/
│       ├── planechase/{slug}/
│       └── table-rules/{slug}/
├── src/
│   ├── content/themes/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro
│   │   └── themes/[slug].astro
│   ├── styles/global.css
│   ├── lib/
│   │   ├── themes.ts
│   │   └── scryfall.ts
│   └── content.config.ts
├── spec.md
└── README.md
```

### 6.4 Scryfall integration

- Fetch card image by exact name (`commanders`, `illustrativeCards`)
- `https://api.scryfall.com/cards/named?exact={name}`
- Graceful fallback if card not found
- Footer attribution per [Scryfall policy](https://scryfall.com/docs/api#use-of-images)

---

## 7. SEO, sharing, analytics

| Item | v1 |
|------|-----|
| `<title>` and meta description | Yes (basic) |
| Analytics | No |
| Open Graph | Not prioritized (closed group) |
| `robots.txt` / sitemap | Yes (Astro-generated) |
| Favicon | Yes |

---

## 8. Legal and attribution

| Item | Decision |
|------|----------|
| Fan content / Wizards | Footer disclaimer (PT-BR in UI) |
| Card images | Scryfall + footer credit |
| Custom plane/rule art | Group-owned; stored in `public/` |

---

## 9. Roadmap

### 9.1 v1 — MVP

- [x] Spec defined
- [x] Astro scaffold + Content Collections
- [x] Dark mode layout (header + footer)
- [x] Home page with alphabetical theme list
- [x] Random theme button
- [ ] Full theme page (Markdown, decks, table rule, Planechase)
- [ ] Marvel Civil War content wired to UI
- [ ] GitHub Pages deploy
- [ ] PR preview workflow
- [ ] Footer links (Discord, location)

### 9.2 v2+ (not committed)

- Search / filters
- Open Graph
- Session plane-roll memory
- Roll animation
- Manual theme sort order
- Export rolled plane as image
- Custom domain

---

## 10. Acceptance criteria (v1)

- [x] Home shows **Marvel Civil War** alphabetically with name and summary
- [x] **"Tema aleatório"** opens a valid theme page
- [ ] `/themes/marvel-civil-war` shows explanation, decks, Pressão Pública, Planechase
- [ ] Each deck shows commander(s), Scryfall image, Moxfield link, thematic text
- [ ] Plane randomizer returns valid plane with name, effect, image
- [ ] Plane summary list visible on theme page
- [ ] Theme page header: back + thematic styling
- [ ] Footer: Discord, location, fan content notice
- [ ] Usable on desktop (1280px+)
- [ ] Merge to `main` deploys to GitHub Pages
- [ ] PR generates navigable preview

---

## 11. Decision log

| Date | Decision |
|------|----------|
| 2025-06-30 | Full spec closed with maintainer answers |
| 2025-06-30 | Pilot theme: Marvel Civil War |
| 2025-06-30 | Table rule (Pressão Pública) added to scope |
| 2025-06-30 | Astro home page scaffolded |
| 2025-06-30 | **Rebrand to Commander Realms** — logo, icon, palette, base URL |

---

## 12. Next steps

1. ~~Spec and pilot content~~ ✓
2. ~~Astro home page~~ ✓
3. **Build full theme page** (decks, table rule, Planechase)
4. Configure deploy + PR preview
5. Validate acceptance criteria (section 10)
