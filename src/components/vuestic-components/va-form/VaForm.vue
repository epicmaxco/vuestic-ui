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
  const children = []

  vm.$children.forEach((child) => {
    children.push(child)

    // TODO: need to change detecting of form controls
    if (!child.validate) {
      child.$children.length > 0 && getNestedFormElements(child, children)
    }
  })
  return children
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
    validation (formValid) {
      this.$emit('validation', formValid)
    },
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
      getNestedFormElements(this)
        .find(({ focus }) => focus)
        .focus()
    },
    focusInvalid () {
      const invalidComponent = getNestedFormElements(this)
        .filter(({ validate }) => validate)
        .find((item) => item.validate())

      invalidComponent && invalidComponent.focus()
    },
    validate () { // NOTE: temporarily synchronous validation
      let formValid = true

      const childrenWithValidation = getNestedFormElements(this).filter(({ validate }) => validate)

      for (let i = 0; i < childrenWithValidation.length; i++) {
        const child = childrenWithValidation[i]

        if (child.validate()) {
          formValid = false

          if (this.lazyValidation) {
            break
          }
        }
      }

      this.validation(formValid)

      return formValid
    },
  },
}
</script>

<style lang="scss">
.va-form {
}
</style>
