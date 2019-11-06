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
  components: {
  },
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
    focus () {
      this.$listeners.focus && this.$listeners.focus()
    },
    validationEvent (value) {
      this.$listeners.validation && this.$listeners.validation(value)
    },
    resetEvent (value) {
      this.$listeners.reset && this.$listeners.reset(value)
    },
    focusInvalid (item) {
      if (!this.valid) {
        this.focus(item)
      }
    },
    reset (e) {
      this.preventAndStopPropagation(e)

      getAllChildren(this).filter(({ clear }) => Boolean(clear)).forEach((item) => {
        item.clear(e)
      })

      this.resetEvent(true)
    },
    resetValidation () {
      this.valid = true
    },
    validate () { // NOTE: temporarily synchronous validation
      const childrenValidations = getAllChildren(this).reduce((result, child) => child.validate ? [...result, { child, valid: child.validate() }] : result, [])

      if (childrenValidations) {
        for (let item of childrenValidations) {
          if (!item.valid) {
            this.valid = false
            this.validationEvent(item)
            this.focusInvalid(item)

            if (this.lazyValidation) {
              break
            }
          }
        }
      }
    },
  },

  render (createElement) {
    this.$nextTick(this.validate)

    return createElement('form', {
      class: 'va-form',
      on: {
        ...this.$listeners,
        reset: this.reset,
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
