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
      this.focusChild()
    }

    this.$el.addEventListener('focusin', this.focus)
  },
  methods: {
    preventAndStopPropagation (event) {
      event.preventDefault()
      event.stopPropagation()
    },
    submit (event) {
      this.preventAndStopPropagation(event)

      return this.$emit('submit', event)
    },
    reset (event) {
      this.preventAndStopPropagation(event)

      return this.$emit('reset', event)
    },
    focus (event) {
      this.$emit('focus', event)
    },
    focusChild () {
      const firstFormChild = getAllChildren(this).find((child) => availableFormTags.includes(child.$options.name))

      firstFormChild.$el.focus()

      this.focus()
    },
  },

  render (createElement) {
    return createElement('form', {
      class: 'va-form',
      on: {
        ...this.$listeners,
        submit: this.submit,
        reset: this.reset,
        focus: this.focus,
      },
    }, this.$slots.default || [])
  },
}
</script>

<style lang="scss">
.va-form {
}
</style>
