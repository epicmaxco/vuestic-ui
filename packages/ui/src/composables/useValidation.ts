import { inject, onBeforeUnmount, onMounted, provide, watch } from 'vue'
import { isString, isFunction, flatten } from 'lodash-es'
import { useForm, FormComponentProps } from './useForm'
import { useSyncProp } from './useSyncProp'
import { FormServiceKey } from 'src/components/va-form/consts'

interface ValidationProps {
  modelValue: any,
  error: boolean;
  errorMessages: any[] | string;
  errorCount: string | number;
  rules: any[]
  success: boolean
  messages: any[]
}

type ValidationRule = (() => any | string)[]

const prepareValidations = (messages: string | ValidationRule[] = [], callArguments = null) => {
  if (isString(messages)) { messages = [messages] as any }

  return (messages as ValidationRule[])
    .map((message) => isFunction(message) ? message(callArguments) : message)
}

export const useValidation = (
  props: ValidationProps & FormComponentProps,
  emit: (event: any) => any,
  reset: () => any,
) => {
  const { isFocused, listeners, focus, blur } = useForm(props)

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

    prepareValidations(rules, props.modelValue)
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
    focus,
    blur,
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
    listeners,
  }
}
