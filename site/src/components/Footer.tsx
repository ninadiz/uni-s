import { Link } from 'react-router-dom'

const siteLinks = [
  { label: 'Услуги', to: '/services' },
  { label: 'Объекты', to: '/objects' },
  { label: 'Цены', to: '/prices' },
]

function Footer() {
  return (
    <footer className="bg-submenu px-10 md:px-20 pt-20 mt-60 md:mt-100 text-black">
      <div className="flex flex-row items-center justify-between gap-10 pb-20">
        <span className="text-3xl">Юни-С</span>
        <a
          href="tel:+79650808808"
          className="flex items-center gap-5 border no-underline cursor-pointer rounded-md bg-black border-black text-white hover:bg-notification hover:border-notification hover:text-black px-12 py-4 min-h-34"
        >
          Позвонить директору
        </a>
      </div>

      <hr className="p-0 m-0 h-0 border-t border-black" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-20 py-30 sm:py-40">
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

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-10 py-20 text-xs-wide text-pigeon">
        <p>
          © 2014-2026 Uni-S. Все права защищены,{' '}
          <a href="#" className="underline hover:text-black">
            Политика конфиденциальности
          </a>
          ,{' '}
          <a href="#" className="underline hover:text-black">
            Согласие на обработку персональных данных
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
