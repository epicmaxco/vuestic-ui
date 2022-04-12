import { onBeforeUnmount, onMounted, Ref, unref, watch } from 'vue'

type MaybeRef<T> = T | Ref<T>

export const useResizeObserver = <T extends HTMLElement | null>(elementsList: MaybeRef<T>[], cb: () => void) => {
  // Make it null during setup hook, because ResizeObserver is not available on SSR.
  let resizeObserver: ResizeObserver | null = null

  const observeAll = (elementsList: MaybeRef<T>[]) => {
    elementsList.forEach((element: MaybeRef<T>) => {
      const unrefedElement = unref(element)

      unrefedElement && resizeObserver!.observe(unrefedElement)
    })
  }

  watch(elementsList, (newValue, oldValue) => {
    if (!resizeObserver) { return }
    resizeObserver.disconnect()
    observeAll(newValue)
  })

  onMounted(() => {
    if (!resizeObserver) {
      resizeObserver = new ResizeObserver(cb)
    }
    observeAll(elementsList)
  })

  onBeforeUnmount(() => resizeObserver && resizeObserver.disconnect())

  return resizeObserver
}
