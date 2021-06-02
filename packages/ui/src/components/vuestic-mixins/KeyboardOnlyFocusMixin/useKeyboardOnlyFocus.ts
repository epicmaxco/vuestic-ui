// it's another implementation of KeyboardOnlyFocusMixin's functionality but for use with the Composition API

import { onMounted, ref } from 'vue'
import { Ref } from '@vue/reactivity'

export default function useKeyboardOnlyFocus (templateReference: Ref) {
  const hasKeyboardFocus = ref(false)
  let prevClicked = false

  onMounted(() => {
    let htmlElement = templateReference.value

    if (!htmlElement.addEventListener) {
      htmlElement = htmlElement.$el
    }

    htmlElement.tabIndex = 0

    htmlElement.addEventListener('mousedown', (e: FocusEvent) => {
      prevClicked = true
    })

    htmlElement.addEventListener('focus', (e: FocusEvent) => {
      if (!prevClicked) {
        hasKeyboardFocus.value = true
      }

      prevClicked = false
    })

    htmlElement.addEventListener('blur', (e: FocusEvent) => {
      hasKeyboardFocus.value = false
      prevClicked = false
    })
  })

  return {
    hasKeyboardFocus,
  }
}
