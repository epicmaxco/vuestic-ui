import { computed, ExtractPropTypes } from 'vue'

import { useKeyboardOnlyFocus } from './'

export const useKeyboardFocusClassProps = { disableFocusClass: { type: Boolean, default: false } }

export function useKeyboardFocusClass (props: ExtractPropTypes<typeof useKeyboardFocusClassProps>, parentClass?: string) {
  const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()

  const hasKeyboardFocusClass = computed(() => !props.disableFocusClass && hasKeyboardFocus.value)

  const keyboardFocusClass = computed(() => ({ [`${parentClass}--keyboard-focus`]: hasKeyboardFocusClass.value }))

  return { keyboardFocusListeners, keyboardFocusClass, hasKeyboardFocusClass }
}
