<script lang="ts">
import IndexNavigation from '~~/components/index-navigation.vue'

export default {
  name: 'IndexPage',
  components: {
    IndexNavigation
  }
}
</script>

<template>
  <Head>
    <Title>Koło Naukowe Integra AGH</Title>
  </Head>

  <header
    class="relative flex flex-col items-center bg-cover bg-blend-overlay dark:bg-blend-multiply bg-white/75 dark:bg-slate-800/75 bg-header-mobile lg:bg-header-desktop py-4 px-2 md:p-0 pb-12 md:pb-24 lg:pb-32"
  >
    <div class="container mx-auto w-full flex flex-col items-center gap-8">
      <index-navigation />

      <hr class="w-5/6 h-px border-0 bg-gray-200 dark:bg-gray-600 lg:mt-8" />

      <div class="tracking-[0.25rem] text-center md:text-2xl lg:w-5/6">
        Koło Integra gromadzi ludzi z pasją, którzy poprzez realizację projektów rozwijają swoje zainteresowania.
        Integra to jest to!
      </div>

      <hr class="w-5/6 h-px border-0 bg-gray-200 dark:bg-gray-600" />

      <div class="capitalize flex flex-col items-center gap-6 tracking-[0.25rem]">
        <span class="md:text-4xl">KOŁO NAUKOWE INTEGRA</span>
        <nuxt-link
          to="https://www.facebook.com/knintegra"
          target="_blank"
          rel="noopener noreferrer"
          class="py-4 px-8 text-sm font-light focus:outline-none border text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-black focus:ring-4 dark:text-orange-400 dark:border-orange-400 dark:hover:bg-orange-400 dark:hover:text-white"
        >
          POLUB NAS NA FACEBOOKU
        </nuxt-link>
      </div>
    </div>

    <!-- <picture
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
    </picture> -->
  </header>

  <main class="prose container mx-auto px-4"></main>
</template>
