import { computed, ref, UnwrapRef, watch } from 'vue'
import { isClient } from '../utils/ssr'

/** Returns cb result only on client. Returns null on server  */
export const useClientOnly = <T>(cb: () => T) => {
  const isMounted = computed(isClient)
  const result = ref<T | null>(null)

  watch(isMounted, () => {
    if (isMounted.value) {
      result.value = cb() as UnwrapRef<T>
    }
  }, { immediate: true })

  return result
}
