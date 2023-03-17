<script lang="ts">
import IndexNavigation from '@/components/IndexNavigation.vue'

export default {
  name: 'IndexPage',
  components: {
    IndexNavigation
  }
}
</script>

<template>
  <header class="relative">
    <div class="absolute z-20 w-full">
      <IndexNavigation />
      <div class="tracking-4">
        Koło Integra gromadzi ludzi z pasją, którzy poprzez realizację projektów rozwijają swoje zainteresowania.
        Integra to jest to!
      </div>
    </div>
    <picture
      class="relative opacity-50 after:block after:w-full after:h-full after:opacity-50 after:bg-gray-400 after:dark:bg-gray-600 after:absolute after:top-0 after:left-0 after:z-10 after:content-['']"
    >
      <img
        src="https://i.postimg.cc/fLHc2Cfc/header-large.jpg"
        alt="INTegra large header"
        class="w-full hidden lg:block"
      />
      <img
        src="https://i.postimg.cc/RFC1LyKC/header-mobile.jpg"
        alt="INTegra mobile header"
        class="w-full block lg:hidden"
      />
    </picture>
  </header>

  <main class="prose container mx-auto px-4">
    <ContentDoc />
  </main>
</template>
