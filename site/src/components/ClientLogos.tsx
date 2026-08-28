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

// Finder/Explorer duplicates ("logo-x copy.svg", "logo-x copy 2.svg") collapse to
// the original so the same brand never repeats back-to-back on the strip.
function baseKey(path: string): string {
  return fileKey(path).replace(/ copy( \d+)?$/, '')
}

function toAlt(key: string): string {
  if (altOverrides[key]) return altOverrides[key]
  const name = key.replace(/^logo-/, '').replace(/-/g, ' ')
  return name.charAt(0).toUpperCase() + name.slice(1)
}

// De-duped by base name and sorted so the order is predictable — the first
// entries are what sits in view before the strip starts scrolling.
const logos: LogoEntry[] = [
  ...new Map(
    Object.entries(logoModules)
      .sort(([a], [b]) => {
        const ka = baseKey(a)
        const kb = baseKey(b)
        return ka !== kb ? ka.localeCompare(kb) : a.length - b.length
      })
      .map(([path, src]) => [baseKey(path), { src, alt: toAlt(baseKey(path)) }] as const),
  ).values(),
]

function LogoSlot({ logo }: { logo: LogoEntry }) {
  return (
    <div className="logo-marquee__slot flex items-center justify-center h-full px-24">
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        decoding="async"
        className="max-h-100 w-auto max-w-full object-contain"
      />
    </div>
  )
}

function LogoGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="logo-marquee__group flex h-full" aria-hidden={duplicate || undefined}>
      {logos.map((logo, i) => (
        <LogoSlot key={`${duplicate ? 'b' : 'a'}-${i}`} logo={logo} />
      ))}
    </div>
  )
}

const cornerPlacement: Record<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right', string> = {
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0 -scale-x-100',
  'bottom-left': 'bottom-0 left-0 -scale-x-100 rotate-180',
  'bottom-right': 'bottom-0 right-0 rotate-180',
}

function CornerBracket({ position }: { position: keyof typeof cornerPlacement }) {
  return (
    <svg viewBox="0 0 40 40" className={`absolute w-40 h-40 text-black z-10 ${cornerPlacement[position]}`}>
      <path d="M2,20 a18,18 0 0,1 18,-18 h18" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  )
}

type ClientLogosProps = {
  className?: string
}

function ClientLogos({ className = '' }: ClientLogosProps) {
  return (
    <div className={`logo-marquee relative h-160 overflow-hidden ${className}`}>
      <CornerBracket position="top-left" />
      <CornerBracket position="top-right" />
      <CornerBracket position="bottom-left" />
      <CornerBracket position="bottom-right" />
      <div className="logo-marquee__track h-full items-center">
        <LogoGroup />
        <LogoGroup duplicate />
      </div>
    </div>
  )
}

export default ClientLogos
