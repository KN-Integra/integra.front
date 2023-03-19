<script lang="ts">
import { PropType } from 'nuxt/dist/app/compat/vue-demi'

interface ImageProp {
  src: string
  alt: string
}

export default {
  name: 'CarouselComponent',
  props: {
    images: {
      type: Object as PropType<ImageProp[]>,
      required: true
    }
  },
  data: () => ({
    activeIndex: 0
  }),
  methods: {
    setActiveIndex(index: number) {
      if (index < 0) {
        this.activeIndex = this.images.length - 1
      } else if (index >= this.images.length) {
        this.activeIndex = 0
      } else {
        this.activeIndex = index
      }
    }
  }
}
</script>

<template>
  <div id="default-carousel" class="relative w-full" data-carousel="slide">
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
      <!-- Items -->
      <div
        v-for="(image, index) in images"
        :id="`image-${index}`"
        :key="image.alt"
        class="duration-700 ease-in-out h-full"
        :class="index === activeIndex ? 'block' : 'hidden'"
        data-carousel-item
      >
        <img
          class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-scale-down"
          :src="image.src"
          :alt="image.alt"
        />
      </div>
    </div>
    <!-- Slider indicators -->
    <div
      class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2 bg-white/30 dark:bg-gray-800/30 px-3 py-2 rounded-md"
    >
      <button
        v-for="(image, index) in images"
        :id="`button-${index}`"
        :key="`button-${index}`"
        type="button"
        :class="
          index === activeIndex
            ? 'bg-black dark:bg-white border-black dark:border-white'
            : 'bg-gray-500 border-gray-500 hover:bg-gray-600 dark:hover:bg-gray-400 hover:border-gray-600 dark:hover:border-gray-400'
        "
        class="w-3 h-3 rounded-full border focus:outline-none backdrop-invert"
        aria-current="true"
        :aria-label="`Slide ${index}`"
        :data-carousel-slide-to="index"
        @click="setActiveIndex(index)"
      ></button>
    </div>
    <!-- Slider controls -->
    <button
      type="button"
      class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-prev
      @click="setActiveIndex(activeIndex - 1)"
    >
      <span
        class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <lazy-client-only>
          <fa-icon icon="fa-solid fa-chevron-left" class="w-5 h-5 text-white sm:w-6 sm:h-6" />
        </lazy-client-only>
        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button
      type="button"
      class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-next
      @click="setActiveIndex(activeIndex + 1)"
    >
      <span
        class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <lazy-client-only>
          <fa-icon icon="fa-solid fa-chevron-right" class="w-5 h-5 text-white sm:w-6 sm:h-6" />
        </lazy-client-only>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>
</template>
