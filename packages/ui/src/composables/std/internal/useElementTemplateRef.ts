import { computed, Ref, shallowRef } from 'vue'
import { unwrapEl, TemplateRef } from '../../../utils/unwrapEl'
import { useTemplateRef } from './useTemplateRef'

export const useElementTemplateRef = (key: string | Ref<TemplateRef>) => {
  const el = useTemplateRef(key)

  return computed({
    get () {
      return unwrapEl(el.value)
    },
    set (value) {
      el.value = value
    },
  })
}
