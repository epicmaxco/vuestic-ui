import { ref, watch } from 'vue'

export interface FormComponentProps {
  disabled: boolean;
  readonly: boolean;
}

const useFocus = () => {
  const isFocused = ref(false)

  const focus = () => { isFocused.value = true }
  const blur = () => { isFocused.value = false }

  return {
    isFocused,
    listeners: [focus, blur],
    focus,
    blur,
  }
}

export const useForm = (props: FormComponentProps) => {
  return useFocus()
}
