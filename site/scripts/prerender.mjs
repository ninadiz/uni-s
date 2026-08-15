import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const routes = ['/', '/services', '/objects', '/prices', '/ui-kit']

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')
const { render } = await import(path.join(ssrDir, 'entry-server.js'))

for (const url of routes) {
  const { appHtml, title, description } = render(url)

  const html = template
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(description)}" />`)

  const outPath = url === '/' ? path.join(distDir, 'index.html') : path.join(distDir, url.slice(1), 'index.html')
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, html)
}

fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`Prerendered ${routes.length} route(s).`)
