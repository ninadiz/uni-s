import ObjectCarouselCard from '../components/ObjectCarouselCard'
import { objects, toObjectCard } from '../lib/objects'

function Objects() {
  return (
    <>
      <section className="bg-menu px-10 md:px-24 pt-64 pb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-20">
        <h1 className="text-4xl">Реализованные объекты</h1>
      </section>

      <section className="mt-60 md:mt-100 mb-100 px-10 md:px-20 lg:px-40">
        <div className="grid grid-cols-6 items-start gap-x-15 gap-y-25">
          {objects.map((object) => {
            const { title, slides } = toObjectCard(object)
            return (
              <ObjectCarouselCard
                key={object.slug}
                title={title}
                span="md:col-span-2"
                slides={slides}
                to={`/objects/${object.slug}`}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Objects
