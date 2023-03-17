<script lang="ts">
export default {
  name: 'NavigationComponent',
  data: () => ({
    navbarOpen: false,
    sidebarOpen: false,
    appTitle: 'INTegra',
    menuItems: [
      {
        title: 'Aktualności',
        type: 'link',
        path: '/news'
      },
      {
        title: 'O nas',
        type: 'link',
        path: '/about'
      },
      {
        title: 'Projekty',
        type: 'dropdown',
        path: '/projects',
        children: [
          {
            title: 'Aktualne projekty',
            type: 'link',
            path: '/projects/current'
          },
          {
            title: 'Zakończone projekty',
            type: 'link',
            path: '/projects/finished'
          }
        ]
      },
      {
        title: 'Członkowie',
        type: 'link',
        path: '/members'
      },
      {
        title: 'Współpraca',
        type: 'link',
        path: '/cooperation'
      },
      {
        title: 'Kontakt',
        type: 'link',
        path: '/contact'
      },
      {
        title: 'ADR',
        type: 'link',
        path: '/adr'
      }
    ]
  })
}
</script>

<template>
  <nav class="p-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
    <div class="flex flex-wrap items-center justify-between w-full mx-auto">
      <a href="#" class="flex items-center">
        <img src="https://i.postimg.cc/0jVhbXr4/integra-icon.png" class="h-6 mr-3 sm:h-10" :alt="`${appTitle} Logo`" />
      </a>
      <button
        data-collapse-toggle="navbar-dropdown"
        type="button"
        class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
        <ul
          class="flex flex-col mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700"
        >
          <li v-for="item in menuItems" :key="item.title">
            <!-- class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0 lg:dark:text-white dark:bg-blue-600 lg:dark:bg-transparent" -->
            <!-- aria-current="page" -->
            <a
              v-if="item.type === 'link'"
              :href="item.path"
              class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
            >
              {{ item.title }}
            </a>

            <div
              v-if="item.type === 'dropdown'"
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
                class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 lg:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 lg:dark:hover:bg-transparent"
              >
                {{ item.title }}
                <fa-icon icon="fa-solid fa-chevron-down" class="ml-2 h-3 w-3" />
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
                      class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-600 dark:hover:text-white lg:dark:hover:bg-transparent"
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
