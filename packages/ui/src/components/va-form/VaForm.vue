<template>
  <component
    class="va-form"
    :is="tag"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { inject, provide } from 'vue'
import { Options, mixins, prop, Vue, setup } from 'vue-class-component'
import { FormProvider, FormServiceKey, FormChild } from './consts'

class FormProps {
  autofocus = prop<boolean>({ type: Boolean, default: false })
  tag = prop<string>({ type: String, default: 'div' })
}

const FormPropsMixin = Vue.with(FormProps)

const isVaForm = (value: any): value is VaForm => {
  return !!value.focusInvalid
}

@Options({
  name: 'VaForm',
  emits: ['validation'],
})
export default class VaForm extends mixins(
  FormPropsMixin,
) {
  nestedFormElements: (FormChild | VaForm)[] = [];

  parentFormProvider = setup(() => {
    return { ...inject(FormServiceKey, undefined) }
  })

  formProvider = setup(() => {
    const onChildMounted = (child: FormChild | VaForm) => this.childMountedHandler(child)
    const onChildUnmounted = (removableChild: FormChild | VaForm) => this.childUnmountedHandler(removableChild)

    const formProvider = {
      onChildMounted,
      onChildUnmounted,
    }

    provide(FormServiceKey, formProvider)

    return formProvider
  })

  childMountedHandler (child: FormChild | VaForm) {
    this.nestedFormElements.push(child)
  }

  childUnmountedHandler (removableChild: FormChild | VaForm) {
    this.nestedFormElements = this.nestedFormElements.filter(child => child !== removableChild)
  }

  mounted () {
    this.parentFormProvider.onChildMounted?.(this)

    if (this.autofocus) {
      this.$nextTick(() => { this.focus() })
    }
  }

  unmounted () {
    this.parentFormProvider.onChildUnmounted?.(this)
  }

  /** @public */
  reset () {
    this.nestedFormElements
      .filter(({ reset }) => reset)
      .forEach((item) => { item.reset() })
  }

  resetValidation () {
    this.nestedFormElements
      .filter(({ resetValidation }) => resetValidation)
      .forEach((item: any) => { item.resetValidation() })
  }

  focus () {
    const focusableElement = this.nestedFormElements.find(({ focus }) => focus)
    if (focusableElement) {
      focusableElement.focus()
    }
  }

  focusInvalid () {
    const invalidComponent = this.nestedFormElements
      .find((item) => !isVaForm(item) && item.hasError && item.hasError())

    if (invalidComponent) {
      invalidComponent.focus()
    } else {
      this.nestedFormElements
        .forEach(item => isVaForm(item) && item.focusInvalid())
    }
  }

  validate () { // NOTE: temporarily synchronous validation
    let formValid = true
    this.nestedFormElements
      .filter(({ validate }) => validate)
      .forEach((child) => {
        const isValidChild = child.validate()

        if (!isValidChild) { formValid = false }
      })

    this.$emit('validation', formValid)

    return formValid
  }
}
</script>

<style lang='scss'>
.va-form {
  font-family: var(--va-font-family);
}
</style>
