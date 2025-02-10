import {
  watch,
  computed,
  type PropType,
  type ExtractPropTypes,
  nextTick,
  type WritableComputedRef,
  ref,
  toRef,
  type Ref,
  watchEffect,
} from 'vue'

import { useFormChild } from './useForm'
import { type ExtractReadonlyArrayKeys } from '../utils/types/readonly-array-keys'
import { watchSetter } from './../utils/watch-setter'
import { isFunction } from '../utils/is-function'
import { isString } from '../utils/is-string'
import { useVModelStateful } from './std/internal/useVModelStateful'

export type ValidationRule<V = any> = ((v: V) => any | string) | Promise<((v: V) => any | string)>

type UseValidationOptions = {
  reset: () => void
  focus: () => void
  value: WritableComputedRef<any> | Ref<any>
}

const normalizeValidationRules = (rules: string | ValidationRule[] = [], callArguments: unknown = null) => {
  if (isString(rules)) { rules = [rules] as any }

  return (rules as ValidationRule[])
    .map((rule) => isFunction(rule) ? rule(callArguments) : rule)
}

export const useValidationProps = {
  name: { type: String, default: undefined },
  rules: { type: Array as PropType<ValidationRule<any>[]>, default: () => [] as any },
  dirty: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  errorMessages: { type: [Array, String] as PropType<string[] | string>, default: () => [] },
  errorCount: { type: [String, Number], default: 1 },
  success: { type: Boolean, default: false },
  messages: { type: [Array, String] as PropType<string[] | string>, default: () => [] },
  immediateValidation: { type: Boolean, default: false },
  modelValue: {},
}

export type ValidationProps<V, RulesArgument extends V = V> = {
  rules: { type: PropType<ValidationRule<RulesArgument>[]>, default: () => any}
  modelValue: { type: PropType<V>, default: V }
} & Omit<typeof useValidationProps, 'modelValue' | 'rules'>

export const useValidationEmits = ['update:error', 'update:errorMessages', 'update:dirty', 'update:error', 'update:loading'] as const

const isPromise = (value: any): value is Promise<any> => {
  return typeof value === 'object' && typeof value.then === 'function'
}

const useDirtyValue = (
  value: Ref<any>,
  props: ExtractPropTypes<typeof useValidationProps>,
  emit: (event: ExtractReadonlyArrayKeys<typeof useValidationEmits>, ...args: any[]) => void,
) => {
  const isDirty = ref(props.dirty || false)

  watchSetter(value, () => {
    isDirty.value = true
    emit('update:dirty', true)
  })

  watch(value, (newValue, oldValue) => {
    // Watch only if object keys changed, not the object itself
    if (newValue === oldValue) {
      isDirty.value = true
    }
  }, { deep: true })

  watch(() => props.dirty, (newValue) => {
    if (isDirty.value === newValue) { return }
    isDirty.value = newValue
  })

  return { isDirty }
}

const useTouched = () => {
  const isTouched = ref(false)

  const onBlur = () => {
    isTouched.value = true
  }

  return { isTouched, onBlur }
}

const useOncePerTick = <T extends (...args: any[]) => any>(fn: T) => {
  let canBeCalled = true

  return (...args: Parameters<T>) => {
    if (!canBeCalled) { return }
    canBeCalled = false
    const result = fn(...args)
    nextTick(() => { canBeCalled = true })
    return result
  }
}

export const useValidation = <V, P extends ExtractPropTypes<typeof useValidationProps>>(
  props: P,
  emit: (event: any, ...args: any[]) => void,
  options: UseValidationOptions,
) => {
  const { reset, focus } = options
  const isError = useVModelStateful(props, 'error', emit)
  const errorMessages = useVModelStateful(props, 'errorMessages', emit)
  const isLoading = ref(false)
  const { isTouched, onBlur } = useTouched()

  const validationAriaAttributes = computed(() => ({
    'aria-invalid': isError.value,
    'aria-errormessage': typeof errorMessages.value === 'string'
      ? errorMessages.value
      : errorMessages.value.join(', '),
  }))

  const resetValidation = () => {
    errorMessages.value = []
    isError.value = false
    isDirty.value = false
    isTouched.value = false
    isLoading.value = false
    if (props.immediateValidation) {
      nextTick(() => {
        validate()
      })
    }
  }

  const processResults = (results: any[]) => {
    let error = false
    let eMessages: string[] = []

    results.forEach((result: any) => {
      if (isString(result)) {
        eMessages = [...eMessages, result]
        error = true
      } else if (result === false) {
        error = true
      } // Ignore if result is Promise
    })

    errorMessages.value = eMessages
    isError.value = error

    return !error
  }

  const validateAsync = async (): Promise<boolean> => {
    if (!props.rules || !props.rules.length) {
      return true
    }

    const results = normalizeValidationRules(props.rules.flat(), options.value.value)
    const asyncPromiseResults = results.filter((result) => isPromise(result))
    const syncRules = results.filter((result) => !isPromise(result))

    if (!asyncPromiseResults.length) { return processResults(syncRules) }

    isLoading.value = true
    return Promise.all(asyncPromiseResults)
      .then((asyncResults) => {
        return processResults([...syncRules, ...asyncResults])
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const validate = useOncePerTick((): boolean => {
    if (!props.rules || !props.rules.length) {
      return true
    }

    const rules = props.rules.flat()

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
  })

  watchEffect(() => validate())

  const { isDirty } = useDirtyValue(options.value, props, emit)

  const {
    // Renamed to forceHideError because it's not clear what it does
    forceHideErrors,
    forceHideLoading,
    forceHideErrorMessages,
    forceDirty,
    immediate: isFormImmediate,
  } = useFormChild({
    isTouched,
    isDirty,
    isValid: computed(() => !isError.value),
    isLoading: isLoading,
    errorMessages: errorMessages,
    validate,
    validateAsync,
    resetValidation,
    focus,
    reset: () => {
      reset()
      resetValidation()
      validate()
    },
    value: computed(() => options.value || props.modelValue),
    name: toRef(props, 'name'),
  })

  const immediateValidation = computed(() => props.immediateValidation || isFormImmediate.value)

  let canValidate = true
  const withoutValidation = (cb: () => any): void => {
    canValidate = false
    cb()
    // NextTick because we update props in the same tick, but they are updated in the next one
    nextTick(() => { canValidate = true })
  }
  watch(options.value, () => {
    if (!canValidate) { return }

    return validate()
  }, { immediate: immediateValidation.value })

  return {
    isDirty,
    isValid: computed(() => !isError.value),
    isError: isError,
    isTouched,
    isLoading: computed({
      get: () => {
        if (forceHideErrors.value) { return false }
        if (immediateValidation.value) {
          return isLoading.value
        }

        if (isTouched.value || isDirty.value || forceDirty.value) {
          return isLoading.value
        }

        return false
      },
      set (value) {
        isLoading.value = value
      },
    }),
    computedError: computed(() => {
      if (forceHideErrors.value) { return false }

      if (immediateValidation.value) {
        return isError.value
      }

      if (isTouched.value || isDirty.value || forceDirty.value) {
        return isError.value
      }

      return false
    }),
    computedErrorMessages: computed(() => forceHideErrorMessages.value ? [] : errorMessages.value),
    listeners: { onBlur },
    validate,
    resetValidation,
    withoutValidation,
    validationAriaAttributes,
  }
}
