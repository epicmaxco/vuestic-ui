export const useDocsScroll = () => {
  const route = useRoute()

  const scrollTop = () => {
    const pageContent = document.querySelector('.docs-layout__main-content')

    if (pageContent) {
      pageContent.scrollTop = 0
    }
  }

  const scrollToElement = () => {
    if (route.hash) {
      const el = document.querySelector(route.hash)

      el?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    } else {
      scrollTop()
    }
  }

  return {
    scrollTop,
    scrollToElement
  }
}
