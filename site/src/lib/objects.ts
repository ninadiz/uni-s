import type { ObjectSlide } from '../components/ObjectCarouselCard'

export type ObjectInfo = {
  header: string
  objectName: string
  clientName: string
  description: string
  year: number
  /** Order to show this object in the "Реализованные объекты" section on the homepage. Omit to show only on /objects. */
  featured?: number
}

export type ObjectEntry = {
  slug: string
  info: ObjectInfo
  photos: string[]
}

const infoModules = import.meta.glob<{ default: ObjectInfo }>('../assets/objects/*/info.json', { eager: true })
const photoModules = import.meta.glob<{ default: string }>('../assets/objects/*/*.jpg', { eager: true })

function slugFromPath(path: string): string {
  return path.split('/').at(-2) ?? ''
}

function photoIndex(path: string): number {
  const match = /-(\d+)\.[^.]+$/.exec(path)
  return match ? Number(match[1]) : 0
}

const photosBySlug = new Map<string, string[]>()
for (const path of Object.keys(photoModules).sort((a, b) => photoIndex(a) - photoIndex(b))) {
  const slug = slugFromPath(path)
  const list = photosBySlug.get(slug) ?? []
  list.push(photoModules[path].default)
  photosBySlug.set(slug, list)
}

export const objects: ObjectEntry[] = Object.entries(infoModules)
  .map(([path, mod]) => ({
    slug: slugFromPath(path),
    info: mod.default,
    photos: photosBySlug.get(slugFromPath(path)) ?? [],
  }))
  .sort((a, b) => a.slug.localeCompare(b.slug))

export function getFeaturedObjects(): ObjectEntry[] {
  return objects
    .filter((object) => object.info.featured != null)
    .sort((a, b) => (a.info.featured ?? 0) - (b.info.featured ?? 0))
}

export function toObjectCard(object: ObjectEntry): { title: string; meta: string; slides: ObjectSlide[] } {
  const title = object.info.header || object.info.objectName || object.info.clientName || object.slug
  const meta = [object.info.clientName, object.info.year ? String(object.info.year) : ''].filter(Boolean).join(' · ')
  const slides: ObjectSlide[] =
    object.photos.length > 0
      ? object.photos.map((src, i) => ({ src, alt: `${title} — фото ${i + 1}` }))
      : [{ color: '#e3e3e3', label: 'Фото скоро' }]
  return { title, meta, slides }
}
