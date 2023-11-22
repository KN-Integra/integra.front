<script setup lang="ts">
import { initFlowbite } from 'flowbite'

onBeforeMount(() => {
  initFlowbite()
})
</script>

<template>
  <div class="index-page">
    <Head>
      <Title>Koło Naukowe Integra AGH</Title>
    </Head>

    <index-header />

    <main class="container mx-auto px-4"></main>
  </div>
</template>
