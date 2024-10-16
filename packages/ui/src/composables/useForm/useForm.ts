import { type Ref, computed, ref } from 'vue'
import { type VaForm } from '../../components'
import { useTemplateRef } from '../std/internal/useTemplateRef'
import { Form } from './types'

// EXPOSED API: TS support for Form instance
/**
 * Provides access to the form instance.
 *
 * @param ref - Form instance or template ref
 *
 * @example
 *
 * ```vue
 * <template>
 *   <va-form ref="myForm">...</va-form>
 * </template>
 *
 * <script setup>
 *  const { isValid, errorMessages, validate, reset, resetValidation, focus } = useForm('myForm')
 * </script>
 * ```
 */
export const useForm = <Names extends string = string>(elRef?: string | Ref<typeof VaForm>): Form<Names> & { formRef: Ref<unknown>, } => {
  const form = typeof elRef === 'string'
    ? useTemplateRef(elRef) as any as Ref<typeof VaForm>
    : typeof elRef === 'undefined'
      ? ref()
      : elRef

  return {
    formRef: form,
    isValid: computed(() => form.value?.isValid || false),
    immediate: computed(() => form.value?.immediate || false),
    isLoading: computed(() => form.value?.isLoading || false),
    isDirty: computed(() => form.value?.isDirty || false),
    isTouched: computed(() => {
      return form.value?.isTouched || false
    }),
    fields: computed(() => form.value?.fields ?? []),
    fieldsNamed: computed(() => form.value?.fieldsNamed ?? []),
    fieldNames: computed(() => form.value?.fieldNames ?? []),
    formData: computed(() => form.value?.formData ?? {}),
    errorMessages: computed(() => form.value?.errorMessages || []),
    errorMessagesNamed: computed(() => form.value?.errorMessagesNamed || {}),
    validate: () => form.value?.validate(),
    validateAsync: () => form.value?.validateAsync(),
    reset: () => form.value?.reset(),
    resetValidation: () => form.value?.resetValidation(),
    focus: () => form.value?.focus(),
    focusInvalidField: () => form.value?.focusInvalidField(),
  }
}
