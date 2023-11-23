<script setup lang="ts">
import { useUserStore } from '~/store/user.store'

const userStore = useUserStore()

const loggedIn = computed(() => userStore.tokenType && userStore.accessToken)

/**
 *
 */
async function logout() {
  try {
    await userStore.logout()

    navigateTo('/diana/login')
  } catch (e) {
    alert((e as Error).message)
  }
}
</script>

<template>
  <header class="p-4 inline-flex items-center justify-between w-full bg-white dark:bg-zinc-950 shadow-lg">
    <nuxt-link to="/" class="flex items-center text-2xl font-semibold text-zinc-900 dark:text-white">
      <nuxt-img class="w-28 md:w-44" src="https://i.postimg.cc/0jVhbXr4/integra-icon.png" alt="logo" />
    </nuxt-link>

    <h1 class="m-0 hidden sm:inline text-2xl md:text-3xl lg:text-4xl">Witaj w systemie DIANA!</h1>

    <div class="w-28 md:w-44 inline-flex justify-end items-center gap-x-2">
      <button
        v-if="loggedIn"
        type="button"
        class="flex items-center justify-center w-10 h-10 border rounded-md border-zinc-200 dark:border-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-600"
        @click="logout()"
      >
        <lazy-client-only>
          <fa-icon icon="fa-solid fa-sign-out-alt" class="w-5 h-5" />
        </lazy-client-only>
      </button>

      <theme-switcher />
    </div>
  </header>
</template>
