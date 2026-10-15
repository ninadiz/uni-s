# CLAUDE.md

Developer notes for unis-tech.ru, the website of ООО «Юни-С» (diamond drilling, wall sawing and demolition of concrete structures in Saint Petersburg and the Leningrad region). The site is static: content lives in TypeScript modules and JSON files, there is no backend or CMS. Site copy is in Russian.

The app lives in `site/`; all commands below run from there. `Plans/` holds working notes (improvement and SEO plans) in Russian.

Content authoring guides:

- [How to add a completed object](site/src/assets/objects/README.txt)

## Tech stack

| Area | Tool |
|---|---|
| UI | React 19, TypeScript |
| Build / dev server | Vite 6 (`@vitejs/plugin-react`) |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`), theme tokens in `src/index.css` |
| Routing | React Router 7 (`BrowserRouter`) |
| Prerendering | SSR bundle (`src/entry-server.tsx`) rendered to static HTML per route by `scripts/prerender.mjs`; the client hydrates it |
| Images | `vite-imagetools` (resized JPGs and `srcset` for object photos) |
| Font | Inter Tight Variable (`@fontsource-variable/inter-tight`) |
| Lint | `oxlint` |

Tailwind's spacing unit is set to `1px` (`--spacing: 1px`), so `px-16` is 16px, not 4rem. Only three breakpoints exist: base (<768px), `md` (768–1023px) and `lg` (1024px+); `sm`, `xl` and `2xl` are removed.

## Quick start

Requires Node.js (developed on Node 24) and npm.

```bash
cd site && npm install
```

```bash
npm run dev
```

The dev server runs at http://localhost:5173; override the port with `PORT=3000 npm run dev`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with hot reload |
| `npm run build` | Type check, client build, SSR build, prerender, sitemap (see [Build](#build)) |
| `npm run preview` | Serves the production build from `dist/` |
| `npm run lint` | `oxlint` |
| `scripts/resize-object-photos.sh` | Downscales object photos to max 2000px on the longest side (macOS `sips`); run after adding photos |

## Build

`npm run build` produces the static site in `site/dist/` (git-ignored):

1. `tsc -b`: type check.
2. `vite build`: client bundle into `dist/`.
3. `vite build --ssr src/entry-server.tsx --outDir dist-ssr`: server bundle used only for prerendering.
4. `scripts/prerender.mjs`: renders every route from `scripts/routes.mjs` plus one page per object (`/objects/<slug>`) and `404.html` into its own `index.html` with the right `<title>`, meta tags and JSON-LD. Also writes `llms.txt`.
5. `scripts/sitemap.mjs`: writes `sitemap.xml`; `<lastmod>` comes from the last git commit touching each route's `sources`.

`public/.htaccess` is copied into `dist/` and makes Apache serve `404.html` with a real 404 status for unknown paths. Every real route has its own prerendered file, so no SPA fallback is needed.

## Deploy

Hosting: Hostiman (Apache), shared with other sites. Deploys are manual: build locally, then upload `site/dist/` over SSH with `rsync`. There is no CI.

| | |
|---|---|
| Host | `ruvip68.hostiman.ru` |
| SSH port | `8228` |
| User | `s277295` |
| Site folder | `~/www/unis-tech.ru` (full path `/var/www/s277295/data/www/unis-tech.ru`) |

Login is by SSH key only (`~/.ssh/id_ed25519`). Other folders in `~/www/` (`unis-hilti.ru`, `ninadiz.tech`, `project-test.h1n.ru`) are other sites: never touch them.

Release steps:

1. Everything is merged into `main` and local `main` is up to date:

   ```bash
   git checkout main && git pull --ff-only
   ```

2. Build (in `site/`):

   ```bash
   npm run build
   ```

   It should end with `Prerendered N route(s), wrote llms.txt.` and `Wrote sitemap.xml …`.

3. Dry run, from `site/`. It shows what would change and changes nothing:

   ```bash
   rsync -rlzc --delete --dry-run --itemize-changes -e "ssh -p 8228" dist/ s277295@ruvip68.hostiman.ru:www/unis-tech.ru/
   ```

   Expected: HTML pages updated, new hashed files in `assets/`, old `assets/index-*.js|css` deleted. If anything else is listed for deletion, stop and find out why.

4. Upload: the same command without `--dry-run`. Confirm with the user before running it:

   ```bash
   rsync -rlzc --delete -e "ssh -p 8228" dist/ s277295@ruvip68.hostiman.ru:www/unis-tech.ru/
   ```

5. Check https://unis-tech.ru (including on a phone) and https://unis-tech.ru/llms.txt.

Notes:

- The trailing slash in `dist/` matters: without it rsync creates a nested `dist` folder on the server.
- `--delete` removes server files that are no longer in the build, so everything the server needs must come from `dist/` (via `public/` or the build).
- `-c` compares by content, so unchanged photos are not re-uploaded.

## Project structure

```
Plans/                    Working notes: improvements plan, SEO audit (Russian)
site/
  index.html              Page template
  public/                 Copied as-is: .htaccess, robots.txt, favicon, icons
  scripts/
    routes.mjs              Route list for prerender and sitemap (keep in sync with AppRoutes.tsx)
    site-config.mjs         SITE_URL for Node scripts (keep in sync with src/config.ts)
    prerender.mjs           Post-build: static HTML per route, 404.html, llms.txt
    sitemap.mjs             Post-build: sitemap.xml
    resize-object-photos.sh Downscale object photos
  src/
    main.tsx                Entry point: hydrates prerendered HTML or renders from scratch
    App.tsx                 BrowserRouter
    AppRoutes.tsx           Routes
    entry-server.tsx        SSR entry used by prerender.mjs
    config.ts               SITE_URL, FOUNDING_YEAR
    pageMeta.ts             Per-route title, description, noindex
    structuredData.ts       JSON-LD (LocalBusiness, BreadcrumbList, Service list)
    index.css               Tailwind theme tokens and global styles
    pages/                  One component per route
    components/             Header, Footer, FloatingCall, ClientLogos, cards, legal page layout…
    content/                Single sources of copy: company, services, prices, llms.txt
    lib/objects.ts          Loads completed objects from assets/objects at build time
    assets/
      objects/<slug>/         One folder per completed object: info.json + photos
      client-logos/           Client logos for the home page marquee (every SVG is shown)
