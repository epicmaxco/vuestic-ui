import { computed, isRef, Ref, shallowRef, DefineComponent, Component } from 'vue'

import { useTemplateRef } from './'
import { unwrapEl } from '../utils/unwrapEl'

export const useHTMLElement = (key?: string | Ref<HTMLElement | DefineComponent | undefined | Component>): Ref<HTMLElement | undefined> => {
  if (isRef(key)) {
    return computed({
      get () { return unwrapEl(key.value) },
      set (value) { key.value = value },
    })
  }

  if (key) {
    const el = useTemplateRef(key)
    return computed({
      get () { return unwrapEl(el.value) },
      set (value) { el.value = value },
    })
  }

  const el = shallowRef()
  return computed({
    set (value) {
      el.value = unwrapEl(value)
    },
    get () { return el.value },
  })
}
