const costFactors = [
  'Тип работ: резка проёмов, алмазное бурение, демонтаж или аренда оборудования с оператором.',
  'Диаметр отверстий и толщина конструкции.',
  'Объём работ и материал: бетон, железобетон, кирпич.',
  'Условия доступа на объекте, высотные и стеснённые работы.',
  'Сроки, работа в выходные и в ночную смену.',
]

const calcUnits = [
  { service: 'Алмазное бурение отверстий', unit: 'за отверстие или погонный метр' },
  { service: 'Резка проёмов и швов', unit: 'за квадратный метр реза' },
  { service: 'Демонтаж конструкций', unit: 'за кубический метр' },
  { service: 'Аренда машины с оператором', unit: 'за смену' },
]

function Prices() {
  return (
    <>
      <section className="bg-menu px-16 md:px-24 pt-24 md:pt-64 pb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-20">
        <h1 className="text-4xl">Цены</h1>
        <p className="text-xl-wide max-w-[600px]">
          Стоимость каждого проекта рассчитывается индивидуально. Ниже описано, что влияет на цену и в каких единицах
          считается каждая услуга.
        </p>
      </section>

      <section className="mt-60 md:mt-100 mb-100 px-16 md:px-20 lg:px-40 flex flex-col gap-40 md:gap-60">
        <div className="reveal flex flex-col gap-20 sm:gap-32">
          <h2 className="text-4xl sm:text-5xl">От чего зависит стоимость</h2>
          <ul className="text-xl-wide flex flex-col gap-8 list-disc pl-20 max-w-[935px]">
            {costFactors.map((factor) => (
              <li key={factor}>{factor}</li>
            ))}
          </ul>
        </div>

        <div className="reveal flex flex-col gap-20 sm:gap-32">
          <h2 className="text-4xl sm:text-5xl">Единицы расчёта</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-15 md:gap-20">
            {calcUnits.map((row) => (
              <div key={row.service} className="flex flex-col gap-8 border border-black rounded-none p-16 md:p-20">
                <span className="text-2xl-7-wide sm:text-3xl">{row.service}</span>
                <span className="text-base-wide text-black/50">Считается {row.unit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal flex flex-col gap-15 border border-black rounded-none p-16 md:p-20">
          <h2 className="text-2xl-7-wide sm:text-3xl">Запросить смету</h2>
          <p className="text-base-wide max-w-[600px]">
            Опишите объём работ по телефону. Рассчитаем стоимость по вашему объекту и составим смету.
          </p>
          <a
            href="tel:+79650808808"
            className="flex w-fit items-center gap-5 border no-underline cursor-pointer rounded-md bg-black border-black text-white hover:bg-notification hover:border-notification hover:text-white px-12 py-4 min-h-34"
          >
            Позвонить директору
          </a>
        </div>
      </section>
    </>
  )
}

export default Prices
