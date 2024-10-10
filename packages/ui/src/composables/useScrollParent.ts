import { useWindow } from './std/ssr/useWindow'

type ScrollElement = HTMLElement | (Window & { scrollLeft: number; scrollTop: number })

export const useScrollParent = () => {
  const window = useWindow()

  const getScrollableParent = (element?: HTMLElement | null): ScrollElement | null => {
    if (!element) {
      if (!window.value) {
        return null
      }

      return new Proxy(window.value, {
        get: (target, key: any, rec) => {
          // Re-map scrollTop and scrollLeft to window.scrollY and window.scrollX
          if (key === 'scrollTop') {
            return window.value?.scrollY
          }
          if (key === 'scrollLeft') {
            return window.value?.scrollX
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

    return getScrollableParent(element.parentElement)
  }

  return { getScrollableParent }
}
