<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <main>
    <h2 class="mb-2">System DIANA</h2>

    <user-nav />

    <div class="diana-page-content mt-2 flex-grow mb-auto">
      <NuxtPage />
    </div>
  </main>
</template>
