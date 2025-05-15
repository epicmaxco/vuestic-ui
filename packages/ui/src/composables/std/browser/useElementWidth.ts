import { DefineComponent, onMounted, Ref, ref, watchEffect } from 'vue'
import { useResizeObserver } from './observer/useResizeObserver'
import { TemplateRef, unwrapEl } from '../../../utils/unwrapEl'

export const useElementWidth = (el: Ref<TemplateRef>) => {
  const width = ref<null | number>(null)

  useResizeObserver(el, ([entry]) => {
    width.value = entry.contentRect.width ?? null
  })

  onMounted(() => {
    width.value = unwrapEl(el.value)?.getBoundingClientRect().width ?? null
  })

  return width
}
