import { objects } from './lib/objects'

export type PageMeta = {
  title: string
  /** Short page name for breadcrumbs and llms.txt. */
  name: string
  description: string
  /** Route path, used to build canonical/og:url. */
  path: string
  /** Set to keep this route out of search results (internal/service pages, 404). */
  noindex?: boolean
}

export const defaultMeta: PageMeta = {
  title: 'Юни-С. Алмазная резка и демонтаж в Санкт-Петербурге',
  name: 'Главная',
  description:
    'Алмазное сверление, резка проёмов и демонтаж сложных конструкций в Санкт-Петербурге и Ленинградской области. Аренда стенорезного оборудования с оператором.',
  path: '/',
}

export const pageMeta: Record<string, PageMeta> = {
  '/': defaultMeta,
  '/services': {
    name: 'Услуги',
    title: 'Услуги: алмазная резка, бурение, демонтаж | Юни-С',
    description:
      'Алмазная резка стенорезными машинами, бурение отверстий, демонтаж бетонных конструкций и аренда оборудования с оператором.',
    path: '/services',
  },
  '/objects': {
    name: 'Реализованные объекты',
    title: 'Реализованные объекты | Юни-С',
    description:
      'Примеры выполненных проектов по алмазному сверлению, резке проёмов и демонтажу: от жилых домов до промышленных объектов.',
    path: '/objects',
  },
  '/prices': {
    name: 'Цены',
    title: 'Цены на алмазную резку и демонтаж | Юни-С',
    description: 'Стоимость услуг алмазного сверления, резки проёмов и демонтажа конструкций в Санкт-Петербурге и ЛО.',
    path: '/prices',
  },
  '/privacy': {
    name: 'Политика обработки персональных данных',
    title: 'Политика в отношении обработки персональных данных | Юни-С',
    description:
      'Как ООО «Юни-С» обрабатывает и защищает персональные данные посетителей сайта в соответствии с Федеральным законом № 152-ФЗ.',
    path: '/privacy',
  },
  '/consent': {
    name: 'Согласие на обработку персональных данных',
    title: 'Согласие на обработку персональных данных | Юни-С',
    description:
      'Условия, на которых посетитель сайта Юни-С даёт согласие на обработку своих персональных данных.',
    path: '/consent',
  },
  '/ui-kit': {
    name: 'UI-kit',
    title: 'UI-kit | Юни-С',
    description: 'Служебная страница дизайн-системы сайта.',
    path: '/ui-kit',
    noindex: true,
  },
}

export const notFoundMeta: PageMeta = {
  title: 'Страница не найдена | Юни-С',
  name: 'Страница не найдена',
  description: 'Запрашиваемая страница не найдена.',
  path: '/404',
  noindex: true,
}

export function getObjectMeta(slug: string): PageMeta | undefined {
  const object = objects.find((entry) => entry.slug === slug)
  if (!object) return undefined

  const title = object.info.header || object.info.objectName || object.info.clientName || slug
  return {
    title: `${title} | Юни-С`,
    name: title,
    description: object.info.description
      ? `${object.info.description.replace(/\.$/, '')}. Проект Юни-С, ${object.info.year} год.`
      : `${title}: проект Юни-С, ${object.info.year} год.`,
    path: `/objects/${slug}`,
  }
}

export function getPageMeta(pathname: string): PageMeta {
  if (pathname.startsWith('/objects/')) {
    return getObjectMeta(pathname.slice('/objects/'.length)) ?? notFoundMeta
  }
  return pageMeta[pathname] ?? notFoundMeta
}
