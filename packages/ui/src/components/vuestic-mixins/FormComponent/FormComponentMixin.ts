import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import flatten from 'lodash/flatten'
import { deepEqual } from '../../../services/utils'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

const prepareValidations = (messages: any = [], callArguments = null) => {
  if (isString(messages)) { messages = [messages] }
  return messages
    .map((message: any) => isFunction(message) ? message(callArguments) : message)
}

@Component
export class FormComponentMixin extends Vue {
  hadFocus = false
  isFocused = false
  internalErrorMessages = null
  internalError = false

  @Prop({ type: Array, default: () => [] }) rules?: any[]
  @Prop({ type: Boolean, default: false }) disabled?: boolean
  @Prop({ type: Boolean, default: false }) readonly?: boolean
  @Prop({ type: Boolean, default: false }) success?: boolean
  @Prop({ type: Array, default: () => [] }) messages?: any[]
  @Prop({ type: Boolean, default: false }) error?: boolean
  @Prop({ type: [Array, String], default: () => [] }) errorMessages?: any[] | string
  @Prop({ type: Number, default: 1 }) errorCount?: number

  @Prop({ type: [String, Number], default: undefined }) id!: string | number
  @Prop({ type: [String, Number], default: undefined }) name!: string | number
  @Prop({
    validator: () => {
      throw new Error('ValidateMixin: `value` prop should be defined in component.')
    },
  }) value: any

  setup () {
    return {
      // That's just a flag for form to figure out whether component is form component.
      isFormComponent: true,
    }
  }

  @Watch('rules', { deep: true })
  onRulesChanged (newVal: any, oldVal: any) {
    // We want this check, because rules are passed as function,
    // and, therefore, are recalculated on pretty much every change.
    if (deepEqual(newVal, oldVal)) {
      return
    }
    this.validate()
  }

  @Watch('isFocused')
  onIsFocusedChanged (isFocused: boolean) {
    if (isFocused) {
      this.hadFocus = true
    }
  }

  /** @public */
  validate (): any {
    this.computedError = false
    this.computedErrorMessages = []

    if (this.rules && this.rules.length > 0) {
      prepareValidations(flatten(this.rules), this.value)
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
