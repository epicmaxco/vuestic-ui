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
import { FormComponentMixin } from '../../vuestic-mixins/FormComponent/FormComponentMixin'
import { FormProvider, FormServiceKey } from './consts'

class FormProps {
  autofocus = prop<boolean>({ type: Boolean, default: false })
  tag = prop<string>({ type: String, default: 'div' })
}

const FormPropsMixin = Vue.with(FormProps)

interface UniversalFormBlock {
  reset: () => void;
  some: () => void;
}

@Options({
  name: 'VaForm',
  emits: ['validation'],
})
export default class VaForm extends mixins(
  FormPropsMixin,
) {
  nestedFormElements: (FormComponentMixin | VaForm)[] = [];

  parentFormProvider: FormProvider | object = setup(() => {
    return {
      ...inject(FormServiceKey, undefined),
    }
  })

  formProvider = setup(() => {
    const onChildMounted = (child: FormComponentMixin | VaForm) => this.childMountedHandler(child)
    const onChildUnmounted = (removableChild: FormComponentMixin | VaForm) => this.childUnmountedHandler(removableChild)

    const formProvider = {
      onChildMounted,
      onChildUnmounted,
    }

    provide(FormServiceKey, formProvider)

    return formProvider
  })

  childMountedHandler (child: FormComponentMixin | VaForm) {
    this.nestedFormElements.push(child)
  }

  childUnmountedHandler (removableChild: FormComponentMixin | VaForm) {
    this.nestedFormElements = this.nestedFormElements.filter(child => child !== removableChild)
  }

  mounted () {
    if (Object.keys(this.parentFormProvider).length) {
      // @ts-ignore
      this.parentFormProvider.onChildMounted(this)
    }
    if (this.autofocus) {
      this.$nextTick(() => {
        this.focus()
      })
    }
  }

  unmounted () {
    if (Object.keys(this.parentFormProvider).length) {
      // @ts-ignore
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
      // @ts-ignore
      .filter(({ hasError }) => hasError)
      // @ts-ignore
      .find((item) => item.hasError())

    if (invalidComponent) {
      invalidComponent.focus()
    } else {
      // @ts-ignore
      const nestedFormComponents = this.nestedFormElements.filter(({ nestedFormElements }) => nestedFormElements)
      // @ts-ignore
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
