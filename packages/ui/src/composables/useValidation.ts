import { inject, onBeforeUnmount, onMounted, provide, watch } from 'vue'
import { isString, isFunction, flatten } from 'lodash-es'
import { useSyncProp } from './useSyncProp'
import { FormServiceKey } from 'src/components/va-form/consts'
import { useFocus } from './useFocus'

type ValidationRule = (() => any | string)

interface ValidationProps {
  modelValue: unknown,
  error: boolean;
  errorMessages: string[] | string;
  errorCount: string | number;
  rules: ValidationRule[]
  success: boolean
  messages: string[]
}

export const validationProps = {
  modelValue: { },
  error: { type: Boolean, default: false },
  errorMessages: { type: [Array, String], default: [] },
  errorCount: { type: [String, Number], default: 1 },
  rules: { type: Array, default: [] },
  success: { type: Boolean, default: false },
  messages: { type: [Array, String], default: [] },
}

const normalizeValidationRules = (rules: string | ValidationRule[] = [], callArguments: unknown = null) => {
  if (isString(rules)) { rules = [rules] as any }

  return (rules as ValidationRule[])
    .map((rule) => isFunction(rule) ? rule(callArguments) : rule)
}

export const useValidation = (
  props: ValidationProps,
  emit: (event: any) => any,
  reset: () => any,
) => {
  const { isFocused, onFocus, onBlur } = useFocus()

  const [computedError] = useSyncProp('error', props, emit)
  const [computedErrorMessages] = useSyncProp('errorMessages', props, emit)

  const resetValidation = () => {
    computedError.value = false
    computedErrorMessages.value = []
  }

  const validate = (): boolean => {
    resetValidation()

    if (!props.rules || props.rules.length <= 0) { return computedError.value }

    const rules = flatten(props.rules)

    normalizeValidationRules(rules, props.modelValue)
      .forEach((validationResult: boolean | string) => {
        if (isString(validationResult)) {
          computedErrorMessages.value = [...computedErrorMessages.value, validationResult]
          computedError.value = true
        } else if (validationResult === false) {
          computedError.value = true
        }
      })

    return computedError.value
  }

  watch(isFocused, (newVal) => newVal === false && validate())

  const context = {
    resetValidation,
    focus: onFocus,
    blur: onBlur,
    validate,
    reset,
    hasError: () => computedError.value,
  }

  const form = inject(FormServiceKey)

  onMounted(() => {
    if (form) { form.onChildMounted(context) }
  })

  onBeforeUnmount(() => {
    if (form) { form.onChildUnmounted(context) }
  })

  return {
    listeners: [onFocus, onBlur],
  }
}
