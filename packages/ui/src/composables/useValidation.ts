import { inject, onBeforeUnmount, onMounted, PropType, watch, ExtractPropTypes } from 'vue'
import flatten from 'lodash/flatten.js'
import isFunction from 'lodash/isFunction.js'
import isString from 'lodash/isString.js'
import { useSyncProp } from './useSyncProp'
import { FormServiceKey } from '../components/va-form/consts'
import { useFocus } from './useFocus'

type ValidationRule<V extends any = any> = ((v: V) => any | string)

const normalizeValidationRules = (rules: string | ValidationRule[] = [], callArguments: unknown = null) => {
  if (isString(rules)) { rules = [rules] as any }

  return (rules as ValidationRule[])
    .map((rule) => isFunction(rule) ? rule(callArguments) : rule)
}

export const useValidationProps = {
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
  reset: () => any,
  focus: () => any,
) => {
  const { isFocused, onFocus, onBlur } = useFocus()

  const [computedError] = useSyncProp('error', props, emit, false)
  const [computedErrorMessages] = useSyncProp('errorMessages', props, emit, [] as string[])

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
    form?.onChildMounted(context as any)
  })

  onBeforeUnmount(() => {
    form?.onChildUnmounted(context as any)
  })

  return {
    computedError,
    computedErrorMessages,
    listeners: { onFocus, onBlur },
    validate,
    resetValidation,
  }
}
