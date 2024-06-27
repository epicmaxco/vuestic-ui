import { onBeforeUnmount, onMounted, ref, Ref, unref, watch } from 'vue'

type MaybeRef<T> = T | Ref<T>
type MaybeArray<T> = T | T[]

const normalizeElements = <T>(elements: MaybeRef<T>[] | Ref<MaybeArray<T>>) => {
  return Array.isArray(elements)
    ? elements
    : Array.isArray(elements.value)
      ? elements.value
      : [unref(elements)] as T[]
}

export const useResizeObserver = <T extends HTMLElement | undefined>(elementsList: MaybeRef<T>[] | Ref<MaybeArray<T>>, cb: ResizeObserverCallback) => {
  let resizeObserver: ResizeObserver | undefined

  const observeAll = (elementsList: MaybeRef<T>[]) => {
    elementsList.forEach((element: MaybeRef<T>) => {
      const unrefedElement = unref(element)

      unrefedElement && resizeObserver?.observe(unrefedElement)
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
