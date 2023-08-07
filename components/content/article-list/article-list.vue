<script lang="ts">
import Article from '@/@types/Article'
import ArticleCard from '@/components/content/article-card/article-card.vue'
import PaginationComponent from '@/components/pagination-component/pagination-component.vue'

// @ts-expect-error - TS doesn't know about CSS modules
import style from './article-list.module.css'

export default {
  name: 'ArticleList',
  components: {
    ArticleCard,
    pagination: PaginationComponent
  },
  data() {
    return {
      articles: [] as Article[],
      currentPage: 1
    }
  },
  computed: {
    classes() {
      return style
    },
    paginatedArticles() {
      if (!this.articles) return []

      return this.articles.slice((this.currentPage - 1) * 4, this.currentPage * 4)
    },
    totalPages() {
      if (!this.articles) return 0

      return Math.ceil(this.articles.length / 4)
    }
  },
  async mounted() {
    const {
      urlset: { url }
    } = await $fetch('/sitemap')

    const articles = url
      .filter((u) => u.loc._text.includes('/blog/articles/'))
      .map(
        (u) =>
          ({
            _path: u.loc._text.slice(u.loc._text.indexOf('/blog')),
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

    this.articles = articles
  },
  methods: {
    onPageChange(pageNo: number) {
      this.currentPage = pageNo
    }
  }
}
</script>

<template>
  <div>
    <div :class="classes['article-list']">
      <article-card v-for="article in paginatedArticles" :id="article.slug" :key="article._path" :article="article" />
    </div>

    <pagination :current-page="currentPage" :total-pages="totalPages" @page-change="onPageChange" />
  </div>
</template>
