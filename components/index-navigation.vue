<script lang="ts">
import ThemeSwitcher from './theme-switcher.vue'

import { APP_TITLE, MENU_ITEMS } from '@/settings/constants'

export default {
  name: 'IndexNavigationComponent',
  components: {
    ThemeSwitcher
  },
  data: () => ({
    navbarOpen: false,
    sidebarOpen: false,
    appTitle: APP_TITLE,
    menuItems: MENU_ITEMS
  })
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
          class="inline-flex items-center p-2 ml-3 text-sm text-gray-100 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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

      <div class="w-full lg:flex lg:justify-center" id="navbar-dropdown" :class="navbarOpen ? 'block' : 'hidden'">
        <ul
          class="w-[calc(100%_-_1rem)] lg:w-max flex flex-col absolute rounded-lg p-2 gap-2 lg:gap-8 lg:flex-row lg:mt-4 lg:text-xl lg:font-medium border border-gray-100 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 lg:bg-transparent lg:border-none lg:dark:bg-transparent lg:darkborder-none"
        >
          <li v-for="item in menuItems" :key="item.title">
            <!-- class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0 lg:dark:text-white dark:bg-blue-600 lg:dark:bg-transparent" -->
            <!-- aria-current="page" -->
            <nuxt-link
              v-if="item.type === 'link'"
              :to="item.path"
              class="block py-2 pl-3 pr-4 rounded lg:border-0 lg:p-0 text-gray-700 hover:text-black hover:bg-white lg:hover:bg-transparent dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 lg:dark:hover:bg-transparent"
            >
              {{ item.title }}
            </nuxt-link>

            <div v-else-if="item.type === 'dropdown'" class="relative" @blur="sidebarOpen = false">
              <button
                type="button"
                @click="sidebarOpen = !sidebarOpen"
                id="dropdownLinkChildren"
                data-dropdown-toggle="dropdownNavbar"
                class="flex items-center justify-start w-full py-2 pl-3 pr-4 rounded lg:border-0 lg:p-0 text-gray-700 hover:text-black hover:bg-white lg:hover:bg-transparent dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 lg:dark:hover:bg-transparent"
              >
                {{ item.title }}
                <lazy-client-only>
                  <fa-icon icon="fa-solid fa-chevron-down" class="ml-2 h-3 w-3" />
                </lazy-client-only>
              </button>
              <div
                id="dropdownNavbar"
                data-dropdown-menu
                class="absolute z-10 w-full mt-2 lg:mt-4 overflow-hidden bg-white rounded-lg shadow-lg lg:w-48 dark:bg-gray-700 lg:dark:text-white lg:dark:border-gray-700 lg:dark:shadow-none"
                :class="sidebarOpen ? 'block' : 'hidden'"
              >
                <ul class="flex flex-col p-2 space-y-2">
                  <li v-for="child in item.children" :key="child.title">
                    <nuxt-link
                      :to="child.path"
                      class="block py-2 pl-3 pr-4 lg:text-sm text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-600 dark:hover:text-white lg:dark:hover:bg-transparent"
                    >
                      {{ child.title }}
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="hidden lg:block">
            <theme-switcher />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
