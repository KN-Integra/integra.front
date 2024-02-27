<script setup lang="ts">
import { initFlowbite } from 'flowbite'

const { $pwa } = useNuxtApp()

onMounted(() => {
  if ($pwa?.offlineReady) {
    alert('App ready to work offline')
  }

  if ($pwa?.needRefresh) {
    const refresh = prompt('App needs refresh. Do you want to do that now?')

    if (!refresh) {
      return
    }

    reloadNuxtApp({
      persistState: true
    })
  }
})

onBeforeMount(() => {
  initFlowbite()
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
