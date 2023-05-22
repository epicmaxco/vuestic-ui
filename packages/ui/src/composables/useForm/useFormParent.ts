import { computed, provide, ref, shallowRef, type Ref, unref } from 'vue'
import { FormServiceKey } from './consts'
import { Form, FormFiled } from './types'
import { useFormChild } from './useFormChild'

type FormParentOptions = {
  hideLoading: boolean
  hideErrors: boolean
  hideErrorMessages: boolean
}

export const createFormContext = <Names extends string>(options: FormParentOptions) => {
  const fields = ref(new Map<number, FormFiled<Names>>())

  return {
    // Vue unwrap ref automatically, but types are not for some reason
    fields: computed(() => [...fields.value.values()]),
    doShowError: computed(() => !options.hideErrors),
    doShowErrorMessages: computed(() => !options.hideErrorMessages),
    doShowLoading: computed(() => !options.hideLoading),
    registerField: (uid: number, field: FormFiled) => {
      fields.value.set(uid, field as FormFiled<Names>)
    },
    unregisterField: (uid: number) => {
      fields.value.delete(uid)
    },
  }
}

export const useFormParent = <Names extends string = string>(options: FormParentOptions): Form<Names> => {
  const formContext = createFormContext<Names>(options)

  provide(FormServiceKey, formContext)

  const { fields } = formContext

  const fieldNames = computed(() => fields.value.map((field) => unref(field.name)).filter(Boolean) as Names[])
  const formData = computed(() => fields.value.reduce((acc, field) => {
    if (unref(field.name)) { acc[unref(field.name) as Names] = field.value }
    return acc
  }, {} as Record<Names, FormFiled['value']>))
  const isValid = computed(() => fields.value.every((field) => unref(field.isValid)))
  const isLoading = computed(() => fields.value.some((field) => unref(field.isLoading)))
  const errorMessages = computed(() => fields.value.map((field) => unref(field.errorMessages)).flat())
  const errorMessagesNamed = computed(() => fields.value.reduce((acc, field) => {
    if (unref(field.name)) { acc[unref(field.name) as Names] = unref(field.errorMessages) }
    return acc
  }, {} as Record<Names, any>))

  const validate = () => {
    // Validate each filed to get the error messages
    return fields.value.reduce((acc, field) => {
      return field.validate() && acc
    }, true)
  }

  const validateAsync = () => {
    return Promise.all(fields.value.map((field) => field.validateAsync())).then((results) => {
      return results.every(Boolean)
    })
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

  useFormChild({
    name: ref(undefined),
    isValid: isValid,
    isLoading: isLoading,
    validate,
    validateAsync,
    reset,
    resetValidation,
    focus,
    errorMessages: errorMessages,
  })

  return {
    formData,
    fields,
    fieldNames,
    isValid,
    isLoading,
    errorMessages,
    errorMessagesNamed,
    validate,
    reset,
    resetValidation,
    focus,
    focusInvalidField,
  }
}
