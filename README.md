# Movie Explorer

An editorial, cinematic movie exploration web application built with **React 18**, **Material-UI v5 (MUI)**, **React Router v6**, and **Axios**, powered by the **TMDb v3 API**.

---

## Table of Contents
1. [Overview & Visual Identity](#overview--visual-identity)
2. [Diagnostic & Bug Fixes](#diagnostic--bug-fixes)
3. [Environment Configuration & Important Notices](#environment-configuration--important-notices)
4. [Local Setup & Installation](#local-setup--installation)
5. [Key Features & Architecture](#key-features--architecture)
   - [Startup Health Check & Automatic Retry](#startup-health-check--automatic-retry)
   - [Genre Pills & Multi-Select Discover](#genre-pills--multi-select-discover)
   - [Hero Banner & Horizontal Trending Row](#hero-banner--horizontal-trending-row)
   - [Infinite Scroll vs Load More](#infinite-scroll--vs-load-more)
   - [LocalStorage Persistence](#localstorage-persistence)
6. [Design System](#design-system)
7. [Deployment](#deployment)
   - [GitLab Remote Setup](#gitlab-remote-setup)
   - [Vercel Deployment](#vercel-deployment)
   - [Netlify Deployment](#netlify-deployment)
8. [End-to-End Manual Testing Checklist](#end-to-end-manual-testing-checklist)

---

## Overview & Visual Identity

**Movie Explorer** departs from generic dashboard tropes in favor of an **editorial, poster-first, cinema-inspired aesthetic**:
- **Primary Dark Theme**: Warm, near-black neutrals (`#0E0E0F`, `#17171A`), crisp hairline borders, and a single warm amber accent (`#E0A526`).
- **Warm Light Theme**: Off-white paper background (`#F6F4EF`, `#EFECE5`), warm text tones (`#141416`), and rich ochre accents.
- **Typography**: Editorial serif headings via **Instrument Serif** paired with functional **DM Sans** for metadata and UI elements.
- **Poster Focus**: 2:3 aspect ratio movie cards, 4px minimal radius, corner rating tags, and subtle hover animations without drop shadows.

---

## Diagnostic & Bug Fixes

### Root Cause Analysis of "No Movies / Genres Load":
1. **Empty API Key in Environment**:
   `REACT_APP_TMDB_API_KEY` was empty by default in `.env`. Outgoing requests were submitted with `api_key=""`, triggering HTTP 401 Unauthorized errors from TMDb.
2. **CRA Environment Variable Injection Timing**:
   Create React App injects `REACT_APP_*` environment variables only at process initialization. If a key is added while the server is running, the app cannot access it until the server is restarted.
3. **Swallowed Trending Errors**:
   Previous logic caught trending fetch failures in `console.warn` without setting visible error state, causing the hero and trending rows to remain blank.
4. **Genre Multi-Select and Discovery**:
   Genre lists were previously not mapped to individual movie cards and discover queries did not join genre IDs with pipe (`|`) OR semantics.

### How These Were Resolved:
- Added startup pre-check in `src/api/tmdb.js` validating `REACT_APP_TMDB_API_KEY`. Missing keys now show an explicit top banner and console notice.
- Added a 10s request timeout, 1 automatic retry on network errors, and a startup health check calling `/configuration`.
- Implemented horizontally scrollable multi-select genre pills connected to `/discover/movie` with pipe (`|`) formatting.
- Added `getGenreNames` helper to map `genre_ids` to human-readable names on every `MovieCard`.

---

## Environment Configuration & Important Notices

> [!WARNING]
> **Dev Server Restart Required After Editing `.env`:**
> In Create React App, environment variables are bundled during build/start time. If you create or update your `.env` file, you **MUST restart the dev server** (`Ctrl+C` then `npm start`) for the changes to take effect.

> [!IMPORTANT]
> **Vercel Redeployment Notice:**
> When deploying to Vercel, adding environment variables in the project settings does **not** automatically update existing deployments. You must trigger a new deployment or push a new commit after adding variables in the Vercel Dashboard.

> [!NOTE]
> **ISP Blocking of TMDb:**
> Some Internet Service Providers (ISPs) in certain regions block `api.themoviedb.org` or `image.tmdb.org`. If the startup health check surfaces `"Can't reach TMDb. Check your connection or try another network"`, verify whether your connection or DNS blocks TMDb, or switch to an alternate network / VPN.

### Sample `.env`:
```env
# TMDb API v3 Key (from https://www.themoviedb.org/settings/api)
REACT_APP_TMDB_API_KEY=your_actual_tmdb_api_key

# Mock Demo Authentication
REACT_APP_DEMO_USER=demo
REACT_APP_DEMO_PASS=password123
```

---

## Local Setup & Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Configure environment variables**:
   Create `.env` using `.env.example` as a template and insert your TMDb key:
   ```bash
   cp .env.example .env
   ```
3. **Start the application**:
   ```bash
   npm start
   ```
   Navigate to [http://localhost:3000](http://localhost:3000).
4. **Run automated test suites**:
   ```bash
   npm test -- --watchAll=false
   ```
5. **Create production build**:
   ```bash
   npm run build
   ```

---

## Key Features & Architecture

### Startup Health Check & Automatic Retry
On app initialization, `checkConfiguration()` requests `/configuration`. If TMDb is blocked by an ISP or the network is offline, a prominent banner appears:
`"Can't reach TMDb. Check your connection or try another network."`
All axios requests feature a 10s timeout and automatically retry once on network interruption.

### Genre Pills & Multi-Select Discover
- Genres are retrieved once via `/genre/movie/list` and stored in `MovieContext`.
- Rendered on the Home screen as a horizontally scrollable row of pills with an "All" toggle.
- When genres are selected, `/discover/movie` is called with `with_genres` separated by pipes (`|` for OR logic).
- Secondary filters (Release Year, Minimum Rating slider) seamlessly combine with genre filters.
- `MovieCard` components display up to 2 genre names mapped directly from `genre_ids`.

### Hero Banner & Horizontal Trending Row
- The #1 weekly trending film is featured as a full-bleed hero banner with a dark scrim, title in `Instrument Serif`, synopsis, and quick actions ("View details" / "Save").
- Below the hero, weekly trending movies are rendered in a horizontal scroll-snap row of posters.

### Infinite Scroll vs Load More
- Powered by `IntersectionObserver` via `useInfiniteScroll`.
- Features an on-screen switch to toggle between automatic infinite scrolling and a manual "Load More" button.
- Enforces terminal page limits and deduplicates entries by movie ID.

### LocalStorage Persistence
All browser storage reads and writes are wrapped in `try/catch`:
- **Auth Session**: Maintains login state across page reloads.
- **Saved Collection (Favorites)**: Maintains saved movies list.
- **Theme**: Preserves dark/light preference across visits.
- **Last Query**: Restores previous search query on return to the Home page.

---

## Design System

| Attribute | Dark Mode (Default) | Light Mode |
|---|---|---|
| Background Default | `#0E0E0F` | `#F6F4EF` |
| Surface / Paper | `#17171A` | `#EFECE5` |
| Primary Accent | `#E0A526` (Warm Amber) | `#C48B1C` (Deep Ochre) |
| Text Primary | `#F2F1ED` | `#141416` |
| Text Secondary | `#9E9CA3` | `#636166` |
| Border / Divider | `rgba(255, 255, 255, 0.08)` | `rgba(0, 0, 0, 0.08)` |
| Heading Typography | *Instrument Serif* | *Instrument Serif* |
| Body / UI Typography | *DM Sans* | *DM Sans* |

---

## Deployment

### GitLab Remote Setup
```bash
git init
git add .
git commit -m "feat: complete Movie Explorer editorial redesign"
git remote add origin https://gitlab.com/<username>/movie-explorer.git
git branch -M main
git push -u origin main
```

### Vercel Deployment
1. Import the repository in [Vercel](https://vercel.com/).
2. Add environment variables: `REACT_APP_TMDB_API_KEY`, `REACT_APP_DEMO_USER`, `REACT_APP_DEMO_PASS`.
3. SPA deep routes are supported by `vercel.json` rewrites.
4. Deploy and verify.

### Netlify Deployment
1. Import repository in [Netlify](https://netlify.com/).
2. Build command: `npm run build`, Publish directory: `build`.
3. Add environment variables in site configuration.
4. SPA deep routes are supported by `public/_redirects`.
5. Deploy and verify.

---

## End-to-End Manual Testing Checklist

- [ ] **Login**: Sign in with `demo` / `password123`.
- [ ] **Invalid Login**: Enter wrong credentials and verify validation error alert.
- [ ] **Hero & Trending**: Verify #1 trending movie renders in full-bleed hero banner and remaining trending movies render in horizontal scroll-snap row.
- [ ] **Genre Pills**: Click individual genre pills (Action, Drama, etc.); verify active discovery results update with pipe OR logic.
- [ ] **All Pill**: Click "All" to clear specific genre selections.
- [ ] **Year & Rating Filter**: Select release year and move min rating slider; verify discover results refetch.
- [ ] **Search**: Enter title in search bar; verify 500ms debounce and responsive grid results.
- [ ] **Infinite Scroll**: Scroll to bottom; verify subsequent pages load automatically.
- [ ] **Load More Toggle**: Switch toggle to manual mode; verify "Load more titles" button appears and loads next page.
- [ ] **MovieCard**: Hover over card on desktop to verify subtle scale and favorite heart appearance; verify genre names appear under title.
- [ ] **Movie Details**: Click card to open `/movie/:id`; verify scrim hero backdrop, overlapping poster, metadata line, outlined chips, cast scroll, and trailer iframe.
- [ ] **Trailer**: Play YouTube trailer via `youtube-nocookie.com`.
- [ ] **Favorites Toggle & Persistence**: Save movie, open `/favorites`, verify movie appears; reload browser to verify persistence.
- [ ] **Theme Switcher**: Click sun/moon icon; verify instant switch between dark and warm paper light mode and persistence on reload.
- [ ] **Missing API Key Banner**: Clear `REACT_APP_TMDB_API_KEY` and restart server; verify explicit warning banner is rendered.
- [ ] **Offline Banner**: Disconnect network or enable offline in DevTools; verify error banner with Retry action.
