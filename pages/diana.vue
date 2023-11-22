<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
  layout: 'diana'
})
</script>

<template>
  <div class="diana-page">
    <Head>
      <Title>DIANA</Title>
    </Head>

    <header>
      <h1>Witaj w systemie DIANA!</h1>
    </header>

    <NuxtPage />

    <footer>
      All rights reserved &copy; Koło Naukowe Integra AGH
    </footer>
  </div>
</template>
