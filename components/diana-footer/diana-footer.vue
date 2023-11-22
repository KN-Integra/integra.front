<script setup lang="ts">
const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="w-full inline-flex p-4 justify-between items-center bg-zinc-200 dark:bg-zinc-950 mt-auto">
    All rights reserved &copy;{{ year }} KN Integra AGH
  </footer>
</template>
