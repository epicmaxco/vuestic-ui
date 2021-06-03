// it's another implementation of KeyboardOnlyFocusMixin's functionality but for use with the Composition API

import { ref } from 'vue'

export default function useKeyboardOnlyFocus () {
  const hasKeyboardFocus = ref(false)
  let prevClicked = false

  const keyboardFocusListeners = {
    mousedown: (e: MouseEvent) => {
      prevClicked = true
    },

    focus: (e: FocusEvent) => {
      if (!prevClicked) {
        hasKeyboardFocus.value = true
      }

      prevClicked = false
    },

    blur: (e: FocusEvent) => {
      hasKeyboardFocus.value = false
      prevClicked = false
    },
  }

  return {
    hasKeyboardFocus,
    keyboardFocusListeners,
  }
}
