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

const manifest = {
  name: 'Koło Naukowe Integra AGH',
  short_name: 'KN Integra',
  description:
    'Koło Integra gromadzi ludzi z pasją, którzy poprzez realizację projektów rozwijają swoje zainteresowania. Integra - to jest to!',
  theme_color: '#8B691C',
  background_color: '#D0C3A4',
  icons: icons.map((icon) => ({
    ...icon,
    src: icon.href
  }))
}

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

  routeRules: {
    '/v1/**': {
      cors: true,
      headers: {
        // CORS headers
        'Access-Control-Allow-Origin': '*', // 'http://example:6006', has to be set to the requesting domain that you want to send the credentials back to
        'Access-Control-Allow-Methods': '*', // 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': '*', // 'Origin, Content-Type, Accept, Authorization, X-Requested-With'
        'Access-Control-Expose-Headers': '*',
        // 'Access-Control-Max-Age': '7200', // 7200 = caching 2 hours (Chromium default), https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age#directives
      },
    },
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },

  css: [
    '@/assets/css/content.css',
    '@/assets/css/diana.css',
    '@/assets/css/flowbite.css',
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

  pwa: {
    devOptions: { enabled: true },
    registerType: 'autoUpdate',
    manifest
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/image',
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss'
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
  },

  runtimeConfig: {
    JWT_SECRET: process.env.NUXT_JWT_SECRET,
    JWT_EXPIRES_IN: process.env.NUXT_JWT_EXPIRES_IN,
    JWT_ISSUER: process.env.NUXT_JWT_ISSUER
  }
})
