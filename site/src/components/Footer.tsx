import { Link } from 'react-router-dom'

import { FOUNDING_YEAR } from '../config'

const siteLinks = [
  { label: 'Услуги', to: '/services' },
  { label: 'Объекты', to: '/objects' },
  { label: 'Цены', to: '/prices' },
]

function Footer() {
  const currentYear = new Date().getFullYear()
  const copyrightYears =
    currentYear > FOUNDING_YEAR ? `${FOUNDING_YEAR}-${currentYear}` : `${FOUNDING_YEAR}`

  return (
    <footer className="bg-submenu px-16 md:px-20 pt-20 mt-60 md:mt-100 text-black">
      <div className="flex flex-row items-center justify-between gap-10 pb-20">
        <span className="text-3xl">Юни-С</span>
        <a
          href="tel:+79650808808"
          className="flex items-center gap-5 border no-underline cursor-pointer rounded-md bg-menu border-menu text-black hover:bg-notification hover:border-notification hover:text-white px-12 py-4 min-h-34"
        >
          Позвонить директору
        </a>
      </div>

      <hr className="p-0 m-0 h-0 border-t border-black" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-20 py-30 md:py-40">
        <div className="flex flex-col gap-10">
          <span className="text-xs-wide uppercase tracking-wider text-pigeon">Сайт</span>
          <nav className="flex flex-col gap-8">
            {siteLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-base-wide no-underline hover:text-pigeon">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-10">
          <span className="text-xs-wide uppercase tracking-wider text-pigeon">Контакты</span>
          <div className="flex flex-col gap-8">
            <a href="mailto:info@unis-tech.ru" className="text-base-wide no-underline hover:text-pigeon">
              info@unis-tech.ru
            </a>
            <a
              href="https://vk.com/unistech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-wide no-underline hover:text-pigeon"
            >
              Сообщество в VK
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <span className="text-xs-wide uppercase tracking-wider text-pigeon">Реквизиты</span>
          <div className="flex flex-col gap-8 text-base-wide">
            <span>ООО «Юни-С»</span>
            <span>ИНН 7811631793</span>
          </div>
        </div>
      </div>

      <hr className="p-0 m-0 h-0 border-t border-black" />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 py-20 text-xs-wide text-pigeon">
        <p>
          © {copyrightYears} Uni-S. Все права защищены,{' '}
          <Link to="/privacy" className="underline hover:text-black">
            Политика конфиденциальности
          </Link>
          ,{' '}
          <Link to="/consent" className="underline hover:text-black">
            Согласие на обработку персональных данных
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
