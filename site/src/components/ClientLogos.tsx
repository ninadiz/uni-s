import logoTrest from '../assets/client-logos/logo-trest.svg'
import logoGlorax from '../assets/client-logos/logo-glorax.svg'
import logoLsr from '../assets/client-logos/logo-lsr.svg'
import logoUstluga from '../assets/client-logos/logo-ustluga.svg'
import logoNordStream from '../assets/client-logos/logo-nord-stream.svg'

type LogoEntry = { src: string; alt: string }

const logos: LogoEntry[] = [
  { src: logoTrest, alt: 'Trest' },
  { src: logoGlorax, alt: 'Glorax' },
  { src: logoLsr, alt: 'LSR' },
  { src: logoUstluga, alt: 'Ustluga' },
  { src: logoNordStream, alt: 'Nord Stream' },
]

function LogoSlot({ logo }: { logo: LogoEntry }) {
  return (
    <div className="flex items-center justify-center h-100">
      <img src={logo.src} alt={logo.alt} className="h-100 w-auto max-w-full" />
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
    <svg viewBox="0 0 40 40" className={`absolute w-40 h-40 text-black ${cornerPlacement[position]}`}>
      <path d="M2,20 a18,18 0 0,1 18,-18 h18" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  )
}

type ClientLogosProps = {
  className?: string
}

function ClientLogos({ className = '' }: ClientLogosProps) {
  return (
    <div className={`relative h-160 flex flex-col items-center justify-center gap-24 ${className}`}>
      <CornerBracket position="top-left" />
      <CornerBracket position="top-right" />
      <CornerBracket position="bottom-left" />
      <CornerBracket position="bottom-right" />
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-15 w-full">
        {logos.map((logo, i) => (
          <LogoSlot key={i} logo={logo} />
        ))}
      </div>
    </div>
  )
}

export default ClientLogos
