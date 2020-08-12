<template>
  <component
    class="va-form"
    :is="tag"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const getNestedFormElements = (vm: any, elements: any = []) => {
  vm.$children.forEach((child: any) => {
    if (child.isFormComponent) {
      elements.push(child)
    }

    child.$children.length > 0 && getNestedFormElements(child, elements)
  })

  return elements
}

const FormPropsMixin = makeContextablePropsMixin({
  autofocus: { type: Boolean, default: false },
  tag: { type: String, default: 'div' },
})

@Component({
  name: 'VaForm',
})
export default class VaForm extends Mixins(
  FormPropsMixin,
) {
  mounted () {
    if (this.autofocus) {
      this.focus()
    }
  }

  // public methods
  reset () {
    getNestedFormElements(this)
      .filter(({ reset }: any) => reset)
      .forEach((item: any) => {
        item.reset()
      })
  }

  resetValidation () {
    getNestedFormElements(this)
      .filter(({ resetValidation }: any) => resetValidation)
      .forEach((item: any) => {
        item.resetValidation()
      })
  }

  focus () {
    const focusableElement = getNestedFormElements(this).find(({ focus }: any) => focus)

    if (focusableElement) {
      focusableElement.focus()
    }
  }

  focusInvalid () {
    const invalidComponent = getNestedFormElements(this)
      .filter(({ hasError }: any) => hasError)
      .find((item: any) => item.hasError())

    if (invalidComponent) {
      invalidComponent.focus()
    }
  }

  validate () { // NOTE: temporarily synchronous validation
    let formValid = true

    getNestedFormElements(this)
      .filter(({ validate }: any) => validate)
      .forEach((child: any) => {
        const isValidChild = child.validate()
        if (!isValidChild) {
          formValid = false
        }
      })

    this.$emit('validation', formValid)

    return formValid
  }
}
</script>

<style lang="scss">
.va-form {
}
</style>
