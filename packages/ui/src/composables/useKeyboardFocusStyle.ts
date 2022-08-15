import { computed, ExtractPropTypes } from 'vue'

import { useKeyboardOnlyFocus } from './'

export const useKeyboardFocusStyleProps = { disableFocusStyle: { type: Boolean, default: false } }

export function useKeyboardFocusStyle (props: ExtractPropTypes<typeof useKeyboardFocusStyleProps>) {
  const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()

  const hasKeyboardFocusStyle = computed(() => !props.disableFocusStyle && hasKeyboardFocus.value)

  return { keyboardFocusListeners, hasKeyboardFocusStyle }
}
