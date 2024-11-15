import { ref, Ref } from 'vue'
import { useEvent } from '../'
import { TemplateRef } from '../../../utils/types/template-ref'
import { makeSharedComposable } from '../internal/makeSharedComposable'

const usePreviouslyClicked = makeSharedComposable(() => {
  const previouslyClicked = ref(false)

  useEvent('mousedown', () => {
    previouslyClicked.value = true
    setTimeout(() => { previouslyClicked.value = false }, 100)
  })

  return previouslyClicked
})

export function useElementFocusedKeyboard (el: Ref<TemplateRef>) {
  const hasKeyboardFocus = ref(false)
  const previouslyClicked = usePreviouslyClicked()

  useEvent('focusin', () => {
    if (previouslyClicked.value) {
      return
    }
    hasKeyboardFocus.value = true
  }, el)

  useEvent('focusout', () => {
    hasKeyboardFocus.value = false
  }, el)

  return hasKeyboardFocus
}
