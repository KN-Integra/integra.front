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
  <div>
    <VitePwaManifest />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
