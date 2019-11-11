<script>
import { ContextPluginMixin, getContextPropValue } from '../../context-test/context-provide/ContextPlugin'

const availableFormTags = ['VaInput', 'VaColorInput', 'VaDatePicker', 'VaCheckbox', 'VaRadio', 'VaSelect', 'VaFileUpload']
const getAllChildren = (vm, children = []) => {
  vm.$children.forEach(function (child) {
    children.push(child)
    child.$children.length > 0 && getAllChildren(child, children)
  })
  return children
}

export default {
  name: 'VaForm',
  mixins: [ContextPluginMixin],
  props: {
    lazyValidation: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'lazyValidation', false)
      },
    },
    autofocus: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'autofocus', false)
      },
    },
    tag: {
      type: String,
      default () {
        return getContextPropValue(this, 'tag', 'div')
      },
    },
  },
  data () {
    return {
      valid: true,
      hasResetButton: false,
      hasSubmitButton: false,
    }
  },
  mounted () {
    this.$el.addEventListener('focusin', this.focus)
    const formChild = getAllChildren(this)

    if (this.autofocus) {
      const firstFormChild = formChild.find((child) => availableFormTags.includes(child.$options.name))

      if (firstFormChild) {
        firstFormChild.$el.focus()
      }
    }

    if (this.tag !== 'form') { // component dont have tag form, we need set listeners manually
      const resetButton = this.$el.querySelector('button[type=reset]')

      if (resetButton) {
        resetButton.addEventListener('click', this.reset)

        this.hasResetButton = true
      }

      const submitButton = this.$el.querySelector('button[type=submit]')

      if (submitButton) {
        submitButton.addEventListener('click', this.submit)

        this.hasSubmitButton = true
      }
    }
  },
  beforeDestroy () {
    this.$el.removeEventListener('focusin', this.focus)

    if (this.hasSubmitButton) {
      this.$el.querySelector('button[type=submit]').removeEventListener('click', this.submit)
    }

    if (this.hasResetButton) {
      this.$el.querySelector('button[type=reset]').removeEventListener('click', this.reset)
    }
  },
  methods: {
    preventAndStopPropagation (event) {
      event.preventDefault()
      event.stopPropagation()
    },
    submit (e) {
      this.validate()

      this.$listeners.submit && this.$listeners.submit(e)
    },
    focus () {
      this.$listeners.focus && this.$listeners.focus(true)
    },
    focusInvalid (formElement) {
      if (!this.valid) {
        formElement.focus()
      }
      this.$listeners.focusInvalid && this.$listeners.focusInvalid()
    },
    reset (e) {
      this.preventAndStopPropagation(e) // stop cleaning fields by browser

      getAllChildren(this).filter(({ clear }) => Boolean(clear)).forEach((item) => {
        item.clear()
      })

      this.$listeners.reset && this.$listeners.reset(true)
    },
    resetValidation () {
      this.valid = true

      getAllChildren(this).filter((child) => child.resetValidate).forEach((item) => {
        item.resetValidate()
      })
    },
    validation () {
      this.$listeners.validation && this.$listeners.validation(this.valid)

      return this.valid
    },
    validate () { // NOTE: temporarily synchronous validation
      const childrenWithValidation = getAllChildren(this).filter((child) => child.validate)

      for (let item of childrenWithValidation) { // for of cycle available use break
        const isValidChild = item.validate()

        if (!isValidChild) {
          this.valid = false

          this.validation()
          this.focusInvalid(item.$el)

          if (this.lazyValidation) {
            break
          }
        }
      }
    },
  },

  render (createElement) {
    return createElement(this.tag, {
      class: 'va-form',
      on: {
        ...this.$listeners,
        submit: this.submit, // overwrite form native actions
        reset: this.reset, // overwrite form native actions
        validation: this.validation, // overwrite form native actions
        resetValidation: this.resetValidation,
      },
    }, this.$slots.default || [])
  },
}
</script>

<style lang="scss">
.va-form {
}
</style>
