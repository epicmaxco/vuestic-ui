import { ref, onMounted, onBeforeUnmount, Ref } from 'vue'

export const useFocusEmits = ['focused', 'blurred']

export function useFocus (
  el?: Ref<HTMLElement | null | undefined>,
  emit?: (event: 'focused' | 'blurred') => void,
) {
  const isFocused = ref(false)

  const onFocus = () => {
    isFocused.value = true
    emit?.('focused')
  }

  const onBlur = () => {
    isFocused.value = false
    emit?.('blurred')
  }

  const focus = (): void => {
    el?.value?.focus()
  }

  const blur = (): void => {
    el?.value?.blur()
  }

  if (el) {
    onMounted(() => {
      el.value?.addEventListener('focus', onFocus)
      el.value?.addEventListener('blur', onBlur)
    })
    onBeforeUnmount(() => {
      el.value?.removeEventListener('focus', onFocus)
      el.value?.removeEventListener('blur', onBlur)
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
