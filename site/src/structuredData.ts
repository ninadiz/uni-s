import { SITE_URL } from './config'
import { company, companyProfiles } from './content/company'
import { services } from './content/services'
import { defaultMeta, getPageMeta, pageMeta } from './pageMeta'

// JSON-LD для страницы — один `@graph`, общий для пререндера (scripts/prerender.mjs)
// и рантайма (components/PageMeta.tsx), чтобы они не расходились.

const organizationId = `${SITE_URL}/#organization`

const organization = {
  '@type': 'LocalBusiness',
  '@id': organizationId,
  name: company.legalName,
  alternateName: company.name,
  url: company.url,
  description: company.summary,
  telephone: company.phone,
  email: company.email,
  taxID: company.taxID,
  foundingDate: String(company.foundingYear),
  areaServed: company.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressCountry: 'RU',
  },
  geo: { '@type': 'GeoCoordinates', ...company.geo },
  hasMap: company.yandexMaps,
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: company.openingHours.days,
    opens: company.openingHours.opens,
    closes: company.openingHours.closes,
  },
  sameAs: companyProfiles,
}

function breadcrumbs(pathname: string) {
  const items = [{ name: defaultMeta.name, path: '/' }]
  if (pathname.startsWith('/objects/')) items.push({ name: pageMeta['/objects'].name, path: '/objects' })
  const meta = getPageMeta(pathname)
  items.push({ name: meta.name, path: meta.path })

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

const serviceList = {
  '@type': 'ItemList',
  name: 'Услуги Юни-С',
  itemListElement: services.map((service, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: service.title,
      description: service.description,
      serviceType: service.title,
      provider: { '@id': organizationId },
      areaServed: organization.areaServed,
      url: `${SITE_URL}/services`,
    },
  })),
}

export function getStructuredData(pathname: string) {
  const meta = getPageMeta(pathname)
  const graph: object[] = [organization]

  if (!meta.noindex && meta.path !== '/') graph.push(breadcrumbs(pathname))
  if (meta.path === '/services') graph.push(serviceList)

  return { '@context': 'https://schema.org', '@graph': graph }
}

/** JSON for an inline <script type="application/ld+json"> — `<` escaped so the content can't close the tag. */
export function serializeStructuredData(pathname: string): string {
  return JSON.stringify(getStructuredData(pathname)).replace(/</g, '\\u003c')
}
