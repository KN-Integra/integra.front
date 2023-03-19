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
  <div>
    <header>
      <site-navigation />
    </header>

    <main class="prose container mx-auto mt-8 px-4 flex flex-row gap-4 justify-center">
      <content-doc>
        <template #not-found>
          <not-found />
        </template>

        <template #empty>
          <empty-doc />
        </template>
      </content-doc>
    </main>
  </div>
</template>
