import { defineNuxtModule } from '@nuxt/kit'

/** This module adds locale route prefix */
export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('pages:extend', (pages) => {
      // Create same routes that we have, but with `locale` path.
      const localeRoutes = pages.map(page => {
        return {
          name: `locale-${page.name}`,
          path: `/:locale${page.path}`,
          file: page.file,
          children: page.children || []
        }
      })

      pages.push(...localeRoutes)

      const removeOptionalFromPages = (pages: any[]) => {
        // Remove nuxt optional mark. 
        // This was broking localization path, because localized path had higher priority.
        // https://router.vuejs.org/guide/essentials/route-matching-syntax.html#sensitive-and-strict-route-options
        pages.forEach((page) => {
          if (/:\w*\?/.test(page.path)) {
            page.path = page.path.replace('?', '')
          }

          if (page.children) {
            removeOptionalFromPages(page.children)
          }
        })
      }

      removeOptionalFromPages(pages)
    })
  }
})
