import { Ref, ref, toRef, unref, watch } from 'vue'

/**
 * @param value passed reactive value to throttle
 * @param props { delay } call delay in ms
 */
export function useThrottleValue<T> (value: Ref<T>, delay: Ref<number | undefined> | number | undefined): Ref<T> {
  if (!unref(delay)) { return value }

  const isThrottled = ref(true)

  const previousCallValue = ref<T>() as Ref<T>
  const previousReturnedValue = ref<T>() as Ref<T>
  const currentCallValue = ref<T>() as Ref<T>

  watch(value, () => {
    // we save and return last call value at the end if no more calls were provided
    previousCallValue.value = value.value
    const lastCallValue = setTimeout(() => {
      currentCallValue.value = previousCallValue.value
    }, unref(delay))

    if (isThrottled.value) {
      isThrottled.value = false

      currentCallValue.value = value.value
      previousReturnedValue.value = value.value

      // no need to return previously saved value anymore
      clearTimeout(lastCallValue)

      setTimeout(() => (isThrottled.value = true), unref(delay))
    } else {
      currentCallValue.value = previousReturnedValue.value
    }
  }, { immediate: true })

  return currentCallValue
}
