/**
 * @description returns throttled function or value
 * the last one always returns last-call value in the end if no more new calls were provided
 * @example
 *    import { useThrottleFunction, useThrottleValue } from '../../composables'
 *    ...
 *    const localThrottledFunction = useThrottleFunction(functionToThrottle, props)
 *    const localThrottledValue = useThrottleValue(reactiveValueToThrottle, props)
 */

import {
  ref, toRef, unref,
  watch,
  Ref, ExtractPropTypes, ComponentInternalInstance,
} from 'vue'

type ThrottledFunctionArgs = any[]
type ThrottledFunction<Output> = (...args: ThrottledFunctionArgs) => Output

export const useThrottleProps = {
  delay: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0,
  },
}

type UseThrottleProps = ExtractPropTypes<typeof useThrottleProps>

/**
 * @param fn passed function to throttle
 * @param props { delay } call delay in ms
 */
export function useThrottleFunction<Output> (fn: ThrottledFunction<Output>, props: UseThrottleProps) {
  const delay = toRef(props, 'delay') ?? 0

  const isThrottled = ref(true)

  /**
   * No way this will be returned without reassignment, so we don't want typescript
   * to always keep undefined as possible return type. If function returns undefined itself
   * it will be still presented by typescript as undefined (expected behaviour).
   */
  let lastCallResult = undefined as any as Output

  return function (this: any, ...args: ThrottledFunctionArgs) {
    const invoke = () => fn.apply(this, args)

    if (!unref(delay)) { return invoke() }

    if (isThrottled.value) {
      isThrottled.value = false

      setTimeout(() => (isThrottled.value = true), unref(delay))

      lastCallResult = invoke()
    }

    return lastCallResult
  }
}

/**
 * @param value passed reactive value to throttle
 * @param props { delay } call delay in ms
 */
export function useThrottleValue<T> (value: Ref<T>, props: UseThrottleProps): Ref<T> {
  const delay = toRef(props, 'delay') ?? 0

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
