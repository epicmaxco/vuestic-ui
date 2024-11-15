import { computed, Ref } from 'vue'

interface ClearableProps {
  clearable: boolean
  clearableIcon: string
  clearValue?: any
  disabled?: boolean
  readonly?: boolean
  success?: boolean
  color?: string
}

export const useClearableControlProps = {
  clearable: { type: Boolean, default: false },
  clearableIcon: { type: String, default: 'va-clear' },
  clearValue: { type: String, default: '' },
}

export const useClearableControlEmits = ['clear'] as const

export const useClearableControl = (
  props: ClearableProps,
  inputValue: Ref<any>,
  hasError?: Ref<boolean>,
) => {
  const clearedValues = [null, undefined, props.clearValue]

  const canBeCleared = computed(() => {
    if (!props.clearable || props.disabled || props.readonly) { return false }

    if (Array.isArray(inputValue.value)) {
      return inputValue.value.length > 0
    }

    return !clearedValues.includes(inputValue.value)
  })

  const clearIconColor = computed(() => {
    if (hasError?.value) { return 'danger' }
    if (props.success) { return 'success' }

    return 'secondary'
  })

  const clearIconProps = computed(() => ({
    name: props.clearableIcon,
    color: clearIconColor.value,
    size: 'medium',
    tabindex: canBeCleared.value ? 0 : -1,
  }))

  return {
    canBeCleared,
    clearIconProps,
  }
}
