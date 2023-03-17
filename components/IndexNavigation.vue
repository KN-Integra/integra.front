<script lang="ts">
import { APP_TITLE, MENU_ITEMS } from '@/settings/constants'

export default {
  name: 'IndexNavigationComponent',
  data: () => ({
    navbarOpen: false,
    sidebarOpen: false,
    appTitle: APP_TITLE,
    menuItems: MENU_ITEMS
  })
}
</script>

<template>
  <nav class="p-2 w-full lg:mt-16">
    <div class="flex flex-row flex-wrap lg:flex-col items-center justify-between w-full mx-auto">
      <a href="#" class="flex items-center">
        <img
          src="https://i.postimg.cc/0jVhbXr4/integra-icon.png"
          class="h-8 mr-3 sm:h-10 lg:h-16"
          :alt="`${appTitle} Logo`"
        />
      </a>
      <button
        data-collapse-toggle="navbar-dropdown"
        type="button"
        class="inline-flex items-center p-2 ml-3 text-sm text-gray-100 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-dropdown"
        :aria-expanded="navbarOpen"
        @click="navbarOpen = !navbarOpen"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div class="w-full lg:block lg:w-auto" id="navbar-dropdown" :class="navbarOpen ? 'block' : 'hidden'">
        <ul class="flex flex-col mt-4 rounded-lg lg:flex-row lg:space-x-8 lg:mt-4 lg:text-xl lg:font-medium">
          <li v-for="item in menuItems" :key="item.title">
            <!-- class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0 lg:dark:text-white dark:bg-blue-600 lg:dark:bg-transparent" -->
            <!-- aria-current="page" -->
            <a
              v-if="item.type === 'link'"
              :href="item.path"
              class="block py-2 pl-3 pr-4 rounded lg:border-0 lg:p-0 text-gray-700 hover:text-black hover:bg-white lg:hover:bg-transparent dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 lg:dark:hover:bg-transparent"
            >
              {{ item.title }}
            </a>

            <div
              v-else-if="item.type === 'dropdown'"
              class="relative"
              @click="sidebarOpen = !sidebarOpen"
              @keypress="
                (e) => {
                  if (e.key === 'Enter') sidebarOpen = true
                  else if (e.key === 'Escape') sidebarOpen = false
                }
              "
              @blur="sidebarOpen = false"
              @focus="sidebarOpen = true"
            >
              <button
                type="button"
                @click="sidebarOpen = !sidebarOpen"
                @blur="sidebarOpen = false"
                @focus="sidebarOpen = true"
                id="dropdownNavbarLink"
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
                    <a
                      :href="child.path"
                      class="block py-2 pl-3 pr-4 lg:text-sm text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-600 dark:hover:text-white lg:dark:hover:bg-transparent"
                    >
                      {{ child.title }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
