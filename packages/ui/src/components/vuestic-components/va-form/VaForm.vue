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
import { Inject, Mixins, Provide } from 'vue-property-decorator'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { FormComponentMixin } from '../../vuestic-mixins/FormComponent/FormComponentMixin'

const FormPropsMixin = makeContextablePropsMixin({
  autofocus: { type: Boolean, default: false },
  tag: { type: String, default: 'div' },
})

interface UniversalFormBlock {
  reset: () => void;
  some: () => void;
}

@Options({
  name: 'VaForm',
  emits: ['validation'],
})
export default class VaForm extends Mixins(
  FormPropsMixin,
) {
  nestedFormElements: (FormComponentMixin | VaForm)[] = [];

  @Inject('formProvider') readonly parentFormProvider?: {
    onChildMounted: (child: FormComponentMixin | VaForm) => void;
    onChildUnmounted: (child: FormComponentMixin | VaForm) => void;
  }

  @Provide() formProvider = {
    onChildMounted: (child: FormComponentMixin | VaForm) => this.childMountedHandler(child),
    onChildUnmounted: (removableChild: FormComponentMixin | VaForm) => this.childUnmountedHandler(removableChild),
  }

  childMountedHandler (child: FormComponentMixin | VaForm) {
    this.nestedFormElements.push(child)
  }

  childUnmountedHandler (removableChild: FormComponentMixin | VaForm) {
    this.nestedFormElements = this.nestedFormElements.filter(child => child !== removableChild)
  }

  mounted () {
    if (this.parentFormProvider) {
      this.parentFormProvider.onChildMounted(this)
    }
    if (this.autofocus) {
      this.$nextTick(() => {
        this.focus()
      })
    }
  }

  unmounted () {
    if (this.parentFormProvider) {
      this.parentFormProvider.onChildUnmounted(this)
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
    } else {
      const nestedFormComponents = this.nestedFormElements.filter(({ nestedFormElements }) => nestedFormElements)
      nestedFormComponents.forEach(formComponent => formComponent.focusInvalid())
    }
  }

  validate () { // NOTE: temporarily synchronous validation
    let formValid = true
    this.nestedFormElements
      .filter(({ validate }) => validate)
      .forEach((child) => {
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
