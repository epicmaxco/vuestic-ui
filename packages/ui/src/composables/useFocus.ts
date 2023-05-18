import { unwrapEl } from './../utils/unwrapEl'
import { focusElement, blurElement } from './../utils/focus'
import { ref, onMounted, onBeforeUnmount, Ref } from 'vue'

export const useFocusEmits = ['focus', 'blur'] as const

export function useFocus (
  el?: Ref<HTMLElement | null | undefined>,
  emit?: (event: 'focus' | 'blur', e?: Event) => void,
) {
  const isFocused = ref(false)

  const onFocus = (e?: Event) => {
    isFocused.value = true
    emit?.('focus', e)
  }

  const onBlur = (e?: Event) => {
    isFocused.value = false
    emit?.('blur', e)
  }

  const focus = (): void => {
    if (!el?.value) { return }
    focusElement(unwrapEl(el?.value))
  }

  const blur = (): void => {
    if (!el?.value) { return }
    blurElement(unwrapEl(el?.value))
  }

  let element: any
  onMounted(() => {
    element = (el?.value as any)?.$el ?? el?.value
    if (element) {
      element.addEventListener('focus', onFocus)
      element.addEventListener('blur', onBlur)
    }
  })
  onBeforeUnmount(() => {
    if (element) {
      element.removeEventListener('focus', onFocus)
      element.removeEventListener('blur', onBlur)
    }
  })

  return {
    isFocused,
    onFocus,
    onBlur,
    focus,
    blur,
  }
}
