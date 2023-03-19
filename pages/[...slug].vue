<script lang="ts">
import SiteNavigation from '@/components/site-navigation.vue'
import EmptyDoc from '@/components/slots/empty-doc.vue'
import NotFound from '@/components/slots/not-found.vue'

export default {
  name: 'BlogSlug',
  components: {
    SiteNavigation,
    EmptyDoc,
    NotFound
  }
}
</script>

<template>
  <site-navigation />

  <main class="prose container mx-auto px-4">
    <content-doc>
      <template #not-found>
        <not-found />
      </template>

      <template #empty>
        <empty-doc />
      </template>
    </content-doc>
  </main>
</template>
