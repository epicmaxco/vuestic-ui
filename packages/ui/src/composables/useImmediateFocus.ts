import { Ref, nextTick, watchEffect } from 'vue'
import { focusElement } from '../utils/focus'
import { unwrapEl } from '../utils/unwrapEl'

/** Focus element immediately after it is rendered */
export const useImmediateFocus = (el: Ref<HTMLElement | undefined>) => {
  watchEffect(() => {
    if (el.value) {
      nextTick(() => {
        focusElement(unwrapEl(el.value))
      })
    }
  })
}
