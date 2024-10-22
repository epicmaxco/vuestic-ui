import { computed, Prop } from 'vue'

type ToString<T> = T extends string ? T : string

export const useVModel = <P, K extends keyof P>(props: P, key: K, emit: (event: `update:${ToString<K>}`, v: typeof props[K]) => void) => {
  return computed({
    get () {
      return props[key]
    },
    set (value: typeof props[K]) {
      emit(`update:${key as ToString<K>}`, value)
    },
  })
}
