<script setup lang="ts">
import ThemeSwitcher from '@/components/theme-switcher.vue'
import { APP_TITLE } from '@/settings/constants'
import getNavigationContent from '~/helpers/getNavigationContent'

import style from './site-navigation.module.css'

import type { ISimpleSitemap } from '~/types'

const navbarOpen = ref(false)

const classes = computed(() => style)

const { data: sitemap } = useAsyncData<ISimpleSitemap[]>('sitemap', getNavigationContent)

/**
 *
 * @param e
 */
function toggleSidebar(e: Event) {
  e.preventDefault()

  const toggleElement = e.target as HTMLElement
  const targetElementId = toggleElement.getAttribute('data-dropdown-toggle')

  if (!targetElementId) return

  const targetElement = document.getElementById(targetElementId)

  if (!targetElement) return

  targetElement.classList.toggle('hidden')
}
</script>

<template>
  <nav :class="classes['navbar']">
    <div class="flex flex-row flex-wrap items-center justify-between w-full mx-auto">
      <nuxt-link to="/" class="flex items-center">
        <img src="https://i.postimg.cc/0jVhbXr4/integra-icon.png" class="h-6 mr-3 sm:h-10" :alt="`${APP_TITLE} Logo`" />
      </nuxt-link>

      <div>
        <theme-switcher class="lg:hidden" />

        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          :class="classes['navbar-toggle']"
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

      <div id="navbar-dropdown" class="w-full lg:block lg:w-auto" :class="navbarOpen ? 'block' : 'hidden'">
        <ul :class="classes['navbar-ul']">
          <li v-for="site in sitemap" :key="site._path.slice(1)">
            <!-- TODO: Think about if we should show a list of article categories here -->
            <nuxt-link
              v-if="!site.children || site.children.length === 0 || site._path === '/articles'"
              :to="site._path"
              :class="`${classes['navbar-link']} ${
                site._path === $route.path ? classes['navbar-link--active'] : classes['navbar-link--inactive']
              }`"
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
                :class="`${classes['navbar-button']} ${
                  $route.path.startsWith(`${site._path}/`)
                    ? classes['navbar-link--active']
                    : classes['navbar-link--inactive']
                }`"
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
                <ul class="flex flex-col p-2 space-y-2 max-h-80 overflow-y-auto">
                  <li>
                    <nuxt-link
                      :to="site._path"
                      :class="`${classes['dropdown-link']} ${
                        site._path === $route.path ? classes['dropdown-link--active'] : classes['navbar-link--inactive']
                      }`"
                      :aria-current="site._path === $route.path ? 'page' : undefined"
                    >
                      {{ site.title }}
                    </nuxt-link>
                  </li>

                  <li v-for="child in site.children" :key="child.title">
                    <nuxt-link
                      :to="child._path"
                      :class="`${classes['dropdown-link']} ${
                        child._path === $route.path
                          ? classes['dropdown-link--active']
                          : classes['navbar-link--inactive']
                      }`"
                      :aria-current="child._path === $route.path ? 'page' : undefined"
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
