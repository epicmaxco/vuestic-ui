<template>
  <component
    class="va-form"
    :is="tag"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { provide } from 'vue'
import { Options, mixins, prop, Vue, setup } from 'vue-class-component'
import { useFormProvider } from '../../vuestic-mixins/FormComponent/cFormComponent'
import { FormServiceKey, FormElement } from './consts'

class FormProps {
  autofocus = prop<boolean>({ type: Boolean, default: false })
  tag = prop<string>({ type: String, default: 'div' })
}

const FormPropsMixin = Vue.with(FormProps)

@Options({
  name: 'VaForm',
  emits: ['validation'],
})
export default class VaForm extends mixins(
  FormPropsMixin,
) {
  nestedFormElements: (FormElement | VaForm)[] = [];

  formProvider = setup(() => {
    useFormProvider(this)
    const onChildMounted = (child: FormElement | VaForm) => this.childMountedHandler(child)
    const onChildUnmounted = (removableChild: FormElement | VaForm) => this.childUnmountedHandler(removableChild)

    const formProvider = {
      onChildMounted,
      onChildUnmounted,
    }

    provide(FormServiceKey, formProvider)

    return formProvider
  })

  childMountedHandler (child: FormElement | VaForm) {
    this.nestedFormElements.push(child)
  }

  childUnmountedHandler (removableChild: FormElement | VaForm) {
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
      // @ts-ignore
      .filter(({ hasError }) => hasError)
      // @ts-ignore
      .find((item) => item.hasError())

    if (invalidComponent) {
      invalidComponent.focus()
    } else {
      // @ts-ignore
      const nestedFormComponents: Array<VaForm> = this.nestedFormElements.filter(({ nestedFormElements }) => nestedFormElements)
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
