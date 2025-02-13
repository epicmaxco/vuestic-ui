import { PropType, computed, SetupContext, ShallowRef, ExtractPropTypes } from 'vue'

import { useStateful, useStatefulProps, StatefulProps } from './useStateful'
import { useLoadableControlProps } from './fabrics/useLoadableControl'
import { useValidation, useValidationProps, ValidationProps, useValidationEmits } from './useValidation'
import { unwrapEl } from '../utils/unwrapEl'

export type SelectableProps<V = any> = StatefulProps & { loading: boolean } & ExtractPropTypes<ValidationProps<V>> & {
  arrayValue: V | undefined,
  leftLabel: boolean,
  trueValue: any,
  falseValue: any,
  indeterminate: boolean,
  indeterminateValue: V | null,
  disabled: boolean,
  readonly: boolean,
  modelValue: unknown
}

export type Elements = {
  input: ShallowRef<HTMLElement | undefined>,
  label: ShallowRef<HTMLElement | undefined>,
  container: ShallowRef<HTMLElement | undefined>,
}

export const useSelectableProps = {
  ...useStatefulProps,
  ...useLoadableControlProps,
  ...useValidationProps,
  arrayValue: { type: [String, Boolean, Object, Number], default: null },
  label: { type: String, default: '' },
  leftLabel: { type: Boolean, default: false },
  trueValue: { type: null as unknown as PropType<any>, default: true },
  falseValue: { type: null as unknown as PropType<any>, default: false },
  indeterminate: { type: Boolean, default: false },
  indeterminateValue: { type: null as unknown as PropType<any>, default: null },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
}

export const useSelectableEmits = [...useValidationEmits, 'update:modelValue', 'focus', 'blur']

const checkDuplicates = (props: SelectableProps) => {
  // Just validating state values.
  const values: unknown[] = [props.falseValue, props.trueValue]

  if (props.indeterminate) {
    values.push(props.indeterminateValue)
  }

  const hasDuplicates = new Set(values).size !== values.length

  if (hasDuplicates) {
    throw new Error('falseValue, trueValue, indeterminateValue props should have strictly different values, which is not the case.')
  }
}

export const useSelectable = (
  props: SelectableProps,
  emit: SetupContext['emit'],
  { input, label, container }: Elements,
) => {
  checkDuplicates(props)

  /** @public */
  const reset = () => withoutValidation(() => {
    emit('update:modelValue', false)
    resetValidation()
  })

  const focus = () => {
    unwrapEl(input.value)?.focus()
  }

  const valueComputed = useStateful(props, emit)

  const {
    computedError,
    computedErrorMessages,
    validate,
    validationAriaAttributes,
    listeners: validationListeners,
    withoutValidation,
    resetValidation,
    isDirty,
    isTouched,
    isError,
    isLoading,
    isValid,
  } = useValidation(props, emit, { reset, focus, value: valueComputed })

  const onBlur = (event: FocusEvent) => {
    emit('blur', event)
    validationListeners.onBlur()
  }
  const onFocus = (event: FocusEvent) => {
    emit('focus', event)
  }

  const isIndeterminate = computed(() => props.indeterminate && valueComputed.value === props.indeterminateValue)
  const modelIsArray = computed(() => props.arrayValue !== undefined && props.arrayValue !== null)
  const isChecked = computed(() => {
    if (modelIsArray.value) {
      return (props.modelValue as unknown[])?.includes(props.arrayValue)
    }

    return valueComputed.value === props.trueValue
  })
  const toggleSelection = () => {
    if (props.readonly || props.disabled || props.loading) {
      return
    }

    // For array access we pretend computedValue does not exist and use modelValue + emit input directly.
    if (modelIsArray.value) {
      if (!props.modelValue) {
        emit('update:modelValue', [props.arrayValue])
      } else if (!Array.isArray(props.modelValue)) {
        emit('update:modelValue', props.modelValue === props.arrayValue ? [] : [props.modelValue, props.arrayValue])
      } else if (props.modelValue.includes(props.arrayValue)) {
        emit('update:modelValue', props.modelValue.filter((option) => option !== props.arrayValue))
      } else {
        emit('update:modelValue', props.modelValue.concat(props.arrayValue))
      }
      return
    }

    if (props.indeterminate) {
      if (isIndeterminate.value) {
        valueComputed.value = props.trueValue
      } else if (isChecked.value) {
        valueComputed.value = props.falseValue
      } else {
        // unchecked
        valueComputed.value = props.indeterminateValue
      }
      return
    }

    if (isChecked.value) {
      valueComputed.value = props.falseValue
    } else {
      valueComputed.value = props.trueValue
    }
  }

  return {
    isDirty,
    isTouched,
    isError,
    isLoading,
    isValid,
    isChecked,
    isIndeterminate,
    onBlur,
    onFocus,
    toggleSelection,
    reset,
    focus,
    computedError,
    computedErrorMessages,
    validationAriaAttributes,
  }
}
