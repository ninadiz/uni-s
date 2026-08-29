import type { CSSProperties } from 'react'

type LogoEntry = { src: string; alt: string }

const logoModules = import.meta.glob<string>('../assets/client-logos/*.svg', {
  eager: true,
  import: 'default',
  query: '?url',
})

// Nice display names for known brands; anything else falls back to the file name.
const altOverrides: Record<string, string> = {
  'logo-trest': 'Трест',
  'logo-glorax': 'Glorax',
  'logo-lsr': 'ЛСР',
  'logo-ustluga': 'Усть-Луга',
  'logo-nord-stream': 'Nord Stream',
}

function fileKey(path: string): string {
  return (path.split('/').at(-1) ?? path).replace(/\.svg$/, '')
}

// Finder/Explorer duplicates are named "logo-x copy.svg" / "logo-x copy 2.svg";
// strip that suffix to recover the brand name for the alt text.
function baseKey(path: string): string {
  return fileKey(path).replace(/ copy( \d+)?$/, '')
}

function isCopy(path: string): boolean {
  return / copy( \d+)?$/.test(fileKey(path))
}

function toAlt(key: string): string {
  if (altOverrides[key]) return altOverrides[key]
  const name = key.replace(/^logo-/, '').replace(/-/g, ' ')
  return name.charAt(0).toUpperCase() + name.slice(1)
}

// Every file in the folder is shown, duplicates included. Originals come first
// in brand order, then the copies in the same order, so identical logos never
// land back-to-back.
const logos: LogoEntry[] = Object.entries(logoModules)
  .sort(([a], [b]) => {
    const copyDelta = Number(isCopy(a)) - Number(isCopy(b))
    return copyDelta !== 0 ? copyDelta : baseKey(a).localeCompare(baseKey(b))
  })
  .map(([path, src]) => ({ src, alt: toAlt(baseKey(path)) }))

function LogoSlot({ logo }: { logo: LogoEntry }) {
  return (
    <div className="logo-marquee__slot flex items-center justify-center h-full px-40">
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        decoding="async"
        className="max-h-70 md:max-h-100 w-auto max-w-160 md:max-w-220 object-contain"
      />
    </div>
  )
}

function LogoCycle({ hidden, prefix }: { hidden: boolean; prefix: string }) {
  return (
    <div className="logo-marquee__cycle flex h-full" aria-hidden={hidden || undefined}>
      {logos.map((logo, i) => (
        <LogoSlot key={`${prefix}-${i}`} logo={logo} />
      ))}
    </div>
  )
}

// The track is REPEAT identical halves; the animation scrolls it left by one
// half and loops. As long as one half is wider than the viewport the loop is
// seamless, so REPEAT is set high enough to cover ultra-wide monitors with the
// fixed-width logo list. Scroll speed stays constant because the animation
// duration scales with REPEAT (see --logo-marquee-repeat in index.css).
const REPEAT = 3

type ClientLogosProps = {
  className?: string
}

function ClientLogos({ className = '' }: ClientLogosProps) {
  return (
    <div
      className={`logo-marquee relative h-160 overflow-hidden ${className}`}
      style={{ '--logo-marquee-repeat': REPEAT } as CSSProperties}
    >
      <div className="logo-marquee__viewport h-full overflow-hidden">
        <div className="logo-marquee__track h-full items-center">
          {Array.from({ length: REPEAT * 2 }, (_, i) => (
            <LogoCycle key={i} prefix={`c${i}`} hidden={i !== 0} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ClientLogos
