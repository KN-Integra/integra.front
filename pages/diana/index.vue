<script setup lang="ts">
import { useUserStore } from '~/store/user.store'

const userStore = useUserStore()

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <main>
    <nuxt-link to="/diana/admin">Admin Panel</nuxt-link>
  </main>
</template>
