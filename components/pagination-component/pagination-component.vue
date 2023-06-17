<script lang="ts">
export default {
  name: 'PaginationComponent',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ['page-change'],
  methods: {
    changePage(pageNo: number | 'previous' | 'next') {
      if (pageNo === 'previous') {
        pageNo = this.currentPage - 1
      } else if (pageNo === 'next') {
        pageNo = this.currentPage + 1
      }

      this.$emit('page-change', pageNo)
    }
  }
}
</script>

<template>
  <nav aria-label="Page navigation example" class="inline-flex justify-center items-center w-full">
    <ul class="inline-flex -space-x-px list-none">
      <li class="">
        <button
          :disabled="currentPage === 1"
          type="button"
          class="px-3 py-2 ml-0 leading-tight text-zinc-500 bg-white border border-zinc-300 rounded-l-lg hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
          @click="changePage('previous')"
        >
          Poprzednia
        </button>
      </li>
      <li v-for="pageNo in totalPages" :key="pageNo">
        <button
          type="button"
          class="px-3 py-2 leading-tight border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 dark:border-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-white"
          :class="
            pageNo === currentPage
              ? 'bg-zinc-100 text-zinc-700 dark:text-white dark:bg-zinc-700'
              : 'bg-white dark:bg-zinc-800 text-zinc-500  dark:text-zinc-400'
          "
          :aria-current="pageNo === currentPage ? 'page' : undefined"
          @click="changePage(pageNo)"
        >
          {{ pageNo }}
        </button>
      </li>
      <!-- <li>
        <a
          href="#"
          aria-current="page"
          class="px-3 py-2 text-blue-600 border border-zinc-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-zinc-700 dark:bg-zinc-700 dark:text-white"
          >3</a
        >
      </li> -->
      <li>
        <button
          :disabled="currentPage === totalPages"
          type="button"
          class="px-3 py-2 leading-tight text-zinc-500 bg-white border border-zinc-300 rounded-r-lg hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
          @click="changePage('next')"
        >
          Następna
        </button>
      </li>
    </ul>
  </nav>
</template>
