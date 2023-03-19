export interface SitemapXML {
  urlset: {
    url: {
      loc: {
        _text: string
      }
      lastmod: {
        _text: string
      }
      changefreq: {
        _text: string
      }
      priority: {
        _text: string
      }
      title?: {
        _text: string
      }
    }[]
    _attributes: {
      'xmlns': string
      'xmlns:image': string
      'xmlns:news': string
      'xmlns:video': string
      'xmlns:xhtml': string
    }
  }
  _declaration: {
    _attributes: {
      version: string
      encoding: string
    }
  }
}
