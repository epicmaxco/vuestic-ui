import { ExtractPropTypes, Ref, onMounted, watch } from 'vue'
import { useElementFocused } from '../std/'

export const useFocusableProps = {
  /** Focus element when mounted */
  autofocus: { type: Boolean, default: false },
}

// TODO: Use function instead of array
export const useFocusableEmits = ['focus', 'blur'] as const

export const useFocusable = (
  el: Ref<HTMLElement | null | undefined>,
  props: {
    autofocus: boolean,
    disabled: boolean,
  },
  emit: (event: (typeof useFocusableEmits)[number]) => void,
) => {
  const isFocused = useElementFocused(el)

  const focus = () => {
    if (props.disabled) { return }

    isFocused.value = true
  }

  const blur = () => {
    if (props.disabled) { return }

    isFocused.value = false
  }

  onMounted(() => {
    if (props.autofocus) {
      focus()
    }
  })

  watch(isFocused, (value) => {
    if (value) {
      emit('focus')
    } else {
      emit('blur')
    }
  })

  return {
    focus,
    blur,
  }
}
