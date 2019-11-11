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
        return getContextPropValue(this, 'tag', 'form')
      },
    },
  },
  mounted () {
    if (this.autofocus) {
      const firstFormChild = getAllChildren(this).find((child) => availableFormTags.includes(child.$options.name))
      firstFormChild.$el.focus()
    }

    this.valid = true
    this.$el.addEventListener('focusin', this.focus)
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
    focus (e) {
      this.$listeners.focus && this.$listeners.focus(e)
    },
    focusInvalid (formElement) {
      if (!this.valid) {
        console.log('formElement__focus', formElement)
        formElement.focus()
      }
    },
    reset (e) {
      this.preventAndStopPropagation(e)

      getAllChildren(this).filter(({ clear }) => Boolean(clear)).forEach((item) => {
        item.clear(e)
      })

      this.$listeners.reset && this.$listeners.reset(true)
    },
    resetValidation () {
      this.valid = true
    },
    validation () {
      this.$listeners.validation && this.$listeners.validation(this.valid)

      return this.valid
    },
    validate () { // NOTE: temporarily synchronous validation
      const childrenWithValidation = getAllChildren(this).reduce((result, child) => child.validate ? [...result, child] : result, [])
      if (childrenWithValidation) {
        for (let item of childrenWithValidation) {
          const isValidChild = item.validate()

          console.log('isValidChild', isValidChild)

          if (!isValidChild) {
            this.valid = false
            const childElement = item.$el

            this.validation()
            this.focusInvalid(childElement)

            if (this.lazyValidation) {
              break
            }
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
