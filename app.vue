<script lang="ts">
import SiteFooter from '@/components/site-footer/site-footer.vue'

export default {
  name: 'App',
  components: {
    SiteFooter
  }
}
</script>

<template>
  <div class="min-h-screen w-full overflow-y-auto overflow-x-none flex flex-col">
    <NuxtLayout>
      <NuxtPage />

      <site-footer />
    </NuxtLayout>
  </div>
</template>
