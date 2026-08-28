import type { ReactNode } from 'react'

type ServiceCardProps = {
  title: string
  description: string
  illustration?: ReactNode
  featured?: boolean
  className?: string
}

function ServiceCard({ title, description, illustration, featured = false, className = '' }: ServiceCardProps) {
  if (featured) {
    return (
      <article
        className={`flex flex-col gap-8 rounded-none border border-black p-16 md:p-20 ${className}`}
      >
        <h3 className="text-lg-wide sm:text-2xl-7-wide text-black">{title}</h3>
        <p className="text-base-wide text-black">{description}</p>
      </article>
    )
  }

  return (
    <article
      className={`flex flex-col sm:flex-row rounded-none sm:min-h-[220px] md:min-h-[260px] bg-paper ${className}`}
    >
      <div className="w-full sm:w-1/2 flex flex-col gap-12 sm:gap-0 sm:justify-between p-16 md:pt-32 md:pr-24 md:pb-32 md:pl-32">
        <h3 className="text-lg-wide sm:text-2xl-7-wide text-black underline">{title}</h3>
        <p className="text-base-wide font-medium text-black/40 sm:max-w-[220px]">{description}</p>
      </div>
      <div className="w-full sm:w-1/2 flex items-center justify-center p-16 md:p-20 border-t sm:border-t-0 sm:border-l border-white">
        {illustration}
      </div>
    </article>
  )
}

export default ServiceCard
