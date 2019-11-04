<script>

export default {
  name: 'VaForm',
  mixins: [],
  components: {
  },
  props: {
    lazyValidation: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },

  render (createElement) {
    const createAutofocusComponent = (component) => {
      this.$set(component.componentOptions.propsData, 'autofocus', this.autofocus)

      return component
    }

    const availableFormTags = ['va-input', 'va-color-input', 'va-date-picker', 'va-checkbox', 'va-radio', 'va-select', 'va-file-upload']

    const isFormComponent = (component) =>
      component.componentOptions // native components do not have componentOptions prop
        ? availableFormTags.includes(component.componentOptions.tag)
        : false

    const children = (this.$slots.default || [])

    let hasFormComponents = false
    let renderChildren = children

    if (children.length > 0) {
      renderChildren = children.map((child) => {
        if (isFormComponent(child) && !hasFormComponents) {
          hasFormComponents = true

          return createAutofocusComponent(child)
        }

        return child
      })
    }

    return createElement('form', {
      class: 'va-form',
    }, renderChildren)
  },
}
</script>

<style lang="scss">
.va-form {
}
</style>
