<script lang="ts">
export default {
  name: 'ThemeSwitcher',
  data(): {
    theme: 'light' | 'dark'
  } {
    return {
      theme: 'light'
    }
  },
  beforeMount(): void {
    const theme = localStorage.getItem('theme')
    const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    if (!(themeMediaQuery.matches || theme) || theme === 'light') {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      this.$data.theme = 'light'
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      this.$data.theme = 'dark'
    }

    themeMediaQuery.addEventListener('change', (e) => {
      this.$data.theme = themeMediaQuery.matches ? 'dark' : 'light'
      localStorage.setItem('theme', this.$data.theme)

      if (e.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    })
  },
  methods: {
    toggleTheme(): void {
      if (!process.client) {
        return
      }

      document.documentElement.classList.toggle('dark')
      localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light')
      this.$data.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    }
  }
}
</script>

<template>
  <button
    type="button"
    class="inline-flex relative gap-x-3 px-1 py-1 border-solid border-2 rounded-3xl border-black dark:border-white"
    title="Zmień motyw"
    aria-label="Zmień motyw"
    @click="toggleTheme"
  >
    <lazy-client-only>
      <fa-icon icon="fa-solid fa-moon" class="h-4 w-4" />
      <fa-icon icon="fa-regular fa-sun" class="h-4 w-4" />
      <div
        class="absolute rounded-xl h-5 w-5 top-0.5 left-0.5 dark:left-[calc(100%_-_22px)] duration-300 ease-in-out bg-black dark:bg-white"
      ></div>
    </lazy-client-only>
  </button>
</template>
