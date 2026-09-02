// Single source of truth for prerendering (prerender.mjs) and the sitemap
// (sitemap.mjs). Keep in sync with the routes registered in src/AppRoutes.tsx
// and the per-route metadata in src/pageMeta.ts.
export const routes = [
  { path: '/' },
  { path: '/services' },
  { path: '/objects' },
  { path: '/prices' },
  { path: '/privacy' },
  { path: '/consent' },
  { path: '/ui-kit', noindex: true },
]
