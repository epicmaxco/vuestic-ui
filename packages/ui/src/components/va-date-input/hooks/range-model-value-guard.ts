import { isNil } from 'lodash'
import { computed, Ref, ref, watch } from 'vue'
import { isRange } from '../../va-date-picker/hooks/model-value-helper'
import { VaDatePickerModelValue } from '../../va-date-picker/types'
import { parseModelValue } from './model-value-parser'

export type useRangeModelValueGuardProps = {
  clearValue: VaDatePickerModelValue | undefined
}

/**
 * This guard is used to prevent updating modelValue if range end is not specified.
 * This guard provides reset method, that allow us to reset VaDateInput value if dropdown is closed.
 */
export const useRangeModelValueGuard = (
  modelValue: Ref<VaDatePickerModelValue | undefined>,
  disabled: Ref<boolean>,
  parseValue = parseModelValue,
) => {
  const bufferValue: Ref<VaDatePickerModelValue | undefined> = ref()

  if (!isNil(modelValue.value)) {
    bufferValue.value = parseValue(modelValue.value)
  } else {
    bufferValue.value = modelValue.value
  }

  const valueComputed = computed({
    get: () => bufferValue.value,
    set: (value) => {
      if (disabled.value) {
        // bufferValue.value = value
        modelValue.value = value
      }

      if (!value) {
        modelValue.value = value
        // bufferValue.value = value
        return
      }

      if (isRange(value)) {
        if (value.end !== null) {
          modelValue.value = value
        }
      } else {
        modelValue.value = value
      }

      bufferValue.value = value
    },
  })

  watch(modelValue, (newValue) => {
    bufferValue.value = newValue
  })

  const reset = () => {
    if (bufferValue.value && isRange(bufferValue.value)) {
      bufferValue.value = modelValue.value ? parseValue(modelValue.value) : modelValue.value
    }
  }

  return {
    valueComputed,
    reset,
  }
}
