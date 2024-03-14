import { onBeforeUnmount, onMounted, ref, Ref, unref, watch } from 'vue'

type MaybeRef<T> = T | Ref<T>
type MaybeArray<T> = T | T[]

export const useResizeObserver = <T extends HTMLElement | undefined>(elementsList: MaybeRef<T>[] | Ref<T>, cb: ResizeObserverCallback) => {
  let resizeObserver: ResizeObserver | undefined

  const observeAll = (elementsList: MaybeRef<T>[]) => {
    elementsList.forEach((element: MaybeRef<T>) => {
      const unrefedElement = unref(element)

      unrefedElement && resizeObserver?.observe(unrefedElement)
    })
  }

  watch(elementsList, (newValue) => {
    resizeObserver?.disconnect()
    observeAll(Array.isArray(newValue) ? newValue : [newValue])
  })

  onMounted(() => {
    resizeObserver = new ResizeObserver(cb)
    observeAll(Array.isArray(elementsList) ? elementsList : [elementsList])
  })

  onBeforeUnmount(() => resizeObserver?.disconnect())

  return resizeObserver
}
