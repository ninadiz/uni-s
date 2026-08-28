import { Link, useParams } from 'react-router-dom'
import { objects } from '../lib/objects'
import NotFound from './NotFound'

function ObjectDetail() {
  const { slug } = useParams()
  const object = objects.find((entry) => entry.slug === slug)

  if (!object) return <NotFound />

  const { info, photos } = object
  const title = info.header || info.objectName || info.clientName || object.slug
  const meta = [info.clientName, info.year ? String(info.year) : ''].filter(Boolean).join(' · ')

  return (
    <>
      <section className="bg-menu px-10 md:px-24 pt-64 pb-24 flex flex-col gap-15">
        <Link to="/objects" className="text-base-wide underline w-fit">
          ← Все объекты
        </Link>
        <h1 className="text-4xl">{title}</h1>
        {meta && <div className="text-xs-wide text-pigeon">{meta}</div>}
        <p className="text-xl-wide max-w-[700px]">{info.description}</p>
      </section>

      {photos.length > 0 && (
        <section className="mt-60 md:mt-100 mb-100 px-10 md:px-20 lg:px-40">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-15 gap-y-25">
            {photos.map((photo, i) => (
              <img
                key={photo.src}
                src={photo.src}
                srcSet={photo.srcSet}
                sizes="(min-width: 768px) 33vw, 50vw"
                alt={`${title}, фото ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default ObjectDetail
