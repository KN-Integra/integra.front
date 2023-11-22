<script setup lang="ts">
import { useUserStore } from '~/store/user.store'

const userStore = useUserStore()

definePageMeta({
  title: 'DIANA',
  description: 'System do zarządzania kołem naukowym Integra',
  image: 'https://i.postimg.cc/0jVhbXr4/integra-icon.png'
  // middleware: ['auth']
})

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
  <section>
    <button @click="logout()">Logout</button>
  </section>
</template>
