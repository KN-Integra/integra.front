<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <main>
    <nuxt-link to="/diana/admin">Admin Panel</nuxt-link>
  </main>
</template>
