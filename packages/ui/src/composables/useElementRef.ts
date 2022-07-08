import { ComponentPublicInstance, computed, shallowRef, unref, Ref } from 'vue'

type Maybe<T> = T | undefined
export type MaybeElement<T extends Maybe<HTMLElement>> = T | ComponentPublicInstance

const unrefElement = <T extends Maybe<HTMLElement>>(el: Ref<MaybeElement<T>>): T => {
  const e = unref(el)
  return (e as ComponentPublicInstance)?.$el ?? e
}

export const useElementRef = <T extends Maybe<HTMLElement>>() => {
  const el = shallowRef<MaybeElement<T>>()

  return computed({
    get () {
      return unrefElement(el) as T
    },
    set (node: MaybeElement<T>) {
      el.value = node
    },
  }) as Ref<T>
}
