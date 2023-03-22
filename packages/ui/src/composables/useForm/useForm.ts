import { type Ref, computed } from 'vue'
import { useFormParent } from './useFormParent'
import { type VaForm } from '../../components'
import { useTemplateRef } from '../useTemplateRef'

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
export const useForm = (ref: string | Ref<typeof VaForm>): ReturnType<typeof useFormParent> => {
  const form = typeof ref === 'string'
    ? useTemplateRef(ref) as any as Ref<typeof VaForm>
    : ref

  return {
    isValid: computed(() => form.value?.isValid),
    fields: computed(() => form.value?.fields),
    errorMessages: computed(() => form.value?.errorMessages),
    validate: () => form.value?.validate(),
    reset: () => {
      form.value?.reset()
    },
    resetValidation: () => form.value?.resetValidation(),
    focus: () => form.value?.focus(),
    focusInvalidField: () => form.value?.focusInvalidField(),
  }
}
