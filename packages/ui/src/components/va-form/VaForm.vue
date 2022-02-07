<template>
  <component
    ref="form"
    class="va-form"
    :is="tag"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  Ref,
  onMounted,
  onUnmounted,
  nextTick,
  provide,
  inject,
} from 'vue'

import { FormServiceKey, FormChild, Form } from './consts'

const isVaForm = (value: any): value is Form => !!value.focusInvalid

export default defineComponent({
  name: 'VaForm',
  emits: ['validation'],
  props: {
    autofocus: { type: Boolean as PropType<boolean>, default: false },
    tag: { type: String as PropType<string>, default: 'div' },
  },

  setup (props, { emit }) {
    const nestedFormElements: Ref<(FormChild | Form)[]> = ref([])

    const parentFormProvider = () => inject(FormServiceKey, undefined)

    provide(FormServiceKey, {
      onChildMounted: (child: FormChild | Form) => childMountedHandler(child),
      onChildUnmounted: (removableChild: FormChild | Form) => childUnmountedHandler(removableChild),
    })

    const childMountedHandler = (child: FormChild | Form) => {
      nestedFormElements.value.push(child)
    }

    const childUnmountedHandler = (removableChild: FormChild | Form) => {
      nestedFormElements.value = nestedFormElements.value.filter(child => child !== removableChild)
    }

    /** @public */
    const reset = () => {
      nestedFormElements.value
        .filter(({ reset }) => reset)
        .forEach((item) => { item.reset() })
    }

    const resetValidation = () => {
      nestedFormElements.value
        .filter(({ resetValidation }) => resetValidation)
        .forEach((item: any) => { item.resetValidation() })
    }

    const focus = () => { nestedFormElements.value.find(({ focus }) => focus)?.focus() }

    const focusInvalid = () => {
      const invalidComponent = nestedFormElements.value
        .find((item) => !isVaForm(item) && item.hasError())

      if (invalidComponent) {
        invalidComponent.focus()
      } else {
        nestedFormElements.value
          .forEach(item => isVaForm(item) && item.focusInvalid())
      }
    }

    // validation for every nested child
    const validate = () => { // NOTE: temporarily synchronous validation
      const formValid = nestedFormElements.value
        .filter(({ validate }) => validate)
        .map((child) => child.validate()) // more readable than with 'forEach'
        .every((isValid) => isValid)

      emit('validation', formValid)

      return formValid
    }

    const publicMethods: Form = {
      reset,
      resetValidation,
      focus,
      focusInvalid,
      validate,
    }

    onMounted(() => {
      parentFormProvider()?.onChildMounted?.(publicMethods)

      if (props.autofocus) { nextTick(focus) }
    })

    onUnmounted(() => {
      parentFormProvider()?.onChildUnmounted?.(publicMethods)
    })

    return publicMethods
  },

  // we will use this while we have 'withConfigTransport' and problem with 'expose' method in 'setup' func
  methods: {
    reset () { (this as any).form?.reset() },
    resetValidation () { (this as any).form?.resetValidation() },
    focus () { (this as any).form?.focus() },
    focusInvalid () { (this as any).form?.focusInvalid() },
    validate () { (this as any).form?.validate() },
  },
})
</script>

<style lang='scss'>
.va-form {
  font-family: var(--va-font-family);
}
</style>
