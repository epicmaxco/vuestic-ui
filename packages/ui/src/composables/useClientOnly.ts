import { onMounted, ref, UnwrapRef } from 'vue'
import { isServer } from '../utils/ssr-utils'

/** Returns cb result only on client. Returns null on server  */
export const useClientOnly = <T>(cb: () => T) => {
  if (isServer()) {
    const result = ref<T | null>(null)

    onMounted(() => { result.value = cb() as UnwrapRef<T> })

    return result
  }

  return ref(cb())
}
