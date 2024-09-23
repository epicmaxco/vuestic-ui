import { computed, provide, ref, shallowRef, type Ref, unref, toRef, UnwrapRef } from 'vue'
import { FormServiceKey } from './consts'
import { Form, FormFiled } from './types'
import { useFormChild } from './useFormChild'
import { createFormContext, FormParentOptions } from './formContext'

export const useFormParent = <Names extends string = string>(options: FormParentOptions): Form<Names> => {
  const formContext = createFormContext<Names>(options)

  provide<typeof formContext>(FormServiceKey, formContext)

  const { fields, forceDirty } = formContext

  const fieldNames = computed(() => fields.value.map((field) => unref(field.name)).filter(Boolean) as Names[])
  const fieldsNamed = computed(() => fields.value.reduce((acc, field) => {
    if (unref(field.name)) { acc[unref(field.name) as Names] = field }
    return acc
  }, {} as Record<Names, UnwrapRef<FormFiled>>))
  const formData = computed(() => fields.value.reduce((acc, field) => {
    if (unref(field.name)) { acc[unref(field.name) as Names] = unref(field.value) }
    return acc
  }, {} as Record<Names, UnwrapRef<FormFiled['value']>>))
  const isValid = computed(() => fields.value.every((field) => unref(field.isValid)))
  const isLoading = computed(() => fields.value.some((field) => unref(field.isLoading)))
  const errorMessages = computed(() => fields.value.map((field) => unref(field.errorMessages)).flat())
  const errorMessagesNamed = computed(() => fields.value.reduce((acc, field) => {
    if (unref(field.name)) { acc[unref(field.name) as Names] = unref(field.errorMessages) }
    return acc
  }, {} as Record<Names, any>))
  const isDirty = computed({
    get () { return fields.value.some((field) => unref(field.isDirty)) || forceDirty.value },
    set (v) {
      forceDirty.value = v
      fields.value.forEach((field) => { field.isDirty = v })
    },
  })
  const isTouched = computed({
    get () {
      return fields.value.some((field) => field.isTouched)
    },
    set (v) {
      fields.value.forEach((field) => { field.isTouched = v })
    },
  })

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
    name: toRef(options, 'name'),
    isValid: isValid,
    isLoading: isLoading,
    isDirty: isDirty,
    isTouched: isTouched,
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
    isTouched,
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
