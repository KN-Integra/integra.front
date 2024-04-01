<script setup lang="ts">
// @ts-expect-error - TS doesn't know about CSS modules
import style from './site-footer.module.css'

import type { ISimpleSitemap } from '~/types'

const classes = computed(() => style)
const year = computed(() => new Date().getFullYear())

const { data: sitemap } = useAsyncData<ISimpleSitemap[]>('sitemap', async () => {
  const navigation = await fetchContentNavigation()

  if (navigation.length === 0) return []

  const nav = navigation[0].children

  if (!(nav && nav.length)) return []

  return nav
    .filter((u) => isNaN(Number(u._path.split('/').at(-1))))
    .map((u) => ({
      ...u,
      children: u.children ? u.children.filter((c) => c._path !== u._path) : undefined
    }))
})
</script>

<template>
  <footer :class="classes['site-footer']">
    <div class="w-full mx-auto container md:p-6 p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-zinc-500 sm:text-center dark:text-zinc-400">
        © {{ year }} <nuxt-link to="/" class="hover:underline">Integra</nuxt-link> -
        <nuxt-link
          to="http://www.integra.agh.edu.pl/wp-content/uploads/2021/11/Regulamin-KN-Integra-01.07.2021.pdf"
          class="hover:underline"
        >
          Statut
        </nuxt-link>
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm text-zinc-500 dark:text-zinc-400 sm:mt-0">
        <li v-for="item in sitemap" :key="item._path" class="mr-4 md:mr-6 last:m-0">
          <nuxt-link :to="item._path" class="hover:underline">{{ item.title }}</nuxt-link>
        </li>
      </ul>
    </div>
  </footer>
</template>
