import {
  watch,
  computed,
  type PropType,
  type ExtractPropTypes,
  nextTick,
  toRef,
  type Ref,
  watchEffect,
  Prop,
} from 'vue'

import { useFormChild } from '../../useForm'
import { isFunction } from '../../../utils/is-function'
import { isString } from '../../../utils/is-string'
import { useVModelStateful } from '../../std/internal/useVModelStateful'
import { useElementFocused } from '../../std'
import { isPromise } from '../../../utils/is-promise'
import { useTouched } from './useTouched'
import { useDirty } from './useDirty'
import { useOncePerTickFn } from '../../std/internal/useOncePerTickFn'
import { TemplateRef } from '../../../utils/types/template-ref'

type ValidationRule<V = any> = ((v: V) => any | string) | Promise<((v: V) => any | string)>

type UseValidationOptions = {
  reset: () => void
}

const normalizeValidationRules = (rules: string | ValidationRule[] = [], callArguments: unknown = null) => {
  if (isString(rules)) { rules = [rules] as any }

  return (rules as ValidationRule[])
    .map((rule) => isFunction(rule) ? rule(callArguments) : rule)
}

export const defaultProps = {
  name: { type: String, default: undefined },
  rules: { type: Array as PropType<ValidationRule<any>[]>, default: () => [] as any },
  dirty: { type: Boolean, default: false },
  error: { type: Boolean, default: undefined },
  errorMessages: { type: [Array, String] as PropType<string[] | string>, default: [] },
  errorCount: { type: [String, Number], default: 1 },
  success: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  messages: { type: [Array, String] as PropType<string[] | string>, default: () => [] },
  immediateValidation: { type: Boolean, default: false },
}

export const defineFormControlProps = <
  Props extends {
    modelValue: Prop<any, any>,
  }
>(props: Props) => {
  return {
    ...defaultProps,
    ...props,
  }
}

export const useFormControlEmits = ['update:error', 'update:errorMessages', 'update:dirty'] as const

export const useFormControl = <V, P extends {
  name?: string | undefined,
  rules?: ValidationRule<V>[],
  error?: boolean | undefined,
  errorMessages?: string | string[],
  messages: string | string[],
  dirty: boolean,
  success: boolean,
  loading: boolean,
  immediateValidation: boolean,
}>(
    el: Ref<TemplateRef>,
    value: Ref<V>,
    props: P,
    emit: (event: any, ...args: any[]) => void,
    options: UseValidationOptions,
  ) => {
  const isFocused = useElementFocused(el)

  const { reset } = options
  const isError = useVModelStateful(props, 'error', emit)
  const errorMessages = useVModelStateful(props, 'errorMessages', emit)
  const isLoading = useVModelStateful(props, 'loading', emit)
  const isTouched = useTouched(isFocused)
  const isDirty = useDirty(value, props, emit)

  const validationAriaAttributes = computed(() => ({
    'aria-invalid': isError.value,
    'aria-errormessage': typeof errorMessages.value === 'string'
      ? errorMessages.value
      : errorMessages.value?.join(', '),
  }))

  const resetValidation = () => {
    errorMessages.value = []
    isError.value = false
    isDirty.value = false
    isTouched.value = false
    isLoading.value = false
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

    const results = normalizeValidationRules(props.rules.flat(), value.value)
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

  const validate = useOncePerTickFn((): boolean => {
    if (!props.rules || !props.rules.length) {
      return true
    }

    const rules = props.rules.flat()

    const results = normalizeValidationRules(rules, value.value)
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

  const {
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
    errorMessages: computed(() => errorMessages.value ?? []),
    validate,
    validateAsync,
    resetValidation,
    focus: () => { isFocused.value = true },
    reset: () => {
      reset()
      resetValidation()
      validate()
    },
    value: computed(() => value.value),
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
  watch(value, () => {
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
        if (forceHideLoading.value) { return false }
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
    validate,
    resetValidation,
    withoutValidation,
    validationAriaAttributes,
  }
}
