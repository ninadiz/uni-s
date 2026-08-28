const textStyles = [
  { name: 'text-xs-wide', size: '0.75rem', lineHeight: 'leading-4: 1rem (16px)', tracking: 'wide (0.025em)' },
  { name: 'text-sm-wide', size: '0.875rem', lineHeight: 'leading-5: 1.25rem (20px)', tracking: 'wide (0.025em)' },
  { name: 'text-base-wide', size: '1rem', lineHeight: 'leading-6: 1.5rem (24px)', tracking: 'wide (0.025em)' },
  { name: 'text-lg-wide', size: '1.125rem', lineHeight: 'leading-7: 1.75rem (28px)', tracking: 'wide (0.025em)' },
  { name: 'text-xl-wide', size: '1.25rem', lineHeight: 'leading-7: 1.75rem (28px)', tracking: 'wide (0.025em)' },
  { name: 'text-2xl', size: '1.375rem', lineHeight: 'leading-8: 2rem (32px)', tracking: 'normal (0em)' },
  { name: 'text-2xl-7-wide', size: '1.375rem', lineHeight: 'leading-7: 1.75rem (28px)', tracking: 'wide (0.025em)' },
  { name: 'text-3xl', size: '1.875rem', lineHeight: 'leading-9: 2.25rem (36px)', tracking: 'normal (0em)' },
  { name: 'text-4xl', size: '2.25rem', lineHeight: 'leading-10: 2.5rem (40px)', tracking: 'normal (0em)' },
  { name: 'text-5xl', size: '3rem', lineHeight: 'leading-none: 1 (48px)', tracking: 'normal (0em)' },
]

// Брейкпоинты Tailwind (дефолтные, не переопределены в теме): sm=640px lg=1024px.
// md/xl/2xl нигде в коде не используются для типографики, поэтому в таблице их нет.
// classes: реальная запись из кода (для документации), render: те же классы без sm:/lg:
// префикса, чтобы можно было отрисовать живой образец текста независимо от ширины окна.
// Отсутствие ключа у брейкпоинта = нет своего класса, значение наследуется с предыдущей колонки.
const SAMPLE_TEXT = 'Алмазное сверление, резка проёмов и демонтаж сложных конструкций'

type BreakpointKey = 'default' | 'sm' | 'lg'

type BreakpointStyle = { classes: string; render: string }

type UsageAuditRow = {
  group: string
  element: string
  sampleText?: string
  bp: Partial<Record<BreakpointKey, BreakpointStyle>>
  note?: string
}

const usageAudit: UsageAuditRow[] = [
  {
    group: 'Header',
    element: 'Логотип «Uni-S» (ссылка в шапке)',
    sampleText: 'Услуги, Объекты, Цены',
    bp: {
      default: { classes: 'text-base-wide font-light', render: 'text-base-wide font-light' },
      lg: { classes: 'lg:text-3xl', render: 'text-3xl font-light' },
    },
    note: 'Баг: на главной (/) эта ссылка рендерится наоборот, 30px на мобильном и 16px на десктопе. Похоже на конфликт специфичности из-за селектора current-parent-item, нужен отдельный разбор.',
  },
  {
    group: 'Header',
    element: 'Пункты меню (Услуги, Объекты, Цены, UI-kit)',
    sampleText: 'Услуги, Объекты, Цены',
    bp: {
      default: { classes: 'text-base-wide font-light', render: 'text-base-wide font-light' },
      lg: { classes: 'lg:text-3xl', render: 'text-3xl font-light' },
    },
    note: 'Единственное место на сайте, где переключение размера происходит на lg, а не на sm: от 640 до 1023px пункты меню ещё маленькие.',
  },
  {
    group: 'H1',
    element: 'Заголовок хиро-блока (главная)',
    bp: {
      default: { classes: 'text-3xl', render: 'text-3xl' },
      sm: { classes: 'sm:text-5xl', render: 'text-5xl' },
    },
  },
  {
    group: 'H2',
    element: '«Услуги», «Реализованные объекты»',
    bp: {
      default: { classes: 'text-4xl', render: 'text-4xl' },
      sm: { classes: 'sm:text-5xl', render: 'text-5xl' },
    },
  },
  {
    group: 'H3',
    element: 'Заголовок карточки услуги',
    bp: {
      default: { classes: 'text-sm-wide', render: 'text-sm-wide' },
      sm: { classes: 'sm:text-2xl-7-wide', render: 'text-2xl-7-wide' },
    },
  },
  {
    group: 'H4',
    element: 'Заголовок карточки объекта',
    bp: {
      default: { classes: 'text-2xl-7-wide', render: 'text-2xl-7-wide' },
      sm: { classes: 'sm:text-3xl', render: 'text-3xl' },
    },
  },
  {
    group: 'Текст',
    element: 'Вводный абзац («Мы выполнили десятки проектов…»)',
    bp: {
      default: { classes: 'text-xl-wide', render: 'text-xl-wide' },
    },
  },
  {
    group: 'Текст',
    element: 'Описание услуги (карточка), ссылки в футере (Услуги, email, VK, реквизиты)',
    bp: {
      default: { classes: 'text-base-wide', render: 'text-base-wide' },
    },
  },
  {
    group: 'Текст',
    element: 'Лейблы футера (САЙТ / КОНТАКТЫ / РЕКВИЗИТЫ), подпись слайда в карточке объекта (напр. «Фото 1»)',
    bp: {
      default: { classes: 'text-xs-wide uppercase tracking-wider', render: 'text-xs-wide uppercase tracking-wider' },
    },
  },
  {
    group: 'Текст',
    element: 'Копирайт-строка футера',
    bp: {
      default: { classes: 'text-xs-wide', render: 'text-xs-wide' },
    },
  },
]

