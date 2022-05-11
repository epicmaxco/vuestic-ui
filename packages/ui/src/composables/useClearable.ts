import { computed, Ref } from 'vue'
import { useFocus } from './useFocus'

interface ClearableProps {
  clearable: boolean
  clearableIcon: string
  clearValue: any
  disabled?: boolean
  readonly?: boolean
  success?: boolean
  color?: string
}

export const useClearableProps = {
  clearable: { type: Boolean, default: false },
  clearableIcon: { type: String, default: 'highlight_off' },
  clearValue: { type: String, default: '' },
}

export const useClearableEmits = ['clear']

export const useClearable = (
  props: ClearableProps,
  inputValue: Ref<any>,
  emit?: (event: 'focus' | 'blur', e?: Event) => void,
  el?: Ref<any>,
  hasError?: Ref<boolean>,
) => {
  const { isFocused, onFocus, onBlur } = useFocus(el, emit)

  const clearedValues = [null, undefined, props.clearValue]

  const canBeCleared = computed(() => (
    props.clearable &&
    !props.disabled &&
    !props.readonly &&
    !clearedValues.includes(inputValue.value)
  ))

  const clearIconColor = computed(() => {
    if (isFocused?.value) { return props.color || 'primary' }
    if (hasError?.value) { return 'danger' }
    if (props.success) { return 'success' }

    return 'gray'
  })

  const clearIconProps = computed(() => ({
    name: props.clearableIcon,
    color: clearIconColor.value,
    size: 'small',
  }))

  return {
    canBeCleared,
    clearIconColor,
    clearIconProps,
    onFocus,
    onBlur,
  }
}
