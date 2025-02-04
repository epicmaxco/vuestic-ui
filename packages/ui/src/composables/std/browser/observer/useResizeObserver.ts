import { unwrapEl } from './../../../../utils/unwrapEl'
import { DefineComponent, onBeforeUnmount, onMounted, ref, Ref, unref, watch } from 'vue'

type MaybeRef<T> = T | Ref<T>
type MaybeArray<T> = T | T[]

const normalizeElements = <T>(elements: MaybeRef<T>[] | Ref<MaybeArray<T>>) => {
  if (Array.isArray(elements)) {
    return elements.map(unref)
  }

  const unrefArray = unref(elements)

  return Array.isArray(unrefArray) ? unrefArray : [unrefArray]
}

export const useResizeObserver = <T extends HTMLElement | DefineComponent | undefined>(elementsList: MaybeRef<T>[] | Ref<MaybeArray<T>>, cb: ResizeObserverCallback) => {
  let resizeObserver: ResizeObserver | undefined

  const observeAll = (elements: MaybeRef<T>[]) => {
    elements.forEach((element: MaybeRef<T>) => {
      const unrefElement = unwrapEl(unref(element))

      if (!unrefElement) {
        return
      }

      if (!(unrefElement instanceof Element)) {
        console.error('Vuestic: Trying to observe non-HTMLElement', {
          target: unrefElement,
          array: elementsList,
        })
        throw new Error('Vuestic: Unable to observe non-HTMLElement')
      }

      unrefElement && resizeObserver?.observe(unrefElement)
    })
  }

  watch(elementsList, (newValue) => {
    resizeObserver?.disconnect()

    observeAll(normalizeElements(newValue))
  })

  onMounted(() => {
    resizeObserver = new ResizeObserver(cb)
    observeAll(normalizeElements(elementsList))
  })

  onBeforeUnmount(() => resizeObserver?.disconnect())

  return resizeObserver
}
