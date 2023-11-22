<script setup lang="ts">
definePageMeta({
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

    <div class="diana-page-content mt-2 flex-grow mb-auto">
      <NuxtPage />
    </div>

    <diana-footer />
  </div>
</template>
