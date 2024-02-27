import type { ISimpleSitemap } from '~/types'

/**
 *
 */
export default async function getNavigationContent(): Promise<ISimpleSitemap[]> {
  const navigation = await fetchContentNavigation()

  if (navigation.length === 0) return []

  const nav = navigation[0].children

  if (!(nav && nav.length)) return []

  const mappedNavItems = nav
    .filter((u) => isNaN(Number(u._path.split('/').at(-1))))
    .map((u) => ({
      ...u,
      children: u.children ? u.children.filter((c) => c._path !== u._path) : undefined
    }))

  const articleIndex = mappedNavItems.findIndex((child) => child._path.replace('/blog', '') === '/articles')

  if (articleIndex === -1) {
    return mappedNavItems
  }

  const {
    urlset: { url }
  } = await $fetch('/sitemap')

  mappedNavItems[articleIndex].children = mappedNavItems[articleIndex].children?.flatMap((child) => {
    const cs = [child, ...(child.children || [])]

    for (let i = 0; i < cs.length; i++) {
      if (cs[i].children?.length) {
        cs[i].title = `[LISTA] ${cs[i].title}`
        continue
      }

      cs[i].lastmod = url.find((u) => u.loc._text === cs[i]._path)?.lastmod._text
    }

    return cs
  })

  const articleGroups =
    mappedNavItems[articleIndex].children
      ?.filter((c) => c.children && c.children.length)
      .sort((a, b) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0)) || []

  const articles =
    mappedNavItems[articleIndex].children
      ?.filter((c) => c.lastmod)
      .sort((a, b) =>
        new Date(a.lastmod) > new Date(b.lastmod) ? 1 : new Date(a.lastmod) < new Date(b.lastmod) ? -1 : 0
      ) || []

  mappedNavItems[articleIndex].children = [...articleGroups, ...articles]

  return mappedNavItems
}
