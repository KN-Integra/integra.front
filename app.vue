<script setup lang="ts">
const { $pwa } = useNuxtApp()

onMounted(() => {
  if ($pwa?.offlineReady) {
    alert('App ready to work offline')
  }

  // $pwa.update()
})
</script>

<template>
  <div class="min-h-screen w-full overflow-y-auto overflow-x-none flex flex-col">
    <VitePwaManifest />
    <NuxtPage />

    <large-footer />
    <site-footer />
  </div>
</template>
