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
      this.focus()
    }

    this.focusEvent()
    this.valid = true
  },
  methods: {
    focusEvent () {
      this.$listeners.focus && this.$listeners.focus()
    },
    validationEvent (value) {
      this.$listeners.validation && this.$listeners.validation(value)
    },
    resetEvent (value) {
      this.$listeners.reset && this.$listeners.reset(value)
    },
    focus () {
      const firstFormChild = getAllChildren(this).find((child) => availableFormTags.includes(child.$options.name))

      firstFormChild.$el.focus()

      this.focusEvent()
    },
    reset () {
      getAllChildren(this).filter(({ reset }) => Boolean(reset)).forEach((item) => {
        item.reset()
      })

      this.resetEvent(true)
    },
    validate () { // NOTE: temporarily synchronous validation
      const childrenValidations = getAllChildren(this).reduce((result, child) => child.validate ? [...result, { child, valid: child.validate() }] : result, [])

      if (childrenValidations) {
        for (let item of childrenValidations) {
          if (!item.valid) {
            this.valid = false
            this.validationEvent(item)

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
      },
    }, this.$slots.default || [])
  },
}
</script>

<style lang="scss">
.va-form {
}
</style>
