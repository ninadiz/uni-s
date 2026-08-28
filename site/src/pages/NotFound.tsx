import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="bg-menu px-16 md:px-24 pt-64 pb-100 flex flex-col gap-20">
      <h1 className="text-4xl">Страница не найдена</h1>
      <p className="text-xl-wide max-w-[600px]">
        Такой страницы не существует или она была перемещена. Возможно, вам подойдёт одна из этих:
      </p>
      <nav className="flex flex-wrap gap-10 text-xl-wide underline">
        <Link to="/">Главная</Link>
        <Link to="/services">Услуги</Link>
        <Link to="/objects">Объекты</Link>
        <Link to="/prices">Цены</Link>
      </nav>
    </section>
  )
}

export default NotFound
