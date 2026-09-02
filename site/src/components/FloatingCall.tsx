import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Mobile-only floating "call the director" button, pinned to the bottom of the
 * screen (the header no longer carries the call action below md). Hides itself
 * while the footer is in view so it never covers the footer — which has its own
 * call button — and respects the iPhone safe area. Positioning, the slide/fade
 * transition and reduced-motion live in index.css under `.floatingCall`.
 */
function FloatingCall() {
  const { pathname } = useLocation()
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    const footer = document.querySelector('footer')
    if (!footer) return
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting))
    observer.observe(footer)
    return () => observer.disconnect()
  }, [pathname])

  return (
    <a
      href="tel:+79650808808"
      aria-label="Позвонить директору"
      data-hidden={footerVisible ? 'true' : 'false'}
      className="floatingCall md:hidden fixed left-0 right-0 mx-auto z-40 flex w-max items-center gap-8 rounded-2xl bg-shop px-20 py-12 text-base-wide text-white no-underline shadow-lg hover:bg-notification"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
      Позвонить директору
    </a>
  )
}

export default FloatingCall
