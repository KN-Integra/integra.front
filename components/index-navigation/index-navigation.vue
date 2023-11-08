<script lang="ts">
import ThemeSwitcher from '@/components/theme-switcher.vue'
import { APP_TITLE } from '@/settings/constants'

import style from './index-navigation.module.css'

interface SiteNavData {
  navbarOpen: boolean
  appTitle: string
}

export default {
  name: 'IndexNavigationComponent',
  components: {
    ThemeSwitcher
  },
  async setup() {
    const { data: navigation } = await useAsyncData('navigation', () => {
      return fetchContentNavigation()
    })

    if (!navigation.value) return {}

    const nav = navigation.value[0].children

    if (!(nav && nav.length)) return {}

    const sitemap = nav
      .filter((u) => isNaN(Number(u._path.split('/').at(-1))))
      .map((u) => ({
        ...u,
        children: u.children ? u.children.filter((c) => c._path !== u._path) : undefined
      }))

    return {
      sitemap
    }
  },
  data: (): SiteNavData => ({
    navbarOpen: false,
    appTitle: APP_TITLE
  }),
  computed: {
    classes() {
      return style
    }
  },
  methods: {
    toggleSidebar(e: Event) {
      e.preventDefault()

      const toggleElement = e.target as HTMLElement
      const targetElementId = toggleElement.getAttribute('data-dropdown-toggle')

      if (!targetElementId) return

      const targetElement = document.getElementById(targetElementId)

      if (!targetElement) return

      targetElement.classList.toggle('hidden')
    }
  }
}
</script>

<template>
  <nav class="p-2 w-full lg:mt-8 relative">
    <div class="flex flex-row flex-wrap lg:flex-col items-center justify-between w-full mx-auto gap-4">
      <nuxt-link to="/" class="flex items-center">
        <img
          src="https://i.postimg.cc/0jVhbXr4/integra-icon.png"
          class="h-8 mr-3 sm:h-10 lg:h-16"
          :alt="`${appTitle} Logo`"
        />
      </nuxt-link>

      <div>
        <theme-switcher class="lg:hidden" />

        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          :class="classes['navbar-button']"
          aria-controls="navbar-dropdown"
          :aria-expanded="navbarOpen"
          @click="navbarOpen = !navbarOpen"
        >
          <span class="sr-only">Open main menu</span>
          <lazy-client-only>
            <fa-icon icon="fa-solid fa-bars" class="h-4 w-4" />
          </lazy-client-only>
        </button>
      </div>

      <div
        id="navbar-dropdown"
        class="w-full lg:flex lg:justify-center"
        :class="`${classes['navbar-dropdown']} ${navbarOpen ? 'block' : classes['hide']}`"
      >
        <ul :class="classes['links-ul']">
          <li v-for="site in sitemap" :key="site._path.slice(1)">
            <!-- TODO: Think about if we should show a list of article categories here -->
            <nuxt-link
              v-if="!site.children || site.children.length === 0 || site._path === '/articles'"
              :to="site._path"
              :class="classes['navbar-link']"
              :aria-current="site._path === $route.path ? 'page' : undefined"
            >
              {{ site.title }}
            </nuxt-link>

            <div
              v-else
              class="relative"
              :data-dropdown-toggle="`dropdown-${site._path.slice(1)}`"
              @blur="toggleSidebar"
            >
              <button
                :id="`dropdown-button-${site._path.slice(1)}`"
                type="button"
                :data-dropdown-toggle="`dropdown-${site._path.slice(1)}`"
                class="!flex items-center justify-start"
                :class="classes['navbar-link']"
                @click="toggleSidebar"
              >
                {{ site.title }}

                <lazy-client-only>
                  <fa-icon icon="fa-solid fa-chevron-down" class="ml-2 h-3 w-3" />
                </lazy-client-only>
              </button>

              <div
                :id="`dropdown-${site._path.slice(1)}`"
                data-dropdown-menu
                class="absolute hidden z-10 w-full mt-2 lg:mt-4 overflow-hidden bg-white rounded-lg shadow-lg lg:w-48 dark:bg-zinc-700 lg:dark:text-white lg:dark:border-zinc-700 lg:dark:shadow-none"
              >
                <ul class="flex flex-col p-2 space-y-2">
                  <li>
                    <nuxt-link
                      :to="site._path"
                      class="block py-2 pl-3 pr-4 lg:text-sm text-zinc-700 rounded hover:bg-zinc-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-zinc-400 lg:dark:hover:text-white dark:hover:bg-zinc-600 dark:hover:text-white lg:dark:hover:bg-transparent"
                      :aria-current="site._path === $route.path ? 'page' : undefined"
                    >
                      {{ site.title }}
                    </nuxt-link>
                  </li>

                  <li v-for="child in site.children" :key="child.title">
                    <nuxt-link
                      :to="child._path"
                      class="block py-2 pl-3 pr-4 lg:text-sm text-zinc-700 rounded hover:bg-zinc-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-zinc-400 lg:dark:hover:text-white dark:hover:bg-zinc-600 dark:hover:text-white lg:dark:hover:bg-transparent"
                      :aria-current="child._path === $route.path ? 'page' : undefined"
                    >
                      {{ child.title }}
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="!hidden lg:!block !px-0" :class="classes['navbar-link']">
            <theme-switcher />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
