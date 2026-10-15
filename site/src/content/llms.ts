import { SITE_URL } from '../config'
import { objects } from '../lib/objects'
import { getObjectMeta, pageMeta } from '../pageMeta'
import { company } from './company'
import { calcUnits, costFactors } from './prices'
import { services } from './services'

// /llms.txt (https://llmstxt.org) — машиночитаемый обзор сайта для AI-агентов.
// Собирается при пререндере из тех же данных, что и страницы, поэтому не расходится с ними.
export function buildLlmsTxt(): string {
  const link = (path: string) => `${SITE_URL}${path}`
  const page = (path: string) => `[${pageMeta[path].name}](${link(path)})`

  const objectLines = objects.map((object) => {
    const meta = getObjectMeta(object.slug)!
    const description = object.info.description.replace(/\.$/, '')
    return `- [${meta.name}](${link(meta.path)})${description ? `: ${description}` : ''} (${object.info.year})`
  })

  return [
    `# ${company.name} (${company.legalName})`,
    '',
    `> ${company.summary}`,
    '',
    `Работаем с ${company.foundingYear} года. Регион работ: ${company.areaServed.join(' и ')}.`,
    '',
    '## Контакты',
    '',
    `- Телефон: ${company.phone}`,
    `- Email: ${company.email}`,
    `- Адрес: ${company.address.street}, ${company.address.city}`,
    `- Часы работы: ${company.openingHours.text}`,
    `- Сайт: ${company.url}`,
    `- VK: ${company.vk}`,
    `- Яндекс Карты: ${company.yandexMaps}`,
    `- ${company.legalName}, ИНН ${company.taxID}`,
    '',
    '## Услуги',
    '',
    `Подробнее: ${page('/services')}`,
    '',
    ...services.map((service) => `- **${service.title}.** ${service.description}`),
    '',
    '## Цены',
    '',
    `Стоимость рассчитывается индивидуально под объект, смета — по телефону. Подробнее: ${page('/prices')}`,
    '',
    'Единицы расчёта:',
    '',
    ...calcUnits.map((row) => `- ${row.service}: ${row.unit}`),
    '',
    'От чего зависит стоимость:',
    '',
    ...costFactors.map((factor) => `- ${factor}`),
    '',
    '## Реализованные объекты',
    '',
    `Все объекты: ${page('/objects')}`,
    '',
    ...objectLines,
    '',
  ].join('\n')
}
