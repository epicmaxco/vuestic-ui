import { computed, ref, Ref } from 'vue'
import { useEvent } from '../event/useEvent'

export const useElementHovered = (el: Ref<HTMLElement | undefined>) => {
  const isHovered = ref(false)

  useEvent('mouseover', () => {
    isHovered.value = true
  }, el)

  useEvent('mouseout', () => {
    isHovered.value = false
  }, el)

  return computed(() => isHovered.value)
}
