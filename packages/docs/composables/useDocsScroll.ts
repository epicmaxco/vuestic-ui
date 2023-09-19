export const useDocsScroll = () => {
  const route = useRoute()

  const scrollTop = () => {
    if (typeof document === 'undefined') { return }
    const pageContent = document.querySelector('.docs-layout__main-content')

    if (pageContent) {
      pageContent.scrollIntoView(true);
    }
  }

  const scrollToElement = () => {
    if (route.hash) {
      if (typeof document === 'undefined') { return }
      const el = document.querySelector(route.hash)

      el?.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' })
    } else {
      scrollTop()
    }
  }

  return {
    scrollTop,
    scrollToElement
  }
}
