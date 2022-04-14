import { inject, onBeforeUnmount, onMounted, PropType, watch, ref } from 'vue'
import flatten from 'lodash/flatten'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import { useSyncProp } from './useSyncProp'
import { FormServiceKey } from '../components/va-form/consts'
import { useFocus } from './useFocus'

type ValidationRule = (() => any | string)

export interface ValidationProps {
  modelValue: unknown
  error?: boolean
  errorMessages?: string[] | string
  errorCount: string | number
  rules: ValidationRule[]
  success: boolean
  messages: string[] | string
  immediateValidation: boolean
}

export const useValidationProps = {
  modelValue: { required: false },
  error: { type: Boolean, default: undefined },
  errorMessages: { type: [Array, String] as PropType<string[] | string>, default: undefined },
  errorCount: { type: [String, Number], default: 1 },
  rules: { type: Array as PropType<ValidationRule[]>, default: () => [] },
  success: { type: Boolean, default: false },
  messages: { type: [Array, String] as PropType<string[] | string>, default: () => [] },
  immediateValidation: { type: Boolean, default: false },
}

export const useValidationEmits = ['update:error', 'update:errorMessages']

export type validationResult = boolean | string | Promise<any>

const normalizeValidationRules = (rules: string | ValidationRule[] = [], callArguments: unknown = null) => {
  if (isString(rules)) { rules = [rules] as any }

  return (rules as ValidationRule[])
    .map((rule) => isFunction(rule) ? rule(callArguments) : rule)
}

export const useValidation = (
  props: ValidationProps,
  emit: (event: any, ...args: any[]) => void,
  reset: () => any,
  focus: () => any,
) => {
  const { isFocused, onFocus, onBlur } = useFocus()

  const [computedError] = useSyncProp('error', props, emit, false)
  const [computedErrorMessages] = useSyncProp('errorMessages', props, emit, [])
  const innerLoadingState = ref(false)

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
      .forEach((validationResult: validationResult) => {
        if (isString(validationResult)) {
          errorMessages = [...errorMessages, validationResult]
          error = true
        } else if (validationResult === false) {
          error = true
        } else if (validationResult instanceof Promise) {
          innerLoadingState.value = true

          validationResult
            .then(promisedValidationResult => {
              if (isString(promisedValidationResult)) {
                errorMessages = [...errorMessages, promisedValidationResult]
                error = true
              }
            })
            .catch(e => { throw new Error(e) })
            .finally(() => {
              computedErrorMessages.value = [...errorMessages]
              computedError.value = error
              innerLoadingState.value = false
            })
        }
      })

    computedErrorMessages.value = errorMessages
    computedError.value = error

    return !error
  }

  watch(isFocused, (newVal) => newVal === false && validate())

  watch(() => props.modelValue, () => validate(), { immediate: props.immediateValidation })

  const context = {
    resetValidation,
    focus,
    validate,
    reset,
    hasError: () => computedError.value,
  }

  const form = inject(FormServiceKey, undefined)

  onMounted(() => {
    form?.onChildMounted(context)
  })

  onBeforeUnmount(() => {
    form?.onChildUnmounted(context)
  })

  return {
    isInnerLoading: innerLoadingState,
    isFocused,
    computedError,
    computedErrorMessages,
    listeners: { onFocus, onBlur },
    validate,
    resetValidation,
  }
}
