import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Light scroll-reveal: fades `.reveal` elements up as they enter the viewport.
 * Only elements below the fold when this runs get the hidden state, so content
 * already on screen never flashes. Honors prefers-reduced-motion and degrades
 * to "everything visible" whenever anything is off: no JS, no
 * IntersectionObserver, a degenerate viewport, or an observer that never
 * fires (a safety timeout promotes anything still pending). The CSS never
 * hides `.reveal` on its own.
 */
function ScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const viewportHeight = window.innerHeight
    // Degenerate viewport (e.g. a detached/zero-height render context): skip the
    // effect entirely so nothing gets hidden.
    if (!viewportHeight || viewportHeight < 240) return

    const reveal = (el: Element) => el.setAttribute('data-reveal', 'shown')

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          reveal(entry.target)
          obs.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )

    const fold = viewportHeight * 0.95
    const pending: Element[] = []
    for (const el of document.querySelectorAll<HTMLElement>('.reveal')) {
      if (el.getBoundingClientRect().top <= fold) continue
      el.setAttribute('data-reveal', 'pending')
      observer.observe(el)
      pending.push(el)
    }

    // Safety net: if the observer never reports (unusual embedding, throttled
    // background tab that never scrolls), make sure the content still appears.
    const failsafe = window.setTimeout(() => {
      for (const el of pending) {
        if (el.getAttribute('data-reveal') === 'pending') reveal(el)
      }
    }, 2000)

    return () => {
      observer.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [pathname])

  return null
}

export default ScrollReveal
