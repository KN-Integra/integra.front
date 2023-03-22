import { resolve } from 'path'

import { APP_TITLE } from './settings/constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
const properties = [
  {
    hid: 'og:locale',
    property: 'og:locale',
    content: 'pl_PL'
  },
  {
    hid: 'og:type',
    property: 'og:type',
    content: 'website'
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content: 'Koło Naukowe Integra AGH'
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content:
      'Koło Integra gromadzi ludzi z pasją, którzy poprzez realizację projektów rozwijają swoje zainteresowania. Integra to jest to!'
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: 'https://integra.agh.edu.pl/'
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: 'Koło Naukowe Integra AGH'
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content: 'https://i.postimg.cc/T2NmZ0t5/integra-logo.png'
  }
]

const twitterProperties = [
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: 'summary_large_image'
  },
  {
    hid: 'twitter:description',
    name: 'twitter:description',
    content:
      'Koło Integra gromadzi ludzi z pasją, którzy poprzez realizację projektów rozwijają swoje zainteresowania. Integra to jest to!'
  },
  {
    hid: 'twitter:title',
    name: 'twitter:title',
    content: 'Koło Naukowe Integra AGH'
  },
  {
    hid: 'twitter:image',
    name: 'twitter:image',
    content: 'https://i.postimg.cc/T2NmZ0t5/integra-logo.png'
  },
  {
    hid: 'twitter:site',
    name: 'twitter:site',
    content: '@integra_agh'
  },
  {
    hid: 'twitter:creator',
    name: 'twitter:creator',
    content: '@integra_agh'
  }
]

const icons = [
  {
    rel: 'icon',
    type: 'image/png',
    href: 'https://i.postimg.cc/wBtrHt7Y/integra-logo-100x100.png',
    sizes: '32x32'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: 'https://i.postimg.cc/bNTWRcKW/integra-logo-250x249.png',
    sizes: '192x192'
  },
  {
    rel: 'apple-touch-icon',
    type: 'image/png',
    href: 'https://i.postimg.cc/bNTWRcKW/integra-logo-250x249.png',
    sizes: '192x192'
  }
]

export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in'
    },
    head: {
      title: APP_TITLE,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Koło Integra gromadzi ludzi z pasją, którzy poprzez realizację projektów rozwijają swoje zainteresowania. Integra to jest to!'
        },
        {
          name: 'msapplication-TileImage',
          content: 'https://i.postimg.cc/T2NmZ0t5/integra-logo.png'
        },
        ...properties,
        ...twitterProperties
      ],
      link: [...icons],
      htmlAttrs: {
        lang: 'pl'
      }
    }
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },

  css: [
    '@/assets/css/tailwind.css',
    '@/assets/css/main.css',
    '@/assets/css/markdown.css',
    '@/assets/css/treeview.css',
    'vue3-treeview/dist/style.css'
  ],
  components: true,

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  content: {
    documentDriven: true,
    ignores: ['README.md', 'LICENSE.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'SECURITY.md'],
    sources: {
      content: {
        driver: 'fs',
        prefix: '',
        base: resolve(__dirname, 'content/content')
      }
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode'
    // 'vue-sweetalert2/nuxt'
  ],

  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons'
    ]
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})
