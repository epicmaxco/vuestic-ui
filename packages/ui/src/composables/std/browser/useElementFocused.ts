import { computed, ref, Ref } from 'vue'
import { useEvent } from '../event/useEvent'
import { focusElement, blurElement } from '../../../utils/focus'
import { unwrapEl } from '../../../utils/unwrapEl'
import { TemplateRef } from '../../../utils/types/template-ref'

export const useElementFocused = (el: Ref<TemplateRef>) => {
  const isFocused = ref(false)

  useEvent('focus', () => {
    isFocused.value = true
  }, el)

  useEvent('blur', () => {
    isFocused.value = false
  }, el)

  return computed({
    get () { return isFocused.value },
    set (value) {
      if (value) {
        focusElement(unwrapEl(el.value))
      } else {
        blurElement(unwrapEl(el.value))
      }
    },
  })
}
