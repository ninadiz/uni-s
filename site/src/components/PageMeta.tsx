import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL } from '../config'
import { getPageMeta } from '../pageMeta'
import { serializeStructuredData } from '../structuredData'

function setMetaByName(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setMetaByProperty(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setCanonical(href: string) {
  let tag = document.querySelector('link[rel="canonical"]')
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', 'canonical')
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

function setStructuredData(json: string) {
  let tag = document.getElementById('structured-data')
  if (!tag) {
    tag = document.createElement('script')
    tag.setAttribute('type', 'application/ld+json')
    tag.id = 'structured-data'
    document.head.appendChild(tag)
  }
  tag.textContent = json
}

function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = getPageMeta(pathname)
    const url = `${SITE_URL}${meta.path}`

    document.title = meta.title
    setMetaByName('description', meta.description)
    setMetaByName('robots', meta.noindex ? 'noindex, nofollow' : 'index, follow')
    setCanonical(url)

    setMetaByProperty('og:type', 'website')
    setMetaByProperty('og:title', meta.title)
    setMetaByProperty('og:description', meta.description)
    setMetaByProperty('og:url', url)
    setMetaByName('twitter:card', 'summary')
    setStructuredData(serializeStructuredData(pathname))
  }, [pathname])

  return null
}

export default PageMeta
