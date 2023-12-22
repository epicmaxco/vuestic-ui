import { inject, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useComponentUuid } from '../useComponentUuid'
import { FormServiceKey } from './consts'
import { type FormFiled } from './types'

export const useFormChild = (context: FormFiled) => {
  const formContext = inject(FormServiceKey, null)

  if (!formContext) {
    return {
      isFormDirty: ref(false),
      isFormImmediate: ref(false),
      doShowError: ref(true),
      doShowErrorMessages: ref(true),
      doShowLoading: ref(true),
    }
  }

  const uid = useComponentUuid()

  onMounted(() => {
    formContext.registerField(uid, context)
  })

  onBeforeUnmount(() => {
    formContext.unregisterField(uid)
  })

  return {
    isFormDirty: formContext.isFormDirty,
    isFormImmediate: formContext.immediate,
    doShowError: formContext.doShowError,
    doShowErrorMessages: formContext.doShowErrorMessages,
    doShowLoading: formContext.doShowLoading,
  }
}
