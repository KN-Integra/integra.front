<template>
  <header class="p-4 inline-flex items-center justify-between w-full bg-white dark:bg-zinc-950 shadow-lg">
    <nuxt-link to="/" class="flex items-center text-2xl font-semibold text-zinc-900 dark:text-white">
      <nuxt-img class="w-28 md:w-44" src="https://i.postimg.cc/0jVhbXr4/integra-icon.png" alt="logo" />
    </nuxt-link>

    <h1 class="m-0 hidden sm:inline text-2xl md:text-3xl lg:text-4xl">Witaj w systemie DIANA!</h1>

    <div class="w-28 md:w-44 inline-flex justify-end items-center">
      <theme-switcher />
    </div>
  </header>
</template>
