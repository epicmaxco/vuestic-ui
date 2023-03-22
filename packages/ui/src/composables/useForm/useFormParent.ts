import { computed, provide, ref, Ref } from 'vue'
import { FormServiceKey } from './consts'
import { FormFiled } from './types'
import { useFormChild } from './useFormChild'

type FormParentOptions = {
  hideErrors: boolean
  hideErrorMessages: boolean
}

export const createFormContext = (options: FormParentOptions) => {
  const fields: Ref<Record<number, Ref<FormFiled>>> = ref({})

  return {
    // Vue unwrap ref automatically, but types are not for some reason
    fields: computed(() => Object.values(fields.value) as any as FormFiled[]),
    doShowError: computed(() => !options.hideErrors),
    doShowErrorMessages: computed(() => !options.hideErrorMessages),
    registerField: (uid: number, field: Ref<FormFiled>) => {
      fields.value[uid] = field
    },
    unregisterField: (uid: number) => {
      delete fields.value[uid]
    },
  }
}

export const useFormParent = (options: FormParentOptions) => {
  const formContext = createFormContext(options)

  provide(FormServiceKey, formContext)

  const { fields } = formContext

  const isValid = computed(() => fields.value.every((field) => field.isValid))
  const errorMessages = computed(() => fields.value.map((field) => field.errorMessages).flat())
  const errorMessagesNamed = computed(() => fields.value.reduce((acc, field) => {
    if (field.name) {
      acc[field.name] = field.errorMessages
    }
    return acc
  }, {} as Record<string, any>))

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

  const focusInvalidField = () => {
    const invalidField = fields.value.find((field) => !field.isValid)

    invalidField?.focus()
  }

  useFormChild(() => ({
    name: '',
    value: undefined,
    isValid: isValid.value,
    validate,
    reset,
    resetValidation,
    focus,
    errorMessages: errorMessages.value,
  }))

  return {
    fields,
    isValid,
    errorMessages,
    errorMessagesNamed,
    validate,
    reset,
    resetValidation,
    focus,
    focusInvalidField,
  }
}
