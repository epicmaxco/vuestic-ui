import { Ref } from 'vue'
import { useWindow } from './useWindow'

type ScrollElement = HTMLElement | (Window & { scrollLeft: number; scrollTop: number })

export const useScrollParent = () => {
  const window = useWindow() as Ref<Window>

  const fakeWindow = new Proxy(window.value || {}, {
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
  })

  const getScrollableParent = (element?: HTMLElement | null): ScrollElement => {
    if (!element) {
      return fakeWindow as ScrollElement
    }

    if (element.scrollHeight > element.clientHeight) {
      return element
    }

    return getScrollableParent(element.parentElement)
  }

  return { getScrollableParent }
}
