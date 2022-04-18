import { defineNuxtModule } from '@nuxt/kit'
import { resolve } from 'path'

/** This module adds locale route prefix */
export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('pages:extend', (pages) => {
      const localizeChildren = (routes: any[]) => {
        return routes.map(route => ({ 
          ...route, 
          name: `locale-${route.name}`, 
          path: route.path.replace('/', ''),
          children: localizeChildren(route.children)
        }))
      }

      // Push local proxy route
      pages.push({
        name: 'locale',
        path: '/:locale',
        file: resolve(__dirname, './RouterView.vue'),
        children: localizeChildren([...pages])
      })

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