```

## Routing

Defined in `src/AppRoutes.tsx`; all routes share `Layout` (header, footer, mobile call button):

| Route | Page |
|---|---|
| `/` | `Home`: hero, client logos, services, featured objects |
| `/services` | `Services` |
| `/objects` | `Objects`: all completed objects |
| `/objects/:slug` | `ObjectDetail`: `:slug` is the folder name in `src/assets/objects/` |
| `/prices` | `Prices` |
| `/privacy` | `Privacy`: personal data policy |
| `/consent` | `Consent`: consent to personal data processing |
| `/ui-kit` | `UiKit`: internal component reference, `noindex` and closed in `robots.txt` |
| `*` | `NotFound` (prerendered as `404.html`) |

A new route must be added in three places: `src/AppRoutes.tsx`, `src/pageMeta.ts` and `scripts/routes.mjs`.

## Where content lives

| Content | Location |
|---|---|
| Company details (name, phone, email, address, hours, links) | `src/content/company.ts` |
| Services (`/services`, JSON-LD, llms.txt) | `src/content/services.ts` |
| Pricing factors (`/prices`, llms.txt) | `src/content/prices.ts` |
| Services block on the home page | `src/pages/Home.tsx` |
| Completed objects | `src/assets/objects/<slug>/info.json` + photos; `featured` sets order on the home page |
| Client logos | `src/assets/client-logos/*.svg`; display names in `src/components/ClientLogos.tsx` |
| Page titles and descriptions | `src/pageMeta.ts` |
| Legal texts | `src/pages/Privacy.tsx`, `src/pages/Consent.tsx` |
| Colors, type scale, breakpoints | `src/index.css` (`@theme`) |
| Crawler rules | `public/robots.txt` |

## Known limitations

- The phone number is hardcoded in several places besides `content/company.ts`: `Header.tsx`, `Footer.tsx`, `FloatingCall.tsx`, `pages/Prices.tsx`. Change all of them together.
- The services block on the home page has its own copy in `Home.tsx`, separate from `content/services.ts`.
- `SITE_URL` is duplicated in `src/config.ts` and `scripts/site-config.mjs`.
- The git remote is HTTPS (`https://github.com/ninadiz/uni-s`) and git has no stored credentials; push through the GitHub CLI login: `git -c credential.helper='!gh auth git-credential' push`.
