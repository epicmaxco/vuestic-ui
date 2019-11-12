<template>
  <conponent
    class="va-form"
    :is="tag"
    v-on="$listeners"
    @submit="submit($event)"
    @reset="reset()"
    @validation="validation()"
    @resetValidation="resetValidation()"
  >
    <slot />
  </conponent>
</template>

<script>
import { ContextPluginMixin, getContextPropValue } from '../../context-test/context-provide/ContextPlugin'

// TODO: need to remove this line after component-form methods implementation (focus, clear, etc.)
const availableFormComponents = ['VaInput', 'VaColorInput', 'VaDatePicker', 'VaCheckbox', 'VaRadio', 'VaSelect', 'VaFileUpload']
const getAllChildren = (vm, children = []) => {
  vm.$children.forEach((child) => {
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
    }
  },
  mounted () {
    this.$el.addEventListener('focusin', this.focus)

    if (this.autofocus) {
      const firstFormChild = getAllChildren(this).find((child) => availableFormComponents.includes(child.$options.name))

      if (firstFormChild) {
        firstFormChild.$el.focus()
      }
    }

    if (this.tag !== 'form') { // component dont have tag form, we need set listeners manually
      const resetButton = this.$el.querySelector('button[type=reset]')

      if (resetButton) {
        resetButton.addEventListener('click', this.reset)
      }

      const submitButton = this.$el.querySelector('button[type=submit]')

      if (submitButton) {
        submitButton.addEventListener('click', this.submit)
      }
    }
  },
  beforeDestroy () {
    this.$el.removeEventListener('focusin', this.focus)
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
    focusInvalid (invalidFormElement) {
      if (!this.valid) {
        invalidFormElement.focus()
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
}
</script>

<style lang="scss">
.va-form {
}
</style>
