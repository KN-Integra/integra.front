<script lang="ts">
import IndexNavigation from '@/components/index-navigation/index-navigation.vue'

// @ts-expect-error
import style from './index-header.module.css'

export default {
  name: 'IndexHeader',
  components: {
    IndexNavigation
  },
  computed: {
    classes() {
      return style
    }
  }
}
</script>

<template>
  <header :class="classes['index-header']">
    <div class="container mx-auto w-full h-full flex flex-col items-center gap-8">
      <index-navigation />

      <hr class="w-full h-px border-0 bg-zinc-200 dark:bg-zinc-600 hidden sm:block" />

      <div class="tracking-[0.25rem] text-center md:text-2xl lg:w-5/6 hidden sm:block">
        Koło Integra gromadzi ludzi z pasją, którzy poprzez realizację projektów rozwijają swoje zainteresowania.
        Integra to jest to!
      </div>

      <hr class="w-full h-px border-0 bg-zinc-200 dark:bg-zinc-600 hidden sm:block" />

      <div class="text-center capitalize flex flex-col items-center gap-6 tracking-[0.25rem]">
        <span class="md:text-4xl">KOŁO NAUKOWE INTEGRA</span>
        <nuxt-link
          to="https://www.facebook.com/knintegra"
          target="_blank"
          rel="noopener noreferrer"
          class="py-4 px-8 text-sm font-light focus:outline-none border text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-black focus:ring-4 dark:text-orange-400 dark:border-orange-400 dark:hover:bg-orange-400 dark:hover:text-white"
        >
          POLUB NAS NA FACEBOOKU
        </nuxt-link>
      </div>
    </div>
  </header>
</template>
