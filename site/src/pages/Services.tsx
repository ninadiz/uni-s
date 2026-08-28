import ServiceCard from '../components/ServiceCard'
import {
  HiltiCuttingIllustration,
  RentalOperatorIllustration,
  CoreDrillingIllustration,
  WireSawIllustration,
  LensIllustration,
} from '../components/ServiceIllustrations'

const services = [
  {
    title: 'Алмазная резка стенорезными машинами',
    description:
      'Резка проёмов в стенах и перекрытиях под двери, окна, вентиляцию и технологические отверстия. Ровные края, минимум пыли и вибраций — подходит для несущих конструкций и работы рядом с эксплуатируемыми помещениями.',
    illustration: <HiltiCuttingIllustration />,
  },
  {
    title: 'Алмазное бурение отверстий',
    description:
      'Сквозные и глухие отверстия любого диаметра под инженерные коммуникации, вентиляцию и крепёж. Мокрое и сухое бурение; чистое сухое бурение — на этапе финишной отделки, без грязи и воды.',
    illustration: <CoreDrillingIllustration />,
  },
  {
    title: 'Демонтаж бетонных и железобетонных конструкций',
    description:
      'Безударный демонтаж стенорезными машинами — без ударных нагрузок на здание. Безопасно рядом с жилыми и эксплуатируемыми помещениями, минимум шума и пыли по сравнению с отбойным методом.',
    illustration: <LensIllustration />,
  },
  {
    title: 'Алмазная резка канатом',
    description:
      'Тросовая резка для демонтажа конструкций сложной формы, большой толщины или крупногабаритных элементов — там, где стенорезная машина не подходит по габаритам или геометрии.',
    illustration: <WireSawIllustration />,
  },
  {
    title: 'Штробление и резка швонарезчиком',
    description:
      'Прокладка штроб под электрику и инженерные сети, резка деформационных швов и дорожных покрытий швонарезчиком.',
    illustration: <LensIllustration />,
  },
  {
    title: 'Аренда стенорезного оборудования с оператором',
    description:
      'Гибкое решение, когда нужен контроль над процессом на своей площадке. Оператор быстро настраивает оборудование и выполняет задачи на вашем объекте.',
    illustration: <RentalOperatorIllustration />,
  },
]

function Services() {
  return (
    <>
      <section className="bg-menu px-10 md:px-24 pt-24 md:pt-64 pb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-20">
        <h1 className="text-4xl">Услуги</h1>
        <p className="text-xl-wide max-w-[600px]">
          Полный комплекс алмазных работ — от резки и бурения до демонтажа и аренды оборудования с оператором — в
          Санкт-Петербурге и Ленинградской области.
        </p>
      </section>

      <section className="mt-60 md:mt-100 mb-100 px-10 md:px-20 lg:px-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-15 md:gap-20">
          {services.map((service) => (
            <ServiceCard key={service.title} title={service.title} description={service.description} illustration={service.illustration} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Services
