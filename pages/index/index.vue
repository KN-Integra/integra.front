<script lang="ts">
import IndexHeader from '@/components/index-header/index-header.vue'

export default {
  name: 'IndexPage',
  components: {
    IndexHeader
  }
}
</script>

<template>
  <div class="index-page">
    <Head>
      <Title>Koło Naukowe Integra AGH</Title>
    </Head>

    <index-header />

    <main class="container mx-auto px-4"></main>
  </div>
</template>
