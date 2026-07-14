import { useEffect, useRef } from 'react'

type CursorState = 'default' | 'hover' | 'text'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, label, summary'
const TEXT_SELECTOR = 'p, h1, h2, h3, h4, h5, h6, li'

function getCursorState(el: Element | null): CursorState {
  if (!el) return 'default'
  if (el.closest(INTERACTIVE_SELECTOR)) return 'hover'
  if (el.closest(TEXT_SELECTOR)) return 'text'
  return 'default'
}

function isOnDarkSurface(el: Element | null): boolean {
  let node: Element | null = el
  while (node) {
    const bg = getComputedStyle(node).backgroundColor
    const match = bg.match(/^rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)$/)
    if (match) {
      const alpha = match[4] === undefined ? 1 : Number(match[4])
      if (alpha > 0.5) {
        const [r, g, b] = [match[1], match[2], match[3]].map(Number)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        return luminance < 0.5
      }
    }
    node = node.parentElement
  }
  return false
}

function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let frame: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
      dot.classList.add('is-visible')
      ring.classList.add('is-visible')
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = `${Math.round(ringX)}px`
      ring.style.top = `${Math.round(ringY)}px`
      frame = requestAnimationFrame(tick)
    }

    const applyState = (target: Element | null) => {
      const state = getCursorState(target)
      const dark = state === 'hover' && isOnDarkSurface(target)
      dot.classList.toggle('is-hovered', state === 'hover')
      ring.classList.toggle('is-hovered', state === 'hover')
      dot.classList.toggle('is-text', state === 'text')
      ring.classList.toggle('is-text', state === 'text')
      dot.classList.toggle('is-dark', dark)
      ring.classList.toggle('is-dark', dark)
    }

    const handleMouseOver = (e: MouseEvent) => {
      applyState(e.target as Element)
    }

    const handleMouseLeaveWindow = () => {
      dot.classList.remove('is-visible')
      ring.classList.remove('is-visible')
      ring.classList.remove('is-clicking')
    }

    const handleMouseDown = () => {
      ring.classList.add('is-clicking')
    }

    const handleMouseUp = () => {
      ring.classList.remove('is-clicking')
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeaveWindow)
    document.addEventListener('mousedown', handleMouseDown, { passive: true })
    document.addEventListener('mouseup', handleMouseUp, { passive: true })
    frame = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="cursor-wrapper">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  )
}

export default Cursor
