import type { RouteLocationNormalized } from 'vue-router'

export const useDocsScroll = () => {
  const scrollToElementOnRouteChange = (newRoute: RouteLocationNormalized, oldRoute: RouteLocationNormalized) => {
    if (newRoute.path === oldRoute.path && newRoute.hash) {
      const el = document.querySelector(newRoute.hash)

      el?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    } else {
      const pageContent = document.querySelector('.docs-layout__main-content')

      if (pageContent) {
        pageContent.scrollTop = 0
      }
    }
  }

  return {
    scrollToElementOnRouteChange
  }
}
