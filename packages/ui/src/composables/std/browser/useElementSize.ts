import { onMounted, Ref, ref, watchEffect } from 'vue'
import { useResizeObserver } from './observer/useResizeObserver'

export const useElementWidth = (el: Ref<HTMLElement | undefined>) => {
  const width = ref<null | number>(null)
  const height = ref<null | number>(null)

  useResizeObserver(el, ([entry]) => {
    width.value = entry.contentRect.width ?? null
    height.value = entry.contentRect.height ?? null
  })

  onMounted(() => {
    const rect = el.value?.getBoundingClientRect()

    if (!rect) {
      return
    }

    width.value = rect.width ?? null
    height.value = rect.height ?? null
  })

  return {
    width,
    height,
  }
}
