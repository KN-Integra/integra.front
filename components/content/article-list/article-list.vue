<script lang="ts">
import Article from '@/@types/Article'
import ArticleCard from '@/components/content/article-card/article-card.vue'

// @ts-expect-error - TS doesn't know about CSS modules
import style from './article-list.module.css'

export default {
  name: 'ArticleList',
  components: {
    ArticleCard
  },
  async setup() {
    if (!process.client) return {}

    const {
      urlset: { url }
    } = await $fetch('/sitemap')

    const sitemap = url
      .filter((u) => u.loc._text !== '/' && !Number(u.loc._text.replace('/', '')) && u.loc._text !== '/teapot')
      .map(
        (u) =>
          ({
            // eslint-disable-next-line no-restricted-globals
            _path: u.loc._text.replace(location.origin, ''),
            slug: u.loc._text.split('/').pop(),
            lastmod: u.lastmod._text,
            createdAt: u.createdAt?._text as string,
            title: u.title?._text as string,
            description: u.description?._text as string,
            author: u.author?._text as string,
            image: u.image?._text,
            tags: u.tags?._text.split(', ')
          } as Article)
      )
      .filter((u) => u.title && u.description && u.author && u.createdAt)

    const articles = sitemap
      .filter((u) => u._path.startsWith('/articles') && u._path !== '/articles')
      .sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)

        return dateB.getTime() - dateA.getTime()
      })

    return {
      articles
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
  <div :class="classes['article-list']">
    <article-card v-for="article in articles" :id="article.slug" :key="article._path" :article="article" />
  </div>
</template>
