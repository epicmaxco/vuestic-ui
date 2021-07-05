import { ref, toRefs, computed, inject, onMounted, onUnmounted } from 'vue'
import { FormProvider, FormServiceKey, FormElement } from '../../vuestic-components/va-form/consts'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import flatten from 'lodash/flatten'

const prepareValidations = (messages: string | any[] = [], callArguments = null) => {
  if (isString(messages)) {
    return [messages]
  }
  return messages
    .map((message) => isFunction(message) ? message(callArguments) : message)
}

export function useFormProvider (context: FormElement) {
  const formProvider: FormProvider | undefined = inject(FormServiceKey, undefined)
  onMounted(() => {
    if (formProvider?.onChildMounted) {
      formProvider.onChildMounted(context)
    }
  })
  onUnmounted(() => {
    if (formProvider?.onChildUnmounted) {
      formProvider.onChildUnmounted(context)
    }
  })
}

export function useFormComponent (props: Record<any, any>, focus: () => void, reset: () => void) {
  const isFocused = ref(false)
  const internalErrorMessages = ref([] as Array<any>)
  const internalError = ref(false)
  const isFormComponent = ref(true)
  const { error, errorMessages, rules, modelValue } = toRefs(props)

  useFormProvider({
    resetValidation,
    hasError,
    validate,
    focus,
    reset,
  })

  const computedError = computed<boolean>({
    get () {
      return error.value || internalError.value
    },
    set (value) {
      internalError.value = value
    },
  })

  const computedErrorMessages = computed<Array<any>>({
    get () {
      return errorMessages.value ? prepareValidations(errorMessages) : internalErrorMessages.value
    },
    set (errorMessages) {
      internalErrorMessages.value = errorMessages
    },
  })

  function validate () {
    computedError.value = false
    computedErrorMessages.value = []

    if (rules.value && rules.value.length > 0) {
      prepareValidations(flatten(rules), modelValue.value)
        .forEach((validateResult) => {
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

  function resetValidation (): void {
    computedErrorMessages.value = []
    computedError.value = false
  }

  function hasError (): boolean {
    return computedError.value
  }

  const formComponentListeners = {
    focus (): void {
      isFocused.value = true
    },
    blur (): void {
      isFocused.value = false
      validate()
    },
  }

  return {
    validate,
    resetValidation,
    hasError,
    computedError,
    computedErrorMessages,
    isFocused,
    isFormComponent,
    formComponentListeners,
  }
}

/**
 * Insert this to `@Options`.
 * This will add `modelValue`, `rules`, `disabled`, `rules`, `readonly`, `success`, `messages`, `error`, `errorMessages`, `errorCount`, `id`, `name` props.
 * If you want to use `modelValue` in your component you provide prop manually.
 *
 * @example
 ```
  @Options({ name: 'Example', ...formComponentOptions })
  export default class ExampleComponent extends Vue.with(props)
 ```
 */
export const formComponentOptions = {
  props: {
    rules: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    messages: {
      type: Array,
      default: () => [],
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessages: {
      type: [Array, String],
      default: undefined,
    },
    errorCount: {
      type: Number,
      default: 1,
    },
    id: {
      type: [String, Number],
      default: undefined,
    },
    name: {
      type: [String, Number],
      default: undefined,
    },
    modelValue: {
      type: undefined,
      default: undefined,
      validator: () => {
        throw new Error('ValidateMixin: `modelValue` prop should be defined in component.')
      },
    },
  },
}
