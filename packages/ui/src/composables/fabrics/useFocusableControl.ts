import { ExtractPropTypes, Ref, onMounted, watch } from 'vue'
import { useElementFocused } from '../std/'

export const useFocusableControlProps = {
  /** Focus element when mounted */
  autofocus: { type: Boolean, default: false },
}

// TODO: Use function instead of array
export const useFocusableControlEmits = ['focus', 'blur'] as const

export const useFocusableControl = (
  el: Ref<HTMLElement | null | undefined>,
  props: {
    autofocus: boolean,
    disabled?: boolean,
  },
  emit: (event: (typeof useFocusableControlEmits)[number], e: FocusEvent) => void,
) => {
  const isFocused = useElementFocused(el, {
    onBlur (e) {
      emit('blur', e)
    },
    onFocus (e) {
      emit('focus', e)
    },
  })

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

  return {
    focus,
    blur,
  }
}
