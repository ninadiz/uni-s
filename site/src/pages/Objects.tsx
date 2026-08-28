import ObjectCarouselCard from '../components/ObjectCarouselCard'
import { objects, toObjectCard } from '../lib/objects'

function Objects() {
  return (
    <>
      <section className="bg-menu px-16 md:px-24 pt-24 md:pt-64 pb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-20">
        <h1 className="text-4xl">Реализованные объекты</h1>
        <p className="text-xl-wide max-w-[600px]">
          Проекты по алмазному сверлению, резке проёмов и демонтажу в Санкт-Петербурге и Ленинградской области: жилые
          комплексы, бизнес-центры, производственные площадки и порты. Ниже собрана часть выполненных работ.
        </p>
      </section>

      <section className="mt-40 md:mt-100 mb-60 md:mb-100 px-16 md:px-20 lg:px-40">
        <div className="grid grid-cols-6 items-start gap-x-15 gap-y-25">
          {objects.map((object) => {
            const { title, slides, meta } = toObjectCard(object)
            return (
              <ObjectCarouselCard
                key={object.slug}
                title={title}
                span="md:col-span-2"
                slides={slides}
                meta={meta}
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

export default Objects
