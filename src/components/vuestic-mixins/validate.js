import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import flatten from 'lodash/flatten'
import { makeContextablePropsMixin } from './../context-test/context-provide/ContextPlugin'

const prepareValidations = (messages = [], callArguments = null) => {
  if (isString(messages)) messages = [messages]
  return messages
    .map((message) => isFunction(message) ? message(callArguments) : message)
}

const validateContextMixin = makeContextablePropsMixin({
  rules: Array,
  value: [String, Number],
  error: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: [Array, String],
    default: () => [],
  },
  errorCount: {
    type: Number,
    default: 1,
  },
})

export default {
  mixins: [validateContextMixin],
  data () {
    return {
      isValidatedOnBlur: false,
      internalErrorMessages: null,
      internalError: false,
    }
  },
  watch: {
    value (v) {
      if (!this.isValidatedOnBlur) {
        this.validate(v)
      }
    },
    blur () {
      this.isValidatedOnBlur = true
      this.validate()
    },
  },
  methods: {
    validate (value = this.value) {
      if (this.computedError) {
        return false
      }

      this.computedError = false
      this.computedErrorMessages = []

      if (this.rules && this.rules.length > 0) {
        prepareValidations(flatten(this.rules), value)
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
    runLazyValidation () {
      this.isLazyValidation = true
    },
    resetValidation () {
      this.computedErrorMessages = []
      this.computedError = false
    },
    hasError () {
      return this.computedError
    },
    setValidateOnBlur () {
      this.isValidatedOnBlur = true
      return true
    },
  },
  computed: {
    computedError: {
      get () {
        return this.internalError || this.error
      },
      set (_errorMessage) {
        this.internalError = _errorMessage
      },
    },
    computedErrorMessages: {
      get () {
        return this.internalErrorMessages || prepareValidations(this.errorMessages)
      },
      set (_errorMessages) {
        this.internalErrorMessages = _errorMessages
      },
    },
  },
}
