import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Услуги', to: '/services' },
  { label: 'Объекты', to: '/objects' },
  { label: 'Цены', to: '/prices' },
]

const navLinkClasses =
  'flex items-center justify-center no-underline whitespace-nowrap border rounded-md pb-1 h-34 lg:h-59 px-12 lg:px-20 text-base-wide lg:text-3xl font-light transition-all duration-300 ease-in-out hover:bg-notification hover:border-notification hover:rounded-2xl'
const navLinkActiveClasses = 'bg-black text-white border-black rounded-2xl pointer-events-none'

const submenuLinkClasses =
  'flex items-center justify-center no-underline whitespace-nowrap border rounded-md pb-1 h-34 px-12 font-light transition-all duration-300 ease-in-out hover:bg-notification hover:border-notification'
const submenuLinkActiveClasses = 'bg-black text-white border-black pointer-events-none'
const submenuListClasses = 'flex-nowrap items-center gap-5 w-full sm:w-auto overflow-x-auto pl-10 md:pl-20 pr-10 md:pr-20'

function activeLinkProps(active: boolean) {
  return active ? { 'aria-current': 'page' as const, 'aria-disabled': true, tabIndex: -1 } : {}
}

function Header() {
  const { pathname } = useLocation()
  const isActive = (to: string) => pathname === to
  const isHomeSection = pathname === '/'
  const headerRef = useRef<HTMLElement>(null)

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

  return (
    <header
      ref={headerRef}
      className="w-full z-40 sticky top-0 left-0 bg-menu pt-15 md:pt-13 pb-24 overflow-auto md:overflow-hidden transition-all max-h-[100vh]"
    >
      <div className="inner relative px-10 md:px-20 mx-auto w-full max-w-[5120px]">
        <nav className="flex justify-between items-start">
          <ul className="headerNavigation flex flex-wrap sm:flex-nowrap gap-5 grow pb-40 lg:pb-45">
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
          <div className="headerToolbar flex items-center gap-12 h-34">
            <a
              href="tel:+79650808808"
              className="flex items-center gap-5 border no-underline cursor-pointer rounded-md bg-shop border-shop text-black hover:bg-notification hover:border-notification px-12 py-4 min-h-34"
            >
              Позвонить директору
            </a>
          </div>
        </nav>

        <div className="submenus absolute left-0 top-42 lg:top-69 w-full sm:w-auto">
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
    </header>
  )
}

export default Header
