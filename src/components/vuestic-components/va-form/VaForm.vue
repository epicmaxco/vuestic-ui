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

const getNestedFormElements = (vm) => {
  const elements = []

  vm.$children.forEach((child) => {
    elements.push(child)

    // TODO: need to change detecting of form controls
    if (!child.validate) {
      child.$children.length > 0 && getNestedFormElements(child, elements)
    }
  })
  return elements
}

const FormContextMixin = makeContextablePropsMixin({
  lazyValidation: {
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
  },
  methods: {
    // public methods
    reset (e) {
      getNestedFormElements(this)
        .filter(({ clear }) => clear)
        .forEach((item) => {
          item.clear()
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
        .filter(({ validate }) => validate)
        .find((item) => !(item.validate()))

      invalidComponent && invalidComponent.focus()
    },
    validate () { // NOTE: temporarily synchronous validation
      let formValid = true

      const validatableElements = getNestedFormElements(this).filter(({ validate }) => validate)

      for (let i = 0; i < validatableElements.length; i++) {
        const child = validatableElements[i]

        if (!child.validate()) {
          formValid = false

          if (this.lazyValidation) {
            break
          }
        }
      }

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
