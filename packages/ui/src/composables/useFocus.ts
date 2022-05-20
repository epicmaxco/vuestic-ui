import { ref, onMounted, onBeforeUnmount, Ref } from 'vue'

export const useFocusEmits = ['focus', 'blur']

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
    el?.value?.focus()
  }

  const blur = (): void => {
    el?.value?.blur()
  }

  if (el) {
    onMounted(() => {
      if (el?.value instanceof HTMLElement) {
        el.value?.addEventListener('focus', onFocus)
        el.value?.addEventListener('blur', onBlur)
      }
    })
    onBeforeUnmount(() => {
      if (el?.value instanceof HTMLElement) {
        el.value?.removeEventListener('focus', onFocus)
        el.value?.removeEventListener('blur', onBlur)
      }
    })
  }

  return {
    isFocused,
    onFocus,
    onBlur,
    focus,
    blur,
  }
}
