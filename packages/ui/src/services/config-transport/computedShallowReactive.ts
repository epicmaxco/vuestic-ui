import { shallowReactive, watchEffect } from 'vue'

/**
 * This function return `shallowReactive` that binded with callback result.
 * Works like computed, but returns shallow reactive object istead of ref.
 */
export const computedShallowReactive = <T extends Record<any, any>>(cb: () => T) => {
  const props = shallowReactive({}) as T
  watchEffect(() => {
    const p = cb()
    Object.keys(p).forEach((key: keyof T) => { props[key] = p[key] })
  })
  return props
}
