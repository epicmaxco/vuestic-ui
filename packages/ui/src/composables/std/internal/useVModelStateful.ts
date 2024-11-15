import { computed, Ref, ref, watch } from 'vue'
import { useIsUserProvidedProp } from './useUserProvidedProp'

type ToString<T> = T extends string ? T : string

export const useVModelStateful = <P, K extends keyof P>(props: P, key: K, emit: (event: `update:${ToString<K>}`, v: typeof props[K]) => void) => {
  const state = ref(props[key]) as Ref<P[K]>

  const isUserProvided = useIsUserProvidedProp(key as string)

  const valueProxy = computed({
    get () {
      return isUserProvided.value ? props[key] : state.value
    },
    set (value: P[K]) {
      state.value = value
      emit(`update:${key as ToString<K>}`, value)
    },
  })

  return valueProxy
}
