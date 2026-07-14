import type { ReactNode } from 'react'

type ServiceCardProps = {
  title: string
  description: string
  illustration: ReactNode
}

function ServiceCard({ title, description, illustration }: ServiceCardProps) {
  return (
    <article className="flex bg-submenu rounded-base overflow-hidden min-h-[180px] md:min-h-[220px]">
      <div className="w-1/2 flex flex-col justify-between p-12 md:p-20">
        <h3 className="text-smS sm:text-smSaansL font-serif text-black">{title}</h3>
        <p className="text-smXs sm:text-smS text-black max-w-[220px]">{description}</p>
      </div>
      <div className="w-1/2 border-l border-black/15 flex items-center justify-center p-10 md:p-15">
        {illustration}
      </div>
    </article>
  )
}

export default ServiceCard
