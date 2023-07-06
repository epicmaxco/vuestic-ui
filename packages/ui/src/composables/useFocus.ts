import { unwrapEl } from './../utils/unwrapEl'
import { focusElement, blurElement } from './../utils/focus'
import { ref, onMounted, onBeforeUnmount, Ref, Component, computed } from 'vue'
import { useEvent } from './useEvent'
import { useActiveElement } from './useActiveElement'

export const useFocusEmits = ['focus', 'blur'] as const

export function useFocus (
  el?: Ref<HTMLElement | null | undefined | Component>,
  emit?: (event: 'focus' | 'blur', e?: Event) => void,
) {
  const activeElement = useActiveElement()
  const isFocused = computed({
    get: () => {
      return activeElement.value === el?.value
    },
    set: (value) => {
      if (value) {
        focus()
      } else {
        blur()
      }
    },
  })

  const onFocus = (e?: Event) => {
    emit?.('focus', e)
  }

  const onBlur = (e?: Event) => {
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

  useEvent('focus', onFocus, el)
  useEvent('blur', onBlur, el)

  return {
    isFocused,
    onFocus,
    onBlur,
    focus,
    blur,
  }
}