const breakpointColumns: { key: BreakpointKey; label: string; hint: string }[] = [
  { key: 'default', label: 'Default', hint: '0px' },
  { key: 'sm', label: 'sm', hint: '>640px' },
  { key: 'lg', label: 'lg', hint: '>1024px' },
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
  { name: 'color-paper', className: 'bg-paper', hex: '#f2f0e6' },
]

function UiKit() {
  return (
    <div className="px-10 md:px-20 py-40 max-w-[1200px] mx-auto">
      <h1 className="text-3xl mb-20">UI-kit</h1>

      <section className="mb-60 border border-black rounded-md p-20">
        <h2 className="text-2xl mb-10">Базовые настройки</h2>
        <p className="text-base-wide">
          Базовый размер шрифта <code className="bg-submenu px-4 rounded-sm">html {'{'} font-size: 16px {'}'}</code>.
          Все размеры в теме заданы в <code className="bg-submenu px-4 rounded-sm">rem</code> с шагом 0.125rem (как в
          Tailwind), поэтому 1rem = 16px, стандартное значение браузера. Имена текстовых стилей следуют схеме{' '}
          <code className="bg-submenu px-4 rounded-sm">text-{'{'}size{'}'}-{'{'}tracking{'}'}</code>, где size это
          ближайший размер из шкалы Tailwind, leading это фиксированное значение из шкалы Tailwind{' '}
          <code className="bg-submenu px-4 rounded-sm">leading-N</code> (N × 0.25rem), tracking это межбуквенный
          интервал (tight / normal / wide).
        </p>
      </section>

      <section className="mb-60">
        <h2 className="text-2xl mb-20">Текстовые стили</h2>
        <div className="flex flex-col gap-20">
          {textStyles.map((style) => (
            <div key={style.name} className="border-b border-black pb-20">
              <div className={style.name}>Алмазное сверление, резка проёмов</div>
              <div className="text-xs-wide text-pigeon mt-8">
                {style.name}: {style.size} ({parseFloat(style.size) * 16}px) / {style.lineHeight} /{' '}
                {style.tracking}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-60">
        <h2 className="text-2xl mb-10">Аудит по элементам</h2>
        <p className="text-xs-wide text-pigeon mb-20">
          Как выглядят классы Tailwind сейчас, «как есть», по факту в коде, до того как договоримся об общих
          правилах для каждого элемента.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1400px] border-collapse text-xs-wide">
            <thead>
              <tr className="text-left border-b border-black">
                <th className="p-8 w-[180px]">Элемент</th>
                {breakpointColumns.map((col) => (
                  <th key={col.key} className="p-8 whitespace-nowrap">
                    {col.label} <span className="text-pigeon">({col.hint})</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usageAudit.map((row) => (
                <tr key={row.element} className="border-b border-black/15 align-top">
                  <td className="p-8 w-[180px]">
                    <div className="text-pigeon">{row.group}</div>
                    <div>{row.element}</div>
                  </td>
                  {breakpointColumns.map((col) => {
                    const own = row.bp[col.key]
                    return (
                      <td key={col.key} className="p-8 max-w-[320px]">
                        {own && (
                          <>
                            <div className={own.render}>{row.sampleText ?? SAMPLE_TEXT}</div>
                            <div className="text-pigeon mt-4">{own.classes}</div>
                          </>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col gap-4 mt-10">
            {usageAudit
              .filter((row) => row.note)
              .map((row) => (
                <p key={row.element} className="text-xs-wide text-pigeon italic">
                  {row.element}: {row.note}
                </p>
              ))}
          </div>
        </div>
      </section>

      <section className="mb-60">
        <h2 className="text-2xl mb-20">Цвета</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-20">
          {colors.map((color) => (
            <div key={color.name} className="flex flex-col gap-8">
              <div className={`${color.className} h-80 rounded-md border border-black`} />
              <div className="text-xs-wide">{color.name}</div>
              <div className="text-xs-wide text-pigeon">{color.hex}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default UiKit
