import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { getPageMeta } from './pageMeta'

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
