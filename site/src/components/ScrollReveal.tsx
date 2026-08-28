import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Light scroll-reveal: fades `.reveal` elements up as they enter the viewport.
 * Only elements that are below the fold when this runs get the hidden state,
 * so content already on screen never flashes. Honors prefers-reduced-motion
 * and degrades to "everything visible" when JS or IntersectionObserver is
 * unavailable (the CSS never hides anything on its own).
 */
function ScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-reveal', 'shown')
          obs.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )

    const fold = window.innerHeight * 0.95
    for (const el of document.querySelectorAll<HTMLElement>('.reveal')) {
      if (el.getBoundingClientRect().top <= fold) continue
      el.setAttribute('data-reveal', 'pending')
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [pathname])

  return null
}

export default ScrollReveal
