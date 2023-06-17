<script lang="ts">
// @ts-expect-error - TS doesn't know about CSS modules
import style from './large-footer.module.css'

export default {
  name: 'LargeFooter',
  computed: {
    classes() {
      return style
    }
  }
}
</script>

<template>
  <div :class="classes['large-footer']">
    <div class="w-full mx-auto container px-4 md:px-6 flex flex-col gap-6">
      <h2 class="text-2xl font-bold w-1/3 mt-6">Sponsorzy</h2>

      <div>
        <nuxt-link to="https://www.nordicsemi.com/" class="flex items-center w-1/2 sm:w-1/3 gap-4">
          <picture>
            <source
              media="(min-width:650px)"
              srcset="https://www.nordicsemi.com/-/media/Images/Logos/LogoTransparentRGBHorizontal.svg"
            />
            <img
              src="https://www.nordicsemi.com/-/media/Images/Logos/Logo_Trans_RGB_Vertical-optimized.svg"
              class="w-full"
            />
          </picture>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
