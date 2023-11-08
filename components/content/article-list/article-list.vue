<script setup lang="ts">
import type { Article } from '@/types'

import style from './article-list.module.css'

const $props = defineProps({
  parent: {
    type: String,
    required: false,
    default: ''
  }
})

const currentPage = ref(1)

const { data: articles, error } = useLazyAsyncData<Article[]>(async () => {
  const {
    urlset: { url }
  } = await $fetch('/sitemap')

  // const v = await fetchContentNavigation()

  // console.debug('value', v)

  const arts = url
    .filter((u) => u.loc._text.includes(`/blog/articles${$props.parent && `/${$props.parent}/`}`))
    .map(
      (u) =>
        ({
          _path: u.loc._text.replace(location.origin, ''),
          slug: u.loc._text.split('/').pop(),
          lastmod: u.lastmod._text as string,
          createdAt: u.createdAt?._text as string,
          title: u.title?._text as string,
          description: u.description?._text as string,
          author: u.author?._text as string,
          image: u.image?._text,
          tags: u.tags?._text.split(', ')
        } as Article)
    )
    .filter((u) => u.title && u.description && u.author && u.createdAt)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)

      return dateB.getTime() - dateA.getTime()
    })

  return arts
})

const classes = computed(() => style)

const paginatedArticles = computed(() => {
  if (!articles.value) return []

  return articles.value.slice((currentPage.value - 1) * 4, currentPage.value * 4)
})

const totalPages = computed(() => {
  if (!articles.value) return 0

  return Math.ceil(articles.value.length / 4)
})

/**
 * @description Change current page
 * @param {number} pageNo - Page number
 */
function onPageChange(pageNo: number) {
  currentPage.value = pageNo
}

watch(error, (err) => {
  if (err) {
    alert('Wystąpił błąd podczas pobierania artykułów. Spróbuj ponownie później.')
  }
})
</script>

<template>
  <div>
    <div :class="classes['article-list']">
      <article-card v-for="article in paginatedArticles" :id="article.slug" :key="article._path" :article="article" />
    </div>

    <pagination-component :current-page="currentPage" :total-pages="totalPages" @page-change="onPageChange($event)" />
  </div>
</template>
