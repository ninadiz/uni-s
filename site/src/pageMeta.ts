export type PageMeta = {
  title: string
  description: string
}

export const defaultMeta: PageMeta = {
  title: 'Юни-С — алмазное сверление, резка проёмов и демонтаж в Санкт-Петербурге',
  description:
    'Алмазное сверление, резка проёмов и демонтаж сложных конструкций в Санкт-Петербурге и Ленинградской области. Аренда стенорезного оборудования с оператором.',
}

export const pageMeta: Record<string, PageMeta> = {
  '/': defaultMeta,
  '/services': {
    title: 'Услуги — Юни-С',
    description:
      'Алмазная резка стенорезными машинами, бурение отверстий, демонтаж бетонных конструкций и аренда оборудования с оператором.',
  },
  '/objects': {
    title: 'Реализованные объекты — Юни-С',
    description:
      'Примеры выполненных проектов по алмазному сверлению, резке проёмов и демонтажу — от жилых домов до промышленных объектов.',
  },
  '/prices': {
    title: 'Цены — Юни-С',
    description: 'Стоимость услуг алмазного сверления, резки проёмов и демонтажа конструкций в Санкт-Петербурге и ЛО.',
  },
  '/ui-kit': {
    title: 'UI-kit — Юни-С',
    description: 'Служебная страница дизайн-системы сайта.',
  },
}

export function getPageMeta(pathname: string): PageMeta {
  return pageMeta[pathname] ?? defaultMeta
}
