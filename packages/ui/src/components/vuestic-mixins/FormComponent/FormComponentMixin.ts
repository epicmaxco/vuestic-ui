import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import flatten from 'lodash/flatten'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { mixins, Options } from 'vue-class-component'
import { Inject } from 'vue-property-decorator'

const prepareValidations = (messages: any = [], callArguments = null) => {
  if (isString(messages)) {
    messages = [messages]
  }
  return messages
    .map((message: any) => isFunction(message) ? message(callArguments) : message)
}

const componentProps = {
  rules: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  success: { type: Boolean, default: false },
  messages: { type: Array, default: () => [] },
  error: { type: Boolean, default: false },
  errorMessages: { type: [Array, String], default: () => [] },
  errorCount: { type: Number, default: 1 },
}

const PropsMixin = makeContextablePropsMixin(componentProps)

@Options({
  props: {
    id: {
      type: [String, Number],
      default: undefined,
    },
    name: {
      type: [String, Number],
      default: undefined,
    },
    modelValue: {
      validator: () => {
        throw new Error('ValidateMixin: `modelValue` prop should be defined in component.')
      },
    },
  },
})
export class FormComponentMixin extends mixins(
  PropsMixin,
) {
  hadFocus = false
  isFocused = false
  internalErrorMessages = null
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

  @Inject() readonly formProvider!: {
    onChildMounted: (child: FormComponentMixin) => void;
    onChildUnmounted: (child: FormComponentMixin) => void;
  }

  mounted () {
    this.formProvider.onChildMounted(this)
  }

  unmounted () {
    this.formProvider.onChildUnmounted(this)
  }

  /** @public */
  validate (): any {
    this.computedError = false
    this.computedErrorMessages = []

    if (this.rules && this.rules.length > 0) {
      prepareValidations(flatten(this.rules), this.modelValue)
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
    return prepareValidations(this.errorMessages) || this.internalErrorMessages
  }

  set computedErrorMessages (errorMessages) {
    this.internalErrorMessages = errorMessages
  }
}
