import { onBeforeUnmount, onMounted, ref, Ref, unref, watch } from 'vue'

type MaybeRef<T> = T | Ref<T>

export const useResizeObserver = <T extends HTMLElement | undefined>(elementsList: MaybeRef<T>[], cb: ResizeObserverCallback) => {
  let resizeObserver: ResizeObserver | undefined

  const observeAll = (elementsList: MaybeRef<T>[]) => {
    elementsList.forEach((element: MaybeRef<T>) => {
      const unrefedElement = unref(element)

      unrefedElement && resizeObserver?.observe(unrefedElement)
    })
  }

  watch(elementsList, (newValue) => {
    resizeObserver?.disconnect()
    observeAll(newValue)
  })

  onMounted(() => {
    resizeObserver = new ResizeObserver(cb)
    observeAll(elementsList)
  })

  onBeforeUnmount(() => resizeObserver?.disconnect())

  return resizeObserver
}
