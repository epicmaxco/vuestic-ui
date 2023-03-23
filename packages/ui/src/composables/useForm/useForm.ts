import { type Ref, computed } from 'vue'
import { type VaForm } from '../../components'
import { useTemplateRef } from '../useTemplateRef'
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
export const useForm = <Names extends string = string>(ref: string | Ref<typeof VaForm>): Form<Names> => {
  const form = typeof ref === 'string'
    ? useTemplateRef(ref) as any as Ref<typeof VaForm>
    : ref

  return {
    isValid: computed(() => form.value?.isValid || false),
    isLoading: computed(() => form.value?.isLoading || false),
    fields: computed(() => form.value?.fields ?? []),
    fieldNames: computed(() => form.value?.fieldNames ?? []),
    formData: computed(() => form.value?.formData ?? {}),
    errorMessages: computed(() => form.value?.errorMessages || []),
    errorMessagesNamed: computed(() => form.value?.errorMessagesNamed || {}),
    validate: () => form.value?.validate(),
    reset: () => {
      form.value?.reset()
    },
    resetValidation: () => form.value?.resetValidation(),
    focus: () => form.value?.focus(),
    focusInvalidField: () => form.value?.focusInvalidField(),
  }
}
