<script lang="ts">
// @ts-expect-error - TS doesn't know about CSS modules
import style from './site-footer.module.css'

export default {
  name: 'SiteFooter',
  layout: 'default',
  async setup() {
    const { data: navigation } = await useAsyncData('navigation', () => {
      return fetchContentNavigation()
    })

    if (!navigation.value) return {}

    const sitemap = navigation.value
      .filter((u) => u.title && (u._path.match(/\//g) || []).length === 1 && u._path !== '/')
      .filter((u) => !Number(u._path.replace('/', '')) && u._path !== '/teapot')

    return {
      sitemap
    }
  },
  computed: {
    classes() {
      return style
    },
    year() {
      return new Date().getFullYear()
    }
  }
}
</script>

<template>
  <footer :class="classes['site-footer']">
    <div class="w-full mx-auto container md:p-6 p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © {{ year }} <nuxt-link to="/" class="hover:underline">Integra</nuxt-link> -
        <nuxt-link
          to="http://www.integra.agh.edu.pl/wp-content/uploads/2021/11/Regulamin-KN-Integra-01.07.2021.pdf"
          class="hover:underline"
        >
          Statut
        </nuxt-link>
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li v-for="item in sitemap" :key="item._path" class="mr-4 md:mr-6 last:m-0">
          <nuxt-link :to="item._path" class="hover:underline">{{ item.title }}</nuxt-link>
        </li>
      </ul>
    </div>
  </footer>
</template>
