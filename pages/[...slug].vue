<script lang="ts">
import SiteNavigation from '~~/components/site-navigation.vue'

export default {
  name: 'BlogSlug',
  components: {
    SiteNavigation
  }
}
</script>

<template>
  <site-navigation />

  <main class="prose container mx-auto px-4">
    <ContentDoc />
  </main>
</template>
