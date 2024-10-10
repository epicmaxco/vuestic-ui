import { inject, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useComponentUuid } from '../std'
import { FormServiceKey } from './consts'
import { type FormFiled } from './types'
import { type FormContext } from './formContext'

export const useFormChild = (context: FormFiled) => {
  const formContext = inject(FormServiceKey, null)

  if (!formContext) {
    return {
      forceDirty: ref(false),
      forceHideErrorMessages: ref(false),
      forceHideErrors: ref(false),
      forceHideLoading: ref(false),
      fields: computed(() => []),
      registerField: () => {},
      unregisterField: () => {},
      immediate: computed(() => false),
    } as FormContext
  }

  const uid = useComponentUuid()

  onMounted(() => {
    formContext.registerField(uid, context)
  })

  onBeforeUnmount(() => {
    formContext.unregisterField(uid)
  })

  return formContext
}
