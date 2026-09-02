import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Юни-С', to: '/' },
  { label: 'Услуги', to: '/services' },
  { label: 'Объекты', to: '/objects' },
  { label: 'Цены', to: '/prices' },
]

// Home-only second row. `to` renders a router Link (and can be the active item),
// `href` renders an external link.
const homeSubmenu: { label: string; to?: string; href?: string }[] = [
  { label: 'Алмазная резка', to: '/' },
  { label: 'Ремонт оборудования HILTI ↗', href: 'https://service.unis-tech.ru' },
  { label: 'Поставки продукции HILTI ↗', href: 'https://service.unis-tech.ru' },
]

const navLinkClasses =
  'flex items-center justify-center no-underline whitespace-nowrap border rounded-md pb-1 h-34 px-12 text-base-wide font-light transition-all duration-300 ease-in-out hover:bg-notification hover:border-notification hover:text-white hover:rounded-2xl'
// lg blows the nav buttons up to full size; dropped once the header goes compact.
const navLinkLgClasses = 'lg:h-59 lg:px-20 lg:text-3xl'
const navLinkActiveClasses = 'bg-black text-white border-black rounded-2xl pointer-events-none'

const submenuLinkClasses =
  'flex items-center justify-center no-underline whitespace-nowrap border rounded-md pb-1 h-34 px-12 font-light transition-all duration-300 ease-in-out hover:bg-notification hover:border-notification hover:text-white'
const submenuLinkActiveClasses = 'bg-black text-white border-black pointer-events-none'

// Desktop-only: below md the call action lives in the floating FloatingCall
// button pinned to the bottom of the screen.
const callButtonClasses =
  'hidden md:flex shrink-0 items-center justify-center gap-5 border no-underline cursor-pointer rounded-md bg-shop border-shop text-white hover:bg-notification hover:border-notification h-34 px-12'

function activeLinkProps(active: boolean) {
  return active ? { 'aria-current': 'page' as const, 'aria-disabled': true, tabIndex: -1 } : {}
}

function Header() {
  const { pathname } = useLocation()
  const isActive = (to: string) => pathname === to
  const isHomeSection = pathname === '/'
  const headerRef = useRef<HTMLElement>(null)
  const [hidden, setHidden] = useState(false)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    const setHeight = () => {
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`)
    }
    setHeight()
    const observer = new ResizeObserver(setHeight)
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  // Scroll-driven header states, both scoped by media queries / lg-only classes
  // so the mobile header is untouched:
  //   - compact (lg): past 0.8 viewports the nav buttons drop to their md size.
  //   - hidden (md/lg): pinned for the first 1.6 viewports, then hides on
  //     scroll-down / reappears on scroll-up. The transform lives in index.css
  //     behind a `min-width: 768px` media query.
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const vh = window.innerHeight
      setCompact(y > vh * 0.8)
      if (y <= vh * 1.6) {
        setHidden(false)
      } else if (y > lastY + 4) {
        setHidden(true)
      } else if (y < lastY - 4) {
        setHidden(false)
      }
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const navLinkClass = (to: string) =>
    `${navLinkClasses} ${compact ? '' : navLinkLgClasses} ${isActive(to) ? navLinkActiveClasses : ''}`

  return (
    <header
      ref={headerRef}
      data-hidden={hidden ? 'true' : 'false'}
      data-compact={compact ? 'true' : 'false'}
      className="siteHeader w-full z-40 sticky top-0 left-0 bg-menu pt-13 pb-10 md:pb-24 overflow-visible md:overflow-hidden"
    >
      <div className="inner relative px-0 md:px-20 mx-auto w-full max-w-[5120px]">
        <nav className="flex justify-between items-start gap-10">
          {/* pb reserves the row the absolutely-positioned submenu sits in (home only) */}
          <ul
            className={`headerNavigation flex flex-nowrap gap-5 grow min-w-0 overflow-x-auto px-20 md:px-0 ${
              isHomeSection ? (compact ? 'pb-40' : 'pb-40 lg:pb-45') : ''
            }`}
          >
            {navLinks.map(({ label, to }) => (
              <li key={to} className="shrink-0">
                <Link to={to} className={navLinkClass(to)} {...activeLinkProps(isActive(to))}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <a href="tel:+79650808808" aria-label="Позвонить директору" className={callButtonClasses}>
            Позвонить директору
          </a>
        </nav>

        {isHomeSection && (
          <ul
            className={`submenus absolute left-0 flex flex-nowrap items-center gap-5 w-full md:w-auto overflow-x-auto pl-20 pr-20 transition-[top] duration-300 ease-in-out ${
              compact ? 'top-42' : 'top-42 lg:top-69'
            }`}
          >
            {homeSubmenu.map((item) => (
              <li key={item.label}>
                {item.to ? (
                  <Link
                    to={item.to}
                    className={`${submenuLinkClasses} ${isActive(item.to) ? submenuLinkActiveClasses : ''}`}
                    {...activeLinkProps(isActive(item.to))}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={submenuLinkClasses}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  )
}

export default Header
