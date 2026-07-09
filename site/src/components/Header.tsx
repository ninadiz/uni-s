import { Link, useLocation } from 'react-router-dom'

function Header() {
  const { pathname } = useLocation()
  const isActive = (to: string) => pathname === to
  const isHomeSection = ['/', '/hilti-repair', '/hilti-supply'].includes(pathname)

  return (
    <header className="w-full z-40 sticky top-0 left-0 bg-menu pt-15 md:pt-13 pb-15 overflow-auto md:overflow-hidden transition-all max-h-[100vh]">
    <div className="inner px-10 md:px-20 mx-auto w-full max-w-[5120px]">
    <nav className="flex flex-col-reverse gap-8 md:flex-row md:gap-0 justify-between items-start turn-off-feature-soft">
    <ul className="headerNavigation group hidden flex-wrap sm:flex-nowrap md:flex gap-5 relative grow [&>li>a]:transition-all [&>li>a]:h-34 lg:[&>li>a]:h-59 [&>li>a]:px-12 lg:[&>li>a]:px-20 [&>li>a]:text-base lg:[&>li>a]:text-l [&>li>a:hover]:rounded-2xl [&>li>ul_a]:h-34 [&>li>ul_a]:px-12 [&>li>ul_a]:font-light [&_a]:flex [&_a]:items-center [&_a]:justify-center [&_a]:no-underline [&_a]:whitespace-nowrap [&_a]:border [&_a]:border-currentColor [&_a]:rounded-md [&_a:hover]:bg-notification [&_a:hover]:border-notification [&_a]:pb-1 [&_a]:transition-(--menuItem-properties) [&_a]:duration-300 [&_a]:ease-in-out [&_ul]:flex [&_ul]:gap-5 [&>li>ul]:absolute [&>li>ul]:left-0 [&>li>ul]:top-42 [&>li>ul]:lg:top-69 [&_ul]:transition-opacity [&_ul]:duration-300 [&_ul]:ease-in-out [&>li>ul]:flex-wrap [&>li>ul]:w-[calc(100%_+_70px)] sm:[&>li>ul]:w-auto [&_li.current-parent-item>a]:bg-black [&_li.current-parent-item>a]:text-white [&_li.current-parent-item>a]:rounded-2xl [&_li.current-parent-item>a]:border-black [&_li.has-children.current-parent-item]:pb-40 [&_li.has-children.current-parent-item]:md:pb-0 [&>li.top-level-hovered:not(.current-parent-item)>a]:bg-notification [&>li.top-level-hovered:not(.current-parent-item)>a]:border-notification [&>li.top-level-hovered>a]:rounded-2xl [&_ul]:md:invisible [&>li.current-parent-item>ul]:md:visible [&:has(li.top-level-hovered)_li.current-parent-item:not(.top-level-hovered)>ul]:lg:invisible [&>li.top-level-hovered>ul]:lg:visible [&>li.current-parent-item:not(.top-level-hovered)_li.current-item>a]:md:bg-black [&>li.current-parent-item:not(.top-level-hovered)_li.current-item>a]:md:text-white [&>li.current-parent-item:not(.top-level-hovered)_li.current-item>a]:md:hover:border-black [&>li.current-parent-item:not(.top-level-hovered)_li.current-item>a]:md:border-black pb-0 md:pb-40 lg:pb-45">
    <li className={`has-children${isHomeSection ? ' current-parent-item' : ''}`}>
    <Link
      to="/"
      data-discover="true"
      className={isActive('/') ? 'pointer-events-none' : undefined}
      aria-current={isActive('/') ? 'page' : undefined}
      aria-disabled={isActive('/') || undefined}
      tabIndex={isActive('/') ? -1 : undefined}
    >
    <span className="hidden md:block">Unis</span>
    <span className="md:hidden">Главная</span>
    </Link>
    <ul className="visible">
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
    </li>
    <li className={isActive('/services') ? 'current-parent-item' : ''}>
    <Link
      to="/services"
      data-discover="true"
      className={isActive('/services') ? 'pointer-events-none' : undefined}
      aria-current={isActive('/services') ? 'page' : undefined}
      aria-disabled={isActive('/services') || undefined}
      tabIndex={isActive('/services') ? -1 : undefined}
    >Услуги</Link>
    <ul className="visible">
    <li className="">
    <a href="https://displaay.net/typefaces" data-discover="true">All</a>
    </li>
    <li className="">
    <a href="https://displaay.net/typefaces" data-discover="true">Sans</a>
    </li>
    <li className="">
    <a href="https://displaay.net/typefaces" data-discover="true">Serif</a>
    </li>
    <li className="">
    <a href="https://displaay.net/typefaces" data-discover="true">Other</a>
    </li>
    </ul>
    </li>
    <li className={isActive('/objects') ? 'current-parent-item' : ''}>
    <Link
      to="/objects"
      data-discover="true"
      className={isActive('/objects') ? 'pointer-events-none' : undefined}
      aria-current={isActive('/objects') ? 'page' : undefined}
      aria-disabled={isActive('/objects') || undefined}
      tabIndex={isActive('/objects') ? -1 : undefined}
    >Объекты</Link>
    <ul className="visible">
    </ul>
    </li>
    <li className={`has-children${isActive('/prices') ? ' current-parent-item' : ''}`}>
    <Link
      to="/prices"
      data-discover="true"
      className={isActive('/prices') ? 'pointer-events-none' : undefined}
      aria-current={isActive('/prices') ? 'page' : undefined}
      aria-disabled={isActive('/prices') || undefined}
      tabIndex={isActive('/prices') ? -1 : undefined}
    >Цены</Link>
    <ul className="visible">
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
    </li>
    <li className={`has-children${isActive('/ui-kit') ? ' current-parent-item' : ''}`}>
    <Link
      to="/ui-kit"
      data-discover="true"
      className={isActive('/ui-kit') ? 'pointer-events-none' : undefined}
      aria-current={isActive('/ui-kit') ? 'page' : undefined}
      aria-disabled={isActive('/ui-kit') || undefined}
      tabIndex={isActive('/ui-kit') ? -1 : undefined}
    >UI-kit</Link>
    <ul className="visible">
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
    </li>
    </ul>
    <div className="flex w-full md:w-auto items-start justify-between">
    <ul className="group flex-wrap sm:flex-nowrap gap-5 relative [&>li>a]:transition-all [&>li>a]:h-34 lg:[&>li>a]:h-59 [&>li>a]:px-12 lg:[&>li>a]:px-20 [&>li>a]:text-base lg:[&>li>a]:text-l [&>li>a:hover]:rounded-2xl [&>li>ul_a]:h-34 [&>li>ul_a]:px-12 [&>li>ul_a]:font-light [&_a]:flex [&_a]:items-center [&_a]:justify-center [&_a]:no-underline [&_a]:whitespace-nowrap [&_a]:border [&_a]:border-currentColor [&_a]:rounded-md [&_a:hover]:bg-notification [&_a:hover]:border-notification [&_a]:pb-1 [&_a]:transition-(--menuItem-properties) [&_a]:duration-300 [&_a]:ease-in-out [&_ul]:flex [&_ul]:gap-5 [&>li>ul]:absolute [&>li>ul]:left-0 [&>li>ul]:top-42 [&>li>ul]:lg:top-69 [&_ul]:transition-opacity [&_ul]:duration-300 [&_ul]:ease-in-out [&>li>ul]:flex-wrap [&>li>ul]:w-[calc(100%_+_70px)] sm:[&>li>ul]:w-auto [&_li.current-parent-item>a]:bg-black [&_li.current-parent-item>a]:text-white [&_li.current-parent-item>a]:rounded-2xl [&_li.current-parent-item>a]:border-black [&_li.has-children.current-parent-item]:pb-40 [&_li.has-children.current-parent-item]:md:pb-0 [&>li.home-item>a]:hidden [&>li_li.current-item>a]:bg-black/50 [&>li_li.current-item>a]:border-transparent [&>li_li.current-item>a]:text-white flex md:hidden grow">
    <li className="current-parent-item">
    <Link to="/" data-discover="true">Unis</Link>
    </li>
    <li className="home-item has-children current-parent-item">
    <Link to="/" data-discover="true">Главная</Link>
    <ul className="">
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
    </li>
    </ul>
    <div className="headerToolbar flex items-center gap-12 h-34">
    <a href="tel:+70000000000" className="flex items-center gap-5 border no-underline cursor-pointer rounded-md bg-shop border-shop text-black hover:bg-notification hover:border-notification px-12 py-4 min-h-34">Позвонить директору</a>
    </div>
    </div>
    </nav>
    </div>
    </header>
  )
}

export default Header
