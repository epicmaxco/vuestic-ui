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
  },
  methods: {
    focusEvent () {
      this.$listeners.focus && this.$listeners.focus()
    },
    focus () {
      const firstFormChild = getAllChildren(this).find((child) => availableFormTags.includes(child.$options.name))

      firstFormChild.$el.focus()

      this.focusEvent()
    },
  },

  render (createElement) {
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
