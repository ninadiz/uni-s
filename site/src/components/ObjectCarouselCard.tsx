import { useState } from 'react'
import { Link } from 'react-router-dom'

export type ObjectSlide = { label: string; color: string } | { src: string; srcSet?: string; alt: string }

type ObjectCarouselCardProps = {
  title: string
  span: string
  slides: ObjectSlide[]
  meta?: string
  to?: string
  className?: string
}

function ObjectCarouselCard({ title, span, slides, meta, to, className = '' }: ObjectCarouselCardProps) {
  const [index, setIndex] = useState(0)
  const total = slides.length
  const slide = slides[index]

  const prev = () => setIndex((current) => (current - 1 + total) % total)
  const next = () => setIndex((current) => (current + 1) % total)

  const slideContent =
    'src' in slide ? (
      <img
        src={slide.src}
        srcSet={slide.srcSet}
        sizes="(min-width: 768px) 33vw, 100vw"
        alt={slide.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
    ) : (
      <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: slide.color }}>
        <span className="whitespace-nowrap flex items-center justify-center w-full h-full overflow-hidden text-xs-wide text-black uppercase tracking-wider">
          {slide.label}
        </span>
      </div>
    )

  return (
    <article className={`group col-span-6 ${span} ${className}`}>
      <div className="mb-9 md:mb-11">
        <div className="embla relative">
          <div className="embla__container">
            <div className="embla__slide w-full h-0 pb-[62.5%] relative overflow-hidden bg-menu transition-all">
              {to ? (
                <Link to={to} aria-label={title} className="absolute inset-0 block">
                  {slideContent}
                </Link>
              ) : (
                slideContent
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between md:justify-start items-center gap-15">
        <div>
          <h3 className="text-2xl-7-wide sm:text-3xl">{to ? <Link to={to}>{title}</Link> : title}</h3>
          {meta && <div className="text-xs-wide text-pigeon mt-4">{meta}</div>}
        </div>
        <div className="embla__controls tabular-nums shrink-0 h-40 md:h-37 rounded-base bg-black text-white flex items-center text-base-wide gap-5 relative px-32 md:px-10 transition-all md:group-hover:px-32">
          <button
            type="button"
            onClick={prev}
            className="embla__button embla__button--prev flex grow-0 shrink-0 items-center justify-start absolute overflow-hidden left-0 top-0 bottom-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 w-1/2 pl-10 md:scale-x-0 md:group-hover:scale-x-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.3333333333333333" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon icon-arrowLeft">
              <path d="M21 12L3 12"></path>
              <path d="M11 4L3 12L11 20"></path>
            </svg>
          </button>
          <div>{index + 1}/{total}</div>
          <button
            type="button"
            onClick={next}
            className="embla__button embla__button--next flex grow-0 shrink-0 items-center justify-end absolute overflow-hidden right-0 top-0 bottom-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 w-1/2 pr-10 md:scale-x-0 md:group-hover:scale-x-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.3333333333333333" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon icon-arrowRight">
              <path d="M3 12L21 12"></path>
              <path d="M13 20L21 12L13 4"></path>
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}

export default ObjectCarouselCard
