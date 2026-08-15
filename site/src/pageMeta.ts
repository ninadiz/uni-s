export type PageMeta = {
  title: string
  description: string
  /** Route path, used to build canonical/og:url. */
  path: string
  /** Set to keep this route out of search results (internal/service pages, 404). */
  noindex?: boolean
}

export const defaultMeta: PageMeta = {
  title: 'Юни-С — алмазное сверление, резка проёмов и демонтаж в Санкт-Петербурге',
  description:
    'Алмазное сверление, резка проёмов и демонтаж сложных конструкций в Санкт-Петербурге и Ленинградской области. Аренда стенорезного оборудования с оператором.',
  path: '/',
}

export const pageMeta: Record<string, PageMeta> = {
  '/': defaultMeta,
  '/services': {
    title: 'Услуги — Юни-С',
    description:
      'Алмазная резка стенорезными машинами, бурение отверстий, демонтаж бетонных конструкций и аренда оборудования с оператором.',
    path: '/services',
  },
  '/objects': {
    title: 'Реализованные объекты — Юни-С',
    description:
      'Примеры выполненных проектов по алмазному сверлению, резке проёмов и демонтажу — от жилых домов до промышленных объектов.',
    path: '/objects',
  },
  '/prices': {
    title: 'Цены — Юни-С',
    description: 'Стоимость услуг алмазного сверления, резки проёмов и демонтажа конструкций в Санкт-Петербурге и ЛО.',
    path: '/prices',
  },
  '/ui-kit': {
    title: 'UI-kit — Юни-С',
    description: 'Служебная страница дизайн-системы сайта.',
    path: '/ui-kit',
    noindex: true,
  },
}

export const notFoundMeta: PageMeta = {
  title: 'Страница не найдена — Юни-С',
  description: 'Запрашиваемая страница не найдена.',
  path: '/404',
  noindex: true,
}

export function getPageMeta(pathname: string): PageMeta {
  return pageMeta[pathname] ?? notFoundMeta
}
