import { ref, Ref, unref } from 'vue'

/**
 * @param fn passed function to throttle
 * @param props { delay } call delay in ms
 */
export function useThrottleFn<F extends (...args: any) => unknown>(fn: F, delay: Ref<number | undefined> | number | undefined) {
  let isThrottled = true

  /**
   * No way this will be returned without reassignment, so we don't want typescript
   * to always keep undefined as possible return type. If function returns undefined itself
   * it will be still presented by typescript as undefined (expected behaviour).
   */
  let lastCallResult = undefined as any as ReturnType<F>

  return function (this: any, ...args: Parameters<F>) {
    const invoke = () => fn.apply(this, args) as ReturnType<F>

    if (!unref(delay)) { return invoke() }

    if (isThrottled) {
      isThrottled = false

      setTimeout(() => (isThrottled = true), unref(delay))

      lastCallResult = invoke()
    }

    return lastCallResult
  } as F
}
