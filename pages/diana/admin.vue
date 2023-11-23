<script setup lang="ts">
definePageMeta({
  middleware: ['admin']
})
</script>

<template>
  <main>
    <nuxt-link to="/diana" class="inline-flex text-2xl items-center font-semibold mb-2">
      <lazy-client-only>
        <fa-icon icon="fas fa-chevron-left" class="w-6 h-6 mr-4" />
      </lazy-client-only>
      Wróć do strony głównej
    </nuxt-link>

    <div class="diana-page-content mt-2 flex-grow mb-auto">
      <admin-nav />

      <NuxtPage />
    </div>
  </main>
</template>
