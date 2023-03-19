import { streamToPromise } from 'sitemap'
import convert from 'xml-js'

import checkForLocalhost from '@/helpers/checkForLocalhost'
import getSitemapStream from '@/helpers/getSitemapStream'
import { SitemapXML } from '@/types/SitemapXML'

import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const docs = await serverQueryContent(event).find()
  const sitemap = await getSitemapStream(event)
  const sitemapString = (await streamToPromise(sitemap)).toString()
  const sitemapJSON = convert.xml2js(sitemapString, { compact: true }) as SitemapXML
  const hostname = checkForLocalhost(event.node.req.headers.host as string)
    ? `http://${event.node.req.headers.host}`
    : `https://${event.node.req.headers.host}`

  docs.forEach((doc) => {
    const index = sitemapJSON.urlset.url.findIndex((url) => url.loc._text === `${hostname}${doc._path}`)

    if (index !== -1 && doc.title) {
      sitemapJSON.urlset.url[index].title = { _text: doc.title }
    }
  })

  return sitemapJSON
})
