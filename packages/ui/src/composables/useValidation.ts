import { inject, onBeforeUnmount, onMounted, PropType, provide, watch } from 'vue'
import { isString, isFunction, flatten } from 'lodash-es'
import { useSyncProp } from './useSyncProp'
import { FormServiceKey } from '../components/va-form/consts'
import { useFocus } from './useFocus'

type ValidationRule = (() => any | string)

interface ValidationProps {
  modelValue: unknown,
  error?: boolean;
  errorMessages?: string[] | string;
  errorCount: string | number;
  rules: ValidationRule[]
  success: boolean
  messages: string[] | string
}

export const useValidationProps = {
  modelValue: { },
  error: { type: Boolean, default: undefined },
  errorMessages: { type: [Array, String] as PropType<string[] | string>, default: undefined },
  errorCount: { type: [String, Number], default: 1 },
  rules: { type: Array as PropType<ValidationRule[]>, default: [] },
  success: { type: Boolean, default: false },
  messages: { type: [Array, String] as PropType<string[] | string>, default: [] },
}

export const useValidationEmits = ['update:error', 'update:errorMessages']

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

  const [computedError] = useSyncProp('error', props, emit, false)
  const [computedErrorMessages] = useSyncProp('errorMessages', props, emit, [])

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
  watch(() => props.modelValue, () => validate(), { immediate: true })

  const context = {
    resetValidation,
    focus: onFocus,
    blur: onBlur,
    validate,
    reset,
    hasError: () => computedError.value,
  }

  const form = inject(FormServiceKey, undefined)

  onMounted(() => {
    if (form) { form.onChildMounted(context) }
  })

  onBeforeUnmount(() => {
    if (form) { form.onChildUnmounted(context) }
  })

  return {
    isFocused,
    computedError,
    computedErrorMessages,
    listeners: { onFocus, onBlur },
    validate,
    reset,
    resetValidation,
  }
}
