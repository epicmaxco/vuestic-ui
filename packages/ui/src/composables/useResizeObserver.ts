import { onBeforeUnmount, onMounted, Ref, unref, watch } from 'vue'

type MaybeRef<T> = T | Ref<T>

export const useResizeObserver = <T extends HTMLElement | null>(elementsList: MaybeRef<T>[], cb: () => void) => {
  const resizeObserver = new ResizeObserver(cb)

  const observeAll = (elementsList: MaybeRef<T>[]) => {
    elementsList.forEach((element: MaybeRef<T>) => {
      const unrefedElement = unref(element)

      unrefedElement && resizeObserver.observe(unrefedElement)
    })
  }

  watch(elementsList, (newValue, oldValue) => {
    resizeObserver.disconnect()
    observeAll(newValue)
  })

  onMounted(() => {
    observeAll(elementsList)
  })

  onBeforeUnmount(() => resizeObserver.disconnect())

  return resizeObserver
}
