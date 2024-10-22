import { computed, isRef, Ref, shallowRef, DefineComponent, Component } from 'vue'

import { useTemplateRef } from './'
import { unwrapEl } from '../utils/unwrapEl'
import { TemplateRef } from '../utils/types/template-ref'

export const useHTMLElement = (key?: string | Ref<TemplateRef>): Ref<HTMLElement | undefined> => {
  if (isRef(key)) {
    return computed({
      get () { return unwrapEl(key.value) },
      set (value) { key.value = value },
    })
  }

  const el = key ? useTemplateRef(key) : shallowRef()

  return computed({
    get () { return unwrapEl(el.value) },
    set (value) { el.value = value },
  })
}
