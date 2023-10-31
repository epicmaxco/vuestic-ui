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
    if (!route.hash) {
      scrollTop()
    }
  }

  return {
    scrollTop,
    scrollToElement
  }
}
