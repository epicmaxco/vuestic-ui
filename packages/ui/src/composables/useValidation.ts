import {
  watch,
  computed,
  PropType,
  ExtractPropTypes,
  nextTick,
  type WritableComputedRef,
} from 'vue'
import flatten from 'lodash/flatten.js'
import isFunction from 'lodash/isFunction.js'
import isString from 'lodash/isString.js'

import { useSyncProp } from './useSyncProp'
import { useFocus } from './useFocus'
import { useFormChild } from './useForm'

export type ValidationRule<V extends any = any> = ((v: V) => any | string)

type UseValidationOptions = {
  reset: () => void
  focus: () => void
  value: WritableComputedRef<any>
}

const normalizeValidationRules = (rules: string | ValidationRule[] = [], callArguments: unknown = null) => {
  if (isString(rules)) { rules = [rules] as any }

  return (rules as ValidationRule[])
    .map((rule) => isFunction(rule) ? rule(callArguments) : rule)
}

export const useValidationProps = {
  name: { type: String, default: undefined },
  modelValue: { required: false },
  error: { type: Boolean, default: undefined },
  errorMessages: { type: [Array, String] as PropType<string[] | string>, default: undefined },
  errorCount: { type: [String, Number], default: 1 },
  rules: { type: Array as PropType<ValidationRule<any>[]>, default: () => [] as any },
  success: { type: Boolean, default: false },
  messages: { type: [Array, String] as PropType<string[] | string>, default: () => [] },
  immediateValidation: { type: Boolean, default: false },
}

export type ValidationProps<V extends any> = typeof useValidationProps & {
  modelValue: { type: PropType<V> }
  rules: { type: PropType<ValidationRule<V>[]> }
}

export const useValidationEmits = ['update:error', 'update:errorMessages']

export const useValidation = <V, P extends ExtractPropTypes<typeof useValidationProps>>(
  props: P,
  emit: (event: any, ...args: any[]) => void,
  options: UseValidationOptions,
) => {
  const { reset, focus } = options
  const { isFocused, onFocus, onBlur } = useFocus()

  const [computedError] = useSyncProp('error', props, emit, false)
  const [computedErrorMessages] = useSyncProp('errorMessages', props, emit, [] as string[])

  const validationAriaAttributes = computed(() => ({
    'aria-invalid': !!computedErrorMessages.value.length,
    'aria-errormessage': typeof computedErrorMessages.value === 'string'
      ? computedErrorMessages.value
      : computedErrorMessages.value.join(', '),
  }))

  const resetValidation = () => {
    computedError.value = false
    computedErrorMessages.value = []
  }

  const validate = (): boolean => {
    if (!props.rules || !props.rules.length) {
      return true
    }

    let error = false
    let errorMessages: string[] = []

    const rules = flatten(props.rules)

    normalizeValidationRules(rules, props.modelValue)
      .forEach((validationResult: boolean | string) => {
        if (isString(validationResult)) {
          errorMessages = [...errorMessages, validationResult]
          error = true
        } else if (validationResult === false) {
          error = true
        }
      })

    computedErrorMessages.value = errorMessages
    computedError.value = error

    return !error
  }

  watch(isFocused, (newVal) => !newVal && validate())

  let canValidate = true
  const withoutValidation = (cb: () => any): void => {
    canValidate = false
    cb()
    // NextTick because we update props in the same tick, but they are updated in the next one
    nextTick(() => { canValidate = true })
  }
  watch(
    () => props.modelValue,
    () => canValidate && validate(),
    { immediate: props.immediateValidation },
  )

  const {
    doShowErrorMessages,
    doShowError,
  } = useFormChild(() => ({
    isValid: !computedError.value,
    errorMessages: computedErrorMessages.value,
    validate,
    resetValidation,
    focus,
    reset,
    value: options.value || props.modelValue,
    name: props.name,
  }))

  return {
    computedError: computed(() => doShowError.value ? computedError.value : false),
    computedErrorMessages: computed(() => doShowErrorMessages.value ? computedErrorMessages.value : []),
    listeners: { onFocus, onBlur },
    validate,
    resetValidation,
    withoutValidation,
    validationAriaAttributes,
  }
}
