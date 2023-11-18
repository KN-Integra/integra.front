<script setup lang="ts">
const $props = defineProps({
  src: { type: String, required: true },
  media: { type: String, required: true },
  sizes: {
    type: String,
    required: false,
    default: 'xs:320px sm:640px md:768px lg:1024px xl:1280px xxl:1536px 2xl:1536px'
  }
})

const cSizes = computed(() => {
  const img = useImage()
  return img.getSizes($props.src, {
    sizes: $props.sizes,
    media: $props.media
  })
})
</script>

<template>
  <source :media="media" :srcset="cSizes.srcset" :sizes="cSizes.sizes" />
</template>
