import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL } from './site-config.mjs'
import { routes } from './routes.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')
const { render } = await import(path.join(ssrDir, 'entry-server.js'))

// The 404 page has no real route to prerender from — render it via the SPA catch-all instead.
const prerenderUrls = [...routes.map((route) => route.path), '/__not-found']

for (const url of prerenderUrls) {
  const { appHtml, title, description, path: metaPath, noindex } = render(url)
  const canonicalUrl = `${SITE_URL}${metaPath}`

  const metaTags = `
    <link rel="canonical" href="${canonicalUrl}" />
    <meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow'}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta name="twitter:card" content="summary" />
  </head>`

  const html = template
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace('</head>', metaTags)

  const outPath = url === '/' ? path.join(distDir, 'index.html') : url === '/__not-found' ? path.join(distDir, '404.html') : path.join(distDir, url.slice(1), 'index.html')
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, html)
}

fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`Prerendered ${prerenderUrls.length} route(s).`)
