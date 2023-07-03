import { computed, Ref, DefineComponent, Component } from 'vue'
import { useHTMLElement } from './useHTMLElement'
import { useCurrentElement } from './useCurrentElement'
import { useActiveElement } from './useActiveElement'

export const useFocusDeep = (el?: Ref<HTMLElement | DefineComponent | undefined | Component>) => {
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
        (target)?.focus()
      } else {
        (target)?.blur()
      }
    },
  })
}
