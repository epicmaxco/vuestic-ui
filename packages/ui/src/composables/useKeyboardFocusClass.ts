import { computed, ExtractPropTypes, getCurrentInstance } from 'vue'
import kebabCase from 'lodash/kebabCase.js'

import { useKeyboardOnlyFocus } from './'

export const useKeyboardFocusClassProps = { disableFocusClass: { type: Boolean, default: false } }

export function useKeyboardFocusClass (props: ExtractPropTypes<typeof useKeyboardFocusClassProps>, parentClass?: string) {
  const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()

  const hasKeyboardFocusClass = computed(() => !props.disableFocusClass && hasKeyboardFocus.value)

  const componentName = getCurrentInstance()?.type?.name
  const parentClassComputed = computed(() => componentName ? kebabCase(componentName) : parentClass ?? '')
  const keyboardFocusClass = computed(() => ({ [`${parentClassComputed.value}--keyboard-focus`]: hasKeyboardFocusClass.value }))

  return { keyboardFocusListeners, keyboardFocusClass, hasKeyboardFocusClass, hasKeyboardFocus }
}
