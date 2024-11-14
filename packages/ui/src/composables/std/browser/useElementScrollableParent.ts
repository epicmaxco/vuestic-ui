import { useWindow } from '../ssr/useWindow'
import { computed, Ref } from 'vue'

type ScrollElement = HTMLElement | (Window & { scrollLeft: number; scrollTop: number })

const getScrollableParent = (element: HTMLElement | null | undefined, window: Window | null | undefined): ScrollElement | null => {
  if (!element) {
    if (!window) {
      return null
    }

    return new Proxy(window, {
      get: (target, key: any, rec) => {
        // Re-map scrollTop and scrollLeft to window.scrollY and window.scrollX
        if (key === 'scrollTop') {
          return window?.scrollY
        }
        if (key === 'scrollLeft') {
          return window?.scrollX
        }

        const value = Reflect.get(target, key, rec)
        if (typeof (value) === 'function') {
          return value.bind(target)
        }
        return value
      },
    }) as ScrollElement
  }

  if (element.scrollHeight > element.clientHeight) {
    return element
  }

  return getScrollableParent(element.parentElement, window)
}

export const useElementScrollableParent = (el: Ref<HTMLElement | undefined>) => {
  const window = useWindow()

  return computed(() => getScrollableParent(el.value, window.value))
}
