import { FOUNDING_YEAR, SITE_URL } from '../config'

// Реквизиты и контакты компании — единый источник для JSON-LD и llms.txt.
// Адрес, координаты и часы — как в карточке на Яндекс Картах (NAP должен совпадать).
// Ссылку на Profi.ru добавить в sameAs, когда пришлёт заказчик.
export const company = {
  name: 'Юни-С',
  legalName: 'ООО «Юни-С»',
  url: `${SITE_URL}/`,
  phone: '+7-965-080-88-08',
  phoneHref: 'tel:+79650808808',
  email: 'info@unis-tech.ru',
  taxID: '7811631793',
  foundingYear: FOUNDING_YEAR,
  address: {
    street: 'Складская ул., 6Б',
    city: 'Санкт-Петербург',
  },
  geo: { latitude: 59.922401, longitude: 30.437383 },
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '20:00',
    text: 'пн–пт 08:00–20:00',
  },
  vk: 'https://vk.com/unistech',
  yandexMaps: 'https://yandex.ru/maps/org/yuni_s/163347240278/',
  areaServed: ['Санкт-Петербург', 'Ленинградская область'],
  summary:
    'Алмазное сверление, резка проёмов и демонтаж сложных конструкций в Санкт-Петербурге и Ленинградской области. Аренда стенорезного оборудования с оператором.',
}

/** Профили компании на сторонних площадках — `sameAs` в JSON-LD. */
export const companyProfiles = [company.vk, company.yandexMaps]
