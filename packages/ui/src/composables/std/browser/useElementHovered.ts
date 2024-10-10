import { computed, ref, Ref } from 'vue'
import { useEvent } from '../event/useEvent'

export const useElementHovered = (el: Ref<HTMLElement | undefined>) => {
  const isHovered = ref(false)

  useEvent('focus', () => {
    isHovered.value = true
  })

  useEvent('blur', () => {
    isHovered.value = false
  })

  return computed(() => isHovered.value)
}
