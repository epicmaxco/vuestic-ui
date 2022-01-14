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

import { FormServiceKey, FormChild } from './consts'

const isVaForm = (value: any) => !!value.focusInvalid

export default defineComponent({
  name: 'VaForm',
  emits: ['validation'],
  props: {
    autofocus: { type: Boolean as PropType<boolean>, default: false },
    tag: { type: String as PropType<string>, default: 'div' },
  },

  setup (props, { emit }) {
    const nestedFormElements: Ref<FormChild[]> = ref([])

    const parentFormProvider = () => ({ ...inject(FormServiceKey, undefined) })

    provide(FormServiceKey, {
      onChildMounted: (child: FormChild) => childMountedHandler(child),
      onChildUnmounted: (removableChild: FormChild) => childUnmountedHandler(removableChild),
    })

    const childMountedHandler = (child: FormChild) => {
      nestedFormElements.value.push(child)
    }

    const childUnmountedHandler = (removableChild: FormChild) => {
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

    const focus = () => {
      const focusableElement = nestedFormElements.value.find(({ focus }) => focus)
      if (focusableElement) {
        focusableElement.focus()
      }
    }

    const focusInvalid = () => {
      const invalidComponent = nestedFormElements.value
        .find((item) => !isVaForm(item) && item.hasError && item.hasError())

      if (invalidComponent) {
        invalidComponent.focus()
      } else {
        nestedFormElements.value
          .forEach(item => isVaForm(item) && item.focusInvalid?.())
      }
    }

    const validate = () => { // NOTE: temporarily synchronous validation
      const formValid = nestedFormElements.value
        .filter(({ validate }) => validate)
        .every((child) => child.validate())

      emit('validation', formValid)

      return formValid
    }

    const publicMethods = {
      reset,
      resetValidation,
      focus,
      focusInvalid,
      validate,
    }

    onMounted(() => {
      parentFormProvider().onChildMounted?.(publicMethods)

      if (props.autofocus) { nextTick(focus) }
    })

    onUnmounted(() => {
      parentFormProvider().onChildUnmounted?.(publicMethods)
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
