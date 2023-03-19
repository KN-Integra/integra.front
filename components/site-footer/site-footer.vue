<script lang="ts">
import { SitemapXML } from '@/types/SitemapXML'

// @ts-expect-error - TS doesn't know about CSS modules
import style from './site-footer.module.css'

export default {
  name: 'SiteFooter',
  layout: 'default',
  data(): {
    sitemap: {
      loc: string
      title: string
    }[]
  } {
    return {
      sitemap: []
    }
  },
  computed: {
    classes() {
      return style
    },
    year() {
      return new Date().getFullYear()
    }
  },
  async beforeCreate() {
    if (!process.client) return

    const {
      urlset: { url }
    } = await $fetch<SitemapXML>('/sitemap')

    this.$data.sitemap = url
      .map((u) => {
        return {
          // eslint-disable-next-line no-restricted-globals
          loc: u.loc._text.replace(location.origin, ''),
          title: u.title?._text || ''
        }
      })
      .filter((u) => u.title && (u.loc.match(/\//g) || []).length === 1 && u.loc !== '/')
      .filter((u) => !Number(u.loc.replace('/', '')) && u.loc !== '/teapot')
  }
}
</script>

<template>
  <footer :class="classes['site-footer']">
    <div class="w-full mx-auto container md:p-6 p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © {{ year }} <nuxt-link to="/" class="hover:underline">Integra</nuxt-link> - Wszelkie prawa zastrzeżone
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li v-for="item in sitemap" :key="item.loc" class="mr-4 md:mr-6 last:m-0">
          <nuxt-link :to="item.loc" class="hover:underline">{{ item.title }}</nuxt-link>
        </li>
      </ul>
    </div>
  </footer>
</template>
