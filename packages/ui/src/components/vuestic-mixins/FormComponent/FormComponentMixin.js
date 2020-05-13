import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import flatten from 'lodash/flatten'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { deepEqual } from '../../../services/utils'

const prepareValidations = (messages = [], callArguments = null) => {
  if (isString(messages)) { messages = [messages] }
  return messages
    .map((message) => isFunction(message) ? message(callArguments) : message)
}

export const FormComponentMixin = {
  mixins: [
    makeContextablePropsMixin({
      rules: { type: Array, default: () => [] },
      disabled: { type: Boolean, default: false },
      readonly: { type: Boolean, default: false },
      success: { type: Boolean, default: false },
      messages: { type: Array, default: () => [] },
      error: { type: Boolean, default: false },
      errorMessages: { type: [Array, String], default: () => [] },
      errorCount: { type: Number, default: 1 },
    }),
  ],
  created () {
    // That's just a flag for form to figure out whether component is form component.
    this.isFormComponent = true
  },
  props: {
    id: { type: [String, Number], default: undefined },
    name: { type: [String, Number], default: undefined },
    value: {
      // Component should replace this prop by its own.
      validate: () => {
        throw new Error('ValidateMixin: `value` prop should be defined in component.')
      },
    },
  },
  data () {
    return {
      hadFocus: false,

      isFocused: false,
      internalErrorMessages: null,
      internalError: false,
    }
  },
  watch: {
    rules: {
      handler (newVal, oldVal) {
        // We want this check, because rules are passed as function,
        // and, therefore, are recalculated on pretty much every change.
        if (deepEqual(newVal, oldVal)) {
          return
        }
        this.validate()
      },
      deep: true,
    },
    isFocused (isFocused) {
      if (isFocused) {
        this.hadFocus = true
      }
    },
  },
  methods: {
    /** @public */
    validate () {
      this.computedError = false
      this.computedErrorMessages = []

      if (this.rules && this.rules.length > 0) {
        prepareValidations(flatten(this.rules), this.value)
          .forEach((validateResult) => {
            if (isString(validateResult)) {
              this.computedErrorMessages.push(validateResult)
              this.computedError = true
            } else if (validateResult === false) {
              this.computedError = true
            }
          })
      }

      return !this.computedError
    },
    /** @public */
    focus () {
      throw new Error('focus method should be implemented in component')
    },
    /** @public */
    reset () {
      throw new Error('reset method should be implemented in component')
    },
    resetValidation () {
      this.computedErrorMessages = []
      this.computedError = false
    },
    hasError () {
      return this.computedError
    },
    ValidateMixin_onBlur () {
      this.isFocused = false
      this.computedError = false
      this.validate()
    },
  },
  computed: {
    shouldValidateOnBlur () {
      // We want for inputs to validate on blur only after they've been interacted with.
      return this.hadFocus
    },
    computedError: {
      get () {
        return this.error || this.internalError
      },
      set (errorMessage) {
        this.internalError = errorMessage
      },
    },
    computedErrorMessages: {
      get () {
        return prepareValidations(this.errorMessages) || this.internalErrorMessages
      },
      set (errorMessages) {
        this.internalErrorMessages = errorMessages
      },
    },
  },
}
