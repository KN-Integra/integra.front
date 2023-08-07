<script lang="ts">
import LargeFooter from '@/components/large-footer/large-footer.vue'
import SiteFooter from '@/components/site-footer/site-footer.vue'

export default {
  name: 'App',
  components: {
    LargeFooter,
    SiteFooter
  }
}
</script>

<template>
  <div class="min-h-screen w-full overflow-y-auto overflow-x-none flex flex-col">
    <NuxtPage />

    <div class="mt-auto">
      <large-footer />
      <site-footer />
    </div>
  </div>
</template>
