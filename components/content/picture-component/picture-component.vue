<script setup lang="ts">
enum SizeName {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl'
}

enum ImageSize {
  'xs' = '320px',
  'sm' = '640px',
  'md' = '768px',
  'lg' = '1024px',
  'xl' = '1280px',
  'xxl' = '1536px'
}

interface TagProps {
  alt: string
}

interface PictureTagProps extends TagProps {
  images: { src: string; size: SizeName }[]
}

interface ImageTagProps extends TagProps {
  image: {
    src: string
    size: SizeName
  }
}

const $props = defineProps<PictureTagProps | ImageTagProps>()

const backdropRef = ref<HTMLElement>()

const fullScreen = ref(false)

const transitionEnded = ref(true)

const backdropClassName = computed(() => {
  const base =
    'fixed w-screen h-screen inset-0 flex items-center justify-center backdrop-blur-md transition-opacity duration-700 ease-in-out'

  const fs = fullScreen.value ? 'opacity-100' : 'opacity-0'

  const t = !fullScreen.value && transitionEnded.value ? '-z-10' : ''
  const notT = !transitionEnded.value ? 'z-20' : ''

  return `${base} ${fs} ${t} ${notT}`
})

onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      fullScreen.value = false
    }
  })

  backdropRef.value?.addEventListener('transitionstart', () => {
    if (fullScreen.value) {
      transitionEnded.value = false
    }
  })

  backdropRef.value?.addEventListener('transitionend', () => {
    if (!fullScreen.value) {
      transitionEnded.value = true
    }
  })
})
</script>

<template>
  <div>
    <picture v-if="'images' in $props && $props.images" @click="fullScreen = true">
      <source
        v-for="img in $props.images"
        :key="img.src"
        :srcset="img.src"
        :media="`(max-width: ${ImageSize[img.size]})`"
      />

      <nuxt-img :src="$props.images[$props.images.length - 1].src" :alt="$props.alt" />
    </picture>

    <nuxt-img
      v-else-if="'image' in $props && $props.image"
      :src="$props.image.src"
      :alt="$props.alt"
      :style="{ width: ImageSize[$props.image.size] }"
      @click="fullScreen = true"
    />

    <div ref="backdropRef" :class="backdropClassName" @click="fullScreen = false">
      <picture
        v-if="'images' in $props && $props.images"
        class="max-w-[calc(100vw_-_2rem)] max-h-[calc(100vh_-_2rem) md:w-2/3"
      >
        <source
          v-for="img in $props.images"
          :key="img.src"
          :srcset="img.src"
          :media="`(max-width: ${ImageSize[img.size]})`"
        />

        <nuxt-img :src="$props.images[$props.images.length - 1].src" :alt="$props.alt" />
      </picture>

      <nuxt-img
        v-else-if="'image' in $props && $props.image"
        class="max-w-[calc(100vw_-_2rem)] max-h-[calc(100vh_-_2rem) md:w-2/3"
        :src="$props.image.src"
        :alt="$props.alt"
      />
    </div>
  </div>
</template>
