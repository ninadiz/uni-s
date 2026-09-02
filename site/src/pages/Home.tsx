import { Link } from 'react-router-dom'
import ClientLogos from '../components/ClientLogos'
import ObjectCarouselCard from '../components/ObjectCarouselCard'
import ServiceCard from '../components/ServiceCard'
import { LensIllustration } from '../components/ServiceIllustrations'
import { getFeaturedObjects, toObjectCard } from '../lib/objects'

const services = [
  {
    title: 'Алмазная резка стенорезными машинами',
    description: 'Обеспечивает ровные края, минимум пыли и вибраций. Для толстых стен и перекрытий.',
    illustration: <LensIllustration />,
  },
  {
    title: 'Алмазное бурение отверстий',
    description: 'Мокрое и сухое бурение отверстий любого диаметра.',
    illustration: <LensIllustration />,
  },
]

const serviceList = [
  'Аккуратный демонтаж бетонных и железобетонных конструкций безударным методом стенорезными машинами.',
  'Бурение отверстий любого диаметра под инженерные коммуникации, вентиляцию и крепеж.',
  'Чистое сухое бурение на этапе финишной отделки.',
  'Алмазная резка канатом для демонтажа конструкций сложных форм или больших размеров.',
  'Штробление и резка швонарезчиком.',
]

const servicesCta = {
  title: 'Нужно больше гибкости и контроля над процессом?',
  description: 'Закажите услугу аренды стенорезной машины с оператором. Оператор быстро настроит оборудование и выполнит задачи на вашем объекте.',
}

const featuredObjects = getFeaturedObjects()

function Home() {
  return (
    <>
      <section className="flex flex-col min-h-[calc(100vh-var(--header-height,150px))]">
        <div className="flex-1 bg-menu px-16 md:px-24 pt-20 pb-24 md:pt-0 flex flex-col justify-end md:flex-row md:items-end md:justify-between gap-20">
          <h1 className="max-w-[900px] md:max-w-[800px] text-4xl md:text-5xl">
            Алмазное сверление, резка проёмов и демонтаж сложных конструкций
            <span className="block text-black/50">в Санкт-Петербурге и ЛО</span>
          </h1>
        </div>

        {/* Extra bottom room on mobile so the floating call button (FloatingCall)
            doesn't cover the logo strip parked at the bottom of the first screen. */}
        <div className="mt-20 mb-100 md:my-20">
          <ClientLogos />
        </div>
      </section>

      <section id="services" className="mt-60 md:mt-100 px-16 md:px-20 lg:px-40 scroll-mt-[var(--header-height)]">
        <div className="pt-15 grid grid-cols-1 md:grid-cols-2 gap-15 md:gap-40 items-start">
          <div className="reveal flex flex-col gap-20 md:gap-32">
            <h2 className="text-4xl md:text-5xl transition-all">
              Услуги
            </h2>
            <p className="text-xl-wide">
              Полный комплекс алмазных работ, от резки и бурения до аренды оборудования с оператором.
            </p>
            <ul className="text-xl-wide flex flex-col gap-8 list-disc pl-20">
              {serviceList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-20 md:gap-32 md:mt-80">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                illustration={service.illustration}
                className="reveal"
              />
            ))}
          </div>
        </div>
        <ServiceCard
          featured
          title={servicesCta.title}
          description={servicesCta.description}
          className="reveal mt-24 md:mt-40"
        />
      </section>

      <section id="objects" className="relative mt-60 md:mt-100 px-16 md:px-20 lg:px-40 scroll-mt-[var(--header-height)]">
        <hr className="p-0 m-0 b-0 h-0 border-t border-black absolute left-10 right-10 md:left-20 md:right-20 lg:left-40 lg:right-40 transition-all origin-center" />
        <div className="reveal pt-15 flex flex-col">
          <h2 className="text-4xl md:text-5xl mb-20 md:mb-30 transition-all">
            Реализованные объекты
          </h2>
          <div className="flex flex-col md:flex-row gap-20 items-start justify-between mb-48 md:mb-67">
            <p className="text-xl-wide max-w-[935px]">
              Мы выполнили десятки проектов по алмазному сверлению, резке проёмов и демонтажу сложных конструкций, от жилых домов до промышленных объектов.
            </p>
            <Link
              className="flex items-center gap-5 border no-underline cursor-pointer bg-menu border-menu text-black rounded-md hover:border-notification hover:bg-notification hover:text-white px-12 py-4 min-h-34"
              to="/objects"
            >
              Все объекты
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-6 items-start gap-x-15 gap-y-25">
          {featuredObjects.map((object) => {
            const { title, slides } = toObjectCard(object)
            return (
              <ObjectCarouselCard
                key={object.slug}
                title={title}
                span="md:col-span-2"
                slides={slides}
                to={`/objects/${object.slug}`}
                className="reveal"
              />
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Home
