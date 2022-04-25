import { isRef, Ref, unref, watch } from 'vue'
import debounce from 'lodash/debounce.js'

export const useDebounce = <T>(onUpdate: () => any, timeout: Ref<number> | number) => {
  const createDebounced = () => {
    return debounce(() => {
      onUpdate()
    }, unref(timeout))
  }

  let debounced = createDebounced()

  if (isRef(timeout)) {
    watch(timeout, () => { debounced = createDebounced() })
  }

  return {
    // todo check if we need to create proxy here
    debounced,
  }
}

/** Used for debounced callbacks. Can be used to show cb near debounce call in code structure. */
export const useDebounceFn = (timeout: Ref<number> | number) => {
  let callback: (() => void) | null = null
  const createDebounced = () => {
    return debounce(() => {
      callback?.()
      callback = null
    }, unref(timeout))
  }

  let debounced = createDebounced()

  if (isRef(timeout)) {
    watch(timeout, () => { debounced = createDebounced() })
  }

  return {
    // todo check if we need to create proxy here
    debounced: (cb: (() => void)) => { callback = cb; debounced() },
    cancel: () => debounced.cancel(),
  }
}
