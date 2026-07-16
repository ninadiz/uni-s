import type { ReactNode } from 'react'

function IllustrationFrame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-[170px]"
      stroke="black"
      strokeWidth="1.5"
      fill="none"
    >
      {children}
    </svg>
  )
}

export function HiltiCuttingIllustration() {
  return (
    <IllustrationFrame>
      <polygon points="150,40 254.6,116 214.7,239 85.3,239 45.4,116" />
      <polygon points="232.3,102.5 232.3,197.5 150,245 67.7,197.5 67.7,102.5 150,55" />
      <circle cx="150" cy="150" r="45" />
      <line x1="232.3" y1="102.5" x2="300" y2="10" />
    </IllustrationFrame>
  )
}

export function RentalOperatorIllustration() {
  return (
    <IllustrationFrame>
      <polygon points="150,50 250,150 150,250 50,150" />
      <polygon points="150,60 228,195 72,195" />
      <circle cx="150" cy="150" r="42" />
      <line x1="72" y1="195" x2="0" y2="290" />
    </IllustrationFrame>
  )
}

export function CoreDrillingIllustration() {
  return (
    <IllustrationFrame>
      <polygon points="150,45 232.1,84.5 252.4,173.4 195.6,244.6 104.4,244.6 47.6,173.4 67.9,84.5" />
      <circle cx="150" cy="150" r="55" />
      <circle cx="150" cy="150" r="14" />
      <line x1="232.1" y1="84.5" x2="300" y2="20" />
    </IllustrationFrame>
  )
}

export function WireSawIllustration() {
  return (
    <IllustrationFrame>
      <polygon points="150,50 220.7,79.3 250,150 220.7,220.7 150,250 79.3,220.7 50,150 79.3,79.3" />
      <polygon points="150,95 205,150 150,205 95,150" />
      <circle cx="150" cy="150" r="22" />
      <line x1="220.7" y1="220.7" x2="300" y2="300" />
    </IllustrationFrame>
  )
}

export function LensIllustration() {
  return (
    <svg
      viewBox="0 0 222 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      fill="none"
    >
      <g clipPath="url(#lens-illustration-clip)">
        <path d="M111 0V200" stroke="black" vectorEffect="non-scaling-stroke" />
        <path
          d="M132 157C163.48 157 189 131.48 189 100C189 68.5198 163.48 43 132 43C100.52 43 75 68.5198 75 100C75 131.48 100.52 157 132 157Z"
          stroke="black"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M90 157C121.48 157 147 131.48 147 100C147 68.5198 121.48 43 90 43C58.5198 43 33 68.5198 33 100C33 131.48 58.5198 157 90 157Z"
          stroke="black"
          vectorEffect="non-scaling-stroke"
        />
        <path d="M1 58V14H45" stroke="black" vectorEffect="non-scaling-stroke" />
        <path d="M1 140V184H45" stroke="black" vectorEffect="non-scaling-stroke" />
        <path d="M221 58V14H177" stroke="black" vectorEffect="non-scaling-stroke" />
        <path d="M221 140V184H177" stroke="black" vectorEffect="non-scaling-stroke" />
      </g>
      <defs>
        <clipPath id="lens-illustration-clip">
          <rect width="222" height="200" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
