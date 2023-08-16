import {
  watch,
  computed,
  PropType,
  ExtractPropTypes,
  nextTick,
  type WritableComputedRef,
  ref,
  toRef,
} from 'vue'
import flatten from 'lodash/flatten.js'
import isFunction from 'lodash/isFunction.js'
import isString from 'lodash/isString.js'

import { useSyncProp } from './useSyncProp'
import { useFocus } from './useFocus'
import { useFormChild } from './useForm'

export type ValidationRule<V = any> = ((v: V) => any | string) | Promise<((v: V) => any | string)>

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

export type ValidationProps<V> = typeof useValidationProps & {
  modelValue: { type: PropType<V> }
  rules: { type: PropType<ValidationRule<V>[]> }
}

export const useValidationEmits = ['update:error', 'update:errorMessages'] as const

const isPromise = (value: any): value is Promise<any> => {
  return typeof value === 'object' && typeof value.then === 'function'
}

export const useValidation = <V, P extends ExtractPropTypes<typeof useValidationProps>>(
  props: P,
  emit: (event: any, ...args: any[]) => void,
  options: UseValidationOptions,
) => {
  const { reset, focus } = options
  const { isFocused, onFocus, onBlur } = useFocus()

  const [computedError] = useSyncProp('error', props, emit, false as boolean)
  const [computedErrorMessages] = useSyncProp('errorMessages', props, emit, [] as string[])
  const isLoading = ref(false)

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

  const processResults = (results: any[]) => {
    let error = false
    let errorMessages: string[] = []

    results.forEach((result: any) => {
      if (isString(result)) {
        errorMessages = [...errorMessages, result]
        error = true
      } else if (result === false) {
        error = true
      } // Ignore if result is Promise
    })

    computedErrorMessages.value = errorMessages
    computedError.value = error

    return !error
  }

  const validateAsync = async (): Promise<boolean> => {
    if (!props.rules || !props.rules.length) {
      return true
    }

    const results = normalizeValidationRules(flatten(props.rules), options.value.value)
    const asyncPromiseResults = results.filter((result) => isPromise(result))
    const syncRules = results.filter((result) => !isPromise(result))

    if (!asyncPromiseResults.length) { return processResults(syncRules) }

    isLoading.value = true
    return Promise.all(asyncPromiseResults).then((asyncResults) => {
      isLoading.value = false
      return processResults([...syncRules, ...asyncResults])
    })
  }

  const validate = (): boolean => {
    if (!props.rules || !props.rules.length) {
      return true
    }

    const rules = flatten(props.rules)

    const results = normalizeValidationRules(rules, options.value.value)
    const asyncPromiseResults = results.filter((result) => isPromise(result))
    const syncRules = results.filter((result) => !isPromise(result))
    const isSyncedError = syncRules.some((result: string | boolean) => isString(result) ? result : result === false)

    // Prevent async rules from being executed if sync rules are invalid
    if (asyncPromiseResults.length && !isSyncedError) {
      isLoading.value = true
      Promise.all(asyncPromiseResults).then((asyncResults) => {
        processResults([...syncRules, ...asyncResults]) // Process sync rules and async rules at the same time
        isLoading.value = false
      })
      return isSyncedError
    }

    return processResults(syncRules)
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
    () => {
      if (!canValidate) { return }

      return validate()
    },
    { immediate: props.immediateValidation },
  )

  const {
    doShowErrorMessages,
    doShowError,
    doShowLoading,
  } = useFormChild({
    isValid: computed(() => !computedError.value),
    isLoading: isLoading,
    errorMessages: computedErrorMessages,
    validate,
    validateAsync,
    resetValidation,
    focus,
    reset,
    value: computed(() => options.value || props.modelValue),
    name: toRef(props, 'name'),
  })

  return {
    computedError: computed(() => doShowError.value ? computedError.value : false),
    computedErrorMessages: computed(() => doShowErrorMessages.value ? computedErrorMessages.value : []),
    isLoading: computed(() => doShowLoading.value ? isLoading.value : false),
    listeners: { onFocus, onBlur },
    validate,
    resetValidation,
    withoutValidation,
    validationAriaAttributes,
  }
}
