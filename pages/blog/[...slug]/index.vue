<script lang="ts">
import EmptyDoc from '@/components/slots/empty-doc.vue'
import NotFound from '@/components/slots/not-found.vue'

export default {
  name: 'BlogSlug',
  components: {
    EmptyDoc,
    NotFound
  }
}
</script>

<template>
  <div class="content-page markdown-content">
    <header>
      <site-navigation />
    </header>

    <main class="prose prose-sm md:prose-lg dark:prose-invert container mx-auto my-8 px-4 lg:px-0">
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
