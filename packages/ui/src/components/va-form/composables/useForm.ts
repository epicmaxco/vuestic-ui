import { computed, inject, InjectionKey, onBeforeUnmount, onMounted, provide, Ref, ref } from 'vue'

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
  return {
    formFields: [] as Ref<FormFiled>[],
  }
}

export const FormServiceKey: InjectionKey<ReturnType<(typeof createFormContext)>> = Symbol('FormService')

export const useForm = () => {
  const formContext = createFormContext()

  provide(FormServiceKey, formContext)

  const isValid = computed(() => formContext.formFields.every((field) => field.value.isValid))

  const validate = () => {
    return formContext.formFields.every((field) => field.value.validate())
  }

  const reset = () => {
    formContext.formFields.forEach((field) => field.value.reset())
  }

  const resetValidation = () => {
    formContext.formFields.forEach((field) => field.value.resetValidation())
  }

  const focus = () => {
    formContext.formFields[0]?.value.focus()
  }

  const focusInvalid = () => {
    const invalidField = formContext.formFields.find((field) => !field.value.isValid)

    invalidField?.value.focus()
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

  onMounted(() => {
    formContext.formFields.push(context)
  })

  onBeforeUnmount(() => {
    // eslint-disable-next-line vue/no-ref-as-operand
    formContext.formFields = formContext.formFields.filter((field) => field !== context)
  })
}
