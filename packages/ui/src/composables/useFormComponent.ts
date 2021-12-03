import { isString, isFunction, flatten } from 'lodash-es'
import { computed, inject, onMounted, onUnmounted, PropType, ref } from 'vue'
import { FormProvider, FormServiceKey } from '../components/va-form/consts'

/**
 * You could add these props to any component by destructuring them inside props option.
 * @example
 * props: { ...useFormComponentProps, componentsOwnProp, etc. }
 * It's better to add props at the beginning, to make sure that Component own props will be used instead in case of collision
 */
export const useFormComponentProps = {
  rules: { type: Array as PropType<any[]>, default: () => [] },
  disabled: { type: Boolean as PropType<boolean>, default: false },
  readonly: { type: Boolean as PropType<boolean>, default: false },
  success: { type: Boolean as PropType<boolean>, default: false },
  messages: { type: Array as PropType<any[]>, default: () => [] },
  error: { type: Boolean as PropType<boolean>, default: false },
  errorMessages: { type: [Array, String] as PropType<any[] | string> },
  errorCount: { type: Number as PropType<string | number>, default: 1 },
  id: { type: [String, Number] as PropType<string | number>, default: undefined },
  name: { type: [String, Number] as PropType<string | number>, default: undefined },

  modelValue: {
    default: undefined,
    validator: () => {
      throw new Error('ValidateMixin: `modelValue` prop should be defined in component.')
    },
  },
}

const prepareValidations = (messages: string | any[] = [], callArguments = null) => {
  if (isString(messages)) {
    messages = [messages]
  }
  return messages
    .map((message: any) => isFunction(message) ? message(callArguments) : message)
}

export function useFormComponent (
  props: Record<string, any>,
  reset: () => any,
  focus: () => any,
  blur: () => any,
) {
  const hadFocus = ref(false)
  const isFocused = ref(false)
  const internalErrorMessages = ref([] as any[])
  const internalError = ref(false)
  const isFormComponent = ref(true)
  const formProvider: FormProvider | undefined = inject(FormServiceKey, undefined)

  const validate = () => {
    computedError.value = false
    computedErrorMessages.value = []

    if (props.rules && props.rules.length > 0) {
      prepareValidations(flatten(props.rules), props.modelValue as any)
        .forEach((validateResult: any) => {
          if (isString(validateResult)) {
            computedErrorMessages.value.push(validateResult)
            computedError.value = true
          } else if (validateResult === false) {
            computedError.value = true
          }
        })
    }

    return !computedError.value
  }

  const resetValidation = (): void => {
    computedErrorMessages.value = []
    computedError.value = false
  }

  const hasError = (): any => {
    return computedError.value
  }

  // eslint-disable-next-line camelcase
  const ValidateMixin_onBlur = (): void => {
    isFocused.value = false
    computedError.value = false
    validate()
  }

  const shouldValidateOnBlur = computed(() => {
    // We want for inputs to validate on blur only after they've been interacted with.
    return hadFocus.value
  })

  const computedError = computed({
    get () {
      return props.error || internalError.value
    },
    set (errorMessage: boolean) {
      internalError.value = errorMessage
    },
  })

  const computedErrorMessages = computed({
    get () {
      return props.errorMessages ? prepareValidations(props.errorMessages) : internalErrorMessages.value
    },
    set (errorMessages: any[]) {
      internalErrorMessages.value = errorMessages
    },
  })

  const formContext = {
    resetValidation,
    validate,
    reset,
    hasError,
    focus,
    blur,
  }

  onMounted(() => formProvider?.onChildMounted(formContext))

  onUnmounted(() => formProvider?.onChildUnmounted(formContext))

  return {
    isFocused,
    isFormComponent,
    formProvider,
    validate,
    ValidateMixin_onBlur,
    shouldValidateOnBlur,
    resetValidation,
    hasError,
    computedError,
    computedErrorMessages,
  }
}
