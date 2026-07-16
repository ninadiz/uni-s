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
        className={`flex flex-col rounded-none border border-black p-12 md:p-20 ${className}`}
      >
        <h3 className="text-sm-wide sm:text-2xl-7-wide text-black">{title}</h3>
        <p className="text-base-wide text-black">{description}</p>
      </article>
    )
  }

  return (
    <article
      className={`flex rounded-none min-h-[220px] md:min-h-[260px] bg-paper ${className}`}
    >
      <div className="w-1/2 flex flex-col justify-between p-16 md:pt-32 md:pr-24 md:pb-32 md:pl-32">
        <h3 className="text-sm-wide sm:text-2xl-7-wide text-black underline">{title}</h3>
        <p className="text-base-wide font-medium text-black/40 max-w-[220px]">{description}</p>
      </div>
      <div className="w-1/2 flex items-center justify-center p-14 md:p-20 border-l border-white">
        {illustration}
      </div>
    </article>
  )
}

export default ServiceCard
