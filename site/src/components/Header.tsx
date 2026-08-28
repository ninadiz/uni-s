import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Услуги', to: '/services' },
  { label: 'Объекты', to: '/objects' },
  { label: 'Цены', to: '/prices' },
]

const navLinkClasses =
  'flex items-center justify-center no-underline whitespace-nowrap border rounded-md pb-1 h-40 md:h-34 lg:h-59 px-12 lg:px-20 text-base-wide lg:text-3xl font-light transition-all duration-300 ease-in-out hover:bg-notification hover:border-notification hover:text-white hover:rounded-2xl'
const navLinkActiveClasses = 'bg-black text-white border-black rounded-2xl pointer-events-none'

const submenuLinkClasses =
  'flex items-center justify-center no-underline whitespace-nowrap border rounded-md pb-1 h-40 md:h-34 px-12 font-light transition-all duration-300 ease-in-out hover:bg-notification hover:border-notification hover:text-white'
const submenuLinkActiveClasses = 'bg-black text-white border-black pointer-events-none'
const submenuListClasses = 'flex-nowrap items-center gap-5 w-full sm:w-auto overflow-x-auto pl-16 md:pl-20 pr-16 md:pr-20'

const iconButtonClasses =
  'flex md:hidden items-center justify-center h-40 w-40 shrink-0 border rounded-md transition-all duration-300 ease-in-out hover:bg-notification hover:border-notification hover:text-white'

const mobileNavLinkClasses =
  'flex items-center justify-between no-underline border rounded-md px-16 h-56 text-3xl font-light transition-colors hover:bg-notification hover:border-notification hover:text-white'
const mobileNavLinkActiveClasses = 'bg-black text-white border-black pointer-events-none'
const mobileSubLinkClasses =
  'flex items-center no-underline border rounded-md px-16 h-44 text-base-wide font-light transition-colors hover:bg-notification hover:border-notification hover:text-white'

function activeLinkProps(active: boolean) {
  return active ? { 'aria-current': 'page' as const, 'aria-disabled': true, tabIndex: -1 } : {}
}

function Header() {
  const { pathname } = useLocation()
  const isActive = (to: string) => pathname === to
  const isHomeSection = pathname === '/'
  const headerRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

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

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <header
      ref={headerRef}
      className="w-full z-40 sticky top-0 left-0 bg-menu pt-15 md:pt-13 pb-12 md:pb-24 overflow-visible md:overflow-hidden transition-all"
    >
      <div className="inner relative px-16 md:px-20 mx-auto w-full max-w-[5120px]">
        <nav className="flex justify-between items-start gap-10">
          <ul
            className={`headerNavigation flex flex-wrap sm:flex-nowrap gap-5 grow ${
              isHomeSection ? 'pb-40 lg:pb-45' : ''
            }`}
          >
            <li>
              <Link to="/" className={`${navLinkClasses} ${isActive('/') ? navLinkActiveClasses : ''}`} {...activeLinkProps(isActive('/'))}>
                Юни-С
              </Link>
            </li>
            {navItems.map((item) => (
              <li key={item.to} className="hidden md:flex">
                <Link
                  to={item.to}
                  className={`${navLinkClasses} ${isActive(item.to) ? navLinkActiveClasses : ''}`}
                  {...activeLinkProps(isActive(item.to))}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="headerToolbar flex items-center gap-8 md:gap-12 shrink-0">
            <a
              href="tel:+79650808808"
              className="flex items-center gap-5 border no-underline cursor-pointer rounded-md bg-shop border-shop text-white hover:bg-notification hover:border-notification px-12 h-40 md:h-34"
            >
              <span className="md:hidden">Позвонить</span>
              <span className="hidden md:inline">Позвонить директору</span>
            </a>
            <button
              type="button"
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className={iconButtonClasses}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </nav>

        <div className="submenus absolute left-0 top-42 lg:top-69 w-full sm:w-auto hidden md:block">
          <ul className={`${isHomeSection ? 'flex' : 'hidden'} ${submenuListClasses}`}>
            <li>
              <Link
                to="/"
                className={`${submenuLinkClasses} ${isActive('/') ? submenuLinkActiveClasses : ''}`}
                {...activeLinkProps(isActive('/'))}
              >
                Алмазная резка
              </Link>
            </li>
            <li>
              <a href="https://service.unis-tech.ru" target="_blank" rel="noopener noreferrer" className={submenuLinkClasses}>
                Ремонт оборудования HILTI ↗
              </a>
            </li>
            <li>
              <a href="https://service.unis-tech.ru" target="_blank" rel="noopener noreferrer" className={submenuLinkClasses}>
                Поставки продукции HILTI ↗
              </a>
            </li>
          </ul>
          <ul className={`${isActive('/objects') ? 'flex' : 'hidden'} ${submenuListClasses}`} />
          <ul className={`${isActive('/prices') ? 'flex' : 'hidden'} ${submenuListClasses}`} />
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-menu flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center gap-10 px-16 pt-15 pb-12">
            <Link to="/" className={`${navLinkClasses} ${isActive('/') ? navLinkActiveClasses : ''}`} {...activeLinkProps(isActive('/'))}>
              Юни-С
            </Link>
            <button
              type="button"
              aria-label="Закрыть меню"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center h-40 w-40 shrink-0 border rounded-md transition-colors hover:bg-notification hover:border-notification hover:text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-8 px-16 mt-10">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`${mobileNavLinkClasses} ${isActive(item.to) ? mobileNavLinkActiveClasses : ''}`}
                {...activeLinkProps(isActive(item.to))}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-8 px-16 mt-30">
            <span className="text-xs-wide uppercase tracking-wider text-pigeon px-16">Сервис HILTI</span>
            <a
              href="https://service.unis-tech.ru"
              target="_blank"
              rel="noopener noreferrer"
              className={mobileSubLinkClasses}
            >
              Ремонт оборудования HILTI ↗
            </a>
            <a
              href="https://service.unis-tech.ru"
              target="_blank"
              rel="noopener noreferrer"
              className={mobileSubLinkClasses}
            >
              Поставки продукции HILTI ↗
            </a>
          </div>

          <a
            href="tel:+79650808808"
            className="flex items-center justify-center gap-5 border no-underline rounded-md bg-shop border-shop text-white hover:bg-notification hover:border-notification mt-auto m-10 px-12 h-56"
          >
            Позвонить директору
          </a>
        </div>
      )}
    </header>
  )
}

export default Header
