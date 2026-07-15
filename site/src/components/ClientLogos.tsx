const clients = ['Google', 'Amazon', 'Microsoft', 'Apple', 'Meta']

type ClientLogosProps = {
  className?: string
}

function ClientLogos({ className = '' }: ClientLogosProps) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-5 gap-15 ${className}`}>
      {clients.map((client) => (
        <div
          key={client}
          className="flex items-center justify-center h-60 md:h-80 bg-submenu rounded-base text-2xl-7-wide sm:text-3xl-normal tracking-wide text-pigeon grayscale"
        >
          {client}
        </div>
      ))}
    </div>
  )
}

export default ClientLogos
