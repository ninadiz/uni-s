import { Link } from 'react-router-dom'
import ClientLogos from '../components/ClientLogos'
import ObjectCarouselCard from '../components/ObjectCarouselCard'
import ServiceCard from '../components/ServiceCard'
import { CoreDrillingIllustration, HiltiCuttingIllustration, RentalOperatorIllustration, WireSawIllustration } from '../components/ServiceIllustrations'

const services = [
  {
    title: 'Алмазная резка стенорезными машинами HILTI',
    description: 'Обеспечивает ровные края, минимум пыли и вибраций. Подходит для резки толстых стен и перекрытий.',
    illustration: <HiltiCuttingIllustration />,
  },
  {
    title: 'Аренда стенорезной машины с оператором',
    description: 'Опытный оператор быстро настроит оборудование и выполнит задачи на вашем объекте.',
    illustration: <RentalOperatorIllustration />,
  },
  {
    title: 'Алмазное бурение отверстий',
    description: 'Мокрое и сухое бурение отверстий любого диаметра под коммуникации, вентиляцию и крепёж. Работаем чисто.',
    illustration: <CoreDrillingIllustration />,
  },
  {
    title: 'Алмазная резка канатом',
    description: 'Метод для сложных резов в железобетоне или камне. Подходит для обработки конструкций больших размеров, включая колонны, фундаменты и монолитные блоки.',
    illustration: <WireSawIllustration />,
  },
]

const objectColors = ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3']

const completedObjects = [
  { title: 'Жилой комплекс «Северный»', span: 'md:col-span-4' },
  { title: 'Автомойка', span: 'md:col-span-2' },
  { title: 'Торговый центр «Плаза»', span: 'md:col-span-3' },
  { title: 'Складской комплекс', span: 'md:col-span-3' },
].map((object, index) => ({
  ...object,
  slides: [1, 2, 3].map((n) => ({ label: `Фото ${n}`, color: objectColors[index] })),
}))

function Home() {
  return (
    <>
      <section className="bg-menu px-10 md:px-20 pb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-20">
        <h1 className="max-w-full md:max-w-[62%] w-[935px] text-3xl-normal sm:text-4xl-tight">
          Алмазное сверление, резка проёмов и демонтаж сложных конструкций
        </h1>
        <div className="flex flex-row gap-5">
          <a
            className="flex items-center gap-5 border no-underline cursor-pointer bg-black border-black text-white rounded-md hover:border-notification hover:bg-notification hover:text-black px-12 py-4 min-h-34 [&_svg_path]:hover:stroke-black"
            href="https://displaay.net/trials"
            data-discover="true"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8461538461538463" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon icon-download">
              <path d="M12 1L12 18"></path>
              <path d="M3 22L21 22"></path>
              <path d="M3 9L12 18L21 9"></path>
            </svg>
            Trials
          </a>
          <button type="button" className="flex items-center gap-5 border rounded-md no-underline cursor-pointer bg-menthol border-menthol text-black hover:bg-notification hover:border-notification px-12 py-4 min-h-34">Tester</button>
          <button type="button" className="flex items-center gap-5 border rounded-md no-underline cursor-pointer bg-shop border-shop text-black hover:bg-notification hover:border-notification px-12 py-4 min-h-34">Buy</button>
        </div>
      </section>

      <section className="mt-60 md:mt-100 px-10 md:px-20">
        <ClientLogos />
      </section>

      <section id="services" className="relative mt-60 md:mt-100 px-10 md:px-20 scroll-mt-header">
        <hr className="p-0 m-0 b-0 h-0 border-t border-black absolute left-10 right-10 md:left-20 md:right-20 transition-all origin-center" />
        <div className="pt-15">
          <h2 className="text-3xl-normal tracking-wide mb-20 sm:mb-30 turn-off-feature transition-all">
            Услуги
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-15">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                illustration={service.illustration}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="objects" className="relative mt-60 md:mt-100 px-10 md:px-20 scroll-mt-header">
        <hr className="p-0 m-0 b-0 h-0 border-t border-black absolute left-10 right-10 md:left-20 md:right-20 transition-all origin-center" />
        <div className="pt-15 flex flex-col">
          <h2 className="text-3xl-normal tracking-wide mb-20 sm:mb-30 turn-off-feature transition-all">
            Реализованные объекты
          </h2>
          <div className="flex flex-col md:flex-row gap-20 items-start justify-between mb-48 sm:mb-67">
            <p className="text-xl-wide max-w-[935px]">
              Мы выполнили десятки проектов по алмазному сверлению, резке проёмов и демонтажу сложных конструкций — от жилых домов до промышленных объектов.
            </p>
            <Link
              className="flex items-center gap-5 border no-underline cursor-pointer bg-black border-black text-white rounded-md hover:border-notification hover:bg-notification hover:text-black px-12 py-4 min-h-34"
              to="/objects"
            >
              Все объекты
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-6 items-start gap-x-15 gap-y-25">
          {completedObjects.map((object) => (
            <ObjectCarouselCard key={object.title} title={object.title} span={object.span} slides={object.slides} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
