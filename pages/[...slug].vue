<script lang="ts">
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'BlogSlug',
  components: {
    Navigation
  }
}
</script>

<template>
  <Navigation />

  <main class="prose container mx-auto px-4">
    <ContentDoc />
  </main>
</template>
