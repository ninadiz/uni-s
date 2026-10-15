// Single source of truth for prerendering (prerender.mjs) and the sitemap
// (sitemap.mjs). Keep in sync with the routes registered in src/AppRoutes.tsx
// and the per-route metadata in src/pageMeta.ts.
//
// `sources` — files/folders the page content comes from (relative to site/);
// sitemap.mjs takes <lastmod> from their last git commit.
export const routes = [
  { path: '/', sources: ['src/pages/Home.tsx', 'src/assets/objects'] },
  { path: '/services', sources: ['src/pages/Services.tsx', 'src/content/services.ts'] },
  { path: '/objects', sources: ['src/pages/Objects.tsx', 'src/assets/objects'] },
  { path: '/prices', sources: ['src/pages/Prices.tsx', 'src/content/prices.ts'] },
  { path: '/privacy', sources: ['src/pages/Privacy.tsx'] },
  { path: '/consent', sources: ['src/pages/Consent.tsx'] },
  { path: '/ui-kit', noindex: true },
]
