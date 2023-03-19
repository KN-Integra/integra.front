<script lang="ts">
import IndexHeader from '@/components/index-page/index-header/index-header.vue'

export default {
  name: 'IndexPage',
  components: {
    IndexHeader
  }
}
</script>

<template>
  <div>
    <Head>
      <Title>Koło Naukowe Integra AGH</Title>
    </Head>

    <index-header />

    <main class="prose container mx-auto px-4"></main>
  </div>
</template>
