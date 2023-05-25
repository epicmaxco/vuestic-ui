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
  clearableIcon: { type: String, default: 'va-clear' },
  clearValue: { type: String, default: '' },
}

export const useClearableEmits = ['clear'] as const

export const useClearable = (
  props: ClearableProps,
  inputValue: Ref<any>,
  el?: Ref<any>,
  hasError?: Ref<boolean>,
) => {
  const { isFocused, onFocus, onBlur } = useFocus(el)

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

    return 'secondary'
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
