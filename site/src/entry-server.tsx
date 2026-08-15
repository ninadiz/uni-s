import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { getPageMeta } from './pageMeta'
import { objects } from './lib/objects'

// Read by scripts/prerender.mjs (plain Node, can't use import.meta.glob
// itself) to know which /objects/:slug pages to prerender.
export const objectSlugs = objects.map((object) => object.slug)

export function render(url: string) {
  const appHtml = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )

  return { appHtml, ...getPageMeta(url) }
}
