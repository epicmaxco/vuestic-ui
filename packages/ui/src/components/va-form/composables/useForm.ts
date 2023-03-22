import { computed, inject, InjectionKey, onBeforeUnmount, onMounted, provide, Ref, ref } from 'vue'
import { type VaForm } from '..'
import { useComponentUuid } from '../../../composables/useComponentUuid'
import { useTemplateRef } from './../../../composables/useTemplateRef'

type FormFiled = {
  name?: string;
  value: unknown;
  isValid: boolean;
  validate: () => boolean;
  reset: () => void;
  resetValidation: () => void;
  focus: () => void;
}

const createFormContext = () => {
  const fields: Ref<Record<number, Ref<FormFiled>>> = ref({})

  return {
    // Vue unwrap ref automatically, but types are not for some reason
    fields: computed(() => Object.values(fields.value) as any as FormFiled[]),
    registerField: (uid: number, field: Ref<FormFiled>) => {
      fields.value[uid] = field
    },
    unregisterField: (uid: number) => {
      delete fields.value[uid]
    },
  }
}

export const FormServiceKey: InjectionKey<ReturnType<(typeof createFormContext)>> = Symbol('FormService')

export const useForm = (ref: string | Ref<typeof VaForm>): ReturnType<typeof useFormProvider> => {
  const form = typeof ref === 'string'
    ? useTemplateRef(ref) as any as Ref<typeof VaForm>
    : ref

  return {
    isValid: computed(() => form.value?.isValid),
    fields: computed(() => form.value?.fields),
    validate: () => form.value?.validate(),
    reset: () => {
      form.value?.reset()
    },
    resetValidation: () => form.value?.resetValidation(),
    focus: () => form.value?.focus(),
    focusInvalid: () => form.value?.focusInvalid(),
  }
}

export const useFormProvider = () => {
  const formContext = createFormContext()

  provide(FormServiceKey, formContext)

  const { fields } = formContext

  const isValid = computed(() => fields.value.every((field) => field.isValid))

  const validate = () => {
    // Validate each filed to get the error messages
    return fields.value.reduce((acc, field) => {
      return field.validate() && acc
    }, true)
  }

  const reset = () => {
    fields.value.forEach((field) => field.reset())
  }

  const resetValidation = () => {
    fields.value.forEach((field) => field.resetValidation())
  }

  const focus = () => {
    fields.value[0]?.focus()
  }

  const focusInvalid = () => {
    const invalidField = fields.value.find((field) => !field.isValid)

    invalidField?.focus()
  }

  useFormField(() => ({
    name: '',
    value: undefined,
    isValid: isValid.value,
    validate,
    reset,
    resetValidation,
    focus,
  }))

  return {
    fields,
    isValid,
    validate,
    reset,
    resetValidation,
    focus,
    focusInvalid,
  }
}

export const useFormField = (createContext: () => FormFiled) => {
  const formContext = inject(FormServiceKey, null)

  if (!formContext) {
    return
  }

  const context = computed(createContext)
  const uid = useComponentUuid()

  onMounted(() => {
    formContext.registerField(uid, context)
  })

  onBeforeUnmount(() => {
    formContext.unregisterField(uid)
  })
}
