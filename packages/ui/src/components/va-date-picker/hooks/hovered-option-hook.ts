import { computed, ref, UnwrapRef } from 'vue'
import { debounce } from '../../../utils/debounce'

export function useHovered<T> (onHover: (args: T | null) => any) {
  const hovered = ref<T | null>(null)

  const debounceSet = debounce((value: T | null) => {
    hovered.value = value as UnwrapRef<T>
    onHover(value)
  }, 16)

  const hoveredComputed = computed({
    get () {
      return hovered.value as T | null
    },
    set (value: T | null) {
      // Use debounce here to prevent spam from user over hoverable things.
      debounceSet(value)
    },
  })

  return {
    hovered: hoveredComputed,
  }
}
