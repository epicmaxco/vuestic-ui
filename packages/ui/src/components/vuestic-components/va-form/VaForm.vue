<template>
  <component
    class="va-form"
    :is="tag"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { Options } from 'vue-class-component'
import { Mixins, Provide } from 'vue-property-decorator'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
// import { Slot, VNode } from 'vue'
import { FormComponentMixin } from '../../vuestic-mixins/FormComponent/FormComponentMixin'

/* const isSlot = (slot: Slot | undefined): slot is Slot => {
  return slot !== undefined
} */

/* const getNestedFormElements = (vm: VaForm, elements: any = []) => {
  const slots = vm.$slots
  if (isSlot(slots.default)) {
    slots.default().forEach((child: VNode) => {
      console.log(child.type);
      if (child.isFormComponent) {
        elements.push(child)
      }

      child.$slots && child.$slots.default().length > 0 && getNestedFormElements(child, elements)
    })

    return elements
  }
} */

const FormPropsMixin = makeContextablePropsMixin({
  autofocus: { type: Boolean, default: false },
  tag: { type: String, default: 'div' },
})

@Options({
  name: 'VaForm',
  emits: ['validation'],
})
export default class VaForm extends Mixins(
  FormPropsMixin,
) {
  nestedFormElements: FormComponentMixin[] = [];

  @Provide() form = {
    onChildChange: (child: FormComponentMixin) => this.childChangeHandler(child),
    onChildMounted: (child: FormComponentMixin) => this.childMountedHandler(child),
    onChildUnmounted: (removableChild: FormComponentMixin) => this.childUnmountedHandler(removableChild),
  }

  childChangeHandler (child: FormComponentMixin) {
    console.log(child)
  }

  childMountedHandler (child: FormComponentMixin) {
    this.nestedFormElements.push(child)
  }

  childUnmountedHandler (removableChild: FormComponentMixin) {
    this.nestedFormElements = this.nestedFormElements.filter(child => child !== removableChild)
  }

  mounted () {
    if (this.autofocus) {
      this.$nextTick(() => {
        this.focus()
      })
    }
  }

  // public methods
  reset () {
    this.nestedFormElements
      .filter(({ reset }) => reset)
      .forEach((item) => {
        item.reset()
      })
  }

  resetValidation () {
    this.nestedFormElements
      .filter(({ resetValidation }) => resetValidation)
      .forEach((item: any) => {
        item.resetValidation()
      })
  }

  focus () {
    const focusableElement = this.nestedFormElements.find(({ focus }) => focus)
    if (focusableElement) {
      focusableElement.focus()
    }
  }

  focusInvalid () {
    const invalidComponent = this.nestedFormElements
      .filter(({ hasError }) => hasError)
      .find((item) => item.hasError())

    if (invalidComponent) {
      invalidComponent.focus()
    }
  }

  validate () { // NOTE: temporarily synchronous validation
    let formValid = true
    this.nestedFormElements
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
