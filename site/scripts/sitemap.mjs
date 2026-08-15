import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL } from './site-config.mjs'
import { routes } from './routes.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')

const urls = routes
  .filter((route) => !route.noindex)
  .map((route) => `  <url><loc>${SITE_URL}${route.path}</loc></url>`)
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml)
console.log(`Wrote sitemap.xml with ${routes.filter((route) => !route.noindex).length} url(s).`)
