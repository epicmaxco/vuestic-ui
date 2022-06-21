import { shallowRef, computed, Ref, onMounted } from 'vue'
import { useCaptureEvent } from './useCaptureEvent'
import { useCurrentElement } from './useCurrentElement'

const useActiveElement = () => {
  const activeEl = shallowRef<HTMLElement>()

  const updateActiveElement = () => {
    activeEl.value = document.activeElement as HTMLElement
  }

  onMounted(updateActiveElement)

  useCaptureEvent('focus', updateActiveElement)
  useCaptureEvent('blur', updateActiveElement)

  return activeEl
}

export const useFocusDeep = (el?: Ref<HTMLElement | undefined>) => {
  const focused = useActiveElement()
  const current = useCurrentElement(el)
  // Cache previouslyFocusedElement, so we can simply come back to it
  let previouslyFocusedElement: HTMLElement | null = null

  return computed({
    get () {
      if (!focused.value) { return false }
      if (focused.value === current.value) { return true }

      const isFocused = current.value?.contains(focused.value)
      if (isFocused) { previouslyFocusedElement = focused.value }
      return isFocused
    },
    set (value) {
      const target = previouslyFocusedElement ?? current.value
      if (value) {
        target?.focus()
      } else {
        target?.blur()
      }
    },
  })
}
