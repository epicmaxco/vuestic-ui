import { inject, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useComponentUuid } from '../useComponentUuid'
import { FormServiceKey } from './consts'
import { type FormFiled } from './types'

export const useFormChild = (createContext: () => FormFiled) => {
  const formContext = inject(FormServiceKey, null)

  if (!formContext) {
    return {
      doShowError: ref(true),
      doShowErrorMessages: ref(true),
      doShowLoading: ref(true),
    }
  }

  const context = computed(createContext)
  const uid = useComponentUuid()

  onMounted(() => {
    formContext.registerField(uid, context)
  })

  onBeforeUnmount(() => {
    formContext.unregisterField(uid)
  })

  return {
    doShowError: formContext.doShowError,
    doShowErrorMessages: formContext.doShowErrorMessages,
    doShowLoading: formContext.doShowLoading,
  }
}
