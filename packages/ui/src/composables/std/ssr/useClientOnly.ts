import { watchEffect, ref, UnwrapRef } from 'vue'
import { useIsMounted } from '../internal/useIsMounted'
import { isClient } from '../../../utils/ssr'

/** Returns cb result only on client. Returns null on server  */
export const useClientOnly = <T>(cb: () => T) => {
  const result = ref<T | null>(null)

  if (isClient()) {
    result.value = cb() as UnwrapRef<T>
    return result
  }

  const isMounted = useIsMounted()

  watchEffect(() => {
    if (isMounted.value && isClient()) {
      result.value = cb() as UnwrapRef<T>
    }
  })

  return result
}
