import { PropType, computed, SetupContext, ShallowRef, ExtractPropTypes } from 'vue'

import { useStateful, useStatefulProps, StatefulProps } from './useStateful'
import { useLoadingProps, LoadingProps } from './useLoading'
import { useValidation, useValidationProps, ValidationProps, useValidationEmits } from './useValidation'
import { useFocus } from './useFocus'

export type SelectableProps<V = any> = StatefulProps<V> & LoadingProps & ExtractPropTypes<ValidationProps<V>> & {
  arrayValue: V | null,
  label: string,
  leftLabel: boolean,
  trueValue: boolean,
  falseValue: boolean,
  indeterminate: boolean,
  indeterminateValue: V | null,
  disabled: boolean,
  readonly: boolean,
}

export type Elements = {
  input: ShallowRef<HTMLElement | undefined>,
  label: ShallowRef<HTMLElement | undefined>,
  container: ShallowRef<HTMLElement | undefined>,
}

export const useSelectableProps = {
  ...useStatefulProps,
  ...useLoadingProps,
  ...useValidationProps,
  arrayValue: { type: [String, Boolean, Object, Number], default: undefined },
  label: { type: String, default: '' },
  leftLabel: { type: Boolean, default: false },
  trueValue: { type: null as any as PropType<unknown>, default: true },
  falseValue: { type: null as any as PropType<unknown>, default: false },
  indeterminate: { type: Boolean, default: false },
  indeterminateValue: { type: null as any as PropType<unknown>, default: null },
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
  const reset = () => emit('update:modelValue', false)
  const focus = () => input.value?.focus()

  const { computedError, computedErrorMessages, validate, validationAriaAttributes } = useValidation(props, emit, reset, focus)
  const { valueComputed } = useStateful(props, emit)
  const { isFocused } = useFocus()

  const isElementRelated = (element: HTMLElement | undefined) => {
    return !!element && [label.value, container.value].includes(element)
  }
  const onBlur = (event: FocusEvent) => {
    if ((input.value === event.target) && !isElementRelated(event.relatedTarget as HTMLElement)) {
      isFocused.value = false
      computedError.value = false
      validate()
      emit('blur', event)
    }
  }
  const onFocus = (event: FocusEvent) => {
    isFocused.value = true
    emit('focus', event)
  }

  const isIndeterminate = computed(() => props.indeterminate && valueComputed.value === props.indeterminateValue)
  const modelIsArray = computed(() => props.arrayValue !== null)
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
