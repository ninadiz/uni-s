const textStyles = [
  { name: 'text-smXs', size: '1.1rem', lineHeight: '130%', letterSpacing: '0.02em' },
  { name: 'text-xs', size: '1.2rem', lineHeight: '130%', letterSpacing: '0.02em' },
  { name: 'text-smS', size: '1.4rem', lineHeight: '130%', letterSpacing: '0.3px' },
  { name: 'text-s', size: '1.5rem', lineHeight: '130%', letterSpacing: '0.3px' },
  { name: 'text-body', size: '1.5rem', lineHeight: '139%', letterSpacing: '0.3px' },
  { name: 'text-smM', size: '1.7rem', lineHeight: '115%', letterSpacing: '0.21px' },
  { name: 'text-m', size: '2.1rem', lineHeight: '115%', letterSpacing: '0.21px' },
  { name: 'text-smX', size: '1.7rem', lineHeight: '115%', letterSpacing: '0.01em' },
  { name: 'text-x', size: '1.9rem', lineHeight: '115%', letterSpacing: '0.01em' },
  { name: 'text-smL', size: '2.8rem', lineHeight: '110%', letterSpacing: '-0.28px' },
  { name: 'text-l', size: '2.8rem', lineHeight: '110%', letterSpacing: '-0.28px' },
  { name: 'text-smSaansL', size: '2.2rem', lineHeight: '115%', letterSpacing: '0.1px' },
  { name: 'text-smXl', size: '2.9rem', lineHeight: '110%', letterSpacing: '-0.01em' },
  { name: 'text-xl', size: '4.8rem', lineHeight: '90%', letterSpacing: '-0.96px' },
]

const colors = [
  { name: 'color-black', className: 'bg-black', hex: '#000' },
  { name: 'color-white', className: 'bg-white', hex: '#fff' },
  { name: 'color-menu', className: 'bg-menu', hex: '#c9cac9' },
  { name: 'color-notification', className: 'bg-notification', hex: '#ffff3c' },
  { name: 'color-pigeon', className: 'bg-pigeon', hex: '#76756f' },
  { name: 'color-submenu', className: 'bg-submenu', hex: '#e3e3e3' },
  { name: 'color-shop', className: 'bg-shop', hex: '#beffbd' },
  { name: 'color-menthol', className: 'bg-menthol', hex: '#b8fbff' },
]

const textStyleClasses: Record<string, string> = {
  'text-smXs': 'text-smXs',
  'text-xs': 'text-xs',
  'text-smS': 'text-smS',
  'text-s': 'text-s',
  'text-body': 'text-body',
  'text-smM': 'text-smM',
  'text-m': 'text-m',
  'text-smX': 'text-smX',
  'text-x': 'text-x',
  'text-smL': 'text-smL',
  'text-l': 'text-l',
  'text-smSaansL': 'text-smSaansL',
  'text-smXl': 'text-smXl',
  'text-xl': 'text-xl',
}

function UiKit() {
  return (
    <div className="px-10 md:px-20 py-40 max-w-[1200px] mx-auto">
      <h1 className="text-l font-serif mb-20">UI-kit</h1>

      <section className="mb-60 border border-black rounded-md p-20">
        <h2 className="text-m mb-10">Базовые настройки</h2>
        <p className="text-body">
          Базовый размер шрифта <code className="bg-submenu px-4 rounded-sm">html {'{'} font-size: 10px {'}'}</code>.
          Все размеры в теме заданы в <code className="bg-submenu px-4 rounded-sm">rem</code>, поэтому 1rem = 10px
          (а не 16px по умолчанию в браузере). Это нужно учитывать при переводе значений темы в пиксели.
        </p>
      </section>

      <section className="mb-60">
        <h2 className="text-m mb-20">Текстовые стили</h2>
        <div className="flex flex-col gap-20">
          {textStyles.map((style) => (
            <div key={style.name} className="border-b border-black pb-20">
              <div className={textStyleClasses[style.name]}>Алмазное сверление, резка проёмов</div>
              <div className="text-smXs text-pigeon mt-8">
                {style.name} — {style.size} ({parseFloat(style.size) * 10}px) / {style.lineHeight} / {style.letterSpacing}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-60">
        <h2 className="text-m mb-20">Цвета</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-20">
          {colors.map((color) => (
            <div key={color.name} className="flex flex-col gap-8">
              <div className={`${color.className} h-80 rounded-md border border-black`} />
              <div className="text-smXs">{color.name}</div>
              <div className="text-smXs text-pigeon">{color.hex}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default UiKit
