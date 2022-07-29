import { shallowRef, computed, Ref, onMounted, DefineComponent } from 'vue'
import { useHTMLElement } from './useHTMLElement'
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

export const useFocusDeep = (el?: Ref<HTMLElement | DefineComponent | undefined>) => {
  const focused = useActiveElement()
  const current = useCurrentElement(el ? useHTMLElement(el) : undefined)
  // Cache previouslyFocusedElement, so we can simply come back to it
  let previouslyFocusedElement: HTMLElement | null = null

  return computed<boolean | undefined>({
    get () {
      if (!focused.value) { return false }
      if (focused.value === current.value) { return true }

      const isFocused = current.value?.contains(focused.value)
      if (isFocused) { previouslyFocusedElement = focused.value }
      return isFocused
    },
    set (value) {
      let target = previouslyFocusedElement ?? current.value

      if (!current.value?.contains(target!)) {
        target = current.value
      }

      if (value) {
        target?.focus()
      } else {
        target?.blur()
      }
    },
  })
}
