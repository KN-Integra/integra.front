<script setup lang="ts">
definePageMeta({
  title: 'DIANA',
  description: 'System do zarządzania kołem naukowym Integra',
  image: 'https://i.postimg.cc/0jVhbXr4/integra-icon.png',
  key: (route) => route.fullPath,
  layout: 'diana'
})
</script>

<template>
  <div class="diana-page min-h-screen flex flex-col">
    <Head>
      <Title>DIANA</Title>
    </Head>

    <diana-header />

    <div class="diana-page-content px-2 md:px-4 lg:px-6 mt-2 flex-grow mb-auto">
      <NuxtPage />
    </div>

    <diana-footer />
  </div>
</template>
