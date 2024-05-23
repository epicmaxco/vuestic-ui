import { Ref, UnwrapRef, computed, ref } from 'vue'
import { FormFiled } from './types'

export type FormParentOptions = {
  hideLoading: boolean
  hideErrors: boolean
  hideErrorMessages: boolean
  immediate: boolean
  name?: string
}

export type FormContext = {
  immediate: Ref<boolean>,
  fields: Ref<FormFiled<string>[]>,
  forceHideErrors: Ref<boolean>,
  forceHideErrorMessages: Ref<boolean>,
  forceHideLoading: Ref<boolean>,
  forceDirty: Ref<boolean>,
  registerField: (uid: string, field: FormFiled<string>) => void,
  unregisterField: (uid: string) => void,
}

export const createFormContext = <Names extends string>(options: FormParentOptions) => {
  const fields = ref(new Map<string, FormFiled<Names>>())

  return {
    // Vue unwrap ref automatically, but types are not for some reason
    immediate: computed(() => options.immediate),
    fields: computed(() => [...fields.value.values()]),
    forceHideErrors: computed(() => options.hideErrors),
    forceHideErrorMessages: computed(() => options.hideErrorMessages),
    forceHideLoading: computed(() => options.hideLoading),
    forceDirty: ref(false),
    registerField: (uid: string, field: FormFiled<Names>) => {
      // Vue will unwrap ref automatically, but types are not for some reason
      fields.value.set(uid, field as unknown as UnwrapRef<FormFiled<Names>>)
    },
    unregisterField: (uid: string) => {
      fields.value.delete(uid)
    },
  }
}
