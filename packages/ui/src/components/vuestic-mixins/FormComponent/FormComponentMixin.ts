import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import flatten from 'lodash/flatten'
import { inject } from 'vue'
import { mixins, Options, prop, Vue, setup } from 'vue-class-component'

import { FormProvider, FormServiceKey } from '../../vuestic-components/va-form/consts'

const prepareValidations = (messages: string | any[] = [], callArguments = null) => {
  if (isString(messages)) {
    messages = [messages]
  }
  return messages
    .map((message: any) => isFunction(message) ? message(callArguments) : message)
}

class Props {
  rules = prop<any[]>({ type: Array, default: () => [] })
  disabled = prop<boolean>({ type: Boolean, default: false })
  readonly = prop<boolean>({ type: Boolean, default: false })
  success = prop<boolean>({ type: Boolean, default: false })
  messages = prop<any[]>({ type: Array, default: () => [] })
  error = prop<boolean>({ type: Boolean, default: false })
  errorMessages = prop<any[] | string>({ type: [Array, String] })
  errorCount = prop<string | number>({ type: Number, default: 1 })
  id = prop<string | number>({
    type: [String, Number],
    default: undefined,
  })

  name = prop<string | number>({
    type: [String, Number],
    default: undefined,
  })

  modelValue = prop({
    validator: () => {
      throw new Error('ValidateMixin: `modelValue` prop should be defined in component.')
    },
  })
}

const PropsMixin = Vue.with(Props)

@Options({})
export class FormComponentMixin extends mixins(
  PropsMixin,
) {
  hadFocus = false
  isFocused = false
  internalErrorMessages: any[] = []
  internalError = false
  isFormComponent = true

  // beforeMount () {
  //   console.log('im here', )
  //   // That's just a flag for form to figure out whether component is form component.
  //   this.isFormComponent = true
  // }

  // @Watch('rules', { deep: true })
  // onRulesChanged (newVal: any, oldVal: any) {
  //   // We want this check, because rules are passed as function,
  //   // and, therefore, are recalculated on pretty much every change.
  //   if (deepEqual(newVal, oldVal)) {
  //     return
  //   }
  //   this.validate()
  // }

  // @Watch('isFocused')
  // onIsFocusedChanged (isFocused: boolean) {
  //   if (isFocused) {
  //     this.hadFocus = true
  //   }
  // }

  formProvider = setup(() => {
    const formProvider: FormProvider | undefined = inject(FormServiceKey, undefined)

    return {
      ...formProvider,
    }
  })

  mounted () {
    if (Object.keys(this.formProvider).length) {
      (this.formProvider as FormProvider).onChildMounted(this)
    }
  }

  unmounted () {
    if (Object.keys(this.formProvider).length) {
      (this.formProvider as FormProvider).onChildUnmounted(this)
    }
  }

  /** @public */
  validate (): any {
    this.computedError = false
    this.computedErrorMessages = []

    if (this.rules && this.rules.length > 0) {
      prepareValidations(flatten(this.rules), this.modelValue as any)
        .forEach((validateResult: any) => {
          if (isString(validateResult)) {
            this.computedErrorMessages.push(validateResult)
            this.computedError = true
          } else if (validateResult === false) {
            this.computedError = true
          }
        })
    }

    return !this.computedError
  }

  /** @public */
  focus (): void {
    throw new Error('focus method should be implemented in component')
  }

  /** @public */
  reset (): void {
    throw new Error('reset method should be implemented in component')
  }

  resetValidation (): void {
    this.computedErrorMessages = []
    this.computedError = false
  }

  hasError (): any {
    return this.computedError
  }

  // eslint-disable-next-line camelcase
  ValidateMixin_onBlur (): void {
    this.isFocused = false
    this.computedError = false
    this.validate()
  }

  get shouldValidateOnBlur () {
    // We want for inputs to validate on blur only after they've been interacted with.
    return this.hadFocus
  }

  get computedError () {
    return this.error || this.internalError
  }

  set computedError (errorMessage) {
    this.internalError = errorMessage
  }

  get computedErrorMessages () {
    return this.errorMessages ? prepareValidations(this.errorMessages) : this.internalErrorMessages
  }

  set computedErrorMessages (errorMessages) {
    this.internalErrorMessages = errorMessages
  }
}
