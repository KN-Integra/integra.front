<script lang="ts">
import { APP_TITLE, MENU_ITEMS } from '@/settings/constants'

export default {
  name: 'NavigationComponent',
  data: () => ({
    navbarOpen: false,
    sidebarOpen: false,
    appTitle: APP_TITLE,
    menuItems: MENU_ITEMS
  })
}
</script>

<template>
  <nav class="p-2 bg-white border-b border-b-gray-200 dark:bg-gray-900 dark:border-b-gray-700">
    <div class="flex flex-row flex-wrap items-center justify-between w-full mx-auto">
      <nuxt-link to="/" class="flex items-center">
        <img src="https://i.postimg.cc/0jVhbXr4/integra-icon.png" class="h-6 mr-3 sm:h-10" :alt="`${appTitle} Logo`" />
      </nuxt-link>

      <div>
        <theme-switcher class="lg:hidden" />

        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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

      <div class="w-full lg:block lg:w-auto" id="navbar-dropdown" :class="navbarOpen ? 'block' : 'hidden'">
        <ul
          class="flex flex-col mt-4 items-center rounded-lg border border-gray-100 bg-gray-50 p-2 gap-2 lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700"
        >
          <li v-for="item in menuItems" :key="item.title">
            <!-- class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0 lg:dark:text-white dark:bg-blue-600 lg:dark:bg-transparent" -->
            <!-- aria-current="page" -->
            <nuxt-link
              v-if="item.type === 'link'"
              :to="item.path"
              class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
            >
              {{ item.title }}
            </nuxt-link>

            <div v-else-if="item.type === 'dropdown'" class="relative" @blur="sidebarOpen = false">
              <button
                type="button"
                @click="sidebarOpen = !sidebarOpen"
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 lg:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 lg:dark:hover:bg-transparent"
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
                      class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-600 dark:hover:text-white lg:dark:hover:bg-transparent"
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
