import { ref, Ref, watch } from 'vue'

export const useInViewPort = (element: Ref<HTMLElement | undefined>) => {
  const isInViewPort = ref(false)

  const cb: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    isInViewPort.value = isIntersecting
  }

  let observer: IntersectionObserver | null = null

  watch(element, (newVal) => {
    if (newVal) {
      if (!observer) {
        if (typeof IntersectionObserver === 'undefined') { return }
        observer = new IntersectionObserver(cb, {
          root: null,
          rootMargin: '50px',
          threshold: 0,
        })
      }
      observer.observe(newVal)
    } else {
      observer?.disconnect()
      observer = null
    }
  }, { immediate: true })

  return isInViewPort
}
