<script setup lang="ts">
const $route = useRoute()

const ROUTES = [
  {
    name: 'Panel administracyjny',
    path: '/diana/admin'
  },
  {
    name: 'Lista użytkowników',
    path: '/diana/admin/users'
  },
  {
    name: 'Lista zgłoszeń',
    path: '/diana/admin/applications'
  },
  {
    name: 'Lista zasobów',
    path: '/diana/admin/resources'
  },
  {
    name: 'Lista uprawnień',
    path: '/diana/admin/permissions'
  }
]

const sortedRoutes = computed(() => {
  const otherRoutes = ROUTES.filter((route) => route.path !== $route.path)
  const currentRoute = ROUTES.find((route) => route.path === $route.path)

  return [currentRoute, ...otherRoutes]
})
</script>

<template>
  <nav class="bg-zinc-200 dark:bg-zinc-700 px-2 md:px-4 lg:px-6 py-2 shadow">
    <ul class="inline-flex gap-x-4 gap-y-2 flex-wrap">
      <li v-for="route in sortedRoutes" :key="route.path">
        <nuxt-link :to="route.path">
          {{ route.name }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>
