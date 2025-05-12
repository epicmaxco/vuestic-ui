import { computed, Ref } from 'vue'
import { isEqual } from '../../utils/is-equal'

interface ClearableProps<V = any> {
  clearable: boolean
  clearableIcon: string
  clearValue?: V | null | undefined
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

export const useClearableControl = <T>(
  props: ClearableProps<T>,
  inputValue: Ref<T | T[]>,
  hasError?: Ref<boolean>,
) => {
  const clearedValues = [null, undefined, props.clearValue]

  const canBeCleared = computed(() => {
    if (!props.clearable || props.disabled || props.readonly) { return false }

    if (Array.isArray(inputValue.value)) {
      return inputValue.value.length > 0
    }

    return !clearedValues.some((v) => isEqual(inputValue.value, v))
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
