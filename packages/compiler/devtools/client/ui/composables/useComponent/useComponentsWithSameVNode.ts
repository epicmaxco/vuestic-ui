import { Ref, computed } from 'vue'
import { getElementMinfiedPaths } from './useComponentPaths'

export const useComponentsWithSameVNode = (htmlElement: Ref<HTMLElement | null>) => {
  return computed(() => {
    const attrs = getElementMinfiedPaths(htmlElement.value)

    return attrs?.map((attr) => {
      return [...document.querySelectorAll(`[data-${attr}]`)] as HTMLElement[]
    }).flat() ?? []
  })
}