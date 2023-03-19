<script lang="ts">
export default {
  name: 'TeapotPage',
  layout: 'default'
}
</script>

<template>
  <site-navigation />

  <main class="prose container mx-auto mt-8 px-4 flex flex-row gap-4 justify-center">
    <div>
      <h1>418 <span class="text-gray-500 dark:text-gray-400">I'm a teapot</span></h1>
      <p>The requested entity body is short and stout.</p>
    </div>
    <img src="https://http.cat/418" alt="418" class="w-1/2" />
  </main>
</template>
