<template>
  <conponent
    class="va-form"
    :is="tag"
    v-on="$listeners"
  >
    <slot />
  </conponent>
</template>

<script>
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const getNestedFormElements = (vm, elements = []) => {
  vm.$children.forEach((child) => {
    if (child.isFormElement) {
      elements.push(child)
    }

    child.$children.length > 0 && getNestedFormElements(child, elements)
  })

  return elements
}

const FormContextMixin = makeContextablePropsMixin({
  startValidatingOnBlur: {
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: 'div',
  },
})

export default {
  name: 'VaForm',
  mixins: [FormContextMixin],
  props: {
  },
  mounted () {
    if (this.autofocus) {
      this.focus()
    }
    if (this.startValidatingOnBlur) {
      getNestedFormElements(this)
        .filter(({ setValidateOnBlur }) => setValidateOnBlur && setValidateOnBlur())
    }
  },
  methods: {
    // public methods
    reset () {
      getNestedFormElements(this)
        .filter(({ reset }) => reset)
        .forEach((item) => {
          item.reset()
        })
    },
    resetValidation () {
      getNestedFormElements(this)
        .filter(({ resetValidation }) => resetValidation)
        .forEach((item) => {
          item.resetValidation()
        })
    },
    focus () {
      const focusableElement = getNestedFormElements(this).find(({ focus }) => focus)

      if (focusableElement) {
        focusableElement.focus()
      }
    },
    focusInvalid () {
      const invalidComponent = getNestedFormElements(this)
        .filter(({ hasError }) => hasError)
        .find((item) => item.hasError())

      if (invalidComponent) {
        invalidComponent.focus()
      }
    },
    validate () { // NOTE: temporarily synchronous validation
      let formValid = true

      getNestedFormElements(this)
        .filter(({ validate }) => validate)
        .forEach((child) => {
          const isValidChild = child.validate()
          if (!isValidChild) {
            formValid = false
          }
        })

      this.$emit('validation', formValid)

      return formValid
    },
  },
}
</script>

<style lang="scss">
.va-form {
}
</style>
