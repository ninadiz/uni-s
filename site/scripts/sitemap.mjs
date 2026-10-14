import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL } from './site-config.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const manifestPath = path.join(distDir, '.routes-manifest.json')

// Written by prerender.mjs — includes both the static routes and the
// dynamic /objects/:slug ones, so this script doesn't need to re-derive them.
const allRoutes = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
const publicRoutes = allRoutes.filter((route) => !route.noindex)

// Real content date: last commit touching the route's sources. Not the build
// date — search engines and AI crawlers stop trusting lastmod that always moves.
// Omitted when git isn't available (e.g. building from an exported tarball).
function lastModified(sources) {
  if (!sources?.length) return null
  try {
    const date = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...sources], { cwd: root, encoding: 'utf-8' })
    return date.trim() || null
  } catch {
    return null
  }
}

const urls = publicRoutes
  .map((route) => {
    const lastmod = lastModified(route.sources)
    return `  <url><loc>${SITE_URL}${route.path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`
  })
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml)
fs.rmSync(manifestPath)
console.log(`Wrote sitemap.xml with ${publicRoutes.length} url(s).`)
