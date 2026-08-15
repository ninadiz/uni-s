import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const submenuLinkClasses = "pl-10 md:pl-20 pr-10 md:pr-20 [&_a]:flex [&_a]:items-center [&_a]:justify-center [&_a]:no-underline [&_a]:whitespace-nowrap [&_a]:border [&_a]:border-currentColor [&_a]:rounded-md [&_a:hover]:bg-notification [&_a:hover]:border-notification [&_a]:pb-1 [&_a]:h-34 [&_a]:px-12 [&_a]:font-light [&_a]:transition-(--menuItem-properties) [&_a]:duration-300 [&_a]:ease-in-out [&_li.current-item>a]:bg-black [&_li.current-item>a]:text-white [&_li.current-item>a]:border-black"

function Header() {
  const { pathname } = useLocation()
  const isActive = (to: string) => pathname === to
  const isHomeSection = ['/', '/hilti-repair', '/hilti-supply'].includes(pathname)
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
    <nav className="flex justify-between items-start turn-off-feature-soft">
    <ul className="headerNavigation flex flex-wrap sm:flex-nowrap gap-5 grow [&>li>a]:transition-all [&>li>a]:h-34 lg:[&>li>a]:h-59 [&>li>a]:px-12 lg:[&>li>a]:px-20 [&>li>a]:text-base-wide lg:[&>li>a]:text-3xl [&>li>a]:font-light [&>li>a:hover]:rounded-2xl [&_a]:flex [&_a]:items-center [&_a]:justify-center [&_a]:no-underline [&_a]:whitespace-nowrap [&_a]:border [&_a]:border-currentColor [&_a]:rounded-md [&_a:hover]:bg-notification [&_a:hover]:border-notification [&_a]:pb-1 [&_a]:transition-(--menuItem-properties) [&_a]:duration-300 [&_a]:ease-in-out [&_li.current-parent-item>a]:bg-black [&_li.current-parent-item>a]:text-white [&_li.current-parent-item>a]:rounded-2xl [&_li.current-parent-item>a]:border-black pb-40 lg:pb-45">
    <li className={isHomeSection ? 'current-parent-item' : ''}>
    <Link
      to="/"
      data-discover="true"
      className={isActive('/') ? 'pointer-events-none' : undefined}
      aria-current={isActive('/') ? 'page' : undefined}
      aria-disabled={isActive('/') || undefined}
      tabIndex={isActive('/') ? -1 : undefined}
    >
    Юни-С
    </Link>
    </li>
    <li className={`hidden md:flex ${isActive('/services') ? 'current-parent-item' : ''}`}>
    <Link
      to="/services"
      data-discover="true"
      className={isActive('/services') ? 'pointer-events-none' : undefined}
      aria-current={isActive('/services') ? 'page' : undefined}
      aria-disabled={isActive('/services') || undefined}
      tabIndex={isActive('/services') ? -1 : undefined}
    >Услуги</Link>
    </li>
    <li className={`hidden md:flex ${isActive('/objects') ? 'current-parent-item' : ''}`}>
    <Link
      to="/objects"
      data-discover="true"
      className={isActive('/objects') ? 'pointer-events-none' : undefined}
      aria-current={isActive('/objects') ? 'page' : undefined}
      aria-disabled={isActive('/objects') || undefined}
      tabIndex={isActive('/objects') ? -1 : undefined}
    >Объекты</Link>
    </li>
    <li className={`hidden md:flex ${isActive('/prices') ? 'current-parent-item' : ''}`}>
    <Link
      to="/prices"
      data-discover="true"
      className={isActive('/prices') ? 'pointer-events-none' : undefined}
      aria-current={isActive('/prices') ? 'page' : undefined}
      aria-disabled={isActive('/prices') || undefined}
      tabIndex={isActive('/prices') ? -1 : undefined}
    >Цены</Link>
    </li>
    <li className={`hidden md:flex ${isActive('/ui-kit') ? 'current-parent-item' : ''}`}>
    <Link
      to="/ui-kit"
      data-discover="true"
      className={isActive('/ui-kit') ? 'pointer-events-none' : undefined}
      aria-current={isActive('/ui-kit') ? 'page' : undefined}
      aria-disabled={isActive('/ui-kit') || undefined}
      tabIndex={isActive('/ui-kit') ? -1 : undefined}
    >UI-kit</Link>
    </li>
    </ul>
    <div className="headerToolbar flex items-center gap-12 h-34">
    <a href="tel:+79650808808" className="flex items-center gap-5 border no-underline cursor-pointer rounded-md bg-shop border-shop text-black hover:bg-notification hover:border-notification px-12 py-4 min-h-34">Позвонить директору</a>
    </div>
    </nav>
    <div className="submenus absolute left-0 top-42 lg:top-69 w-full sm:w-auto">
    <ul className={`${isHomeSection ? 'flex' : 'hidden'} flex-nowrap items-center gap-5 w-full sm:w-auto overflow-x-auto ${submenuLinkClasses}`}>
    <li className={isActive('/') ? 'current-item' : ''}>
    <Link
      to="/"
      data-discover="true"
      className={isActive('/') ? 'pointer-events-none' : undefined}
      aria-current={isActive('/') ? 'page' : undefined}
      aria-disabled={isActive('/') || undefined}
      tabIndex={isActive('/') ? -1 : undefined}
    >Алмазная резка</Link>
    </li>
    <li className="">
    <a href="index.html" data-discover="true">Комплексный демонтаж</a>
    </li>
    <li className={isActive('/hilti-repair') ? 'current-item' : ''}>
    <Link
      to="/hilti-repair"
      data-discover="true"
      className={isActive('/hilti-repair') ? 'pointer-events-none' : undefined}
      aria-current={isActive('/hilti-repair') ? 'page' : undefined}
      aria-disabled={isActive('/hilti-repair') || undefined}
      tabIndex={isActive('/hilti-repair') ? -1 : undefined}
    >Ремонт оборудования HILTI</Link>
    </li>
    <li className={isActive('/hilti-supply') ? 'current-item' : ''}>
    <Link
      to="/hilti-supply"
      data-discover="true"
      className={isActive('/hilti-supply') ? 'pointer-events-none' : undefined}
      aria-current={isActive('/hilti-supply') ? 'page' : undefined}
      aria-disabled={isActive('/hilti-supply') || undefined}
      tabIndex={isActive('/hilti-supply') ? -1 : undefined}
    >Поставки продукции HILTI</Link>
    </li>
    </ul>
    <ul className={`${isActive('/objects') ? 'flex' : 'hidden'} flex-nowrap items-center gap-5 w-full sm:w-auto overflow-x-auto ${submenuLinkClasses}`}>
    </ul>
    <ul className={`${isActive('/prices') ? 'flex' : 'hidden'} flex-nowrap items-center gap-5 w-full sm:w-auto overflow-x-auto ${submenuLinkClasses}`}>
    <li className="">
    <a href="https://displaay.net/help/contact" data-discover="true">Contact</a>
    </li>
    <li className="">
    <a href="https://displaay.net/help/faq" data-discover="true">FAQ</a>
    </li>
    <li className="">
    <a href="https://displaay.net/help/licenses" data-discover="true">License</a>
    </li>
    <li className="">
    <a href="https://displaay.net/help/discounts" data-discover="true">Discounts</a>
    </li>
    </ul>
    <ul className={`${isActive('/ui-kit') ? 'flex' : 'hidden'} flex-nowrap items-center gap-5 w-full sm:w-auto overflow-x-auto ${submenuLinkClasses}`}>
    <li className="">
    <a href="https://displaay.net/about" data-discover="true">Profile</a>
    </li>
    <li className="">
    <a href="https://displaay.net/about" data-discover="true">Studio</a>
    </li>
    <li className="">
    <a href="https://displaay.net/about" data-discover="true">Team</a>
    </li>
    <li className="">
    <a href="https://displaay.net/about" data-discover="true">Clients</a>
    </li>
    <li className="">
    <a href="https://displaay.net/about" data-discover="true">Services</a>
    </li>
    <li className="">
    <a href="https://displaay.net/about" data-discover="true">Join</a>
    </li>
    <li className="">
    <a href="https://displaay.net/newsletter" data-discover="true">Newsletter</a>
    </li>
    </ul>
    </div>
    </div>
    </header>
  )
}

export default Header
