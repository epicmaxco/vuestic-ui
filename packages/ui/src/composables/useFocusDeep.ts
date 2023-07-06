import { computed, Ref, DefineComponent, Component } from 'vue'
import { useHTMLElement } from './useHTMLElement'
import { useCurrentElement } from './useCurrentElement'
import { useActiveElement } from './useActiveElement'

/**
 * `true` if `el` or any of his children are in focus
 *
 *  if set to `true` set `el` focused, but if any of `el` children was focused before, set child focused instead
 *
 * @notice this will not trigger native `focus` event and you need to trigger it manually and handle infinite loop
 */
export const useFocusDeep = (el?: Ref<HTMLElement | DefineComponent | undefined | Component>) => {
  const focused = useActiveElement()
  const current = useCurrentElement(el ? useHTMLElement(el) : undefined)
  // Cache previouslyFocusedElement, so we can simply come back to it
  let previouslyFocusedElement: HTMLElement | null = null

  const isFocused = computed<boolean | undefined>({
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

      // NOTICE: Focus and blur events will not be dispatched here to prevent infinite loop
      if (value) {
        (target)?.focus()
      } else {
        (target)?.blur()
      }
    },
  })

  return Object.assign(isFocused, {
    /** Focus `el` if focus is not set to any other element */
    focusIfNothingIfFocused: () => {
      // body if focused by default, but we assume it means nothing is focused
      // by nothing we mean elements like input, button, etc.
      if (focused.value === document.body) {
        isFocused.value = true
      }
    },

    focusPreviousElement: () => {
      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus()
      } else {
        document.body.focus()
      }
    },
  })
}
