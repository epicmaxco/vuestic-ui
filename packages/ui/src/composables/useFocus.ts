import { ref, onMounted, onBeforeUnmount, Ref } from 'vue'

export function useFocus (el?: Ref<HTMLElement | null | undefined>) {
  const isFocused = ref(false)

  const onFocus = () => { isFocused.value = true }
  const onBlur = () => { isFocused.value = false }

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
  }
}
