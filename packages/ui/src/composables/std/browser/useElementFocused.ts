import { computed, ref, Ref } from 'vue'
import { useEvent } from '../event/useEvent'
import { focusElement, blurElement } from '../../../utils/focus'
import { unwrapEl } from '../../../utils/unwrapEl'
import { TemplateRef } from '../../../utils/types/template-ref'

export const useElementFocused = (
  el: Ref<TemplateRef>,
  options: {
    onFocus?: (e: FocusEvent) => void,
    onBlur?: (e: FocusEvent) => void
  } = {},
) => {
  const isFocused = ref(false)

  useEvent('focus', (e) => {
    isFocused.value = true
    options.onFocus?.(e)
  }, el)

  useEvent('blur', (e) => {
    isFocused.value = false
    options.onBlur?.(e)
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
