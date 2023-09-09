import { ExtractPropTypes, Ref, onMounted } from 'vue'
import { blurElement, focusElement } from '../utils/focus'
import { unwrapEl } from '../utils/unwrapEl'

export const useFocusableProps = {
  /** Focus element when mounted */
  autofocus: { type: Boolean, default: false },
}

// TODO: Maybe accept a component here
export const useFocusable = (
  el: Ref<HTMLElement | null | undefined>,
  props: ExtractPropTypes<typeof useFocusableProps>,
) => {
  const focus = () => {
    focusElement(unwrapEl(el.value))
  }

  const blur = () => {
    blurElement(unwrapEl(el.value))
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
