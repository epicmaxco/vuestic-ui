import { Ref, ref, watchEffect } from 'vue'
import { useResizeObserver } from './useResizeObserver'

export const useElementWidth = (el: Ref<HTMLElement | undefined>) => {
  const width = ref<null | number>(null)

  useResizeObserver([el], () => {
    width.value = el.value?.clientWidth ?? null
  })

  watchEffect(() => {
    width.value = el.value?.clientWidth ?? null
  })

  return width
}
