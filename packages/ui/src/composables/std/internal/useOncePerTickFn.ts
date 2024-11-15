import { nextTick } from 'vue'

/** Prevent function from being called multiple times per vue tick */
export const useOncePerTickFn = <T extends (...args: any[]) => any>(fn: T) => {
  let canBeCalled = true

  return (...args: Parameters<T>) => {
    if (!canBeCalled) { return }
    canBeCalled = false
    const result = fn(...args)
    nextTick(() => { canBeCalled = true })
    return result
  }
}
