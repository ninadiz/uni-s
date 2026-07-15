import type { ReactNode } from 'react'

type ServiceCardProps = {
  title: string
  description: string
  illustration: ReactNode
  featured?: boolean
  className?: string
}

function ServiceCard({ title, description, illustration, featured = false, className = '' }: ServiceCardProps) {
  return (
    <article
      className={`flex rounded-base overflow-hidden min-h-[180px] md:min-h-[220px] ${featured ? 'bg-black [&_svg]:stroke-white' : 'bg-submenu'} ${className}`}
    >
      <div className="w-1/2 flex flex-col justify-between p-12 md:p-20">
        <h3 className={`text-sm-wide sm:text-2xl-7-wide ${featured ? 'text-white' : 'text-black'}`}>{title}</h3>
        <p className={`text-xs-wide sm:text-sm-wide max-w-[220px] ${featured ? 'text-white/70' : 'text-black'}`}>{description}</p>
      </div>
      <div className={`w-1/2 flex items-center justify-center p-10 md:p-15 border-l ${featured ? 'border-white/15' : 'border-black/15'}`}>
        {illustration}
      </div>
    </article>
  )
}

export default ServiceCard
