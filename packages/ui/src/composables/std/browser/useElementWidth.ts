import { onMounted, Ref, ref, watchEffect } from 'vue'
import { useResizeObserver } from './observer/useResizeObserver'

export const useElementWidth = (el: Ref<HTMLElement | undefined>) => {
  const width = ref<null | number>(null)

  useResizeObserver(el, ([entry]) => {
    width.value = entry.contentRect.width ?? null
  })

  onMounted(() => {
    width.value = el.value?.getBoundingClientRect().width ?? null
  })

  return width
}
