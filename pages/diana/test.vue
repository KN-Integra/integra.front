<script setup lang="ts">
definePageMeta({
  title: 'DIANA',
  description: 'System do zarządzania kołem naukowym Integra',
  image: 'https://i.postimg.cc/0jVhbXr4/integra-icon.png'
  // middleware: ['auth']
})
</script>

<template>
  <main>
    <h1>Witaj w systemie DIANA!</h1>

    <nuxt-link to="/diana/login">login</nuxt-link>
    <nuxt-link to="/diana/test">login</nuxt-link>
  </main>
</template>
