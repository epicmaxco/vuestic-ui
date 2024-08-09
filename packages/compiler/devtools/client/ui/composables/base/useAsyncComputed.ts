import { ref, watchEffect, computed, type UnwrapRef } from 'vue'

/**
 * @notice not optimized for first load
 */
export const useAsyncComputed = <T, D = null>(fn: () => Promise<T>, defaultValue: D) => {
  const value = ref<T | D>(defaultValue)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const load = async () => {
    try {
      isLoading.value = true
      value.value = await fn() as UnwrapRef<T>
    } catch (e) {
      if (e instanceof Error) {
        error.value = e
      }
    } finally {
      isLoading.value = false
    }
  }

  watchEffect(() => {
    load()
  })

  const comp = computed(() => {
    return value.value
  })

  Object.defineProperty(comp, 'loading', {
    get() {
      return isLoading.value
    },
  })

  return comp as typeof comp & { loading: boolean }
}
