// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'nuxt3-boilerplate',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  css: ['@/assets/css/tailwind.css'],
  components: true,

  modules: [
    '@nuxt/content'
    // 'vue-sweetalert2/nuxt'
  ],

  content: {
    sources: {
      content: {
        driver: 'fs',
        prefix: '/docs',
        base: resolve(__dirname, 'content')
      }
    },
    github: {
      driver: 'github',
      prefix: '/blog',
      repo: `${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}`,
      token: process.env.GITHUB_TOKEN,
      branch: process.env.GITHUB_BRANCH,
      dir: '/content'
    }
  },

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
