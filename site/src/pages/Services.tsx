import ServiceCard from '../components/ServiceCard'
import { services } from '../content/services'
import {
  HiltiCuttingIllustration,
  RentalOperatorIllustration,
  CoreDrillingIllustration,
  WireSawIllustration,
  LensIllustration,
} from '../components/ServiceIllustrations'

// Иллюстрации по порядку услуг в src/content/services.ts.
const illustrations = [
  HiltiCuttingIllustration,
  CoreDrillingIllustration,
  LensIllustration,
  WireSawIllustration,
  LensIllustration,
  RentalOperatorIllustration,
]

function Services() {
  return (
    <>
      <section className="bg-menu px-16 md:px-24 pt-24 md:pt-64 pb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-20">
        <h1 className="text-4xl">Услуги</h1>
        <p className="text-xl-wide max-w-[600px]">
          Полный комплекс алмазных работ, от резки и бурения до демонтажа и аренды оборудования с оператором, в
          Санкт-Петербурге и Ленинградской области.
        </p>
      </section>

      <section className="mt-60 md:mt-100 mb-100 px-16 md:px-20 lg:px-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-15 md:gap-20">
          {services.map((service, i) => {
            const Illustration = illustrations[i]
            return (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                illustration={<Illustration />}
                className="reveal"
              />
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Services
