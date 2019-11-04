<script>
import { ContextPluginMixin, getContextPropValue } from '../../context-test/context-provide/ContextPlugin'

const availableFormTags = ['va-input', 'va-color-input', 'va-date-picker', 'va-checkbox', 'va-radio', 'va-select', 'va-file-upload']
// function getAllChildren (vm, children = []) {
//   vm.$children.forEach(function (child) {
//     children.push(child)
//     child.$children.length > 0 && getAllChildren(child, children)
//   })
//   return children
// }

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
      const target = this.$el.querySelector('[autofocus]')

      if (target) {
        target.focus()
      }

      return this.$emit('focus', event)
    },
  },

  render (createElement) {
    const createAutofocusComponent = (component) => {
      // NOTE: set property autofocus only to form components
      if (component.componentOptions && availableFormTags.includes(component.componentOptions.tag)) {
        this.$set(component.componentOptions.propsData, 'autofocus', this.autofocus)
      }

      return component
    }

    let children = (this.$slots.default || [])

    if (this.autofocus && children.length > 0) {
      children = children.map(createAutofocusComponent)
    }

    return createElement('form', {
      class: 'va-form',
      on: {
        ...this.$listeners,
        submit: this.submit,
        reset: this.reset,
        focus: this.focus,
      },
    }, children)
  },
}
</script>

<style lang="scss">
.va-form {
}
</style>
