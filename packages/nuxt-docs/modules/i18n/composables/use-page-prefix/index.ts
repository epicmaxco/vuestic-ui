import { useNuxt } from '@nuxt/kit';
import type { NuxtPage } from '@nuxt/schema';
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
          children: []
        } as NuxtPage
      })
      .filter(Boolean)

    pages.unshift(...localeRoutes)

    // // Remove nuxt optional mark. 
    // // This was broking localization path, because localized path had higher priority.
    // // https://router.vuejs.org/guide/essentials/route-matching-syntax.html#sensitive-and-strict-route-options
    // pages.forEach((page) => {
    //   if (/\/:\w*\?/.test(page.path)) {
    //     page.path = page.path.replace('?', '')
    //   }
    // })
  })
}