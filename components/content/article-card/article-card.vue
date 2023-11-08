<script setup lang="ts">
import style from './article-card.module.css'

import type { Article } from '@/types'

const $props = defineProps({
  article: {
    type: Object as PropType<Article>,
    required: true
  }
})

const classes = computed(() => style)
</script>

<template>
  <nuxt-link :id="$props.article.slug" :to="$props.article._path" :class="classes['article-card']">
    <div v-if="$props.article.image" class="article-card__image">
      <img :src="$props.article.image" :alt="$props.article.title" />
    </div>

    <div>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
        {{ $props.article.title }}
      </h5>

      <span class="mb-4 text-sm font-light text-zinc-700 dark:text-zinc-400">
        {{ new Date($props.article.createdAt).toLocaleString() }} &middot; {{ $props.article.author }}
      </span>
    </div>

    <p class="font-normal text-zinc-700 dark:text-zinc-400">
      {{ $props.article.description }}
    </p>

    <div v-if="$props.article.tags && $props.article.tags.length" class="text-sm text-zinc-700 dark:text-zinc-400">
      Tagi: {{ $props.article.tags.join(', ') }}
    </div>

    <div class="text-xs font-light text-zinc-700 dark:text-zinc-400">
      Ostatnia modyfikacja: {{ new Date($props.article.lastmod).toLocaleString() }}
    </div>
  </nuxt-link>
</template>
