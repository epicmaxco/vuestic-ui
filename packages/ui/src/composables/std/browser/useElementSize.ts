import { DefineComponent, onMounted, Ref, ref, watchEffect } from 'vue'
import { useResizeObserver } from './observer/useResizeObserver'
import { unwrapEl } from '../../../utils/unwrapEl'

export const useElementWidth = (el: Ref<HTMLElement | DefineComponent | undefined>) => {
  const width = ref<null | number>(null)
  const height = ref<null | number>(null)

  useResizeObserver(el, ([entry]) => {
    width.value = entry.contentRect.width ?? null
    height.value = entry.contentRect.height ?? null
  })

  onMounted(() => {
    const rect = unwrapEl(el.value)?.getBoundingClientRect()

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
