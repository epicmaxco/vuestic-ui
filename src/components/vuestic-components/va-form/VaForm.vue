<template>
  <conponent
    class="va-form"
    :is="tag"
    v-on="$listeners"
    @submit="submit($event)"
    @reset="reset()"
    @validation="validation()"
    @focusInvalid="focusInvalid()"
    @resetValidation="resetValidation()"
  >
    <slot />
  </conponent>
</template>

<script>
import { ContextPluginMixin, getContextPropValue } from '../../context-test/context-provide/ContextPlugin'

const getNestedFormElements = (vm, children = []) => {
  vm.$children.forEach((child) => {
    children.push(child)

    // TODO: need to change detecting of form controls
    if (!child.validate) {
      child.$children.length > 0 && getNestedFormElements(child, children)
    }
  })
  return children
}

export default {
  name: 'VaForm',
  mixins: [ContextPluginMixin],
  props: {
    lazyValidation: {
      type: Boolean,
      default: false,
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
  mounted () {
    if (this.autofocus) {
      this.focus()
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
  methods: {
    validation (e) {
      this.$emit('validation', e)
    },
    // public methods
    reset (e) {
      getNestedFormElements(this).filter(({ clear }) => clear).forEach((item) => {
        item.clear()
      })
    },
    resetValidation () {
      getNestedFormElements(this)
        .filter(({ resetValidate }) => resetValidate)
        .forEach((item) => {
          item.resetValidation()
        })
    },
    focus () {
      getNestedFormElements(this).find(({ focus }) => focus).focus()
    },
    focusInvalid () {
      getNestedFormElements(this)
        .filter(({ validate }) => validate)
        .find((item) => item.validate())
        .focus()
    },
    validate () { // NOTE: temporarily synchronous validation
      const childrenWithValidation = getNestedFormElements(this).filter(({ validate }) => Boolean(validate))
      let hasFocusInvalid = false
      let formValid = true

      for (let i = 0; i < childrenWithValidation.length; i++) {
        const child = childrenWithValidation[i]

        if (child.validate()) {
          formValid = false
          this.validation()
          if (!hasFocusInvalid) {
            this.onFocusInvalid(child.$el)

            hasFocusInvalid = true
          }

          if (this.lazyValidation) {
            break
          }
        }
      }

      return formValid
    },
  },
}
</script>

<style lang="scss">
.va-form {
}
</style>
