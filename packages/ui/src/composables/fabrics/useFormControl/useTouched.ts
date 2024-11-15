import { Ref, ref, watch } from 'vue'

export const useTouched = (isFocused: Ref<boolean>) => {
  const isTouched = ref(false)

  watch(isFocused, (value) => {
    if (!value) {
      isTouched.value = true
    }
  })

  return isTouched
}
