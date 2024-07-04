import { ref, type Ref, watchEffect } from 'vue'

export const useElementRect = (el: Ref<HTMLElement | null>) => {
  const rect = ref<DOMRect>()

  const resizeObserver = new ResizeObserver(([size]) => {
    rect.value = size.contentRect
  })

  const setRect = (el: HTMLElement | null) => {
    if (el) {
      rect.value = el.getBoundingClientRect()
    }
  }

  window.addEventListener('resize', () => {
    setRect(el.value)
  })

  watchEffect(() => {
    setRect(el.value)
    if (el.value) {
      resizeObserver.observe(el.value)
    } else {
      resizeObserver.disconnect()
    }
  })

  return rect
}