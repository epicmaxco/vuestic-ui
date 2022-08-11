import { computed, isRef, Ref, shallowRef, DefineComponent } from 'vue'

import { useTemplateRef } from './'

const extractHTMLElement = (el: any): HTMLElement => el && '$el' in el ? el.$el : el

export const useHTMLElement = (key?: string | Ref<HTMLElement | DefineComponent | undefined>): Ref<HTMLElement> => {
  if (isRef(key)) {
    return computed({
      get () { return extractHTMLElement(key.value) },
      set (value) { key.value = value },
    })
  }

  if (key) {
    const el = useTemplateRef(key)
    return computed({
      get () { return extractHTMLElement(el.value) },
      set (value) { el.value = value },
    })
  }

  const el = shallowRef()
  return computed({
    set (value) {
      el.value = extractHTMLElement(value)
    },
    get () { return el.value },
  })
}
