import { useNuxt } from '@nuxt/kit';
import type { NuxtPage } from '@nuxt/schema';

const localizeChildren = (pages: NuxtPage[]) => {
  return pages.map((page) => ({
    ...page,
    name: `locale-${page.name}`,
    path: `:locale?/${page.path}`,
    children: page.children ? localizeChildren(page.children) : [],
  }))
}

export const usePagePrefix = () => {
  const nuxt = useNuxt()

  nuxt.hook('pages:extend', (pages) => {
    // Create same routes that we have, but with `locale` path.
    const localeRoutes = pages
      .map(page => {
        if (page.path === '/') {
          return null
        }

        return {
          name: `locale-${page.name}`,
          path: `/:locale?${page.path}`,
          file: page.file,
          children: localizeChildren(page.children),
        } as NuxtPage
      })
      .filter(Boolean)

    pages.unshift(...localeRoutes)
  })
}