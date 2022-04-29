import { onBeforeUnmount, onMounted, ref, Ref, unref, watch } from 'vue'

type MaybeRef<T> = T | Ref<T>

export const useResizeObserver = <T extends HTMLElement | null>(elementsList: MaybeRef<T>[], cb: () => void) => {
  const resizeObserver = ref<ResizeObserver>()

  const observeAll = (elementsList: MaybeRef<T>[]) => {
    elementsList.forEach((element: MaybeRef<T>) => {
      const unrefedElement = unref(element)

      unrefedElement && resizeObserver.value?.observe(unrefedElement)
    })
  }

  watch(elementsList, (newValue) => {
    resizeObserver.value?.disconnect()
    observeAll(newValue)
  })

  onMounted(() => {
    resizeObserver.value = new ResizeObserver(cb)
    observeAll(elementsList)
  })

  onBeforeUnmount(() => resizeObserver.value?.disconnect())

  return resizeObserver
}
