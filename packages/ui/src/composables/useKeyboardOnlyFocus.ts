import { ref } from 'vue'
import { getWindow } from '../utils/ssr'

export function useKeyboardOnlyFocus () {
  const hasKeyboardFocus = ref(false)
  let previouslyClicked = false

  const keyboardFocusListeners = {
    mousedown: () => {
      previouslyClicked = true
    },

    focus: () => {
      if (!previouslyClicked) {
        hasKeyboardFocus.value = true
      }

      previouslyClicked = false
    },

    blur: () => {
      hasKeyboardFocus.value = false
      previouslyClicked = false
    },
  }

  return {
    hasKeyboardFocus,
    keyboardFocusListeners,
  }
}

let previouslyClicked = false
let timeout: ReturnType<typeof setTimeout>

getWindow()?.addEventListener('mousedown', () => {
  previouslyClicked = true
  timeout = setTimeout(() => {
    previouslyClicked = false
  }, 300)
})

export function useKeyboardOnlyFocusGlobal () {
  const hasKeyboardFocus = ref(false)
  const keyboardFocusListeners = {
    focus: () => {
      if (!previouslyClicked) {
        hasKeyboardFocus.value = true
      }
    },

    blur: () => {
      hasKeyboardFocus.value = false
    },
  }

  return {
    hasKeyboardFocus,
    keyboardFocusListeners,
  }
}
