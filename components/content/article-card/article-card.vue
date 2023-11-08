<script lang="ts">
import Article from '@/@types/Article'

import style from './article-card.module.css'

export default {
  name: 'ArticleCard',
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true
    }
  },
  computed: {
    classes() {
      return style
    }
  }
}
</script>

<template>
  <a :id="article.slug" :href="article._path" :class="classes['article-card']">
    <div v-if="article.image" class="article-card__image">
      <img :src="article.image" :alt="article.title" />
    </div>
    <div>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
        {{ article.title }}
      </h5>
      <span class="mb-4 text-sm font-light text-zinc-700 dark:text-zinc-400">
        {{ new Date(article.createdAt).toLocaleString() }} &middot; {{ article.author }}
      </span>
    </div>
    <p class="font-normal text-zinc-700 dark:text-zinc-400">
      {{ article.description }}
    </p>
    <div v-if="article.tags && article.tags.length" class="text-sm text-zinc-700 dark:text-zinc-400">
      Tagi: {{ article.tags.join(', ') }}
    </div>
    <div class="text-xs font-light text-zinc-700 dark:text-zinc-400">
      Ostatnia modyfikacja: {{ new Date(article.lastmod).toLocaleString() }}
    </div>
  </a>
</template>
