import { computed, provide, ref, shallowRef, type Ref, unref, toRef, UnwrapRef } from 'vue'
import { FormServiceKey } from './consts'
import { Form, FormFiled } from './types'
import { useFormChild } from './useFormChild'

type FormParentOptions = {
  hideLoading: boolean
  hideErrors: boolean
  hideErrorMessages: boolean
  immediate: boolean
}

export const createFormContext = <Names extends string>(options: FormParentOptions) => {
  const fields = ref(new Map<string, FormFiled<Names>>())

  return {
    // Vue unwrap ref automatically, but types are not for some reason
    immediate: computed(() => options.immediate),
    fields: computed(() => [...fields.value.values()]),
    doShowError: computed(() => !options.hideErrors),
    doShowErrorMessages: computed(() => !options.hideErrorMessages),
    doShowLoading: computed(() => !options.hideLoading),
    isFormDirty: ref(false),
    registerField: (uid: string, field: FormFiled<Names>) => {
      // Vue will unwrap ref automatically, but types are not for some reason
      fields.value.set(uid, field as unknown as UnwrapRef<FormFiled<Names>>)
    },
    unregisterField: (uid: string) => {
      fields.value.delete(uid)
    },
  }
}

export const useFormParent = <Names extends string = string>(options: FormParentOptions): Form<Names> => {
  const formContext = createFormContext<Names>(options)

  provide<typeof formContext>(FormServiceKey, formContext)

  const { fields, isFormDirty } = formContext

  const fieldNames = computed(() => fields.value.map((field) => unref(field.name)).filter(Boolean) as Names[])
  const fieldsNamed = computed(() => fields.value.reduce((acc, field) => {
    if (unref(field.name)) { acc[unref(field.name) as Names] = field }
    return acc
  }, {} as Record<Names, UnwrapRef<FormFiled>>))
  const formData = computed(() => fields.value.reduce((acc, field) => {
    if (unref(field.name)) { acc[unref(field.name) as Names] = field.value }
    return acc
  }, {} as Record<Names, UnwrapRef<FormFiled['value']>>))
  const isValid = computed(() => fields.value.every((field) => unref(field.isValid)))
  const isLoading = computed(() => fields.value.some((field) => unref(field.isLoading)))
  const isDirty = computed({
    get () { return fields.value.some((field) => unref(field.isDirty)) || isFormDirty.value },
    set (v) { isFormDirty.value = v },
  })
  const errorMessages = computed(() => fields.value.map((field) => unref(field.errorMessages)).flat())
  const errorMessagesNamed = computed(() => fields.value.reduce((acc, field) => {
    if (unref(field.name)) { acc[unref(field.name) as Names] = unref(field.errorMessages) }
    return acc
  }, {} as Record<Names, any>))

  const validate = () => {
    isDirty.value = true
    // Validate each filed to get the error messages
    return fields.value.reduce((acc, field) => {
      return field.validate() && acc
    }, true)
  }

  const validateAsync = () => {
    isDirty.value = true
    return Promise.all(fields.value.map((field) => field.validateAsync())).then((results) => {
      return results.every(Boolean)
    })
  }

  const reset = () => {
    isDirty.value = false
    fields.value.forEach((field) => field.reset())
  }

  const resetValidation = () => {
    isDirty.value = false
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
    isDirty: isDirty,
    validate,
    validateAsync,
    reset,
    resetValidation,
    focus,
    errorMessages: errorMessages,
  })

  return {
    immediate: computed(() => options.immediate),
    isDirty,
    formData,
    fields,
    fieldsNamed,
    fieldNames,
    isValid,
    isLoading,
    errorMessages,
    errorMessagesNamed,
    validate,
    validateAsync,
    reset,
    resetValidation,
    focus,
    focusInvalidField,
  }
}
